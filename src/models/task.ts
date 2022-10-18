import crypto from "crypto";

export class Task {
  private _id: string;
  private _title: string;
  private _description: string;

  constructor(title: string, description: string) {
    this._id = crypto.randomUUID();
    this._title = title;
    this._description = description;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  transactionUpdate(title: string, description: string) {
    this._title = title;
    this._description = description;
  }

  toReturn() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
    };
  }
}
