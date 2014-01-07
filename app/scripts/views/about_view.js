Emotivecolor.AboutView = Ember.View.extend({
    templateName: 'about',
    didInsertElement: function () {
        this.$("#fittext").fitText(0.62); //Problematic in translations
    }
});