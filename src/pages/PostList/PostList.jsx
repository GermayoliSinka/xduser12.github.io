import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Pagination from './../../components/PostListComp/Pagination';
import './../../assets/scss/stylePages/PostList.css';
import PostCarrusel from '../../components/PostListComp/PostCarrusel';

const PostList = ({ postsPerPage }) => {
    const [posts, setPosts] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [highlightedTerm, setHighlightedTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [postsResponse, photosResponse, usersResponse] = await Promise.all([
                    fetch('https://jsonplaceholder.typicode.com/posts'),
                    fetch('https://jsonplaceholder.typicode.com/photos'),
                    fetch('https://jsonplaceholder.typicode.com/users')
                ]);
                const [postsData, photosData, usersData] = await Promise.all([
                    postsResponse.json(),
                    photosResponse.json(),
                    usersResponse.json()
                ]);
                setPosts(postsData);
                setPhotos(photosData);
                setUsers(usersData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const getPhotoForPost = (postId) => {
        return photos.find(photo => photo.albumId === postId);
    };

    const highlightText = (text, term) => {
        if (!term.trim()) return text;
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    };

    const filteredPosts = posts
        .filter(post => 
            (selectedUser ? post.userId.toString() === selectedUser : true) &&
            (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            post.body.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setHighlightedTerm(searchTerm);
        setSearchTerm('');
        setCurrentPage(1);
    };

    const handleCardClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className="container p-5">
            <div className="text-center mb-4">
                <PostCarrusel/>
                <form onSubmit={handleSearchSubmit} className="d-flex justify-content-center align-items-center">
                    <button type="submit" className="btn btn-outline-secondary">
                        <i className="bi bi-search"></i>
                    </button>
                    <input 
                        type="text" 
                        className="form-control me-2" 
                        style={{ maxWidth: '300px' }} 
                        placeholder="Buscar por título o contenido" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                    />
                    <select 
                        className="form-select me-2" 
                        style={{ maxWidth: '200px' }}
                        value={selectedUser}
                        onChange={handleUserChange}
                    >
                        <option value="">Todos los usuarios</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id.toString()}>{user.name}</option>
                        ))}
                    </select>
                </form>
            </div>

            <div className="d-flex justify-content-center mb-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4">
                {paginatedPosts.map(post => {
                    const photo = getPhotoForPost(post.id);
                    const highlightedTitle = highlightText(post.title, highlightedTerm);
                    const highlightedBody = highlightText(post.body, highlightedTerm);
                    return (
                        <div className="col" key={post.id}>
                            <div className="card shadow-sm" onClick={() => handleCardClick(post.id)}>
                                {photo && <img src={photo.url} className="card-img-top" alt={photo.title} />}
                                <div className="card-body">
                                    <h5 className="card-title" dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
                                    <p className="card-text" dangerouslySetInnerHTML={{ __html: highlightedBody }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

PostList.propTypes = {
    postsPerPage: PropTypes.number.isRequired,
};

export default PostList;