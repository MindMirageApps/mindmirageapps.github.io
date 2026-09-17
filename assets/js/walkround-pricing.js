/**
 * WalkRound pricing display calculator (customer experience only).
 * Stripe Checkout remains the billing source of truth.
 */
(function (global) {
  "use strict";

  var MIN_DRIVERS = 1;
  var MAX_DRIVERS = 2000;

  /**
   * @param {number} drivers
   * @returns {number} monthly total in GBP
   */
  function monthlyTotalGbp(drivers) {
    var n = Math.max(MIN_DRIVERS, Math.min(MAX_DRIVERS, Math.floor(Number(drivers) || 0)));
    if (n <= 10) return n * 10;
    if (n <= 25) return n * 8 + 12;
    if (n <= 50) return n * 6.5 + 43;
    if (n <= 100) return n * 5.5 + 87.5;
    if (n <= 250) return n * 4.5 + 183;
    if (n <= 500) return n * 3.5 + 429.5;
    if (n <= 1000) return n * 3 + 676.5;
    return n * 2.5 + 1174;
  }

  /**
   * @param {number} amount
   * @returns {string}
   */
  function formatGbp(amount) {
    return (
      "£" +
      amount.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }

  /**
   * @param {number} drivers
   * @returns {string}
   */
  function formatMonthlyPrice(drivers) {
    return formatGbp(monthlyTotalGbp(drivers));
  }

  global.WalkRoundPricing = {
    MIN_DRIVERS: MIN_DRIVERS,
    MAX_DRIVERS: MAX_DRIVERS,
    monthlyTotalGbp: monthlyTotalGbp,
    formatGbp: formatGbp,
    formatMonthlyPrice: formatMonthlyPrice,
  };
})(typeof window !== "undefined" ? window : globalThis);
