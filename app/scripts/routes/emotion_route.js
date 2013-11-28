Emotivecolor.EmotionRoute = Ember.Route.extend({
    model: function (params) {
        this.set('currentEmotion', params.emotion);
        return this.get('store').find('color', {"emotion": params.emotion, "sort": "h" });
    }
});

