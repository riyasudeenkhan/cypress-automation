class CartPage {
    confirmLandingCartPage() {
        cy.contains('Shop Name').should('be.visible')
    }

    selectTheProduct(productName) {
        cy.get('app-card').each($el => {
            let product = $el.find('h4 a').text()
            cy.log(product)
            if (product.includes(productName)) {
                cy.wrap($el).find('button').click()
            }
        })
    }

    selectFirstProduct() {
        cy.get('app-card button').eq(0).click()
    }

    getCartItemsCount() {
        return cy.get('#navbarResponsive a')
            .invoke('text')
            .then((text) => {
                const addedItems = Number(text.match(/\d+/)[0]);
                cy.log(`Number of items added in the cart: ${addedItems}`);
                return cy.wrap(addedItems);
            });
    }

    checkoutCart() {
        cy.contains('Checkout').click()
    }
}
export default CartPage