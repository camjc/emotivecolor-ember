Emotivecolor.EmotionView = Ember.View.extend({
    templateName: 'emotion',
    willClearRender: function () {
        //remove threejs after leaving the view
        var controller = this.get('controller');
        // controller.scene.remove(controller.camera);
        controller.scene.remove(controller.particles);
        // controller.renderer.clear();
        // controller.camera = null;
        // controller.scene = null;
        // controller.renderer = null;
        controller.particles = [];
        jQuery('canvas').remove();
        controller.set('renderCanvas', null);
    }
});