Emotivecolor.ColorNewRoute = Ember.Route.extend({
    model: function(model) {
        return this.get('store').find('color', model.color_id);
    }
});

// App.LocateRoute = Ember.Route.extend({
//   setupController: function(controller, model) {
//     navigator.geolocation.getCurrentPosition(controller.geoLocation)
// }
// });

// App.LocateController = Ember.Controller.extend({
//   geoLocation: function(location){
//     this.set('latitude', location.coords.latitude);
//     this.set('longitude', location.coords.longitude);
// }
// });