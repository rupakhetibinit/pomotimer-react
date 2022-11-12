import { useAtom } from 'jotai';
import React from 'react';
import { isSettingsOpenAtom } from '../store/stores';

type Props = {};

const TopBar = (props: Props) => {
	function handleSettingsOpen() {
		setSettingsIsOpen(!settingsIsOpen);
	}
	const [settingsIsOpen, setSettingsIsOpen] = useAtom(isSettingsOpenAtom);
	return (
		<nav className='flex justify-between mb-2 items-center'>
			<div className='text-2xl font-medium text-white'>PomoTimer</div>
			<div className=''>
				<button
					onClick={handleSettingsOpen}
					className='bg-white px-4 py-2 bg-opacity-20 rounded-md text-sm text-white hover:bg-gray-200 hover:bg-opacity-40 duration-300'>
					Settings
				</button>
			</div>
		</nav>
	);
};

export default TopBar;
