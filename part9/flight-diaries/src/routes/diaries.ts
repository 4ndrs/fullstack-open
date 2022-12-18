import express from "express";
import diaryService from "../services/diaryService";
import toNewDiaryEntry from "../utils";

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
  try {
    const newDiaryEntry = toNewDiaryEntry(request.body);

    const addedEntry = diaryService.addDiary(newDiaryEntry);
    response.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    response.status(400).send(errorMessage);
  }
});

export default router;
