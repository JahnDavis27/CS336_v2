import React from 'react';

import '../css/base.css';

import Person from './Person.js'

//Contains a list of Persons.
//Pass the props to our Person children components.
//Have a map function that creates a Person for each Person that
//we pass. Then, render the array of Persons created.
module.exports = React.createClass({
  render: function() {
    var personNodes = this.props.data.map(function(person) {
      return (
        <Person firstname={person.firstname} lastname={person.lastname} key={person.loginID}>
          {person.startDate}
        </Person>
      );
    });
    return (
      <div className="personList">
        {personNodes}
      </div>
    );
  }
});8