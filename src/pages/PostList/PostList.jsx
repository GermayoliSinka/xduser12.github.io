import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Exception } from 'sass';

const PostList = ({ postsPerPage }) => {
    const [posts, setPosts] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [visiblePost, setVisiblePost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostsAndPhotos = async () => {
            try {
                const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
                const postsData = await postsResponse.json();
                setPosts(postsData);

                // Obtener fotos relacionadas
                const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
                const photosData = await photosResponse.json();
                setPhotos(photosData);

                setPosts(response.data);
                setVisiblePost(response.data.slice(0,10));
            }catch{
                Exception;
            }
        };

        fetchPostsAndPhotos();
    }, []);

    const getPhotoForPost = (postId) => {
        return photos.find(photo => photo.albumId === postId);
    };

    const handleCardClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className="container">
            <h2>Publicaciones</h2>
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 g-3">
                {posts.slice(0, postsPerPage).map(post => {
                    const photo = getPhotoForPost(post.id);
                    return (
                        <div className="col" key={post.id}>
                            <div className="card shadow-sm" onClick={() => handleCardClick(post.id)}>
                                {photo && (
                                    <img
                                        src={photo.thumbnailUrl}
                                        className="bd-placeholder-img card-img-top"
                                        alt={photo.title}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.body}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                        </div>
                                        <small className="text-body-secondary">9 mins</small>
                                    </div>
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
