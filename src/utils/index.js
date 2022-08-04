/**
 * @function formatCurrency
 * format number as currency format (US Dollars)
 *
 * @param {number} amount
 * @returns {string} number formatted as currency
 *
 * @example
 * formatCurrency(0)
 * ==> $0.00
 *
 * @example
 * formatCurrency(1.5)
 * ==> $1.50
 */
//format number to currency
export function formatCurrency(amount) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}
