import {
  createMembershipService,
  getMembershipsService,
  getMembershipByIdService,
  updateMembershipService,
  deleteMembershipService,
  renewMembershipService,
  upgradeMembershipService,
} from "./membership.service.js";

export const createMembership = async (req, res) => {
  try {
    const membership = await createMembershipService(req.body);

    return res.status(201).json({
      success: true,
      message: "Membership created successfully",
      data: membership,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMemberships = async (req, res) => {
  try {

    const memberships =
      await getMembershipsService();

    return res.status(200).json({
      success: true,
      count: memberships.length,
      data: memberships,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getMembershipById = async (req, res) => {
  try {

    const membership =
      await getMembershipByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: membership,
    });

  } catch (error) {

    return res.status(404).json({
      success: false,
      message: error.message,
    });

  }
};

export const updateMembership = async (req, res) => {
  try {

    const membership =
      await updateMembershipService(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Membership updated successfully",
      data: membership,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const renewMembership = async (req, res) => {
  try {

    const membership =
      await renewMembershipService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Membership renewed successfully",
      data: membership,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const upgradeMembership = async (req, res) => {
  try {

    const membership =
      await upgradeMembershipService(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Membership upgraded successfully",
      data: membership,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteMembership = async (req, res) => {
  try {

    const membership =
      await deleteMembershipService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Membership deleted successfully",
      data: membership,
    });

  } catch (error) {

    return res.status(404).json({
      success: false,
      message: error.message,
    });

  }
};