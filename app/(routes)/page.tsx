import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { useAuth } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import { auth } from "@clerk/nextjs";
export default async function Home() {
  const user: User | null = await currentUser();
  const { userId } = auth();
  console.log("userid: ", userId);
  console.log("user: ", user);
  return (
    <div className="maincol flex items-center justify-center h-screen">
      {user && <p className="text-5xl ">Hello {user.firstName}</p>}
    </div>
  );
}
