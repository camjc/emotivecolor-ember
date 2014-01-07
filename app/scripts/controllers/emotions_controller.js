Emotivecolor.EmotionsController = Ember.ObjectController.extend({
    actions: {
        click: function (emotion) {
            this.transitionToRoute('emotion', emotion);
        }
    }
});