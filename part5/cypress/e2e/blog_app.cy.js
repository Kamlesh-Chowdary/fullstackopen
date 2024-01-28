describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "kamlesh",
      username: "kamlesh",
      password: "kamlesh",
    };

    const usertwo = {
      name: "two",
      username: "testusertwo",
      password: "numbertwo",
    };

    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.request("POST", "http://localhost:3003/api/users/", usertwo);
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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("kamlesh");
      cy.get("#password").type("kamlesh");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("yusuff Desai");
      cy.get("#author").type("Desai Foundation");
      cy.get("#url").type("www.desaiFoundation.com");
      cy.get("#likes").type("900");
      cy.contains("create").click();
      cy.contains("yusuff Desai ===> Desai Foundation ");
    });
  });
  describe("and a blog exists", function () {
    beforeEach(function () {
      cy.get("#username").type("kamlesh");
      cy.get("#password").type("kamlesh");
      cy.get("#login-button").click();
      cy.contains("new blog").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("http://testurl.com");
      cy.contains("create").click();
      cy.contains("test title ===> test author");
    });

    it("user can add likes", function () {
      cy.contains("view").click();
      cy.contains("0").contains("likes");
      cy.get("#like").click();

      cy.contains("1");
    });
    it("user can delete their blogs", function () {
      cy.contains("view").click();
      cy.get("#delete-button").click();
      cy.on("window:confirm", () => true);
      cy.contains("delete").should("not.exist");
    });
  });

  describe("when there are more than one users", function () {
    beforeEach(function () {
      cy.get("#username").type("testusertwo");
      cy.get("#password").type("numbertwo");
      cy.get("#login-button").click();
      cy.contains("two Logged in");
    });

    it("only user who created the blog can delete it", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("test title two");
      cy.get("#author").type("test author two");
      cy.get("#url").type("http://testurltwo.com");
      cy.contains("create").click({ force: true });
      cy.contains("test title two ===> test author two");

      cy.contains("logout").click();
      cy.get("#username").type("kamlesh");
      cy.get("#password").type("kamlesh");
      cy.get("#login-button").click();
      cy.contains("kamlesh Logged in");

      cy.contains("view").click();
      cy.contains("delete").should("not.exist");
    });
  });
});
