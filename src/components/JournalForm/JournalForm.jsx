import './JournalForm.css';
import Button from '../Button/Button.jsx';
import {useContext, useEffect, useReducer, useRef} from 'react';
import {formReducer, INITIAL_STATE} from './JournalForm.state.js';
import Input from '../Input/Input.jsx';
import {UserContext} from '../../context/user.context.jsx';

export default function JournalForm({inputData, data, onDelete}) {

	const [formValidate, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

	const {isValid, isFormReadyToSubmit, values} = formValidate;

	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		if (!data) {
			dispatchForm({type: 'CLEAR'});
			dispatchForm({ type: 'WRITE_VALUES', payload: { userId }});
		}
		dispatchForm({ type: 'WRITE_VALUES', payload: { ...data }});
	}, [data]);

	useEffect(()=> {
		if (isFormReadyToSubmit) {
			inputData(values);
			dispatchForm({type: 'CLEAR'});
			dispatchForm({ type: 'WRITE_VALUES', payload: { userId }});
		}
	}, [isFormReadyToSubmit, values, inputData, userId]);

	//Очистка состояния красного фона
	useEffect(() => {
		let timerId;
		if (!isValid.title || !isValid.text || !isValid.date) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 1500);
		}
		// очистка эффекта. Очистить все что было в предыдущем эффекте.
		// при множественном вызове нет мерцания. Убрали накопление.
		return ()=> {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		dispatchForm({type: 'WRITE_VALUES', payload: {userId: userId }});
	}, [userId]);

	const addJournalItem = (e) => {
		e.preventDefault();
		//const formData = new FormData(e.target);
		//const formProps = Object.fromEntries(formData);
		//dispatchForm({type: 'SUBMIT', payload: formProps});
		dispatchForm({type: 'SUBMIT'});
	};

	const onChange = (e) => {
		dispatchForm({type: 'WRITE_VALUES', payload: {[e.target.name]: e.target.value} });
	};

	const deleteCurrentNote = () => {
		onDelete(data.id);
		dispatchForm({type: 'CLEAR'});
		dispatchForm({ type: 'WRITE_VALUES', payload: { userId }});
	};

	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			<div className='form-title__container'>
				<Input
					type='title' name='title' ref={titleRef}
					value={values.title}
					onChange={onChange}
					appearance='title'
					isValid={!isValid.title}
				/>
				{data?.id && <button
					type='button'
					className='delete'
					onClick={deleteCurrentNote}>
					<img src="/archiv.svg" alt=""/>
				</button>}
			</div>
			<div className='form-row'>
				<label htmlFor="date" className='form-label'>
					<img src='/calendar.svg' alt=""/>
					<span>Дата</span>
				</label>
				<Input
					type="date"
					name='date'
					ref={dateRef}
					onChange={onChange}
					isValid={!isValid.date}
					value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
					id='date'/>
			</div>
			<div className='form-row'>
				<label htmlFor="tag" className='form-label'>
					<img src="/folder.svg" alt=""/>
					<span>Метки</span>
				</label>
				<Input
					type="text"
					id='tag'
					name='tag'
					value={values.tag}
					onChange={onChange}
					appearance='text'
				/>
			</div>
			<textarea
				name='text' id=""
				cols="30" rows="10"
				ref={textRef}
				onChange={onChange}
				value={values.text}
				className={`input ${isValid.text ? '' : 'invalid'}`}>
			</textarea>
			<Button>Сохранить</Button>
		</form>
	); 
}