Emotivecolor.Color = DS.Model.extend({
    hex: DS.attr('string'),

    emotion: DS.attr('string'),

    r: DS.attr('number'),
    g: DS.attr('number'),
    b: DS.attr('number'),

    h: DS.attr('number'),
    s: DS.attr('number'),
    l: DS.attr('number'),

    date: DS.attr('date'),

    lat: DS.attr('number'),
    lng: DS.attr('number'),

    ua: DS.attr('string'),

    lum: DS.attr('number'),
});

Emotivecolor.Color.reopen({
    degToRad: function (deg) {
        return deg / 180 * Math.PI;
    },
    radialX: function () {
        var basePos = Math.sin(this.degToRad(this.get('h'))) * (this.get('s') + (this.get('l') / 10));
        return (basePos + 50).toFixed(2);
    }.property('h', 's', 'l'),
    radialY: function () {
        var basePos = Math.cos(this.degToRad(this.get('h'))) * (this.get('s') + (this.get('l') / 10));
        return -1 * (basePos - 90).toFixed(2);
    }.property('h', 's', 'l'),
    radial3X: function () {
        var basePos = Math.sin(this.degToRad(this.get('h'))) * this.get('s');
        return basePos;
    }.property('h', 's', 'l'),
    radial3Y: function () {
        var basePos = Math.cos(this.degToRad(this.get('h'))) * this.get('s');
        return basePos;
    }.property('h', 's', 'l'),
    size: function () {
        return ((this.get('l') + (this.get('s') / 2)) / 8).toFixed(2);
    }.property('l'),
    linearX: function () {
        return this.get('h') / 3.6; /* 360/100 */
    }.property('h'),
    linearY: function () {
        return 100 - this.get('l');
    }.property('l'),
    // attributes: function () {
    // probably should be mixed-in...
    // certainly I'm duplicating something that exists elsewhere...
    //     var attrs = [];
    //     var model = this;
    //     Ember.$.each(Ember.A(Ember.keys(this.get('data'))), function(idx, key){
    //         var pair = { key: key, value: model.get(key) };
    //         attrs.push(pair);
    //     });
    //     return attrs;
    // }.property('h')
});

// // delete below here if you do not want fixtures
// Emotivecolor.Color.FIXTURES = [
  
//   {
//    id: 0,
//    hex: '9a6366',
//    emotion: 'Love'
//  },
//  {
//    id: 1,
//    hex: 'b553be',
//    emotion: 'Flirty'
//  },
//  {
//    id: 2,
//    hex: '2ef63b',
//    emotion: 'Surprised'
//  },
//  {
//    id: 3,
//    hex: 'de8c9a',
//    emotion: 'Happy'
//  },
//  {
//    id: 4,
//    hex: 'be40c7',
//    emotion: 'Anxious'
//  }
  
// ];