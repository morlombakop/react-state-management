/// <reference types="Cypress" />
import config from '../../cypress.json'

describe('Home page UI tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should have title and root element', () => {
    cy.title().should('eq', 'React State Management')
    cy.root().should('match', 'html')
  })

  it('Should have incidents content', () => {
    cy.get('[data-testid="home-container"]').within(() => {
      cy.get('h1').should('contain', 'Incident Lists')
      cy.get('[data-testid="incident-container"]').should('have.length', 2)
    })
  })

  it('Should have a proper navigation', () => {
    cy.get('[data-testid="header-container"]').within(() => {
      cy.get('a').should('have.length', 2)
      cy.contains('Create').click()
      cy.location('pathname').should('include', 'create')
      cy.go('back')
      cy.location('pathname').should('not.include', 'create')
      cy.location('href').should('eq', config.baseUrl)
    })
  })

  it('Body should have proper styles', () => {
    cy.get('body')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(235, 235, 235)')
    cy.get('body').should('have.css', 'font-size', '16px')
    cy.get('body').should('have.css', 'color', 'rgb(68, 68, 68)')
    cy.get('body').should('have.css', 'font-family', 'Helvetica, Arial, sans-serif')

    cy.document()
      .then(doc => doc.documentElement.getBoundingClientRect())
      .then(clientRec => {
        const { height, width } = clientRec
        cy.get('body').should('have.css', 'height', `${height}px`)
        cy.get('body').should('have.css', 'width', `${width}px`)
      })
  })

  it('Wrapper css class should provide proper styles', () => {
    cy.get('.wrapper').should('have.css', 'max-width', '800px')
    cy.get('.wrapper').should('have.css', 'display', 'block')
    cy.get('.wrapper').should('have.css', 'background-color', 'rgb(255, 255, 255)')
  })
})
