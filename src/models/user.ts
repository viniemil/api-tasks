import crypto from "crypto";
import { request } from "https";
import { Task } from "./task";

export class User {
  private _id: string;
  private _password: string;
  private _name: string;
  private _cpf: string;
  private _email: string;
  private _age: number;
  private _tasks: Task[] = [];

  constructor(
    password: string,
    name: string,
    cpf: string,
    email: string,
    age: number
  ) {
    this._id = crypto.randomUUID();
    this._password = password;
    this._name = name;
    this._cpf = cpf;
    this._email = email;
    this._age = age;
  }

  get id() {
    return this._id;
  }

  get password() {
    return this._password;
  }

  get name() {
    return this._name;
  }
  get cpf() {
    return this._cpf;
  }
  get email() {
    return this._email;
  }
  get age() {
    return this._age;
  }
  get tasks() {
    return this._tasks;
  }
  userUpdate(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  toReturn() {
    return {
      id: this._id,
      password: this._password,
      name: this._name,
      cpf: this._cpf,
      email: this._email,
      age: this._age,
    };
  }
}
