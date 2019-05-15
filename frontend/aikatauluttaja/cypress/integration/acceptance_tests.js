/// <reference types="Cypress" />

describe('Aloitustestit', function() {
    it('Sivusto on pystyssä', function() {
      cy.visit("http://localhost:3000/")
    })
    it("Sivusto sisältää oikeita elementtejä", function() {
        cy.contains("Tervetuloa suunnitelemaan opintojasi!")
        cy.contains("Kirjaudu sisään")
        cy.contains("Rekisteröidy")
    })
  })

describe("Rekisteröintitestit", function(){
    it("Rekisteröinti onnistuu oikeilla tiedoilla", function(){
        cy.visit("http://localhost:3000")
        cy.get("#registerName-simple").type("testi")
        cy.get("#password-simple").type("salasana")
        cy.get("#email-simple").type("testiemail@gmail.com")
        cy.get("#register-button").click()
    })
})

describe("Tyhjennä testitietokanta", function(){
  it("Poista kaikki userit", function(){
    cy.task('deleteAllUsers')
  })
  it("Poista kaikki kurssit", function(){
    cy.task("deleteAllCourses")
  })
})

//Rekisteröinti ei onnistu virheellisillä tiedoilla
//Jos on jo tunnus/salis yhdistelmä niin kirjataan suoraan sisään.