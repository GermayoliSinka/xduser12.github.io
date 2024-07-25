import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CommentList from './CommentList';

const PostDetails = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchPostAndDetails = async () => {
            try {
                
                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                if (!postResponse.ok) {
                    throw new Error('Failed to fetch post');
                }
                const postData = await postResponse.json();
                setPost(postData);

                const photoResponse = await fetch(`https://jsonplaceholder.typicode.com/photos/${postId}`);
                if (!photoResponse.ok) {
                    throw new Error('Failed to fetch photo');
                }
                const photoData = await photoResponse.json();
                setPhoto(photoData);
            } catch (error) {
                console.log(error);
            } 
        };

        fetchPostAndDetails();
    }, [postId]);


    return (
        <div className="container-fluid d-flex flex-column pt-4" style={{ backgroundColor: '#3d405b', color: 'white', minHeight: '100vh' }}>
            <div className="d-flex justify-content-start p-3">
                <button className="btn btn-outline-light" onClick={() => navigate(-1)}>
                    <i className="bi bi-arrow-left"></i> Atrás
                </button>
            </div>
            {post && (
                <div className="row flex-grow-1">
                    <div className="col-md-6 d-flex flex-column p-5">
                        <h1 className="text-center mb-4">{post.title}</h1>
                        <p className="text-center mb-4">{post.body}</p>
                        {photo && (
                            <img
                                src={photo.url}
                                alt={photo.title}
                                className="img-fluid mx-auto d-block"
                                style={{ maxHeight: '300px', objectFit: 'contain' }}
                            />
                        )}
                    </div>
                    <div className="col-md-6 d-flex flex-column p-3">
                        <div className="border rounded p-3 d-flex flex-column" style={{ height: '100%', overflowY: 'auto', backgroundColor: '#e8e8e4', color: 'black' }}>
                            <h2 className="text-center mb-4">Comentarios</h2>
                            <CommentList postId={postId} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

PostDetails.propTypes = {
    postId: PropTypes.string
};

export default PostDetails;