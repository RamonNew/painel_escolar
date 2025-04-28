import { createUser, getUserById, getAllUsers, updateUserById, deleteUserById } from "../../../src/models/user.model.js";
import pool from "../../../src/config/db.js";

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

  describe("getUserById", () => {
    it("should retrieve a user by ID", async () => {
      const mockUser = {
        nome: "GetById User",
        usuario: "getbyiduser",
        senha: "password123",
        usuario_tipo: "A",
      };

      const created = await createUser(
        mockUser.nome,
        mockUser.usuario,
        mockUser.senha,
        mockUser.usuario_tipo
      );

      const retrievedUser = await getUserById(created.insertId);

      expect(retrievedUser).not.toBeNull();
      expect(retrievedUser.nome).toBe(mockUser.nome);
      expect(retrievedUser.usuario).toBe(mockUser.usuario);
    });
  });

  describe("getAllUsers", () => {
    it("should retrieve all users", async () => {
      await createUser("User One", "userone", "pass1", "A");
      await createUser("User Two", "usertwo", "pass2", "A");

      const users = await getAllUsers();

      expect(users.length).toBeGreaterThanOrEqual(2);
      const nomes = users.map((u) => u.nome);
      expect(nomes).toEqual(expect.arrayContaining(["User One", "User Two"]));
    });
  });

  describe("updateUserById", () => {
    it("should update user information", async () => {
      const created = await createUser("Old Name", "olduser", "oldpass", "A");

      await updateUserById(
        created.insertId,
        "New Name",
        "newuser",
        "newpass",
        "U"
      );

      const updatedUser = await getUserById(created.insertId);

      expect(updatedUser.nome).toBe("New Name");
      expect(updatedUser.usuario).toBe("newuser");
      expect(updatedUser.usuario_tipo).toBe("U");
    });
  });

  describe("deleteUserById", () => {
    it("should delete a user by ID", async () => {
      const created = await createUser("Delete User", "deleteuser", "pass", "A");

      const deleteResult = await deleteUserById(created.insertId);

      expect(deleteResult.affectedRows).toBe(1);

      const userAfterDelete = await getUserById(created.insertId);
      expect(userAfterDelete).toBeNull();
    });
  });

  afterEach(async () => {
    // Clean up after each test
    await pool.query("TRUNCATE TABLE usuarios");
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await pool.end();
  });
});
