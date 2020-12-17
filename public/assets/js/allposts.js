$(document).ready(function () {

function getPosts(){
    $.get("/api/allposts", function(data){
        console.log("Posts: " + JSON.stringify(data))
    });

    $("#title").text(data.title);

}

getPosts();

});