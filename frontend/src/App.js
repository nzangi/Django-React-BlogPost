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
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import BlogDetail from './Pages/BlogDetail';
import EditPost from './Components/EditPost/EditPost';
import DeletePost from './Components/BlogDetails/DeletePost/DeletePost';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<LoginUser/>}/>
          <Route path='/posts' element={<BlogsPost/>}/>
          <Route path='/post/:postId' element={<BlogDetail/>}/>
          <Route path='/post/editpost/:postId' element={<EditPost/>}/>
          <Route path='/post/deletepost/:postId' element={<DeletePost/>}/>
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
