import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const port = 8000;

app.get("/", (req, res) => {
    res.json({ 'users': ['eric'] })
})

app.listen(port, () => {
    console.log(`Server Listening On Port ${port}`);
})