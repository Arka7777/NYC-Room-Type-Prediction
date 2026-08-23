import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Compass,
  DollarSign,
  Moon as MoonIcon,
  MessageSquareText,
  TrendingUp,
  Building2,
  CalendarCheck2,
  Search,
  Loader2,
  Sparkles,
} from "lucide-react";
import FormField from "./FormField";
import { BOROUGH_NAMES, NEIGHBOURHOODS, boroughColor } from "../data/neighbourhoods";
import { validateNumberField, validateTextField } from "../utils/validation";

const INITIAL_FORM = {
  neighbourhood_group: "",
  neighbourhood: "",
  latitude: "",
  longitude: "",
  price: "",
  minimum_nights: "1",
  number_of_reviews: "",
  reviews_per_month: "",
  calculated_host_listings_count: "1",
  availability_365: "",
};

const NUMERIC_FIELDS = [
  { name: "latitude", label: "Latitude", icon: MapPin, step: "0.000001", hint: "e.g. 40.7128 — between -90 and 90", placeholder: "40.7128" },
  { name: "longitude", label: "Longitude", icon: Compass, step: "0.000001", hint: "e.g. -74.0060 — between -180 and 180", placeholder: "-74.0060" },
  { name: "price", label: "Price per night ($)", icon: DollarSign, step: "1", hint: "Nightly listed price in USD", placeholder: "150" },
  { name: "minimum_nights", label: "Minimum nights", icon: MoonIcon, step: "1", hint: "1–365 nights", placeholder: "2" },
  { name: "number_of_reviews", label: "Number of reviews", icon: MessageSquareText, step: "1", hint: "Total reviews to date", placeholder: "50" },
  { name: "reviews_per_month", label: "Reviews per month", icon: TrendingUp, step: "0.01", hint: "Average review velocity", placeholder: "1.5" },
  { name: "calculated_host_listings_count", label: "Host's total listings", icon: Building2, step: "1", hint: "How many listings this host manages", placeholder: "3" },
  { name: "availability_365", label: "Availability (days/yr)", icon: CalendarCheck2, step: "1", hint: "Days available out of 365", placeholder: "200" },
];

export default function PredictionForm({ onSubmit, loading }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [neighbourhoodQuery, setNeighbourhoodQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredNeighbourhoods = useMemo(() => {
    if (!neighbourhoodQuery.trim()) return NEIGHBOURHOODS.slice(0, 12);
    const q = neighbourhoodQuery.toLowerCase();
    return NEIGHBOURHOODS.filter((n) => n.toLowerCase().includes(q)).slice(0, 12);
  }, [neighbourhoodQuery]);

  const accent = boroughColor(form.neighbourhood_group);

  const handleChange = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleBlurValidate = (name, value, isText = false) => {
    const error = isText ? validateTextField(value) : validateNumberField(name, value);
    setErrors((e) => ({ ...e, [name]: error }));
  };

  const validateAll = () => {
    const nextErrors = {};
    nextErrors.neighbourhood_group = validateTextField(form.neighbourhood_group);
    nextErrors.neighbourhood = validateTextField(form.neighbourhood);
    for (const f of NUMERIC_FIELDS) {
      nextErrors[f.name] = validateNumberField(f.name, form[f.name]);
    }
    setErrors(nextErrors);
    return Object.values(nextErrors).every((e) => !e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const payload = {
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      price: Number(form.price),
      minimum_nights: Number(form.minimum_nights),
      number_of_reviews: Number(form.number_of_reviews),
      reviews_per_month: Number(form.reviews_per_month),
      calculated_host_listings_count: Number(form.calculated_host_listings_count),
      availability_365: Number(form.availability_365),
      neighbourhood_group: form.neighbourhood_group,
      neighbourhood: form.neighbourhood,
    };
    onSubmit(payload);
  };

  return (
    <motion.form
      id="predict-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 md:p-8 transition-[border-color] duration-300"
      style={{ borderColor: form.neighbourhood_group ? `${accent}55` : undefined }}
      noValidate
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold text-xl md:text-2xl">
          Listing details
        </h2>
        <span className="chip bg-marigold-500/10 text-marigold-600 dark:text-marigold-400 border border-marigold-500/25">
          10 fields
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Borough select */}
        <FormField
          label="Borough"
          name="neighbourhood_group"
          icon={MapPin}
          hint="Which of the five boroughs"
          error={errors.neighbourhood_group}
        >
          <select
            id="neighbourhood_group"
            className={`input-base ${errors.neighbourhood_group ? "input-error" : ""}`}
            value={form.neighbourhood_group}
            onChange={(e) => handleChange("neighbourhood_group", e.target.value)}
            onBlur={(e) => handleBlurValidate("neighbourhood_group", e.target.value, true)}
          >
            <option value="">Select a borough…</option>
            {BOROUGH_NAMES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </FormField>

        {/* Neighbourhood combobox */}
        <FormField
          label="Neighbourhood"
          name="neighbourhood"
          icon={Search}
          hint="Search from 218 known neighbourhoods"
          error={errors.neighbourhood}
        >
          <div className="relative">
            <input
              id="neighbourhood"
              type="text"
              autoComplete="off"
              className={`input-base ${errors.neighbourhood ? "input-error" : ""}`}
              placeholder="Start typing e.g. Harlem"
              value={form.neighbourhood}
              onChange={(e) => {
                handleChange("neighbourhood", e.target.value);
                setNeighbourhoodQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                window.setTimeout(() => setShowSuggestions(false), 120);
                handleBlurValidate("neighbourhood", form.neighbourhood, true);
              }}
            />
            {showSuggestions && filteredNeighbourhoods.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full max-h-52 overflow-y-auto scroll-thin glass-panel !rounded-xl py-1">
                {filteredNeighbourhoods.map((n) => (
                  <li key={n}>
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 text-sm hover:bg-marigold-500/10 transition-colors"
                      onMouseDown={() => {
                        handleChange("neighbourhood", n);
                        setNeighbourhoodQuery(n);
                        setShowSuggestions(false);
                      }}
                    >
                      {n}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FormField>

        {NUMERIC_FIELDS.map((f) => (
          <FormField
            key={f.name}
            label={f.label}
            name={f.name}
            icon={f.icon}
            hint={f.hint}
            error={errors[f.name]}
          >
            <input
              id={f.name}
              type="number"
              step={f.step}
              placeholder={f.placeholder}
              className={`input-base font-mono ${errors[f.name] ? "input-error" : ""}`}
              value={form[f.name]}
              onChange={(e) => handleChange(f.name, e.target.value)}
              onBlur={(e) => handleBlurValidate(f.name, e.target.value)}
            />
          </FormField>
        ))}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full mt-8">
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Running the model…
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Predict room type
          </>
        )}
      </button>
    </motion.form>
  );
}
