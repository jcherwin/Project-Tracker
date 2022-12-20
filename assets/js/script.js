// Save reference to important DOM elements
var timeDisplayEl = $('#time-display');

/* different variables for modal window */
var projectForm = $("#projForm");
var projectName = $("#projName");
var projectType = $("#projType");
var projectDueDate = $("#datepicker");
var projectSubmit = $("#projSubmit");
var projectModal = $("#myModal");
var tableBody = $("#tableBody");

/* global variables to place values from modal window */
var projName;
var projType;
var projDueDate;

var timer = {
  start(){
    setInterval(() => { displayTime(); }, 1000);
  },
}

// Handle displaying the time
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

function captureFormData(){
  projName = projectName.val();
  projType = projectType.val();
  projDueDate = projectDueDate.val();
  var projectItem = [projName, projType, projDueDate];
  var projectSet = readProjectsFromStorage();
  projectSet.push(projectItem);
  saveProjectsToStorage(projectSet);
}

function printProjectData(){
  tableBody.text('');
  // If the project is past due, give the row a class so that the row for the project will have a light red background. 
  // If the project is due today, give the row a class so that the row will have a light yellow background.
  var projectSet = readProjectsFromStorage();
  for(var x in projectSet){  //goes over each array (1 table row each)
    var tableRow = $('<tr>');
    for(var y in projectSet[x]){  //goes through the contents of each array (fill out each table row)
      var tableData = $('<td>');
      tableData.text(projectSet[x][y]);
      //console.log(projectSet[x][y]);
      tableRow.append(tableData);
    }
    tableRow.append();
    tableBody.append(tableRow);
  }
}

// Apply jQueryUI datepicker to modal input
$( function() {
  projectDueDate.datepicker();
  displayTime();
  timer.start();
  printProjectData();
} );

// Add Event Listeners here
projectSubmit.on("click", captureFormData);

projectModal.on("hidden.bs.modal", function() {
  //Adds a short timer to form reset so submit has time to capture data
  setTimeout(() => {
    projectForm[0].reset();
    printProjectData(); 
  }, 500);
});