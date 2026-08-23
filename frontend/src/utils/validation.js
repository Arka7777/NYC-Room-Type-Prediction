export const FIELD_RULES = {
  latitude: { min: -90, max: 90 },
  longitude: { min: -180, max: 180 },
  price: { min: 0.01 },
  minimum_nights: { min: 1, max: 365 },
  number_of_reviews: { min: 0 },
  reviews_per_month: { min: 0 },
  calculated_host_listings_count: { min: 0 },
  availability_365: { min: 0, max: 365 },
};

/**
 * Validates a single numeric field against FIELD_RULES.
 * Returns an error string, or "" if the value is valid.
 */
export function validateNumberField(name, rawValue) {
  if (rawValue === "" || rawValue === null || rawValue === undefined) {
    return "This field is required.";
  }
  const value = Number(rawValue);
  if (Number.isNaN(value)) return "Enter a valid number.";

  const rule = FIELD_RULES[name];
  if (!rule) return "";

  if (rule.min !== undefined && value < rule.min) {
    return `Must be at least ${rule.min}.`;
  }
  if (rule.max !== undefined && value > rule.max) {
    return `Must be at most ${rule.max}.`;
  }
  return "";
}

export function validateTextField(rawValue) {
  if (!rawValue || !rawValue.trim()) return "This field is required.";
  return "";
}
