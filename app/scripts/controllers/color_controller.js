var colorname = [];

Emotivecolor.ColorController = Ember.ObjectController.extend({
	needs: ['color_new'],
	// sortProperties: ['content.hex'],
	// sortAscending: true, // false = descending
	description: function() {
		return this.get("content.hex") + " - " + this.get("content.emotion");
	}.property("content.hex", "content.emotion"),
	fillStyle: function() {
		jQuery('body').css('color', this.get('controllers.color_new').controlColor(this.get('hex')));
		return 'background-color:#' + this.get('hex');
	}.property('hex'),
	getName: function() {
		var n_match  = ntc.name("#" + this.get('content.hex'));
		colorname = n_match[1];
		return colorname;
	}.property('content.hex'),
	actions: {
		// delete: function(){
		// 	// this tells Ember-Data to delete the current user
		// 	this.get('model').deleteRecord();
		// 	this.get('model').save().then(function() {
		// 		Emotivecolor.alertController.popObject(); // Removes Previous Message
		// 		Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  "Deleted a color." }));
		// 		this.transitionToRoute('colors');
		// 	}, function() {
		// 		Emotivecolor.alertController.popObject(); // Removes Previous Message
		// 		Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  "Could not delete this color." }));
		// 	});
		// }
	}
});