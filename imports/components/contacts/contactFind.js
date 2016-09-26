import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import template from './contact.html';
import templateDialog from './contactFind.html';
import { dbContacts } from '../../api/contacts.js'
 
class ContactFindCtrl {
  constructor($scope, $mdDialog) {
      $scope.viewModel(this);

      this.helpers({
          getContacts() {
            return undefined;
          }
      })

      var vm = this;

      vm.ShowAdd = false;
      vm.scanLicenseText = "";
      vm.newcontact = {};
      vm.contacts = [];
      vm.searchResults = [];
      vm.customFullscreen = false;

      vm.search = function() {
          var _search = vm.findText.split(' ');
          var _builder = {} ; 

          if (_search.length === 2) {
              //First Last name
              _builder = {$and: [] };
                var _r1 = new RegExp(_search[0], "i");
                var _r2 = new RegExp(_search[1], "i");
              _builder.$and.push({lastName:_r2 });
              _builder.$and.push({firstName:_r1 });
          } else {
            _builder = {$or: [] };
            var _r1 = new RegExp(vm.findText, "i");
            _builder.$or.push({lastName:_r1 });
            _builder.$or.push({firstName:_r1 });
          }

          vm.searchResults = dbContacts.find(_builder, {sort: {lastName: 1, firstName: 1}}).fetch();          
      }

        vm.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            /*
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete your debt?')
                .textContent('All of the banks have agreed to forgive you your debts.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Please do it!')
                .cancel('Sounds like a scam');

            $mdDialog.show(confirm).then(function() {
            vm.status = 'You decided to get rid of your debt.';
            }, function() {
            vm.status = 'You decided to keep your debt.';
            });
            */
            $mdDialog.show({
                //controller: vm,
                templateUrl: 'imports/components/contacts/contactFind.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                //$scope.status = 'You cancelled the dialog.';
            });            
        };      

      vm.addContact = function() {
          vm.saveError = "";
          if (typeof vm.newcontact._id === 'undefined' ) {
              //This is a new record
            var _alreadyExists = vm.contactExists(vm.newcontact);
            if (!_alreadyExists) {
                dbContacts.insert(vm.newcontact);
                vm.newcontact = {};
                vm.ToggleAdd();
            } else {
                vm.saveError = "This contact already exists.  Data not saved";
            }
          } else { 
              var _updateRec = JSON.parse(JSON.stringify(vm.newcontact));

              //Remove data from record that causes update issues
              delete _updateRec["_id"];
              delete _updateRec["$$hashKey"]

              dbContacts.update(vm.newcontact._id, {
                  $set: _updateRec
              })
              vm.ToggleAdd();
              vm.newcontact = {};
          }
      }

      vm.ToggleAdd = function(row) {
          if (typeof row === "undefined")
            vm.newcontact = {};
        else 
            vm.newcontact = row;

          vm.ShowAdd = !vm.ShowAdd;
      }

      vm.deleteContact = function(row) {
          dbContacts.remove({_id: row._id});
      }

      vm.editContact = function(row) {
          vm.ToggleAdd(row);
      }

      vm.contactExists = function(contact) {
          var _results = dbContacts.find(contact);
          return _results.count();
      }

      vm.scanLicense = function() {
          var _fields = vm.scanLicenseText.split('^');
          if (_fields.length > 1) {
            var _state = _fields[0].substr(1,2);
            var _city = _fields[0].substr(3,_fields[0].length-3);
            var _name = _fields[1].split('$');
            var _nameLast = _name[0];
            var _nameFirst = _name[1];
            var _nameMiddle = _name[2];
            var _address = _fields[2];

            vm.newcontact.firstName = _nameFirst;
            vm.newcontact.lastName = _nameLast;
            vm.newcontact.middleName = _nameMiddle;
            vm.newcontact.address = _address;
            vm.newcontact.city = _city;
            vm.newcontact.state = _state;
          }
      }

