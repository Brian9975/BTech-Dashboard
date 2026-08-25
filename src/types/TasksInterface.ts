export interface TaskInterface {
  id: string;
  task: string;
  deadline: Date | string;
  isCompleted: boolean;
  createdAt: Date;
}
