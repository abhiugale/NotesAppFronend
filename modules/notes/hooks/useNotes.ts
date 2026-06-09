import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notesService, FetchNotesParams } from "../service/notesService";
import { Note } from "../../../common/types";

export function useNotesQuery(params: FetchNotesParams) {
  return useQuery({
    queryKey: ["notes", params],
    queryFn: () => notesService.getNotes(params),
  });
}

export function useTagsQuery() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => notesService.getTags(),
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Note>) => notesService.createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Note> }) =>
      notesService.updateNote({ id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notesService.deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}
