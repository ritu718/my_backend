import {
  createPaymentService,
  getPaymentsService,
  getPaymentByIdService,
  updatePaymentService,
  deletePaymentService,
} from "./payment.service.js";

export const createPayment = async (req, res) => {
  try {

    const payment =
      await createPaymentService(req.body);

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await getPaymentsService();

    return res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await getPaymentByIdService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const payment = await updatePaymentService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const payment = await deletePaymentService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};