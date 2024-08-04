import logo from './logo.svg';
import './App.css';
import SignInSide from './Components/Pages/LoginPage/Login';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignUp from './Components/Pages/Register/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<SignInSide/>}></Route>
          <Route path="/register" element={<SignUp/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
