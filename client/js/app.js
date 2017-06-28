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

$(document).ready(function () {
    $.getJSON("heros.json", function (data) {
        main(data);
    });
});