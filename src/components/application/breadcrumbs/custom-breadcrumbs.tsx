import { Link } from "react-router";
import { FaHome } from "react-icons/fa";
import { Fragment } from "react";

interface BreadcrumbItem {
    label: string;
    link?: string;
}

interface CustomBreadscrumbsProps {
    list: BreadcrumbItem[];
}

export const CustomBreadscrumbs = ({ list }: CustomBreadscrumbsProps) => {
    if (!list?.length) return null;

    return (
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="flex items-center hover:text-primary">
                <FaHome className="mr-1" />
            </Link>
            {list.map((item, index) => (
                <Fragment key={index}>
                    <span>/</span>
                    {item.link ? (
                        <Link to={item.link} className="hover:text-primary">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {item.label}
                        </span>
                    )}
                </Fragment>
            ))}
        </div>
    );
};
