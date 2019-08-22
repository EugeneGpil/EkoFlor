"use strict";

var leftArrow=document.getElementById("leftArrow");
var rightArrow=document.getElementById("rightArrow");

var countOfElements = document.getElementsByClassName('list__list-element').length;
var elementPositions = [];
var positionOfFirstElement = 0;
var stepListElements = 170.5;

for (var i=0; i<countOfElements; i++){
    elementPositions[i] = positionOfFirstElement + stepListElements * i;
}

function setStyle(cssText) {
    var sheet = document.createElement('style');
    sheet.type = 'text/css';
    /* Optional */ window.customSheet = sheet;
    (document.head || document.getElementsByTagName('head')[0]).appendChild(sheet);
    return (setStyle = function(cssText, node) {
        if(!node || node.parentNode !== sheet)
            return sheet.appendChild(document.createTextNode(cssText));
        node.nodeValue = cssText;
        return node;
    })(cssText);
};

var newElementsPositions = [];

function listGoToLeft() {
    for (var i=0; i<countOfElements; i++){
        var elementCSS = setStyle('#listElement' + (i+1) + '{left: ' + elementPositions[i] + 'px;}');
        if (i == countOfElements - 1){
            setStyle('#listElement' + (i+1) + '{left: ' + elementPositions[0] + 'px;}', elementCSS);
            newElementsPositions[i] = elementPositions[0];
            break;
        }
        setStyle('#listElement' + (i+1) + '{left: ' + elementPositions[i+1] + 'px;}', elementCSS);
        newElementsPositions[i] = elementPositions[i+1];
    }
    elementPositions = newElementsPositions;
    newElementsPositions = [];
}

function listGoToRight() {
    for (var i=0; i<countOfElements; i++){
        var elementCSS = setStyle('#listElement' + (i+1) + '{left: ' + elementPositions[i] + 'px;}');
        if (i == 0){
            setStyle('#listElement' + (i+1) + '{left: ' + elementPositions[countOfElements-1] + 'px;}', elementCSS);
            newElementsPositions[i] = elementPositions[countOfElements-1];
            continue;
        }
        setStyle('#listElement' + (i+1) + '{left: ' + elementPositions[i-1] + 'px;}', elementCSS);
        newElementsPositions[i] = elementPositions[i-1];
    }
    elementPositions = newElementsPositions;
    newElementsPositions = [];
}

leftArrow.onclick = function () {listGoToLeft()};
rightArrow.onclick = function () {listGoToRight()};