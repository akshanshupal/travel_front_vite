import { useEffect, useMemo, useState } from "react";
import { cx } from "@/utils/cx";
import type { NavItemDividerType, NavItemType } from "../config";
import { NavItemBase } from "./nav-item";

interface NavListProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** Additional CSS classes to apply to the list. */
    className?: string;
    /** List of items to display. */
    items: (NavItemType | NavItemDividerType)[];
}

export const NavList = ({ activeUrl, items, className }: NavListProps) => {
    const matchesItem = (item: NavItemType | NavItemDividerType, url?: string): boolean => {
        if (!url || item.divider) return false;
        if (item.href === url) return true;
        return Boolean(item.items?.some((child) => matchesItem(child, url)));
    };

    const getItemKey = (item: NavItemType, depth: number) => `${depth}:${item.href ?? item.label}`;

    const activePathOpenKeys = useMemo(() => {
        const keys = new Set<string>();

        const visit = (list: (NavItemType | NavItemDividerType)[], depth: number) => {
            for (const entry of list) {
                if (entry.divider) continue;
                if (entry.items?.length && matchesItem(entry, activeUrl)) {
                    keys.add(getItemKey(entry, depth));
                }
                if (entry.items?.length) visit(entry.items, depth + 1);
            }
        };

        visit(items, 0);
        return keys;
    }, [activeUrl, items]);

    const [openKeys, setOpenKeys] = useState<Set<string>>(() => activePathOpenKeys);

    useEffect(() => {
        setOpenKeys((prev) => {
            const next = new Set(prev);
            for (const key of activePathOpenKeys) next.add(key);
            return next;
        });
    }, [activePathOpenKeys]);

    const renderItem = (item: NavItemType | NavItemDividerType, depth: number): React.ReactNode => {
        if (item.divider) {
            return (
                <li key={`${item.label}-${depth}`} className="w-full px-0.5 py-2">
                    <hr className="h-px w-full border-none bg-border-secondary" />
                </li>
            );
        }

        const hasChildren = Boolean(item.items?.length);
        const paddingClass = depth > 0 ? "pl-3" : "";

        if (hasChildren) {
            const itemKey = getItemKey(item, depth);
            const isOpen = openKeys.has(itemKey);
            return (
                <li key={`${item.label}-${depth}`} className="py-0.5">
                    <details
                        open={isOpen}
                        onToggle={(e) => {
                            const openNow = (e.currentTarget as HTMLDetailsElement).open;
                            setOpenKeys((prev) => {
                                const next = new Set(prev);
                                if (openNow) next.add(itemKey);
                                else next.delete(itemKey);
                                return next;
                            });
                        }}
                        className="group/details appearance-none py-0.5"
                    >
                        <NavItemBase
                            href={item.href}
                            badge={item.badge}
                            icon={item.icon}
                            type="collapsible"
                            open={isOpen}
                            className={paddingClass.replace("pl-", "ml-")}
                        >
                            {item.label.replace(/^\d+\s*/, "")}
                        </NavItemBase>
                        <div className={cx("relative border-l border-border-secondary", paddingClass.replace("pl-", "ml-"))}>
                            <ul className="py-0.5 pl-3">{item.items?.map((child) => renderItem(child, depth + 1))}</ul>
                        </div>
                    </details>
                </li>
            );
        }

        return (
            <li key={`${item.label}-${depth}`} className="py-0.5">
                <NavItemBase
                    type={depth > 0 ? "collapsible-child" : "link"}
                    badge={item.badge}
                    icon={item.icon}
                    href={item.href}
                    current={activeUrl === item.href}
                    className={cx(paddingClass.replace("pl-", "ml-"), depth > 0 && "!pl-3")}
                >
                    {item.label.replace(/^\d+\s*/, "")}
                </NavItemBase>
            </li>
        );
    };

    return (
        <ul className={cx("mt-4 flex flex-col px-2 lg:px-4", className)}>
            {items.map((item) => renderItem(item, 0))}
        </ul>
    );
};
