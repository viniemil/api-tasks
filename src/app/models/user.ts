import crypto from "crypto";
import { Task } from "./task";

export class User {
  private _id: string;
  private _password: string;
  private _name: string;
  private _cpf: string;
  private _email: string;
  private _age: number;
  private _tasks: Task[];

  constructor(
    password: string,
    name: string,
    cpf: string,
    email: string,
    age: number,
    id?: string
  ) {
    this._id = id ?? crypto.randomUUID();
    this._password = password;
    this._name = name;
    this._cpf = cpf;
    this._email = email;
    this._age = age;
    this._tasks = [];
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
  get tasks(): Task[] {
    return [...this._tasks];
  }

  static create(
    id: string,
    password: string,
    name: string,
    age: number,
    cpf: string,
    email: string,
    tasks?: Task[]
  ): User {
    const user = new User(password, name, cpf, email, age);
    user._id = id;
    user._password = password;
    user._email = email;
    user._cpf = cpf;
    user._age = age;

    if (tasks) {
      user._tasks = tasks;
    }
    return user;
  }

  userUpdate(name?: string, age?: number, password?: string, email?: string) {
    (this._name = name ?? this._name),
      (this._age = age ?? this._age),
      (this._password = password ?? this._password),
      (this._email = email ?? this._email);
  }

  toReturn() {
    return {
      id: this._id,
      password: this._password,
      name: this._name,
      cpf: this._cpf,
      email: this._email,
      age: this._age,
      tasks: this._tasks.map((task) => task.toReturn()),
    };
  }
}
