import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './../../assets/scss/stylePages/CommentList.css'; // Importa los estilos adicionales

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [postId]);

    return (
        <div className="comments-list" style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', padding: '0 10px' }}>
            {comments.length === 0 ? (
                <p className="text-center">No comments available</p>
            ) : (
                <ul className="list-unstyled">
                    {comments.map(comment => (
                        <li key={comment.id} className="mb-3 p-3 border rounded comment-item">
                            <div className="d-flex justify-content-between mb-2">
                                <h5>{comment.name}</h5>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-sm btn-outline-success me-2">
                                        <i className="bi bi-hand-thumbs-up thumb-icon"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger">
                                        <i className="bi bi-hand-thumbs-down thumb-icon"></i>
                                    </button>
                                </div>
                            </div>
                            <p>{comment.body}</p>
                            <small className="comment-email">
                                {comment.email}
                            </small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

CommentList.propTypes = {
    postId: PropTypes.string.isRequired,
};

export default CommentList;
