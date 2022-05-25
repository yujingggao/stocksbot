import { z } from 'zod';
import { TextInput, Button, Box, Group } from '@mantine/core';
import UserDataAPI from '../api/UserDataApi';
import { useState } from 'react';



function EditForm(props) {
  // router params
  // const navigate = useNavigate()
  // states

  const id = props.note.id
  const stock_id = props.note.stock
  const [newTitle, setnewTitle] = useState(props.note.title)
  const [newContent, setnewContent] = useState(props.note.content)

  const schema = z.object({
    title: z.string().min(5, { message: 'title should have at least 1 letters' }),
    content: z.string().min(5, { message: 'content should have at least 1 letters' })
  });

  // event handlers
  const handleUpdateNote = async (evt) => {
    evt.preventDefault()

    const UserNote = {
      id: props.note.id,
      stock: stock_id,
      title: newTitle,
      content: newContent,
    }

    console.log("SENDING notes:", UserNote)
    const data = await UserDataAPI.updateNoteById(id, UserNote)
    if (data) {
      console.log("RECEIVED note: ", data)
    } 
  }

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={handleUpdateNote}>

        <TextInput
          required
          label="Title"
          name="title"
          value={newTitle}
          onChange={(e) => {setnewTitle(e.target.value)}}
          mt="sm"
        />

        <TextInput
          required
          label="Content"
          name="content"
          value={newContent}
          onChange={(e) => {setnewContent(e.target.value)}}
          mt="sm"
        />

        <Group position="right" mt="xl">
          <Button type="submit" onClick={props.handleClose}>Update</Button>
        </Group>
      </form>
    </Box>
  );
}

export default EditForm;