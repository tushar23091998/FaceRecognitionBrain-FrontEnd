import React from 'react';
import Tilt from 'react-tilt'
import lo from './lo.png';
import './Logo.css';
const Logo =() =>{
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 40 }} style={{ height: 100, width: 100 }} >
 				<div className="Tilt-inner pa1">  <img src={lo} alt='logoloading'/></div>
			</Tilt>
		</div>
		)
}
export default Logo;