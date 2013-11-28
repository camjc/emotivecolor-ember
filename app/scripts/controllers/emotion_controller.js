Emotivecolor.EmotionController = Ember.ObjectController.extend({
    circleVis: true,
    actions: {
        swapVis: function() {
            if( this.get('circleVis') === true){
                this.set('circleVis', false);
            } else {
                this.set('circleVis', true);
            }
        },
        delete: function( item ) {
            // this tells Ember-Data to delete the color passed in as item
            this.get('model').removeObject(item);
            this.get('model').save().then(function() {
                Emotivecolor.alertController.popObject(); // Removes Previous Message
                Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  "Deleted a color." }));
            }, function() {
                Emotivecolor.alertController.popObject(); // Removes Previous Message
                Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  "Could not delete this color." }));
            });
        }
    } //Same as in the colors controller, can I DRY this?
});