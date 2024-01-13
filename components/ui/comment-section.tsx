"use client";

import { deleteCommentAction } from "@/app/actions";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Profile } from "@prisma/client";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
interface CommentProps {
  text: string;
  id: string;
  user: Profile;
  createdAt: Date;
  mealId: string;
}
export default function CommentSection({
  text,
  user,
  createdAt,
  id,
  mealId,
}: CommentProps) {
  const { userId } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  async function handleDeleteComment(commentId: string, commentMealId: string) {
    try {
      setIsDeleting(true);
      await deleteCommentAction(commentId, commentMealId);
      // You might want to perform additional actions after deleting the comment
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsDeleting(false);
    }
  }
  const canDeleteComment = userId === user.userId;

  return (
    <Card
      className={`w-full bg-neutral-800 border-none ${
        isDeleting ? "bg-slate-200" : ""
      }`}
      style={{ transition: "background-color 0.5s ease" }}
    >
      <CardHeader>
        <CardDescription className="w-full flex justify-between items-center">
          <div>{text}</div>
          <div className="font-light text-sm">{createdAt.toLocaleString()}</div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-5">
          <Link href={`/profile/${user.name}`}>
            <Image
              width={40}
              height={40}
              alt=""
              src={user.imageUrl}
              className="object-cover rounded-full"
            />
          </Link>

          <p className="text-sm text-slate-300 font-semibold">{user.name}</p>
        </div>
        <div>
          {canDeleteComment && (
            <Trash
              onClick={() => handleDeleteComment(id, mealId)}
              size={20}
              className="text-slate-200 cursor-pointer"
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
