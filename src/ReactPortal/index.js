import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
export default function ReactPortal({ containerId, children }) {
    let container = document.getElementById(containerId);
    if (!container) {
        container = document.createElement('div');
        container.setAttribute('id', containerId);
        document.body.appendChild(container);
    }

    return ReactDOM.createPortal(children, container);
}
ReactPortal.propTypes = {
    containerId: PropTypes.string,
    children: PropTypes.node.isRequired,
};

ReactPortal.defaultProps = {
    containerId: 'portal-root',
};
