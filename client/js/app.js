var heroidtodelete = "0";

var deleteHero = function (e) {
    var heroidname = $(e.target).attr("heroidname");
    heroidtodelete = $("#" + heroidname).val();
    
    $.post("removehero", {"heroid": heroidtodelete}, function (response) {
        if (response.status) {
            $(".cards .card:nth-child(" + (parseInt(heroidtodelete) + 1) + ")").fadeOut("slow", function () {
                //Reloading...
                $.getJSON("heros.json", function (data) {
                    loadHeros(data);
                });
            });
        } else {
            window.alert("An error has ocurred.");
        }
    });
}

//Used to tell the loadHeros function if the last hero on the pill neets to fadein (it occurs when it has been added recently)
var loadLastHeroWithFade = false;

var loadHeros = function (heros) {
    "use strict";
    
    //cleaning the cards div before adding data
    $(".cards").empty();
    
    //fulfilling the cards place
    heros.forEach(function (hero, i, arr) {
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
        
        if (loadLastHeroWithFade && ((i+1) == arr.length)) $div.hide();
        
        $(".cards").append($div);
    });
    
    
    //normalizing the heights
    var maxHeight = 0;
    $(".card").each(function (i, d) {
        if (maxHeight < parseInt($(d).height())) maxHeight = parseInt($(d).height());
    });
    $(".card").height(maxHeight);
    
    //Fading in the last hero if asked
    if (loadLastHeroWithFade) {
        $(".cards div.card:last-child").fadeIn("slow");
        loadLastHeroWithFade = false;
    }
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
        
        if ((name == "") || (description == "") || (mainpower == "") || (group == "")) {
            window.alert("Please, fullfil all fields.");
        } else {
            //validation ok
            
            hero.name = name;
            hero.description = description;
            hero.mainpower = mainpower;
            hero.group = group;
            
            //Making the post call to the server
            $.post("addhero", hero, function (response) {
                if (response.status) {
                    $("input[type='text']").val("");
                    loadLastHeroWithFade = true;
                    
                    //Reloading...
                    $.getJSON("heros.json", function (data) {
                        loadHeros(data);
                    });
                } else {
                    window.alert("An error has ocurred.");
                }
            });
            
        }
        
    });
    
    
    $("input[type='text']").keydown(function (e) {
        if (e.which == 13) $("button#send").click();
    });
};

$(document).ready(function () {
    $.getJSON("heros.json", function (data) {
        loadHeros(data);
    });
    eventHandlers();
});