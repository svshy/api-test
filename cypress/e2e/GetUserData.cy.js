/// <reference types="cypress" />

describe("Get User Data from GitHub API", () => {
  let responseData;
  const login = "octocat";
  const userId = 583231;
  const userName = "The Octocat";
  //Required properties in response based on schema from https://docs.github.com/en/rest/users/users#get-a-user
  const requiredPropertiesInResponseBody = [
    "avatar_url",
    "events_url",
    "followers_url",
    "following_url",
    "gists_url",
    "gravatar_id",
    "html_url",
    "id",
    "node_id",
    "login",
    "organizations_url",
    "received_events_url",
    "repos_url",
    "site_admin",
    "starred_url",
    "subscriptions_url",
    "type",
    "url",
    "bio",
    "blog",
    "company",
    "email",
    "followers",
    "following",
    "hireable",
    "location",
    "name",
    "public_gists",
    "public_repos",
    "created_at",
    "updated_at",
  ];

  before(() => {
    cy.request(`/users/${login}`).then((response) => (responseData = response));
  });

  it(`Status code should be 200, and resposne header should be "application/json"`, () => {
    expect(responseData.status).to.eq(200);
    expect(responseData.headers["content-type"]).to.include("application/json");
  });

  it(`Verify all required properties exists in response body`, () => {
    requiredPropertiesInResponseBody.forEach((property) => {
      expect(responseData.body).to.have.property(property);
    });
  });

  it(`Examples of test data type of the response`, () => {
    expect(responseData.body).to.be.a("object");
    expect(responseData.body.login).to.be.a("string");
    expect(responseData.body.id).to.be.a("number");
  });

  it(`User is The Octocat`, () => {
    expect(responseData.body.login).to.eq(login);
    expect(responseData.body.id).to.eq(userId);
    expect(responseData.body.name).to.eq(userName);
  });
});
