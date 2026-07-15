// src/types.ts
export interface HouseSummary {
  id: string;
  name: string;
  totalTasks: number;
  doneTasks: number;
  people: {id: string; username: string}[]
}

export interface RoomSummary {
  id: string;
  name: string;
  totalTasks: number;
  doneTasks: number;
}
export interface TaskAssignment {
  taskId: string;
  personId: string;
  person: {
    id: string;
    username: string;
  };
}
// src/types.ts
// export interface Task {
//   id: string;
//   title: string;
//   desc: string;
//   tools: string[];
//   howto: string;
//   descImages: string[];
// toolImages: string[];
// howtoImages: string[];

//   dueDate: string | null;
//   completedAt: string | null;
// }
export interface Task {
  id: string;
  title: string;
  desc: string;
  tools: string[];
  howto: string;
  dueDate: string | null;
  createdAt: string;
  completedAt: string | null;
  descImages: string[];
  howtoImages: string[];
  toolImages: string[];
  roomId: string;
  assignedTo: TaskAssignment[];  // Add this
  room: {
    id: string;
    houseId: string;
  };
}

// src/types.ts
export interface PersonTask {
  id: string;
  title: string;
  completedAt: string | null;
}

export interface Person {
  id: string;
  username: string;
  email: string;
  tasks: PersonTask[];
}

// src/types.ts
export interface TaskTemplate {
  id: string;
  title: string;
  desc: string;
  tools: string[];
  howto: string;
  descImages: string[];
  toolImages: string[];
  howtoImages: string[];
}