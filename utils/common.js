const moltin = require('@moltin/sdk');

const Moltin = moltin.gateway({
    client_id: "Jq5siKRdEn7jW1kOirUb9BtNtrqfeoDRdg0OYMOlaj",
    client_secret: "XEiYvr5iInHbA3hmoYKWlYvjqloEPbNDpooovvzahb"
});

//generate random cart at express re-start just for simulation
const cart_random = Math.floor(Math.random() * (1000 - 1) + 1)

function Products() {
    /* just an empty object */
    var that = this
    this.get_products = function () {
        return Moltin.Products.All().then(product => { that.product = product; return that.product })
    }

    this.add_to_cart = function (product_id) {
        //setting quantity & cart id  always one for simple setup
        console.log("trying to add ...", product_id)
        console.log('random cart is ', cart_random)
        return Moltin.Cart(cart_random).AddProduct(product_id, 1).then((item) => { return item })
    }

    this.get_cart = function () {
        return Moltin.Cart(cart_random).Items().then((cart) => { return cart })
    }

    this.checkout = function () {
        return Moltin.Cart(cart_random).Checkout(
            customer = {
                name: 'test',
                email: 'test@test.com'
            },
            billing_address = {
                first_name: 'John',
                last_name: 'Doe',
                line_1: '123 Sunny Street',
                line_2: 'Sunnycreek',
                county: 'California',
                postcode: 'CA94040',
                country: 'US'
            },
            shipping_address = {
                first_name: 'Jon',
                last_name: 'Doe',
                line_1: '123 Sunny Street',
                line_2: 'Sunnycreek',
                county: 'California',
                postcode: 'CA94040',
                country: 'US'
            }
        ).then((checkout) => { console.log("checkout done..", checkout); return checkout })
        .catch((err) => {  console.log("err in checkout..", err); return null})
    }
}

module.exports = Products