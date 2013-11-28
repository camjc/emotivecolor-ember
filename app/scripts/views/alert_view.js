Emotivecolor.AlertView = Ember.View.extend({
    templateName: 'alert',
    tagName: "div",
    classNameBindings: [ "defaultClass", "content.kind" ],
    defaultClass: "alert-box",
    kind: null,
    controllerBinding: "content",

    click: function () {
        var that = this;
        this.$().fadeOut(300, function () { that.removeFromParent(); });
    },
    // didInsertElement: function () {
    //  this.$().hide().fadeIn(300);
    // }
});