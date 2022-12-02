describe("Note app", function () {
  it("front page can be opened", function () {
    cy.visit("http://pureryzen.io:1234");
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2022"
    );
  });
});
