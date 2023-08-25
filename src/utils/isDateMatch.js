// Helper function to check if the day, month, and year components of two dates match
const isDateMatch = (dateToCheck, dateFilter) => {
  if (!dateFilter) {
    return true; // If no date filter, consider it a match
  }

  const dateToCheckDate = new Date(dateToCheck);
  const dateFilterDate = new Date(dateFilter);

  // Check if day, month, and year components match
  return (
    dateToCheckDate.getDate() === dateFilterDate.getDate() &&
    dateToCheckDate.getMonth() === dateFilterDate.getMonth() &&
    dateToCheckDate.getFullYear() === dateFilterDate.getFullYear()
  );
};

export default isDateMatch;
