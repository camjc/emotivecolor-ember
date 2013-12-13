Emotivecolor.PostNewView = Ember.View.extend({
    templateName: 'post_new',
	willClearRender: function () {
		//Reset the body color to dark gray after leaving this view
		jQuery('body').css('color', '#333');
        Emotivecolor.alertController.popObject(); // Removes Previous Message
	}
});