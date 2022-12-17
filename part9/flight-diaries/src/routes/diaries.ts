import express from "express";

const router = express.Router();

router.get("/", (_request, response) => {
  response.send("Fetching all diaries!");
});

router.post("/", (_request, response) => {
  response.send("Saving a diary!");
});

export default router;
