"use client";
import Image from "next/image";
import { User } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";
export default function Home() {
  const { isLoaded, userId, sessionId, getToken,  } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }
  return (
    <div className="maincol">
      Hello, {userId} your current active session is {sessionId}
    </div>
  );
}
