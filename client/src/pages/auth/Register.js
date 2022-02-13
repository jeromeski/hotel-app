import { Fragment } from "react";
import { useSignupMutation } from "framework/basic-rest/auth/use-signup";
import { useHistory } from "react-router-dom";
import RegisterForm from "components/form/auth/RegisterForm";
import { useForm } from "react-hook-form";
import TextInput from "components/form/TextInput";
import TextError from "components/form/TextError";

const Register = () => {
	const history = useHistory();

	const { mutate: signUp, isLoading, isError } = useSignupMutation();
	const {
		formState: { errors },
		register,
		handleSubmit
	} = useForm();

	const onSubmit = (data) => {
		const noop = () => {};
		signUp(data);
		if (isError) {
			return noop();
		}
		history.push("/login");
	};
	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-6 offset-md-3 mt-5">
						<h1 className="text-center">Register</h1>
					</div>
					<div className="col-md-6 offset-md-3">
						<RegisterForm handleSubmit={handleSubmit} onSubmit={onSubmit}>
							<div>
								<TextInput id="name" type="text" label="Name" {...register("name")} />
								<TextError errorKey={errors.name?.message} />
							</div>
							<div>
								<TextInput id="email" type="email" label="Email" {...register("email")} />
								<TextError errorKey={errors.email?.message} />
							</div>
							<div>
								<TextInput
									id="password"
									type="password"
									label="Password"
									{...register("password")}
								/>
								<TextError errorKey={errors.password?.message} />
							</div>
							<button type="submit" className="mt-3">
								{isLoading ? "Loading..." : "Submit"}
							</button>
						</RegisterForm>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Register;
