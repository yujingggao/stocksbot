import { Card, Space, Text, Badge, Button, Group, useMantineTheme, Grid } from '@mantine/core';
import { useState, useEffect } from 'react';
import FinnHubAPI from '../api/FinnHubApi';

// api
import UserDataAPI from "../api/UserDataApi"

// components
import AddNote from './AddNote';

function UserListSummary(props) {

interface QuoteType {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}
  // state
  const [showQuote, setshowQuote] = useState(false)
  const [quote, setQuote] = useState<QuoteType>({
    c: 0,
    d: 0,
    dp: 0,
    h: 0,
    l: 0,
    o: 0,
    pc: 0,
    t: 0
  });


  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];
  
  // event handlers
  const handleDeleteUserList = async () => {
    const data = await UserDataAPI.deleteUserListById(props.stock.id) // this is to remove the data from the Django API
    if (data) {
      props.removeUserList(props.stock.id) // this is just to remove the data from the parent (nothing to do with the Django API)
    }
  }

  const getStockQuote = async (evt) => {
    evt.preventDefault() 
    const stock = props.stock.name
    const post_data = {
      stock: stock
    }
    const data = await FinnHubAPI.postStockData(post_data)
    if (data) {
      console.log("data returned: ", data)
      setQuote(data.quote)
      setshowQuote(true)
      
      
    }
    
  }

  const renderingQuote = (element, selected_size) => {
    let label = ""
    let end = ""
    let selected_color = "green"

    if (element == quote.c) {
      label = "$"
      selected_color = "cyan"
    } else if (element == quote.d && quote.d < 0) {
        selected_color = "pink"} 
      else if (element == quote.dp) {
        end = "%" 
        if (quote.dp >= 0) {
              label = "↑";
            } else {
              // label = "↓";
              selected_color = "pink"}
      } 

      
      console.log("label: ", label)
      console.log("end: ", end)
      console.log("color: ", selected_color)
      console.log("element: ", element)
      console.log("quote.dp: ", quote.dp)

    const result = label + String(element) + end

    return <Badge color={selected_color} variant="light" size={selected_size}> {result} </Badge>
    }
  



  return (
    <div style={{ width: 240, margin: 'auto' }}>
      <Card shadow="sm" p="lg">
      
        <Group position="right">
        <Button className="btn-delete" onClick={ handleDeleteUserList } variant="outline" compact radius="xs" color="gray" >x</Button>
        </Group>

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.xs }} >
        
          <Text weight={200}>{ props.stock.name }</Text>
    
          {/* <Badge color="pink" variant="light">
            {renderingQuote(quote.c, '$')}
          </Badge> */}
          {showQuote && renderingQuote(quote.c, 'lg')}
        </Group>

          
        

        <Group>
        {showQuote && renderingQuote(quote.d, 'lg')}
        {showQuote && renderingQuote(quote.dp, 'lg')}
          {/* {quote.dp} */}
        </Group>
        <Space h="lg" />
        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <AddNote fullWidth stock={props.stock}/>
          <Button fullWidth onClick={getStockQuote} variant="light" color="blue" size="xs">Get Quote</Button>
        </Group>
        
        
      </Card>
      <Space h="lg" />
    </div>

  )
  }

export default UserListSummary;