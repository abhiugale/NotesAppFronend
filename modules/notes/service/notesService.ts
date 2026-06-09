import api from "../../../app/axios/instance";
import { Note } from "../../../common/types";

export interface FetchNotesParams {
  isArchived?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  search?: string;
  tag?: string;
}

export const notesService = {
  getNotes: async (params: FetchNotesParams) => {
    const isArchivedQuery = params.isArchived ? "true" : "false";
    let url = `/notes?isArchived=${isArchivedQuery}&page=${params.page || 1}&limit=${params.limit || 12}&sortBy=${params.sortBy || "updatedAt"}&order=${params.order || "desc"}`;
    if (params.search) {
      url += `&search=${encodeURIComponent(params.search)}`;
    }
    if (params.tag) {
      url += `&tag=${encodeURIComponent(params.tag)}`;
    }
    const res = await api.get(url);
    return res.data;
  },

  getTags: async () => {
    const res = await api.get("/notes/tags");
    return res.data;
  },

  createNote: async (payload: Partial<Note>) => {
    const res = await api.post("/notes", payload);
    return res.data;
  },

  updateNote: async ({ id, payload }: { id: string; payload: Partial<Note> }) => {
    const res = await api.put(`/notes/${id}`, payload);
    return res.data;
  },

  deleteNote: async (id: string) => {
    const res = await api.delete(`/notes/${id}`);
    return res.data;
  },
};
