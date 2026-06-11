import express from "express";

import {
  createMember,
  getMembers,
  updateMember,
  deleteMember,
  getMemberById,
} from "./member.controller.js";

const router = express.Router();

router.post("/", createMember);

router.get("/", getMembers);

router.get("/:id", getMemberById);

router.put("/:id", updateMember);

router.delete("/:id", deleteMember);

export default router;