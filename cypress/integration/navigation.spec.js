/// <reference types="cypress" />

describe('Navigation', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('is home', () => {
        cy.get('h1').should('contain', 'Site starter')
        cy.location('pathname').should('be', '/')
    })

    it('open about page', () => {
        cy.get('a').contains('About').click()
        cy.location('pathname', { timeout: 10000 }).should('contain', '/about')
        cy.get('h1').should('contain', 'About')
    })
})
