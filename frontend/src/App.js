import './App.css';
import Nav from './components/nav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './components/signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import ProfilePage from './components/Profilepage';

function App() {
  return (
    <div className="App ">
      <div className='App-header'>
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />}>
        <Route path='/' element={<ProfilePage/>} />
        <Route path='/logout' element={<h1>Logout Listing Component</h1>} />
        </Route>
        <Route path='/login' element={< Login />}/>
        <Route path='/register' element={< SignUp />}/>
      </Routes>
      </BrowserRouter>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default App;