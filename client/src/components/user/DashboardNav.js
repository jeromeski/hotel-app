import React from "react";
import { useAuthContext } from "context/Auth";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import DashboardSeller from "./DashboardSeller";

function DashboardNav() {
	const { state } = useAuthContext();
	const { auth } = state;
	return (
		<Tabs defaultIndex={auth.user.stripe_seller ? 1 : 0}>
			<TabList>
				<Tab>
					<h5>Your Bookings</h5>
				</Tab>
				<Tab>
					<h5>Your Hotels</h5>
				</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<div className="container">
						<div className="row">
							<div className="col-md-8 mt-5 d-flex justify-content-center">
								<h2>Bookings</h2>
							</div>
							<div className="col-md-4 mt-5 d-flex justify-content-center">
								<button type="button">Browse hotels</button>
							</div>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					<DashboardSeller />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}

export default DashboardNav;
