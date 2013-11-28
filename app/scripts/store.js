Emotivecolor.Store = DS.Store.extend();
Emotivecolor.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:3000'
});


// Makes emberData like underscored id's from mongodb
Emotivecolor.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: "_id"
});