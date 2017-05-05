import React from 'react';

export default function(props) {
	const fill = props.fill || '';
	const size = props.size || 24;

	return (
			<svg xmlns="http://www.w3.org/2000/svg"
			     className="icon"
			     x="0px" y="0px"
			     viewBox={`0 0 ${size} ${size}`}
			     enableBackground={`0 0 ${size} ${size}`}
			     height={size}
			     width={size}
			     fill={fill}
			     xmlSpace="preserve">
				<use xlinkHref={`#${props.icon}`} />
			</svg>
	)
}