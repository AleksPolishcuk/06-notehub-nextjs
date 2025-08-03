import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const myApiKey = `Bearer ${myKey}`;
axios.defaults.headers.common["Authorization"] = myApiKey;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  page: number;
  data: Note[];
  total_pages: number;
  perPage: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axios.get("/notes", {
    params: {
      page,
      perPage,
      ...(search && { search }),
    },
  });

  return {
    page,
    perPage,
    data: response.data.notes,
    total_pages: response.data.totalPages,
  };
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const response = await axios.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const response = await axios.post("/notes", note);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await axios.delete(`/notes/${id}`);
  return response.data;
};
