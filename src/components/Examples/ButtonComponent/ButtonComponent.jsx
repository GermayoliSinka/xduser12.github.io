import PropTypes from 'prop-types';

const ButtonComponent = ({ text }) => {
  return <button>{text}</button>;
};
ButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
};
export default ButtonComponent;
