import { connectDB, disconnectDB } from "@/app/db/dbConnection";
import User from "@/models/User";

export async function POST(request) {
	try {
		const body = await request.json();
		console.log({ userTrytoLog: body });

		await connectDB();

		const user = await User.findOne({ email: body.email });
		if (user) {
			return Response.json({
				message: "User already exists"
			});
		}

		const newUser = new User(body);
		await newUser.save();

		await disconnectDB();

		return Response.json({
			message: "you will be registered from this route"
		});
	} catch (err) {
		console.log(err);
	}
}
