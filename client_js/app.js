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