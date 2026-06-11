import Member from "./member.model.js";
import Plan from "../plan/plan.model.js";

export const createMemberService = async (data) => {

  const { name, email, mobile, plan } = data;

  // Duplicate Email
  const existingEmail = await Member.findOne({ email });

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // Duplicate Mobile
  const existingMobile = await Member.findOne({ mobile });

  if (existingMobile) {
    throw new Error("Mobile already exists");
  }

  // Check Plan
  const existingPlan = await Plan.findById(plan);

  if (!existingPlan) {
    throw new Error("Plan not found");
  }

  // Create Member
  const member = await Member.create({
    name,
    email,
    mobile,
    plan,
    status: "Active",
  });

  return member;
};

export const getMembersService = async (query) => {

  const {
    page = 1,
    limit = 10,
    search = "",
  } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const filter = {
    name: {
      $regex: search,
      $options: "i",
    },
  };

  const members = await Member.find(filter)
    .populate("plan")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const totalMembers = await Member.countDocuments(filter);

  return {
    members,
    totalMembers,
    currentPage: Number(page),
    totalPages: Math.ceil(totalMembers / Number(limit)),
  };
};

export const getMemberByIdService = async (id) => {

  const member = await Member.findById(id).populate("plan");

  if (!member) {
    throw new Error("Member not found");
  }

  return member;
};



export const updateMemberService = async (id, data) => {
  const member = await Member.findById(id);

  if (!member) {
    throw new Error("Member not found");
  }

  const { name, email, mobile, plan } = data;

  // Check duplicate email
  if (email && email !== member.email) {
    const existingEmail = await Member.findOne({ email });

    if (existingEmail) {
      throw new Error("Email already exists");
    }
  }

  // Check duplicate mobile
  if (mobile && mobile !== member.mobile) {
    const existingMobile = await Member.findOne({ mobile });

    if (existingMobile) {
      throw new Error("Mobile already exists");
    }
  }

  // Check plan exists
  if (plan) {
    const existingPlan = await Plan.findById(plan);

    if (!existingPlan) {
      throw new Error("Plan not found");
    }
  }

  const updatedMember = await Member.findByIdAndUpdate(
    id,
    {
      name,
      email,
      mobile,
      plan,
    },
    {
      new: true,
      runValidators: true,
    }
  ).populate("plan");

  return updatedMember;
};

export const deleteMemberService = async (id) => {

  const member = await Member.findById(id);

  if (!member) {
    throw new Error("Member not found");
  }

  await Member.findByIdAndDelete(id);

  return member;

};