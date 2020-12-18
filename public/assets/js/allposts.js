$(document).ready(function () {
    
    // Handle delete button click
    $(document).on("click", "button.delete", handlePostDelete);

    $.get("/api/allposts", function(data){
        //console.log("Test View All Posts: " + JSON.stringify(data))

        // If there aren't any posts, prompt the user to make one.
        if (data.length === 0){ 
            var nothingToSee = $("<div>").html("<h1 class='is-size-4'>Uh oh! You don't have any posts yet!</h1><br/> <a href='post.html'>Write your first post!</a>").addClass("box has-text-centered");
            $("#allPosts").append(nothingToSee);
        }

        for(var i = 0; i < data.length; i++){
        var allPosts = $("#allPosts"); // Where all child elements should be appended to

        // The ancestor is where all tile parents need to be appended to
        var ancestor = $("<div>").addClass("tile is-ancestor box").attr('data-id', data[i].id);

        // Make the dynamic trash icon
        var trashP = $("<p>").html("<button class='delete'><i class='fas fa-trash-alt'></i></button>");

        // tileParent is where all div elements need to be appended to
        var tileParent = $("<div>").addClass("tile is-4 is-vertical is-parent");
        // Make two tile is-child boxes and append to tileParent
        var tileForTitle = $("<article>").addClass("tile is-child notification is-primary box");
        var pTitle = $("<p>").addClass("title").text(data[i].id + ": " + data[i].title);

        var tileForEffects = $("<article>").addClass("tile is-child box");
        var pEffects = $("<p>").text("Effects: " + data[i].effects);

        // Make a new tileParent for the horizontal tiles, append to ancestor
        var tileParentHor = $("<div>").addClass("tile is-parent");
        // tileForEntry and pEntry will be appended to tileParentHor
        var tileForEntry = $("<article>").addClass("tile is-child box");
        var pEntry = $("<p>").text("Journal Entry: " + data[i].entry);
        var pStrain = $("<p>").text("Strain: " + data[i].strain);
        
        // Append elements for tileParent
        pTitle.appendTo(tileForTitle);
        tileForTitle.appendTo(tileParent);
        pEffects.appendTo(tileForEffects);
        tileForEffects.appendTo(tileParent);

        // Append elements for tileParentHor
        pEntry.appendTo(tileForEntry);
        pStrain.appendTo(tileForEntry);
        tileForEntry.appendTo(tileParentHor);

        // Append our parents to the ancestor
        tileParent.appendTo(ancestor);
        tileParentHor.appendTo(ancestor);

        // Append our delete & print buttons to the ancestor
        ancestor.append(trashP);

        // Append our ancestor to a current DOM element
        ancestor.appendTo(allPosts);
        }
    });

    function handlePostDelete(){
        var clicked = $(this).closest(".is-ancestor").attr("data-id");
        deletePost(clicked);
    }
      // This function does an API call to delete posts
    function deletePost(id) {
        $.ajax({
        method: "DELETE",
        url: "/api/delete/" + id
        })
        .then(function() {
            console.log("Deleted");
        });

        location.reload();
    }


});