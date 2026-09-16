import { Button } from "@/components/base/buttons/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { completeDialTask, getDialTasks, type DialTask } from "@/utils/services/dialService";
import { DialShell, EmptyPanel } from "../shared";

export default function DialTasksPage() {
    const navigate = useNavigate(); const [tasks, setTasks] = useState<DialTask[]>([]);
    const load = () => getDialTasks({ page: 1, limit: 50 }).then((response) => setTasks(response?.data || [])).catch(() => setTasks([]));
    useEffect(() => { load(); }, []);
    return <DialShell title="Tasks" description="Keep track of your dial follow-up work." action={<div className="flex flex-wrap gap-2"><Button color="secondary" onClick={() => navigate("/dial/tasks/assign-to-me")}>Assigned to me</Button><Button color="secondary" onClick={() => navigate("/dial/tasks/reported-by-me")}>Reported by me</Button></div>}><div className="rounded-xl border border-secondary bg-primary p-4">{tasks.length ? <div className="divide-y divide-secondary">{tasks.map((task) => <div key={String(task.id)} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-medium text-primary">{task.title || task.description || task.type || "Dial task"}</p><p className="text-sm text-tertiary">Due {task.dueAt ? new Date(task.dueAt).toLocaleString() : "—"} · {task.status || "pending"}</p></div>{task.status !== "completed" && <Button color="secondary" size="sm" onClick={async () => { await completeDialTask(String(task.id)); load(); }}>Complete</Button>}</div>)}</div> : <EmptyPanel title="No tasks assigned" description="You have no open dial tasks."/>}</div></DialShell>;
}
