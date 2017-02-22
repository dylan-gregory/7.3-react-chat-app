var React = require('react');

var MessageCollection = require('../models/models.js').MessageCollection;
var userMessages = new MessageCollection();

var ChatroomContainer = React.createClass({
  componentWillMount: function(){
    window.setInterval(this.getNewMessages, 1000);
  },
  getInitialState: function(){
    // var userMessages = new MessageCollection();
    var self = this;
    userMessages.fetch().done(function(){
      self.setState({userMessages: userMessages});
    });
    // this.getNewMessages();

    console.log(this.props.router.username);
    return {messageList: userMessages, username: this.props.router.username};

  },
  getNewMessages: function(){
    console.log('checking for messages...');
    var self = this;
    this.state.messageList.fetch().done(function(){
      self.setState({userMessages: userMessages});
    });

  },
  sendMessage: function(message){
    var messageList = this.state.messageList;
    messageList.username = this.state.username;
    messageList.create(message);
    this.setState({messageList: messageList});
  },
  render: function(){

    return (
    <div>
      <div className=" row welcome">Welcome, TIY-GVL'ers!</div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2>You're logged in as: <span className="logged-in-as">{this.state.username}</span></h2>
              <h3>Join the chat!</h3>

              <ChatForm sendMessage={this.sendMessage} />

            </div>

            <div className="col-md-8">
              <h3>See what everyone is talking about:</h3>

              <MessageList messageList={this.state.messageList} />

            </div>
          </div>
        </div>
    </div>
    );
  }
});

var LoginContainer = React.createClass({
  loginUser: function(user){
    var router = this.props.router;
    router.username = user.username;
    localStorage.setItem('username', user.username);

    router.navigate('', {trigger: true});
  },
  render: function(){
    return (
      <div>
        <h1>Please enter your username::</h1>
          <UserForm loginUser={this.loginUser} />
      </div>

    );
  }
});

var UserForm = React.createClass({
  getInitialState: function(){
    return {username: ''};
  },
  handleUsername: function(event){
    this.setState({username: event.target.value});
  },
  handleLogin: function(event){
    event.preventDefault();
    var user = this.state;
    this.props.loginUser(user);

    this.setState({username: ''});
  },
  render: function(){
    return (

      <form onSubmit={this.handleLogin}>
        <div className="form-group">
          <label htmlFor="username"  />
          <input type="text" className="form-control" id="username" onChange={this.handleUsername} placeholder="Your username is...?" />

          <input type="submit" className="btn btn-success" value="Login" />
        </div>
      </form>
    );
  }
});

var ChatForm = React.createClass({
  getInitialState: function(){
    var chat = {message:''}
    return chat;
  },
  sendMessage: function(event){
    event.preventDefault();
    this.props.sendMessage(this.state);
    this.setState({message: ''});

  },
  handleMessage: function(event){
    this.setState({message: event.target.value});
  },
  render: function(){
//value={this.state.message}
    return (

      <form className="well message-box" onSubmit={this.sendMessage}>
        <div className="form-group">
          <input type="textarea" onChange={this.handleMessage} value={this.state.message} className="form-control textarea" id="message" placeholder="Type your message here, my dude" />

          <button type="submit" className="btn btn-primary">Send</button>
        </div>
      </form>
    )
  }
});

var MessageList = React.createClass({
  render: function(){

    var messageItems = this.props.messageList.map(function(message){
      return (
          <li className="list-group-item clearfix" key={message.cid}> <span className="post-user">{message.get('username')}</span> :: {message.get('message')}
          <span className="post-time">(sent at :  {message.get('timestamp')})</span></li>
      );
    });

    return (

      <ul className="list-group">
        {messageItems}
      </ul>
    );
  }
});

module.exports = {
  ChatroomContainer,
  ChatForm,
  MessageList,
  UserForm,
  LoginContainer
};
