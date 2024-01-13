"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Profile } from "@prisma/client";
import { Trash } from "lucide-react";
import Image from "next/image";

interface CommentProps {
  text: string;
  user: Profile;
  createdAt: Date;
}
export default function CommentSection({
  text,
  user,
  createdAt,
}: CommentProps) {
  return (
    <Card className="w-full bg-neutral-800 border-none">
      <CardHeader>
        <CardDescription className="w-full flex justify-between items-center">
          <div>{text}</div>
          <div className="font-light text-sm">{createdAt.toLocaleString()}</div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-5">
          <Image
            width={40}
            height={40}
            alt=""
            src={user.imageUrl}
            className="object-cover rounded-full"
          />

          <p className="text-sm text-slate-300 font-semibold">{user.name}</p>
        </div>
        <div>
          <Trash size={20} className="text-slate-200 cursor-pointer" />
        </div>
      </CardFooter>
    </Card>
  );
}
