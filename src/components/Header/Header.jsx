import './Header.css';

export default function Header() {
	function changeUser(e) {
		console.log(e.target.value);
	}

	return (
		<>
			<img className='logo' src="/logo.svg" alt="logo"/>
			<select name='user' id='user' onChange={changeUser}>
				<option value="1">Андрей</option>
				<option value="2">Елена</option>
			</select>
		</>
	);
}