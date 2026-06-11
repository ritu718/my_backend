import Payment from "./payment.model.js";
import Membership from "../membership/membership.model.js";
import Plan from "../plan/plan.model.js";


export const createPaymentService = async (data) => {
  const { membership, paymentMethod, transactionId } = data;

  // Transaction Validation
if (
  (paymentMethod === "UPI" ||
    paymentMethod === "Card") &&
  !transactionId
) {
  throw new Error(
    "Transaction ID is required for UPI/Card payments"
  );
}

  // Check Membership
  const existingMembership = await Membership.findById(membership);

  if (!existingMembership) {
    throw new Error("Membership not found");
  }

  // Check Plan
  const existingPlan = await Plan.findById(
    existingMembership.plan
  );

  if (!existingPlan) {
    throw new Error("Plan not found");
  }

  // Check if payment already exists
const existingPayment = await Payment.findOne({
  membership,
  status: "Success",
});

if (existingPayment) {
  throw new Error(
    "Payment already completed for this membership"
  );
}

  // Create Payment
  const payment = await Payment.create({
    member: existingMembership.member,
    membership,
    amount: existingPlan.price,
    paymentMethod,
    transactionId,
    status: "Success",
  });

  return await Payment.findById(payment._id)
    .populate("member")
    .populate({
      path: "membership",
      populate: {
        path: "plan",
      },
    });
};
export const getPaymentsService = async () => {

  return await Payment.find()
    .populate("member")
    .populate({
      path: "membership",
      populate: {
        path: "plan",
      },
    })
    .sort({ createdAt: -1 });

};

export const getPaymentByIdService = async (id) => {

  const payment = await Payment.findById(id)
    .populate("member")
    .populate({
      path: "membership",
      populate: {
        path: "plan",
      },
    });

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};

export const updatePaymentService = async (
  id,
  data
) => {

  const payment = await Payment.findById(id);

  if (!payment) {
    throw new Error("Payment not found");
  }

  return await Payment.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("member")
    .populate({
      path: "membership",
      populate: {
        path: "plan",
      },
    });

};

export const deletePaymentService = async (
  id
) => {

  const payment = await Payment.findById(id);

  if (!payment) {
    throw new Error("Payment not found");
  }

  await Payment.findByIdAndDelete(id);

  return payment;

};