(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  getclasses: getclasses,
  getClassByID: getClassByID,
  postNewClass: postNewClass
};

function getclasses(callback) {
  $.ajax({
      "url": "./classes/",
      success: function(result) {
        callback(result);
      }
  });
}

function getClassByID(id, callback){
  $.ajax({
      "url": "./classes/" + id,
      success: function(result) {
        callback(result);
      }
  });
}

function postNewClass(form, callback) {
    var settings = {
        "async": true,
        "url": "./classes/",
        "method": "POST",
        "headers": {
            "cache-control": "no-cache",
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function(response) {
        callback(response);
    });

    return false;
}

},{}],2:[function(require,module,exports){
var api = require('./api.js');


function redraw() {
    clearAllThumbnails();
    api.getclasses(function(classes) {
        insertclasses(classes);
    });
}

function clearAll() {
    $('div.enlargedImage').empty();
	$('div.container').empty();
}

function clearAllThumbnails() {
    $('div.thumbnails').empty();
}

// Only needed to create the login form.
function insertclasses(classes) {
    var classDiv = $('div.container')
    classDiv.append(createLoginForm());
	var thumbnails = $('div.thumbnails')
    addSubmitCallback()
    classes.forEach(function(c) {
        thumbnails.append(createThumbnail(c));
    });
}


function createLoginForm() {
  return $(   '<div id="loginForm" style="display: none;">'
			+   '<form id="newClass" method="POST" enctype="multipart/form-data">'
			+     '<input type="text" name="class" placeholder="username">'
			+	   '<input type="text" name="description" placeholder="password">'
			+	   '<input type="submit" value="Login">'
			+	 '</form>'
			+ '</div>');
}

function clearAndLoad(id) {
    clearAll();
    api.getClassByID(id, function(c) {
        var classDiv = $('div.enlargedImage'); //div.container
        var div = $('<div><h2>' + c.name
			+ '</h2>'
			+ '<img src="' + c.image
			+ '" alt="' + c.name
			+ '">' + c.description
			+ '</div>');

        classDiv.append(div);
    });
}

function createClassCard(c) {
    var div = $('<div><h2>' + c.name
    + '</h2>'
    + '<img src="' + c.image
    + '" alt="' + c.name
    + '">' + c.description
    + '</div>');

    div.click(function() {
        clearAndLoad(c.id);
    });

    return div;
}

function createThumbnail(c) {
    var div = $('<div><h2>' + c.name
    + '</h2>'
    + '<img src="' + c.image
    + '" alt="' + c.name + '">'
    + '</div>');

    div.click(function() {
		$("div.enlargedImage").show()
        clearAndLoad(c.id);
    });

    return div;
}

function addSubmitCallback(){
  $("#newClass").submit(function() {
      var formData = new FormData($(this)[0]);

      api.postNewClass(formData, function(response){
        console.log(response);
        redraw()
      });
      return false;
  });
}


redraw();
$("#bannerImg").click(function() {
    redraw();
})

$("#button").click(function(){
  $("#loginForm").toggle();
})

},{"./api.js":1}]},{},[2]);
