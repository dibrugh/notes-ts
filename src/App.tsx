import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./NewNote";
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

/* add id to an existing NoteData type */
export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
}

export type Tag = {
  id: string;
  label: string;
}

// for Local Storage
export type RawNote = {
  id: string;
}

export type RawNoteData = {
  title: string;
  markdown: string;
  /* instead of tags we'll have ids */
  tagIds: string[];
}

function App() {
  /* Store notes and tags in LocalStorage */
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
	return (
    /* Bootstrap component */
		<Container className="my-4">
			<Routes>
				<Route path="/" element={<h1>Home</h1>} />
				<Route path="/new" element={<NewNote />} />
				<Route path="/:id">
					<Route index element={<h1>Show</h1>} />
					<Route path="edit" element={<h1>Edit</h1>} />
				</Route>
				{/* matches everything, redirects to the set page (i.e home) */}
				<Route path="*" element={<Navigate to={"/"} />}></Route>
			</Routes>
		</Container>
	);
}
export default App;
