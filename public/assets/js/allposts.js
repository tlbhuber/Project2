$(document).ready(function () {
    
    // Button handlers for delete, print, print all.
    $(document).on("click", "button.delete", handlePostDelete);
    $(document).on("click", "button.edit", handlePostEdit);
    $(document).on("click", "button.print", handlePostPrint);
    $(document).on("click", "button.printAll", handleAllPrint);

    // Call our api/allposts route to grab all of the logged-in
    // user's blog posts.
    $.get("/api/posts", function(data){
        // If there aren't any posts, prompt the user to make one.
        if (data.length === 0){ 
            var nothingToSee = $("<div>").html("<h1 class='is-size-4'>Uh oh! You don't have any posts yet!</h1><br/> <a href='post.html'>Write your first post!</a>").addClass("box has-text-centered");
            $("#allPosts").append(nothingToSee);
        }
        
        // Loop through the returned promise from our api call:
        for(var i = 0; i < data.length; i++){
        // Make Sequelizes' createdAt a human-readble date format
        var entryTime = data[i].createdAt;
        entryTime = entryTime.substring(0,10);

        /* ============ DYNAMIC HTML STRUCTURE ============ */
        // Where all child elements should be appended to
        var allPosts = $("#allPosts"); 

        // The ancestor is where all tile parents need to be appended to
        var ancestor = $("<div>").addClass("tile is-ancestor box").attr('data-id', data[i].id).attr('id', data[i].id);

        // Make the dynamic trash & printer icon
        var trashP = $("<button>").addClass("delete");
        var printP = $("<button>").addClass("print icon button is-white is-small").attr("id", "print").html("<i class='fas fa-print'></i>");
        var editP = $("<button>").addClass("edit icon button is-white is-small").html("<i class='fas fa-edit'></i>")

        // tileParent is where all div elements need to be appended to
        var tileParent = $("<div>").addClass("tile is-4 is-vertical is-parent");
        // Make two tile is-child boxes and append to tileParent
        var tileForTitle = $("<article>").addClass("tile is-child notification is-primary box");
        var pTitle = $("<p>").addClass("title").text(data[i].id + ": " + data[i].title);

        var tileForEffects = $("<article>").addClass("tile is-child box");
        var pEffects = $("<p>").html("<b>Effects:</b> " + data[i].effects);

        // Make a new tileParent for the horizontal tiles, append to ancestor
        var tileParentHor = $("<div>").addClass("tile is-parent");
        // tileForEntry and pEntry will be appended to tileParentHor
        var tileForEntry = $("<article>").addClass("tile is-child box");
        var pEntry = $("<p>").html(entryTime + "<br/><b>Journal Entry:</b> " + data[i].entry);
        var pStrain = $("<p>").html("<b>Strain: </b>" + data[i].strain);
        
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
        ancestor.append(trashP).append(editP).append(printP);

        // Append our ancestor to a current DOM element
        ancestor.appendTo(allPosts);
        }
    });

    // Determines which id to print and prints to PDF.
    function handlePostPrint(){
        var clicked = $(this).closest(".is-ancestor").attr("id");
            printJS({printable: clicked, type: 'html'});
    }

    // Prints the entire 'allPosts' id.
    function handleAllPrint(){
        printJS({printable: 'allPosts', type: 'html'});
    }

    // Determines which post to edit, by id.
    function handlePostEdit(){
        var clicked = $(this).closest(".is-ancestor").attr("data-id");
        window.location.href="/post?post_id=" + clicked;
    }

    // Determines which post to delete, by id.
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
            console.log(`Deleted blog post with id of ${id}`);
        });
        // Refresh the page to get rid of stale data
        location.reload();
    }
});