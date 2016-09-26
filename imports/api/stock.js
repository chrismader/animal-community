import { Mongo } from 'meteor/mongo';

export const dbStock = new Mongo.Collection('stock');

/*
name
lowQuantityAlert
unitCost
unitOfMeasure
defaultVendor
history [
        date
        who
        qty
    ]
*/

