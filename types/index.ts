export enum ViewEnum {
  LIST = "list",
  CREATE = "create",
  EDIT = "edit",
}

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  color: string;
}

export interface TaskData {
  text: string;
  isCompleted: boolean;
  color: string;
}

export interface TaskUpdate {
  title: string;
  isCompleted: boolean;
  color: string;
}