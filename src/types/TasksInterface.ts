export interface TaskInterface {
  id: string;
  task: string;
  deadline: Date | string;
  isCompleted: boolean;
  createdAt: Date;
  lastModified: number;
  isSynced: boolean;
  userId: string;
  isDeleted: boolean;
}
