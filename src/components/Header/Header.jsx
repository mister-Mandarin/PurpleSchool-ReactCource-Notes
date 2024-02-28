import './Header.css';
import SelectUser from '../SelectUser/SelectUser.jsx';
import Button from '../Button/Button.jsx';
import {useCallback, useState} from 'react';
import Logo from '../Logo/Logo.jsx';

const logos = ['./logo.svg', './vite.svg'];

export default function Header() {

	const [logoIndex, setLogoIndex] = useState(0);


	//useCallback запоминает результат выполнения функции, в случе если
	// не помеялось и каких параметров в []. Исклчает лишние перерендеры
	const toggleLogo = useCallback(() => {
		setLogoIndex(state => Number(!state));
	}, []);

	return (
		<>
			<Logo image={logos[logoIndex]} />
			<SelectUser />  
			<Button onClick={toggleLogo}>Сменить лого</Button>
		</>
	);
}