import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportItineraryToPDF = (days, budget = null) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Set up colors
  const primaryColor = [31, 41, 55]; // gray-900
  const secondaryColor = [107, 114, 128]; // gray-500
  const accentColor = [249, 115, 22]; // orange-500

  // Title
  doc.setFontSize(24);
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Cape Town Itinerary', pageWidth / 2, 20, { align: 'center' });

  // Date generated
  doc.setFontSize(10);
  doc.setTextColor(...secondaryColor);
  doc.setFont('helvetica', 'normal');
  const generatedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.text(`Generated on ${generatedDate}`, pageWidth / 2, 28, { align: 'center' });

  // Add watermark
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  doc.text('Created with Cape Town Tourism Platform', pageWidth / 2, pageHeight - 10, { align: 'center' });

  let currentY = 40;

  // Trip Summary
  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Trip Summary', 15, currentY);
  currentY += 8;

  const totalActivities = days.reduce((total, day) => total + (day.activities?.length || 0), 0);
  const dateRange = getDateRange(days);

  doc.setFontSize(10);
  doc.setTextColor(...secondaryColor);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Days: ${days.length}`, 15, currentY);
  currentY += 6;
  doc.text(`Total Activities: ${totalActivities}`, 15, currentY);
  currentY += 6;
  if (dateRange) {
    doc.text(`Dates: ${dateRange}`, 15, currentY);
    currentY += 6;
  }

  // Budget Summary (if provided)
  if (budget) {
    currentY += 5;
    doc.setFontSize(12);
    doc.setTextColor(...accentColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Budget Summary', 15, currentY);
    currentY += 8;

    doc.setFontSize(10);
    doc.setTextColor(...secondaryColor);
    doc.setFont('helvetica', 'normal');
    const totalBudget = budget.accommodation + budget.food + budget.transportation +
                       budget.activities + budget.shopping + budget.other;
    const activitiesCost = days.reduce((total, day) => {
      return total + (day.activities || []).reduce((dayTotal, activity) => {
        return dayTotal + (activity.customCost || 0);
      }, 0);
    }, 0);

    doc.text(`Total Budget: R${totalBudget.toFixed(2)}`, 15, currentY);
    currentY += 6;
    doc.text(`Activities Cost: R${activitiesCost.toFixed(2)}`, 15, currentY);
    currentY += 6;
    const remaining = totalBudget - activitiesCost;
    doc.setTextColor(...(remaining >= 0 ? [34, 197, 94] : [239, 68, 68]));
    doc.text(`Remaining: R${remaining.toFixed(2)}`, 15, currentY);
    currentY += 8;
  }

  currentY += 5;

  // Daily Itinerary
  days.forEach((day, dayIndex) => {
    // Check if we need a new page
    if (currentY > pageHeight - 40) {
      doc.addPage();
      currentY = 20;
    }

    // Day Header
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    const dayTitle = `Day ${dayIndex + 1}${day.date ? ` - ${formatDate(day.date)}` : ''}`;
    doc.text(dayTitle, 15, currentY);
    currentY += 2;

    // Day separator line
    doc.setDrawColor(...accentColor);
    doc.setLineWidth(0.5);
    doc.line(15, currentY, pageWidth - 15, currentY);
    currentY += 8;

    if (!day.activities || day.activities.length === 0) {
      doc.setFontSize(10);
      doc.setTextColor(...secondaryColor);
      doc.setFont('helvetica', 'italic');
      doc.text('No activities planned', 20, currentY);
      currentY += 10;
    } else {
      // Activities table
      const tableData = day.activities.map(activity => [
        activity.time || '-',
        activity.name || '',
        activity.duration || '-',
        activity.customCost ? `R${activity.customCost}` : '-',
        activity.notes || '-'
      ]);

      autoTable(doc, {
        startY: currentY,
        head: [['Time', 'Activity', 'Duration', 'Cost', 'Notes']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 9
        },
        bodyStyles: {
          fontSize: 9,
          textColor: secondaryColor
        },
        alternateRowStyles: {
          fillColor: [249, 250, 251]
        },
        margin: { left: 15, right: 15 },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 50 },
          2: { cellWidth: 25 },
          3: { cellWidth: 20 },
          4: { cellWidth: 'auto' }
        }
      });

      currentY = (doc.lastAutoTable?.finalY || currentY) + 12;
    }
  });

  // Add footer with tips
  if (currentY > pageHeight - 60) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFontSize(12);
  doc.setTextColor(...accentColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Travel Tips', 15, currentY);
  currentY += 8;

  const tips = [
    '• Book popular attractions in advance to avoid disappointment',
    '• Check the weather forecast before your trip',
    '• Keep emergency contacts handy: Police 10111, Ambulance 10177',
    '• Download offline maps in case of poor connectivity',
    '• Try local cuisine at V&A Waterfront and Long Street'
  ];

  doc.setFontSize(9);
  doc.setTextColor(...secondaryColor);
  doc.setFont('helvetica', 'normal');
  tips.forEach(tip => {
    if (currentY > pageHeight - 15) {
      doc.addPage();
      currentY = 20;
    }
    doc.text(tip, 15, currentY);
    currentY += 6;
  });

  // Save the PDF
  const fileName = `capetown-itinerary-${new Date().getTime()}.pdf`;
  doc.save(fileName);
};

// Helper function to get date range
const getDateRange = (days) => {
  const datesWithValues = days.filter(day => day.date).map(day => day.date);
  if (datesWithValues.length === 0) return null;

  const dates = datesWithValues.sort();
  const firstDate = formatDate(dates[0]);
  const lastDate = formatDate(dates[dates.length - 1]);

  return firstDate === lastDate ? firstDate : `${firstDate} - ${lastDate}`;
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
