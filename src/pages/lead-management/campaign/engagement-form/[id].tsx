import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { Toggle } from "@/components/base/toggle/toggle";
import { getCampaign, getCampaignById } from "@/utils/services/campaignService";
import { getContactProperties } from "@/utils/services/contactPropertiesService";
import { normalizeContactProperties, type ContactPropertyDefinition } from "@/pages/lead-management/leads/custom-properties-fields";
import { useStoreSnackbar } from "@/store/snackbar";
import { ArrowLeft, ChevronDown, Copy01, Download01, Plus, RefreshCw01, Save01, Trash01 } from "@untitledui/icons";
import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useNavigate, useParams } from "react-router";

type QuestionType = "Text" | "Short Answer" | "Long Answer" | "Number" | "Date" | "Time" | "Multiple Choice" | "Checkbox" | "Dropdown" | "Attach File" | "Send message" | "Send Email";
type Question = { id: string; type: QuestionType; label: string; formattedLabel?: string; options: string[]; optionRoutes?: Record<string, string>; required: boolean; mappedPropertyKey?: string; allowOther?: boolean; branchByAnswer?: boolean };

type RichTextEditorProps = { value: string; htmlValue?: string; onChange: (label: string, html: string) => void };

const RichTextEditor = ({ value, htmlValue, onChange }: RichTextEditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const savedRange = useRef<Range | null>(null);
    useEffect(() => {
        const editor = editorRef.current;
        const nextHtml = htmlValue || value;
        if (editor && document.activeElement !== editor && editor.innerHTML !== nextHtml) editor.innerHTML = nextHtml;
    }, [htmlValue, value]);

    const rememberSelection = () => {
        const selection = window.getSelection();
        if (selection?.rangeCount && editorRef.current?.contains(selection.anchorNode)) savedRange.current = selection.getRangeAt(0).cloneRange();
    };
    const restoreSelection = () => {
        const selection = window.getSelection();
        if (!selection || !savedRange.current) return;
        selection.removeAllRanges();
        selection.addRange(savedRange.current);
    };
    const runCommand = (command: "bold" | "italic" | "underline" | "removeFormat") => {
        const editor = editorRef.current;
        if (!editor) return;
        editor.focus();
        restoreSelection();
        if (command === "removeFormat") {
            const selection = window.getSelection();
            if (selection?.rangeCount && !selection.isCollapsed) document.execCommand("removeFormat", false);
            else editor.innerHTML = editor.innerText;
        } else document.execCommand(command, false);
        onChange(editor.innerText, editor.innerHTML);
        rememberSelection();
    };

    return <div className="space-y-2">
        <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            role="textbox"
            aria-label="Question"
            className="min-h-9 rounded-lg border border-secondary px-2.5 py-1.5 text-sm text-primary outline-focus-ring focus-visible:outline-2"
            dangerouslySetInnerHTML={{ __html: htmlValue || value }}
            onMouseUp={rememberSelection}
            onKeyUp={rememberSelection}
            onInput={() => { rememberSelection(); }}
            onBlur={() => onChange(editorRef.current?.innerText || "", editorRef.current?.innerHTML || "")}
        />
        <div className="flex items-center gap-3 border-t border-secondary pt-2 text-xs text-secondary">
            <button type="button" className="font-bold" aria-label="Bold" onMouseDown={(event) => { event.preventDefault(); rememberSelection(); runCommand("bold"); }}>B</button>
            <button type="button" className="italic" aria-label="Italic" onMouseDown={(event) => { event.preventDefault(); rememberSelection(); runCommand("italic"); }}>I</button>
            <button type="button" className="underline" aria-label="Underline" onMouseDown={(event) => { event.preventDefault(); rememberSelection(); runCommand("underline"); }}>U</button>
            <button type="button" aria-label="Clear formatting" onMouseDown={(event) => { event.preventDefault(); rememberSelection(); runCommand("removeFormat"); }}>Tₓ</button>
            <span className="text-tertiary">Format the question text</span>
        </div>
    </div>;
};
type Section = { id: string; title: string; next: "next" | "submit"; questions: Question[] };
type FormState = { sections: Section[] };

const storageKey = (id: string) => `campaign-engagement-form:${id}`;
const questionTypes: QuestionType[] = ["Text", "Short Answer", "Long Answer", "Number", "Date", "Time", "Multiple Choice", "Checkbox", "Dropdown", "Attach File", "Send message", "Send Email"];
const newQuestion = (type: QuestionType): Question => ({ id: crypto.randomUUID(), type, label: "", options: ["Option 1", "Option 2"], optionRoutes: {}, required: false, allowOther: false, branchByAnswer: false });
const newSection = (): Section => ({ id: crypto.randomUUID(), title: "", next: "submit", questions: [] });
const initialForm = (): FormState => ({ sections: [{ ...newSection(), next: "submit" }] });

