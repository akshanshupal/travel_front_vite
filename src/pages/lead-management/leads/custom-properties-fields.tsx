import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";

export type ContactPropertyDefinition = {
    id: string;
    key: string;
    label: string;
    fieldType: string;
    required?: boolean;
    description?: string;
};

export const normalizeContactProperties = (response: any): ContactPropertyDefinition[] => {
    const resolved = response?.data ?? response;
    const list = Array.isArray(resolved?.data) ? resolved.data : Array.isArray(resolved) ? resolved : resolved?.items || [];
    return list.map((item: any) => {
        const id = String(item?.id ?? item?._id ?? "").trim();
        const key = String(item?.key ?? id).trim();
        return {
            id,
            key,
            label: item?.label || item?.title || key,
            fieldType: item?.fieldType || item?.dataType?.type || item?.dataType?.key || "text",
            required: Boolean(item?.required),
            description: item?.description || "",
        };
    }).filter((item: ContactPropertyDefinition) => item.key);
};

export const normalizeCustomPropertyPayload = (definitions: ContactPropertyDefinition[], values: Record<string, any>) => {
    const types = new Map(definitions.map(item => [item.key, item.fieldType]));
    return Object.fromEntries(Object.entries(values).map(([key, value]) => {
        const type = types.get(key);
        if (type === "boolean") return [key, value === true || value === "true"];
        if (type === "number" && value !== "") return [key, Number(value)];
        return [key, value];
    }));
};

export function CustomPropertiesFields({ definitions, values, onChange }: {
    definitions: ContactPropertyDefinition[];
    values: Record<string, any>;
    onChange: (key: string, value: any) => void;
}) {
    if (!definitions.length) return null;
    return <div className="border-t border-secondary pt-5">
        <h3 className="mb-3 text-sm font-semibold text-primary">Custom Contact Properties</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {definitions.map(property => property.fieldType === "boolean" ? (
                <div key={property.key} className="flex flex-col gap-1.5">
                    <Label>{property.label}{property.required ? " *" : ""}</Label>
                    <Select
                        aria-label={property.label}
                        selectedKey={values[property.key] === true || values[property.key] === "true" ? "true" : "false"}
                        onChange={undefined}
                        onSelectionChange={key => onChange(property.key, String(key) === "true")}
                        items={[{ id: "true", label: "Yes" }, { id: "false", label: "No" }]}
                    >{item => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select>
                    {property.description ? <p className="text-xs text-tertiary">{property.description}</p> : null}
                </div>
            ) : (
                <Input
                    key={property.key}
                    label={`${property.label}${property.required ? " *" : ""}`}
                    hint={property.description || undefined}
                    type={property.fieldType === "phone" ? "tel" : (["number", "date", "email", "url"].includes(property.fieldType) ? property.fieldType : "text")}
                    value={values[property.key] == null ? "" : String(values[property.key])}
                    onChange={value => onChange(property.key, value)}
                />
            ))}
        </div>
    </div>;
}
