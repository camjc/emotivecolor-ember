Emotivecolor.ColorsController = Ember.ObjectController.extend({
    init: function () {
        var self = this;
        self.set('scene', new THREE.Scene());

        self.set('camera', new THREE.PerspectiveCamera(20, 1280 / 720, 1, 20000));
        self.set('camera.position.y', 800);

        // if (window.WebGLRenderingContext) {
            self.set('renderer', new THREE.WebGLRenderer({ antialias: true }));
        // } else {
        //     self.set('renderer', new THREE.CanvasRenderer());
        // }
        self.renderer.setSize(1280, 720);
        self.renderer.setClearColor(0xD1D1D1, 1);
        self.scene.fog = new THREE.FogExp2( 0xD1D1D1, 0.0001 );
        self.sprite = THREE.ImageUtils.loadTexture( "images/circleB.png" );

        self.set('controls', new THREE.OrbitControls(self.camera, self.renderer.domElement));

        // self.scene.add(new THREE.Mesh(new THREE.SphereGeometry(50, 100, 100), new THREE.MeshNormalMaterial()));

        // document.body.appendChild(self.get('renderer').domElement);
        // self.set('canvas', '<div id="canvas"></div>');
        document.body.appendChild(self.get('renderer').domElement);
        self.animate();
    },
    mesher: function(){
        var self = this,
            geometry = new THREE.Geometry(),
            vertexColors = [];
        if (self.get('camera') === null){ //Initalize scene if it hasn't already (returning to view)
            self.init();
        }
        self.get('model').forEach(function (indiv, index) {

            var vertex = new THREE.Vector3();
            vertex.x = indiv.get('radial3Y');
            vertex.y = indiv.get('radial3Z');
            vertex.z = indiv.get('radial3X'); //Reordered for controls to work more naturally.
            geometry.vertices.push( vertex );
            var thishex = indiv.get('hexo');
            vertexColors.push(new THREE.Color( 0x0000ff ));
            vertexColors[ index ].setHex( indiv.get('hexo') );
        });

        geometry.colors = vertexColors;
        material = new THREE.ParticleSystemMaterial( { size: 50, map: self.sprite, vertexColors: true, transparent: true } );
        material.alphaTest = 0.5; //Stops black edges on transparent png
        self.particles = new THREE.ParticleSystem( geometry, material );
        self.particles.sortParticles = true;
        self.scene.add( self.particles );

        return self.get('model.length');

    }.property('@each'),
    render: function () {
        var self = this;
        self.renderer.render(self.scene, self.camera);
        self.controls.update();
    },
    animate: function () {
        var self = this;
        if (self.camera !== null) { // Checks that the camera still exists before looping.
            requestAnimationFrame(function() {
                return self.animate();
            });
            self.render();
        }
    },
    total: function () {
        return this.get('model').reduce(function (previousValue, item, index, enumerable) {
            return previousValue + item.h;
        }, 0);
        return this.get('model');
    }.property('model.@each'),
    actions: {
        delete: function (item) {
            // this tells Ember-Data to delete the color passed in as item
            this.get('model').removeObject(item);
            this.get('model').save().then(function () {
                Emotivecolor.alertController.popObject(); // Removes Previous Message
                Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  "Deleted a color." }));
            }, function () {
                Emotivecolor.alertController.popObject(); // Removes Previous Message
                Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  "Could not delete this color." }));
            });
        }
    } //Same as in the emotions controller, can I DRY this?
});




// <script>
// var camera, scene, renderer,
//     geometry, material, mesh, controls,
//     container = $('.threevis');

// function init() {
//     scene = new THREE.Scene();

//     camera = new THREE.PerspectiveCamera(20, 1280 / 720, 1, 10000);
//     camera.position.z = 700;

//     if (window.WebGLRenderingContext) {
//         renderer = new THREE.WebGLRenderer({ antialias: true });
//     } else {
//         renderer = new THREE.CanvasRenderer();
//     }
//     renderer.setSize(1280, 720);
//     renderer.setClearColor(0xD1D1D1, 1);

//     controls = new THREE.OrbitControls(camera, renderer.domElement);

//     container.append(renderer.domElement);
// }

// function render() {
//     renderer.render(scene, camera);
//     controls.update();
// }

// function animate() {
//     // note: three.js includes requestAnimationFrame shim
//     requestAnimationFrame(animate);
//     render();
// }

// init();
// animate();

// </script>

// {{#each model}}
//     <script>
//         geometry{{unbound id}} = new THREE.SphereGeometry( 5, 8, 8 );
//         material{{unbound id}} = new THREE.MeshBasicMaterial( { color: 0x{{unbound hex}} } );

//         mesh{{unbound id}} = new THREE.Mesh( geometry{{unbound id}}, material{{unbound id}} );
        
//         mesh{{unbound id}}.position.x = {{unbound radial3X}};
//         mesh{{unbound id}}.position.y = {{unbound radial3Y}};
//         mesh{{unbound id}}.position.z = ({{unbound l}} * 2) - 100;

//         scene.add( mesh{{unbound id}} );
//     </script>
// {{/each}}