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

var username = "cavossman";
var major = "Computer Science";
var visibility_login = 0;
var visibility_signup = 0;

function redraw() {
	clearAll();
	createForms();
}

function clearAll() {
	$('div.container').empty();
}

function createForms(users) {
    var classDiv = $('div.container');
    classDiv.append(createLoginForm());
	classDiv.append(createSignupForm());
}

function createLoginForm() {
  return $(   '<div id="loginForm" style="display: none;">'
			+   '<form id="newLogin" method="POST" enctype="multipart/form-data">'
			+     '<input type="text" name="username" placeholder="username">'
			+	   '<input type="text" name="password" placeholder="password">'
			+	   '<input type="submit" value="Login" id="login">'
			//+      '<button id ="pleaseLogin">Login</button>'
			+	 '</form>'
			+ '</div>');
}

function createSignupForm() {
  return $(   '<div id="signupForm" style="display: none;">'
			+   '<form id="newUser" method="POST" enctype="multipart/form-data">'
			+     '<input type="text" name="newUsername" placeholder="username">'
			+	   '<input type="text" name="newPassword" placeholder="password">'
			+       '<input type="text" name="WID" placeholder="WID">'
			+		'<input list="browsers" name="browser" placeholder="major">'
			+        '<datalist id="browsers">'
			+      		'<option value="Computer Science">'
			+      		'<option value="Software Engineering">'
			+      		'<option value="Architecture">'
			+     		'<option value="Chemical Engineering">'
			+      		'<option value="Mechanical Engineering">'
			+        '</datalist>'
			+	   '<input type="submit" value="Sign Up" id="signup">'
			//+		'<button id="pleaseSignup">Sign Up</button>'
			+	 '</form>'
			+ '</div>');
}

function addSubmitCallback() {
	$("#newUser").submit(function() {
		var formData = new FormData($(this)[0]);
		
		api.postNewClass(formData, function(res) {
			console.log(response);
			redraw();
		});
		return false;
	});
}

redraw();

$("#loginButton").click(function(){
  if (visibility_login == 0){
	if (visibility_signup == 1) {
	  $("#signupForm").toggle();
	  visibility_signup = 0;	
	}
	visibility_login = 1;
  } else {
	visibility_login = 0;
  }
  $("#loginForm").toggle();
})
	
$("#signupButton").click(function(){
  if (visibility_signup == 0){
	if (visibility_login == 1) {
	  $("#loginForm").toggle();
	  visibility_login = 0;	
	}
	visibility_signup = 1;
  } else {
	visibility_signup = 0;
  }
  $("#signupForm").toggle();
})

// In case we need to fake it
$("#pleaseLogin").click(function() {
	// add scripted name
	console.log("Welcome back!");
})

$("#pleaseSignup").click(function() {
	// add scripted name
	console.log("Welcome!");
})
},{"./api.js":1}]},{},[2]);
