var Backbone = require('backbone');

var Message = Backbone.Model.extend({
 idAttribute: "_id",
 initialize: function(){
   this.set('createDate', (new Date()).getTime());
 }
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  comparator: 'createDate',
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/dylansmessages'
});

var User = Backbone.Model.extend({

});

module.exports = {
  Message,
  MessageCollection,
  User
};
