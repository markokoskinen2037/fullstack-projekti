/// <reference types="Cypress" />

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

    it("ei onnistu jos email on virheellinen", function () {
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