const readDraft = (id: string): FormState => {
    try {
        const parsed = JSON.parse(localStorage.getItem(storageKey(id)) || "null");
        if (parsed?.sections?.length) return parsed;
    } catch { /* use the empty form */ }
    return initialForm();
};

const PreviewQuestion = ({ question }: { question: Question }) => {
    const label = question.formattedLabel || question.label || question.type;
    if (question.type === "Text") return <div className="whitespace-pre-wrap text-sm text-primary" dangerouslySetInnerHTML={{ __html: label }} />;
    if (question.type === "Multiple Choice" || question.type === "Checkbox") return <div className="space-y-2">{question.options.map((option) => <label className="flex items-center gap-2 text-sm text-primary" key={option}><input type={question.type === "Multiple Choice" ? "radio" : "checkbox"} name={question.id} />{option}</label>)}{question.allowOther && <label className="flex items-center gap-2 text-sm text-primary"><input type={question.type === "Multiple Choice" ? "radio" : "checkbox"} name={question.id} />Other</label>}</div>;
    if (question.type === "Dropdown") return <select className="h-9 w-full rounded-md border border-secondary bg-primary px-2 text-sm text-primary"><option>{label}</option>{question.options.map((option) => <option key={option}>{option}</option>)}</select>;
    if (question.type === "Long Answer") return <textarea className="min-h-20 w-full rounded-md border border-secondary bg-primary p-2 text-sm" placeholder={label} />;
    return <input className="h-9 w-full rounded-md border border-secondary bg-primary px-2 text-sm" type={question.type === "Number" ? "number" : question.type === "Date" ? "date" : question.type === "Time" ? "time" : "text"} placeholder={label} />;
};

const QuestionEditor = ({ question, properties, onChange, onRemove }: { question: Question; properties: ContactPropertyDefinition[]; onChange: (value: Question) => void; onRemove: () => void }) => {
    const showOptions = ["Multiple Choice", "Checkbox", "Dropdown"].includes(question.type);
    return (
        <div className="rounded-lg border border-secondary bg-primary p-3 shadow-xs">
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-64 flex-1">
                    <RichTextEditor value={question.label} htmlValue={question.formattedLabel} onChange={(label, html) => onChange({ ...question, label, formattedLabel: html })} />
                </div>
                <div className="flex items-center gap-2">
                    <select className="h-9 rounded-lg border border-secondary bg-primary px-2.5 text-xs text-primary" value={question.type} onChange={(event) => onChange({ ...question, type: event.target.value as QuestionType })} aria-label="Question type">
                        {questionTypes.map((type) => <option key={type}>{type}</option>)}
                    </select>
                    <Button aria-label="Remove question" color="tertiary" size="sm" iconLeading={Trash01} onClick={onRemove} />
                </div>
            </div>
            {question.type !== "Text" && <div className="mt-2 rounded-lg bg-secondary/40 p-2">
                <Toggle size="sm" isSelected={question.required} onChange={(isSelected) => onChange({ ...question, required: isSelected })}>
                    Required
                </Toggle>
                <details className="mt-2 rounded-lg border border-secondary bg-primary p-2" open={Boolean(question.mappedPropertyKey)}>
                    <summary className="cursor-pointer font-semibold text-primary">Preference</summary>
                    <div className="mt-2 space-y-1.5">
                        <Toggle size="sm" isSelected={Boolean(question.mappedPropertyKey)} onChange={(isSelected) => onChange({ ...question, mappedPropertyKey: isSelected ? question.mappedPropertyKey || properties[0]?.key : undefined })}>Map this question to a Custom Contact Property?</Toggle>
                        {question.mappedPropertyKey && <select className="h-9 w-full rounded-lg border border-secondary bg-primary px-2.5 text-xs text-primary" value={question.mappedPropertyKey} onChange={(event) => onChange({ ...question, mappedPropertyKey: event.target.value || undefined })} aria-label="Custom contact property">
                            <option value="">Select custom contact property</option>
                            {properties.map((property) => <option key={property.key} value={property.key}>{property.label}</option>)}
                        </select>}
                        {question.type === "Multiple Choice" && <>
                            <Toggle size="sm" isSelected={Boolean(question.branchByAnswer)} onChange={(isSelected) => onChange({ ...question, branchByAnswer: isSelected })}>Go to section based on answer</Toggle>
                            <Toggle size="sm" isSelected={Boolean(question.allowOther)} onChange={(isSelected) => onChange({ ...question, allowOther: isSelected })}>Allow other as an option?</Toggle>
                        </>}
                    </div>
                </details>
            </div>}
            {showOptions && <div className="mt-2 space-y-1.5">
                {question.options.map((option, index) => <div className="flex items-center gap-2" key={`${question.id}-${index}`}><Input aria-label={`Option ${index + 1}`} value={option} onChange={(value) => onChange({ ...question, options: question.options.map((item, itemIndex) => itemIndex === index ? value : item) })} /><Button color="tertiary" iconLeading={Trash01} aria-label="Remove option" onClick={() => onChange({ ...question, options: question.options.filter((_, itemIndex) => itemIndex !== index) })} /></div>)}
                <Button color="tertiary" size="sm" iconLeading={Plus} onClick={() => onChange({ ...question, options: [...question.options, `Option ${question.options.length + 1}`] })}>Add option</Button>
            </div>}
        </div>
    );
};

