import React from 'react';

const IconUser = ({id, className, size})=>{
	const sizeIcon = size ? size : "20px"
return(
	<svg  id={id} className={className} width={sizeIcon} height={sizeIcon} viewBox="0 0 500 500">
		<g>
			<path d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M255,76.5
			c43.35,0,76.5,33.15,76.5,76.5s-33.15,76.5-76.5,76.5c-43.35,0-76.5-33.15-76.5-76.5S211.65,76.5,255,76.5z M255,438.6
			c-63.75,0-119.85-33.149-153-81.6c0-51,102-79.05,153-79.05S408,306,408,357C374.85,405.45,318.75,438.6,255,438.6z"/>
		</g>
	</svg>
)}

export default IconUser