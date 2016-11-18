// Using the .ready() function inside the script body
$( document ).ready(function() {
	 var newPrgrh= $("<p>", {
    	html: "This is a <strong> test </strong> paragraph.",
    	"class": "new",
    });
	newPrgrh.appendTo("body");

	$("button#get-data").click(
		// Request a GET method from the server with appropriate data
    	function() {
    		console.log("AJAX request issued...");
    		$.ajax({
    			url: "/hello",
    			type: "GET",
    			data: {
    				name: "lab07"
    			}
    		})
    		.done(function(result){
    			console.log("AJAX request succeeded!!!")
    			$("#new").html(result.message);
    		})
    		.fail(function(xhr, status, errorThrown) {
    			console.log("AJAX request failed...");
    		})
    	});
});