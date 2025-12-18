import request from "supertest";
import app from "../src/app";

describe("Auth routes", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = "test-secret";
    process.env.JWT_EXPIRES_IN = "1h";
    process.env.API_VERSION = "v1";
  });

  it("POST /api/v1/auth/login returns token", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "user@example.com", password: "password123" });

    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });

  it("rejects invalid credentials", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "user@example.com", password: "bad" });

    expect(res.status).toBe(401);
  });

  it("protects GET /api/v1/auth/protected", async () => {
    const login = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "user@example.com", password: "password123" });

    const token = login.body.data.token as string;

    const res = await request(app)
      .get("/api/v1/auth/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.user.email).toBe("user@example.com");
  });

  it("returns 401 without token", async () => {
    const res = await request(app).get("/api/v1/auth/protected");
    expect(res.status).toBe(401);
  });
});
