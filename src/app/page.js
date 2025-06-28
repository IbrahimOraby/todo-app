import Task from "@/models/Task";
import { z } from "zod";
import { connectDB, disconnectDB } from "./db/dbConnection";
import { revalidatePath } from "next/cache";
import { createToDo, deleteToDo } from "@/server/actions/todoActions";

// const todoSchema = z.object({
// 	taskName: z.string().min(3).max(20),
// 	description: z.string().optional()
// });

export default async function Home() {
	async function getToDos() {
		await connectDB();
		const tasks = await Task.find();
		await disconnectDB();

		return tasks.map((task) => ({
			id: task._id.toString(),
			taskName: task.taskName,
			description: task.description || ""
		}));
	}
	const tasks = await getToDos();

	return (
		<div className=" my-12 flex flex-col items-center ">
			<div className="border-1 border-gray-100 rounded-2xl p-8 flex flex-col items-center  ">
				<h2 className="mb-4 text-4xl font-extrabold leading-none">
					Add Your Task
				</h2>
				<form action={createToDo} className="flex flex-col gap-5 items-center ">
					<div className="flex flex-col">
						<label htmlFor="task_name">Task</label>
						<input
							type="text"
							id="task_name"
							name="task_name"
							placeholder="Enter your task name"
							className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="description">Description</label>
						<input
							type="text"
							id="description"
							name="description"
							placeholder="Enter your task description"
							className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent"
						/>
					</div>
					<button
						type="submit"
						className="btn border-1 rounded-full px-4 py-2 bg-emerald-400 hover:bg-emerald-600 hover:cursor-pointer"
					>
						Submit
					</button>
				</form>
			</div>

			<div className="flex flex-col items-center border border-gray-100 py-4 px-8 rounded-2xl mt-6">
				<h3 className="mb-4 text-2xl font-bold leading-none">To Do List</h3>
				<ul className=" py-1 list-disc">
					{tasks.map((task, index) => (
						<li key={index} className="flex gap-4 justify-between mb-2 pb-1 border-slate-200 border-b-1">
							<span className="">{task.taskName}</span>
							<form action={deleteToDo}>
								<input type="hidden" name="id" value={task.id} />
								<button
									type="submit"
									className="text-red-600 hover:text-red-800 hover:cursor-pointer text-sm"
								>
									Delete
								</button>
							</form>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
