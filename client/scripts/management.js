console.log("js init");

$(document).ready(function() {
	$('#title-poster').click(function(e) {
        document.getElementById("web").src = "/poster";
    });
    $('#title-car').click(function(e) {
        document.getElementById("web").src = "/car";
    });
    $('#title-testDrive').click(function(e) {
        document.getElementById("web").src = "/testDrive";
    });
});