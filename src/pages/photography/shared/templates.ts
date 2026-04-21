export type PhotographyTemplate = {
    id: string;
    name: string;
    mainEventName: string;
    timing: string;
    deliverables: string[];
    packageCost: number;
};

export const defaultPhotographyTemplates: PhotographyTemplate[] = [
    {
        id: "wedding",
        name: "Wedding",
        mainEventName: "Wedding",
        timing: "",
        deliverables: [
            "Raw Data",
            "Traditional 4K Video",
            "Instagram Reels",
            "Photographer",
            "Videographer",
            "Drone",
            "Album (Glossy/Matt Paper 12x36)",
        ],
        packageCost: 0,
    },
    {
        id: "birthday-shoot",
        name: "Birthday Shoot",
        mainEventName: "Birthday Shoot",
        timing: "",
        deliverables: [
            "All Raw Data",
            "80-100 Edited Photos",
            "Instagram Reel",
            "Family Photos Included",
            "Photographer",
            "Videographer",
            "1 Photo Frame",
            "Album (Glossy/Matt Paper 20 Sheets 9x24)",
        ],
        packageCost: 0,
    },
    {
        id: "engagement",
        name: "Engagement",
        mainEventName: "Engagement",
        timing: "",
        deliverables: ["All Raw Data", "50 Edited Photos", "Photographer", "Videographer", "Instagram Reels"],
        packageCost: 0,
    },
    {
        id: "haldi-mehndi",
        name: "Haldi & Mehndi",
        mainEventName: "Haldi & Mehndi",
        timing: "",
        deliverables: ["All Photos", "Instagram Reels", "1 Full Function Video", "Photographer", "Videographer"],
        packageCost: 0,
    },
    {
        id: "annaprashan-traditional-ritual",
        name: "Annaprashan / Traditional Ritual",
        mainEventName: "Annaprashan / Traditional Ritual",
        timing: "",
        deliverables: ["2 Hours Shoot", "All Raw Photos", "Photography Include"],
        packageCost: 0,
    },
];

const STORAGE_KEY = "photography-template-overrides-v1";

export const loadPhotographyTemplates = () => {
    if (typeof window === "undefined") return defaultPhotographyTemplates;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPhotographyTemplates;
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return defaultPhotographyTemplates;
        return parsed;
    } catch {
        return defaultPhotographyTemplates;
    }
};

export const savePhotographyTemplates = (templates: PhotographyTemplate[]) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
};

export const getPhotographyTemplateById = (id: string) => {
    const templates = loadPhotographyTemplates();
    return templates.find((item) => item.id === id) || null;
};

export const addPhotographyTemplate = (template: PhotographyTemplate) => {
    const templates = loadPhotographyTemplates();
    const next = [...templates, template];
    savePhotographyTemplates(next);
    return next;
};

export const updatePhotographyTemplateById = (id: string, patch: Partial<PhotographyTemplate>) => {
    const templates = loadPhotographyTemplates();
    const next = templates.map((item) => (item.id === id ? { ...item, ...patch } : item));
    savePhotographyTemplates(next);
    return next;
};
