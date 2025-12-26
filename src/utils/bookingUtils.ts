import { services, staffMembers } from '../data/bookingData';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Formats a date into a readable appointment date string
 * @param date - The date to format
 * @returns Formatted date string (e.g., "Monday, January 1, 2024")
 */
export function formatAppointmentDate(date: Date): string {
  const dayName = dayNames[date.getDay()];
  const monthName = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${dayName}, ${monthName} ${day}, ${year}`;
}

/**
 * Calculates the total duration of selected services
 * @param selectedServices - Array of service IDs
 * @returns Total duration in minutes
 */
export function calculateTotalDuration(selectedServices: string[]): number {
  return selectedServices.reduce((total, serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    return total + (service?.duration || 0);
  }, 0);
}

/**
 * Calculates the total price of selected services
 * @param selectedServices - Array of service IDs
 * @returns Total price in dollars
 */
export function calculateTotalPrice(selectedServices: string[]): number {
  return selectedServices.reduce((total, serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    return total + (service?.price || 0);
  }, 0);
}

/**
 * Gets the employee name by ID, or returns default text for unassigned bookings
 * @param employeeId - The employee ID or null
 * @returns Employee name or "Any Available Staff"
 */
export function getEmployeeName(employeeId: string | null): string {
  return staffMembers.find((s) => s.id === employeeId)?.name || 'Any Available Staff';
}
