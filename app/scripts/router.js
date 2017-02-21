var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var ChatroomContainer = require('./components/index.jsx').ChatroomContainer;

var AppRouter = Backbone.Router.extend({
  routes:{
    '': 'index'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(ChatroomContainer),
      document.getElementById('app')
    );
  },
});

var appRouter = new AppRouter();

module.exports = appRouter;
