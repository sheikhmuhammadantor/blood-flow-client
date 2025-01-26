import PropTypes from 'prop-types';

function ErrorMessage({ message }) {
    return (
        <div className='w-full my-4 text-blood text-xl text-center'>
            {message}
        </div>
    )
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorMessage;
