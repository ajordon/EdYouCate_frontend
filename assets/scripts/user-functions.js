'use strict';

const globalObjects = require('./global-objects');
const dbf = require('./dashboard-functions');

const assignUserData = function(data) {
  globalObjects.user = data.user;
};

const signUp = function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/sign-up',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData
  }).done(function(data){
    console.log("successfully signed up");
    $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    $('#signUpModal').modal('hide');
  }).fail(function(jqxhr) {
    console.error(jqxhr);
    $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    console.log("sign up failed");
  });
};

const signIn = function(e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/sign-in',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData
  }).done(function(data){
      assignUserData(data);
      console.log("successfully signed in");
      $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      $('.navbar-text').html("Welcome " + globalObjects.user.name);
      $('#signInModal').modal('hide');
      $('.bgimage').hide();
      $('.sign-up').hide();
      $('.sign-in').hide();
      $('.change-password').show();
      $('.sign-out').show();
      dbf.showDashboard();
  }).fail(function(jqxhr) {
    console.error(jqxhr);
    $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    console.log("sign in failed");
  });
};

// remember to use underscore id in all ajax
const signOut = function() {
  if (!globalObjects.user) {
    console.error('Wrong!');
  }

  $.ajax({
    url: globalObjects.baseUrl + '/sign-out/' + globalObjects.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    }
  }).done(function() {
    globalObjects.user = {};
    console.log("successfully signed out");
    $('.navbar-text').html("Welcome!");
    $('.sign-up').show();
    $('.sign-in').show();
  }).fail(function(data) {
    console.error(data);
    $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    console.log("sign out failed");
  });
};

// remember to use underscore id in all ajax
const changePassword = function(e) {
  e.preventDefault();
  if (!globalObjects.user) {
    console.error('Wrong!');
  }

  var formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/change-password/' + globalObjects.user._id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log("password successfully changed");
    $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    $('#passwordModal').modal('hide');
  }).fail(function(jqxhr) {
    console.error(jqxhr);
    $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    console.log("password change failed");
  });
};

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
};
