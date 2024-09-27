import Spinner from '../Spinner';
import { StyledButton } from './styles';
import PropTypes from 'prop-types';

export default function Button({
    onClick,
    type,
    disabled,
    isLoading,
    children,
    danger,
}) {
    return (
        <StyledButton
            onClick={onClick}
            danger={danger}
            type={type}
            disabled={disabled || isLoading}
        >
            {!isLoading && children}
            {isLoading && <Spinner size={16} />}
        </StyledButton>
    );
}
Button.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    danger: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    type: 'button',
    disabled: false,
    isLoading: false,
    onClick: undefined,
};
