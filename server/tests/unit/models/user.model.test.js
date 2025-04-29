import {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUsers,
} from "../../../src/models/user.model.js";
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

      const result = await createUser(mockUser);

      expect(result).toHaveProperty("usuario_id");
      expect(typeof result.usuario_id).toBe("number");
      expect(result.nome).toBe(mockUser.nome);
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

      const created = await createUser(mockUser);

      const retrievedUser = await getUserById(created.usuario_id);

      expect(retrievedUser).not.toBeNull();
      expect(retrievedUser.nome).toBe(mockUser.nome);
      expect(retrievedUser.usuario).toBe(mockUser.usuario);
    });
  });

  describe("getUsers", () => {
    it("should retrieve all users", async () => {
      await createUser({
        nome: "User One",
        usuario: "userone",
        senha: "pass1",
        usuario_tipo: "A",
      });
      await createUser({
        nome: "User Two",
        usuario: "usertwo",
        senha: "pass2",
        usuario_tipo: "A",
      });

      const users = await getUsers();

      expect(users.length).toBeGreaterThanOrEqual(2);
      const nomes = users.map((u) => u.nome);
      expect(nomes).toEqual(expect.arrayContaining(["User One", "User Two"]));
    });
  });

  describe("updateUserById", () => {
    it("should update user information", async () => {
      const created = await createUser({
        nome: "Old Name",
        usuario: "olduser",
        senha: "oldpass",
        usuario_tipo: "A",
      });

      await updateUserById(
        created.usuario_id,
        "New Name",
        "newuser",
        "newpass",
        "U"
      );

      const updatedUser = await getUserById(created.usuario_id);

      expect(updatedUser.nome).toBe("New Name");
      expect(updatedUser.usuario).toBe("newuser");
      expect(updatedUser.usuario_tipo).toBe("U");
    });
  });

  describe("deleteUserById", () => {
    it("should delete a user by ID", async () => {
      const created = await createUser({
        nome: "Delete User",
        usuario: "deleteuser",
        senha: "pass",
        usuario_tipo: "A",
      });

      const deleteResult = await deleteUserById(created.usuario_id);

      expect(deleteResult.affectedRows).toBe(1);

      const userAfterDelete = await getUserById(created.usuario_id);
      expect(userAfterDelete).toBeNull();
    });
  });

  // afterEach(async () => {
  //   await pool.query("TRUNCATE TABLE usuarios");
  // });

  beforeEach(async () => {
    await pool.query("TRUNCATE TABLE usuarios");
  });

  afterAll(async () => {
    await pool.end();
  });
});
