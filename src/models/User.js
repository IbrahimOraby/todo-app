const { default: mongoose } = require("mongoose");
const bc = require("bcryptjs");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String
	},
	createdAt: {
		type: String,
		default: new Date().toISOString()
	}
});

// userSchema.pre("save", async function (next) {
// 	const hashedPassword = await bc.hash(this.password, 6);
// 	console.log({ hashedPassword });

// 	this.password = hashedPassword;

// 	next();
// });

// Model

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
