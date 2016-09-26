import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import contact from '../imports/components/contacts/contact'
// import contactfind from '../imports/components/contacts/contactFind'
import animal from '../imports/components/animals/animal'
import pos from '../imports/components/pos/pos'


angular.module('mac', [
  angularMeteor
  , ngMaterial
  ,contact.name
  ,animal.name
  ,pos.name
  // ,contactfind.name
]);