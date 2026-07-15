// src/types.ts
export interface HouseSummary {
  id: string;
  name: string;
  totalTasks: number;
  doneTasks: number;
}

export interface RoomSummary {
  id: string;
  name: string;
  totalTasks: number;
  doneTasks: number;
}

// src/types.ts
export interface Task {
  id: string;
  title: string;
  desc: string;
  tools: string[];
  howto: string;
  descImages: string[];
toolImages: string[];
howtoImages: string[];

  dueDate: string | null;
  completedAt: string | null;
}