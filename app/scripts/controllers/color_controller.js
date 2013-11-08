var colorname = [];

Emotivecolor.ColorController = Ember.ObjectController.extend({
	needs: ['color_new'],
	sortProperties: ['content.hex'],
	sortAscending: true, // false = descending
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
		createColor: function () {
		}
	}
});