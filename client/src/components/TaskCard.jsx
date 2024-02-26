import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";

function TaskCard({ task }) {
  const date = new Date(parseInt(task.date));
  const legibleDate = date.toLocaleDateString();

  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 p-10 rounded-md">
      <header className="flex justify-between flex-wrap">
        <h1 className="text-2xl font-bold flex-grow">{task.title}</h1>
        <div className="flex flex-wrap gap-x-2 items-center">
          <button
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            Delete
          </button>
          <Link to={`/tasks/${task._id}`}>Edit</Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>{legibleDate}</p>
    </div>
  );
}

export default TaskCard;
