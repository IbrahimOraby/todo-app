"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";

function SignUpForm() {
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const email = e.target.email.value;
			const password = e.target.password.value;
			const username = e.target.username.value;

			if (!email || !password || !username) {
				console.log("Please fill in all fields.");
				return;
			}

			const user = { email, password, username };
			const res = await axios.post("/api/auth/sign-up", user);
			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-white px-5 py-10">
			<div className="w-full max-w-md bg-white drop-shadow-xl border border-black/20 rounded-md p-8">
				<h1 className="text-center text-2xl sm:text-3xl font-semibold mb-8">
					Sign Up
				</h1>

				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					<input
						type="email"
						name="email"
						placeholder="Enter Your Email"
						className="input input-bordered w-full text-black placeholder:text-black/70"
					/>
					<input
						type="username"
						name="username"
						placeholder="Enter Your User Name"
						className="input input-bordered w-full text-black placeholder:text-black/70"
					/>
					<input
						type="password"
						name="password"
						placeholder="Enter Your Password"
						className="input input-bordered w-full text-black placeholder:text-black/70"
					/>

					<button type="submit" className="btn btn-primary w-full">
						Sign Up
					</button>
				</form>

				<div className="text-center mt-6">
					<span className="text-sm">Have an account? </span>
					<Link href="/sign-in" className="link text-sm">
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
}

export default SignUpForm;
