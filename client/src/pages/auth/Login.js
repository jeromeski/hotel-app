import LoginForm from "components/form/auth/LoginForm";
import TextError from "components/form/TextError";
import TextInput from "components/form/TextInput";

import { useLoginMutation } from "framework/basic-rest/auth/use-login";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import buttonStyles from "assets/css/button-styles.module.css";
import LoadingOverlay from "components/common/LoadingOverlay";

const Login = () => {
	const { mutate: signIn, isLoading, isError, isSuccess } = useLoginMutation();

	const {
		formState: { errors },
		register,
		handleSubmit,
		reset
	} = useForm();
	const history = useHistory();

	const onSubmit = (data) => {
		const noop = () => {};
		if (isError) {
			return noop();
		}
		signIn(data);
		reset();
	};

	useEffect(() => {
		if (isSuccess) {
			history.push("/");
		} else if (isError) {
			history.push("/login");
		}
	}, [isSuccess, isError]);

	return (
		<Fragment>
			<div className="container">
				<div className="row full-page-height">
					<div className="col-md-6 offset-md-3 d-flex align-items-center">
						<div className="container">
							<h1 className="text-center">Login</h1>
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
								<button type="submit" className={buttonStyles.button}>
									{isLoading ? "Loading..." : "Submit"}
								</button>
							</LoginForm>
						</div>
					</div>
				</div>
			</div>
			{isLoading && !isSuccess && <LoadingOverlay isActive={true} spinner text="Adding Hotel" />}
		</Fragment>
	);
};

export default Login;
