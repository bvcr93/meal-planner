"use client";
import { updateMealAction } from "@/app/actions";
import "froala-editor//js/plugins/lists.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/save.min.js";
import { revalidatePath } from "next/cache";
import { useRef, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface RecipeEditorProps {
  meal: Meal | null;
  name: string | undefined;
  description: string | undefined;
}
export default function RecipeEditor({
  meal,
  name,
  description,
}: RecipeEditorProps) {
  const { toast } = useToast();
  const [editorContent, setEditorContent] = useState("");
  const [model, setModel] = useState<string>(() => {
    return meal?.description || localStorage.getItem("meal") || "";
  });
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedName, setEditedName] = useState(name);
  const [termporaryName, setTemporaryName] = useState(name);
  const formRef = useRef<HTMLFormElement>(null);
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
  const handleSaveClick = async () => {
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
      } else {
        console.error("Required data is missing or undefined.");
      }
    } catch (error) {
      console.error("Error updating meal:", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <form action={action} className="mt-20">
      <input
        className="w-full border rounded-full shadow-xl p-3 outline-none"
        type="text"
        value={editedName || ""}
        onChange={(e) => setEditedName(e.target.value)}
      />

      <textarea
        name="content"
        style={{ display: "none" }}
        value={editorContent}
        readOnly
      ></textarea>
      <div className="mt-10">
   
        
          <FroalaEditor
            model={model}
            onModelChange={(content: string) => {
              setModel(content);
              setEditorContent(content);
            }}
            config={{
              placeholderText: "Edit Your Content Here!",
              charCounterCount: true,
              charCounterMax: 1000,
              saveInterval: 2000,

              events: {
                "charCounter.exceeded": function () {
                  alert("maximum limit reached, buy premium version");
                },
                "save.before": function (html: string) {
                  localStorage.setItem("meal", html);
                },
              },
            }}
            tag="textarea"
          />
  
      </div>
      <Button className="mt-5" onClick={handleSaveClick} type="submit">
        Save
      </Button>
    </form>
  );
}
