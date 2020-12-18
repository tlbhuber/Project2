$(document).ready(function () {
    var userEl = $("#user");
    var postsEl = $("#posts");
    var strainsEl = $("#strainsEl");

    // Fetch the user data and display it to the DOM.
   $.get("/user", function(data){
       userEl.text(data.email)
   });

   // Fetch the post data and display it to the DOM.
   $.get("/api/allposts", function(data){
    postsEl.text(data.length);
   });

   $.get("/api/allstrains", function(data){
    strainsEl.text(data.length);
   })
});