import { useEffect, useState } from "react";
import { Text, Container, SimpleGrid } from '@mantine/core';
import UserDataAPI from "../api/UserDataApi";

// componenets
import NoteListSummary from "../components/NoteListSummary";



function NotePage() {

  // states
  const [noteList, setNoteList] = useState<any[]>([])

  // useEffect
  useEffect(() => {
    LoadNoteList()
  },[])

  const LoadNoteList = async () => {
    const data = await UserDataAPI.getAllNotes()
    console.log("all notes: ", data)
    setNoteList(data)
  }

  const removeNoteList = (deletedNoteId) => {
    const newNoteList = noteList.filter((List) => {
      return List.id !== deletedNoteId
    })
    setNoteList(newNoteList)
  }

  // render
  const renderNoteList = () => {
   
    return noteList.map((note) => {
        return <NoteListSummary note={note} removeNoteList={removeNoteList} LoadNoteList={LoadNoteList}/>   
    })
  }

  return (
    <div>
      <Container size = "xl">
        <Text>My Notes</Text>
      
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: 'md' },
          { maxWidth: 755, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        {renderNoteList()}
        </SimpleGrid>
    
      </Container>
    </div>

  )
}

export default NotePage;