import type { FC, ReactNode } from "react";
import { Bell01, ChevronDown, LifeBuoy01, Menu04, Moon01, SearchLg, Settings01, Sun, SwitchHorizontal01, X } from "@untitledui/icons";
import { Button as AriaButton, DialogTrigger, Popover } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { useTheme } from "@/providers/theme-provider";
import { useStoreLogin } from "@/store/login";
import { useStoreSidebar } from "@/store/sidebar";
import { cx } from "@/utils/cx";
import { useLocation, useNavigate } from "react-router";
import { MobileNavigationHeader } from "./base-components/mobile-header";
import { NavAccountCard, NavAccountMenu } from "./base-components/nav-account-card";
import { NavItemBase } from "./base-components/nav-item";
import { NavItemButton } from "./base-components/nav-item-button";
import { NavList } from "./base-components/nav-list";

type NavItem = {
    /** Label text for the nav item. */
    label: string;
    /** URL to navigate to when the nav item is clicked. */
    href: string;
    /** Whether the nav item is currently active. */
    current?: boolean;
    /** Icon component to display. */
    icon?: FC<{ className?: string }>;
    /** Badge to display. */
    badge?: ReactNode;
    /** List of sub-items to display. */
    items?: NavItem[];
};

const getInitials = (name: string) => {
    const cleaned = String(name || "").trim();
    if (!cleaned) return "";
    const parts = cleaned.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : parts[0]?.[1] ?? "";
    return `${first}${last}`.toUpperCase();
};

interface HeaderNavigationBaseProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** List of items to display. */
    items: NavItem[];
    /** List of sub-items to display. */
    subItems?: NavItem[];
    /** Content to display in the trailing position. */
    trailingContent?: ReactNode;
    /** Whether to show the avatar dropdown. */
    showAvatarDropdown?: boolean;
    /** Whether to hide the bottom border. */
    hideBorder?: boolean;
    /** Whether to show the sidebar toggle button. */
    showSidebarToggle?: boolean;
    /** Whether to show the dial/portal switch button. */
    showDialToggle?: boolean;
    /** Whether to show the theme toggle button. */
    showThemeToggle?: boolean;
}

