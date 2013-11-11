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
	}.property('hex')
});