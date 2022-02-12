import React, { useRef } from "react";
import TextInput from "components/form/TextInput";
import { useSignupMutation } from "framework/basic-rest/auth/use-signup";

function RegisterForm() {
	let nameRef = useRef();
	let emailRef = useRef();
	let passwordRef = useRef();

	const { mutate: signUp, isLoading } = useSignupMutation();

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value
		};
		signUp(data);
	};

	return (
		<form onSubmit={handleSubmit} className="form mt-5">
			<TextInput ref={nameRef} id="reg-name" type="text" label="Name" />
			<TextInput ref={emailRef} id="reg-email" type="email" label="Email" />
			<TextInput ref={passwordRef} id="reg-password" type="password" label="Password" />
			<button type="submit" className="mt-3">
				{isLoading ? "Loading..." : "Submit"}
			</button>
		</form>
	);
}

export default RegisterForm;
