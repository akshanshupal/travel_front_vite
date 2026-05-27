import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CompanyConfig = {
    id?: string;
    _id?: string;
    company?: string | any | null;
    panelUrl?: string;
    websiteUrls?: unknown;
    apiKey?: string;
    logo?: string;
    favicon?: string;
    address?: string;
    paymentReceiptPrefix?: string;
    paymentReceiptLength?: number;
    email?: string;
    packagePrefix?: string;
    packageLength?: string;
    [key: string]: any;
};

type CompanyState = {
    company: CompanyConfig | null;
    setCompany: (company: CompanyConfig | null) => void;
    clearCompany: () => void;
};

export const useStoreCompany = create<CompanyState>()(
    persist(
        (set) => ({
            company: null,
            setCompany: (company) => set({ company }),
            clearCompany: () => set({ company: null }),
        }),
        { name: "tz-company-storage" },
    ),
);
