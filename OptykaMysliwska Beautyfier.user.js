// ==UserScript==
// @name         ESADOPtyka
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  ESAD Sklepikarze!
// @author       Łukasz Jaroszewski
// @match        https://www.optykamysliwska.pl/*
// @grant       GM_addStyle
// @require http://code.jquery.com/jquery-3.5.1.min.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js

// ==/UserScript==
var $ = window.jQuery;
const HTMLCOLOR = [
    "Red", "Magenta",
    "GreenYellow", "Maroon",
    "OrangeRed", "DarkOrchid",
    "Sienna", "Fuchsia",
    "DodgerBlue", "Aqua",
    "LightCoral",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGreen",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
];




(function() {
    'use strict';
    waitForKeyElements(".ItemState_NEW", actionFunction);

    var zNode = document.createElement('div');
    zNode.innerHTML = '<br /><button id="toggleBtn" type="button">' +
        'Przełącz widoczność Stan: NOWE</button>' +
        ' <hr /> ' +
        '<input type="text" id="fname" name="fname"><br />' +
        '<button id="srchBtn" type="button">' +
        'Filtruj</button> <hr /> ';
    zNode.setAttribute('id', 'myContainer');
    document.body.appendChild(zNode);
    var e = '<div id="listColors"></div><div id="author"><p>Hacked by Łukasz </p></div>';
    $("#myContainer").append(e);

    //--- Activate the newly added button.
    document.getElementById("toggleBtn").addEventListener(
        "click", ButtonClickAction, false
    );
    document.getElementById("srchBtn").addEventListener(
        "click", SrchClickAction, false
    );

    waitForKeyElements("#fname", actionFunction2);
    waitForKeyElements("#toggleBtn", actionFunction3);
})();

function ButtonClickAction(zEvent) {
    if (sessionStorage.getItem('filterNew') == 'no' || sessionStorage.getItem('filterNew') == null) {
        sessionStorage.setItem('filterNew', 'yes');
        $(".ItemState_NEW").closest("table").hide();
        $("#toggleBtn").text("Pokaż NOWE");


    } else if (sessionStorage.getItem('filterNew') == 'yes') {
        sessionStorage.setItem('filterNew', 'no');
        $(".ItemState_NEW").closest("table").show();
        $("#toggleBtn").text("Ukryj NOWE");


    }

}

function clearBorders() {
    $(".Description").css("border", "none");
    $(".Name").closest("div").css("border", "none");
}

function SrchClickAction(zEvent) {
    //$( ".ItemState_NEW" ).closest("table").toggle();
    var txt = $("#fname").val().toLowerCase();

    sessionStorage.setItem('filterText', txt);
    clearBorders();
    if (txt.replace(/\s+/g, '').length == 0) {
        clearBorders();
        $("#listColors").empty();
        return;
    }



    var txtItems = txt.split(';');
    var dict = new Object();
    var count = 0;
    for (var j = 0; j < txtItems.length; j++) {
        dict[txtItems[j]] = 0;
    }
    $(".Description").each(function(i) {

        for (var j = 0; j < txtItems.length; j++) {
            if ($(this).text().toLowerCase().indexOf(txtItems[j]) >= 0) {


                count = count + 1;
                dict[txtItems[j]] = dict[txtItems[j]] + 1;
                console.log("DESCR: " +$(this).text() );
                //console.log("KAVAR: " + count);
                $(this).css("border", "3px solid " + HTMLCOLOR[j]);

                //console.log("Color number:" + j);
            } else {
                //   $(this).css( "border", "none" );
            }
        }

    });
    $(".Name").each(function(i) {
        for (var j = 0; j < txtItems.length; j++) {
            if ($(this).text().toLowerCase().indexOf(txtItems[j]) >= 0) {
                $(this).closest("div").css("border", "3px solid " + HTMLCOLOR[j]);
                dict[txtItems[j]] = dict[txtItems[j]] + 1;
                console.log("NAME: " +$(this).text() );
            } else {
                //   $(this).closest("div").css( "border", "none" );
            }
        }
    });
    $("#listColors").empty();

    for (var k = 0; k < txtItems.length; k++) {
        $("#listColors").append("<p style='color: black;background: " + HTMLCOLOR[k] + "'>" + txtItems[k] + "[" + dict[txtItems[k]] + "]</p>")
    }


}

function actionFunction() {
    //-- DO WHAT YOU WANT TO THE TARGETED ELEMENTS HERE.
    if (sessionStorage.getItem('filterNew') == 'no') {
        //console.log("IN NO");

        $(".ItemState_NEW").closest("table").show();


    } else if (sessionStorage.getItem('filterNew') == 'yes') {
        //console.log("IN YES");


        $(".ItemState_NEW").closest("table").hide();


    }
    if (sessionStorage.getItem('filterText') != null) {
        $("#fname").val(sessionStorage.getItem('filterText'));
        // SrchClickAction("click");

    }
    // console.log("SESSION:" + sessionStorage.getItem('filterNew'));
}

function actionFunction2() {

    if (sessionStorage.getItem('filterText') != null) {
        $("#fname").val(sessionStorage.getItem('filterText'));
        //console.log("SESSION TEXT:" + sessionStorage.getItem('filterText'));
        SrchClickAction("click");

    }

}

function actionFunction3() {

    if (sessionStorage.getItem('filterNew') == null) {
        $("#toggleBtn").text("Ukryj NOWE");

    }
    if (sessionStorage.getItem('filterNew') == 'no') {
        $("#toggleBtn").text("Ukryj NOWE");

    }
    if (sessionStorage.getItem('filterNew') == 'yes') {
        $("#toggleBtn").text("Pokaż NOWE");

    }

}
//--- Style our newly added elements using CSS.
GM_addStyle(`
hr {
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    border-style: inset;
    border-width: 1px;
    width: 80%;
    color: lime;
    background-color: lime;

}

#myContainer {
    position: fixed;
    top: 0;
    left: 0;
    font-size: 12px;
    background: black;
    border: 3px outset lime;
    margin: 5px;
    opacity: 0.9;
    z-index: 1100;
    padding: 5px 20px;
}

#toggleBtn,
#srchBtn {
    color: black !important;
    text-transform: uppercase;
    text-decoration: none;
    background: green;
    padding: 5px;
    border-radius: 10px;
    display: inline-block;
    border: none;
    transition: all 0.4s ease 0s;
    width: 100%;
    margin-top: 10px;

}

#srchBtn:hover {
    background: lime;
    letter-spacing: 1px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.4s ease 0s;
}

#toggleBtn:hover {
    background: lime;
    letter-spacing: 1px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.4s ease 0s;
}

button:active {
    outline: none;
    border: none;
}

button:focus {
    outline: 0;
}

input:focus {
    outline: 0;
}

#fname {

    background: black;
    color: lime;
    border: 1px solid lime;
    width: 100%;
    height: 30px;
    border-radius: 10px;

}

#myContainer p {

    background: black;
    font-weight: bold;
    font-size: 10px;
    width: 100%;
    text-align: center;
    padding: 2px;

}

#author p {

    background: black;
    font-weight: normal;
    width: 100%;
    text-align: center;
    padding: 2px;
    font-size: 12px;
    color: lime;
}

`);
