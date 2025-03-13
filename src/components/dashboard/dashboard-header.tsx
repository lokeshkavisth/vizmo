"use client";

import Link from "next/link";

import { CreateRoomDialog } from "@/components/dashboard/create-room-dialog";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../convex/_generated/api";

export function DashboardHeader() {
  const { isSignedIn, user, isLoaded } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (isLoaded && isSignedIn && user && user.primaryEmailAddress) {
      createUser({
        uid: user.id,
        email: user.primaryEmailAddress.emailAddress,
        name: user.fullName!,
        imageUrl: user.imageUrl,
      });
    }
  }, [isLoaded, isSignedIn, user, createUser]);

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 px-4 items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold">Vizmo</span>
        </Link>
        <div className="flex items-center gap-4">
          <CreateRoomDialog />

          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "2rem",
                    height: "2rem",
                  },
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
