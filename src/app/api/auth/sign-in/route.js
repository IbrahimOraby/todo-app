import User from "@/models/User";

export async function POST(request) {
	const body = await request.json();
	console.log({ userTrytoLog: body });

	const user = await User.findOne({ email: body.email });

	return Response.json({
		message: "you will use this route to sign in"
	});
}
