class LoginPage {
    gotoLoginPage(url) {
        cy.visit(url)
    }

    userLogin(username, password) {
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.contains('Sign In').click()        
    }

}
export default LoginPage