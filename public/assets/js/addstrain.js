$(document).ready(function () {
    // Create variables for all of our input holders on the form.
    var name = $("#name");
    var race = $("#race");

        // Create a variable for our current user id.
        var userId;
        // GET our current user id and store it in userId.
        $.get("/api/getuser", function(response){
            userId = response;
        });

    // Handle the button click submission of our form fields.
    $("#submitBtn").on("click", function(e) {
        e.preventDefault();

        //If nothing supplied for title or body let the user know more data is needed.
        if (!name.val().trim() || !race.val().trim()){alert("Please fill in the whole form before submitting!")}
    
       // Build a new post object:
        var newStrain = {
            name: name.val().trim(),
            race: race.val().trim(),
            UserId: userId
            }
        
        // POST the supplied input values as an object.
        $.post("/api/addstrain/", newStrain, function () {
            alert("Strain added!")
            console.log("New strain added!")
        })
    });

});