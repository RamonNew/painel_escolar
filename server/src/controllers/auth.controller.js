import { loginUserWithUsuarioAndPassword } from "../services/auth.service.js";
import { generateAuthTokens } from "../services/token.service.js";
import { catchAsync } from "../utils/catchAsync.js";

export const login = catchAsync(async (req, res) => {
    const { login, senha } = req.body;
    const user = await loginUserWithUsuarioAndPassword(login, senha);
    const tokens = await generateAuthTokens(user);
    res.send({ user, tokens });
  });