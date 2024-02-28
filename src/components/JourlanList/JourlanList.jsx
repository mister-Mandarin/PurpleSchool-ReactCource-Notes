import './JourlanList.css';
import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';
import {useContext, useMemo} from 'react';
import {UserContext} from '../../context/user.context.jsx';

function JournalList({ items, selectItem }) {

	const {userId} = useContext(UserContext);

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	const filteredItems = useMemo(() => {
		return items.
			filter(el => el.userId === userId)
			.sort(sortItems);
	}, [items, userId]);

	if (items.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}

	return	<div className="jourlan-list">
		{filteredItems
			.map(el => ( 
				<CardButton key={el.id} onClick={() => selectItem(el)}>
					<JournalItem
						title={el.title}
						text={el.text}
						date={el.date}
					/>
				</CardButton>
			))}
	</div>;
}

export default JournalList;