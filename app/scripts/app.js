var Emotivecolor = window.Emotivecolor = Ember.Application.createWithMixins(Ember.Facebook);
Emotivecolor.set('appId', '538053639619169');


/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');