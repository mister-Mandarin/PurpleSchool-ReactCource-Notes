import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel.jsx';
import Body from './layout/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JourlanList from './components/JourlanList/JourlanList.jsx';
import JourlanAddButton from './components/JourlanAddButton/JourlanAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import {useLocalStorage} from './hooks/useLocalStorage.hook.js';
import {UserContextProvider} from './context/user.context.jsx';
import {useState} from 'react';

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
	const [selectedItem, setSelectedItem] = useState(null);

	const addJournalItem = (addingNote) => {
		if (!addingNote.id) {
			addNote([
				...mapItems(note), {
					...addingNote,
					id: note.length > 0 ? Math.max(...note.map(i => i.id)) + 1 : 1,
					date: new Date(addingNote.date)
				}
			]
			);
		} else {
			addNote([
				...mapItems(note).map(
					i => {
						if (i.id === addingNote.id) {
							return {...addingNote
							};
						}
						return i;
					}
				)]);
		}

	};

	const deleteJournalItem = (id) => {
		addNote([...note.filter(note => note.id !== id)]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header />
					<JourlanAddButton clearForm={() => setSelectedItem(null)}/>
					<JourlanList items={mapItems(note)} selectItem={setSelectedItem}/>
				</LeftPanel> 
				<Body>
					<JournalForm
						inputData={addJournalItem}
						data={selectedItem}
						onDelete={deleteJournalItem}
					/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
