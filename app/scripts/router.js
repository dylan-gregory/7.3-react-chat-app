var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var ChatroomContainer = require('./components/index.jsx').ChatroomContainer;
var LoginContainer = require('./components/index.jsx').LoginContainer;

var AppRouter = Backbone.Router.extend({
  routes:{
    '': 'index',
    'login': 'login'
  },
  initialize: function(){
    this.username = localStorage.getItem('username');
  },
  index: function(){
    if(!this.username){
      this.navigate('login', {trigger:true});
      return;
    }

    ReactDOM.render(
      React.createElement(ChatroomContainer, {router: this}),
      document.getElementById('app')
    );
  },
  login: function(){
    ReactDOM.render(
      React.createElement(LoginContainer, {router: this}),
      document.getElementById('app')
    );
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;
