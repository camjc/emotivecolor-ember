// Emotivecolor.ColorNewController = Ember.ObjectController.extend({
//   save: function(){
//     // we're cheating here that there's no commit()
//     // but the UI element is already bound to the model
//     this.transitionToRoute('color',this.get('model'));
//   }
// });

var currentcolor = 'FA00E0',
	colorname = 'unnamed',
	currentlocation = {};
Emotivecolor.ColorNewController = Ember.ObjectController.extend({
	selectedEmotion: null,
	emotions: [
		'Happy',
		'Flirty',
		'Surprised',
		'Confused',
		'Sad',
		'Anxious',
		'Angry',
		'Love',
		'Neutral',
	],
	init: function() {
		this.send('generatedColor');
		this.geoLocation();
	},
	geoLocation: function () {
		if (navigator.geolocation) {
			var timeoutVal = 10 * 1000 * 1000;
			navigator.geolocation.getCurrentPosition(
				displayPosition, 
				displayError,
				{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
				);
		}
		else {
			alert('Geolocation is not supported by this browser');
		}

		function displayPosition(position) {
			currentlocation.lat = position.coords.latitude;
			currentlocation.lng = position.coords.longitude;
		}
		function displayError(error) {
			var errors = { 
				1: 'Permission denied',
				2: 'Position unavailable',
				3: 'Request timeout'
			};
			alert('Error: ' + errors[error.code]);
		}

		return currentlocation;
	},
	controlColor: function (bgHex) {
		var rgb = ntc.rgb('#' + bgHex),
			luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]; // per ITU-R BT.709

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
		var n_match  = ntc.name('#' + this.get('hex'));
		colorname =n_match[1];
		return colorname;
	}.property('hex'),
	actions: {
		generatedColor: function() {
			currentcolor =  ('000000' + (Math.floor(Math.random()*0xFFFFFF)).toString(16)).slice(-6);
			this.set('hex',currentcolor);
		},
		click: function (emotion) {
			// Create the new Color model
			var color = this.store.createRecord('color', {
				hex: currentcolor,
				emotion: emotion,
				r: ntc.rgb('#' + currentcolor)[0],
				g: ntc.rgb('#' + currentcolor)[1],
				b: ntc.rgb('#' + currentcolor)[2],
				h: ntc.hslCamJC('#' + currentcolor)[0],
				s: ntc.hslCamJC('#' + currentcolor)[1],
				l: ntc.hslCamJC('#' + currentcolor)[2],
				date: new Date(),
				lat: currentlocation.lat,
				lng: currentlocation.lng,
			}),
			messageColorName = colorname; // Otherwise it may have changed by the time the message appears. 

			// Check that emotion passed from the template matches something in the above array
			if (jQuery.inArray( emotion, this.emotions) === -1){
				return;
			}
			console.log(currentlocation);

			// Save the new model
			color.save().then(function() {
				Emotivecolor.alertController.popObject(); // Removes Previous Message
				Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  messageColorName + ' made you feel ' + emotion + '.' }));
			}, function() {
				Emotivecolor.alertController.popObject(); // Removes Previous Message
				Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  'Failed to save to database' }));
			});
			this.send('generatedColor');
		}
	}
});