      vm.states = [
        {"name": "Alabama","abbreviation": "AL" },
        {"name": "Alaska","abbreviation": "AK"},
        {"name": "American Samoa", "abbreviation": "AS" },
        {"name": "Arizona","abbreviation": "AZ"},
        {"name": "Arkansas", "abbreviation": "AR"},
        {"name": "California", "abbreviation": "CA"},
        {"name": "Colorado", "abbreviation": "CO"},
        {"name": "Connecticut", "abbreviation": "CT"},
        {"name": "Delaware", "abbreviation": "DE"},
        {"name": "District Of Columbia", "abbreviation": "DC"},
        {"name": "Federated States Of Micronesia", "abbreviation": "FM"},
        {"name": "Florida", "abbreviation": "FL"},
        {"name": "Georgia","abbreviation": "GA"},
        {"name": "Guam","abbreviation": "GU"},
        {"name": "Hawaii","abbreviation": "HI"},
        {"name": "Idaho","abbreviation": "ID"},
        {"name": "Illinois","abbreviation": "IL"},
        {"name": "Indiana","abbreviation": "IN"},
        {"name": "Iowa","abbreviation": "IA"},
        {"name": "Kansas","abbreviation": "KS"},
        {"name": "Kentucky","abbreviation": "KY"},
        {"name": "Louisiana","abbreviation": "LA"},
        {"name": "Maine","abbreviation": "ME"},
        {"name": "Marshall Islands","abbreviation": "MH"},
        {"name": "Maryland","abbreviation": "MD"},
        {"name": "Massachusetts","abbreviation": "MA"},
        {"name": "Michigan","abbreviation": "MI"},
        {"name": "Minnesota","abbreviation": "MN"},
        {"name": "Mississippi","abbreviation": "MS"},
        {"name": "Missouri","abbreviation": "MO"},
        {"name": "Montana","abbreviation": "MT"},
        {"name": "Nebraska","abbreviation": "NE"},
        {"name": "Nevada","abbreviation": "NV"},
        {"name": "New Hampshire","abbreviation": "NH"},
        {"name": "New Jersey","abbreviation": "NJ"},
        {"name": "New Mexico","abbreviation": "NM"},
        {"name": "New York","abbreviation": "NY"},
        {"name": "North Carolina","abbreviation": "NC"},
        {"name": "North Dakota","abbreviation": "ND"},
        {"name": "Northern Mariana Islands","abbreviation": "MP"},
        {"name": "Ohio","abbreviation": "OH"},
        {"name": "Oklahoma","abbreviation": "OK"},
        {"name": "Oregon","abbreviation": "OR"},
        {"name": "Palau","abbreviation": "PW"},
        {"name": "Pennsylvania","abbreviation": "PA"},
        {"name": "Puerto Rico","abbreviation": "PR"},
        {"name": "Rhode Island","abbreviation": "RI"},
        {"name": "South Carolina","abbreviation": "SC"},
        {"name": "South Dakota","abbreviation": "SD"},
        {"name": "Tennessee","abbreviation": "TN"},
        {"name": "Texas","abbreviation": "TX"},
        {"name": "Utah","abbreviation": "UT"},
        {"name": "Vermont","abbreviation": "VT"},
        {"name": "Virgin Islands","abbreviation": "VI"},
        {"name": "Virginia","abbreviation": "VA"},
        {"name": "Washington","abbreviation": "WA"},
        {"name": "West Virginia","abbreviation": "WV"},
        {"name": "Wisconsin","abbreviation": "WI"},
        {"name": "Wyoming","abbreviation": "WY"}
    ]      
  }
}
 
export default angular.module('contactFind', [
  angularMeteor, ngMaterial
])
  .component('contact', {
    templateUrl: 'imports/components/contacts/contactFind.html',
    controller: ['$scope', '$mdDialog', ContactFindCtrl]
  });