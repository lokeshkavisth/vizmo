"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  MediaDeviceMenu,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  VideoConference,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import "@livekit/components-styles";

const LIVEKIT_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL;

export function MeetingRoom({ roomId }: { roomId: string }) {
  const [token, setToken] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();

  const roomDetails = useQuery(api.room.getRoomById, {
    roomId: roomId as Id<"rooms">,
  });

  console.log("roomDetails: ", roomDetails);

  const fetchToken = useCallback(async () => {
    if (!roomDetails || !user?.id) return;

    try {
      const username = user.id;

      // Include permissions explicitly in the token request
      const resp = await fetch(
        `/api/token?room=${roomDetails._id}&username=${username}&video=true&audio=true`
      );
      console.log("rersp: ", resp);
      if (!resp.ok) {
        toast.error("Request failed!", {
          description: "Cannot get token for this room. Please try again.",
        });

        router.push("/dashboard");
        return;
      }

      const data = await resp.json();
      console.log("data: ", data);
      setToken(data.token);
      // setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching token:", error);
      // setError(error instanceof Error ? error.message : "Failed to get token");
    }
  }, [roomDetails, user, router]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  if (token === "") {
    return <div>Getting token...</div>;
  }

  const handleDisconnect = () => {
    toast.success("User is disconnected!", {
      description: "User is disconnected from the room.",
    });
    router.push("/dashboard");
    console.log("disconnected!");
  };

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token!}
      connect={true}
      serverUrl={LIVEKIT_URL}
      data-lk-theme="default"
      onDisconnected={handleDisconnect}
    >
      <VideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}
