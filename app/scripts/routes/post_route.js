Emotivecolor.PostRoute = Ember.Route.extend({
    model: function (model) {
        return this.get('store').find('post', model.post_id);
    }
});

