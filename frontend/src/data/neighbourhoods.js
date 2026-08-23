// Extracted directly from the trained model's OneHotEncoder categories,
// so every option here is guaranteed to be something the model has seen.

export const BOROUGHS = [
  { name: "Manhattan", color: "#F2A93B" },
  { name: "Brooklyn", color: "#3BA3F2" },
  { name: "Queens", color: "#7ED957" },
  { name: "Bronx", color: "#F25C54" },
  { name: "Staten Island", color: "#B98BE0" },
];

export const BOROUGH_NAMES = BOROUGHS.map((b) => b.name);

export const boroughColor = (name) =>
  BOROUGHS.find((b) => b.name === name)?.color || "#8A8F98";

export const NEIGHBOURHOODS = [
  "Allerton", "Arden Heights", "Arrochar", "Arverne", "Astoria", "Bath Beach",
  "Battery Park City", "Bay Ridge", "Bay Terrace", "Bay Terrace, Staten Island",
  "Baychester", "Bayside", "Bayswater", "Bedford-Stuyvesant", "Belle Harbor",
  "Bellerose", "Belmont", "Bensonhurst", "Bergen Beach", "Boerum Hill",
  "Borough Park", "Breezy Point", "Briarwood", "Brighton Beach", "Bronxdale",
  "Brooklyn Heights", "Brownsville", "Bull's Head", "Bushwick",
  "Cambria Heights", "Canarsie", "Carroll Gardens", "Castle Hill",
  "Castleton Corners", "Chelsea", "Chinatown", "City Island", "Civic Center",
  "Claremont Village", "Clason Point", "Clifton", "Clinton Hill", "Co-op City",
  "Cobble Hill", "College Point", "Columbia St", "Concord", "Concourse",
  "Concourse Village", "Coney Island", "Corona", "Crown Heights",
  "Cypress Hills", "DUMBO", "Ditmars Steinway", "Dongan Hills", "Douglaston",
  "Downtown Brooklyn", "Dyker Heights", "East Elmhurst", "East Flatbush",
  "East Harlem", "East Morrisania", "East New York", "East Village",
  "Eastchester", "Edenwald", "Edgemere", "Elmhurst", "Eltingville",
  "Emerson Hill", "Far Rockaway", "Fieldston", "Financial District",
  "Flatbush", "Flatiron District", "Flatlands", "Flushing", "Fordham",
  "Forest Hills", "Fort Greene", "Fort Hamilton", "Fresh Meadows", "Glendale",
  "Gowanus", "Gramercy", "Graniteville", "Grant City", "Gravesend",
  "Great Kills", "Greenpoint", "Greenwich Village", "Grymes Hill", "Harlem",
  "Hell's Kitchen", "Highbridge", "Hollis", "Holliswood", "Howard Beach",
  "Howland Hook", "Huguenot", "Hunts Point", "Inwood", "Jackson Heights",
  "Jamaica", "Jamaica Estates", "Jamaica Hills", "Kensington", "Kew Gardens",
  "Kew Gardens Hills", "Kingsbridge", "Kips Bay", "Laurelton",
  "Lighthouse Hill", "Little Italy", "Little Neck", "Long Island City",
  "Longwood", "Lower East Side", "Manhattan Beach", "Marble Hill",
  "Mariners Harbor", "Maspeth", "Melrose", "Middle Village", "Midland Beach",
  "Midtown", "Midwood", "Mill Basin", "Morningside Heights", "Morris Heights",
  "Morris Park", "Morrisania", "Mott Haven", "Mount Eden", "Mount Hope",
  "Murray Hill", "Navy Yard", "Neponsit", "New Brighton", "New Dorp",
  "New Dorp Beach", "New Springville", "NoHo", "Nolita", "North Riverdale",
  "Norwood", "Oakwood", "Olinville", "Ozone Park", "Park Slope", "Parkchester",
  "Pelham Bay", "Pelham Gardens", "Port Morris", "Port Richmond",
  "Prince's Bay", "Prospect Heights", "Prospect-Lefferts Gardens",
  "Queens Village", "Randall Manor", "Red Hook", "Rego Park", "Richmond Hill",
  "Ridgewood", "Riverdale", "Rockaway Beach", "Roosevelt Island", "Rosebank",
  "Rosedale", "Rossville", "Schuylerville", "Sea Gate", "Sheepshead Bay",
  "Shore Acres", "Silver Lake", "SoHo", "Soundview", "South Beach",
  "South Ozone Park", "South Slope", "Springfield Gardens", "Spuyten Duyvil",
  "St. Albans", "St. George", "Stapleton", "Stuyvesant Town", "Sunnyside",
  "Sunset Park", "Theater District", "Throgs Neck", "Todt Hill",
  "Tompkinsville", "Tottenville", "Tremont", "Tribeca", "Two Bridges",
  "Unionport", "University Heights", "Upper East Side", "Upper West Side",
  "Van Nest", "Vinegar Hill", "Wakefield", "Washington Heights",
  "West Brighton", "West Farms", "West Village", "Westchester Square",
  "Westerleigh", "Whitestone", "Williamsbridge", "Williamsburg",
  "Willowbrook", "Windsor Terrace", "Woodhaven", "Woodlawn", "Woodside",
];

// Room type classes, in the exact order the model's classifier emits them
// (RandomForestClassifier.classes_ is alphabetically sorted).
export const ROOM_TYPES = [
  { label: "Entire home/apt", icon: "home" },
  { label: "Private room", icon: "door" },
  { label: "Shared room", icon: "users" },
];
