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

router.post("/", (request, response) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { date, weather, visibility, comment } = request.body;
  const newDiaryEntry = diaryService.addDiary({
    date,
    weather,
    visibility,
    comment,
  });

  response.json(newDiaryEntry);
});

export default router;
