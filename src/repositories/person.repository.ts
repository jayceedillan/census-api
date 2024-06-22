import { pool } from "../database";
import { Person } from "../models/person.interface";
import { QueryError, RowDataPacket } from "mysql2";

interface CountResult {
  count: number;
}

export class PersonRepository {
  async createPerson(person: Person): Promise<number> {
    try {
      const [result] = await pool.query("INSERT INTO Persons SET ?", person);
      return (result as any).insertId;
    } catch (error) {
      // Handle specific error cases or log the error
      console.error("Error creating person:", error);
      throw error; // Rethrow the error to propagate it upwards
    }
  }

  async getPersonById(id: number): Promise<Person | null> {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM Persons WHERE PersonID = ?",
        [id]
      );
      return (rows as Person[])[0] || null;
    } catch (error) {
      console.error("Error retrieving person by ID:", error);
      throw error;
    }
  }

  async updatePerson(id: number, person: Person): Promise<void> {
    try {
      await pool.query("UPDATE Persons SET ? WHERE PersonID = ?", [person, id]);
    } catch (error) {
      console.error("Error updating person:", error);
      throw error;
    }
  }

  async deletePerson(id: number): Promise<void> {
    try {
      await pool.query("DELETE FROM Persons WHERE PersonID = ?", [id]);
    } catch (error) {
      console.error("Error deleting person:", error);
      throw error;
    }
  }

  async getAllPersons(page: number, pageSize: number): Promise<Person[]> {
    try {
      const offset = (page - 1) * pageSize;
      const [rows] = await pool.query(
        "SELECT * FROM Persons LIMIT ? OFFSET ?",
        [pageSize, offset]
      );
      return rows as Person[];
    } catch (error) {
      console.error("Error retrieving all persons:", error);
      throw error;
    }
  }

  async getPersonCount(): Promise<number> {
    try {
      const [rows] = await pool.query<CountResult & RowDataPacket[]>(
        "SELECT COUNT(*) AS count FROM Persons"
      );
      const result = rows[0];
      return result.count;
    } catch (error) {
      console.error("Error retrieving person count:", error);
      throw error;
    }
  }
}
