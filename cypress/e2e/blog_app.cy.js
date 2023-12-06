describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "filip",
      username: "filip",
      password: "1111",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("filip");
      cy.get("#password").type("1111");
      cy.get("#login-button").click();

      cy.contains("filip logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("arina");
      cy.get("#password").type("2005");
      cy.get("#login-button").click();

      cy.contains("wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("filip");
      cy.get("#password").type("1111");
      cy.get("#login-button").click();
      cy.login({ username: "filip", password: "1111" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("NEW BLOG TO TEST");
      cy.get("#author").type("filip");
      cy.get("#url").type("no-url");
      cy.get("#create-blog").click();

      cy.contains("NEW BLOG TO TEST");
    });

    it("confirms users can like a blog", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("NEW BLOG TO TEST");
      cy.get("#author").type("filip");
      cy.get("#url").type("no-url");
      cy.get("#create-blog").click();

      cy.contains("NEW BLOG TO TEST");
      cy.contains("view").click();
      cy.contains("0");
      cy.contains("like").click();
      cy.contains("1");
    });

    it("the user who created a blog can delete it", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("NEW BLOG TO TEST");
      cy.get("#author").type("filip");
      cy.get("#url").type("no-url");
      cy.get("#create-blog").click();

      cy.contains("NEW BLOG TO TEST");
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.on("window:confirm", () => true);
    });
  });
});
