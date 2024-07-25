import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostAndDetails = async () => {
            try {
                setLoading(true);

                // Fetch post details
                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                const postData = await postResponse.json();
                setPost(postData);

                // Fetch comments for the post
                const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
                const commentsData = await commentsResponse.json();
                setComments(commentsData);

                // Fija una imagen si no se encuentra ninguna
                const defaultPhoto = {
                    url: 'https://via.placeholder.com/600/000000',
                    title: 'No image available'
                };
                setPhoto(defaultPhoto);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndDetails();
    }, [postId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container">
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    {photo && (
                        <img src={photo.url} alt={photo.title} className="img-fluid" />
                    )}
                    <h2>Comments</h2>
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id}>
                                <h5>{comment.name}</h5>
                                <p>{comment.body}</p>
                                <small>{comment.email}</small>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default PostDetails;
