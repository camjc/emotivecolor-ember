Emotivecolor.EmotionRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('color', {"emotion": params.emotion, "sort": "h" });
  }
});

