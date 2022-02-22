import { Fragment, useEffect, useState } from "react";
import { useGetHotelsMutation } from "framework/basic-rest/hotel/use-hotel";
import HotelsResourceLoader from "components/hotels/HotelsResourceLoader";
import HotelCard from "components/hotels/HotelCard";
import LoadingOverlay from "components/common/LoadingOverlay";

const customContainerStyles = {
	paddingTop: "10rem"
};

const Home = () => {
	const [hotels, setHotels] = useState(null);

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

	return (
		<Fragment>
			<div className="container" style={customContainerStyles}>
				<div className="row">
					<Fragment>
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
			{isLoading && !isSuccess && <LoadingOverlay text="Loading Hotels" isActive={true} />}
		</Fragment>
	);
};

export default Home;

/*
{hotels && (
						<HotelsResourceLoader hotels={hotels} resourceName="hotel" itemComponent={HotelCard} />
					)}
*/
