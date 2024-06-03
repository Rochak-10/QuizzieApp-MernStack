import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import LoginSignUp from './components/LoginSignup/LoginSignUp';
import Home from './components/Home/Home';
import Result from './components/Cards/Result';
import Playquiz from './components/Quiz/Playquiz';
import Pollresult from './components/Cards/Pollresult';



function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<LoginSignUp/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/result' element={<Result/>}></Route>
          <Route path='/poll' element={<Pollresult/>}></Route>
          <Route path='/playQuiz/:id' element={<Playquiz/>}></Route>
          <Route path='/Poll/:id' element={<Playquiz/>}></Route>
        </Routes>
        <Toaster />
    </Router>
  );
}

export default App;
