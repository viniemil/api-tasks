import crypto from "crypto";

export class Task {
  private _id: string;
  private _title: string;
  private _description: string;
  private _archived: boolean;

  constructor(title: string, description: string) {
    this._id = crypto.randomUUID();
    this._title = title;
    this._description = description;
    this._archived = false;
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

  get archived() {
    return this._archived;
  }

  taskUpdate(title: string, description: string) {
    this._title = title;
    this._description = description;
  }

  archivedTask(status: boolean) {
    this._archived = status;
  }

  static create(id: string, title: string, description: string): Task {
    const task = new Task(title, description);
    task._id = id;

    return task;
  }

  toReturn() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      archived: this._archived,
    };
  }
}
