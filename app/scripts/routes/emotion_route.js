Emotivecolor.EmotionRoute = Ember.Route.extend({
    model: function (params) {
        this.set('routeEmotion', params.emotion);
        return this.get('store').find('color', {"emotion": params.emotion, "sort": "h" });
    },
    setupController: function (controller, model) {
        controller.set('content', model);
        controller.set('currentEmotion', this.get('routeEmotion'));
    }
});

