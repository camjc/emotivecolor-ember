Emotivecolor.UsersController = Ember.ObjectController.extend({
  // Implement your controller here.
  actions: {
    newUser: function () {
        var thisUser = Emotivecolor.FBUser,
            post = this.store.createRecord('post', {
                userid: thisUser.id,
                name: thisUser.id,

                age_range: thisUser.id,
                birthday: function(){
                    return new Date( (this.User).replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$1/$2/$3") ); // Convert mm/dd/yyyy into a date object for the db
                },

                gender: thisUser.gender,

                location: thisUser.location,
                hometown: thisUser.hometown,

                locale: thisUser.locale,
                languages: thisUser.languages,

                relationship_status: thisUser.relationship_status,
                education: thisUser.education,
                sports: thisUser.sports,
                religion: thisUser.religion,
                political: thisUser.political,

            });
        }
  }
});

