import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import Home from "pages/booking/Home";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import "@reach/menu-button/styles.css";
import "./assets/bootstrap.css";
import Header from "components/layout/header/Header";
import { AuthProvider } from "context/Auth";
import { useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="bootstrap-wrapper">
			<BrowserRouter>
				<Header />
				<ToastContainer position="top-center" />
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
	const queryClientRef = useRef();
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClientRef.current}>
				<App />
			</QueryClientProvider>
		</AuthProvider>
	);
};
