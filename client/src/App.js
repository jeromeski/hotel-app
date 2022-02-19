import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import Home from "pages/booking/Home";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";

import Header from "components/layout/header/Header";
import { AuthProvider } from "context/Auth";
import { useRef } from "react";
import { ToastContainer } from "react-toastify";

import PrivateRoute from "components/PrivateRoute";
import Dashboard from "components/user/Dashboard";
import NewHotel from "components/hotels/NewHotel";
import StripeCallback from "components/user/StripeCallback";
import "@reach/menu-button/styles.css";
import "@reach/tabs/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import HotelDetails from "pages/booking/HotelDetails";

function App() {
	return (
		<div className="bootstrap-wrapper">
			<div className="page-wrapper">
				<BrowserRouter>
					<Header />
					<ToastContainer position="top-center" />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/hotel/:hotelId" component={HotelDetails} />
						<PrivateRoute exact path="/dashboard" component={Dashboard} />
						<PrivateRoute exact path="/hotels/new" component={NewHotel} />
						<PrivateRoute exact path="/stripe/callback" component={StripeCallback} />
					</Switch>
				</BrowserRouter>
			</div>
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
