import styled from 'styled-components';

interface IAlert {
	title: string;
	extraData: { desc: string, onClose: () => void };
	hideModal: () => void;
}

const Alert = ({ title, hideModal, extraData }: IAlert) => {
	const close = () => {
		hideModal();
		extraData.onClose();
	};

	return (
		<AlertBlock>
			<p>{title}</p>
			<p>{extraData.desc}</p>
			<button onClick={close}>확인</button>
		</AlertBlock>
	);
};

const AlertBlock = styled.dialog`
	padding: 0;
	background: rgba(33, 38, 41, 0.5);
	height: 100vh;
	width: 100%;
	position: fixed;
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export default Alert;
