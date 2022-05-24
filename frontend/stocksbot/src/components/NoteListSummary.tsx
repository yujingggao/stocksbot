import {  Text, Space, Card, Group, Badge, useMantineTheme, Menu, Modal } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from "react";
import { Trash, Edit } from 'tabler-icons-react';

// api
import UserDataAPI from "../api/UserDataApi";
import EditFormModal from "./EditFormModal";


function NoteListSummary(props) {

  // style
  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

  // state
  const [opened, handlers] = useDisclosure(false);
  const [showModal, setShowModal] = useState(false);

  

  // event handlers
  const handleDeleteNoteList = async () => {
    const data = await UserDataAPI.deleteNoteById(props.note.id)
    // this is to remove the data from the Django API
    if (data) {
      props.removeNoteList(props.note.id)
      // this is just to remove the data from the parent (nothing to do with the Django API)
    }
  }

  return (
    <div>
      
      
       <Card shadow="sm" p="lg">

         <Group position="right">

         <Menu opened={opened} onOpen={handlers.open} onClose={handlers.close}>
          <Menu.Label>Menu</Menu.Label>
          <Menu.Item
              icon={<Edit size={14} />}
              onClick={ () => {setShowModal(true)} }
              rightSection={
                <Text size="sm" color="gray">
                  ⌘E
                </Text>
                }
              >
                Edit
              </Menu.Item>
          <Menu.Item
              color="red"
              icon={<Trash size={14} />}
              onClick={ handleDeleteNoteList }
              rightSection={
                <Text size="sm" color="gray">
                  ⌘D
                </Text>
                }
              >
                Delete Note
              </Menu.Item>
        </Menu>
        
         </Group>
        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500} key={props.note.id}>{props.note.title}</Text>
          <Badge color="pink" variant="light">
            {props.note.created_date}
          </Badge>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }} key={props.note.id}>
          {props.note.content}
        </Text>

        <EditFormModal note={props.note} open={showModal} onclose={() => {setShowModal(false)}}/>

      </Card>
    <Space h="lg" />
    </div>
  )
}

export default NoteListSummary;