import express from "express";

import {
  createMembership,
  getMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
  renewMembership,
  upgradeMembership,
} from "./membership.controller.js";

const router = express.Router();

router.post("/", createMembership);

router.get("/", getMemberships);

router.get("/:id", getMembershipById);

router.put("/:id/renew", renewMembership);

router.put("/:id/upgrade", upgradeMembership);

router.put("/:id", updateMembership);

router.delete("/:id", deleteMembership);

export default router;