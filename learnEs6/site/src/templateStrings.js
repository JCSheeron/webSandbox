import React from 'react';

// Rename this script "es6.js" to run it
console.log("Running es6.js");

function createEmail(firstName, lastName, purchasePrice, shippingCost) {
    console.log(
        `Hi ${firstName} ${lastName}. Thank you for buying from us!
            Sub Total: $${purchasePrice}
            Shipping : $${shippingCost}
            Grand Total: $${purchasePrice + shippingCost}
        `
    );
}

createEmail('Joe', 'Furgeson', 125.09, 12.75);

