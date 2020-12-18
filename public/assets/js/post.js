$(document).ready(function () {
    var url = window.location.search;
    var postId;
    var updating = false;
    var userId;
    // Create variables for all of our input holders on the form.
    var title = $("#title");
    var strain = $("#strain");
    var entry = $("#entry");
    var effects = $("#effects");

    $(".actionTitle").text("New");
    
    if (url.indexOf("?post_id") !== -1) {
        $(".actionTitle").text("Edit");
        postId = url.split("=")[1];
        getPostData(postId);
    }

    // GET our current user id and store it in userId.
    $.get("/user", function (response) {
        userId = response.id;
    });

    var strainList = $("#strainsList");
    $.get("/api/strains", function (response) {
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].name)
            var option = $("<option></option").val(response[i].name).text(response[i].name);
            strainList.append(option);
        }
    });

    // Handle the button click submission of our form fields.
    $("#submitBtn").on("click", function (e) {
        e.preventDefault();

        //If nothing supplied for title or body let the user know more data is needed.
        if (!title.val().trim() || !entry.val().trim()) { alert("Please fill in the whole form before submitting!") };

        // Build a new post object:
        var newPost = {
            title: title.val().trim(),
            strain: strainList.val(),
            entry: entry.val().trim(),
            effects: effects.val().trim(),
            UserId: userId
        }

        // Determine whether this is a new post or an updated post.
        if (updating) {
            newPost.id = postId;
            updatePost(newPost);
        }
        else {
            submitPost(newPost);
        }
    });

    function submitPost(post) {
        // POST the supplied input values as an object.
        $.post("/api/post/", post, function () {
            console.log("New post added!");
            window.location.href = "/allposts";
        })
    }

    function updatePost(post) {
        $.ajax({
            method: "PUT",
            url: "/api/posts",
            data: post
        })
        .then(function () {
            window.location.href = "/allposts";
        });
    }
    // Gets post data for a post if we're editing
    function getPostData(id) {
        $.get("/api/posts/" + id, function (data) {
            if (data) {
                // If this post exists, prefill our cms forms with its data
                title.val(data.title);
                strain.val(data.strain);
                entry.val(data.entry);
                effects.val(data.effects);
                // If we have a post with this id, set a flag for us to know to update the post
                // when we hit submit
                updating = true;
            }
        });
    }
});