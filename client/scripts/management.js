console.log("js init");

$(document).ready(function() {
    $('#title-car').click(function(e) {
        document.getElementById("web").src = "/car";
    });
    $('#title-testDrive').click(function(e) {
        document.getElementById("web").src = "/testDrive";
    });
});