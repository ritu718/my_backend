import express from "express";
import cors from "cors";
import memberRoutes from "./modules/member/member.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import planRoutes from "./modules/plan/plan.routes.js";
import membershipRoutes from "./modules/membership/membership.routes.js";
import paymentRoutes from "./modules/payment/payment.routes.js";


const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/payments", paymentRoutes);






app.get("/", (req, res) => {
  res.send("Backend Running");
});

export default app;