export const HeaderNavigationBase = ({
    activeUrl,
    items,
    subItems,
    trailingContent,
    showAvatarDropdown = true,
    hideBorder = false,
    showSidebarToggle = true,
    showDialToggle = true,
    showThemeToggle = true,
}: HeaderNavigationBaseProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { sidebar, toggleSidebar, openDialSidebar, openSidebar } = useStoreSidebar();
    const { theme, setTheme } = useTheme();
    const storeUser = useStoreLogin((s) => s.user);
    const userAvatarSrc = storeUser?.avatarUrl || storeUser?.avatar || storeUser?.profileImg || storeUser?.image || undefined;
    const userInitials = getInitials(storeUser?.name || "");

    const isDialPage = pathname.startsWith("/dial");
    const isDarkMode =
        theme === "dark" ||
        (theme === "system" && typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)")?.matches);

    const activeSubNavItems = subItems || items.find((item) => item.current && item.items && item.items.length > 0)?.items;
    const normalizePath = (value: string) => (value !== "/" && value.endsWith("/") ? value.slice(0, -1) : value);
    const isPathMatch = (path: string, href: string) => {
        const pathname = normalizePath(path);
        const target = normalizePath(href);
        if (target === "/") return pathname === "/";
        if (!pathname.startsWith(target)) return false;
        const nextChar = pathname.charAt(target.length);
        return nextChar === "" || nextChar === "/" || nextChar === "?" || nextChar === "#";
    };
    const matchesPath = (entry: NavItem, path: string): boolean =>
        isPathMatch(path, entry.href) || Boolean(entry.items?.some((child) => matchesPath(child, path)));
    const activeSection = items.find((item) => matchesPath(item, pathname));
    const primaryNavItems = activeSection?.items?.length ? activeSection.items : items;

    const renderDropdownItem = (child: NavItem): ReactNode => {
        const isChildActive = child.current || matchesPath(child, pathname);

        if (child.items && child.items.length > 0) {
            return (
                <li key={child.label} className="relative group/child px-2 py-0.5">
                    <NavItemBase icon={child.icon} href={child.href} current={isChildActive} badge={child.badge} type="link">
                        <span className="flex w-full items-center justify-between">
                            <span>{child.label}</span>
                            <ChevronDown className="ml-2 size-4 -rotate-90 text-fg-quaternary transition-inherit-all" />
                        </span>
                    </NavItemBase>
                    <div className="absolute left-full top-0 z-50 ml-2 hidden min-w-56 rounded-lg border border-secondary bg-primary shadow-lg group-hover/child:block before:absolute before:-left-2 before:top-0 before:h-full before:w-2 before:content-['']">
                        <ul className="py-2">
                            {child.items.map((grandChild) => (
                                <li key={grandChild.label} className="px-2 py-0.5">
                                    <NavItemBase
                                        icon={grandChild.icon}
                                        href={grandChild.href}
                                        current={matchesPath(grandChild, pathname)}
                                        badge={grandChild.badge}
                                        type="link"
                                    >
                                        {grandChild.label}
                                    </NavItemBase>
                                </li>
                            ))}
                        </ul>
                    </div>
                </li>
            );
        }

        return (
            <li key={child.label} className="px-2 py-0.5">
                <NavItemBase icon={child.icon} href={child.href} current={isChildActive} badge={child.badge} type="link">
                    {child.label}
                </NavItemBase>
            </li>
        );
    };

    const renderPrimaryNavItem = (item: NavItem): ReactNode => {
        const isActive = item.current || item.items?.some((child) => matchesPath(child, pathname));

        if (item.items && item.items.length > 0) {
            return (
                <li key={item.label} className="relative py-0.5 group">
                    <AriaButton
                        className={cx(
                            "group flex items-center rounded-md bg-primary px-3 py-2 outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
                            isActive && "bg-active hover:bg-secondary_hover text-brand-secondary",
                        )}
                    >
                        {item.icon && <item.icon aria-hidden="true" className="mr-2 size-5 shrink-0 text-fg-quaternary transition-inherit-all" />}
                        <span
                            className={cx(
                                "text-md font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover",
                                isActive && "text-brand-secondary font-semibold",
                            )}
                        >
                            {item.label}
                        </span>
                        <ChevronDown className="ml-2 size-4 text-fg-quaternary transition-inherit-all" />
                    </AriaButton>
                    <div className="absolute left-0 top-full z-50 mt-2 hidden min-w-56 rounded-lg border border-secondary bg-primary shadow-lg group-hover:block before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-['']">
                        <ul className="py-2">{item.items.map((child) => renderDropdownItem(child))}</ul>
                    </div>
                </li>
            );
        }

        return (
            <li key={item.label} className="py-0.5">
                <NavItemBase icon={item.icon} href={item.href} current={item.current} badge={item.badge} type="link">
                    {item.label}
                </NavItemBase>
            </li>
        );
    };

    const showSecondaryNav = activeSubNavItems && activeSubNavItems.length > 0;

    return (
        <>
            <MobileNavigationHeader>
                <aside className="flex h-full max-w-full flex-col justify-between overflow-auto border-r border-secondary bg-primary pt-4 lg:pt-6">
                    <div className="flex flex-col gap-5 px-4 lg:px-5">
                        <UntitledLogo className="h-8" />
                        <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
                    </div>

                    <NavList items={items} />

                    <div className="mt-auto flex flex-col gap-4 px-2 py-4 lg:px-4 lg:py-6">
                        <div className="flex flex-col gap-1">
                            <NavItemBase type="link" href="#" icon={LifeBuoy01}>
                                Support
                            </NavItemBase>
                            <NavItemBase
                                type="link"
                                href="#"
                                icon={Settings01}
                                badge={
                                    <BadgeWithDot color="success" type="modern" size="sm">
                                        Online
                                    </BadgeWithDot>
                                }
                            >
                                Settings
                            </NavItemBase>
                            <NavItemBase type="link" href="https://www.untitledui.com/" icon={Settings01}>
                                Open in browser
                            </NavItemBase>
                        </div>

                        <NavAccountCard />
                    </div>
                </aside>
            </MobileNavigationHeader>

            <header className="max-lg:hidden">
                <section
                    className={cx(
                        "flex h-16 w-full items-center justify-center bg-primary md:h-18",
                        (!hideBorder || showSecondaryNav) && "border-b border-secondary",
                    )}
                >
                    <div className="flex w-full justify-between pr-3 pl-4 md:px-8">
                        <div className="flex flex-1 items-center gap-4">
                            <a
                                aria-label="Go to homepage"
                                href="/"
                                className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <UntitledLogo className="h-8" />
                            </a>
                            {showSidebarToggle && (
                                <ButtonUtility
                                    size="sm"
                                    color="secondary"
                                    tooltip={sidebar ? "Close sidebar" : "Open sidebar"}
                                    tooltipPlacement="bottom"
                                    icon={sidebar ? X : Menu04}
                                    onClick={() => toggleSidebar()}
                                />
                            )}

                            <nav>
                                <ul className="flex items-center gap-0.5">
                                    {primaryNavItems.map((item) => renderPrimaryNavItem(item))}
                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center gap-3">
                            {showDialToggle && (
                                <ButtonUtility
                                    size="sm"
                                    color="secondary"
                                    tooltip={isDialPage ? "Switch to Portal" : "Switch to Dialer"}
                                    tooltipPlacement="bottom"
                                    icon={SwitchHorizontal01}
                                    onClick={() => {
                                        if (isDialPage) {
                                            openSidebar();
                                            navigate("/dashboard");
                                        } else {
                                            openDialSidebar();
                                            navigate("/dial/home");
                                        }
                                    }}
                                />
                            )}
                            {showThemeToggle && (
                                <ButtonUtility
                                    size="sm"
                                    color="secondary"
                                    tooltip={isDarkMode ? "Switch to Light" : "Switch to Dark"}
                                    tooltipPlacement="bottom"
                                    icon={isDarkMode ? Sun : Moon01}
                                    onClick={() => setTheme(isDarkMode ? "light" : "dark")}
                                />
                            )}
                            {trailingContent}

                            <div className="flex gap-0.5">
                                <NavItemButton
                                    current={activeUrl === "/settings-01"}
                                    size="md"
                                    icon={Settings01}
                                    label="Settings"
                                    href="/settings-01"
                                    tooltipPlacement="bottom"
                                />
                                <NavItemButton
                                    current={activeUrl === "/notifications-01"}
                                    size="md"
                                    icon={Bell01}
                                    label="Notifications"
                                    href="/notifications-01"
                                    tooltipPlacement="bottom"
                                />
                            </div>

                            {showAvatarDropdown && (
                                <DialogTrigger>
                                    <AriaButton
                                        className={({ isPressed, isFocused }) =>
                                            cx(
                                                "group relative inline-flex cursor-pointer",
                                                (isPressed || isFocused) && "rounded-full outline-2 outline-offset-2 outline-focus-ring",
                                            )
                                        }
                                    >
                                        <Avatar alt={storeUser?.name || "User"} src={userAvatarSrc} initials={userInitials} size="md" />
                                    </AriaButton>
                                    <Popover
                                        placement="bottom right"
                                        offset={8}
                                        className={({ isEntering, isExiting }) =>
                                            cx(
                                                "will-change-transform",
                                                isEntering &&
                                                    "duration-300 ease-out animate-in fade-in placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 placement-bottom:slide-in-from-top-2",
                                                isExiting &&
                                                    "duration-150 ease-in animate-out fade-out placement-right:slide-out-to-left-2 placement-top:slide-out-to-bottom-2 placement-bottom:slide-out-to-top-2",
                                            )
                                        }
                                    >
                                        <NavAccountMenu />
                                    </Popover>
                                </DialogTrigger>
                            )}
                        </div>
                    </div>
                </section>

            </header>
        </>
    );
};
