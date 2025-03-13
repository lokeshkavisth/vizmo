"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Info, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";

interface MeetingHeaderProps {
  roomId: string;
}

export function MeetingHeader({ roomId }: MeetingHeaderProps) {
  const [isCopied, setIsCopied] = useState(false);

  // Dummy data for the current room
  const roomData = {
    title: "Weekly Tech Standup",
    participants: 8,
    startTime: new Date().toISOString(),
  };

  const copyRoomLink = () => {
    const roomLink = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(roomLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <header className="backdrop-blur-sm border-b border-dashed px-4 h-10 flex items-center">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold">Vizmo</span>
          <Separator orientation="vertical" />
          <h1 className="hidden md:block text-lg font-medium truncate max-w-[300px]">
            {roomData.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Info className="size-4" />
                <span className="sr-only">Room info</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Room Information</SheetTitle>
                <SheetDescription>
                  Details about the current meeting room
                </SheetDescription>
                <SheetDescription>
                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-primary">
                        Room Title
                      </h3>
                      <p>{roomData.title}</p>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold text-primary">
                        Room ID
                      </h3>
                      <code className="rounded p-1 w-max border font-mono text-xs">
                        {roomId}
                      </code>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size={"sm"}
                              onClick={copyRoomLink}
                              className="max-w-max mt-1"
                            >
                              {isCopied ? (
                                <>
                                  Copied! <Check />
                                </>
                              ) : (
                                <>
                                  Copy Meeting URL <Copy />
                                </>
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy room link to clipboard</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-primary">
                        Participants
                      </h3>
                      <p>{roomData.participants} people</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-primary">
                        Started
                      </h3>
                      <p>{new Date(roomData.startTime).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <X />
              <span className="sr-only">Leave meeting</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
