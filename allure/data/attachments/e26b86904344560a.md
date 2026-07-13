# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/e2ecred.spec.ts >> e2e crud flow test
- Location: tests/api/e2ecred.spec.ts:14:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 503
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | const TOKEN =
  4  |   "22a2c4a87d8c9d4466400a6503338f43b5868f2114fca90f356b4c21280d2047";
  5  | const BASE_URL = "https://gorest.co.in/public/v2/users";
  6  | 
  7  | //common headers:
  8  | const headers = {
  9  |   Authorization: `Bearer ${TOKEN}`,
  10 |   "Content-Type": "application/json",
  11 |   Accept: "application/json",
  12 | };
  13 | 
  14 | test("e2e crud flow test", async ({ request }) => {
  15 |   console.log("===================POST CALL ==============");
  16 | 
  17 |   //step 1 : Create a user:
  18 |   const requestBody = {
  19 |     name: "PW Test User",
  20 |     email: `pwtest${Date.now()}@mail.com`,
  21 |     gender: "female",
  22 |     status: "active",
  23 |   };
  24 | 
  25 |   const responsePOST = await request.post(BASE_URL, {
  26 |     headers,
  27 |     data: requestBody,
  28 |   });
  29 | 
> 30 |   expect(responsePOST.status()).toBe(201);
     |                                 ^ Error: expect(received).toBe(expected) // Object.is equality
  31 |   const createdUser = await responsePOST.json();
  32 |   console.log(createdUser);
  33 |   const userId = createdUser.id;
  34 |   console.log("Created User ID: " + userId);
  35 |   console.log("User is created successfully...");
  36 | 
  37 |   console.log("===================GET CALL ==============");
  38 | 
  39 |   //step 2: Get the same user by using user id = userId
  40 | 
  41 |   const responseGET = await request.get(BASE_URL + "/" + userId, {
  42 |     headers,
  43 |   });
  44 | 
  45 |   expect(responseGET.status()).toBe(200);
  46 |   const data = await responseGET.json();
  47 |   console.log(data);
  48 | 
  49 |   console.log("===================UPDATE CALL ==============");
  50 | 
  51 |   //step 3: Update the same user by using user id = userId
  52 | 
  53 |   const updateBody = {
  54 |     name: "PW Test Automation User",
  55 |     status: "inactive",
  56 |   };
  57 | 
  58 |   const responsePUT = await request.put(`${BASE_URL}/${userId}`, {
  59 |     headers,
  60 |     data: updateBody,
  61 |   });
  62 | 
  63 |   expect(responsePUT.status()).toBe(200);
  64 |   const upddatedData = await responsePUT.json();
  65 |   console.log(upddatedData);
  66 |   console.log("User is updated successfully...");
  67 | 
  68 |   console.log("===================DELETE CALL ==============");
  69 | 
  70 |   //step 4: Delete the same user by using user id = userId
  71 |   const responseDELETE = await request.delete(`${BASE_URL}/${userId}`, {
  72 |     headers,
  73 |   });
  74 |   expect(responseDELETE.status()).toBe(204);
  75 |   console.log("User is deleted successfully...");
  76 | 
  77 |   console.log("===================GET CALL ==============");
  78 | 
  79 |   //step 5: Get the same user by using user id = userId afetr delete the same user
  80 | 
  81 |   const responseGETAfterDelete = await request.get(BASE_URL + "/" + userId, {
  82 |     headers,
  83 |   });
  84 | 
  85 |   expect(responseGETAfterDelete.status()).toBe(404);
  86 |   const dataGET = await responseGETAfterDelete.json();
  87 |   console.log(dataGET);
  88 | });
  89 | 
```