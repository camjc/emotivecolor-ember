Emotivecolor.PostView = Ember.View.extend({
    templateName: 'post',
	willClearRender: function () {
		//Reset the body color to dark gray after leaving this view
		jQuery('body').css('color', '#333');
	}
});
