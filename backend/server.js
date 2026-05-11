import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import leadsRoute from "./routes/leadsRoute.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", leadsRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is running on port 5000!")
})