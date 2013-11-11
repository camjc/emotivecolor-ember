// Emotivecolor.ColorNewController = Ember.ObjectController.extend({
//   save: function(){
//     // we're cheating here that there's no commit()
//     // but the UI element is already bound to the model
//     this.transitionToRoute('color',this.get('model'));
//   }
// });

Emotivecolor.ColorNewController = Ember.ObjectController.extend({
	currentColor: 'FA00E0',
	colorName: 'unnamed',
	currentLat: 0,
	currentLng: 0,
	userAgent: null,
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
		this.userData();
	},
	userData: function () {
	    var _self = this;

		_self.set('userAgent', navigator.userAgent); //Set UserAgent

		function displayPosition(position) {
			_self.setProperties({ 'currentLat': position.coords.latitude, 'currentLng': position.coords.longitude });
		}
		function displayError(error) {
			var errors = { 
				1: 'Permission denied',
				2: 'Position unavailable',
				3: 'Request timeout'
			};
			console.log('Error: ' + errors[error.code]);
		}

		if (navigator.geolocation) {
			var timeoutVal = 10 * 1000 * 1000;
			navigator.geolocation.getCurrentPosition(
				displayPosition, 
				displayError,
				{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
				);
		}
		else {
			console.log('Geolocation is not supported by this browser');
		}
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
		this.set('colorName', n_match[1]);
		return this.get('colorName');
	}.property('hex'),
	actions: {
		generatedColor: function() {
			var genCol = ('000000' + (Math.floor(Math.random()*0xFFFFFF)).toString(16)).slice(-6);
			this.set('currentColor', genCol);
			this.set('hex', genCol);
		},
		click: function (emotion) {
			// Create the new Color model
			var thisColor = this.get('currentColor'),
				color = this.store.createRecord('color', {
				hex: thisColor,
				emotion: emotion,
				r: ntc.rgb('#' + thisColor)[0],
				g: ntc.rgb('#' + thisColor)[1],
				b: ntc.rgb('#' + thisColor)[2],
				h: ntc.hslCamJC('#' + thisColor)[0],
				s: ntc.hslCamJC('#' + thisColor)[1],
				l: ntc.hslCamJC('#' + thisColor)[2],
				date: new Date(),
				lat: this.get('currentLat'),
				lng: this.get('currentLng'),
				ua: this.get('userAgent'),
			}),
			messageColorName = this.get('colorName'); // Otherwise it may have changed by the time the message appears. 

			// Check that emotion passed from the template matches something in the above array
			if (jQuery.inArray( emotion, this.emotions) === -1){
				return;
			}

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