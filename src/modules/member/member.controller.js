import {
  createMemberService,
  getMembersService,
  updateMemberService,
  deleteMemberService,
  getMemberByIdService,
} from "./member.service.js";

export const createMember = async (req, res) => {
  try {
    const member = await createMemberService(req.body);

    return res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: member,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMembers = async (req, res) => {
  try {
    const result = await getMembersService(req.query);

    return res.status(200).json({
      success: true,
      count: result.totalMembers,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      data: result.members,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMemberById = async (req, res) => {
  try {

    const member = await getMemberByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: member,
    });

  } catch (error) {

    return res.status(404).json({
      success: false,
      message: error.message,
    });

  }
};

export const updateMember = async (req, res) => {
  try {
    const member = await updateMemberService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: member,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const member = await deleteMemberService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Member deleted successfully",
      data: member,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};