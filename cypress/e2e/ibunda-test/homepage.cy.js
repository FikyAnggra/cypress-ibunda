describe('Homepage', () => {
    beforeEach( ()=> {
        cy.visit('http://127.0.0.1:8000/')
    })

    it('i can click text Logo Multiple System crud', () => {
        cy.get('#header-logo').click().should('contain.text', 'Multiple system crud')
    })

    it('i can goto homepage at header menu all', () => {
        cy.get('#header-all').click()
        cy.get('#header-logo').click().should('contain.text', 'Multiple system crud')
    })

    it('i can go to student page at header menu studens', () => {
        cy.get('#header-student').click()
        cy.get('h3').should('contain.text', 'Students crud Program')
    })

    it('i can go to employe page at header menu employes', () => {
        cy.get('#header-employe').click()
        cy.get('h3').should('contain.text', 'Employes crud Program')
    })

    it('i can go to product page at header menu products', () => {
        cy.get('#header-product').click()
        cy.get('h3').should('contain.text', 'Products crud Program')
    })

    it('i can go to student page at button student CRUD', () => {
        cy.get('#btn-student-homepage').click()
        cy.get('h3').should('contain.text', 'Students crud Program')
    })

    it('as a user, i can go to product page at button product crud', () => {
        cy.get('#btn-product-homepage').click()
        cy.get('h3').should('contain.text', 'Products crud Program')
    })

    it('i can go to employe page at button employes crud', () => {
        cy.get('#btn-employe-homepage').click()
        cy.get('h3').should('contain.text', 'Employes crud Program')
    })

    
})