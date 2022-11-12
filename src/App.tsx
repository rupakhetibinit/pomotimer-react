import { useEffect, useRef, useState } from 'react';
import SettingsModal from './components/SettingsModal';
import { atom, useAtom } from 'jotai';
import { isSettingsOpenAtom } from './store/stores';
import { motion } from 'framer-motion';
import AnimatedButton from './components/AnimatedButton';
import TopBar from './components/TopBar';
const toMinutesAndSeconds = (timer: number) => {
	const minutes = Math.floor(timer / 60);
	const seconds = timer % 60;
	return `${minutes < 10 ? '0' : ''}${minutes} : ${
		seconds < 10 ? '0' : ''
	}${seconds}`;
};

export const tabsAtom = atom([
	{
		name: 'Pomodoro',
		timer: 25,
	},
	{
		name: 'Short Break',
		timer: 5,
	},
	{
		name: 'Long Break',
		timer: 15,
	},
]);
export const activeTabAtom = atom('Pomodoro');

export const timerAtom = atom(25 * 60);
export const startAtom = atom(false);

function App() {
	const [settingsIsOpen, _] = useAtom(isSettingsOpenAtom);
	const [tabs, setTabs] = useAtom(tabsAtom);
	const [timer, setTimer] = useAtom(timerAtom);
	const [start, setStart] = useAtom(startAtom);
	function buttonHandler() {
		setStart(!start);
	}
	const firstStart = useRef(true);
	const tick = useRef<number>();
	useEffect(() => {
		if (firstStart.current) {
			firstStart.current = !firstStart.current;
			return;
		}

		if (start && timer > 0) {
			if (typeof window == null || undefined) {
				return;
			}
			tick.current = window.setInterval(() => {
				setTimer((timer) => timer - 1);
			}, 1000);
		} else {
			tick.current = undefined;
			setStart(false);
			clearInterval(tick.current);
			return;
		}

		return () => clearInterval(tick.current);
	}, [start, timer]);

	const timerRender = toMinutesAndSeconds(timer);
	const [activeTab, setActiveTab] = useAtom(activeTabAtom);

	return (
		<div
			className={`w-screen h-screen flex justify-center p-4 text-white ${
				activeTab === 'Short Break'
					? 'bg-gradient-to-l from-blue-500 to-purple-500'
					: activeTab === 'Long Break'
					? 'bg-gradient-to-l from-green-500 to-yellow-400'
					: 'bg-gradient-to-l from-red-400 to-orange-300'
			}  ease-in-out transition duration-300 `}>
			<SettingsModal />
			<div className='flex flex-col'>
				<TopBar />
				<div className='w-full h-[0.25px] bg-gray-700 opacity-60'></div>
				<div className='flex flex-col items-center bg-gray-200 bg-opacity-30 w-96 h-72 p-4 rounded-2xl mt-12'>
					<div className='flex flex-row'>
						{tabs.map((tab) => (
							<AnimatedButton
								key={tab.name}
								tick={tick?.current}
								tab={tab.name}
							/>
						))}
					</div>
					<div className='text-white font-bold text-8xl p-4'>{timerRender}</div>
					<motion.button
						initial={false}
						whileTap={{
							scale: 0.8,
						}}
						className='bg-white px-8 py-2 bg-opacity-30 rounded-md text-lg text-white hover:bg-opacity-40 hover:bg-gray-200 duration-100  tracking-wide'
						onClick={buttonHandler}>
						{start ? 'Stop' : 'Start'}
					</motion.button>
				</div>
			</div>
		</div>
	);
}

export default App;
