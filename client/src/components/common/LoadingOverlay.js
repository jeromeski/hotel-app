import React from "react";
import Portal from "@reach/portal";
import { LoadingOutlined } from "@ant-design/icons";
import styled, { css } from "styled-components/macro";

const OverlayBackground = styled.div`
	${({ isActive }) => {
		return isActive
			? css`
					position: fixed;
					z-index: 5;
					top: 0;
					left: 0;
					overflow: hidden;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.5);
					.wrapper {
						height: 100%;
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
					}
					.title {
						font-size: 2rem;
						color: #fff;
						margin-top: 1rem;
					}
			  `
			: css`
					visibility: hidden;
					display: none;
					z-index: -1;
			  `;
	}}
`;

function LoadingOverlay({ text, isActive }) {
	return (
		<Portal>
			<OverlayBackground isActive={isActive}>
				<div className="wrapper">
					<LoadingOutlined style={{ fontSize: "2.5rem", color: "white" }} />
					<h1 className="title">{text}</h1>
				</div>
			</OverlayBackground>
		</Portal>
	);
}

export default LoadingOverlay;

/*
`
	position: fixed;
	z-index: 5;
	top: 0;
	left: 0;
	overflow: hidden;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	.wrapper {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.title {
		font-size: 2rem;
		color: #fff;
		margin-top: 1rem;
	}
`;
*/
