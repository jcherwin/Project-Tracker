// Global variables and constants
const DATE_TODAY = dayjs();
const KEY_PROJECTS = 'projects';

// Save reference to important DOM elements
var timeDisplayEl = $('#time-display');
var projectForm = $("#projForm");
var projectName = $("#projName");
var projectType = $("#projType");
var projectDueDate = $("#datepicker");
var projectSubmit = $("#projSubmit");
var tableBody = $("#tableBody");

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
  var projects = localStorage.getItem(KEY_PROJECTS);
  if (projects) {
    projects = JSON.parse(projects);
  } else {
    projects = [];
  }
  return projects;
}

// Takes an array of projects and saves them in localStorage.
function saveProjectsToStorage(projects) {
  localStorage.setItem(KEY_PROJECTS, JSON.stringify(projects));
}

// Takes the input values from the page modal and saves them to localStorage
function captureFormData(){
  var projName = projectName.val();
  var projType = projectType.val();
  var projDueDate = projectDueDate.val();
  var projectItem = [projName, projType, projDueDate];
  var projectSet = readProjectsFromStorage();
  projectSet.push(projectItem);
  saveProjectsToStorage(projectSet);
}

// Clears the main table and then writes out data saved in localStorage
function printProjectData(){
  tableBody.text('');
  var projectSet = readProjectsFromStorage();

  for(var x in projectSet){  //this FOR loop creates a Table Row every time it iterates
    var tableRow = $('<tr>').attr("data-attribute",x);   
    for(var y in projectSet[x]){  //this FOR loop fills out the Table Data for each Row
      var dateDue = projectSet[x][2];  //gets the date from this Table Row           
      var tableData = $('<td>');
      tableData.text(projectSet[x][y]);
      tableRow.append(tableData);
    }
    var tableData = $('<td>');
    var deleteRowBtn = $('<button>').text("X").attr("data-attribute","delete");
    tableData.append(deleteRowBtn);
    tableRow.append(tableData);

    dateDue = dayjs(dateDue);  //Converts the date from this Table Row to a datejs object
    var diffCheck = DATE_TODAY.diff(dateDue, "day", true);  //gets the difference between todays date and the stored date in number of days
    if(diffCheck >= 1){
      tableRow.addClass("tr-past-due"); //light red
    }else if(diffCheck < 1 && diffCheck > -0.1){
      tableRow.addClass("tr-due-today"); //light yellow
    } 

    tableBody.append(tableRow);
  }
}

// Apply jQueryUI datepicker to modal input
$(function(){
  projectDueDate.datepicker();
  displayTime();
  timer.start();
  printProjectData();
} );

// Event listeners go here
projectSubmit.on("click",function(){
  captureFormData();
  projectForm[0].reset();
  printProjectData(); 
});

// Delegated event selecting tbody which exists in the DOM at page load
$('tbody').on("click","button[data-attribute=delete]",function(event){
  var rowNumber = $(this).parent().parent().attr("data-attribute");
  var projectSet = readProjectsFromStorage();
  projectSet.splice(rowNumber,1);
  saveProjectsToStorage(projectSet);
  printProjectData();
});
