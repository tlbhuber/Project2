$(document).ready(function () {

    var queryURL = "http://strainapi.evanbusse.com/73isozx/strains/search/all";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var preLoad = "OG Kush"
        var ulInfo = $("<ul>");
        var liName = $("<li>").html(preLoad);
        var liMed = $("<li>").html("Medicinal Usage: <br>" + response[preLoad].effects.medical);;
        var liPos = $("<li>").html("Positive Effect: <br>" + response[preLoad].effects.positive);
        var liNeg = $("<li>").html("Negative Effects: <br>" + response[preLoad].effects.negative);

            // console.log(preload[data]);

        ulInfo.append(liName, liMed, liPos, liNeg);
        $("#strainInfo").prepend(ulInfo);


        $("#strainList").on("click", "li", function (e) {
            $("#strainInfo").empty();
            // Find what li was clicked on, get value
            var clicked = $(this).text();
            // Pass clicked value into our setInfo function as an arg.
            setInfo(clicked);

            function setInfo(data) {
              
                var ulInfo = $("<ul>");
                var liName = $("<li>").html(data);
                var liMed = $("<li>").html("Medicinal Usage: <br>" + response[data].effects.medical);
                var liPos = $("<li>").html("Positive Effects: <br>" + response[data].effects.positive);
                var liNeg = $("<li>").html("Negative Effects: <br>" + response[data].effects.negative);;

                ulInfo.append(liName, liMed, liPos, liNeg);
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