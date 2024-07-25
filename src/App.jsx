import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components
import PostDetails from './components/PostListComp/PostDetail.jsx';
import PostList from './pages/PostList/PostList.jsx';

const App = () => {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<PostList/>} />
            <Route path="/post/:postId" element={<PostDetails />} />
        </Routes>
    </Router>
  );
};

export default App;
