import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import WritePost from './Components/WritePost';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ViewPost from './Pages/ViewPost';
import { DataProvider } from './Context/ContextApi';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/post/:postid' element={<ViewPost />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/writeblog' element={<WritePost />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
