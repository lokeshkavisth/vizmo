import type { Metadata } from "next";

import { MeetingHeader } from "@/components/meeting/meeting-header";
import { MeetingRoom } from "@/components/meeting/meeting-room";

export const metadata: Metadata = {
  title: "Meeting Room | Vizmo",
  description: "Join a video chat meeting",
};

export default function RoomPage({ params }: { params: { id: string } }) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <MeetingHeader roomId={params.id} />
      <main className="w-full h-[calc(100dvh-40px)]">
        <MeetingRoom roomId={params.id} />
      </main>
    </div>
  );
}
