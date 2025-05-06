//Cypress Tests

describe('Shopping cart test suite', () => {
    it('Verify number of matching products', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.get('.product:visible').should('have.length', 4)
        cy.get('.search-keyword').clear()
    })

    it('Add any product to cart', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.get('.products').find('.product').eq(1).contains('ADD TO CART').click()
        cy.get(':nth-child(1) > :nth-child(3) > strong').contains('1')
        cy.wait(2000)
        cy.get(':nth-child(1) > :nth-child(3) > strong').should('contain.text', '1')
    })

    it('Add specific product to cart', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('.search-keyword').type('Ca')
        cy.get('.products .product:visible').each(($el) => {
            let productName = $el.find('h4.product-name:visible').text()
            cy.log('Current product = ', productName)
            if (productName.includes('Cashews')) {
                cy.log('Matched product = ', productName)
                cy.wrap($el).find('button').click()
            }
        });
    });

    it('Add specific product to cart and break the loop', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('.search-keyword').type('Ca');

        cy.get('.products .product').then(($products) => {
            Cypress._.some($products, (el) => {
                const $el = Cypress.$(el); // raw jQuery element
                const productName = $el.find('h4.product-name').text().trim();

                if (productName.includes('Carrot')) {
                    cy.wrap($el).find('button').click();
                    return true; // this breaks the loop
                }

                return false;
            });
        });
    });

    it('Add multiple products to the cart', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        const sel_products = ['Carrot', 'Capsicum', 'Cucumber'];

        cy.get('.products .product:visible').each(($product, index) => {
            // Fetch product name using Cypress command chain
            cy.get('.products .product:visible').eq(index).find('h4.product-name')
                .invoke('text')
                .then((text) => {
                    const trimmed = text.split('-')[0].trim();
                    cy.log('Checking product:', trimmed);

                    if (sel_products.includes(trimmed)) {
                        cy.log('✅ Adding to cart:', trimmed);
                        // re-fetch product again freshly
                        cy.get('.products .product:visible').eq(index).find('button')
                            .should('be.visible')
                            .click();
                    }
                });
        });
    });

    it('Add product to cart and place the order', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('.search-keyword').type('Cu')
        cy.get('.products .product:visible').each(($el) => {
            let productName = $el.find('h4.product-name:visible').text()
            if (productName.includes('Cucumber')) {
                cy.log('Matched product = ', productName)
                cy.wrap($el).find('button').click()
            }
        });
        //Goto Cart
        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()
        cy.get('button').should('have.text', 'Proceed')
    });
})  