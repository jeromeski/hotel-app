exports.register = async (req, res) => {
	try {
		console.log(req.body);
		res.send("Hello World");
	} catch (error) {
		console.log(error);
	}
};
