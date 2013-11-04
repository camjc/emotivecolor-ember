// Emotivecolor.ColorsController = Ember.ObjectController.extend({
//   // Implement your controller here.
// });



var colorname = [];

Emotivecolor.ColorController = Ember.ObjectController.extend({
	description: function() {
		return this.get("content.hex") + " - " + this.get("content.emotion");
	}.property("content.hex", "content.emotion"),
	fillStyle: function() {
		$('body').css('color', this.controllerFor("color_new").controlColor(this.get('hex')));
		return 'background-color:#' + this.get('hex');
	}.property('hex'),
	getName: function() {
		var n_match  = ntc.name("#" + this.get('content.hex'));
		colorname = n_match[1];
		return colorname;
	}.property('content.hex'),
	isCompleted: function(key, value){
		var model = this.get('model');

		if (value === undefined) {
			// property being used as a getter
			return model.get('emotion');
		} else {
			// property being used as a setter
			model.set('emotion', value);
			model.save();
			return value;
		}
	}.property('model.emotion'),
	actions: {
		createColor: function () {
			// Get the todo title set by the "New Color" text field
			var emotion = this.get('newEmotion');
			if (!emotion.trim()) { return; }

			// Create the new Color model
			var color = this.store.createRecord('color', {
				hex: "#123",
				emotion: emotion
			});

			// Clear the "New Color" text field
			this.set('newEmotion', '');

			// Save the new model
			color.save();
		}
	}
});