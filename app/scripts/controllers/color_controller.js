// var colorname = [];

Emotivecolor.ColorController = Ember.ObjectController.extend({
	needs: ['color_new'],
	fillStyle: function() {
		jQuery('body').css('color', this.get('controllers.color_new').controlColor(this.get('hex')));
		return 'background-color:#' + this.get('hex');
	}.property('hex'),
	getName: function() {
		var n_match  = ntc.name('#' + this.get('hex'));
		this.set('colorName', n_match[1]);
		return this.get('colorName');
	}.property('hex'),
    actions: {
        delete: function( item ){
            // this tells Ember-Data to delete the color passed in as item
            this.get('model').deleteRecord(item);
            this.get('model').save().then(function() {
                Emotivecolor.alertController.popObject(); // Removes Previous Message
                Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  "Deleted a color." }));
                Emotivecolor.transitionToRoute('about'); //Doesn't do anything yet.
            }, function() {
                Emotivecolor.alertController.popObject(); // Removes Previous Message
                Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  "Could not delete this color." }));
            });
        }
    }
});