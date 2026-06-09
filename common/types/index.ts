export interface Note {
  _id: string;
  userId: string;
  title: string;
  content: string;
  pinned: boolean;
  color: string;
  tags: string[];
  isArchived: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface PaginationMetadata {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}
