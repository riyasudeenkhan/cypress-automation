import 'cypress-iframe'

let testData

describe('Practice all the automation concepts', () => {
    before(function () {
        cy.fixture('example').then(function (data) {
            testData = data
        })
    })

    it('Handle checkboxes', function () {
        cy.visit(testData.practice_url)
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        
        //Select multiple checkboxes
        cy.get('input[type="checkbox"]').check(['option2', 'option3']).should('be.checked')

        //Select radio button same as checkbox
        cy.get('[value="radio2"]').check().should('have.value', 'radio2')
    })

    it('Handle dropdowns', function () {
        cy.visit(testData.practice_url)
        //Static dropdown
        cy.get('select').select('option2').should('have.value', 'option2')

        //Dynamic dropdown
        cy.get('#autocomplete').type('Ind')

        cy.get('.ui-menu-item div').each(($el) => {
            if ($el.text() == 'Indonesia') {
                cy.wrap($el).click();
            }
        })

        cy.get('#autocomplete').should('have.value', 'Indonesia')
    })

    it('Handle visible and invisible elements', function () {
        cy.visit(testData.practice_url)
        cy.get('#displayed-text').as('text-element')
        cy.get('@text-element').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('@text-element').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('@text-element').should('be.visible')
    })

    it('Handle popup and alert', function () {
        cy.visit(testData.practice_url)

        cy.get('#alertbtn').click() //cypress automatically handle alert popup
        //Verify alert text
        cy.on('window:alert', (str) => {
            //Mocha
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })

        cy.get('#confirmbtn').click() //cypress automatically handle cofirm popup
        //Verify alert text
        cy.on('window:confirm', (str) => {
            //Mocha
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
            return false    // if return true it will simply confirm popup, if false then simulate cancel action in the popup
        })
    })

    it('Handling child tab', function () {
        cy.visit(testData.practice_url)

        cy.get('#opentab').invoke('removeAttr', 'target').click()
        cy.origin("https://www.qaclickacademy.com", () => {
            cy.get('#navbarSupportedContent a[href*="contactus"]').click()
            cy.get('.page-banner-cont h2').should('contain', 'Contact')
        })

    })

    it('Handling child window', function () {

        cy.visit(testData.practice_url);

        cy.get("#openwindow").then((el) => {
            const url = 'https://www.qaclickacademy.com'
            cy.visit(url)
            cy.origin(url, () => {
                cy.get('#navbarSupportedContent a[href*="contactus"]').click()
                cy.get('.page-banner-cont h2').should('contain', 'Contact')
            })
        })

    })

    it('Handles child window using cross origin navigation', function () {
        cy.visit(testData.practice_url);

        // Stub window.open to capture the new URL
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen');
        });

        cy.get('#openwindow').click();

        cy.get('@windowOpen').should('have.been.called').then((stub) => {
            const newUrl = stub.getCall(0).args[0];

            // Extract the origin from the URL
            const { origin } = new URL(newUrl);
            cy.log('url ==> ', origin)

            // Switch to that origin using cy.origin
            // url is hardcoded since the parced (origin) url have security issue due to http not https
            cy.origin('https://www.qaclickacademy.com', () => {
                cy.visit('/'); // visit relative path (because we’re inside origin block)

                // Now safely interact with elements from the new origin
                cy.url().should('include', 'qaclickacademy');
                cy.get('h2').should('contain.text', 'Best platform to learn Software and Automation Testing');
            });
        });
    });

    it('Handling table content', function () {
        cy.visit(testData.practice_url)
        cy.get('.table-display td:nth-child(2)').each(($el, index) => {
            let data = $el.text()
            if (data.includes('Python')) {
                cy.get('.table-display td:nth-child(2)').eq(index).next()
                    .then((price) => {
                        const value = price.text()
                        expect(value).to.equal('25')
                    })
            }
        })
    })

    it('Handling mouse hover as its not supported', function () {
        cy.visit(testData.practice_url)
        cy.get('.mouse-hover-content').invoke('show') //This is the jquery approach to make invisible element to visible
        cy.get('[href="#top"]').click()
        cy.url().should('include', 'top')
        cy.go('back')

        cy.get('[href="#top"]').click({ force: true })    // This will force to click invisible element
        cy.url().should('include', 'top')
    })

    it('Handling iframe', function () {
        cy.visit(testData.practice_url)
        cy.frameLoaded('#courses-iframe')
        cy.iframe().find('a[href*="mentorship"]').eq(0).click()
        cy.iframe().find('h1[class*="pricing-title"]').should('have.length', 2)
    })

    it('Handling Calender', function () {
        const date = "25"
        const month = "5"
        const year = "2027"
        const dateArray = [month, date, year]
        cy.visit(`${testData.ecart_url}#/offers`)
        cy.get('.react-date-picker__inputGroup').click()
        cy.get('.react-calendar__navigation__label').click()
        cy.get('.react-calendar__navigation__label').click()
        cy.contains('button.react-calendar__tile', year).click()
        cy.get('abbr').eq(Number(month) - 1).click()
        cy.contains('abbr', date).click()

        //Assert the selected data is correct
        cy.get('.react-date-picker__inputGroup__input').each(($el, index) => {
            let value = $el.prop('value')
            cy.log(value)
            expect(value).to.equal(dateArray[index])
        })

    })


})