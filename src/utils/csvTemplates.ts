
/**
 * Utility functions for creating CSV templates
 */

// Session CSV template
export const createSessionsCSVTemplate = () => {
  // CSV header row
  const headers = ['title', 'description', 'category', 'year', 'image_urls'];
  
  // Sample data rows (optional)
  const sampleData = [
    ['Sample Session 1', 'Description for sample session 1', 'Portrait', '2023', '["https://example.com/image1.jpg", "https://example.com/image2.jpg"]'],
    ['Sample Session 2', 'Description for sample session 2', 'Wedding', '2024', '["https://example.com/image3.jpg"]']
  ];
  
  // Combine headers and sample data
  const csvRows = [headers.join(',')];
  sampleData.forEach(row => {
    csvRows.push(row.join(','));
  });
  
  return csvRows.join('\n');
};

// Contact messages CSV template
export const createContactMessagesCSVTemplate = () => {
  // CSV header row
  const headers = ['name', 'email', 'message', 'created_at', 'read'];
  
  // Sample data rows (optional)
  const sampleData = [
    ['Jan Kowalski', 'jan@example.com', 'Wiadomość testowa 1', new Date().toISOString(), 'false'],
    ['Anna Nowak', 'anna@example.com', 'Wiadomość testowa 2', new Date().toISOString(), 'true']
  ];
  
  // Combine headers and sample data
  const csvRows = [headers.join(',')];
  sampleData.forEach(row => {
    csvRows.push(row.join(','));
  });
  
  return csvRows.join('\n');
};
