$(document).ready(function () {
    // This code allows for an image to appear when the user hovers over the link of the
    // most popular strains
    $(".strainImage").mouseenter(function () 
    {
        // on mouse hover grab this. data-image and then append to strainInfo
        // download all the photos and have it loop through the photos to find the image that matches the data-name of the one that is being hovered over.
        //either this.text or grabbing the data-name like you did below with li.image
        if ($(this).parent('li').children('li.image').length) {
            $("#strainImage").parent('li').children('li.image').show();
        } else {
            let image_name = $(this).data('image');
            let imageTag = '<li class="image" >' + '<img src="' + image_name + '" alt="image" height="25" />' + '</li>';
            $("#strainImage").empty().append(imageTag);
        }
    });
// hides the image after moving
    $("#strainImage").mouseleave(function () {
        $(this).parent('li').children('li.image').hide();
    });
    // API call to pull in the Name of the Strain, Medicical Usages, and Effects(Postive and Negative).
    const queryURL = "https://strainapi.evanbusse.com/73isozx/strains/search/all";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) 
    {
        // This code allows for the first strain on the list to be displayed upon load of page.
        let preLoad = "OG Kush";
        let medEffects = (response[preLoad].effects.medical).toString().replace(/,/g, ", ");
        let posEffects = (response[preLoad].effects.medical).toString().replace(/,/g, ", ");
        let negEffects = (response[preLoad].effects.medical).toString().replace(/,/g, ", ");
                console.log(medEffects);
                console.log(posEffects);
                console.log(negEffects);
        let ulInfo = $("<ul>");
        let nameStrain = $("<li>").text("Strain Name: ").css("color", "black").css("font-weight", "bold");
        let liName = $("<li>").text(preLoad);
        let nameMed = $("<li>").text("Can be used to treat (Medicial Usage): ").css("color", "black").css("font-weight", "bold");
        let liMed = $("<li>").text(medEffects);
        let namePos = $("<li>").text("Positive Effects: ").css("color", "green").css("font-weight", "bold");
        let liPos = $("<li>").text(posEffects);
        let nameNeg = $("<li>").text("Negative Effects: ").css("color", "red").css("font-weight", "bold");
        let liNeg = $("<li>").text(negEffects);
        ulInfo.append(nameStrain, liName, nameMed, liMed, namePos, liPos, nameNeg, liNeg).css("text-align", "left");
        $("#strainInfo").prepend(ulInfo)
        // Created code to allow for the API info to be pulled and displayed based on what link the
        // user clicks on.
        $("#strainList").on("click", "li", function (e) {
            //this empties the 
            
            $("#strainInfo").empty();
            // Find what li was clicked on, get value
            var clicked = $(this).text();
            // Pass clicked value into our setInfo function as an arg.
            console.log(clicked)
            setInfo(clicked);

            function setInfo(data) {
                let medEffects = (response[data].effects.medical).toString().replace(/,/g, ", ");
                let posEffects = (response[data].effects.medical).toString().replace(/,/g, ", ");
                let negEffects = (response[data].effects.medical).toString().replace(/,/g, ", ");

                let ulInfo = $("<ul>");
                let nameStrain = $("<li>").text("Strain Name: ").css("color", "black").css("font-weight", "bold");
                let liName = $("<li>").text(preLoad);
                let nameMed = $("<li>").text("Can be used to treat (Medicial Usage): ").css("color", "black").css("font-weight", "bold");
                let liMed = $("<li>").text(medEffects);
                let namePos = $("<li>").text("Positive Effects: ").css("color", "green").css("font-weight", "bold");
                let liPos = $("<li>").text(posEffects);
                let nameNeg = $("<li>").text("Negative Effects: ").css("color", "red").css("font-weight", "bold");
                let liNeg = $("<li>").text(negEffects);
               
                ulInfo.append(nameStrain, liName, nameMed, liMed, namePos, liPos, nameNeg, liNeg
                ).css("text-align", "left");
                $("#strainInfo").prepend(ulInfo);
                console.log(response[data].effects.medical);
                console.log(response[data].effects.positive);
                console.log(response[data].effects.negative)
            }
        });
        $("#search").on("click", function (e) {
            $("#strainInfo").empty();
            let searchStrain = $("#input").val().trim();
            console.log(searchStrain);

            const queryURL = "https://strainapi.evanbusse.com/73isozx/strains/search/all/";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response[searchStrain]);
                let medEffects = (response[searchStrain].effects.medical).toString().replace(/,/g, ", ");
                let posEffects = (response[searchStrain].effects.medical).toString().replace(/,/g, ", ");
                let negEffects = (response[searchStrain].effects.medical).toString().replace(/,/g, ", ");

                let ulInfo = $("<ul>");
                let nameStrain = $("<li>").text("Strain Name: ").css("color", "black").css("font-weight", "bold");
                let liName = $("<li>").text(preLoad);
                let nameMed = $("<li>").text("Can be used to treat (Medicial Usage): ").css("color", "black").css("font-weight", "bold");
                let liMed = $("<li>").text(medEffects);
                let namePos = $("<li>").text("Positive Effects: ").css("color", "green").css("font-weight", "bold");
                let liPos = $("<li>").text(posEffects);
                let nameNeg = $("<li>").text("Negative Effects: ").css("color", "red").css("font-weight", "bold");
                let liNeg = $("<li>").text(negEffects);
               
                ulInfo.append(nameStrain, liName, nameMed, liMed, namePos, liPos, nameNeg, liNeg).css("text-align", "left");
                $("#strainInfo").prepend(ulInfo);





            })
        });
    });
})