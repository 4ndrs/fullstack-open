import express from "express";
import diaryService from "../services/diaryService";

const router = express.Router();

router.get("/", (_request, response) => {
  response.send(diaryService.getNonSensitiveEntries());
});

router.post("/", (_request, response) => {
  response.send("Saving a diary!");
});

export default router;
