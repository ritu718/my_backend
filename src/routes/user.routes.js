import express from "express";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", protect, async (req, res) => {

  res.status(200).json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });

});

export default router;