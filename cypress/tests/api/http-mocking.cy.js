describe('HTTP request / response mock test', () => {
    it('HTTP response mock test', () => {
        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
        //Mocking api response
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
            {
                statusCode: 200,
                body: [{
                    "book_name": "RestAssured with Java",
                    "isbn": "RSU",
                    "aisle": "2301"
                }]
            }).as('booksData')

        cy.get("button[class='btn btn-primary']").click()
        cy.wait('@booksData').then(({ request, response }) => {
            cy.get('tr').should('have.length', response.body.length + 1)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available');
    })

    it('HTTP request mock test', () => {
        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
        //Mocking api response
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {
            req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=riyas',
                req.continue((res) => {
                    expect(res.statusCode).to.equal(404)
                })
        }).as('securityTest')
        cy.get("button[class='btn btn-primary']").click()
        cy.wait('@securityTest').then(({ request, response }) => {
            cy.log(request.url)
            cy.log(response.statusCode)
        })
    })

})