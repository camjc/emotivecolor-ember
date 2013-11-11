Emotivecolor.Router.map(function () {

    this.resource('colors');
    this.resource('color', { path: '/color/:color_id' });
    this.resource('color.new', { path: '/' });
    this.resource('emotions', { path: 'emotions' });
    this.resource('emotion', { path: '/emotion/:emotion' });
    this.resource('about');
});