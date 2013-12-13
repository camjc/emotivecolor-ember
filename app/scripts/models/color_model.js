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
    
    userid: DS.attr('number'),
});

Emotivecolor.Color.reopen({
    hexo: function () {
        return '0x' + this.get('hex');
    }.property('hex'),
    degToRad: function (deg) {
        return deg / 180 * Math.PI;
    },
    radial3X: function () {
        return Math.sin(this.degToRad(this.get('h'))) * this.get('s');
    }.property('h', 's'),
    radial3Y: function () {
        return Math.cos(this.degToRad(this.get('h'))) * this.get('s');
    }.property('h', 's'),
    radial3Z: function () {
        return (this.get('l') * 2) - 100;
    }.property('l'),
    mine: function () {
        if (this.get('userid') === parseInt(Emotivecolor.FBUser.id)) {
            return true;
        }
    }.property('userid', 'Emotivecolor.FBUser.id'),
});