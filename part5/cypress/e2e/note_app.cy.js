describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://pureryzen.io:1234/api/testing/reset");

    const user = {
      name: "Kamen Rider Faiz",
      username: "faiz",
      password: "555",
    };

    cy.request("POST", "http://pureryzen.io:1234/api/users/", user);
    cy.visit("http://pureryzen.io:1234");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2022"
    );
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("faiz");
    cy.get("#password").type("555");
    cy.get("#login-button").click();

    cy.contains("Kamen Rider Faiz logged-in");
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("faiz");
    cy.get("#password").type("913");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Kamen Rider Faiz logged-in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "faiz", password: "555" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({ content: "another note cypress", important: false });
      });

      it.only("it can be made important", function () {
        cy.contains("another note cypress").contains("make important").click();

        cy.contains("another note cypress").contains("make not important");
      });
    });
  });
});
