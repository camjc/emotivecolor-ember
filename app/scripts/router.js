Emotivecolor.Router.map(function () {

  this.resource('colors');
  this.resource('color', { path: '/color/:color_id' });
  this.resource('color.edit', { path: '/color/:color_id/edit' });
  this.resource('about');
});
