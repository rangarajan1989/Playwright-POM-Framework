import { test, expect } from "../../fixtures/ApiFixture";

const TOKEN = process.env.TOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

let userId: number;

test("GET API -- get all users", async ({ apiHelper }) => {
  let userResponse = await createUser(apiHelper);

  //get the user:
  let response = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(response.status).toBe(200);
  expect(response.body.name).toBe("Raghu API");
});

async function createUser(apiHelper: any) {
  let userData = {
    name: "Raghu API",
    email: `automation_${Date.now()}@open.com`,
    gender: "male",
    status: "active",
  };

  let response = await apiHelper.post(
    "/public/v2/users",
    userData,
    AUTH_HEADER,
  );
  expect(response.status).toBe(201);

  return response.body;
}
