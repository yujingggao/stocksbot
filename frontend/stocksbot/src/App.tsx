import { MantineProvider, LoadingOverlay} from '@mantine/core';
import { HashRouter, Routes, Route, Link } from "react-router-dom"
import { Tabs } from '@mantine/core';

// pages
import HomePage from './pages/HomePage';
import NotePage from './pages/NotePage';
import { Container } from 'tabler-icons-react';
import Navbar from './components/Navbar';



function App() {

  
  return (
    <div className="App">
      <MantineProvider theme= {{
        fontFamily: "Open Sans",
        fontSizes: { md: 30 },
        radius: { sm: 12 },
        loader: "bars",
        colorScheme: 'dark'
      }} withGlobalStyles
      >

      <Navbar />


      <HashRouter>
        <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/notes/" element={ <NotePage /> } />
        </Routes>
      </HashRouter>
        
        
      </MantineProvider>
    </div>
  );
}

export default App;
