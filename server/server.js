import express, { raw, request } from "express";
import cors from "cors";
import mountRoutes from "./controllers/index.js";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 8000;
mountRoutes(app);

app.listen(port, () => {
    console.log(`Server Listening On Port ${port}`);
})