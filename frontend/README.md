# Room Type Line — NYC Airbnb Room Type Predictor (Frontend)

A React + Vite frontend for a FastAPI backend that predicts whether an NYC
Airbnb listing is an **Entire home/apt**, **Private room**, or **Shared room**.

## Folder structure

```
airbnb-predictor/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── api/
│   │   └── predictService.js      # axios client + /predict call
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── BoroughLegend.jsx
│   │   ├── PredictionForm.jsx
│   │   ├── FormField.jsx
│   │   ├── ResultPanel.jsx
│   │   ├── ProbabilityChart.jsx
│   │   ├── ConfidenceGauge.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── neighbourhoods.js      # boroughs + 218 neighbourhoods, pulled from the model
│   ├── hooks/
│   │   └── useTheme.js            # dark/light mode with persistence
│   └── utils/
│       └── validation.js
```

## 1. Install

```bash
npm install
```

## 2. Configure the API URL

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_API_URL=http://localhost:8000
```

Point this at wherever your FastAPI backend is running. In production, set it
to your deployed backend's URL (e.g. `https://your-api.onrender.com`).

## 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:5173`.

## 4. Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

Output goes to `dist/`.

## Important: backend response shape

This UI expects `POST /predict` to return:

```json
{
  "predicted_room_type": "Private room",
  "probabilities": [0.1, 0.7, 0.2]
}
```

The model's classes are, in order: `Entire home/apt`, `Private room`,
`Shared room` (this comes from `RandomForestClassifier.classes_`, which
scikit-learn sorts alphabetically). The `probabilities` array is matched to
these three labels by index, so make sure your FastAPI endpoint keeps
`model.predict_proba(row)[0]` in its native order rather than reordering it.

Also make sure your endpoint response key is `predicted_room_type` (snake_case)
— not `"predicted Room Type"` — and that any numpy scalar returned by
`model.predict()` is converted with `.item()` before being returned, or
FastAPI's JSON encoder can throw on it.

## Deployment

### Vercel

1. Push this project to a GitHub repo.
2. In Vercel: **New Project → Import** your repo.
3. Framework preset: **Vite**. Build command `npm run build`, output dir `dist`.
4. Add an environment variable: `VITE_API_URL` = your backend's public URL.
5. Deploy.

### Render (Static Site)

1. Push this project to a GitHub repo.
2. In Render: **New → Static Site**, connect the repo.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Add environment variable `VITE_API_URL` under the site's **Environment** tab.
5. Deploy.

### Deploying the FastAPI backend alongside it (Render)

1. **New → Web Service**, connect the backend repo.
2. Build command: `pip install -r requirements.txt`.
3. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
4. Make sure `model.pkl` is committed (or fetched at build time) and loaded
   with an absolute path, e.g. `os.path.join(os.path.dirname(__file__), "model.pkl")`.
5. Once deployed, copy the backend's URL into the frontend's `VITE_API_URL`.

## Notes on the neighbourhood list

The 5 boroughs and 218 neighbourhoods in `src/data/neighbourhoods.js` were
extracted directly from the trained model's `OneHotEncoder` categories, so
every option in the dropdown/search is guaranteed to be a category the model
has actually seen (`handle_unknown="ignore"` in the backend means anything
outside this list would otherwise be silently zeroed out rather than
rejected).
