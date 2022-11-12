import { motion } from 'framer-motion';
import { MutableRefObject, useRef } from 'react';

type SettingsModalProps = {
	settingsIsOpen: boolean;
	tabs: { name?: string | undefined; timer?: number | undefined }[];
	setTabs: any;
	setTimer: any;
	activeTab: string;
};

const SettingsModal = ({
	settingsIsOpen,
	setTabs,
	tabs,
	setTimer,
	activeTab,
}: SettingsModalProps) => {
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
	const handleInputChange = (tab: { name: string; timer: number }, e: any) => {
		const initialTabs = [...tabs];
		const findTabIndex = initialTabs.findIndex((t: any) => t.name === tab.name);
		const findTab = initialTabs.find((t: any) => t.name === tab.name);
		console.log(findTab);
		if (findTab !== null || undefined) {
			initialTabs.splice(findTabIndex, 1, {
				name: findTab?.name,
				timer: e.target.value,
			});
			const finalTimer = parseInt(e.target.value) * 60;
			setTabs([...initialTabs]);
			if (activeTab === findTab?.name) {
				setTimer(finalTimer);
			}
		}
	};
	return (
		<motion.div
			initial={false}
			animate={settingsIsOpen ? 'open' : 'closed'}
			variants={variants}
			className='w-96 h-[75vh] bg-gray-200 z-20 rounded-xl text-gray-900 absolute top-20 p-4'>
			<div
				onClick={() => console.log('clicked on container')}
				className='flex flex-col'>
				<h3 className='text-3xl font-medium '>Timer Setting</h3>
				<div className='flex flex-row p-2'>
					{tabs.map((tab: any) => (
						<input
							key={tab.name}
							className='w-16 mx-2 text-center'
							type={'number'}
							value={tab.timer}
							onChange={(e) => handleInputChange(tab, e)}
						/>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default SettingsModal;
