(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Not used at the moment in cis526 final */

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
    /*api.getclasses(function(classes) {
        createForms(classes);
    });*/
	createForms();
}

function clearAll() {
	$('div.container').empty();
}

function createForms() {
    var classDiv = $('div.container')
    classDiv.append(createLoginForm());
	classDiv.append(createSignupForm());
}


function createLoginForm() {
  return $(   '<div id="loginForm" style="display: none;">'
			+   '<form id="newClass" method="POST" enctype="multipart/form-data">'
			+     '<input type="text" name="class" placeholder="username">'
			+	   '<input type="text" name="description" placeholder="password">'
			+	   '<input type="submit" value="Login" id="login">'
			+	 '</form>'
			+ '</div>');
}

function createSignupForm() {
  return $(   '<div id="signupForm" style="display: none;">'
			+   '<form id="newClass" method="POST" enctype="multipart/form-data">'
			+     '<input type="text" name="class" placeholder="username">'
			+	   '<input type="text" name="description" placeholder="password">'
			+		'<input list="browsers" name="browser" placeholder="major">'
			+        '<datalist id="browsers">'
			+      		'<option value="Computer Science">'
			+      		'<option value="Software Engineering">'
			+      		'<option value="Architecture">'
			+     		'<option value="Chemical Engineering">'
			+      		'<option value="Mechanical Engineering">'
			+        '</datalist>'
			+	   '<input type="submit" value="Sign Up" id="signup">'
			+	 '</form>'
			+ '</div>');
}

redraw();
$("#bannerImg").click(function() {
    redraw();
})

$("#button").click(function(){
  $("#loginForm").toggle();
})
	
$("#signupButton").click(function(){
  $("#signupForm").toggle();
})
},{"./api.js":1}]},{},[2]);
