"use client";

import type React from "react";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CreateRoomDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();

  const createNewRoom = useMutation(api.room.createNewRoom);

  const { isSignedIn, isLoaded, user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn && !isLoaded && !user) {
      toast.error("Please sign in to create a room");
      return;
    }

    if (
      isLoaded &&
      isSignedIn &&
      user &&
      user.primaryEmailAddress &&
      title &&
      category
    ) {
      const roomId = await createNewRoom({
        uid: user.id!,
        email: user.primaryEmailAddress.emailAddress!,
        username: user.fullName!,
        title: title,
        category: category,
      });

      if (!roomId) {
        toast.error("Room creation failed", {
          description: "Room creation failed. Please try again.",
        });
        return;
      }

      toast.success("Room created", {
        description: "Room created successfully. You can join the room now.",
      });

      router.push(`/room/${roomId}`);
    }

    setOpen(false);
    setTitle("");
    setCategory("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new room</DialogTitle>
            <DialogDescription>
              Fill in the details to create your video chat room
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Room title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Weekly Team Meeting"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Room</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
