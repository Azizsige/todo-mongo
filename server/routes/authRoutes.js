// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const passport = require("passport");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    // Validasi field harus diisi
    body("username").notEmpty().withMessage("Username harus diisi"),
    body("email").notEmpty().withMessage("Email harus diisi"),
    body("password").notEmpty().withMessage("Password harus diisi"),
    // Validasi panjang minimal 6 karakter untuk password
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password minimal 6 karakter"),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Konfirmasi password harus diisi"),
    // Validasi konfirmasi password
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Konfirmasi password tidak cocok");
      }
      return true;
    }),
  ],
  authController.register
);
router.post(
  "/login",
  [
    // Validasi field harus diisi
    body("email").notEmpty().withMessage("Email harus diisi"),
    body("password").notEmpty().withMessage("Password harus diisi"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password minimal 6 karakter"),
  ],
  authController.login
);
router.post("/logout", authMiddleware.authenticateToken, authController.logout);

module.exports = router;
