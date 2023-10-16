"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, useRef } from "react";
import { updateMealAction } from "@/app/actions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { revalidatePath } from "next/cache";
interface RecipeEditorProps {
  meal: Meal | null;
  name: string | undefined;
  description: string | undefined;
}
export default function QuillEditor({
  meal,
  name,
  description,
}: RecipeEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedName, setEditedName] = useState(name);
  const [termporaryName, setTemporaryName] = useState(name);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  const [value, setValue] = useState<string>(() => {
    return meal?.description || localStorage.getItem("meal") || "";
  });

  const [formattedText, setFormattedText] = useState("");
  console.log(editedDescription);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setEditorContent(newValue);
    setFormattedText(newValue);
  };

  const handleSaveClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (editedName) {
      formData.append("name", editedName);
    }
    if (editorContent) {
      formData.append("description", editorContent);
    }

    try {
      if (meal?.id && editedName && editedDescription) {
        console.log("Edited Name:", editedName);
        console.log("Edited Description:", editedDescription);
        await updateMealAction(meal.id, editedName, editorContent, isEditing);
        setIsEditing(false);
        setEditedName(termporaryName);
        revalidatePath("/recipes");
        toast({
          description: editedDescription,
        });
      } else {
        console.error("Required data is missing or undefined.");
      }
    } catch (error) {
      console.error("Error updating meal:", error);
    } finally {
      router.refresh();
    }
  };

  async function action(data: FormData) {
    const name = data.get("name") as string;
    const description = data.get("description") as string;

    if (!name || !description || !meal?.id) {
      return;
    }
    if (editedName && editedDescription) {
      await updateMealAction(meal.id, editedName, editedDescription, isEditing);
      toast({
        description: editedDescription,
      });
    } else {
      console.error("Required data is missing or undefined.");
    }

    formRef.current?.reset();
  }
  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        ["link", "image"],
      ],
    },
  };

  const formats = [
    "header",
    "font",
    "list",
    "bullet",
    "bold",
    "italic",
    "underline",
    "link",
    "image",
  ];
  return (
    <div className="maincol h-screen">
      <div className="w-full flex flex-col items-center justify-start">
        <form action={action}>
          <Input
            className="w-full border shadow-xl p-2 outline-none my-4"
            type="text"
            value={editedName || ""}
            onChange={(e) => setEditedName(e.target.value)}
            name="name"
          />

          <textarea
            name="description"
            style={{ display: "none" }}
            value={editorContent}
            readOnly
          ></textarea>

          <ReactQuill
            theme="snow"
            value={value}
            onChange={handleChange}
            modules={modules}
            formats={formats}
          />
        </form>
        <div className="flex items-start w-1/2 mx-auto">
          <Button className="mt-5" onClick={handleSaveClick} type="submit">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
