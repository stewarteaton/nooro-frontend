export enum ViewEnum {
  LIST = "list",
  CREATE = "create",
  EDIT = "edit",
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  color: string;
}

export interface TaskData {
  text: string;
  completed: boolean;
  color: string;
}