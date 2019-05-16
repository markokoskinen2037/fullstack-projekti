/// <reference types="Cypress" />

describe("Kirjautuminen", function () {
    it("toimii oikealla salasanalla ja käyttäjätunnuksella", function () {
        cy.visit("http://localhost:3000")
        cy.get('input[name="username"]').first().type("testi")
        cy.get("#loginPassword-simple").type("salasana")
        cy.get("#loginButton").click()
        cy.contains("Kirjauduit sisään käyttäjällä: testi")
    })
    it("ei toimi virheellisellä käyttäjätunnuksella", function () {
        cy.visit("http://localhost:3000")
        cy.get('input[name="username"]').first().type("kissa")
        cy.get("#loginPassword-simple").type("salasana")
        cy.get("#loginButton").click()
        cy.contains("Virheellinen käyttäjätunnus tai salasana.")
    })
    it("ei toimi ilman käyttäjätunnusta", function () {
        cy.visit("http://localhost:3000")
        cy.get("#loginPassword-simple").type("salasana")
        cy.get("#loginButton").click()
        cy.contains("Älä jätä mitään kenttää tyhjäksi!")
    })
    it("ei toimi ilman salasanaa", function () {
        cy.visit("http://localhost:3000")
        cy.get('input[name="username"]').first().type("kissa")
        cy.get("#loginButton").click()
        cy.contains("Älä jätä mitään kenttää tyhjäksi!")
    })
    it("ei toimi ilman käyttäjätunnusta ja salasanaa", function () {
        cy.visit("http://localhost:3000")
        cy.get("#loginButton").click()
        cy.contains("Älä jätä mitään kenttää tyhjäksi!")
    })

})