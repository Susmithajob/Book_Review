import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import AddBook from './components/AddBook';
import UserHome from './components/UserHome';
import EditReview from './components/EditReview';
import ViewReview from './components/ViewReview';
import UpdateInfo from './components/UpdateInfo';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/addbook" element={<AddBook />}></Route>
          <Route path="/userhome/:userId" element={<UserHome />}></Route>
          <Route path="/editreview" element={<EditReview />}></Route>
          <Route path="/viewreview" element={<ViewReview />}></Route>
          <Route path="/updateinfo/:userId" element={<UpdateInfo />}></Route>
                  
        </Routes>
      </Router>

    </div >

  );
}

export default App;
