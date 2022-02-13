import { useAuthContext } from "context/Auth";

const Home = () => {
	const { user } = useAuthContext();
	console.log(user);

	return (
		<div className="container-fluid h1 p-5">
			{user && <pre>{JSON.stringify(user, null, 4)}</pre>}
		</div>
	);
};

export default Home;
