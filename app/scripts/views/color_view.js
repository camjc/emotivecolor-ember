Emotivecolor.ColorView = Ember.View.extend({
    templateName: 'color',
	willClearRender: function(){
		//Reset the body color to dark gray after leaving this view
		$('body').css('color', '#333');
	}
});
