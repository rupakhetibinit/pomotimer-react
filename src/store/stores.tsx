import { atom, PrimitiveAtom } from 'jotai';
type Tab = {
	name: string;
	timer: number;
};
export const isSettingsOpenAtom = atom(false);
export const activeTabAtom = atom('Pomodoro');
