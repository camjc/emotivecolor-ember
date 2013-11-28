/*Ember.Application.initializer({
    name: 'authentication',
    initialize: function(container, application) {
        Ember.SimpleAuth.setup(container, application);
    }
});*/

var Emotivecolor = window.Emotivecolor = Ember.Application.create({
    LOG_TRANSITIONS: true
});

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');