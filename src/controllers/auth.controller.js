import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

//Registro
export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    //Validaciones
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The email is already in use"]);

    //Encriptar
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    //Crear y obtener el token
    const token = await createAccessToken({ id: userSaved._id });
    //Guardar token en una cookie
    res.cookie("token", token);
    //Responder al frontend los datos de usuario y el token
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Buscar usuario por email
    const userFound = await User.findOne({ email });

    //Error si no se encuentra el usuario
    if (!userFound) return res.status(400).json({ message: "User not found" });

    //Comparar contraseña guardada con la que pone el usuario
    const isMatch = await bcrypt.compare(password, userFound.password);

    //Si no coincide:
    if (!isMatch) return res.status(400).json({ message: "Icorrect password" });

    //Si coincide:
    //Crear y obtener el token
    const token = await createAccessToken({ id: userFound._id });
    //Guardar token en una cookie
    res.cookie("token", token);
    //Responder al frontend los datos de usuario y el token
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Logout
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

//Ruta protegida
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
  res.send("profile");
};

//Verificar si el usuario existe
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
