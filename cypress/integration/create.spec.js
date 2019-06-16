/// <reference types="Cypress" />
import config from '../../cypress.json'
import createIncident from '../fixtures/createIncident.json'

describe('Create Incident Page UI tests', () => {
  beforeEach(() => {
    cy.visit('/create')
  })

  it('Should have create incident element', () => {
    cy.get('[data-testid="create-incident-form"]').within(() => {
      cy.get('h1').should('contain', 'Create New Incident')
      cy.get('select').should('have.length', 2)
      cy.get('input').should('have.length', 2)
    })
  })

  it('Should have a proper navigation', () => {
    cy.get('[data-testid="header-container"]').within(() => {
      cy.get('a').should('have.length', 2)
      cy.contains('Home').click()
      cy.location('href').should('eq', config.baseUrl)
      cy.go('back')
      cy.location('href').should('eq', `${config.baseUrl}create`)
    })
  })

  it('Should create an incident on form valid and submit button click and ', () => {
    cy.get('input[name="btnCreateIncident"]').as('submitBtn')
    // Submit button is disabled on page load
    cy.get('@submitBtn').should('be.disabled')

    cy.get('input[name="title"]').type(createIncident.title)
    cy.get('@submitBtn').should('be.disabled')
    cy.get('select[name="status"]').select(createIncident.status)
    cy.get('@submitBtn').should('be.disabled')

    let assignee
    cy.get('select[name="assignee"]')
      .find('option')
      .then(options => {
        assignee = options.get(1).value
        return options.get(1).setAttribute('selected', 'selected')
      })
      .parent()
      .trigger('change')
    cy.get('@submitBtn').should('be.enabled')

    cy.screenshot('create-incident-button')

    cy.get('@submitBtn').click().then(() => {
      cy.location('href').should('eq', config.baseUrl)
      // Assert create incident props are displayed
      cy.contains(createIncident.title).should('exist')
      cy.contains(createIncident.status).should('exist')
      cy.contains(assignee).should('exist')
    })
  })

  it('Should create an incident on valid form and form submit', () => {
    cy.get('form').submit().then(() => {
      cy.location('href').should('eq', `${config.baseUrl}create`)
    })

    cy.get('input[name="title"]').type(createIncident.title)
    cy.get('form').submit().then(() => {
      cy.location('href').should('eq', `${config.baseUrl}create`)
    })

    cy.get('select[name="status"]').select(createIncident.status)
    cy.get('form').submit().then(() => {
      cy.location('href').should('eq', `${config.baseUrl}create`)
    })

    let assignee
    cy.get('select[name="assignee"]')
      .find('option')
      .then(options => {
        assignee = options.get(1).value
        return options.get(1).setAttribute('selected', 'selected')
      })
      .parent()
      .trigger('change')

      cy.screenshot('create-incident-form')

      cy.get('form').submit().then(() => {
        cy.location('href').should('eq', config.baseUrl)
        // Assert create incident props are displayed
        cy.contains(createIncident.title).should('exist')
        cy.contains(createIncident.status).should('exist')
        cy.contains(assignee).should('exist')
      })
  })
})
