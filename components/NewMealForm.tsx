"use client";
import { createMealAction } from "@/app/actions";
import { useEdgeStore } from "@/lib/edgestore";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { experimental_useFormStatus as UseFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import IngredientsInput from "./ingredients-input";
export default function NewMealForm() {
  const [url, setUrl] = useState<{ url: string }>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isIngredientInputShown, setIsIngredientInputShown] = useState(false);
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
      if (user && user.id) {
        await createMealAction(name, description, coverImage);

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
        className="flex flex-col md:w-1/2 mt-10"
      >
        <div className="space-y-5">
          <InputComp />
          <TextAreaComp />
          <Button onClick={() => setIsIngredientInputShown(true)}>
            Add ingredient
          </Button>
          {isIngredientInputShown && <IngredientsInput />}
          <div className="flex gap-5 w-full">
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
                  const formData = new FormData(
                    formRef.current as HTMLFormElement
                  );
                  formData.append("coverImage", res.url);
                  createMeal(formData);
                } else {
                  console.error(
                    "Failed to upload image or accessUrl is missing"
                  );
                }
              }}
            />
          </div>
        </div>

        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
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
    <Button type="submit" onClick={handleClick} disabled={isLoading}>
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
      className="border"
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
      placeholder="Ingredients, cooking time, etc..."
      className="border"
      name="description"
      disabled={isLoading}
    />
  );
}
