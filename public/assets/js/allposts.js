$(document).ready(function () {
    /*
        getPosts() grabs all of the logged in user's posts and displays them dynamically
        to the DOM using Bulma.io's tile CSS framework. 
    */
function getPosts(){
    $.get("/api/allposts", function(data){
        //console.log("Test View All Posts: " + JSON.stringify(data))

        if (data.length === 0){ console.log("Nothing")}

        for(var i = 0; i < data.length; i++){
        var allPosts = $("#allPosts"); // Where all child elements should be appended to

        // The ancestor is where all tile parents need to be appended to
        var ancestor = $("<div>").addClass("tile is-ancestor box");

        // Trashcan icon allows user to delete the associated post
        var trash = $("<a>").attr("href", "#").html("<br/><i class='fas fa-trash-alt'></i>")

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
        ancestor.append(trash);

        // Append our ancestor to a current DOM element
        ancestor.appendTo(allPosts);
        }
    });
}

getPosts();
});