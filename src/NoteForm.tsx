import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

const NoteForm = ({ onSubmit, onAddTag, availableTags }: NoteFormProps) => {
	/* get info to submit on another page */
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);

	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

	const handleSubmit = (e: FormEvent) => {
		/* turn off reloading */
		e.preventDefault();

		onSubmit({
			/* ! means that value never could be null, so by ! we force them not to be null  */
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: [],
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							{/* Required field */}
							<Form.Control ref={titleRef} required />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Tags</Form.Label>
							{/* Select list where u can write and add new option */}
							<CreatableReactSelect
								onCreateOption={(label) => {
									const newTag = { id: uuidV4(), label };
									onAddTag(newTag);
									setSelectedTags((prev) => [...prev, newTag]);
								}}
								value={selectedTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								/* we take availableTags and convert to the proper format */
								options={availableTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								/* converting from value to id */
								onChange={(tags) => {
									setSelectedTags(
										tags.map((tag) => {
											return { label: tag.label, id: tag.value };
										})
									);
								}}
								isMulti
							/>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					{/* Required textarea field */}
					<Form.Control ref={markdownRef} required as="textarea" rows={15} />
				</Form.Group>
				{/* stack of buttons */}
				<Stack direction="horizontal" gap={2} className="justify-content-end">
					<Button type="submit" variant="primary">
						Save
					</Button>
					{/* Redirect of cancel btn */}
					<Link to="..">
						<Button type="button" variant="outline-secondary">
							Cancel
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	);
};

export default NoteForm;
