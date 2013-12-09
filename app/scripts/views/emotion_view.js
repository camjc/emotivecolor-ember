Emotivecolor.EmotionView = Ember.View.extend({
    templateName: 'emotion',
    //remove threejs after leaving the view
    willClearRender: function () {
        var controller = this.get('controller');

        // Cleanup visualised model.
        if (controller.get('renderer') instanceof THREE.WebGLRenderer) {
            controller.scene.remove(controller.particles); // For WebGL
            controller.particles = [];
        } else {
            controller.get('model').forEach(function (indiv) { //For 2D Canvas
                controller.scene.remove(indiv.sprite);
            });
        }

        // Remove the element from the page.
        jQuery('canvas').remove();
        controller.set('renderCanvas', null);
    }
});