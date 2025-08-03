"use client";

import { useQuery, DehydratedState, QueryKey } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import css from "./NoteDetails.client.module.css";
import type { Note } from "@/types/note";

interface DehydratedQuery {
  queryKey: QueryKey;
  state: {
    data: unknown;
  };
}

export default function NoteDetailsClient({
  dehydratedState,
  id,
}: {
  dehydratedState: DehydratedState;
  id: string;
}) {
  const params = useParams();
  const paramsId = params?.id;
  const noteId = Array.isArray(paramsId) ? paramsId[0] : paramsId || id;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    initialData: (dehydratedState.queries as DehydratedQuery[]).find(
      (query) =>
        JSON.stringify(query.queryKey) === JSON.stringify(["note", noteId])
    )?.state.data as Note | undefined,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
          <span className={css.tag}>{note.tag}</span>
          <p className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
