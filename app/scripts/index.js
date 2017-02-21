var $ = require('jquery');
var Backbone = require('backbone');

require('./router');

  // DOM ready
$(function(){
  Backbone.history.start();

});
