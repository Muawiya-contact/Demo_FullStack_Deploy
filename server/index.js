import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Hello from Backend 🚀" });
});

// Example API route
app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "T-shirt", price: 25 },
    { id: 2, name: "Shoes", price: 60 },
  ]);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
