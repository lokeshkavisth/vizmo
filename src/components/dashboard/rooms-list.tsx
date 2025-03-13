"use client";

import { Calendar, Share2, Trash2 } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export function RoomsList({
  category,
  searchQuery,
}: {
  category: string;
  searchQuery: string;
}) {
  const allRooms = useQuery(api.room.getAllRooms);
  const deleteRoomById = useMutation(api.room.deleteRoomById);
  const { user } = useUser();

  if (!allRooms) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const handleShareRoom = (roomId: string) => {
    // In a real app, this would copy the room link to clipboard
    console.log(`Share room link: /room/${roomId}`);

    navigator.clipboard.writeText(roomId);
    toast.success("Room link copied to clipboard!", {
      description:
        "Room link copied to clipboard, you can now share it with others.",
    });
  };

  const handleDeleteRoom = (roomId: string, uid: string) => {
    if (user && roomId && uid === user.id) {
      try {
        deleteRoomById({ roomId: roomId as Id<"rooms"> });
        toast.success("Room deleted successfully", {
          description:
            "Room deleted successfully, you can now create a new room.",
        });
      } catch (error) {
        toast.error("Oops! something went wrong.", {
          description: "Room deletion failed. Please try again.",
        });
      }
    }
  };

  // Filter rooms based on category and search query
  const filteredRooms = allRooms.filter((room) => {
    const matchesCategory = category === "all" || room.category === category;
    const matchesSearch = room.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4">
      {filteredRooms.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <h3 className="text-xl font-medium text-muted-foreground">
            No rooms found
          </h3>
          <p className="mt-2 text-muted-foreground">
            Try changing your filters or create a new room
          </p>
        </div>
      ) : (
        filteredRooms.map((room) => (
          <Card key={room._id}>
            <CardHeader className="relative">
              <CardTitle className="line-clamp-1 capitalize">
                {room.title}
              </CardTitle>
              <Badge className={`${room.category} absolute right-6 top-0`}>
                {room.category.charAt(0).toUpperCase() + room.category.slice(1)}
              </Badge>
              <CardDescription className="flex items-start">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(room._creationTime).toLocaleString()}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                Host: <span>{room.username}</span>
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => handleShareRoom(room._id)}
                      >
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share room</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share room link</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`text-destructive hover:bg-destructive/10 hover:text-destructive ${user && room.uid !== user.id ? "hidden" : ""}`}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete room</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Room</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete &quot;{room.title}
                        &quot;? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteRoom(room._id, room.uid)}
                        className={buttonVariants({ variant: "destructive" })}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <Button asChild>
                <Link href={`/room/${room._id}`}>Join Room</Link>
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
