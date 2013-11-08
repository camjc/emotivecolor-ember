// Emotivecolor.ColorNewController = Ember.ObjectController.extend({
//   save: function(){
//     // we're cheating here that there's no commit()
//     // but the UI element is already bound to the model
//     this.transitionToRoute('color',this.get('model'));
//   }
// });

var currentcolor = "FA00E0";
var colorname = "unnamed";
Emotivecolor.ColorNewController = Ember.ObjectController.extend({
	selectedEmotion: null,
	emotions: [
		"Happy",
		"Flirty",
		"Surprised",
		"Confused",
		"Sad",
		"Anxious",
		"Angry",
		"Love",
		"Neutral",
	],
	init: function() {
		this.send('generatedColor');
	},
	controlColor: function (bgHex) {
		var rgb = parseInt(bgHex, 16);   // convert rrggbb to decimal
		var r = (rgb >> 16) & 0xff;  // extract red
		var g = (rgb >>  8) & 0xff;  // extract green
		var b = (rgb >>  0) & 0xff;  // extract blue

		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

		if (luma < 128) { // If it is too dark for black
		    return '#fff';
		}
		return '#333';
	},
	fillStyle: function() {
		jQuery('body').css('color', this.controlColor(this.get('hex')));
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
		save: function (emotion) {
			// Check that emotion passed from the template matches something in the above array
			if (jQuery.inArray( emotion, this.emotions) === -1){
				return;
			}
			// Create the new Color model
			var color = this.store.createRecord('color', {
				hex: currentcolor,
				emotion: emotion
			});

			// Clear the "New Color" text field
			this.set('newEmotion', '');

			// Save the new model
			color.save().then(function() {
				Emotivecolor.alertController.popObject(); // Removes Previous Message
				Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  colorname + " made you feel " + emotion + "." }));
			}, function() {
				console.log('It Failed, boo!')
			});
			this.send('generatedColor');
		}
	}
});