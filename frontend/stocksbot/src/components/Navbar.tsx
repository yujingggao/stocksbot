import logo from './Logo.png'
import '../App.css'

import {
  Container,
  Group,
  Header as MantineHeader,
  Space,
  Text,
  Anchor,
  MantineProvider
} from "@mantine/core";
import headerStyle from "../styles/header_styles";



function Navbar() {
  // const [active, setActive] = useState<string>();
  const { classes } = headerStyle();

  return(
    
   <MantineHeader height={110} mb={20} className={classes.root} >
      <Container className={classes.header}>

        <Anchor href="/" >
          <Group>
            <img
              src={logo}
              alt="Logo"
              height={100}
              width={100}
            />
            <Text weight={800} variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} >Track Trending Stocks</Text>
          </Group>
        </Anchor>
        <Anchor href="/notes/#/notes/" className={classes.link}>
        <Group spacing={5} className={classes.links}>
          {/* {items} */}
          <Text color='#d5d7e0'>Notes</Text>
          <Space w={5} />
        </Group>
        </Anchor>
      </Container>
    </MantineHeader>
    
   )
}

export default Navbar;