export default function CampaignEngagementFormPage() {
    const navigate = useNavigate();
    const { id = "" } = useParams<{ id: string }>();
    const { showSnackbar } = useStoreSnackbar();
    const [campaignTitle, setCampaignTitle] = useState("Campaign");
    const [form, setForm] = useState<FormState>(() => readDraft(id));
    const [importOpen, setImportOpen] = useState(false);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);
    const [properties, setProperties] = useState<ContactPropertyDefinition[]>([]);

    useEffect(() => {
        if (!id) return;
        getCampaignById(id).then((response: any) => setCampaignTitle(response?.data?.title || response?.title || "Campaign")).catch(() => undefined);
        getContactProperties({ limit: "all" }).then((response) => setProperties(normalizeContactProperties(response))).catch(() => setProperties([]));
    }, [id]);

    const save = () => {
        setSaving(true);
        localStorage.setItem(storageKey(id), JSON.stringify(form));
        setTimeout(() => { setSaving(false); showSnackbar({ title: "Saved", description: "Engagement form changes saved for this campaign.", color: "success" }); }, 250);
    };
    const clear = () => setForm(initialForm());
    const updateSection = (sectionId: string, update: Partial<Section>) => setForm((current) => ({ ...current, sections: current.sections.map((section) => section.id === sectionId ? { ...section, ...update } : section) }));
    const updateQuestion = (sectionId: string, question: Question) => updateSection(sectionId, { questions: form.sections.find((section) => section.id === sectionId)?.questions.map((item) => item.id === question.id ? question : item) || [] });
    const addQuestion = (sectionId: string, type: QuestionType) => updateSection(sectionId, { questions: [...(form.sections.find((section) => section.id === sectionId)?.questions || []), newQuestion(type)] });
    const removeSection = (sectionId: string) => setForm((current) => ({ ...current, sections: current.sections.length === 1 ? [newSection()] : current.sections.filter((section) => section.id !== sectionId) }));
    const previewSections = useMemo(() => form.sections.filter((section) => section.title.trim() || section.questions.length), [form.sections]);

    const openImport = async () => {
        try { const response: any = await getCampaign({ limit: "all", select: "title" }); const value = response?.data ?? response; setCampaigns(Array.isArray(value?.data) ? value.data : Array.isArray(value) ? value : []); } catch { setCampaigns([]); }
        setImportOpen(true);
    };
    const importCampaign = (campaignId: string) => { setForm(readDraft(campaignId)); setImportOpen(false); showSnackbar({ title: "Imported", description: "The campaign form was imported into this draft.", color: "success" }); };

    return <DefaultLayout>
        <div className="min-h-[calc(100vh-5rem)] bg-primary pb-6 text-sm">
            <header className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-secondary pb-3">
                <div className="flex items-center gap-2"><Button color="tertiary" size="sm" iconLeading={ArrowLeft} onClick={() => navigate(`/lead-management/campaign/view/${id}`)} /><h1 className="text-lg font-semibold text-primary">{campaignTitle}</h1></div>
                <div className="flex flex-wrap gap-2"><Button color="secondary" iconLeading={RefreshCw01} onClick={clear}>Clear Form</Button><Button color="secondary" iconLeading={Download01} onClick={openImport}>Import Form</Button><Button color="primary" iconLeading={Save01} isLoading={saving} onClick={save}>Save Changes</Button></div>
            </header>
            <div className="grid gap-3 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.8fr)]">
                <main className="space-y-3">
                    {form.sections.map((section, index) => <section className="overflow-visible rounded-xl border border-secondary bg-primary" key={section.id}>
                        <div className="rounded-t-xl bg-brand-solid px-3 py-2 text-base font-semibold text-white">Section {index + 1} of {form.sections.length}</div>
                        <div className="space-y-3 p-3">
                            <div className="flex items-start gap-2"><Input aria-label="Section title" placeholder="Section title" value={section.title} onChange={(value) => updateSection(section.id, { title: value })} className="flex-1 text-base" /><Button color="tertiary" iconLeading={Copy01} aria-label="Copy section" onClick={() => setForm((current) => ({ ...current, sections: [...current.sections, { ...section, id: crypto.randomUUID(), title: `${section.title} copy`, questions: section.questions.map((question) => ({ ...question, id: crypto.randomUUID() })) }] }))} /><Button color="tertiary" iconLeading={Trash01} aria-label="Delete section" onClick={() => removeSection(section.id)} /></div>
                            {section.questions.map((question) => <QuestionEditor key={question.id} question={question} properties={properties} onChange={(value) => updateQuestion(section.id, value)} onRemove={() => updateSection(section.id, { questions: section.questions.filter((item) => item.id !== question.id) })} />)}
                            <div className="flex flex-wrap items-center gap-2 border-t border-secondary pt-2"><span className="text-xs font-medium text-primary">After this section, go to</span><select className="h-9 rounded-lg border border-secondary bg-primary px-2.5 text-xs text-primary" value={section.next} onChange={(event) => updateSection(section.id, { next: event.target.value as Section["next"] })}><option value="next">Next section</option><option value="submit">Submit form</option></select></div>
                        </div>
                        <div className="flex justify-center translate-y-4"><Dropdown.Root><Button color="secondary" size="sm" iconTrailing={ChevronDown}>Add Question</Button><Dropdown.Popover><Dropdown.Menu>{index === form.sections.length - 1 && <Dropdown.Item onAction={() => setForm((current) => ({ ...current, sections: [...current.sections, newSection()] }))}>Add section</Dropdown.Item>}{questionTypes.map((type) => <Dropdown.Item key={type} onAction={() => addQuestion(section.id, type)}>{type}</Dropdown.Item>)}</Dropdown.Menu></Dropdown.Popover></Dropdown.Root></div>
                    </section>)}
                </main>
                <aside className="h-fit rounded-xl border border-secondary bg-primary p-3 xl:sticky xl:top-3"><h2 className="border-b border-secondary pb-2 text-base font-semibold text-primary">Preview</h2><div className="mt-3 space-y-2">{previewSections.length ? previewSections.map((section, index) => <div className="overflow-hidden rounded-lg border border-secondary" key={section.id}><div className="bg-brand-solid px-3 py-2 text-sm font-semibold text-white">{section.title || `Section ${index + 1}`}</div><div className="space-y-3 p-3">{section.questions.length ? section.questions.map((question) => <div className="space-y-1" key={question.id}>{question.type !== "Text" && <p className="text-sm font-medium text-primary">{question.label || question.type}{question.required && <span className="text-error-primary"> *</span>}</p>}<PreviewQuestion question={question} /></div>) : <p className="text-sm text-tertiary">No questions added yet.</p>}</div></div>) : <p className="text-sm text-tertiary">Your form preview will appear here.</p>}</div></aside>
            </div>
        </div>
        {importOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setImportOpen(false)}><div className="w-full max-w-lg rounded-xl bg-primary p-5 shadow-xl" onClick={(event) => event.stopPropagation()}><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold text-primary">Import form from campaign</h2><Button color="tertiary" onClick={() => setImportOpen(false)}>Close</Button></div><div className="max-h-80 space-y-2 overflow-auto">{campaigns.filter((campaign) => String(campaign.id || campaign._id) !== id).map((campaign) => <button className="flex w-full items-center justify-between rounded-lg border border-secondary p-3 text-left hover:bg-secondary" key={campaign.id || campaign._id} onClick={() => importCampaign(String(campaign.id || campaign._id))}><span>{campaign.title || "Untitled campaign"}</span><span className="text-sm text-tertiary">Import</span></button>)}{!campaigns.length && <p className="py-6 text-center text-sm text-tertiary">No other campaigns found.</p>}</div></div></div>}
    </DefaultLayout>;
}
