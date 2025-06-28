export async function GET(request) {
	console.log(request);

	return Response.json({
		message: "we are at next api main folder "
	});
}

export async function POST(request) {
	const body = await request.json();
	console.log(body);

	return Response.json({
		message: "You used Post method "
	});
}
