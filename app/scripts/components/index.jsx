var React = require('react');

var MessageCollection = require('../models/models.js').MessageCollection;

var ChatroomContainer = React.createClass({
  getInitialState: function(){
    var userMessages = new MessageCollection();
    var self = this;
    userMessages.fetch().done(function(){
      self.setState({userMessages: userMessages});
    });

    return {messageList: userMessages};

  },
  sendMessage: function(message){
    var messageList = this.state.messageList;
    messageList.create(message);
    this.setState({messageList: messageList});
  },
  render: function(){

    return (

      <div className="container">
        <h1>Welcome to the chatroom!</h1>
        <div className="row">
          <div className="col-md-4">
            <h3>Join the chat!</h3>

            <UserForm />

            <ChatForm sendMessage={this.sendMessage} />

          </div>

          <div className="col-md-8">
            <h3>See what everyone is talking about:</h3>

            <MessageList messageList={this.state.messageList} />

          </div>
        </div>
      </div>
    );
  }
});

var UserForm = React.createClass({
  saveUsername: function(event){
    event.preventDefault();

    
  },
  handleUsername: function(event){
    this.setState({username: event.target.value});
  },
  render: function(){
    return (

      <form onSubmit={this.saveUsername}>
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

      <form onSubmit={this.sendMessage}>
        <div className="form-group">
          <textarea onChange={this.handleMessage} className="form-control" rows="3" id="message" placeholder="Type your message here, my dude"  ></textarea>

          <input type="submit" className="btn btn-primary" value="Send" />
        </div>
      </form>
    )
  }
});

var MessageList = React.createClass({
  render: function(){

    var messageItems = this.props.messageList.map(function(message){
      return (
          <li className="list-group-item" key={message.cid}> {message.get('message')} </li>
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
  UserForm
};
