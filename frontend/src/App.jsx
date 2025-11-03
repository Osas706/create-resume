import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import CreateResume from './pages/CreateResume';
import Preview from './pages/Preview';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/view/:resumeId' element={<Preview />} /> 

        <Route path='/app' element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path='/app/create-resume/:resumeId' element={<CreateResume />} />
        </Route>

        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
