describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const newUser = {
      username: "kamlesh",
      name: "kamlesh",
      password: "kamlesh",
    };
    cy.request("POST", "http://localhost:3003/api/users", newUser);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("login");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("kamlesh");
      cy.get("#password").type("kamlesh");
      cy.get("#login-button").click();
      cy.contains("kamlesh Logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("kash");
      cy.get("#password").type("lesh");
      cy.get("#login-button").click();
      cy.get(".error").should("contain", "invalid username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get(".error").should("have.css", "border-style", "solid");
    });
  });
});
