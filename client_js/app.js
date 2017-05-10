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
    var classDiv = $('div.container');
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