// When the document is ready to go...
$(document).ready(function() {

	// When the HTML form is submitted by the user...
	$( 'form' ).submit(function( event ) {

		// Prevent the HTML form from doing the default actions
		event.preventDefault();

		// Get the form and the ID Number from the inputs from the user
		var form = $( this );
		var IDNum_Data = {"id_number": $("#ID_Num").val()}

		// Create a URL by adding the ID number to "/person/" to prepare for the AJAX call
		var temp_url = "/person/" + IDNum_Data;

		// AJAX call to the server to receive the information regarding the employee with the ID Number entered by the user
		$.ajax({
			type: 'POST',
			url: temp_url,
			contentType: 'application/json',
			data: JSON.stringify(IDNum_Data),
			dataType: 'json',
		})
		.done(function( json_string ) {
			json = JSON.parse(json_string)
			$("#LineOne").empty()
			$("#LineTwo").empty()
			$("#LineThree").empty()
			$("#LineOne").append("<p>" + "Full Name: " + json.first + " " + json.last + "</p>")
			$("#LineTwo").append("<p>" + "ID Number: " + json.ID + "</p>")
			$("#LineThree").append("<p>" + "Years Worked: " + json.years + "</p>")
		})
		.fail(function(xhr, status, errorThrown) {
			alert("ID number does not exist!");
			console.log("Error: " + errorThrown);
			console.log("Status:" + status);
		})
	});

});