import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Pagination from './../../components/PostListComp/Pagination';
import './../../assets/scss/stylePages/PostList.css';
import UserFilter from './../../components/PostListComp/UserFilter';
import PostCarousel from '../../components/PostListComp/PostCarrusel';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const PostList = ({ postsPerPage }) => {
    const [posts, setPosts] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [highlightedTerm, setHighlightedTerm] = useState('');
    const [userPage, setUserPage] = useState(1);
    const [showNoResultsModal, setShowNoResultsModal] = useState(false);
    const usersPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsResponse, photosResponse, usersResponse, commentsResponse] = await Promise.all([
                    fetch('https://jsonplaceholder.typicode.com/posts'),
                    fetch('https://jsonplaceholder.typicode.com/photos'),
                    fetch('https://jsonplaceholder.typicode.com/users'),
                    fetch('https://jsonplaceholder.typicode.com/comments')
                ]);
                const [postsData, photosData, usersData, commentsData] = await Promise.all([
                    postsResponse.json(),
                    photosResponse.json(),
                    usersResponse.json(),
                    commentsResponse.json()
                ]);
                setPosts(postsData);
                setPhotos(photosData);
                setUsers(usersData);
                setComments(commentsData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const getPhotoForPost = (postId) => {
        return photos.find(photo => photo.albumId === postId);
    };

    const getCommentCountForPost = (postId) => {
        return comments.filter(comment => comment.postId === postId).length;
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
        setShowNoResultsModal(false);
    };

    const handleUserChange = (userId) => {
        setSelectedUser(userId);
        setCurrentPage(1);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setHighlightedTerm(searchTerm);
        setSearchTerm(''); // Borra el término de búsqueda después de presionar Enter
        setCurrentPage(1);

        if (filteredPosts.length === 0) {
            setShowNoResultsModal(true);
        }
    };

    const handleCardClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    const handleUserPageChange = (direction) => {
        if (direction === 'prev' && userPage > 1) {
            setUserPage(userPage - 1);
        } else if (direction === 'next' && (userPage * usersPerPage) < users.length) {
            setUserPage(userPage + 1);
        }
    };

    const handleCloseModal = () => setShowNoResultsModal(false);

    return (
        <div className="container-fluid p-0">
            <PostCarousel
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
            />

            <h3 className='mt-3 text-center'>Filtrar Usuario</h3>
            <div className="container pb-3">
                <UserFilter
                    users={users}
                    selectedUser={selectedUser}
                    userPage={userPage}
                    usersPerPage={usersPerPage}
                    handleUserChange={handleUserChange}
                    handleUserPageChange={handleUserPageChange}
                />

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
                        const commentCount = getCommentCountForPost(post.id);

                        return (
                            <div className="col" key={post.id}>
                                <div className="card shadow-sm" onClick={() => handleCardClick(post.id)}>
                                    {photo && <img src={photo.url} className="card-img-top" alt={photo.title} />}
                                    <div className="card-body">
                                        <h5 className="card-title" dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
                                        <p className="card-text" dangerouslySetInnerHTML={{ __html: highlightedBody }} />
                                    </div>
                                    {commentCount > 0 && (
                                        <div className="comment-count">
                                            {commentCount} Comentario{commentCount > 1 ? 's' : ''}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Modal show={showNoResultsModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>No se encontraron resultados</Modal.Title>
                </Modal.Header>
                <Modal.Body>No hay publicaciones :/ </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

PostList.propTypes = {
    postsPerPage: PropTypes.number.isRequired,
};

export default PostList;
