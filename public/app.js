function loadProject(src) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'src');
  xhr.send(null);

  xhr.onreadystatechange = function() {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        console.log(xhr.responseText); // 'This is the returned text.'
        var projects = JSON.parse(xhr.responseText);
        var wrapper = document.createElement('div');;
        var name = document.createElement('h1');
        var image = document.createElement('img');
        name.innerHTML = project.name;
        image.src = project.imageSrc;
        wrapper.appendChild(name);
        wrapper.appendChild(image);
        document.body.appendChild(wrapper);
        document.body.appendChild(name);
        project.onClick = function(event) {
        event.preventDefault();
        alert("Load using Ajax");
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  }
}



// JQuery - Easier to write.
function loadIndex() {
  $.get('/projects/', function(projects, status) {
    if(status == 200) {
      $('body').clear();
      projects.forEach(function(project) {
        var link = $('a')
          .text(project.name);
          .attr('href', '/projects/' + project.id)
          .on('click', function(e) {
            e.preventDefault();
            loadProject('/projects/' + project.id)
          });
        $('body').clear().append('a');
      });
    }
  });
}
