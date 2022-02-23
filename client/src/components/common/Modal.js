import React from "react";
import Portal from "@reach/portal";
import styled, { css } from "styled-components/macro";
import buttonStyles from "assets/css/button-styles.module.css";
import slugify from "slugify";

const OverlayBackground = styled.div`
	${({ show }) => {
		return show
			? css`
					position: fixed;
					z-index: 5;
					top: 0;
					left: 0;
					overflow: hidden;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.5);
			  `
			: css`
					visibility: hidden;
					display: none;
					z-index: -1;
			  `;
	}}
`;

const ContentWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	/* flex-direction: column; */
	justify-content: center;
	align-items: center;
	.modal-card {
		position: relative;
		max-width: 100%;
		height: 500px;
		border-radius: 5px;
	}
	.modal-button {
		font-size: 1.5rem;
		position: absolute;
		right: 0;
		top: 0;
		padding: 0 10px;
		border-radius: 5px;
	}
	.img {
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
`;

function Modal({ show, setShow, hotel, session, orderedBy }) {
	console.log(session, orderedBy);
	return (
		<Portal>
			<OverlayBackground show={show}>
				<ContentWrapper>
					<div className="bg-light modal-card">
						<div>
							{hotel.image && hotel.image.contentType ? (
								<img
									src={`${process.env.REACT_APP_BACKEND_URL}/hotel/image/${hotel._id}`}
									alt={`${slugify(hotel.title)}`}
									className="card-image img img-fluid"
								/>
							) : (
								<img
									src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
									alt={`${slugify(hotel.title)}`}
									className="card-image img img-fluid"
								/>
							)}
						</div>
						<button className="modal-button" type="button" onClick={() => setShow(false)}>
							<b>X</b>
						</button>
						<div className="p-4">
							<p>
								<b>
									<small>Payment intent:</small>
								</b>{" "}
								{session.payment_intent}
							</p>
							<p>
								<b>
									<small>Payment status:</small>
								</b>{" "}
								<span className="text-success">{session.payment_status}</span>
							</p>
							<p>
								<b>
									<small>Amount total:</small>
								</b>{" "}
								{session.currency.toUpperCase()} {session.amount_total / 100}
							</p>
							<p>
								<b>
									<small>Stripe customer id:</small>
								</b>{" "}
								{session.customer}
							</p>
							<p>
								<b>
									<small>Customer:</small>
								</b>{" "}
								{orderedBy.name}
							</p>
						</div>
					</div>
				</ContentWrapper>
			</OverlayBackground>
		</Portal>
	);
}

export default Modal;
