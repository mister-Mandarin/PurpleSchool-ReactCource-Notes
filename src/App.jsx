import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel.jsx';
import Body from './layout/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JourlanList from './components/JourlanList/JourlanList.jsx';
import JourlanAddButton from './components/JourlanAddButton/JourlanAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import {useLocalStorage} from './hooks/useLocalStorage.hook.js';
import {UserContextProvider} from './context/user.context.jsx';

function mapItems(items) {
	if (!items) { 
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {

	const [note, addNote] = useLocalStorage('data');

	const addJournalItem = (addingNote) => {
		addNote([
			...mapItems(note), {
				id: note.length > 0 ? Math.max(...note.map(i => i.id)) + 1 : 1,
				title: addingNote.title,
				date: new Date(addingNote.date),
				tag: addingNote.tag,
				text: addingNote.text
			}
		]
		);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header />
					<JourlanAddButton/>
					<JourlanList items={mapItems(note)}/>
				</LeftPanel> 
				<Body>
					<JournalForm inputData={addJournalItem}/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
