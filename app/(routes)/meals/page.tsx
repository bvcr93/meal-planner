"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const processHTML = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.innerHTML || "";
};

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

export default function MealsPage() {
  const [value, setValue] = useState("");
  const [formattedText, setFormattedText] = useState("");

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleCreateMeal = () => {
    setFormattedText(processHTML(value));
  };

  return (
    <div className="maincol mt-20">
      <div className="w-full flex flex-col items-center justify-start">
        <div className="my-5 w-1/2 mx-auto">
          <Input className=" " placeholder="Meal title..."/>
        </div>
        <div className="w-1/2 mx-auto">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={handleChange}
            modules={modules}
            formats={formats}
          />
        </div>
        <div id="preview" className="w-1/2 mt-10">
          {formattedText && (
            <div dangerouslySetInnerHTML={{ __html: formattedText }} />
          )}
        </div>
        <div className="flex items-start w-1/2 mx-auto">
          <Button onClick={handleCreateMeal}>Create Meal</Button>
        </div>
      </div>
    </div>
  );
}
