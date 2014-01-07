Emotivecolor.PostNewRoute = Ember.Route.extend({
    model: function (model) {
        return this.get('store');
    }
});