Emotivecolor.EmotionController = Ember.ObjectController.extend({
    isEmotionVisible: false,
    isAllUsers: true,
    init: function () {
        // First Time:
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initControls();
        this.drawLines();
        this.initClicker();
        this.resizeWindow(); // Doesn't work alongsize Clicker yet.
        // Every Time:
        this.initContainer();
        this.animate();
    },
    initScene: function () {
        this.set('scene', new THREE.Scene());
    },
    initCamera: function () {
        this.set('camera', new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 20000));
        this.set('camera.position.y', 600);
    },
    initRenderer: function () {
        var self = this;
        if (Detector.webgl) {
            self.set('renderer', new THREE.WebGLRenderer({
                antialias: true
            }));
            var image = document.createElement('img');
            image.src = 'data:image/png;base64,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'; // Saves another request.
            self.texture = new THREE.Texture(image);
            self.texture.needsUpdate = true;
        } else {
            self.set('renderer', new THREE.CanvasRenderer());
        }

        self.renderer.setSize(window.innerWidth, window.innerHeight);
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
        window.addEventListener('dblclick', function (event) {
            if (event.target === self.renderer.domElement) {
                event.preventDefault();
                var camera = self.get('camera');
                var scene = self.get('scene');
                var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
                var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
                self.projector.unprojectVector(vector, self.camera);
                var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
                var intersects = raycaster.intersectObjects(scene.children);
                if (intersects[0]) {
                    var intersectId = intersects[0].point.w || intersects[0].object.name;
                    self.transitionToRoute('color', intersectId); /* intersects[0].point.w | */
                }
            }
        }, false);
    },
    initContainer: function () {
        var self = this;
        document.body.appendChild(self.get('renderer').domElement);
        self.set('renderCanvas', true);
    },
    resizeWindow: function () {
        var self = this,
            callback = function () {
                self.renderer.setSize(window.innerWidth, window.innerHeight);
                self.camera.aspect = window.innerWidth / window.innerHeight;
                self.camera.updateProjectionMatrix();
            };

        window.addEventListener('resize', callback, false);
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
        context.arc(0, 0, 0.5, 0, 2 * Math.PI, true);
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

            self.get('filteredContent').forEach(function (indiv, index) {

                var vertex = new THREE.Vector4();
                vertex.x = indiv.get('radial3Y');
                vertex.y = indiv.get('radial3Z');
                vertex.z = indiv.get('radial3X'); //Reordered for controls to work more naturally (Orbit controls are Y-up).
                vertex.w = indiv.get('id');
                geometry.vertices.push(vertex);
                vertexColors.push(new THREE.Color());
                vertexColors[index].setHex(indiv.get('hexo'));
            });

            geometry.colors = vertexColors;
            material = new THREE.ParticleSystemMaterial({
                size: 30,
                map: self.texture,
                vertexColors: true,
                transparent: true
            });
            material.alphaTest = 0.5; //Stops black edges on transparent png
            self.particles = new THREE.ParticleSystem(geometry, material);
            self.particles.sortParticles = true;

            self.scene.add(self.particles);

        } else { // Canvas

            self.get('filteredContent').forEach(function (indiv, index) {
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
                indiv.sprite.name = indiv.get('id');
                indiv.sprite.scale.x = indiv.sprite.scale.y = 5;

                geometry.vertices.push(indiv.sprite.position);
                self.scene.add(indiv.sprite);
            });
        }

        // self.scene.add(new THREE.Mesh(new THREE.SphereGeometry(50, 10, 10), new THREE.MeshNormalMaterial()));

        return self.get('filteredContent.length');

    }.property('@each', 'isAllUsers'),
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
    cleanup: function () {
        var self = this;

        // Cleanup visualised model.
        if (self.get('renderer') instanceof THREE.WebGLRenderer) {
            self.scene.remove(self.particles); // For WebGL
            self.particles = [];
        } else {
            self.get('model').forEach(function (indiv) { //For 2D Canvas
                self.scene.remove(indiv.sprite);
            });
        }
    },
    filteredContent: function () {
        var model = this.get('model');

        if (!model || this.get('isAllUsers')) {
            return model;
        }

        return model.filter(function (item) {
            return item.get('mine');
        });
    }.property('model.isLoaded', 'isAllUsers'),
    actions: {
        resetCamera: function () {
            // This order is important
            this.set('controls.target', new THREE.Vector3(0, 0, 0));
            this.set('camera.position.x', 0);
            this.set('camera.position.z', 0);
            this.set('camera.position.y', 600);
        },
        click: function (emotion) {
            this.cleanup();
            this.transitionToRoute('emotion', emotion);
            this.toggleProperty('isEmotionVisible');
            jQuery('canvas').removeClass('blur');
        },
        toggleEmotionModal: function () {
            this.toggleProperty('isEmotionVisible');
            jQuery('canvas').toggleClass('blur');
        },
        toggleAllUsers: function () {
            this.cleanup();
            this.toggleProperty('isAllUsers');
        }
    }
});