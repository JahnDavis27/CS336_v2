import React from 'react';
import $ from 'jquery';

import '../css/base.css';

import PersonList from './PersonList.js'
import PersonForm from './PersonForm.js'

//Display the list of Persons.
//Pass the data to PersonList child component.
//componentDidMount called automatically when the component is
//rendered for the first time.
module.exports = React.createClass({
  loadPersonsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handlePersonSubmit: function(person) {
    var persons = this.state.data;
    var newPersons = persons.concat([person]);
    this.setState({data: newPersons});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: person,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: persons});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPersonsFromServer();
    setInterval(this.loadPersonsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="personBox">
        <h1>People</h1>
        <PersonList data={this.state.data} />
        <PersonForm onPersonSubmit={this.handlePersonSubmit} />
      </div>
    );
  }
});