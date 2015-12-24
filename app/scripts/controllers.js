'use strict';

angular.module('justintelmoNoteApp')
  .controller('NoteController', ['$scope', '$routeParams', '$window',
    'noteFactory',
    function($scope, $routeParams, $window, noteFactory) {
      $scope.editing = false;
      $scope.note = {
        title: "",
        body: "",
        date: Date.now()
      }

      $scope.createNote = function createNote() {
        noteFactory.addNote($scope.note);
        $scope.emptyNoteForm();
        $window.location.href = '/app/Index.html#/notes';
      }

      $scope.emptyNoteForm = function emptyNoteForm() {
        $scope.noteForm.$setPristine();
        $scope.note = null;
      }
    }
  ])
  .controller('NoteListController', ['$scope', '$routeParams', 'noteFactory',
    function($scope, $routeParams, noteFactory) {
      $scope.notes = noteFactory.getNotes().reverse();
      $scope.currentPage = 1;
      $scope.pageLength = 5;

      $scope.$watch('currentPage + pageLength', function() {
        var begin = (($scope.currentPage - 1) * $scope.pageLength),
          end = begin + $scope.pageLength;

        $scope.filteredNotes = $scope.notes.slice(begin, end);
      })
    }
  ])
  .controller('NoteEditController', ['$scope', '$routeParams',
    '$window',
    'noteFactory',
    function($scope, $routeParams, $window, noteFactory) {
      $scope.note = noteFactory.getNote(parseInt($routeParams.id, 10));
      $scope.editing = true;
      $scope.createNote = function() {
        noteFactory.updateNote($scope.note);
        $window.location.href = '/app/Index.html#/notes';
      };
    }
  ]);
