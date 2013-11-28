Emotivecolor.EmotionsController = Ember.ObjectController.extend({
    actions: {
        click: function (emotion) {
            console.log(emotion);
            this.transitionToRoute ('emotion', emotion);
        }
    }
});