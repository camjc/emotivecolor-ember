Emotivecolor.Router.map(function () {

    this.resource('colors');
    this.resource('color', { path: '/color/:color_id' });
    this.resource('color.new', { path: '/color/new' });
    this.resource('emotions', { path: 'emotions' });
    this.resource('emotion', { path: '/emotion/:emotion' });
    this.resource('about');
    // this.route('login');
    // //protected route that's inaccessible without authentication
    // this.route('protected');
});

// Emotivecolor.ProtectedRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin);