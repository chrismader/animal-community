import { Meteor } from 'meteor/meteor';
import { dbContacts } from '../imports/api/contacts.js'
import { dbAnimals } from '../imports/api/animals.js'
import { dbProducts, dbProductTypes } from '../imports/api/pos.js'

Meteor.startup(() => {
  // code to run on server at startup

  //Get Counts of databases
  var _countProductTypes = dbProductTypes.find({}).count();
  console.log("DB Checks");
  console.log("  - producttypes: " + _countProductTypes);
  if (_countProductTypes === 0) {
    dbProductTypes.insert({ name: 'Animal' , canBeDeleted:false, createdOn: new Date(), createdBy: 'system', updatedOn: new Date(), updatedBy: 'system', deletedOn: new Date(2999,12,31), deletedBy:'' });
    dbProductTypes.insert({ name: 'Medical', canBeDeleted:false, createdOn: new Date(), createdBy: 'system', updatedOn: new Date(), updatedBy: 'system', deletedOn: new Date(2999,12,31), deletedBy:'' });
    dbProductTypes.insert({ name: 'Merchandice' , canBeDeleted:false, createdOn: new Date(), createdBy: 'system', updatedOn: new Date(), updatedBy: 'system', deletedOn: new Date(2999,12,31), deletedBy:'' });
    dbProductTypes.insert({ name: 'Other' , canBeDeleted:false, createdOn: new Date(), createdBy: 'system', updatedOn: new Date(), updatedBy: 'system', deletedOn: new Date(2999,12,31), deletedBy:'' });
    dbProductTypes.insert({ name: 'Donation' , canBeDeleted:false, createdOn: new Date(), createdBy: 'system', updatedOn: new Date(), updatedBy: 'system', deletedOn: new Date(2999,12,31), deletedBy:'' });
  }

 
});


  //var mysqlStringConnection = 	"mysql://root@127.0.0.1/asm?debug=false&charset=utf8";
 
    //var db = Mysql.connect(mysqlStringConnection);  
    //var usersTable = db.table("owner"); //yes, just this :) 
    //var _resultsContacts = dbContacts.find({});
    //if (_resultsContacts.count() === 3) {
     // console.log("Importing ASM contacts")
    //}
      /*
      var _new = {
        firstName: 'Chris'
        ,lastName: 'Mader'
        , address: ''
        , city: ''
        , state: ''
        ,zipCode: ''
      }
      dbContacts.insert(_new);*/
      //var criteria = db.criteriaFor("owner")
     //   .exclude("password","createdDate") //or .except(...columns). Removes that column(s) from the select query. 
     // 
     // Users = db.meteorCollection("owner","ownerCollection",criteria);
     /*
     var _add = [];
     usersTable.findAll()
     .then(Meteor.bindEnvironment(function(data) {
       
       console.log('ASM Data: ' + JSON.stringify(data[0]))
       for(i = 0; i < data.length; i++) {
         console.log(data[i].OwnerForeNames);
         var _new = {
          firstName: data[i].OwnerForeNames
          ,lastName: data[i].OwnerSurname
          , address: data[i].OwnerAddress
          , city: data[i].OwnerTown
          , state: data[i].OwnerCounty
          ,zipCode: data[i].OwnerPostcode
          }
          dbContacts.insert(_new);
       }
 
    }))
    }
    */
    //console.log("Contacts: " + _resultsContacts.count());
/*
var _resultsContacts = dbContacts.find({});
if (_resultsContacts.count() === 0) {
  console.log("Adding new contact")
  var _new = {
    firstName: 'Chris'
    ,lastName: 'Mader'
  }
  dbContacts.insert(_new);
}
*/
//dbContacts.insert(_add);
//console.log("ADD Len: " + JSON.stringify(_add);
//console.log("Contacts: " + _resultsContacts.count());

