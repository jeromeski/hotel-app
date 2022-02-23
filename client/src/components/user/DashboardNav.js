import React from "react";
import { useAuthContext } from "context/Auth";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import DashboardSeller from "./DashboardSeller";
import buttonStyles from "assets/css/button-styles.module.css";
import DashboardUser from "./DashboardUser";

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
					<DashboardUser />
				</TabPanel>
				<TabPanel>
					<DashboardSeller />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}

export default DashboardNav;
