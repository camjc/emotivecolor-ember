Emotivecolor.Router.map(function () {

    this.resource('color', { path: '/color/:color_id' });
    this.resource('color.new', { path: '/color/new' });
    this.resource('emotions', { path: 'emotions' });
    this.resource('emotion', { path: '/emotion/:emotion' });
    this.resource('about', { path: '/' });
    this.resource('manage');
    
});