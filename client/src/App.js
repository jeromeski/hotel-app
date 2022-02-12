import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "pages/booking/Home";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import "@reach/menu-button/styles.css";
import "./assets/bootstrap.css";
import Header from "components/layout/header/Header";
import { AuthProvider } from "context/app";

function App() {
	return (
		<div className="bootstrap-wrapper">
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	return (
		<AuthProvider>
			<App />
		</AuthProvider>
	);
};
