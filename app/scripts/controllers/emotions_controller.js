Emotivecolor.EmotionsController = Ember.ObjectController.extend({
    actions: {
        click: function (emotion) {
            console.log(emotion);
            this.transitionToRoute ('/emotion/' + emotion); //This is breaking the route URL, still works but URL goes to undefined.
        }
    }
});