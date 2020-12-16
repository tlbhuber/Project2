$(document).ready(function () {

    var queryURL = "http://strainapi.evanbusse.com/73isozx/strains/search/all";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".strains").text(response);

        $(".strains").jstree({
            "plugins": ["checkbox"]
        })
    })
});


