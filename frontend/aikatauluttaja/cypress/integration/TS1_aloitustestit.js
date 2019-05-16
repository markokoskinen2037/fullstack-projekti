/// <reference types="Cypress" />


describe('Aloitustoimenpiteet ja tarkistukset', function () {
  it('Sivusto on pystyssä', function () {
    cy.visit("http://localhost:3000/")
  })
  it("Sivusto sisältää oikeita elementtejä", function () {
    cy.contains("Tervetuloa suunnitelemaan opintojasi!")
    cy.contains("Kirjaudu sisään")
    cy.contains("Rekisteröidy")
  })
  it("Alustetaan tietokanta testejä varten", function () {
    cy.task("deleteAllUsers")
    cy.task("deleteAllCourses")
  })
})