import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Boot from './redux/boot.js';

// pages
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/Admin/LoginPage/LoginPage';
import ReduxExamplesPage from './pages/ReduxExamplesPage/ReduxExamplesPage.jsx';

const App = () => {
  let navBarMainOptions = [{ option: 'Home', to: '/' }];
  let navBarRightOptions = [
    { option: 'My Profile', to: '/my-profile', displayIfLoggedIn: true },
    { option: 'Login', to: '/login', displayIfLoggedIn: false },
    { option: 'Logout', to: '/logout', displayIfLoggedIn: true },
  ];

  return (
    <BrowserRouter>
      <NavBar main={navBarMainOptions} right={navBarRightOptions}></NavBar>
      <div className="App">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/redux-example-page" element={<ReduxExamplesPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

Boot()
  .then(() => App())
  .catch((error) => console.log(error));

export default App;
