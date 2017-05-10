var api = require('./api.js');


function redraw() {
    clearAllThumbnails();
    api.getclasses(function(classes) {
        createForms(classes);
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
function createForms(classes) {
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
  /*if ($("#signupForm").visibility == true){
	$("#signupForm").toggle();
  }*/
  $("#loginForm").toggle();
})
	
$("#signupButton").click(function(){
  $("#signupForm").toggle();
})