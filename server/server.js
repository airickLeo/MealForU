import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const port = 8000;

app.get("/search", (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Server Listening On Port ${port}`);
})