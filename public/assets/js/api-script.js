$(document).ready(function () {
    var queryURL = "http://strainapi.evanbusse.com/73isozx/strains/search/all";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#strainList").on("click", "li", function (e) {
            // Find what li was clicked on, get value
            var clicked = $(this).text();
            // Pass clicked value into our setInfo function as an arg.
            setInfo(clicked);
            // console.log(response.Gelato);
            function setInfo(data) {
                $("#positive").text(response[data].effects.positive);
                $("#negative").text(response[data].effects.negative);
                $("#medical").text(response[data].effects.medical)
                // console.log(response[data].effects.medical)
                console.log(response[data].effects.medical);
                console.log(response[data].effects.positive);
                console.log(response[data].effects.negative)
                for (var i = 0; i <= response[data].effects; i++) {
                    var ul = $("<ul>");
                    var liMed = $("<li>").text(response[data].effects.medical[i]);
                    var liPos = $("<li>").text(response[data].effects.positive[i]);
                    var liNeg = $("<li>").text(response[data].effects.negative[i])
                }
            }
        });
        $("#search").click(function () {
            var searchStrain = $("#input").val().trim();
            for (var i = 0; i <= response[data].effects; i++) {
                var ul = $("<ul>");
                var liMed = $("<li>").text(response[data].effects.medical[i]);
                var liPos = $("<li>").text(response[data].effects.positive[i]);
                var liNeg = $("<li>").text(response[data].effects.negative[i]);
                ul.append(li);
                $("#strainInfo").append(ul)
            }
            console.log(response[data].effects)
        });
    });
})