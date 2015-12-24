'use strict';

angular.module('justintelmoNoteApp', ['ngRoute', 'textAngular',
    'ui.bootstrap'
  ])
  .config(function($routeProvider) {
    $routeProvider
    // route for the contactus page
      .when('/createnote', {
        templateUrl: 'note.html',
        controller: 'NoteController'
      })
      .when('/notes', {
        templateUrl: 'mynotes.html',
        controller: 'NoteListController'
      })
      .when('/editnote/:id', {
        templateUrl: 'note.html',
        controller: 'NoteEditController'
      })
      .otherwise('/createnote');
  })
