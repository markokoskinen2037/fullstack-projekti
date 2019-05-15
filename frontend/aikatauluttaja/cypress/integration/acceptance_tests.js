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
  it("Alustetaan tietokanta testejä varten", function(){
    cy.task("deleteAllUsers")
    cy.task("deleteAllCourses")
  })
})

describe("Rekisteröinti", function () {
  it("onnistuu oikeilla tiedoilla", function () {
    cy.visit("http://localhost:3000")
    cy.get("#registerName-simple").type("testi")
    cy.get("#password-simple").type("salasana")
    cy.get("#email-simple").type("testiemail@gmail.com")
    cy.get("#register-button").click()
    cy.contains("Logout").click()
  })

  it("ei onnistu jos salasana on liian lyhyt", function () {
    cy.visit("http://localhost:3000")
    cy.get("#registerName-simple").type("testi")
    cy.get("#password-simple").type("a")
    cy.get("#email-simple").type("testiemail@gmail.com")
    cy.get("#register-button").click()
    cy.contains("Salasanan tulee olla ainakin 5 merkkiä pitkä!")
  })

  it("ei onnistu jos email osoite näyttää virheelliseltä", function () {
    cy.visit("http://localhost:3000")
    cy.get("#registerName-simple").type("testi_teuvo")
    cy.get("#password-simple").type("salasana")
    cy.get("#email-simple").type("testiemail.gmail.com")
    cy.get("#register-button").click()
    cy.contains("Sähköpostiosoitteesi ei kelvannut.")
  })

  it("kirjaa käyttäjän sisään jos hän yrittää rekisteröityä olemassaolevilla tunnuksilla", function () {
    cy.visit("http://localhost:3000")
    cy.get("#registerName-simple").type("testi")
    cy.get("#password-simple").type("salasana")
    cy.get("#email-simple").type("testiemail@gmail.com")
    cy.get("#register-button").click()
    cy.contains("Kirjauduit sisään käyttäjällä: testi")
    cy.contains("Logout").click()
  })


})

describe("Kirjautuminen", function(){
  it("toimii oikealla salasanalla ja käyttäjätunnuksella", function(){
    cy.visit("http://localhost:3000")
    cy.get('input[name="username"]').first().type("testi")
    cy.get("#loginPassword-simple").type("salasana")
    cy.get("#loginButton").click()
    cy.contains("Kirjauduit sisään käyttäjällä: testi")
  })
  it("ei toimi virheellisellä käyttäjätunnuksella", function(){
    cy.visit("http://localhost:3000")
    cy.get('input[name="username"]').first().type("kissa")
    cy.get("#loginPassword-simple").type("salasana")
    cy.get("#loginButton").click()
    cy.contains("Virheellinen käyttäjätunnus tai salasana.")
  })
  it("ei toimi ilman käyttäjätunnusta", function(){
    cy.visit("http://localhost:3000")
    cy.get("#loginPassword-simple").type("salasana")
    cy.get("#loginButton").click()
    cy.contains("Älä jätä mitään kenttää tyhjäksi!")
  })
  it("ei toimi ilman salasanaa", function(){
    cy.visit("http://localhost:3000")
    cy.get('input[name="username"]').first().type("kissa")
    cy.get("#loginButton").click()
    cy.contains("Älä jätä mitään kenttää tyhjäksi!")
  })
  it("ei toimi ilman käyttäjätunnusta ja salasanaa", function(){
    cy.visit("http://localhost:3000")
    cy.get("#loginButton").click()
    cy.contains("Älä jätä mitään kenttää tyhjäksi!")
  })

})

describe("Kurssin lisäys", function(){

  before(function(){
    cy.task("deleteAllCourses")
    cy.visit("http://localhost:3000")
    cy.get('input[name="username"]').first().type("testi")
    cy.get("#loginPassword-simple").type("salasana")
    cy.get("#loginButton").click()
    cy.contains("Kirjauduit sisään käyttäjällä: testi")
  })

  beforeEach(function(){
    cy.log("Clearing input-fields...")
    cy.get('[style="margin-left: 10px;"] > .MuiInput-root-408 > #name-simple').clear()
    cy.get('#length-simple').clear()
    cy.get('#credits-simple').clear()
  })

  it("toimii oikeilla tiedoilla", function(){

      cy.get('[style="margin-left: 10px;"] > .MuiInput-root-408 > #name-simple').type("Ohjelmistojen testaus")
      cy.get('#length-simple').type("1")
      cy.get('#credits-simple').type("5")
      cy.contains('Lisää kurssi').click()
      cy.contains("Ohjelmistojen testaus")
      cy.contains("1 periodia")
      cy.get('.courseContainer').should('have.length', 1)
  })
  it("ei toimi ilman nimeä", function(){
    cy.get('[style="margin-left: 10px;"] > .MuiInput-root-408 > #name-simple').clear()
    cy.get('#length-simple').type("2")
    cy.get('#credits-simple').type("5")
    cy.contains('Lisää kurssi').click()
    cy.get('.courseContainer').should('have.length', 1)
  })
  it("ei toimi jos kurssi kestää yli 4 periodia", function(){
    cy.get('[style="margin-left: 10px;"] > .MuiInput-root-408 > #name-simple').type("Pitkä kurssi")
    cy.get('#length-simple').type("5")
    cy.get('#credits-simple').type("5")
    cy.contains('Lisää kurssi').click()
    cy.get('.courseContainer').should('have.length', 1)
  })
  it("ei toimi jos kurssi kestää 0 periodia", function(){
    cy.get('[style="margin-left: 10px;"] > .MuiInput-root-408 > #name-simple').type("Lyhyt kurssi")
    cy.get('#length-simple').type("0")
    cy.get('#credits-simple').type("5")
    cy.contains('Lisää kurssi').click()
    cy.get('.courseContainer').should('have.length', 1)
  })
  it("ei toimi jos kurssista saa 0 opintopistettä", function(){
    cy.get('[style="margin-left: 10px;"] > .MuiInput-root-408 > #name-simple').type("Perus kurssi")
    cy.get('#length-simple').type("1")
    cy.get('#credits-simple').type("0")
    cy.contains('Lisää kurssi').click()
    cy.get('.courseContainer').should('have.length', 1)
  })
  it("ei toimi jos kurssista saa yli 100 opintopistettä", function(){
    cy.get('[style="margin-left: 10px;"] > .MuiInput-root-408 > #name-simple').type("Perus kurssi")
    cy.get('#length-simple').type("1")
    cy.get('#credits-simple').type("100")
    cy.contains('Lisää kurssi').click()
    cy.get('.courseContainer').should('have.length', 1)
  })
  it("lisää kurssin näytettävään listaan", function(){
    cy.get('[style="margin-left: 10px;"] > .MuiInput-root-408 > #name-simple').type("Tietorakenteet ja Algoritmit")
    cy.get('#length-simple').type("2")
    cy.get('#credits-simple').type("10")
    cy.contains('Lisää kurssi').click()
    cy.contains("Tietorakenteet ja Algoritmit")
    cy.contains("2 periodia")
    cy.get('.courseContainer').should('have.length', 2)
  })
})


// describe("Tyhjennä testitietokanta", function(){
//   it("Poista kaikki userit", function(){
//     cy.task('deleteAllUsers')
//   })
//   it("Poista kaikki kurssit", function(){
//     cy.task("deleteAllCourses")
//   })
// })

//Rekisteröinti ei onnistu virheellisillä tiedoilla
//Jos on jo tunnus/salis yhdistelmä niin kirjataan suoraan sisään.