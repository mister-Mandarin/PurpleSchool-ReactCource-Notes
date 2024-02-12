import './Header.css';
import SelectUser from '../SelectUser/SelectUser.jsx';

export default function Header() {

	return (
		<>
			<img className='logo' src="/logo.svg" alt="logo"/>
			<SelectUser />
		</>
	);
}