import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Join from './Pages/Join';
import Forum from './Pages/Forum';
import Mypage from './Pages/Mypage';
import PurposeCreate from './Pages/PurposeCreate';

const App = () => {
  return (
    <Routes>
      <Route path="/"element={<Home />} />
      <Route path="/login"element={<Login />} />
      <Route path="/join"element={<Join />} />
      <Route path="/Forum"element={<Forum />} />
      <Route path="/Mypage"element={<Mypage />} />
      <Route path="/PurposeCreate"element={<PurposeCreate />} />
    </Routes>
  );
}

export default App;
