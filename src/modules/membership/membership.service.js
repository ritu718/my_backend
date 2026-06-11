import Membership from "./membership.model.js";
import Member from "../member/member.model.js";
import Plan from "../plan/plan.model.js";

export const createMembershipService = async (data) => {

  const { member, plan } = data;

  // Check Member
  const existingMember = await Member.findById(member);

  if (!existingMember) {
    throw new Error("Member not found");
  }

  // Check Plan
  const existingPlan = await Plan.findById(plan);

  if (!existingPlan) {
    throw new Error("Plan not found");
  }

  // Check Active Membership
  const activeMembership = await Membership.findOne({
    member,
    status: "Active",
  });

  if (activeMembership) {
    throw new Error(
      "Member already has an active membership"
    );
  }

  // Start Date
  const startDate = new Date();

  // End Date
  const endDate = new Date(startDate);

  endDate.setMonth(
    endDate.getMonth() + existingPlan.duration
  );

  // Create Membership
  const membership = await Membership.create({
    member,
    plan,
    startDate,
    endDate,
    status: "Active",
  });

  return membership;
};

export const getMembershipsService = async () => {
  return await Membership.find()
    .populate("member")
    .populate("plan")
    .sort({ createdAt: -1 });
};
export const getMembershipByIdService = async (id) => {

  const membership = await Membership.findById(id)
    .populate("member")
    .populate("plan");

  if (!membership) {
    throw new Error("Membership not found");
  }

  return membership;
};

export const updateMembershipService = async (id, data) => {

  const membership = await Membership.findById(id);

  if (!membership) {
    throw new Error("Membership not found");
  }

  return await Membership.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("member")
    .populate("plan");
};

export const renewMembershipService = async (id) => {

  const membership = await Membership.findById(id);

  if (!membership) {
    throw new Error("Membership not found");
  }

  const plan = await Plan.findById(membership.plan);

  if (!plan) {
    throw new Error("Plan not found");
  }

  // Current end date
  const newEndDate = new Date(membership.endDate);

  // Add plan duration
  newEndDate.setMonth(
    newEndDate.getMonth() + plan.duration
  );

  membership.endDate = newEndDate;
  membership.status = "Active";

  await membership.save();

  return await Membership.findById(id)
    .populate("member")
    .populate("plan");
};

export const upgradeMembershipService = async (
  id,
  data
) => {

  const { plan } = data;

  // Check Membership
  const membership =
    await Membership.findById(id);

  if (!membership) {
    throw new Error(
      "Membership not found"
    );
  }

  // Check Plan
  const newPlan =
    await Plan.findById(plan);

  if (!newPlan) {
    throw new Error(
      "Plan not found"
    );
  }

  // Update Plan
  membership.plan = plan;

  // Recalculate End Date
  const today = new Date();

  const endDate = new Date(today);

  endDate.setMonth(
    endDate.getMonth() + newPlan.duration
  );

  membership.startDate = today;
  membership.endDate = endDate;
  membership.status = "Active";

  await membership.save();

  return await Membership.findById(id)
    .populate("member")
    .populate("plan");

};

export const deleteMembershipService = async (id) => {

  const membership = await Membership.findById(id);

  if (!membership) {
    throw new Error("Membership not found");
  }

  await Membership.findByIdAndDelete(id);

  return membership;
};