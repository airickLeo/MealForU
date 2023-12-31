import express from "express";
const router = express.Router();

// Home page route (initialize database if it doesn't exist)
router.get('/favourites', (req, res) => {
    console.log("in api");
    res.status(200).json({data: "at api"})
})

export default router;