import { AcquiredCondition } from "./acquired-condition.interface";
import { CongenitalCondition } from "./congenital-condition.interface";
import { Disability } from "./disability.interface";

export interface Person {
  address: string;
  cellphoneNo: string;
  civilStatus: string;
  congenitalInborn: boolean;
  dateOfBirth: string;
  fatherOccupation: string;
  fathersName: string;
  gender: string;
  givenName: string;
  guardiansName: string;
  guardiansOccupation: string;
  mi: string;
  mothersName: string;
  mothersOccupation: string;
  nickName: string;
  numberOfChildren: number;
  occupation: string;
  placeOfBirth: string;
  pwdNumber: string;
  specifyCondition: string;
  spouseName: string;
  spouseOccupation: string;
  surname: string;
  telNo: string;
  workAddress: string;
  workTel: string;
}

export interface PersonToSave {
  person: Person;
  disability: Disability;
  congenitalCondition: CongenitalCondition;
  acquiredCondition: AcquiredCondition;
}
