import { Button } from "@/components/base/buttons/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDialQueueSummary } from "@/utils/services/dialService";
import { DialShell, EmptyPanel, Metric } from "./shared";

export default function DialHomePage() {
    const navigate = useNavigate();
    const [summary, setSummary] = useState<Record<string, any>>({});
    useEffect(() => { getDialQueueSummary().then(setSummary).catch(() => setSummary({})); }, []);
    return <DialShell title="Dial home" description="Focus your calling day, review workload, and move quickly between dial operations." action={<Button color="primary" onClick={() => navigate("/dial/leads")}>Open lead queue</Button>}><div className="grid grid-cols-1 gap-4 sm:grid-cols-3"><Metric label="Leads ready" value={summary.ready ?? "—"}/><Metric label="Connected leads" value={summary.connected ?? "—"} tone="success"/><Metric label="Follow-ups due" value={summary.followUpDue ?? "—"} tone="warning"/></div><div className="grid grid-cols-1 gap-4 lg:grid-cols-2"><EmptyPanel title="Start a calling session" description="Select a campaign from the lead queue to begin." action={<Button color="secondary" onClick={() => navigate("/dial/campaigns")}>View campaigns</Button>}/><EmptyPanel title="Your next actions" description={`${summary.notConnected ?? 0} leads have not connected yet.`} action={<Button color="secondary" onClick={() => navigate("/dial/tasks")}>View tasks</Button>}/></div></DialShell>;
}
