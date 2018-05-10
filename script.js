"use strict";

$(document).ready(function() {
    //After clicking "Click to search", search input appears
    $(".search").click(function() {
        $(".search").css("display", "none");
        $("input").css("display", "block");
        $("input").focus();
        $(".enter").css("display", "block");
        $(".reset").css("display", "block");
    });
    
    //After pushing "Enter" key or "Search" button, boxes go up, search pages appear
        //Enter
        $("input").keydown(function(event) {
            if ($("input").val() !== "") {
                if (event.which === 13) {
                    $(".boxes").css({"align-items": "flex-start", "flex-direction": "row"});
                    $(".random").css({"width": "30%", "height": "100px", "font-size": "1rem", "margin": "25px 10px"});
                    $(".search-block").css({"width": "30%", "font-size": "1rem", "margin": "25px 10px"});
                    $(this).css("height", "69px");
                    $(".buttons").css({"width": "100%", "font-size": "1rem"});
                    
                    //render pages
                    $.getJSON("https://cors.io/?https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&list=&meta=&titles=&generator=search&formatversion=2&exsentences=1&exlimit=max&exintro=1&explaintext=1&exsectionformat=wiki&inprop=url&gsrsearch="+$("input").val()+"&gsrlimit=10", function(json) {
                        let info = "";
                        let pages = json.query.pages;

                        //sort pages by index number
                        pages.sort(function(a, b) {
                            return a.index - b.index;
                        });
                        
                        for (let i = 0; i < pages.length; i++) {
                            info += `
                                <a href="${pages[i].fullurl}" target="blank" class="list-group-item list-group-item-action">
                                    <div class="name">${pages[i].title}</div>
                                    <div>${pages[i].extract}</div>          
                                </a>
                            `;
                        }      
                    
                        $(".list-group").html(info);
                    });
                }
            }

        });
        //Search button
        $(".enter").click(function() {
            if ($("input").val() !== "") {
                $(".boxes").css({"align-items": "flex-start", "flex-direction": "row"});
                $(".random").css({"width": "30%", "height": "100px", "font-size": "1rem", "margin": "25px 10px"});
                $(".search-block").css({"width": "30%", "font-size": "1rem", "margin": "25px 10px"});
                $("input").css("height", "69px");
                $(".buttons").css({"width": "100%", "font-size": "1rem"});
    
                //render pages
                $.getJSON("https://cors.io/?https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&list=&meta=&titles=&generator=search&formatversion=2&exsentences=1&exlimit=max&exintro=1&explaintext=1&exsectionformat=wiki&inprop=url&gsrsearch="+$("input").val()+"&gsrlimit=10", function(json) {
                    let info = "";
                    let pages = json.query.pages;
            
                    //sort pages by index number
                    pages.sort(function(a, b) {
                        return a.index - b.index;
                    });
            
                    for (let i = 0; i < pages.length; i++) {
                        info += `
                            <a href="${pages[i].fullurl}" target="blank" class="list-group-item list-group-item-action">
                                <div class="name">${pages[i].title}</div>
                                <div>${pages[i].extract}</div>          
                            </a>
                        `;
                    }      
                    $(".list-group").html(info);
                });
            }
            
        });
    
    //After clicking "Reset" button, search input disappears, "Click to search appears"
    $(".reset").click(function() {
        $(".boxes").css({"align-items": "center", "flex-direction": "column"});
        $("input").val("");
        $("input").css({"height": "157px", "display": "none"});
        $(".enter").css("display", "none");
        $(".reset").css("display", "none");
        $(".buttons").css("font-size", "1.5rem");
        $(".random").css({"width": "50%", "height": "200px", "font-size": "1.5rem", "margin": "80px 0"});
        $(".search-block").css({"width": "50%", "font-size": "1.5rem", "margin": "0"});
        $(".search").css("display", "flex");
        $(".list-group").html("");
        $("#search-words").html("");
    });
});


$(document).ready(function() {
    //Dropdown menu with autocomplete options   
    $("input").keyup(function() {
        $.getJSON("https://cors.io/?https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search="+$("input").val()+"&namespace=0&limit=10&suggest=true", function(data) { 
            let autocomplete = data[1];
            let suggestions = "";
            if ($("input").val() !== "" && autocomplete) {
                for (let i = 0; i < autocomplete.length; i++) {
                    suggestions += `
                        <option value="${autocomplete[i]}">
                    `;
                }
            }
            $("#search-words").html(suggestions);
        }); 
    }); 
    //After clicking "Escape", autocomplete options disappear
    $("input").keydown(function(event) {
        if (event.which === 27) {
            $("#search-words").html("");
        }
    });
});   
    
        


    



                
    