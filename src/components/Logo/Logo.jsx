import {memo} from 'react';

function Logo({image}) {
	return (
		<>
			<img className='logo' src={image} alt="logo"/>
		</>
	);
}

export default memo(Logo);