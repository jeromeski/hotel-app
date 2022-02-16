import { useAuthContext } from "context/Auth";

const Home = () => {
	const { state } = useAuthContext();
	const { auth: user } = state;
	return (
		user && (
			<div className="container-fluid h1 p-5">
				<pre>
					<small>{JSON.stringify(user, null, 4)}</small>
				</pre>
			</div>
		)
	);
};

export default Home;
