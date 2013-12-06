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
    hexo: function () {
        return '0x' + this.get('hex');
    }.property('hex'),
    degToRad: function (deg) {
        return deg / 180 * Math.PI;
    },
    // radialX: function () {
    //     var basePos = Math.sin(this.degToRad(this.get('h'))) * (this.get('s') + (this.get('l') / 10));
    //     return (basePos + 50).toFixed(2);
    // }.property('h', 's', 'l'),
    // radialY: function () {
    //     var basePos = Math.cos(this.degToRad(this.get('h'))) * (this.get('s') + (this.get('l') / 10));
    //     return -1 * (basePos - 90).toFixed(2);
    // }.property('h', 's', 'l'),
    radial3X: function () {
        return Math.sin(this.degToRad(this.get('h'))) * this.get('s');
    }.property('h', 's'),
    radial3Y: function () {
        return Math.cos(this.degToRad(this.get('h'))) * this.get('s');
    }.property('h', 's'),
    radial3Z: function () {
        return (this.get('l') * 2) - 100;
    }.property('l'),
    // size: function () {
    //     return ((this.get('l') + (this.get('s') / 2)) / 8).toFixed(2);
    // }.property('l'),
    // linearX: function () {
    //     return this.get('h') / 3.6; /* 360/100 */
    // }.property('h'),
    // linearY: function () {
    //     return 100 - this.get('l');
    // }.property('l'),
    // cssX: function () {
    //     return this.get('radial3X') * 4 + 700;
    // }.property('h', 's'),
    // cssY: function () {
    //     return this.get('radial3Y') * 4 + 300;
    // }.property('h', 's'),
    // cssZ: function () {
    //     return this.get('radial3Z') * 4;
    // }.property('h', 's'),
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