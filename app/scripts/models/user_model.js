Emotivecolor.User = DS.Model.extend({
    userid: DS.attr('number'),
    name: DS.attr('string'),

    age_range: DS.attr('string'),
    birthday: DS.attr('date'),

    gender: DS.attr('string'),

    location: DS.attr('string'),
    hometown: DS.attr('string'),

    locale: DS.attr('string'),
    languages: DS.attr('string'),

    relationship_status: DS.attr('string'),
    education: DS.attr('string'),
    sports: DS.attr('string'),
    religion: DS.attr('string'),
    political: DS.attr('string'),

    posts: DS.hasMany('post'),
});