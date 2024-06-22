import { Router } from "express";
import { PersonController } from "../controller/person.controller";

const router = Router();
const personController = new PersonController();

router.post("/persons", personController.createPerson);
router.get("/persons/:id", personController.getPersonById);
router.put("/persons/:id", personController.updatePerson);
router.delete("/persons/:id", personController.deletePerson);
router.get("/persons", personController.getAllPersons);

export default router;
