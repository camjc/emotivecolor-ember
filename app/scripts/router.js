Emotivecolor.Router.map(function () {

  this.resource('colors');
  this.resource('color', { path: '/color/:color_id' });
  this.resource('color.new', { path: '/' });
  this.resource('about');
});
