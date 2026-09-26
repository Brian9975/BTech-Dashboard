export interface TaskInterface {
  id: string;
  task: string;
  deadline: Date | string;
  isCompleted: boolean;
  createdAt: Date;
  lastModified: string;
  isSynced: boolean;
  userId: string;
  isDeleted: boolean;
}
