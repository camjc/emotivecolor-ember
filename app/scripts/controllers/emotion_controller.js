Emotivecolor.EmotionController = Ember.ObjectController.extend({
    // currentEmotion: function () {
    //     return this.get('currentEmotion');
    // }.property('@each'),
    // avgHSL: function () {
    //     var avgH = 0,
    //         avgS = 0,
    //         avgL = 0,
    //         self = this;

    //     self.get('model').forEach(function (indiv, index) {
    //         avgH += indiv.get('h');
    //         avgS += indiv.get('s');
    //         avgL += indiv.get('l');
    //     });

    //     avgH = Math.round(avgH / self.get('model.length'));
    //     avgS = Math.round(avgS / self.get('model.length'));
    //     avgL = Math.round(avgL / self.get('model.length'));

    //     return avgH + ', ' + avgS + '%, ' + avgL + '%';
    // }.property('@each'),
    init: function () {
        // First Time:
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initControls();
        // Every Time:
        this.initContainer();
        this.animate();
    },
    initScene: function () {
        this.set('scene', new THREE.Scene());
    },
    initCamera: function () {
        this.set('camera', new THREE.PerspectiveCamera(20, 1280 / 720, 1, 20000));
        this.set('camera.position.y', 600);
    },
    initRenderer: function () {
        var self = this;
        if (window.WebGLRenderingContext) {
            self.set('renderer', new THREE.WebGLRenderer({
                antialias: true
            }));
            self.set('rendererType', 'webgl');
            self.sprite = THREE.ImageUtils.loadTexture("images/circleB.png"); //Isn't found on compile because of renaming
        } else {
            self.set('renderer', new THREE.CanvasRenderer());
            self.set('rendererType', 'canvas');
        }

        self.renderer.setSize(1280, 720);
        self.renderer.setClearColor(0xD1D1D1, 1);
        self.scene.fog = new THREE.FogExp2(0xD1D1D1, 0.0001);
    },
    initControls: function () {
        var self = this;
        self.set('controls', new THREE.OrbitControls(self.camera, self.renderer.domElement));
    },
    initContainer: function () {
        var self = this;
        document.body.appendChild(self.get('renderer').domElement);
        self.set('renderCanvas', true);
    },
    render: function () {
        var self = this;
        self.renderer.render(self.scene, self.camera);
        self.controls.update();
    },
    animate: function () {
        var self = this;
        if (self.renderCanvas !== null) { // Checks that the camera still exists before looping.
            requestAnimationFrame(function () {
                return self.animate();
            });
            self.render();
        }
    },
    drawCircle: function (context) {
        var PI2 = Math.PI * 2;
        context.beginPath();
        context.arc(0, 0, 4, 0, PI2, true);
        context.closePath();
        context.fill();
    },
    mesher: function () {
        var self = this,
            geometry = new THREE.Geometry(),
            vertexColors = [],
            material;
        if (self.get('renderCanvas') === null) { //Initalize scene if it hasn't already (returning to view)
            self.initContainer();
            self.animate();
        }
        if (self.get('rendererType') === 'webgl') {

            self.get('model').forEach(function (indiv, index) {

                var vertex = new THREE.Vector3();
                vertex.x = indiv.get('radial3Y');
                vertex.y = indiv.get('radial3Z');
                vertex.z = indiv.get('radial3X'); //Reordered for controls to work more naturally.
                geometry.vertices.push(vertex);
                vertexColors.push(new THREE.Color());
                vertexColors[index].setHex(indiv.get('hexo'));
            });

            geometry.colors = vertexColors;
            material = new THREE.ParticleSystemMaterial({
                size: 50,
                map: self.sprite,
                vertexColors: true,
                transparent: true
            });
            material.alphaTest = 0.5; //Stops black edges on transparent png
            self.particles = new THREE.ParticleSystem(geometry, material);
            self.particles.sortParticles = true;

            self.scene.add(self.particles);

        } else if (self.get('rendererType') === 'canvas') {

            self.get('model').forEach(function (indiv, index) {
                self.particleCount += 1;
                var indivColor = new THREE.Color();
                indivColor.setHex(indiv.get('hexo'));
                var material = new THREE.SpriteCanvasMaterial({
                    color: indivColor,
                    program: self.drawCircle
                });
                indiv.particle = new THREE.Particle(material);
                indiv.particle.position.x = indiv.get('radial3Y');
                indiv.particle.position.y = indiv.get('radial3Z');
                indiv.particle.position.z = indiv.get('radial3X');

                geometry.vertices.push(indiv.particle.position);
                self.scene.add(indiv.particle);
            });
        }

        // self.scene.add(new THREE.Mesh(new THREE.SphereGeometry(50, 100, 100), new THREE.MeshNormalMaterial()));

        return self.get('model.length');

    }.property('@each'),
    actions: {
        delete: function (item) {
            // this tells Ember-Data to delete the color passed in as item
            this.get('model').removeObject(item);
            this.get('model').save().then(function () {
                Emotivecolor.alertController.popObject(); // Removes Previous Message
                Emotivecolor.alertController.pushObject(Ember.Object.create({
                    message: "Deleted a color."
                }));
            }, function () {
                Emotivecolor.alertController.popObject(); // Removes Previous Message
                Emotivecolor.alertController.pushObject(Ember.Object.create({
                    message: "Could not delete this color."
                }));
            });
        }
    }
});