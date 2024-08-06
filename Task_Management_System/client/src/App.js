import logo from './logo.svg';
import './App.css';
import SignInSide from './Components/Pages/LoginPage/Login';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignUp from './Components/Pages/Register/Register';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Home from './Components/Pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }></Route>
          <Route path="/login" element={<SignInSide/>}></Route>
          <Route path="/register" element={<SignUp/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
