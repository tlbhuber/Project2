$(document).ready(function () {
    // Create variables for all of our input holders on the form.
    var title = $("#title");
    var strain = $("#strain");
    var entry = $("#entry");
    var effects = $("#effects");
    
    // Create a variable for our current user id.
    var userId;

    // Create a variable for our strain names;
    var strainName;
    // GET our current user id and store it in userId.
    $.get("/api/getuser", function(response){
        userId = response;
    });

    var strainList = $("#strainsList");
    $.get("/api/allstrains", function(response){
        console.log(response);
        for(var i = 0; i < response.length; i++){
            console.log(response[i].name)
            var option = $("<option></option").val(response[i].name).text(response[i].name);
            strainList.append(option);
        }
    });

    // Handle the button click submission of our form fields.
    $("#submitBtn").on("click", function(e) {
        e.preventDefault();

        //If nothing supplied for title or body let the user know more data is needed.
        if (!title.val().trim() || !entry.val().trim()){alert("Please fill in the whole form before submitting!")}
    
       // Build a new post object:
        var newPost = {
            title: title.val().trim(),
            strain: strainList.val(),
            entry: entry.val().trim(),
            effects: effects.val().trim(),
            UserId: userId
            }
        
        // POST the supplied input values as an object.
        $.post("/api/blogpost/", newPost, function () {
            alert("Post added!")
            console.log("New post added!")
        })
    });

});