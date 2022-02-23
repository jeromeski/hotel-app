import React, { Fragment } from "react";

function HotelsResourceLoader({ hotels, resourceName, itemComponent: Component, ...props }) {
	return hotels ? (
		hotels.map((hotel) => (
			<div className="col-md-6" key={hotel._id}>
				<Component {...{ [resourceName]: hotel }} {...props} />
			</div>
		))
	) : (
		<Fragment></Fragment>
	);
}

export default HotelsResourceLoader;
