import React from 'react';

import '../css/base.css';

//Get information to create a new Person.
module.exports = React.createClass({
  getInitialState: function() {
    return {firstname: '', lastname: '', loginID: '', startDate: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstname: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastname: e.target.value});
  },
  handleLoginIdChange: function(e) {
    this.setState({loginID: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({startDate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var firstName = this.state.firstname;
    var lastName = this.state.lastname;
    var loginID = this.state.loginID;
    var startDate = this.state.startDate;

    if(!firstName || !lastName || !loginID || !startDate) {
      return;
    }
    this.props.onPersonSubmit({firstname: firstName, lastname: lastName, loginID: loginID, startDate: startDate});
    this.setState({firstname: '', lastname: '', loginID: '', startDate: ''});
  },
  render: function() {
    return (
      <form className="personForm" onSubmit={this.handleSubmit}>

          <input
            type="text"
            placeholder="First name..."
            value={this.state.firstname}
            onChange={this.handleFirstNameChange}
          />
          <input
            type="text"
            placeholder="Last name..."
            value={this.state.lastname}
            onChange={this.handleLastNameChange}
          />
          <input
            type="number"
            placeholder="Numerical login ID..."
            value={this.state.loginID}
            onChange={this.handleLoginIdChange}
          />
          <input
            type="text"
            placeholder="Start date (mm/dd/yyyy)..."
            value={this.state.startDate}
            onChange={this.handleStartDateChange}
          />
          <input type="submit" value="Post"/>
      </form>
    );
  }
});