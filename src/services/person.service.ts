import { PersonRepository } from "../repositories/person.repository";
import { Person } from "../models/index";

export class PersonService {
  private personRepository = new PersonRepository();

  async createPerson(person: Person): Promise<number> {
    return this.personRepository.createPerson(person);
  }

  async getPersonById(id: number): Promise<Person | null> {
    return this.personRepository.getPersonById(id);
  }

  async updatePerson(id: number, person: Person): Promise<void> {
    await this.personRepository.updatePerson(id, person);
  }

  async deletePerson(id: number): Promise<void> {
    await this.personRepository.deletePerson(id);
  }

  async getAllPersons(
    page: number,
    pageSize: number
  ): Promise<{ persons: Person[]; total: number }> {
    const persons = await this.personRepository.getAllPersons(page, pageSize);
    const total = await this.personRepository.getPersonCount();
    return { persons, total };
  }
}
