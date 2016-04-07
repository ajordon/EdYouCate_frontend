'use strict';

// globalObjects is an object/dictionary, containing keys "user" and "baseUrl"
// "user" contains the user data which our server returns. "baseUrl" is set at document.ready
const globalObjects = require('./global-objects');

// after this require command, "userFunc" is an object/dictionary, containing...
// keys: "signUp", "signIn", "signOut", and "changePassword"
// each key corresponds to a user function
const userFunc = require('./user-functions');
const dashFunc = require('./dashboard-functions');

// all jquery event listeners should go here
let userHandler = function() {
  $('#sign-up').on('submit', userFunc.signUp);
  $('#sign-in').on('submit', userFunc.signIn);
  $('#sign-out').on('click', userFunc.signOut);
  $('#change-password').on('submit', userFunc.changePassword);
  $('.change-password').hide();
  $('.sign-out').hide();
  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });
  $('.sidebar').hide();
  $('.dashboard').hide();

  $('#addClass').on('submit', dashFunc.addClassroom);
  $('#updateClass').on('submit', dashFunc.updateClassroom);
  $('.delete-classroom-form').on('click', dashFunc.deleteClassroom);

  $('#addStudent').on('submit', dashFunc.addStudent);
  // $('#updateStudent').on('submit', dashFunc.updateStudent);
  // $('#deleteStudent').on('submit', dashFunc.deleteStudent);
  //
  // $('#getAssignment').on('submit', dashFunc.addAssignment);
  // $('#updateAssignment').on('submit', dashFunc.updateAssignment);
  // $('#deleteAssignment').on('submit', dashFunc.deleteAssignment);

  $('.classroom-btn').hide();
};

$(document).ready(() => {
  // checks whether page is open in localhost, and sets the baseUrl based on that
  document.location.hostname === 'localhost' ?
    globalObjects.baseUrl = 'http://localhost:3000' :
    globalObjects.baseUrl = ''; // set to our heroku app URL
    userHandler(); // Calls jquery listener definintion function, above
    // dashFunc.showDashboard();

  $('.sidebar-nav').on('click', '.hb-show-classroom', function(e) {
    e.preventDefault();
    $('.classroom-btn').show();
    globalObjects.currClassroom = $(e.target).attr("data-id");
    dashFunc.getAssignments();
  });

  $('.student-row').on('click', '.hb-show-students', function(e) {
    e.preventDefault();
    globalObjects.currStudent = $(e.target).attr("data-id");
  });

  $('.assignment-row').on('click', '.hb-show-assignment', function(e) {
    e.preventDefault();
    globalObjects.currAssignment = $(e.target).attr("data-id");
  });

});
