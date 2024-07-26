import { useEffect, useState } from 'react';
import { Carousel, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PostCarrusel = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/photos');
                const data = await response.json();
                setPhotos(data.slice(0, 5));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    if (loading) return <p>Loading carousel...</p>;
    if (error) return <p>Error loading carousel: {error.message}</p>;

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <Carousel>
                {photos.map((photo) => (
                    <Carousel.Item key={photo.id}>
                        <img className="d-block w-100" src={photo.url} alt={photo.title} />
                        <Carousel.Caption>
                            <h3>{photo.title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1 style={{ color: 'white', fontSize: '1.0rem', marginBottom: '1rem', textAlign: 'center' }}>
                    Bienvenido a la página
                </h1>
                <h5 style={{ color: 'white', fontSize: '1.0rem', marginBottom: '1rem', textAlign: 'center' }}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis hic praesentium libero soluta ullam. Ea eum
                    alias qui quidem sed, excepturi officiis est, dicta asperiores et, doloremque quo quis deleniti.
                </h5>
                <div style={{ width: '80%', maxWidth: '600px' }}>
                    <Form onSubmit={onSearchSubmit} className="d-flex justify-content-center align-items-center">
                        <Form.Control
                            type="text"
                            placeholder="Buscar por título o contenido... :)"
                            value={searchTerm}
                            onChange={onSearchChange}
                            className="me-2"
                        />
                        <Button variant="outline-light" type="submit">
                            <i className="bi bi-search"></i>
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

PostCarrusel.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onSearchSubmit: PropTypes.func.isRequired,
};

export default PostCarrusel;
