import { Mongo } from 'meteor/mongo';

export const dbAnimals = new Mongo.Collection('animals');

/*
type
firstname
lastname
companyname
address
address2
city
state
zipcode
phone: [type, number, cancall ]
email: [type, emailaddress, canemail ]
flags:
privatenotes
*/