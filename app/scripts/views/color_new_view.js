Emotivecolor.ColorNewView = Ember.View.extend({
    templateName: 'color_new',
	willClearRender: function () {
		//Reset the body color to dark gray after leaving this view
		jQuery('body').css('color', '#333');
	}
});