import React, { Fragment } from "react";

function HotelsResourceLoader({ hotels, owner, resourceName, itemComponent: Component }) {
	console.log("resource loader ==>", hotels);
	return hotels ? (
		hotels.map((hotel) => (
			<div className={`${owner ? "col-md-6" : "col-md-4"}`} key={hotel._id}>
				<Component {...{ [resourceName]: hotel }} owner={owner} />
			</div>
		))
	) : (
		<Fragment></Fragment>
	);
}

export default HotelsResourceLoader;
