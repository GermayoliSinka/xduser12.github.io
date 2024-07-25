import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    //siguiente
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="text-center mb-4">
            <button 
                className="btn btn-primary me-2"
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                Anterior
            </button>
            <span className="mx-3">Página {currentPage} / {totalPages}</span>
            <button 
                className="btn btn-primary ms-2"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Siguiente
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
