$(document).ready(function () {
   var userEl = $("#user");
    var postsEl = $("#posts")

    // Fetch the user data and display it to the DOM.
   $.get("/user", function(data){
       userEl.text(data.email)
   });

   // Fetch the post data and display it to the DOM.
   $.get("/api/allposts", function(data){
    console.log(data.length);
    postsEl.text(data.length);
   });
});