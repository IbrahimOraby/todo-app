const { default: mongoose } = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/todo-portsaid");
		console.log("We are connected to DB");
	} catch (err) {
		throw err;
	}
};

const disconnectDB = async () => await mongoose.disconnect();

module.exports = { connectDB , disconnectDB};
