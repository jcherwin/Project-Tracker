// save reference to important DOM elements
var timeDisplayEl = $('#time-display');

// handle displaying the time
setInterval(function() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
},1000);

// Reads projects from local storage and returns array of project objects.
// Returns an empty array ([]) if there aren't any projects.
function readProjectsFromStorage() {
  var projects = localStorage.getItem('projects');
  if (projects) {
    projects = JSON.parse(projects);
  } else {
    projects = [];
  }
  return projects;
}

// Takes an array of projects and saves them in localStorage.
function saveProjectsToStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

// ADDING MY ADDITIONS HERE
