import { useEffect, useRef, useState } from 'react';
import SettingsModal from './components/SettingsModal';
import { useAtom } from 'jotai';
import { isSettingsOpenAtom, activeTabAtom } from './store/stores';
import { motion } from 'framer-motion';
import AnimatedButton from './components/AnimatedButton';
const toMinutesAndSeconds = (timer: number) => {
	const minutes = Math.floor(timer / 60);
	const seconds = timer % 60;
	return `${minutes < 10 ? '0' : ''}${minutes} : ${
		seconds < 10 ? '0' : ''
	}${seconds}`;
};

function App() {
	const [settingsIsOpen, setSettingsIsOpen] = useAtom(isSettingsOpenAtom);

	const [timer, setTimer] = useState(25 * 60);
	const [start, setStart] = useState(false);
	// const animationProps = useSpring({
	// 	from: {
	// 		y: -100,
	// 	},
	// 	to: {
	// 		y: 0,
	// 	},
	// 	config: config.stiff,
	// });

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
	const tabs = ['Pomodoro', 'Short Break', 'Long Break'];
	function handleClick(tab: string) {
		if (tick.current) {
			alert('Timer still running');
			return;
		}
		if (tab === 'Pomodoro') {
			setTimer(25 * 60);
		} else if (tab === 'Short Break') {
			setTimer(5 * 60);
		} else {
			setTimer(15 * 60);
		}
		setActiveTab(tab);
	}
	return (
		<div
			className={`w-screen h-screen flex justify-center p-4 text-white ${
				activeTab === 'Short Break'
					? 'bg-gradient-to-l from-blue-500 to-purple-500'
					: activeTab === 'Long Break'
					? 'bg-gradient-to-l from-green-500 to-yellow-400'
					: 'bg-gradient-to-l from-red-400 to-orange-300'
			}  ease-in-out transition `}>
			<SettingsModal settingsIsOpen={settingsIsOpen} />
			<div className='flex flex-col'>
				<nav className='flex justify-between mb-2 items-center'>
					<div className='text-2xl font-medium text-white'>PomoTimer</div>
					<div className=''>
						<button
							onClick={() => setSettingsIsOpen(!settingsIsOpen)}
							className='bg-white px-4 py-2 bg-opacity-20 rounded-md text-sm text-white hover:bg-gray-200 hover:bg-opacity-40'>
							Settings
						</button>
					</div>
				</nav>
				<div className='w-full h-[0.25px] bg-gray-700 opacity-60'></div>
				<div className='flex flex-col items-center bg-gray-200 bg-opacity-30 w-96 h-72 p-4 rounded-2xl mt-12'>
					<div className='flex flex-row'>
						{tabs.map((tab) => (
							<AnimatedButton
								key={tab}
								activeTab={activeTab}
								handleClick={() => handleClick(tab)}
								tab={tab}
							/>
						))}
					</div>
					<div className='text-white font-bold text-8xl p-4'>{timerRender}</div>
					<button
						className='bg-white px-6 py-2 bg-opacity-20 rounded-md text-lg text-white'
						onClick={() => setStart(!start)}>
						{start ? 'Stop' : 'Start'}
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
