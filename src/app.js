import express from "express";
import cors from "cors";
import memberRoutes from "./routes/member.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/members", memberRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

export default app;