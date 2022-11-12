import { motion } from 'framer-motion';

type SettingsModalProps = {
	settingsIsOpen: boolean;
};

const SettingsModal = ({ settingsIsOpen }: SettingsModalProps) => {
	const variants = {
		open: {
			opacity: 1,
			y: 0,
		},
		closed: {
			opacity: 0,
			y: '-100vh',
		},
	};
	return (
		<motion.div
			initial={false}
			animate={settingsIsOpen ? 'open' : 'closed'}
			variants={variants}
			className='w-96 h-[75vh] bg-gray-200 z-20 rounded-xl text-gray-900 absolute top-20'>
			<div
				onClick={() => console.log('clicked on container')}
				className='flex flex-col items-center'>
				<p>Test1</p>
				<p>Test2</p>
			</div>
		</motion.div>
	);
};

export default SettingsModal;
