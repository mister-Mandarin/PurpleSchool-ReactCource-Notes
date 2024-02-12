import {UserContext} from '../../context/user.context.jsx';
import {useContext} from 'react';


export default function SelectUser() {
	const {userId, setUserId} = useContext(UserContext);

	function changeUser(e) {
		setUserId(Number(e.target.value));
	}

	return (
		<select name='user' id='user' value={userId} onChange={changeUser}>
			<option value="1">Андрей</option>
			<option value="2">Елена</option>
		</select>
	);
}