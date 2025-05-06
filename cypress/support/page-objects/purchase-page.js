class Purchase {
    selectCountry(countryName) {
        cy.get('#country').type(countryName)
        cy.get('.suggestions a').each(($el, index) => {
            let text = $el.text()
            cy.log(text)
            if (text.includes(countryName)) {
                cy.get('.suggestions a').eq(index).click()
            }
        })
    }

    placeOrder() {
        cy.get('[type="submit"]').click()
    }

    confirmOrder() {
        return cy.get('strong')
    }
}
export default Purchase