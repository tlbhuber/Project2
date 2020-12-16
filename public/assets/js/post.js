$(document).ready(function () {
    // Handle the button click submission of our form fields.
    var title = $("#title");
    var strain = $("#strain");
    var entry = $("#entry");
    var effects = $("#effects");


    $("#submitBtn").on("click", function(e) {
        e.preventDefault();
        console.log(title.val().trim())
        //If nothing supplied for title or body just return.
        if (!title.val().trim() || !entry.val().trim()){alert("Please fill in the whole form before submitting!")}

       console.log( $("#title").val());

       // Build a new post object:
        var newPost = {
            title: title.val().trim(),
            strain: strain.val().trim(),
            entry: entry.val().trim(),
            effects: effects.val().trim()
        }
        $.post("/api/blogpost/", newPost, function () {
            alert("Post added!")
            console.log("New post added!")
        })
    });

});