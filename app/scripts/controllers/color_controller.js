Emotivecolor.ColorController = Ember.ObjectController.extend({
    controlColor: function (bgHex) {
        var rgb = ntc.rgb('#' + bgHex),
            luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]; // per ITU-R BT.709

        if (luma < 128) { // If it is too dark for black
            return '#fff';
        }
        return '#333';
    },
	fillStyle: function () {
		jQuery('body').css('color', this.controlColor(this.get('hex')));
		return 'background-color:#' + this.get('hex');
	}.property('hex'),
	getName: function () {
		var n_match  = ntc.name('#' + this.get('hex'));
		this.set('colorName', n_match[1]);
		return this.get('colorName');
	}.property('hex'),
    actions: {
        back: function () {
            history.back(-1);
        },
        delete: function (item) {
            // this tells Ember-Data to delete the color passed in as item
            this.get('model').deleteRecord(item);
            this.get('model').save().then(function () {
                Emotivecolor.alertController.popObject(); // Removes Previous Message
                Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  "Deleted a color." }));
                Emotivecolor.transitionToRoute('about'); //Doesn't do anything yet.
            }, function () {
                Emotivecolor.alertController.popObject(); // Removes Previous Message
                Emotivecolor.alertController.pushObject(Ember.Object.create({ message:  "Could not delete this color." }));
            });
        }
    }
});