import { useEffect, useState } from "react"
import { Chips, Chip, Container, Grid, MantineProvider, Text, Button, Paper, Badge, Space, Stack, Tabs } from '@mantine/core';
import { Photo, MessageCircle, Settings } from 'tabler-icons-react';


// api
import RedditAPI from "../api/RedditApi";
import UserDataAPI from "../api/UserDataApi";
import UserListSummary from "../components/UserListSummary";

// components
import Navbar from "../components/Navbar";

function HomePage() {
// states
const [commentList, setCommentList] = useState([])
const [stockList, setStockList] = useState([])
const [stock, setStock] = useState("")
const [mylist, setMylist] = useState<any[]>([])


// useEffect
useEffect(() => {
  if (stock) {
    CommentByStock(stock)
  } 
}, [stock])

useEffect(() => {
  AllStocks()
}, [])

useEffect(() => {
  LoadUserList()
}, [])

// useEffect(() => {
//   LoadQuote()
// }, [])

// get data
const GetDataFromServer = async () => {
  const data = await RedditAPI.getAllRedditData()
  return data
}

const all_data = GetDataFromServer()

const CommentByStock = async (stock_name) => {
  const data = await all_data
  let comments = []
  comments = await data["comments"][stock_name]
  // console.log("stockcomment: ", comments)
  setCommentList(comments)
}

const AllStocks = async () => {
  const data = await all_data
  let stocks_data = []
  stocks_data = await data["stock_data"]
  // console.log("stocks: ", stocks_data)
  setStockList(stocks_data)
  return stocks_data
}

const LoadUserList = async () => {
  const data = await UserDataAPI.getAllUserList()
  setMylist(data)
}

// const LoadQuote = async () => {
//   const data = await FinnHubApi('TSLA')
//   console.log(data)
//   // setQuote(data)
// }

// event handlers
const handleAddtoList = async (evt) => {
  evt.preventDefault() // prevent refreshing a page(default behavior)
  const stock_name = stock
  console.log("stock_name in handleAddtoList: ", stock_name)

  // extract input data from user's form
  const UserListData = {
    name: stock_name
  }

  console.log("SENDING task list data:", UserListData)

  // send data to API calls, wait for it to response
  const data = await UserDataAPI.createUserList(UserListData)
  if (data) {
    const new_data = await UserDataAPI.getAllUserList()
    console.log(new_data)
    setMylist(new_data)
    console.log("RECEIVED data: ", data)
  }
}

// remove stock from UserList
const removeUserList = (deletedUserListId) => {
  // loadTaskLists()
  const newUserLists = mylist.filter((userList) => {
    return userList.id !== deletedUserListId
  })
  setMylist(newUserLists)
}


// render
const renderUserList = () => {
  return mylist.map((stock) => {
    return <UserListSummary stock={stock} removeUserList={removeUserList}/>
    
  })
}

// final render
return (
  
  <div>
    <Container size="xl">

    
      <Grid columns={24} gutter="xl">

        <Grid.Col span={5}>
          { renderUserList() }
        </Grid.Col>

        <Grid.Col span={14}>

        {commentList.map((stock_comment) => (
          <div className="comment-list">
            <Paper shadow="md" p="md" 
              style={{ marginTop: 10 }}
              radius="xs"
              sx={(theme) => ({
                backgroundColor: theme.colors.gray[8],
                '&:hover': {
                  backgroundColor: theme.colors.gray[7],
                },
              })}
            >
              {<Text color="#ADB5BD" size="xl">{ stock_comment }</Text>}
            </Paper>
          </div>
        ))}

        </Grid.Col>

        <Grid.Col span={5}>
          <MantineProvider theme= {{
            fontSizes: { md: 15 },
            colorScheme: 'dark'
          }}> 
            <Text>Today's List</Text>
            
            {stockList.map((stocks) => (
            <Stack spacing="xs">

              <Grid columns={6} >
              <Grid.Col span={4}>
                <Chips value={stock} onChange={setStock} multiple={false} variant="filled" color="lime" direction="column" size="md" spacing="lg" >
                  <Chip value={stocks["Stock"]}> 
                    {stocks["Stock"]+" ("+stocks["Count"]+")"}
                  </Chip>
                </Chips>
              </Grid.Col>
              <Grid.Col span={2}>
              <Button variant="subtle" color="teal" compact onClick={handleAddtoList} >
              +
              </Button>
              </Grid.Col>
              </Grid>
              <Paper>
                <Badge color="red">{stocks["Bearish"]}</Badge>
                <Badge color="indigo">{stocks["Neutral"]}</Badge>
                <Badge color="green">{stocks["Bullish"]}</Badge>
              </Paper>
              
              <Space h="xs" />
            </Stack>
            
            ))}
            
          </MantineProvider>

      </Grid.Col>
      </Grid>
    </Container>
  </div>
)
}

export default HomePage;