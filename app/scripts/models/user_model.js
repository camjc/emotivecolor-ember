Emotivecolor.User = DS.Model.extend({
    userid: DS.attr('number'),
    
    name: DS.attr('string'),

    age_range: DS.attr('string'),

    gender: DS.attr('string'),

    location: DS.attr('string'),
    hometown: DS.attr('string'),

    locale: DS.attr('string'),
    languages: DS.attr('string'),

    relationship_status: ('string'),
    education: ('string'),
    sports: ('string'),
    religion: ('string'),
    political: ('string'),

});