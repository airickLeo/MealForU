import express, { raw, request } from "express";
import cors from "cors";
import mountRoutes from "./controllers/index.js";

const app = express();
app.use(cors());
const port = 8000;
mountRoutes(app);

app.listen(port, () => {
    console.log(`Server Listening On Port ${port}`);
})