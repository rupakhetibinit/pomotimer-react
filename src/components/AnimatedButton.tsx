import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import React from 'react';
import { activeTabAtom, tabsAtom, timerAtom } from '../App';

type AnimatedButtonProps = {
	tab: string;
	tick: number | undefined;
	// handleClick: (tab: string) => void;
};

const AnimatedButton = ({ tab, tick }: AnimatedButtonProps) => {
	const [timer, setTimer] = useAtom(timerAtom);
	const [tabs, setTabs] = useAtom(tabsAtom);

	const [activeTab, setActiveTab] = useAtom(activeTabAtom);
	const buttonVariants = {
		selected: {
			scale: 1.105,
		},
		notSelected: {
			scale: 0.9,
		},
	};
	function handleClick(tick: any, tab: any) {
		if (tick) {
			alert('Timer still running');
			return;
		}
		const findTab: { name: string; timer: number } | undefined = tabs.find(
			(t: { name: any }) => t.name === tab.name
		);
		if (!findTab) {
			return null;
		}
		const newTimer = findTab.timer * 60;
		setTimer(newTimer);

		setActiveTab(tab.name);
	}

	return (
		<motion.button
			initial={false}
			animate={activeTab === tab ? 'selected' : 'notSelected'}
			variants={buttonVariants}
			onClick={() => handleClick(tick, tab)}
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
