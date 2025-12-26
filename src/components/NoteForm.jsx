import { useState } from "react";
import api from "../api/axios";

export default function NoteForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async () => {
    await api.post("/notes", { title, content });
    setTitle("");
    setContent("");
    refresh();
  };

  return (
    <div>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={submit}>Add Note</button>
    </div>
  );
}
