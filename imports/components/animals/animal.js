import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import template from './animal.html';
import { dbAnimals } from '../../api/animals.js'

class AnimalCtrl {
    constructor($scope, $mdDialog, $mdToast) {
        $scope.viewModel(this);

        this.helpers({

        })

        var vm = this;

        vm.colors = ['White', 'Black', 'Gray'];
        vm.species = ['Dog', 'Cat', 'Brid', 'Farm Animal'];
        vm.type= ['Stray', 'Abandoned', 'Neglect', 'Incident', 'Unwanted']
        vm.animal = [];
        vm.animal.colors = [];
        vm.animal.bondedWith = [];
        vm.animal.behaviors = {};
        vm.findText = '';

        vm.useAnimal = function(animal) {
            //this.selectedContact = contact;
            vm.onSelectAnimalChange({$value: {selectedAnimal: animal}})
            vm.searchResults = [];
        }
        
        getNextAnimalId = function() {
            var _nextId = 1;
            var _builder = [];

              _builder = {$and: [] };
              _builder.$and.push({type: vm.animal.type });
              _builder.$and.push({species:vm.animal.species });
            var _results = dbAnimals.find(_builder, {sort: {code: -1}, limit:1}).fetch();
            if (_results.length === 1) {
                _nextId = parseInt(_results[0].code.substring(6,9))
                _nextId++;
            }            
            return vm.animal.type.substring(0,1) + vm.animal.species.substring(0,1) + new Date().getFullYear().toString() + ("000" + _nextId).slice(-3);
        }

        vm.saveAnimal = function () {
            if (typeof vm.animal._id === 'undefined' ) {
                //New animal
                vm.animal.code = getNextAnimalId();
                dbAnimals.insert(vm.animal);
                $mdToast.show(
                     $mdToast.simple()
                        .textContent('Added animal ' + vm.animal.code)                       
                        .hideDelay(5000)
                  );                
            } else {
              var _updateRec = JSON.parse(JSON.stringify(vm.animal));

              //Remove data from record that causes update issues
              delete _updateRec["_id"];
              delete _updateRec["$$hashKey"]

              dbContacts.update(vm.animal._id, {
                  $set: _updateRec
              })
              vm.animal = {};
            }
        }

        vm.deleteAnimal = function(row) {
            dbAnimals.remove({_id: row._id});
            vm.searchResults.pop(row);
        }

        vm.editAnimal = function(record) {
            vm.animal = record;
        }

        vm.search = function() {
          var _search = vm.findText.split(' ');
          var _builder = {} ; 

            _builder = {$or: [] };
            var _r1 = new RegExp(vm.findText, "i");
            _builder.$or.push({name:_r1 });
            _builder.$or.push({code:_r1 });

          vm.searchResults = dbAnimals.find(_builder, {sort: {name: 1}}).fetch();          
      }
    }
}

export default angular.module('animal', [
    angularMeteor, ngMaterial
])
    .component('animal', {
        templateUrl: 'imports/components/animals/animal.html',
        controller: ['$scope', '$mdDialog', '$mdToast', AnimalCtrl]
        ,bindings: {
            selectedAnimal: '<'
            ,onSelectAnimalChange: '&'
        }        
    });