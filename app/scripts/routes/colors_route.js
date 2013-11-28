// Emotivecolor.ColorsRoute = Ember.Route.extend({
//     model: function() {
//         return this.get('store').find('color');
//     }
// });


Emotivecolor.ColorsRoute = Ember.Route.extend(/*Ember.SimpleAuth.AuthenticatedRouteMixin, */{
    model: function() {
        return this.get('store').find('color', {"sort": "h" });
    }
});