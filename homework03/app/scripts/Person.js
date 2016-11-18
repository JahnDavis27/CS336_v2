import React from 'react';
import Remarkable from 'remarkable';

import '../css/base.css';

//Contains information about a Person.
// this.props is passed from the surrounding PersonList component
module.exports = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="person">
        <h2 className="personInformation">
          {this.props.firstname + ' ' + this.props.lastname}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});