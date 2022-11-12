import create from 'zustand';

interface TabState {
	setActiveTab: any;
	isSettingsOpen: boolean;
	activeTab: string;
	setIsSettingsOpen: () => void;
}

interface TimerStore {
	timer: number;
	setTimer: (timer: number) => void;
	start: boolean;
	setStart: (startOrNot: boolean) => void;
}

export const useTabStore = create<TabState>()((set) => ({
	isSettingsOpen: false,
	activeTab: 'Pomodoro',
	setIsSettingsOpen: () =>
		set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
	setActiveTab: (tab: any) => set(() => ({ activeTab: tab })),
}));

export const useTimerStore = create<TimerStore>((set) => ({
	timer: 25 * 60,
	setTimer: (timer: number) => set(() => ({ timer: timer })),
	start: false,
	setStart: (startOrNot) => set(() => ({ start: startOrNot })),
}));
