import React, { Fragment } from "react";

import ConnectNav from "./ConnectNav";
import DashboardNav from "./DashboardNav";

function Dashboard() {
	return (
		<Fragment>
			<div className="container mt-5 p-5">
				<div className="row">
					<ConnectNav />
				</div>
			</div>
			<div className="container p-4">
				<DashboardNav />
			</div>
		</Fragment>
	);
}

export default Dashboard;
