$(document).ready(function () {

    // This code allows for an image to appear when the user hovers over the link of the
    // most popular strains
    $(".strainImage").mouseenter(function () 
    {
        // on mouse hover grab this. data-image and then append to strainInfo
        // download all the photos and have it loop through the photos to find the image that matches the data-name of the one that is being hovered over. 
        //either this.text or grabbing the data-name like you did below with li.image

        if ($(this).parent('li').children('li.image').length) 
        {
            $("#strainImage").parent('li').children('li.image').show();
        } 
        else 
        {
            var image_name = $(this).data('image');
            var imageTag = '<li class="image" >' + '<img src="' + image_name + '" alt="image" height="25" />' + '</li>';
            $("#strainImage").empty().append(imageTag);
        }
    });

    // hides the image after moving 
    $("#strainImage").mouseleave(function () {
        $(this).parent('li').children('li.image').hide();
    });

    // API call to pull in the Name of the Strain, Medicical Usages, and Effects(Postive and Negative).
    var queryURL = "http://strainapi.evanbusse.com/73isozx/strains/search/all";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) 
    {
        // This code allows for the first strain on the list to be displayed upon load of page.
        var preLoad = "OG Kush";
        var ulInfo = $("<ul>");
        var nameStrain = $("<li>").html("Name: <br> ").css("color", "dark green").css("font-weight", "bold");
        var liName = $("<li>").html(preLoad);
        var nameMed = $("<li>").html("Medicinal Usage: <br> ").css("color", "dark green").css("font-weight", "bold");
        var liMed = $("<li>").html(response[preLoad].effects.medical);
        var namePos = $("<li>").html("Positive Effects: <br> ").css("color", "dark green").css("font-weight", "bold");
        var liPos = $("<li>").html(response[preLoad].effects.positive);
        var nameNeg = $("<li>").html("Negative Effects: <br>").css("color", "dark green").css("font-weight", "bold");
        var liNeg = $("<li>").html(response[preLoad].effects.negative);
        
            ulInfo.append(nameStrain, liName, nameMed, liMed, namePos, liPos, nameNeg, liNeg).css("text-align", "left");

                $("#strainInfo").prepend(ulInfo)


        // Created code to allow for the API info to be pulled and displayed based on what link the user clicks on.
        $("#strainList").on("click", "li", function (e) {
            //this empties the 
            
            $("#strainInfo").empty();
            // Find what li was clicked on, get value
            var clicked = $(this).text();
            // Pass clicked value into our setInfo function as an arg.
            setInfo(clicked);

            function setInfo(data) {

                var ulInfo = $("<ul>");
                var nameStrain = $("<li>").html("Name: <br> ").css("color", "dark green").css("font-weight", "bold");
                var liName = $("<li>").html(data);
                var nameMed = $("<li>").html("Medicinal Usage: <br> ").css("color", "dark green").css("font-weight", "bold");
                var liMed = $("<li>").html(response[data].effects.medical);
                var namePos = $("<li>").html("Positive Effects: <br> ").css("color", "dark green").css("font-weight", "bold");
                var liPos = $("<li>").html(response[data].effects.positive);
                var nameNeg = $("<li>").html("Negative Effects: <br>").css("color", "dark green").css("font-weight", "bold");
                var liNeg = $("<li>").html(response[data].effects.negative);

                ulInfo.append(nameStrain, liName, nameMed, liMed, namePos, liPos, nameNeg, liNeg
                ).css("text-align", "left");
                $("#strainInfo").prepend(ulInfo);



                console.log(response[data].effects.medical);
                console.log(response[data].effects.positive);
                console.log(response[data].effects.negative)
            }

        });



        $("#search").click(function () {
            var searchStrain = $("#input").val().trim();

            for (var i = 0; i <= response[data].effects; i++) {
                var ul = $("<ul>");
                var liMed = $("<li>").text(response[data].effects.medical[i]);
                var liPos = $("<li>").text(response[data].effects.positive[i]);
                var liNeg = $("<li>").text(response[data].effects.negative[i])

                ul.append(li);
                $("#strainInfo").append(ul)
                console.log(response[data].effects.medical[i]);
                console.log(response[data].effects.positive[i]);
                console.log(response[data].effects.negative[i])
            }
            console.log(response[data].effects)
        });
    });
})