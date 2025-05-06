describe('APT Tests', () => {
    it('GET request', () => {
        cy.request('GET', 'https://reqres.in/api/users?page=2').should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.data).to.have.length.greaterThan(0)
            expect(response.body.page).to.eq(2)
        })
    })

    it('POST request', () => {
        cy.request({
            method: 'POST',
            url: "https://reqres.in/api/users",
            headers: { 'x-api-key': Cypress.env('apiKey') },
            body: {
                name: "morpheus",
                job: "leader",
            }
        }).should((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.include.keys('id', 'createdAt')
        })
    })

    it("PUT request", () => {
        cy.request({
            method: 'PUT',
            url: "https://reqres.in/api/users/2",
            headers: { 'x-api-key': Cypress.env('apiKey') },
            body: {
                name: "QAAutomationLabs",
                job: "QA Automation Engg"
            }
        }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.equal('QAAutomationLabs')
        });
    });

    it("DELETE request", () => {
        cy.request({
            method: 'DELETE',
            url: "https://reqres.in/api/users/2",
            headers: { 'x-api-key': Cypress.env('apiKey') }
        }).should((response) => {
            expect(response.status).to.eq(204);
        });
    });
})