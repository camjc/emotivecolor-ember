Emotivecolor.EmotionView = Ember.View.extend({
    templateName: 'emotion',
    willClearRender: function () {
        //remove threejs after leaving the view
        var controller = this.get('controller');
        // controller.scene.remove(controller.camera);

        // Cleanup visualised model.
        if (controller.get('renderer') instanceof THREE.WebGLRenderer) {
            controller.scene.remove(controller.particles); // For WebGL
            controller.particles = [];
        } else {
            controller.get('model').forEach(function (indiv) { //For 2D Canvas
                controller.scene.remove(indiv.sprite);
            });
        }

        // controller.renderer.clear();
        // controller.camera = null;
        // controller.scene = null;
        // controller.renderer = null;
        
        // Remove the element from the page.
        jQuery('canvas').remove();
        controller.set('renderCanvas', null);
    }
});