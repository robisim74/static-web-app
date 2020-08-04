/// <reference types="cypress" />

describe('Styles', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('home colours', () => {
        cy.get('body')
            .should('have.css', 'background-color', 'rgb(21, 32, 40)')
        cy.get('.no-select')
            .should('have.css', 'user-select', 'none')
    })
})
