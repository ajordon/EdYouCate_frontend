'use strict';

// globalObjects is an object/dictionary, containing keys "user" and "baseUrl"
// "user" contains the user data which our server returns. "baseUrl" is set at document.ready
const globalObjects = require('./global-objects');

let classroomLister = function(classrooms) {
  let classroomTemplate = require('./hb/class-listing.handlebars');
  $('.classroom').html(classroomTemplate({classrooms}));
};

let assignmentLister = function(assignments) {
  let assignmentTemplate = require('./hb/assignment-listing.handlebars');
  $('.assignments').html(assignmentTemplate({assignments}));
};

let studentLister = function(students) {
  let studentTemplate = require('./hb/student-listing.handlebars');
  $('.students').html(studentTemplate({students}));
};

const getClassrooms = function() {
  $.ajax({
    url: globalObjects.baseUrl + '/classrooms',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    dataType: 'json'
  }).done(function(data) {
    console.log(data.classrooms);
    classroomLister(data.classrooms);
  }).fail(function(data) {
    console.error(data);
  });
};

const addClassroom = function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/classrooms',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function() {
    console.log("Added Classroom!");
    $('#addClassModal').modal('hide');
    getClassrooms();
  }).fail(function(data) {
    console.error(data);
  });
};

const updateClassroom = function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/classrooms/' + globalObjects.currClassroom,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function() {
    getClassrooms();
    $('#updateClassModal').modal('hide');
    console.log("Successfully updated the classroom!");
  }).fail(function(data) {
    console.error(data);
  });
};

const deleteClassroom = function() {
  $.ajax({
    url: globalObjects.baseUrl + '/classrooms/' + globalObjects.currClassroom,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    }
  }).done(function() {
    console.log("Successfully deleted the classroom!");
    $('#deleteClassModal').modal('hide');
    getClassrooms();
  }).fail(function(data) {
    console.error(data);
  });
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const getAssignments = function() {
  $.ajax({
    url: globalObjects.baseUrl + '/classrooms/' + globalObjects.currClassroom + '/assignments',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    dataType: 'json'
  }).done(function(data) {
    assignmentLister(data.assignments);
  }).fail(function(data) {
    console.error(data);
  });
};

const addAssignment = function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/classrooms/' + globalObjects.currClassroom + '/assignments',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
    $('#addAssignmentModal').modal('hide');
    getAssignments();
  }).fail(function(data) {
    console.error(data);
  });
};

const updateAssignment = function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/classrooms/' + globalObjects.currClassroom + '/assignments/' + globalObjects.currAssignment,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
    $('#updateAssignmentModal').modal('hide');
    console.log("Successfully updated the classroom!");
    getAssignments();
  }).fail(function(data) {
    console.error(data);
  });
};

const deleteAssignment = function() {
  $.ajax({
    url: globalObjects.baseUrl + '/classrooms/' + globalObjects.currClassroom + '/assignments/' + globalObjects.currAssignment,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    }
  }).done(function() {
    console.log("Successfully deleted the assignment!");
    $('#deleteAssignment').modal('hide');
    getAssignments();
  }).fail(function(data) {
    console.error(data);
  });
};
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const getStudents = function() {
  $.ajax({
    url: globalObjects.baseUrl + '/classrooms/' + globalObjects.currClassroom + '/students',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    dataType: 'json'
  }).done(function(data) {
    studentLister(data.students);
  }).fail(function(data) {
    console.error(data);
  });
};

const addStudent = function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/classrooms/' + globalObjects.currClassroom + '/students',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function() {
    $('#addStudentModal').modal('hide');
    getStudents();
  }).fail(function(data) {
    console.error(data);
  });
};

const updateStudent = function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/classrooms/' + globalObjects.currClassroom + '/students/' + globalObjects.currStudent,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    $('#updateStudentModal').modal('hide');
    console.log("Successfully updated the student!");
    getStudents();
  }).fail(function(data) {
    console.error(data);
  });
};

const deleteStudent = function() {
  $.ajax({
    url: globalObjects.baseUrl + '/classrooms/' + globalObjects.currClassroom + '/students/' + globalObjects.currStudent,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    }
  }).done(function() {
    console.log("Successfully deleted the student!");
    $('#deleteStudentModal').modal('hide');
    getStudents();
  }).fail(function(data) {
    console.error(data);
  });
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const showDashboard = function(){
  $('.bgimage').hide();
  $('.title').hide();
  $('.sidebar').show();
  $('.dashboard').show();
  getClassrooms();
};

module.exports = {
  showDashboard,

  getClassrooms,
  addClassroom,
  updateClassroom,
  deleteClassroom,

  getAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,

  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};
