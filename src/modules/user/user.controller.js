export const getUsers = async (req, res) => {
  try {

    const users = [];

    res.status(200).json({
      success: true,
      message: "All users fetched",
      data: users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};