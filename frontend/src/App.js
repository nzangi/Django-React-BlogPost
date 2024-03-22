import './App.css';
import  {Route,Routes,BrowserRouter,Navigate} from 'react-router-dom'
import Footer from './Components/Footer/Footer';
import BlogsPost from './Pages/BlogsPost';
import Navbar from './Components/Navbar/Navbar';
import UserAccount from './Pages/UserAccount';
import UserNewPost from './Pages/UserNewPost';
import LoginUser from './Pages/LoginUser';
import RegisterUser from './Pages/RegisterUser';
import LogoutUser from './Pages/LogoutUser';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<LoginUser/>}/>
          <Route path='/home' element={<BlogsPost/>}/>
          <Route path='/account' element={<UserAccount/>}/>
          <Route path='/newpost' element={<UserNewPost/>}/>
          <Route path='/register' element={<RegisterUser/>}/>
          <Route path='/logout' element={<LogoutUser/>}/>

        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
