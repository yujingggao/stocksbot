import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';

// api
import Form from './Form';


// router params


function AddNote(props) {
 
  const [opened, setOpened] = useState(false);

  return (
    <div style={{ width: 240 }}>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Notes"
      >
        <Form stock={props.stock}/>
      </Modal>

      <Group position="right">
        <Button onClick={() => setOpened(true)} fullWidth variant="light" color="blue" size="xs" >Add notes</Button>
      </Group>
    </div>

  )
  }

export default AddNote;