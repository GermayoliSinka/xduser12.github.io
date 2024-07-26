
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components
import PostDetails from './components/PostListComp/PostDetail.jsx';
import PostList from './pages/PostList/PostList.jsx';
import Navbar from './components/NavBar/NavBar.jsx';
import Footer from './components/FooterPage/FooterPage.jsx';

const App = () => {

  return (
    <Router>
        <Navbar /> 
        <Routes>
            <Route path="/" element={<PostList postsPerPage={10} />} />
            <Route path="/post/:postId" element={<PostDetails />} />
        </Routes>
        <Footer/>
    </Router>
  );
};

export default App;
