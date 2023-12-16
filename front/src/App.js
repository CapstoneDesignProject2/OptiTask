import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Join from './Pages/Join';
import Login from './Pages/Login';
import Mypage from './Pages/Mypage';
import ProjectCreate from "./Pages/ProjectCreate";
import WeeklyReport from './Pages/WeeklyReport';
import Project from "./Pages/project";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/Mypage" element={<Mypage />} />
      <Route path="/ProjectCreate" element={<ProjectCreate />} />
      <Route path="/Project/:projectId" element={<Project />} />
      <Route path="/WeeklyReport/:projectId" element={<WeeklyReport />} />
    </Routes>
  );
}

export default App;
