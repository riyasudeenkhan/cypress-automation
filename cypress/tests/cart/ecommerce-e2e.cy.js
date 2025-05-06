import LoginPage from "../../support/page-objects/logic-page"
import CartPage from "../../support/page-objects/cart-page"
import Checkout from "../../support/page-objects/checkout-page"
import Purchase from "../../support/page-objects/purchase-page"

let testData
let loginPage = new LoginPage()
let cartPage = new CartPage()
let checkout = new Checkout()
let purchase = new Purchase()
describe('Automate end to end ecommerce flow', () => {
    before(function () {
        Cypress.config('defaultCommandTimeout', 6000);
        cy.fixture('example').then(function (data) {
            testData = data
        })
    })

    it('Add product to cart and checkout', function () {
        loginPage.gotoLoginPage(testData.ecommerce_url)
        loginPage.userLogin(testData.username, testData.password)
        cartPage.confirmLandingCartPage()
        cartPage.selectTheProduct('Samsung Note')
        cartPage.selectFirstProduct()
        cartPage.getCartItemsCount().then((count) => {
            expect(count).to.equal(2);
        })
        cartPage.checkoutCart()

        //checkout page
        checkout.clickCheckout()
        //purchase page
        purchase.selectCountry('India')
        purchase.placeOrder()
        purchase.confirmOrder().should('contain', 'Success')
    })

})