"use client";
import { createMealAction } from "@/app/actions";
import { useEdgeStore } from "@/lib/edgestore";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { experimental_useFormStatus as UseFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";


export default function NewMealForm() {
  const [url, setUrl] = useState<{ url: string }>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const { toast } = useToast();
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function createMeal(data: FormData) {
    try {
      const name = data.get("name");
      const description = data.get("description");
      const coverImage = data.get("coverImage");

      if (!name || typeof name !== "string") return;
      if (!description || typeof description !== "string") return;
      if (!coverImage || typeof coverImage !== "string") return;
      const cookingTime = data.get("cookingTime");
      const cookingTimeNumber = parseInt(cookingTime as string);
      if (!cookingTime || isNaN(cookingTimeNumber)) return;
      console.log(cookingTimeNumber);
      if (user && user.id) {
        await createMealAction(
          name,
          description,
          coverImage,
          cookingTimeNumber
        );

        toast({
          title: `Meal created : ${name}`,
        });
        router.push("/recipes");
      }

      formRef.current?.reset();
    } catch (error) {
      console.error("Error creating meal:", error);
    } finally {
    }
  }

  return (
    <>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          createMeal(formData);
        }}
        className="flex flex-col w-full mt-10"
      >
        <div className="space-y-5">
          <InputComp />
          <TextAreaComp />
          <h1>Select cooking time</h1>
          <div className="flex gap-5 w-full">
            <select
              name="cookingTime"
              className="w-full md:w-1/2 py-2 px-4 border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
              <option value="20">20 minutes</option>
              <option value="25">25 minutes</option>
            </select>
          </div>
        </div>
        <h2 className="mt-5">Select an image</h2>
        <Input
          className="mt-5"
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
        <SubmitButton
          isLoading={isLoading}
          file={file}
          onUpload={async (selectedFile) => {
            setIsLoading(true);
            const res = await edgestore.publicFiles.upload({
              file: selectedFile,
            });
            if (res && res.url) {
              setUrl({ url: res.url });
              setImageUrl(res.url);
              const formData = new FormData(formRef.current as HTMLFormElement);
              formData.append("coverImage", res.url);
              createMeal(formData);
            } else {
              console.error("Failed to upload image or accessUrl is missing");
            }
          }}
        />
      </form>

      {/* {url?.url && <Link href={url.url}>{url.url}</Link>} */}
    </>
  );
}

interface SubmitButtonProps {
  file?: File;
  isLoading: boolean;
  onUpload: (file: File) => Promise<void>;
}

function SubmitButton({ file, onUpload, isLoading }: SubmitButtonProps) {
  const handleClick = async () => {
    if (file) {
      await onUpload(file);
    }
  };

  return (
    <Button
      type="submit"
      className="md:w-1/2 mt-10"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? "Creating..." : "Add meal"}
    </Button>
  );
}

function InputComp() {
  const data = UseFormStatus();
  const isLoading = data.pending;
  return (
    <Input
      type="text"
      placeholder="Name"
      className="border rounded-full md:w-1/2"
      name="name"
      disabled={isLoading}
    />
  );
}

function TextAreaComp() {
  const data = UseFormStatus();
  const isLoading = data.pending;
  return (
    <Textarea
      placeholder="Describe your meal"
      className="border md:w-1/2"
      name="description"
      disabled={isLoading}
    />
  );
}
