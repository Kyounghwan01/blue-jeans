import { useContext } from 'react';
import { ModalContext } from 'context/Modal/Provider';
import Portal from 'context/Modal/Portal';

const ModalRoot = () => {
	const { component: Component, isOpen, hideModal, modalProps } = useContext(ModalContext);

	return (
		Component &&
		isOpen && (
			<Portal selector="#portal">
				<Component {...modalProps} isOpen={isOpen} hideModal={hideModal} />
			</Portal>
		)
	);
};

export default ModalRoot;
