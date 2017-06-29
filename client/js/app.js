var deleteHero = function (e) {
    var heroidname = $(e.target).attr("heroidname");
    var heroid = $("#" + heroidname).val();
    
    $.post("removehero", {"heroid": heroid}, function (response) {
        console.log("We posted and the server responded!");
        console.log(response);
    });
    
    //Reloading...
    $.getJSON("heros.json", function (data) {
        loadHeros(data);
    });
}

var loadHeros = function (heros) {
    "use strict";
    
    //cleaning the cards div before adding data
    $(".cards").empty();
    
    //fulfilling the cards place
    heros.forEach(function (hero, i) {
        var $div = $("<div>"),
            $pname = $("<p>"),
            $pdescription = $("<p>"),
            $pmainpower = $("<p>"),
            $pgroup = $("<p>"),
            $pdelete = $("<p>"),
            $hiddenid = $("<input>"),
            heroidname = "heroid" + i;
        
        $pname.html(hero.name);
        $pdescription.html(hero.description);
        $pmainpower.html("<span class='fieldname'>Main Power: </span>" + hero.mainpower);
        $pgroup.html("<span class='fieldname'>Group: </span>" + hero.group);
        $pdelete.text("x");
        $pdelete.addClass("close-button").on("click", function (e) {
            deleteHero(e);
        });
        $pdelete.attr("heroidname", heroidname);
        $hiddenid.attr("id", heroidname);
        $hiddenid.attr("type", "hidden");
        $hiddenid.attr("value", i);
        
        $div.append($pname);
        $div.append($pdescription);
        $div.append($pmainpower);
        $div.append($pgroup);
        $div.append($pdelete);
        $div.append($hiddenid);
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
    "use strict";
    
    $("button#send").on("click", function(e) {
        var name = $("#inputName").val(),
            description = $("#inputShortDescription").val(),
            mainpower = $("#inputMainPower").val(),
            group = $("#inputGroup").val(),
            hero = {};
            //hero = { "name": name, "description": description, "mainpower": mainpower, "group": group }; //another way to create the JSON object
        
        hero.name = name;
        hero.description = description;
        hero.mainpower = mainpower;
        hero.group = group;
        
        //Making the post call to the server
        $.post("addhero", hero, function (response) {
            console.log("We posted and the server responded!");
            console.log(response);
        });
        
        //Reloading...
        $.getJSON("heros.json", function (data) {
            loadHeros(data);
        });
        
    });
};

$(document).ready(function () {
    $.getJSON("heros.json", function (data) {
        loadHeros(data);
    });
    eventHandlers();
});