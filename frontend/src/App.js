import './App.css';
import  {Route,Routes,BrowserRouter} from 'react-router-dom'
import Footer from './Components/Footer/Footer';
import BlogsPost from './Pages/BlogsPost';
import Navbar from './Components/Navbar/Navbar';
import UserAccount from './Pages/UserAccount';
import UserNewPost from './Pages/UserNewPost';
import LoginUser from './Pages/LoginUser';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<BlogsPost/>}/>
          <Route path='/account' element={<UserAccount/>}/>
          <Route path='/newpost' element={<UserNewPost/>}/>
          <Route path='/login' element={<LoginUser/>}/>
          
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
