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
        this.drawLines();
        this.initClicker();
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
            self.sprite = THREE.ImageUtils.loadTexture("images/circleB.png"); //Isn't found on compile because of renaming
        } else {
            self.set('renderer', new THREE.CanvasRenderer());
        }

        self.renderer.setSize(1280, 720);
        self.renderer.setClearColor(0xD1D1D1, 1);
        self.scene.fog = new THREE.FogExp2(0xD1D1D1, 0.0001);
    },
    initControls: function () {
        var self = this;
        self.set('controls', new THREE.OrbitControls(self.camera, self.renderer.domElement));
    },
    initClicker: function () {
        var self = this;
        self.set('projector', new THREE.Projector());
        window.addEventListener('mousedown', function (event){
            if (event.target === self.renderer.domElement) {
                var camera = self.get('camera');
                var scene = self.get('scene');
                event.preventDefault();
                var mouseX = (event.clientX / window.innerWidth)*2-1;
                var mouseY = -(event.clientY / window.innerHeight)*2+1;
                var vector = new THREE.Vector3( mouseX, mouseY, 0.5 );
                self.projector.unprojectVector( vector, self.camera );
                var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
                var intersects = raycaster.intersectObjects( scene.children );
                if (intersects[0].point) {
                    console.log(intersects[0].point);
                }
            }
        }, false);
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
        context.beginPath();
        context.arc( 0, 0, 0.5, 0, 2 * Math.PI, true );
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
        if (self.get('renderer') instanceof THREE.WebGLRenderer) {

            self.get('model').forEach(function (indiv, index) {

                var vertex = new THREE.Vector3();
                vertex.x = indiv.get('radial3Y');
                vertex.y = indiv.get('radial3Z');
                vertex.z = indiv.get('radial3X'); //Reordered for controls to work more naturally (Orbit controls are Y-up).
                geometry.vertices.push(vertex);
                vertexColors.push(new THREE.Color());
                vertexColors[index].setHex(indiv.get('hexo'));
            });

            geometry.colors = vertexColors;
            material = new THREE.ParticleSystemMaterial({
                size: 30,
                map: self.sprite,
                vertexColors: true,
                transparent: true
            });
            material.alphaTest = 0.5; //Stops black edges on transparent png
            self.particles = new THREE.ParticleSystem(geometry, material);
            self.particles.sortParticles = true;

            self.scene.add(self.particles);

        } else { // Canvas

            self.get('model').forEach(function (indiv, index) {
                self.spriteCount += 1;
                var indivColor = new THREE.Color();
                indivColor.setHex(indiv.get('hexo'));
                var material = new THREE.SpriteCanvasMaterial({
                    color: indivColor,
                    program: self.drawCircle
                });
                indiv.sprite = new THREE.Sprite(material);
                indiv.sprite.position.x = indiv.get('radial3Y');
                indiv.sprite.position.y = indiv.get('radial3Z');
                indiv.sprite.position.z = indiv.get('radial3X');
                indiv.sprite.scale.x = indiv.sprite.scale.y = 5;

                geometry.vertices.push(indiv.sprite.position);
                self.scene.add(indiv.sprite);
            });
        }

        // self.scene.add(new THREE.Mesh(new THREE.SphereGeometry(50, 10, 10), new THREE.MeshNormalMaterial()));

        return self.get('model.length');

    }.property('@each'),
    drawLines: function () {
        var material = new THREE.LineBasicMaterial({
            color: 0xdddddd,
            linewidth: 2
        });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(100, 0, 0));
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(-50, 0, -86.6));
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(-50, 0, 86.6));
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(0, 100, 0));
        geometry.vertices.push(new THREE.Vector3(0, -100, 0));

        var line = new THREE.Line(geometry, material);

        this.scene.add(line);
        // TODO: Change to Vertex colors (mid gray to whatever the full color/shade is)
    },
    actions: {
        resetCamera: function () {
            // This order is important
            this.set('controls.target', new THREE.Vector3(0,0,0) );
            this.set('camera.position.x', 0);
            this.set('camera.position.z', 0);
            this.set('camera.position.y', 600);
        },
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