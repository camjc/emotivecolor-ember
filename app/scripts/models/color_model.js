/*global Ember*/
Emotivecolor.Color = DS.Model.extend({
    hex: DS.attr('string'),

    emotion: DS.attr('string')
});

// probably should be mixed-in...
Emotivecolor.Color.reopen({
  // certainly I'm duplicating something that exists elsewhere...
  attributes: function(){
    var attrs = [];
    var model = this;
    Ember.$.each(Ember.A(Ember.keys(this.get('data'))), function(idx, key){
      var pair = { key: key, value: model.get(key) };
      attrs.push(pair);
    });
    return attrs;
  }.property()
});

// delete below here if you do not want fixtures
Emotivecolor.Color.FIXTURES = [
  
  {
   id: 0,
   hex: '9a6366',
   emotion: 'Love'
 },
 {
   id: 1,
   hex: 'b553be',
   emotion: 'Flirty'
 },
 {
   id: 2,
   hex: '2ef63b',
   emotion: 'Surprised'
 },
 {
   id: 3,
   hex: 'de8c9a',
   emotion: 'Happy'
 },
 {
   id: 4,
   hex: 'be40c7',
   emotion: 'Frustrated'
 }
  
];