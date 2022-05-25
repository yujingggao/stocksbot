import { useEffect, useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';

// api
import EditForm from './EditForm';


// router params


function EditFormModal(props) {
 

  return (
    <div style={{ width: 240, margin: 'auto' }}>
      <Modal
        opened={props.open}
        onClose={props.onclose}
        title="Notes"
      >
        <EditForm note={props.note} handleClose={props.onclose}/>
      </Modal>

    </div>

  )
  }

export default EditFormModal;