import { Fragment, useEffect, useState } from "react";
import { useAuthContext } from "context/Auth";
import { useGetHotelsMutation } from "framework/basic-rest/hotel/use-hotel";
import slugify from "slugify";
import HotelsResourceLoader from "components/hotels/HotelsResourceLoader";
import HotelCard from "components/hotels/HotelCard";

const topSpacer = {
	marginTop: "10rem"
};

const Home = () => {
	const [hotels, setHotels] = useState(null);
	const { state } = useAuthContext();
	const { auth: user } = state;

	const { mutate: getAllHotels, isLoading, data } = useGetHotelsMutation();

	useEffect(() => {
		return getAllHotels();
	}, []);

	useEffect(() => {
		if (data) {
			setHotels(data.data);
		}
	}, [data]);

	console.log(hotels);

	return (
		<div className="container" style={topSpacer}>
			<div className="row">
				<Fragment>
					{isLoading && <h1>Loading</h1>}
					{hotels && (
						<HotelsResourceLoader hotels={hotels} resourceName="hotel" itemComponent={HotelCard} />
					)}
				</Fragment>
			</div>
		</div>
	);
};

export default Home;
