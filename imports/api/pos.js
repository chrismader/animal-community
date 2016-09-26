import { Mongo } from 'meteor/mongo';

export const dbProductTypes = new Mongo.Collection('productypes');
export const dbProducts = new Mongo.Collection('products');

/*
    name
    canBeDeleted
    createdOn
    createdBy
    updatedOn
    updatedBy
    deletedOn
    deletedBy
*/

/*
type: 
    Medical (will link to medical procedures which has associated stock)
    Other
    Clinic
    Merchandice
    Animals (will link to adoptable animals)
createdOn
createdBy
updatedOn
updatedBy
deletedOn
deletedBy
upc
unitprice
name
stock: [date, units, unitcost]
*/