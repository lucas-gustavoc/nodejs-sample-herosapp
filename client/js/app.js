var main = function (heros) {
    "use strict";
    
    //fulfilling the cards place
    heros.forEach(function (hero) {
        var $div = $("<div>"),
            $pname = $("<p>"),
            $pdescription = $("<p>"),
            $pmainpower = $("<p>"),
            $pgroup = $("<p>");
        
        $pname.html(hero.name);
        $pdescription.html(hero.description);
        $pmainpower.html("<span class='fieldname'>Main Power: </span>" + hero.mainpower);
        $pgroup.html("<span class='fieldname'>Group: </span>" + hero.group);
        
        $div.append($pname);
        $div.append($pdescription);
        $div.append($pmainpower);
        $div.append($pgroup);
        $div.addClass("card");
        
        $(".cards").append($div);
    });
    
    
    //normalizing the heights
    var maxHeight = 0;
    $(".card").each(function (i, d) {
        if (maxHeight < parseInt($(d).height())) maxHeight = parseInt($(d).height());
    });
    $(".card").height(maxHeight);
    
};

var eventHandlers = function () {
    $("button#send").on("click", function(e) {
        var name = $("#inputName").val(),
            description = $("#inputShortDescription").val(),
            mainpower = $("#inputMainPower").val(),
            group = $("#inputGroup").val(),
            hero = { "name": name, "description": description, "mainpower": mainpower, "group": group };
        
        $.post("addhero", hero, function (response) {
            console.log("We posted and the server responded!");
            console.log(response);
        });
    })
};

$(document).ready(function () {
    $.getJSON("heros.json", function (data) {
        main(data);
    });
    eventHandlers();
});