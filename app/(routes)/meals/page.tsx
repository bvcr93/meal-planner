'use client'
import { useUser } from "@clerk/nextjs";
 
export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
 
  if (!isLoaded) {
    return null;
  }
 
  if (isSignedIn) {
    return <div>Hello {user.fullName}!</div>;
  }
 
  return <div>Not signed in</div>;
}
 