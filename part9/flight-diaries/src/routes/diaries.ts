import express from "express";
import diaryService from "../services/diaryService";

const router = express.Router();

router.get("/", (_request, response) => {
  response.send(diaryService.getNonSensitiveEntries());
});

router.get("/:id", (request, response) => {
  const diary = diaryService.findById(Number(request.params.id));

  if (diary) {
    response.send(diary);
  } else {
    response.sendStatus(404);
  }
});

router.post("/", (_request, response) => {
  response.send("Saving a diary!");
});

export default router;
