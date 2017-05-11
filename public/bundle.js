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

// Could make into array to demonstrate multiple users.
//var username = "cavossman";
//var major = "Computer Science";
var visibility_login = 0;
var visibility_signup = 0;
var visibility_results = 0;
var user = 1;

// For testing
//var REQUIRED = ["CIS 115", "CIS 200", "CIS 300", "CIS 301", "CIS 308", "CIS 415", "CIS 450", "CIS 501", "CIS 560", "CIS 575", "CIS 505", "CIS 520", "MATH 220", "MATH 221", "MATH 510", "MATH 551", "STAT 510", "ENGL 100", "ENGL 200", "ENGL 516"];
//var taken = ["CIS 115", "CIS 200", "CIS 300", "", "", "", "", "", "", "", "", "", "MATH 220", "MATH 221", "", "", "", "ENGL 100", "ENGL 200", ""];

function redraw() {
	clearAll();
	createForms();
}

function clearAll() {
	$('div.container').empty();
}

function createForms() {
    var classDiv = $('div.container');
    classDiv.append(createLoginForm());
	classDiv.append(createSignupForm());
	classDiv.append(createWelcome());
	classDiv.append(createWelcomeBack());
	classDiv.append(createCourseCheck());
	classDiv.append(createUserOne());
	classDiv.append(createUserTwo());
	classDiv.append(createUserThree());
}

function createLoginForm() {
  return $(   '<div id="loginForm" style="display: none;">'
			+   '<form id="newClass" method="POST" enctype="multipart/form-data">'
			+     '<input type="text" name="username" placeholder="username">'
			+	   '<input type="text" name="password" placeholder="password">'
			//+	   '<input type="submit" value="Login" id="login">'
			+      '<button type="button" id ="pleaseLogin">Login</button>'
			+	 '</form>'
			+ '</div>');
}

function createSignupForm() {
  return $(   '<div id="signupForm" style="display: none;">'
			+   '<form id="newClass" method="POST" enctype="multipart/form-data">'
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
			//+	   '<input type="submit" value="Sign Up" id="signup">'
			+		'<button type="button" id="pleaseSignup">Sign Up</button>'
			+	 '</form>'
			+ '</div>');
}

function createWelcome() {
  return $( '<div id="welcomeMessage" style="display: none;">WELCOME!  '
		+	'<button type="button" id="closeWelcome">Close</button>'
		+   '</div>');
}
function createWelcomeBack() {
  return $( '<div id="welcomebackMessage" style="display: none;">WELCOME BACK!  '
		+	'<button type="button" id="closeWelcomeBack">Close</button>'
		+   '</div>');
}

// form: 1 = login
//		 0 = sign up
function toggleVisibility(form){
  if (visibility_results == 1) {
	if (user == 1){
	$('#userOne').toggle(); 
    }
    else if (user == 2) {
	  $('#userTwo').toggle();  
    }
	else {
	  $('#userThree').toggle();
    }
	visibility_results = 0;
	user++;
	if (form) {
	  $("#loginForm").toggle();
	}
	else {
	  $("#signupForm").toggle();
	}
  }
  else if(form) {
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
  }
  // Fix to allow new login / sign up without refreshing

  else {
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
  }
}

function courseCheck() {
	/*$('div.courseCheck').append('<form id="classes" method="POST" enctype="multipart/form-data></form>');
	
	REQUIRED.forEach(function(class){
	  $('form.classes').append('<input type="checkbox" name="takenCourses"') // Add class variable to each input.
	});*/
}

