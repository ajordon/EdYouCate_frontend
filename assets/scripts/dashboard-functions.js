'use strict';

// globalObjects is an object/dictionary, containing keys "user" and "baseUrl"
// "user" contains the user data which our server returns. "baseUrl" is set at document.ready
const globalObjects = require('./global-objects');

let classroomLister = function(classroom) {
  let classroomTemplate = require('./hb/class-listing.handlebars');
  $('.classroom').html(classroomTemplate({classroom}));
};

let assignmentLister = function(assignment) {
  let assignmentTemplate = require('./hb/assignment-listing.handlebars');
  $('.assignment').html(assignmentTemplate({assignment}));
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
  }).done(function(data) {
    console.log("Added Classroom!");
    $('#addClassModal').modal('hide');
    getClassrooms();
  }).fail(function(data) {
    console.error(data);
  });
};

const updateClassroom = function() {
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
  }).done(function(data) {
    getClassrooms();
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
  }).fail(function(data) {
    console.error(data);
  });
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const addStudent = function() {

};

const findStudent = function() {

};

const showStudents = function() {

};

const updateStudent = function() {

};

const deleteStudent = function() {

};


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const showAssignments = function() {
  $.ajax({
    url: globalObjects.baseUrl + '/classrooms/' + globalObjects.currClassroom + '/assignments',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    dataType: 'json'
  }).done(function(data) {
    console.log(data.classrooms);
    assignementLister(data.classrooms.assignments);
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

  addStudent,
  findStudent,
  showStudents,
  updateStudent,
  deleteStudent,

  getAssignments,
};
