var Backbone = require('backbone');

var Message = Backbone.Model.extend({
 idAttribute: "_id",
 initialize: function(){
   this.set('timestamp', (new Date()).getTime());
 },
 defaults: {
   username: 'anonymous'
 }
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  comparator: 'timestamp',
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/dylansmessages'
});

var User = Backbone.Model.extend({

});

module.exports = {
  Message,
  MessageCollection,
  User
};
