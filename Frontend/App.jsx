import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import './App.css';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';

function App() {
  return (
    <>
      <Router>
      <HeaderComponent />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<ListEmployeeComponent />} />
          <Route path="/employee" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<CreateEmployeeComponent/>}/>
          <Route path="/update-employee/:id" element={<UpdateEmployeeComponent/>}></Route>
        </Routes>
      </div>
      <FooterComponent />
    </Router>
    </>
  );
}

export default App;
