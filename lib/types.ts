export interface User {
  user: {
    id: string;
    name: string | null;
    surname: string | null;
    email: string;
  };
}

export interface Board {
  boards: {
    id: string;
    title: string;
    columns: Column[];
  }[];
  memberBoards: {
    id: string;
    title: string;
    columns: Column[];
  }[];
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  isChecked: boolean;
}
