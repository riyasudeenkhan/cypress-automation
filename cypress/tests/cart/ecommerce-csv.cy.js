import neatCSV from 'neat-csv'

let prodName
let orderId

describe(`Automate CSV data validation flow`, () => {
    it('Place the order and validate order details', () => {
        cy.LoginAPI().then(function () {
            cy.visit('https://rahulshettyacademy.com/client/', {
                onBeforeLoad: function (window) {
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
        })

        cy.contains('Sign Out').should('be.visible')
        cy.get('.card-body button:last-of-type').eq(1).click()
        cy.get('.card-body h5').eq(1).then(element => {
            prodName = element.text()
        })
        cy.get("[routerlink*='cart']").click()
        cy.contains('Checkout').click()
        cy.get('[placeholder="Select Country"]').type('ind')
        cy.get('.ta-results button').each(($el) => {
            if ($el.text() === (' India')) {
                cy.wrap($el).click()
            }
        })
        cy.get('.btnn').click()
        cy.contains(' | ').then(ele => {
            cy.log(ele.text())
            orderId = ele.text().split(' ')[2]
            cy.log('orderId = ' + orderId)
        })
        // Click download CSV button
        cy.contains('CSV').click()
        // Read CSV file and convert into JSON
        cy.readFile("./cypress/downloads/order-invoice_riyas.csv").then(async (text) => {
            let jsonData = await neatCSV(text)
            const actualProductCSV = jsonData[0]["Product Name"]
            const actualOrderIdCSV = jsonData[0]['Invoice Number']
            expect(prodName).to.equal(actualProductCSV)
            expect(orderId).to.equal(actualOrderIdCSV)
        })
    })
})