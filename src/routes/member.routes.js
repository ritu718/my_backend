import express from "express";

import {
  createMember,
  getMembers,
  updateMember,
  deleteMember,
} from "../controllers/member.controller.js";

const router = express.Router();

router.post("/create", createMember);

router.get("/", getMembers);
router.delete("/:id", deleteMember);
router.put("/:id", updateMember);
router.patch("/:id", updateMember);
export default router;