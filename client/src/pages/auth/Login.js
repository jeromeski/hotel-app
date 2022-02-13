import LoginForm from "components/auth/LoginForm";
import TextError from "components/form/TextError";
import TextInput from "components/form/TextInput";
import { useLoginMutation } from "framework/basic-rest/auth/use-login";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
	const { mutate: signIn, isLoading, isError } = useLoginMutation();
	const {
		formState: { errors },
		register,
		handleSubmit
	} = useForm();

	const onSubmit = (data) => {
		const noop = () => {};
		if (isError) {
			return noop();
		}
		signIn(data);
	};

	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-6 offset-md-3 mt-5">
						<h1 className="text-center">Login</h1>
					</div>
					<div className="col-md-6 offset-md-3">
						<LoginForm handleSubmit={handleSubmit} onSubmit={onSubmit}>
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
						</LoginForm>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Login;
