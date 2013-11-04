// Emotivecolor.ColorEditController = Ember.ObjectController.extend({
//   save: function(){
//     // we're cheating here that there's no commit()
//     // but the UI element is already bound to the model
//     this.transitionToRoute('color',this.get('model'));
//   }
// });

var currentcolor = "FA00E0";
var colorname = "unnamed";
Emotivecolor.ColorEditController = Ember.ObjectController.extend({
	selectedEmotion: null,
	emotions: [
		"Happy",
		"Flirty",
		"Surprised",
		"Confused",
		"Sad",
		"Frustrated",
		"Angry",
		"Love",
		"Neutral",
	],
	init: function() {
		this.send('generatedColor');
	},
	fillStyle: function() {
		return 'background-color:#' + this.get('hex');
	}.property('hex'),
	getName: function() {
		var n_match  = ntc.name("#" + this.get('hex'));
		colorname =n_match[1];
		return colorname;
	}.property('hex'),
	actions: {
		generatedColor: function() {
			currentcolor =  ('000000' + (Math.floor(Math.random()*0xFFFFFF)).toString(16)).slice(-6);
			this.set("hex",currentcolor);
		},
		save: function () {
			// Get the emotion title set by the "New Color" text field
			var emotion = this.get('newEmotion');
			if (!emotion.trim()) { return; }
			// Create the new Color model
			var color = this.store.createRecord('color', {
				hex: currentcolor,
				emotion: emotion
			});

			// Clear the "New Color" text field
			this.set('newEmotion', '');

			// Save the new model
			color.save().then(function() {
				// SUCCESS
			}, function() {
				// FAILURE
			});
			Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  colorname + " made you feel " + emotion + "." }));
			this.send('generatedColor');
		}
	}
});