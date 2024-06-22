import { Request, Response } from "express";
import { PersonService } from "../services/person.service";
import { Person, PersonToSave } from "../models/index";

export class PersonController {
  private personService = new PersonService();

  createPerson = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    const person: PersonToSave = req.body;

    const personId = await this.personService.createPerson(person);
    res.status(201).json({ id: personId });
  };

  getPersonById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const person = await this.personService.getPersonById(id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ message: "Person not found" });
    }
  };

  updatePerson = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const person: Person = req.body;
    await this.personService.updatePerson(id, person);
    res.json({ message: "Person updated" });
  };

  deletePerson = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    await this.personService.deletePerson(id);
    res.json({ message: "Person deleted" });
  };

  getAllPersons = async (req: Request, res: Response): Promise<void> => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const result = await this.personService.getAllPersons(page, pageSize);
    res.json(result);
  };
}
