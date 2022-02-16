import React, { Fragment } from "react";

import ConnectNav from "./ConnectNav";
import DashboardNav from "./DashboardNav";

function Dashboard() {
	return (
		<Fragment>
			<div className="container mt-5 pt-5 pl-5 pr-5">
				<div className="row">
					<div className="col-md-12">
						<ConnectNav />
					</div>
				</div>
			</div>
			<div className="container p-4">
				<div className="row">
					<div className="col-md-12">
						<DashboardNav />
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Dashboard;
