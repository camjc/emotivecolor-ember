Emotivecolor.Router.map(function () {

    this.resource('post', { path: '/post/:post_id' });
    this.resource('post.new', { path: '/post/new' });
    this.resource('emotions');
    this.resource('emotion', { path: '/emotion/:emotion' });
    this.resource('about', { path: '/' });
    this.resource('user');

});