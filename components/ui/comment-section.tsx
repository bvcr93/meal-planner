"use client";

import { deleteCommentAction } from "@/app/actions";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Profile } from "@prisma/client";
import { Heart, MessageSquare, Send, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Input } from "./input";
import { useToast } from "./use-toast";

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
  const [isSubCommentOpened, setIsSubCommentOpened] = useState(false);
  const { toast } = useToast();
  async function handleDeleteComment(commentId: string, commentMealId: string) {
    try {
      setIsDeleting(true);
      await deleteCommentAction(commentId, commentMealId);
      toast({
        title: "Comment deleted!",
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  const canDeleteComment = userId === user.userId;

  function handleOpenSubComment() {
    setIsSubCommentOpened(!isSubCommentOpened);
  }
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
        <div className="flex items-center gap-5">
          <MessageSquare
            size={20}
            className={`mt-1 cursor-pointer ${
              isSubCommentOpened ? "text-slate-200" : ""
            }`}
            onClick={handleOpenSubComment}
          />
          <Heart size={20} className="mt-1 cursor-pointer" />
          {canDeleteComment && (
            <Trash
              onClick={() => handleDeleteComment(id, mealId)}
              size={20}
              className="cursor-pointer text-red-500"
            />
          )}
        </div>
      </CardFooter>
      {isSubCommentOpened && (
        <div className="relative">
          <Input placeholder="Reply..." className="w-full pr-10" />
          <div className="absolute right-0 top-0 h-full flex items-center">
            <Send className="mr-7 text-slate-200 cursor-pointer" size={20} />
          </div>
        </div>
      )}
    </Card>
  );
}
