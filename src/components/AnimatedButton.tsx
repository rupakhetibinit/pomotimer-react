import { motion } from 'framer-motion';
import React from 'react';
import { useTabStore } from '../store/zustandStore';
type AnimatedButtonProps = {
	activeTab: string;
	tab: string;
	handleClick: (tab: string) => void;
};

const AnimatedButton = ({ tab, handleClick }: AnimatedButtonProps) => {
	const activeTab = useTabStore((state) => state.activeTab);
	const buttonVariants = {
		selected: {
			scale: 1.105,
		},
		notSelected: {
			scale: 0.9,
		},
	};
	return (
		<motion.button
			initial={false}
			animate={activeTab === tab ? 'selected' : 'notSelected'}
			variants={buttonVariants}
			onClick={() => handleClick(tab)}
			className={
				'flex h-auto mx-2 text-white p-2 rounded-lg bg-opacity-40 font-medium ' +
				`${activeTab == tab ? 'bg-gray-500' : ''}`
			}
			key={tab}>
			{tab}
		</motion.button>
	);
};

export default AnimatedButton;
