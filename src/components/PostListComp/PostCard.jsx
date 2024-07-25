
import PropTypes from 'prop-types';

const PostCard = ({ post, photo, onClick }) => {
    return (
        <div className="card" onClick={() => onClick(post.id)}>
            {photo && <img src={photo.url} className="card-img-top" alt={photo.title} />}
            <div className="card-body">
                <h5 className="card-title" dangerouslySetInnerHTML={{ __html: post.title }} />
                <p className="card-text" dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
    photo: PropTypes.object,
    onClick: PropTypes.func.isRequired,
};

export default PostCard;
