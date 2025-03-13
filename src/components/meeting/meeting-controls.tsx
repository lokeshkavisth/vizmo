"use client";

import { useState } from "react";
import {
  Mic,
  MicOff,
  Monitor,
  Phone,
  Settings,
  Video,
  VideoOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function MeetingControls() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  return (
    <div className="bg-black/50 backdrop-blur-sm border-t border-white/10 p-4">
      <div className="container flex items-center justify-center">
        <div className="flex items-center gap-2 md:gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full border-white/20 bg-white/10 hover:bg-white/20",
                    !isMicOn && "bg-red-500/20 hover:bg-red-500/30 text-red-500"
                  )}
                  onClick={() => setIsMicOn(!isMicOn)}
                >
                  {isMicOn ? (
                    <Mic className="h-5 w-5" />
                  ) : (
                    <MicOff className="h-5 w-5" />
                  )}
                  <span className="sr-only">
                    {isMicOn ? "Mute microphone" : "Unmute microphone"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMicOn ? "Mute microphone" : "Unmute microphone"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full border-white/20 bg-white/10 hover:bg-white/20",
                    !isVideoOn &&
                      "bg-red-500/20 hover:bg-red-500/30 text-red-500"
                  )}
                  onClick={() => setIsVideoOn(!isVideoOn)}
                >
                  {isVideoOn ? (
                    <Video className="h-5 w-5" />
                  ) : (
                    <VideoOff className="h-5 w-5" />
                  )}
                  <span className="sr-only">
                    {isVideoOn ? "Turn off camera" : "Turn on camera"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isVideoOn ? "Turn off camera" : "Turn on camera"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full border-white/20 bg-white/10 hover:bg-white/20",
                    isScreenSharing &&
                      "bg-green-500/20 hover:bg-green-500/30 text-green-500"
                  )}
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                >
                  <Monitor className="h-5 w-5" />
                  <span className="sr-only">
                    {isScreenSharing ? "Stop sharing" : "Share screen"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isScreenSharing ? "Stop sharing" : "Share screen"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full border-white/20 bg-white/10 hover:bg-white/20"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="destructive"
            size="icon"
            className="h-12 w-12 rounded-full ml-2 md:ml-4"
            onClick={() => (window.location.href = "/dashboard")}
          >
            <Phone className="h-5 w-5 rotate-135" />
            <span className="sr-only">End call</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
