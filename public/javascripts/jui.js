$(document).ready(function(){
	$( "#dialog" ).dialog({
		autoOpen: false,
		width: 800,
		modal: true
	});

	// Link to open the dialog
	$( "#dialog-link" ).click(function( event ) {
		$( "#dialog" ).dialog( "open" );
		event.preventDefault();
		
	});
});
