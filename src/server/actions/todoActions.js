"use server";

import { connectDB, disconnectDB } from "@/app/db/dbConnection";
import { revalidatePath } from "next/cache";
const Task = require("@/models/Task");
const { default: todoSchema } = require("@/utils/schema/todoSchema");

export async function createToDo(formData) {
	const taskName = formData.get("task_name");
	const description = formData.get("description");

	const newTask = {
		taskName,
		description
	};
	try {
		const taskValues = await todoSchema.parseAsync(newTask);

		await connectDB();

		const task = new Task(taskValues);
		await task.save();

		disconnectDB();

		revalidatePath("/");

		console.log(taskValues);
	} catch (err) {
		console.error(err);
	}
}

export async function deleteToDo(formData) {
	const id = formData.get("id");

	if (!id) return;

	try {
		await connectDB();
		await Task.findByIdAndDelete(id);
		await disconnectDB();

		revalidatePath("/");
	} catch (err) {
		console.error("Failed to delete task:", err);
	}
}
