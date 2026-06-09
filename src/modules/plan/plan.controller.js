import {
  createPlanService,
  getAllPlansService,
  getPlanByIdService,
  updatePlanService,
  deletePlanService,
} from "./plan.service.js";

// Create Plan
export const createPlan = async (req, res) => {
  try {
    const plan = await createPlanService(req.body);

    return res.status(201).json({
      success: true,
      message: "Plan created successfully",
      data: plan,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Plans
export const getAllPlans = async (req, res) => {
  try {
    const plans = await getAllPlansService();

    return res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Plan
export const getPlanById = async (req, res) => {
  try {
    const plan = await getPlanByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Plan
export const updatePlan = async (req, res) => {
  try {
    const plan = await updatePlanService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: plan,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Plan
export const deletePlan = async (req, res) => {
  try {
    await deletePlanService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};