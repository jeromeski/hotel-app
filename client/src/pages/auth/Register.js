import RegisterForm from "components/auth/RegisterForm";
import { Fragment } from "react";

const Register = () => {
	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-6 offset-md-3">
						<RegisterForm />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Register;
