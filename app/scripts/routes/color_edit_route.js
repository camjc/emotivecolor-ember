Emotivecolor.ColorEditRoute = Ember.Route.extend({
  model: function(model) {
    return this.get('store').find('color', model.color_id);
  }
});

