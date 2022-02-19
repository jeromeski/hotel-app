import React from "react";

function HotelsResourceLoader({ hotels, resourceName, itemComponent: Component }) {
	return hotels?.map((hotel) => (
		<div className="col-md-4" key={hotel._id}>
			<Component {...{ [resourceName]: hotel }} />
		</div>
	));
}

export default HotelsResourceLoader;
