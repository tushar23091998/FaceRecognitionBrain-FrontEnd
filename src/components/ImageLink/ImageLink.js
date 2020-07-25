import React from 'react';
import './ImageLink.css';

const ImageLink =({onInputChange,onButtonSubmit}) =>{
	return (
		<div>
		<p className='f3'>
			{'This Magic Brain will detect in your pictures'}
		</p>
		<div className='center'>
		<div className=' center form pa4 br3 shadow-5'>
			<input className=' center f4 pa2 w-70 ' type='text' onChange={onInputChange} />
			<button className='w-30 grow f link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>
			 Detect</button>
		</div>
		</div>
		</div>
		)
} 
export default ImageLink;