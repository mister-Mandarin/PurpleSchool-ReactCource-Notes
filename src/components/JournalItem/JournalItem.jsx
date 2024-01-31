import './JournalItem.css';

export default function JournalItem({text, title, date}) {

	const dateNormalize =  new Intl.DateTimeFormat('ru-RU').format(date);

	return (
		<>
			<h2 className="journal-item_header">{title}</h2>
			<h2 className="journal-item_body">
				<div className="journal-item_date">{dateNormalize}</div>
				<div className="journal-item_text">{text}</div>
			</h2>
		</>
	);
}