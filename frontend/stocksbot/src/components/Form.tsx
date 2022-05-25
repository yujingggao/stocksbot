import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Box, Group } from '@mantine/core';
import UserDataAPI from '../api/UserDataApi';
import { useNavigate } from 'react-router-dom';



function Form(props) {
  // router params
  const navigate = useNavigate()

  const schema = z.object({
    // stock: z.number().min(1, { message: 'title should have at least 1 letters' }),
    title: z.string().min(5, { message: 'title should have at least 1 letters' }),
    content: z.string().min(5, { message: 'content should have at least 1 letters' })
  });

  // event handlers
  const handleAddNote = async (evt) => {
    evt.preventDefault()

    const UserNote = {
      stock: props.stock.id, // match backend model
      title: evt.target.elements["title"].value,
      content: evt.target.elements["content"].value
    }


    console.log("SENDING notes:", UserNote)
    const data = await UserDataAPI.createNotes(UserNote)
    if (data) {
      console.log("RECEIVED note: ", data)
      navigate(`/notes/`)
    }
    
  }

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={handleAddNote}>
        <TextInput
          required
          defaultValue={props.stock.name}
          // disabled=true 
          label="Stock"
          name="stock"
        />
        <TextInput
          required
          label="Title"
          name="title"
          placeholder="Enter your title here..."
          mt="sm"
        />
        <TextInput
          required
          label="Content"
          name="content"
          placeholder="Enter your content here..."
          mt="sm"
        />

        <Group position="right" mt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default Form;