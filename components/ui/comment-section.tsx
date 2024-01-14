"use client";

import { createSubcommentAction, deleteCommentAction } from "@/app/actions";
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
  subcomments: {
    id: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    mealId: string;
    profileId: string;
    commentId: string;
    profile: Profile;
  }[];
}
export default function CommentSection({
  text,
  user,
  createdAt,
  id,
  mealId,
  subcomments,
}: CommentProps) {
  const { userId } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubCommentOpened, setIsSubCommentOpened] = useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCreateSubcomment = async (data: FormData) => {
    try {
      console.log("Handling subcomment creation...");
      setIsLoading(true);

      const text = data.get("text");
      const mealId = data.get("mealId");
      const commentId = data.get("commentId");

      if (!text || typeof text !== "string") return;
      if (!mealId || typeof mealId !== "string") return;
      if (!commentId || typeof commentId !== "string") return;

      if (user && user.id) {
        await createSubcommentAction(mealId, commentId, text);

        toast({
          title: `Subcomment added`,
        });
      }
      console.log(data);
    } catch (error) {
      console.error("Error creating subcomment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={`w-full dark:bg-neutral-800 bg-slate-100 shadow-lg border-none ${
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

          <p className="text-sm dark:text-slate-300 font-semibold">
            {user.name}
          </p>
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateSubcomment(new FormData(e.currentTarget));
            }}
          >
            <Input
              placeholder="Reply..."
              name="text"
              className="w-full pr-10"
            />
            <div className="absolute right-0 top-0 h-full flex items-center">
              <button
                type="submit"
                className="mr-7 dark:text-slate-200 text-slate-600 cursor-pointer"
              >
                Send
              </button>
            </div>
            <input type="hidden" name="mealId" value={mealId} />
            <input type="hidden" name="commentId" value={id} />
          </form>
        </div>
      )}
      <div>
        {subcomments.map((subcomment) => (
          <div
            className="w-full bg-slate-200 flex items-center py-2 gap-5 mt-5 px-12 text-sm"
            key={subcomment.id}
          >
            <Image
              alt=""
              src={subcomment.profile.imageUrl}
              width={200}
              height={200}
              className="rounded-full w-10 h-10"
            />
            {subcomment.text}
          </div>
        ))}
      </div>
    </Card>
  );
}
