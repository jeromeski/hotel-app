import { Fragment, useEffect, useState } from "react";
import { useAuthContext } from "context/Auth";
import { useGetHotelsMutation } from "framework/basic-rest/hotel/use-hotel";
import HotelsResourceLoader from "components/hotels/HotelsResourceLoader";
import HotelCard from 'components/hotels/HotelCard';


const topSpacer = {
	marginTop: "10rem"
};

const Home = () => {
	const [hotels, setHotels] = useState(null);
	const { state } = useAuthContext();
	const { auth: user } = state;

	const { mutate: getAllHotels, isLoading, isSuccess, data } = useGetHotelsMutation();

	useEffect(() => {
		return getAllHotels();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isSuccess) {
			setHotels(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	console.log(hotels);

	return (
		<div className="container" style={topSpacer}>
			<div className="row">
				<Fragment>
					{isLoading && <h1>Loading</h1>}
					{hotels && (
						<HotelsResourceLoader
							resourceName="hotel"
							itemComponent={HotelCard}
							hotels={hotels.data}
							owner={false}
						/>
					)}
				</Fragment>
			</div>
		</div>
	);
};

export default Home;

/*
{hotels && (
						<HotelsResourceLoader hotels={hotels} resourceName="hotel" itemComponent={HotelCard} />
					)}
*/ 