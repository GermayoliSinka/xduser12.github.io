import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Boot from './redux/boot.js';

// utilities
import PrivateRoute from './services/PrivateRoute/PrivateRoute';

// pages
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/Admin/LoginPage/LoginPage';
import MyProfilePage from './pages/Admin/MyProfilePage/MyProfilePage.jsx';
import ReduxExamplesPage from './pages/ReduxExamplesPage/ReduxExamplesPage.jsx';

const App = () => {
  let navBarMainOptions = [
    { option: 'Home', to: '/' },
    { option: 'Redux Example Page', to: '/redux-example-page' },
  ];
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
          <Route
            path="/my-profile"
            element={
              <PrivateRoute>
                <MyProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

Boot()
  .then(() => App())
  .catch((error) => console.log(error));

export default App;
