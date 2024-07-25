import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

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
                Previous
            </button>
            <span className="mx-3">Página número {currentPage} de {totalPages}</span>
            <button 
                className="btn btn-primary ms-2"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
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
