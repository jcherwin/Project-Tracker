// save reference to important DOM elements
var timeDisplayEl = $('#time-display');

/* different variables for modal window */
var modalSubmit = document.getElementById("formInput");
var projectName = document.getElementById("projName");
var projectType = document.getElementById("projType");
var projDueDate = document.getElementById("datepicker");

/* global variables to place values from modal window */
var projName;
var type;
var dueDate;

// handle displaying the time
function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}

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

displayTime();

/* click event */
modalSubmit.addEventListener("click", function() {
  projName = projectName.value;
  type = projectType.value;
  dueDate = projDueDate.value;
});