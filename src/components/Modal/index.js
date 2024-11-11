import PropTypes from 'prop-types';
import Button from '../Button';
import { Container, Footer, Overlay } from './styles';
import ReactPortal from '../../ReactPortal';

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
    return (
        <ReactPortal containerId={'modal-root'}>
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
            </Overlay>
            ,
        </ReactPortal>
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
