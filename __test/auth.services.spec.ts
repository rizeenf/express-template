import { AuthService } from "../src/api/service/auth.service";

describe("AuthService", () => {
  const service = new AuthService();

  beforeAll(() => {
    process.env.JWT_SECRET = "test-secret";
    process.env.JWT_EXPIRES_IN = "1h";
  });

  it("returns token on valid login", () => {
    const { token } = service.login("user@example.com", "password123");
    expect(token).toBeTruthy();
  });

  it("throws on missing credentials", () => {
    expect(() => service.login(undefined, "password123")).toThrow(
      "Email and password are required"
    );
  });

  it("throws on invalid password", () => {
    expect(() => service.login("user@example.com", "wrong")).toThrow(
      "Invalid credentials"
    );
  });
});
