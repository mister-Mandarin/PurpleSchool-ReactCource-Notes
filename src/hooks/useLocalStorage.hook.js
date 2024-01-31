import { useEffect, useState } from 'react';

export function useLocalStorage(key) {

	const [data, setData] = useState([]);

	// Выполняется 1 раз при появлении компонента.
	// Сайд эффект, читаем из локалстореджа
	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem(key));

		if (Array.isArray(storedData)) {
			setData(storedData);
		}
	}, [key]);

	const saveData = (newData) => {
		localStorage.setItem(key, JSON.stringify(newData));
		setData(newData);
	};

	return [data, saveData];
}