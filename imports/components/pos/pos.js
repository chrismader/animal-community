import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import template from './pos.html';
import { dbProductTypes, dbProducts } from '../../api/pos.js'
import { dbAnimals } from '../../api/animals.js'
import { dbStock } from '../../api/stock.js'
// import contact from '../contacts/contact'
// import contactfind from '../imports/components/contacts/contactFind'

class PosCtrl {
    constructor($scope, $mdDialog, $mdToast) {
        $scope.viewModel(this);
        this.selectedContact = [];
        this.selectedAnimal = [];
        this.productsLoaded = true;
        
        this.helpers({
             getProduct() {
                return dbProducts.find({});
             }

             , numberOfProducts() {
                 return dbProducts.find({}).count();
             }
             , items() {
                 return ["Chris", "Sally"];
             }
             ,getProductTypes() {
                 var _result = dbProductTypes.find({});
                 this.productsLoaded = true;
                 return _result;
             }

        })

        var vm = this;
        var _s = new Date();
        vm.productTypes = dbProductTypes.find().fetch();

        //Progress Indicators
        
        
        vm.cart = [];
        vm.product = [];
        vm.products = []; 
        vm.categories = [];
        vm.subTotal = 0.00;
        vm.scanLog = ''
        vm.scan = ''
        vm.showDetails = false;

        vm.toggleShowDetails = function() {
            vm.showDetails = !vm.showDetails;
        }


        // vm.getProducts = function() {
        //     return dbProducts.find().fetch();
        // }
        vm.con = function($value) {
            vm.selectedContact = $value.selectedContact;
        }

        vm.conAnimal = function($value) {
            vm.selectedAnimal = $value.selectedAnimal;
        }

        vm.findProduct = function(txt) {
            var _result = [];
            if ($.isNumeric(txt)) {
                _result = dbProducts.find({'upc' : txt.toString()}).fetch()
            } else {
                _result.push({id:3, item: 'Unfound'});
            }

            return _result;
        }

        vm.update = function(item) {
            var _updateRec = JSON.parse(JSON.stringify(item));

            //Remove data from record that causes update issues
            delete _updateRec["_id"];
            delete _updateRec["$$hashKey"]
            delete _updateRec["editMode"]

            dbProducts.update(item._id, {
                $set: _updateRec
            })
            item.editMode = false;

        }

        vm.toggleEdit = function(item) {
            if (typeof item.editMode === 'undefined') {
                item.editMode = true;
            } else {
                item.editMode = !item.editMode;
            }
        }

        // vm.products = vm.getProducts();

        vm.addProduct = function(product) {
            dbProducts.insert(product);
            vm.product = [];
        }

        // vm.subcategories = [
        //     { 'Adoption' :['Annie', 'Elie', 'Emma', 'Tank', 'Shep', 'Nelli'] }
        //     , { 'Medical' :['Spay', 'Neuter', 'Clinic Exam', 'Dental', 'Nail Trim'] }
        //     , { 'Vaccination' :['DHPP', 'Rabies', 'Feline Lukema', 'De-wrommer', 'Nail Trim'] }
        //     , { 'Surrender' :['Dog', 'Puppy', 'Cat', 'Kitten', 'Other'] }
        //     , { 'Other' :['Dog Tag', 'Dog Impound'] }
        //     , { 'Merchandice' :['Leash', 'Collar', 'Candle', 'T-Shirt', 'Zip-Up Hoodie'] }
        // ]
        
        vm.selectCatagory = function(cat) {
            vm.sub = []
            // var _t =  $.grep(vm.subcategories, function(v,i) { return v.hasOwnProperty(cat.name)})
            // if (_t.length !== 0) { vm.sub=_t[0][cat.name]; }
            if (cat.name === 'Animal') {
                var _animals = dbAnimals.find().fetch();
                for(i = 0; i < _animals.length; i++) {
                    vm.sub.push({name: _animals[i].code + ' - ' + _animals[i].name, quantityOnHand: 1, record: _animals[i]});
                }
            } else {
                var _t = dbProducts.find({type: cat.name}).fetch();
                vm.sub = _t;
            }
        }

        vm.addToCart = function(item) {
            item.customer = vm.selectedContact;
            item.animal = vm.selectedAnimal;
            item.uid = new Date();
            // item.recordNumber = vm.cart.length;
            vm.cart.push(item);
            if (typeof item.quantityOnHand !== 'undefined') item.quantityOnHand--;
        }

        vm.removeFromCart = function(item, index) {
            vm.subTotal -= parseFloat(item.price)
            if (typeof item.quantityOnHand !== 'undefined') item.quantityOnHand++;
            vm.cart.splice(index,1);
        }

        findProduct = function(itemFind) {
            dbProducts.find()
        }

        vm.itemKeyPress = function(e) {
            if (e.key === 'Enter') {
                console.log(vm.scan);
                var _newItem = {"id":  vm.cart.length, "item": vm.scan};
                var _t = vm.findProduct(vm.scan);
                if (_t.length === 1) {
                    vm.cart.push({id: _t[0]._id, name: _t[0].name, price: _t[0].unitprice});
                    vm.subTotal += parseFloat(_t[0].unitprice);
                }
                
                vm.scanLog = '';
                vm.scan = '';
            } else {
                vm.scan += e.key;
            }
        }
    }
}

export default angular.module('pos', [
    angularMeteor, ngMaterial
])
    .component('pos', {
        templateUrl: 'imports/components/pos/pos.html'
        ,bindings: {
            selectedContact: '<'
            ,selectedAnimal: '<'
        }
        ,controller: ['$scope', '$mdDialog', '$mdToast', PosCtrl]

    });