import { createUser, pool } from "../../../src/models/user.model.js";

describe("User Model", () => {
  describe("createUser", () => {
    it("should create a user in the database", async () => {
      const mockUser = {
        nome: "Test User",
        usuario: "testuser",
        senha: "123456",
        usuario_tipo: "A",
      };

      const result = await createUser(
        mockUser.nome,
        mockUser.usuario,
        mockUser.senha,
        mockUser.usuario_tipo
      );

      expect(result).toHaveProperty("insertId");
      expect(typeof result.insertId).toBe("number");
    });
  });

  afterEach(async () => {
    // Truncate the usuarios table after each test
    await pool.query("TRUNCATE TABLE usuarios");
  });
  afterAll(async () => {
    await pool.end();
  });
});
