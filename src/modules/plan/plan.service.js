import Plan from "./plan.model.js";

// Create Plan
export const createPlanService = async (data) => {
  const { name } = data;

  const existingPlan = await Plan.findOne({ name });

  if (existingPlan) {
    throw new Error("Plan already exists");
  }

  return await Plan.create(data);
};

// Get All Plans
export const getAllPlansService = async () => {
  return await Plan.find();
};

// Get Single Plan
export const getPlanByIdService = async (id) => {
  return await Plan.findById(id);
};

// Update Plan
export const updatePlanService = async (id, data) => {
  return await Plan.findByIdAndUpdate(id, data, {
    new: true,
  });
};

// Delete Plan
export const deletePlanService = async (id) => {
  return await Plan.findByIdAndDelete(id);
};