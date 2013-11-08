Emotivecolor.AlertListView = Ember.CollectionView.extend({
	itemViewClass: "Emotivecolor.AlertView",
	contentBinding: "Emotivecolor.alertController",
    classNames: ['alerts-view']
});