// Add other courses
function createCourseCheck(){
  return $( '<div id="courseCheck" style="display: none;">Which Courses have you taken?'
		+		'<form id="classes" method="POST" enctype="multipart/form-data>'
		+			'<input type="checkbox" name="takenCourses" value="CIS 115"> CIS 115<br>'
		+			'<input type="checkbox" name="takenCourses" value="CIS 200"> CIS 200<br>'
		+			'<input type="checkbox" name="takenCourses" value="CIS 300"> CIS 300<br>'
		+			'<input type="checkbox" name="takenCourses" value="CIS 301"> CIS 301<br>'
		+			'<input type="checkbox" name="takenCourses" value="CIS 308"> CIS 308<br>'
		+			'<input type="checkbox" name="takenCourses" value="CIS 415"> CIS 415<br>'
		+			'<input type="checkbox" name="takenCourses" value="CIS 450"> CIS 450<br>'
		+			'<input type="checkbox" name="takenCourses" value="CIS 501"> CIS 501<br>'
		+			'<input type="checkbox" name="takenCourses" value="CIS 505"> CIS 505<br>'
		+			'<input type="checkbox" name="takenCourses" value="CIS 520"> CIS 520<br>'
		+			'<input type="checkbox" name="takenCourses" value="CIS 560"> CIS 560<br>'
		+			'<input type="checkbox" name="takenCourses" value="CIS 575"> CIS 575<br>'
		+			'<button type="button" id="submitButton">Submit</button>'
		+		'</form>'
		+	'</div>');
}

function createUserOne() {
  return $( '<div id="userOne" style="display: none;">You still have to take: '
	+		'<ul>'
	+			'<li>CIS 301</li>'
	+			'<li>CIS 308</li>'
	+			'<li>CIS 415</li>'
	+			'<li>CIS 450</li>'
	+			'<li>CIS 501</li>'
	+			'<li>CIS 505</li>'
	+			'<li>CIS 520</li>'
	+			'<li>CIS 560</li>'
	+			'<li>CIS 575</li>'
	+		'</ul>'
	+	'</div>');
}
function createUserTwo() {
	return $( '<div id="userTwo" style="display: none;">You still have to take: '
		+		'<ul>'
		+			'<li>CIS 415</li>'
		+			'<li>CIS 450</li>'
		+			'<li>CIS 501</li>'
		+			'<li>CIS 505</li>'
		+			'<li>CIS 520</li>'
		+			'<li>CIS 560</li>'
		+			'<li>CIS 575</li>'
		+		'</ul>'
		+	'</div>');
}
function createUserThree() {
	return $( '<div id="userThree" style="display: none;">You still have to take: '
		+		'<ul>'
		+			'<li>CIS 115</li>'
		+			'<li>CIS 200</li>'
		+			'<li>CIS 300</li>'
		+			'<li>CIS 301</li>'
		+			'<li>CIS 308</li>'
		+			'<li>CIS 415</li>'
		+			'<li>CIS 450</li>'
		+			'<li>CIS 501</li>'
		+			'<li>CIS 505</li>'
		+			'<li>CIS 520</li>'
		+			'<li>CIS 560</li>'
		+			'<li>CIS 575</li>'
		+		'</ul>'
		+	'</div>');
}

function addSubmitCallback() {
	$("#newClass").submit(function() { 
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
  toggleVisibility(1);
})
	
$("#signupButton").click(function(){
  toggleVisibility(0);
})

// Could append #welcomebackMessage to div.containter here then toggle vis right after
$("#pleaseLogin").click(function() {
	toggleVisibility(1);
	$("#welcomebackMessage").toggle();
	//$('div.container').append(createCourseCheck());
})

$("#pleaseSignup").click(function() {
	toggleVisibility(0);
	$("#welcomeMessage").toggle();
	//$('div.container').append(createCourseCheck());
	//courseCheck();
})

$("#closeWelcome").click(function() {
	$("#welcomeMessage").toggle();
	$('#courseCheck').toggle();
})
$("#closeWelcomeBack").click(function() {
	$("#welcomebackMessage").toggle();
	//$('#courseCheck').toggle();
  if (user == 1){
	$('#userOne').toggle();
    visibility_results = 1;	
  }
})

$("#submitButton").click(function() {
  $('#courseCheck').toggle();
  if (user == 1){
	$('#userOne').toggle(); 
  }
  else if (user == 2) {
	$('#userTwo').toggle();  
  }else {
	$('#userThree').toggle();
  }
  $('#courseResults').toggle();
  visibility_results = 1;
})
},{"./api.js":1}]},{},[2]);
