var Backbone = require('backbone');
var moment = require('moment');
moment().format("LTS");

var Message = Backbone.Model.extend({
 idAttribute: "_id",
 initialize: function(){
   this.isNew() ? this.set('timestamp', moment().format('LTS')) : this.set('timestamp', this.get('timestamp'));
 },
 defaults: {
   username: localStorage.getItem('username')
 }
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  comparator: -'timestamp',
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/messages'
});
//
// http://tiny-lasagna-server.herokuapp.com/collections/messages
// https://tiny-lasagna-server.herokuapp.com/collections/dylansmessages

var User = Backbone.Model.extend({

});

module.exports = {
  Message,
  MessageCollection,
  User
};
