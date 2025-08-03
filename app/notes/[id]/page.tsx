import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import { QueryClient, dehydrate } from "@tanstack/react-query";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", params.id],
      queryFn: () => fetchNoteById(params.id),
    });

    return (
      <NoteDetailsClient
        dehydratedState={dehydrate(queryClient)}
        id={params.id}
      />
    );
  } catch (error) {
    console.error("Failed to fetch note:", error);
    throw error;
  }
}
