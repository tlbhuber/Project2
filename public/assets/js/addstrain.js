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

    $.get("/api/allstrains", function(response){

        // All table elements are appended here.
        var table = $("<table>").addClass("table is-fullwidth");

        // Build the table head structure
        
        var thead = $("<thead>");
        var trHead = $("<tr>");
        var th = $("<th>").text("ID");
        var th2 = $("<th>").text("Name");
        var th3 = $("<th>").text("Race");

        thead.append(trHead).append(th).append(th2).append(th3);

        for(var i = 0; i < response.length; i++){
        var tbody = $("<tbody>");
        var trBody = $("<tr>");
        var tdName = $("<td>").text(response[i].name);
        var tdRace = $("<td>").text(response[i].race);
        var tdID = $("<td>").text(response[i].id);
        
        tbody.append(trBody).append(tdID).append(tdName).append(tdRace);

        table.append(tbody);
        table.append(thead);
        }
        // Append the finished table to the allStrains class already on the DOM.
        $(".allStrains").append(table);

    })

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