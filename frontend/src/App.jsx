import { Button, Container } from "@chakra-ui/react"
import {Route,Routes} from 'react-router-dom'
import UserPage from './pages/userpage'
import PostPage from './pages/PostPage'
import HomePage from "./pages/HomePage"
import AuthPage from './pages/AuthPage'
import Header from "./components/Header"
function App() {
  return (
    <Container maxW="620px">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path = "/:username" element={<UserPage/>}/>
        <Route path = "/:username/post/:pid" element={<PostPage/>}/>

      </Routes>
    </Container>
  );
}

export default App