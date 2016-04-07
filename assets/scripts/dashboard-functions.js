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
  $('.assignment').html(assignmentTemplate({assignments}));
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
  }).done(function(data) {
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
const addStudent = function() {

};

const getStudents = function() {

};

const updateStudent = function() {

};

const deleteStudent = function() {

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
    console.log(data.classrooms);
    assignmentLister(data.classrooms.assignments);
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

  addClassroom,
  getClassrooms,
  updateClassroom,
  deleteClassroom,

  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,

  getAssignments,
};
