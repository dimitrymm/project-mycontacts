import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Button from '../Button';
import { Container, Footer, Overlay } from './styles';

export default function Modal({
    isLoading,
    danger,
    title,
    children,
    cancelLabel,
    confirmlabel,
    onCancel,
    onConfirm,
    visible,
}) {
    if (!visible) {
        return null;
    }
    return ReactDOM.createPortal(
        <Overlay>
            <Container danger={danger}>
                <h1>{title}</h1>
                <div className="modal-body">{children}</div>

                <Footer>
                    <button
                        disabled={isLoading}
                        onClick={onCancel}
                        type="button"
                        className="cancel-button"
                    >
                        {cancelLabel}
                    </button>
                    <Button
                        isLoading={isLoading}
                        onClick={onConfirm}
                        danger={danger}
                        type="button"
                    >
                        {confirmlabel}
                    </Button>
                </Footer>
            </Container>
        </Overlay>,
        document.getElementById('modal-root'),
    );
}

Modal.propTypes = {
    isLoading: PropTypes.bool,
    danger: PropTypes.bool,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    confirmlabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
    danger: false,
    confirmlabel: 'Confirmar',
    cancelLabel: 'Cancelar',
    visible: false,
    isLoading: false,
};
