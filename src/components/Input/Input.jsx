import './Input.css';
import cn from 'classnames';
import {forwardRef} from 'react';

const Input = forwardRef(
	function Input({className, isValid = false, appearance='text', ...props}, ref) {
		
		return (
			<input
				{...props}
				ref={ref}
				className={cn(className, 'input', {
					['invalid']: isValid,
					['input-title']: appearance === 'title'
				})}/> 
		);
	});

export default Input;