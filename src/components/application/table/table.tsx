import type { ComponentPropsWithRef, HTMLAttributes, ReactNode, Ref, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { createContext, isValidElement, useContext, useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { ArrowDown, ChevronSelectorVertical, Copy01, Edit01, HelpCircle, Trash01 } from "@untitledui/icons";
import type {
    CellProps as AriaCellProps,
    ColumnProps as AriaColumnProps,
    RowProps as AriaRowProps,
    TableHeaderProps as AriaTableHeaderProps,
    TableProps as AriaTableProps,
} from "react-aria-components";
import {
    Cell as AriaCell,
    Collection as AriaCollection,
    Column as AriaColumn,
    Group as AriaGroup,
    Row as AriaRow,
    Table as AriaTable,
    TableBody as AriaTableBody,
    TableHeader as AriaTableHeader,
    useTableOptions,
} from "react-aria-components";
import { Badge } from "@/components/base/badges/badges";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx } from "@/utils/cx";

export const TableRowActionsDropdown = () => (
    <Dropdown.Root>
        <Dropdown.DotsButton />

        <Dropdown.Popover className="w-min">
            <Dropdown.Menu>
                <Dropdown.Item icon={Edit01}>
                    <span className="pr-4">Edit</span>
                </Dropdown.Item>
                <Dropdown.Item icon={Copy01}>
                    <span className="pr-4">Copy link</span>
                </Dropdown.Item>
                <Dropdown.Item icon={Trash01}>
                    <span className="pr-4">Delete</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
);

const TableContext = createContext<{ size: "sm" | "md" }>({ size: "md" });

const TableCardRoot = ({ children, className, size = "md", ...props }: HTMLAttributes<HTMLDivElement> & { size?: "sm" | "md" }) => {
    return (
        <TableContext.Provider value={{ size }}>
            <div {...props} className={cx("rounded-xl bg-primary shadow-xs ring-1 ring-secondary", className)}>
                {children}
            </div>
        </TableContext.Provider>
    );
};

interface TableCardHeaderProps {
    /** The title of the table card header. */
    title: string;
    /** The badge displayed next to the title. */
    badge?: ReactNode;
    /** The description of the table card header. */
    description?: string;
    /** The content displayed after the title and badge. */
    contentTrailing?: ReactNode;
    /** The class name of the table card header. */
    className?: string;
}

const TableCardHeader = ({ title, badge, description, contentTrailing, className }: TableCardHeaderProps) => {
    const { size } = useContext(TableContext);

    return (
        <div
            className={cx(
                "relative flex flex-col items-start gap-4 border-b border-secondary bg-primary px-4 md:flex-row",
                size === "sm" ? "py-4 md:px-5" : "py-5 md:px-6",
                className,
            )}
        >
            <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                    <h2 className={cx("font-semibold text-primary", size === "sm" ? "text-md" : "text-lg")}>{title}</h2>
                    {badge ? (
                        isValidElement(badge) ? (
                            badge
                        ) : (
                            <Badge color="brand" size="sm">
                                {badge}
                            </Badge>
                        )
                    ) : null}
                </div>
                {description && <p className="text-sm text-tertiary">{description}</p>}
            </div>
            {contentTrailing}
        </div>
    );
};

interface TableRootProps extends AriaTableProps, Omit<ComponentPropsWithRef<"table">, "className" | "slot" | "style"> {
    size?: "sm" | "md";
    scrollX?: "auto" | "none" | "autoBelowLg";
}

const TableRoot = ({ className, size = "md", scrollX = "autoBelowLg", ...props }: TableRootProps) => {
    const context = useContext(TableContext);

    return (
        <TableContext.Provider value={{ size: context?.size ?? size }}>
            <div
                className={cx(
                    "overflow-y-visible",
                    scrollX === "none" ? "overflow-x-visible" : scrollX === "auto" ? "overflow-x-auto" : "overflow-x-auto lg:overflow-x-visible",
                )}
            >
                <AriaTable className={(state) => cx("w-full", typeof className === "function" ? className(state) : className)} {...props} />
            </div>
        </TableContext.Provider>
    );
};
TableRoot.displayName = "Table";

interface TableHeaderProps<T extends object>
    extends AriaTableHeaderProps<T>,
        Omit<ComponentPropsWithRef<"thead">, "children" | "className" | "slot" | "style"> {
    bordered?: boolean;
}

const TableHeader = <T extends object>({ columns, children, bordered = true, className, ...props }: TableHeaderProps<T>) => {
    const { size } = useContext(TableContext);
    const { selectionBehavior, selectionMode } = useTableOptions();

    return (
        <AriaTableHeader
            {...props}
            className={(state) =>
                cx(
                    "sticky top-0 z-30 bg-secondary",
                    size === "sm" ? "h-9" : "h-11",

                    // Row border—using an "after" pseudo-element to avoid the border taking up space.
                    bordered &&
                        "[&>tr>th]:after:pointer-events-none [&>tr>th]:after:absolute [&>tr>th]:after:inset-x-0 [&>tr>th]:after:bottom-0 [&>tr>th]:after:h-px [&>tr>th]:after:bg-border-secondary [&>tr>th]:focus-visible:after:bg-transparent",

                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {selectionBehavior === "toggle" && (
                <AriaColumn className={cx("sticky top-0 z-20 bg-secondary py-2 pr-0 pl-4", size === "sm" ? "w-9 md:pl-5" : "w-11 md:pl-6")}>
                    {selectionMode === "multiple" && (
                        <div className="flex items-start">
                            <Checkbox slot="selection" size={size} />
                        </div>
                    )}
                </AriaColumn>
            )}
            <AriaCollection items={columns}>{children}</AriaCollection>
        </AriaTableHeader>
    );
};

TableHeader.displayName = "TableHeader";

interface TableHeadProps extends AriaColumnProps, Omit<ThHTMLAttributes<HTMLTableCellElement>, "children" | "className" | "id" | "style"> {
    label?: string;
    tooltip?: string;
}

const TableHead = ({ className, tooltip, label, children, ...props }: TableHeadProps) => {
    const { selectionBehavior } = useTableOptions();

    return (
        <AriaColumn
            {...props}
            className={(state) =>
                cx(
                    "sticky top-0 z-20 bg-secondary p-0 px-6 py-2 outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-bg-primary focus-visible:ring-inset",
                    selectionBehavior === "toggle" && "nth-2:pl-3",
                    state.allowsSorting && "cursor-pointer",
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {(state) => (
                <AriaGroup className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                        {label && <span className="text-xs font-semibold whitespace-normal break-words text-quaternary">{label}</span>}
                        {typeof children === "function" ? children(state) : children}
                    </div>

                    {tooltip && (
                        <Tooltip title={tooltip} placement="top">
                            <TooltipTrigger className="cursor-pointer text-fg-quaternary transition duration-100 ease-linear hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover">
                                <HelpCircle className="size-4" />
                            </TooltipTrigger>
                        </Tooltip>
                    )}

                    {state.allowsSorting &&
                        (state.sortDirection ? (
                            <ArrowDown className={cx("size-3 stroke-[3px] text-fg-quaternary", state.sortDirection === "ascending" && "rotate-180")} />
                        ) : (
                            <ChevronSelectorVertical size={12} strokeWidth={3} className="text-fg-quaternary" />
                        ))}
                </AriaGroup>
            )}
        </AriaColumn>
    );
};
TableHead.displayName = "TableHead";

interface TableRowProps<T extends object>
    extends AriaRowProps<T>,
        Omit<ComponentPropsWithRef<"tr">, "children" | "className" | "onClick" | "slot" | "style" | "id"> {
    highlightSelectedRow?: boolean;
}

const TableRow = <T extends object>({ columns, children, className, highlightSelectedRow = true, ...props }: TableRowProps<T>) => {
    const { size } = useContext(TableContext);
    const { selectionBehavior } = useTableOptions();

    return (
        <AriaRow
            {...props}
            className={(state) =>
                cx(
                    "relative outline-focus-ring transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2",
                    size === "sm" ? "h-14" : "h-18",
                    highlightSelectedRow && "selected:bg-secondary",

                    // Row border—using an "after" pseudo-element to avoid the border taking up space.
                    "[&>td]:after:absolute [&>td]:after:inset-x-0 [&>td]:after:bottom-0 [&>td]:after:h-px [&>td]:after:w-full [&>td]:after:bg-border-secondary last:[&>td]:after:hidden [&>td]:focus-visible:after:opacity-0 focus-visible:[&>td]:after:opacity-0",

                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {selectionBehavior === "toggle" && (
                <AriaCell className={cx("relative py-2 pr-0 pl-4", size === "sm" ? "md:pl-5" : "md:pl-6")}>
                    <div className="flex items-end">
                        <Checkbox slot="selection" size={size} />
                    </div>
                </AriaCell>
            )}
            <AriaCollection items={columns}>{children}</AriaCollection>
        </AriaRow>
    );
};

TableRow.displayName = "TableRow";

interface TableCellProps extends AriaCellProps, Omit<TdHTMLAttributes<HTMLTableCellElement>, "children" | "className" | "style" | "id"> {
    ref?: Ref<HTMLTableCellElement>;
}

const TableCell = ({ className, children, ...props }: TableCellProps) => {
    const { size } = useContext(TableContext);
    const { selectionBehavior } = useTableOptions();

    return (
        <AriaCell
            {...props}
            className={(state) =>
                cx(
                    "relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2",
                    size === "sm" && "px-5 py-3",
                    size === "md" && "px-6 py-4",

                    selectionBehavior === "toggle" && "nth-2:pl-3",

                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {children}
        </AriaCell>
    );
};
TableCell.displayName = "TableCell";

interface StickyTableProps<T extends object> {
    ariaLabel: string;
    columns: Array<{ id: string; name: string; isRowHeader?: boolean; className?: string; widthRatio?: number; minWidth?: number | string }>;
    items: Iterable<T> | T[];
    children: (item: T) => ReactNode;
    className?: string;
    containerRef?: Ref<HTMLDivElement>;
    availableWidth?: number;
    loading?: boolean;
    skeletonRows?: number;
}

const StickyTable = <T extends object>({
    ariaLabel,
    columns,
    items,
    children,
    className,
    containerRef: containerRefProp,
    availableWidth,
    loading,
    skeletonRows,
}: StickyTableProps<T>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const floatingScrollRef = useRef<HTMLDivElement | null>(null);
    const [showFloatingHeader, setShowFloatingHeader] = useState(false);
    const [floatingHeaderStyle, setFloatingHeaderStyle] = useState<{ left: number; width: number; height: number } | null>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    const setContainerRef = (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof containerRefProp === "function") {
            containerRefProp(node);
        } else if (containerRefProp && typeof containerRefProp === "object") {
            (containerRefProp as { current: HTMLDivElement | null }).current = node;
        }
    };

    const parseMinWidth = (value?: number | string) => {
        if (typeof value === "number") return value;
        if (typeof value === "string") {
            const trimmed = value.trim();
            if (trimmed.endsWith("px")) {
                const parsed = Number(trimmed.slice(0, -2));
                return Number.isFinite(parsed) ? parsed : 0;
            }
        }
        return 0;
    };
    const minWidths = useMemo(() => columns.map((column) => parseMinWidth(column.minWidth)), [columns]);
    const effectiveWidth = availableWidth && availableWidth > 0 ? availableWidth : containerWidth;
    const { widths: resolvedWidths, minTotal } = useMemo(() => {
        const colParams = columns.map((col, index) => ({
            ...col,
            parsedMin: minWidths[index],
            ratio: col.widthRatio ?? 0,
        }));
        const totalMin = colParams.reduce((acc, col) => acc + col.parsedMin, 0);
        const widthBudget = effectiveWidth > 0 ? effectiveWidth : totalMin;
        if (widthBudget <= totalMin) {
            return { widths: colParams.map((col) => col.parsedMin), minTotal: totalMin };
        }
        const widths = new Array(colParams.length).fill(0);
        const remaining = new Set<number>(colParams.map((_, index) => index));
        let remainingWidth = widthBudget;
        let remainingRatio = colParams.reduce((sum, col) => sum + col.ratio, 0);
        const fixColumn = (index: number) => {
            widths[index] = colParams[index].parsedMin;
            remainingWidth -= colParams[index].parsedMin;
            remainingRatio -= colParams[index].ratio;
            remaining.delete(index);
        };
        colParams.forEach((col, index) => {
            if (col.ratio <= 0) {
                fixColumn(index);
            }
        });
        let adjusted = true;
        while (adjusted) {
            adjusted = false;
            const toFix: number[] = [];
            remaining.forEach((index) => {
                const col = colParams[index];
                const ratioBase = remainingRatio > 0 ? remainingRatio : remaining.size;
                const ratioValue = remainingRatio > 0 ? col.ratio : 1;
                const proposed = remainingWidth * (ratioValue / ratioBase);
                if (proposed < col.parsedMin) {
                    toFix.push(index);
                }
            });
            if (toFix.length > 0) {
                adjusted = true;
                toFix.forEach((index) => fixColumn(index));
            }
        }
        const ratioBase = remainingRatio > 0 ? remainingRatio : remaining.size;
        remaining.forEach((index) => {
            const col = colParams[index];
            const ratioValue = remainingRatio > 0 ? col.ratio : 1;
            widths[index] = remainingWidth * (ratioValue / ratioBase);
        });
        return { widths, minTotal: totalMin };
    }, [columns, effectiveWidth, minWidths]);
    const tableWidthStyle = effectiveWidth > 0 ? `${Math.max(effectiveWidth, minTotal)}px` : "100%";
    const getColumnClassName = (column: { className?: string }) => column.className || "w-32";
    const getColumnStyle = (column: { id: string; minWidth?: number | string; widthRatio?: number }) => {
        const index = columns.findIndex((col) => col.id === column.id);
        const widthValue = resolvedWidths[index];
        const style: { width?: string; minWidth?: string } = {};
        if (Number.isFinite(widthValue) && widthValue > 0) {
            style.width = `${widthValue}px`;
            style.minWidth = `${widthValue}px`;
        } else if (column.minWidth !== undefined) {
            style.minWidth = typeof column.minWidth === "number" ? `${column.minWidth}px` : column.minWidth;
        }
        return style;
    };

    const renderColGroup = () => (
        <colgroup>
            {columns.map((column, index) => {
                const widthValue = resolvedWidths[index];
                const minWidth = minWidths[index];
                const style: { width?: string; minWidth?: string } = {};
                if (Number.isFinite(widthValue) && widthValue > 0) {
                    style.width = `${widthValue}px`;
                    style.minWidth = `${widthValue}px`;
                } else if (minWidth > 0) {
                    style.minWidth = `${minWidth}px`;
                } else if (column.minWidth !== undefined) {
                    style.minWidth = typeof column.minWidth === "number" ? `${column.minWidth}px` : column.minWidth;
                }
                return <col key={column.id} style={style} />;
            })}
        </colgroup>
    );

    const renderHeader = () => (
        <TableHeader columns={columns}>
            {(column) => (
                <TableHead
                    id={column.id}
                    isRowHeader={column.isRowHeader}
                    data-column={column.id}
                    className={getColumnClassName(column)}
                    style={getColumnStyle(column)}
                >
                    <span className="text-xs font-semibold text-quaternary whitespace-normal break-words">{column.name}</span>
                </TableHead>
            )}
        </TableHeader>
    );

    const renderFloatingHeader = () => (
        <table className="table-fixed w-full" style={{ width: tableWidthStyle }}>
            {renderColGroup()}
            <thead className="bg-secondary h-11 [&>tr>th]:after:pointer-events-none [&>tr>th]:after:absolute [&>tr>th]:after:inset-x-0 [&>tr>th]:after:bottom-0 [&>tr>th]:after:h-px [&>tr>th]:after:bg-border-secondary">
                <tr className="h-11">
                    {columns.map((column) => (
                        <th
                            key={column.id}
                            className={`relative bg-secondary p-0 px-6 py-2 text-left outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-bg-primary focus-visible:ring-inset ${getColumnClassName(column)}`}
                            data-column={column.id}
                            style={getColumnStyle(column)}
                        >
                            <div className="flex items-center gap-1">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-semibold text-quaternary whitespace-normal break-words">{column.name}</span>
                                </div>
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
        </table>
    );

    useLayoutEffect(() => {
        if (availableWidth && availableWidth > 0) {
            return;
        }
        const container = containerRef.current;
        if (!container) return;
        const target = container.parentElement ?? container;
        const measure = () => {
            setContainerWidth(target.getBoundingClientRect().width);
        };
        measure();
        const observer = new ResizeObserver(() => measure());
        observer.observe(target);
        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const updateFloatingHeader = () => {
            const container = containerRef.current;
            if (!container) {
                setShowFloatingHeader(false);
                return;
            }

            const header = container.querySelector("thead") as HTMLTableSectionElement | null;
            if (!header) {
                setShowFloatingHeader(false);
                return;
            }

            const headerRect = header.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const shouldShow = headerRect.top <= 0 && containerRect.bottom > headerRect.height;
            setShowFloatingHeader(shouldShow);
            if (shouldShow) {
                setFloatingHeaderStyle({
                    left: containerRect.left,
                    width: containerRect.width,
                    height: headerRect.height,
                });
            }
        };

        updateFloatingHeader();
        window.addEventListener("scroll", updateFloatingHeader, { passive: true });
        window.addEventListener("resize", updateFloatingHeader);
        return () => {
            window.removeEventListener("scroll", updateFloatingHeader);
            window.removeEventListener("resize", updateFloatingHeader);
        };
    }, [columns, items]);

    useEffect(() => {
        const container = containerRef.current;
        const floating = floatingScrollRef.current;
        if (!container || !floating) return;

        const syncScroll = () => {
            floating.scrollLeft = container.scrollLeft;
        };
        syncScroll();
        container.addEventListener("scroll", syncScroll, { passive: true });
        return () => {
            container.removeEventListener("scroll", syncScroll);
        };
    }, [showFloatingHeader]);

    const resolvedLoading = Boolean(loading);
    const skeletonCount = skeletonRows ?? 10;
    const skeletonItems = useMemo(
        () => Array.from({ length: skeletonCount }).map((_, index) => ({ __skeletonId: `skeleton-${index}` }) as T),
        [skeletonCount],
    );
    const resolvedItems = resolvedLoading ? skeletonItems : items;
    const renderRows: (item: T) => ReactNode = resolvedLoading
        ? (item) => (
              <TableRow id={(item as { __skeletonId: string }).__skeletonId} columns={columns}>
                  {(column) => (
                      <TableCell className={column.id === "actions" ? "whitespace-nowrap" : "whitespace-normal break-words"}>
                          <div className="animate-pulse">
                              <div className="h-4 w-full rounded bg-secondary" />
                          </div>
                      </TableCell>
                  )}
              </TableRow>
          )
        : children;

    return (
        <>
            {showFloatingHeader && floatingHeaderStyle ? (
                <div
                    className="pointer-events-none fixed top-0 z-40"
                    style={{
                        left: floatingHeaderStyle.left,
                        width: floatingHeaderStyle.width,
                        height: floatingHeaderStyle.height,
                    }}
                    aria-hidden
                >
                    <div ref={floatingScrollRef} className="overflow-x-hidden">
                        {renderFloatingHeader()}
                    </div>
                </div>
            ) : null}
            <div ref={setContainerRef} className="w-full min-w-full max-w-full overflow-x-auto overflow-y-visible">
                <TableRoot
                    aria-label={ariaLabel}
                    className={cx("table-fixed w-full", className)}
                    scrollX="none"
                    style={{
                        width: tableWidthStyle,
                        minWidth: minTotal ? `${minTotal}px` : undefined,
                    }}
                >
                    {renderHeader()}
                    <AriaTableBody items={resolvedItems}>{renderRows}</AriaTableBody>
                </TableRoot>
            </div>
        </>
    );
};

const TableCard = {
    Root: TableCardRoot,
    Header: TableCardHeader,
};

const Table = TableRoot as typeof TableRoot & {
    Body: typeof AriaTableBody;
    Cell: typeof TableCell;
    Head: typeof TableHead;
    Header: typeof TableHeader;
    Row: typeof TableRow;
};
Table.Body = AriaTableBody;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Header = TableHeader;
Table.Row = TableRow;

export { Table, TableCard, StickyTable };
