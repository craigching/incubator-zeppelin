/* Copyright 2014 NFLabs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * @ngdoc function
 * @name zeppelinWeb2App.controller:NotebookCtrl
 * @description
 * # NotebookCtrl
 * Controller of notes, manage the note (update)
 * 
 * @author anthonycorbacho
 */
angular.module('zeppelinWeb2App').controller('NotebookCtrl', function($scope, $route, $routeParams, $location, $rootScope) {

  $scope.noteId = null;
  $scope.note = {};
  $scope.showEditor = false;
  
  /** Init the new controller */
  var initNotebook = function() {
    $scope.noteId = $routeParams.noteId;
    $rootScope.$emit('sendNewEvent', {op: 'GET_NOTE', data: {id: $scope.noteId}});
  };
  
  initNotebook();
  
  /** Remove the note and go back tot he main page */
  /** TODO(anthony): In the nearly future, go back to the main page and telle to the dude that the note have been remove */
  $scope.removeNote = function(noteId) {
    $rootScope.$emit('sendNewEvent', {op: 'DEL_NOTE', data: {id: noteId}});
    $location.path('/#');
  };
  
  /** Update the note name */
  $scope.sendNewName = function() {
    $scope.showEditor = false;
    if ($scope.noteName) {
      $rootScope.$emit('sendNewEvent', {op: 'NOTE_UPDATE', data: {id: $scope.noteId, name: $scope.noteName}});
    }
  };
  
  /** update the current note */
  $rootScope.$on('setNoteContent', function(event, note) {
      $scope.note = note;
      if ($scope.note !== note.id) {
        $scope.noteId = note.id;
        $routeParams.noteId = note.id;
      }
  });
});