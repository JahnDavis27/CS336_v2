
//This script is used in tandem with the second webpage in order to get
//a person from our "database" after getting an id from a form.

//http://learn.jquery.com/ajax/
$(document).ready(function() {
  $('form').submit(function(event) {

    event.preventDefault();
    var form = $(this);

    $.ajax({
      type: "GET",
      url: "/person",
      data: form.serialize(),
      dataType: "json",
      success: function(resp) {
        console.log(resp);
      }
    })
		.done(function( json ) {
      //Get the data from the JSON
			$("<p>").text("First name: " + json.firstname).appendTo("body");
      $("<p>").text("Last name: " + json.lastname).appendTo("body");
      $("<p>").text("Login ID: " + json.loginID).appendTo("body");
      $("<p>").text("Start date: " + json.startDate).appendTo("body");
		})
		.fail(function( xhr, status, errorThrown ) {
		    alert( "Failed to get the person!" );
		    console.log( "Error: " + errorThrown );
		    console.log( "Status: " + status );
		})
  });
});
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help