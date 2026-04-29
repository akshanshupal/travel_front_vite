import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

type EstimatePdfClient = {
    name?: string;
    address?: string;
    phone?: string;
};

type EstimatePdfItem = {
    mainEventName?: string;
    eventDate?: string;
    timing?: string;
    deliverables?: string[];
    packageCost?: number;
};

type BuildPhotographyEstimatePdfParams = {
    estimateNumber?: string;
    estimateDate?: string;
    validUntil?: string;
    grandTotal?: number;
    client?: EstimatePdfClient | null;
    items?: EstimatePdfItem[];
    fileName?: string;
};

const formatDate = (value?: string) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.getDate().toString().padStart(2, "0")}-${d.toLocaleString("en-US", { month: "short" })}-${d.getFullYear()}`;
};

const htmlToPlainText = (value: string) => {
    if (!value) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
};

export const buildPhotographyEstimatePdf = (params: BuildPhotographyEstimatePdfParams) => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 14;

    doc.setDrawColor(160);
    doc.rect(12, y, 30, 20);
    doc.setFontSize(10);
    doc.text("Company Logo", 16, y + 11);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("# CAPTURING MOMENTS-ESTIMATE", pageWidth / 2, y + 6, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("For any Service Related Issues Mail:- sales@capturingmoments.co.in", pageWidth / 2, y + 12, { align: "center" });
    doc.text(
        "Capturing Moments Office No-A-1106, Tower - T3 , Block A, NX One, Noida Extention Noida, Uttar Pradesh 201306, India",
        pageWidth / 2,
        y + 17,
        { align: "center", maxWidth: 110 },
    );
    doc.text("8860030886  |  capturing-moment-website.vercel.app", pageWidth / 2, y + 23, { align: "center" });
    y += 30;

    doc.setFont("helvetica", "bold");
    doc.text("BILL TO", 14, y);
    doc.text("Estimate Meta", pageWidth - 60, y);
    doc.setFont("helvetica", "normal");
    y += 5;

    const billLines = [params.client?.name || "-", params.client?.address || "-", params.client?.phone || "-"];
    billLines.forEach((line) => {
        doc.text(String(line), 14, y);
        y += 5;
    });

    const metaStartY = y - 15;
    let rightY = metaStartY;
    doc.text(`Estimate Number: ${params.estimateNumber || "-"}`, pageWidth - 60, rightY);
    rightY += 5;
    doc.text(`Estimate Date: ${formatDate(params.estimateDate) || "-"}`, pageWidth - 60, rightY);
    rightY += 5;
    doc.text(`Valid Until: ${formatDate(params.validUntil) || "-"}`, pageWidth - 60, rightY);
    rightY += 5;
    doc.text(`Grand Total (INR): ${Number(params.grandTotal || 0).toFixed(2)}`, pageWidth - 60, rightY);

    y += 4;
    const rows = (params.items || []).map((item) => {
        const deliverablesText = (item.deliverables || []).map((entry) => htmlToPlainText(entry)).filter(Boolean).join(" | ");
        const details = [
            `${item.mainEventName || ""}${item.eventDate ? ` (${formatDate(item.eventDate)})` : ""}${item.timing ? ` ${item.timing}` : ""}`,
            `- ${deliverablesText || "-"}`,
            "Package Cost 1",
        ].join("\n");
        return [details, `INR ${Number(item.packageCost || 0).toFixed(2)}`];
    });

    autoTable(doc, {
        startY: y,
        head: [["Items", "Quantity"]],
        body: rows,
        theme: "grid",
        headStyles: { fillColor: [230, 230, 230], textColor: [40, 40, 40] },
        styles: { fontSize: 9, cellPadding: 2 },
        columnStyles: { 0: { cellWidth: 135 }, 1: { cellWidth: 45 } },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    doc.setFontSize(9);
    doc.text(
        "Notes / Terms Hospitality Group - Kotak Account Number- 4049111673 IFSC - KKBK0000154 Branch - Sector 51 Noida UPI:- hospitalitygroup@kotak",
        14,
        y,
        { maxWidth: pageWidth - 28 },
    );
    y += 14;
    doc.text("This is an electronically generated report, hence does not require a signature.", 14, y);

    doc.save(params.fileName || `Estimate-${Date.now()}.pdf`);
};
