# 🏠 NYC Airbnb Room Type Predictor

A full-stack machine learning web app that predicts whether a New York City Airbnb listing is an **Entire home/apt**, **Private room**, or **Shared room** — based on its location, price, and booking activity.

**Live Demo:** [nyc-room-type-prediction-1-ajmr.onrender.com](https://nyc-room-type-prediction-1-ajmr.onrender.com/)
**Backend API:** [nyc-room-type-prediction-scqx.onrender.com](https://nyc-room-type-prediction-scqx.onrender.com)

> ⚠️ Both services are hosted on Render's free tier and spin down after inactivity. The first request after idle time may take 30–60 seconds to wake up.

---

## ✨ Features

- 🎯 Predicts room type using a **RandomForestClassifier** trained on NYC Airbnb Open Data
- 📊 Interactive probability breakdown with animated charts (Recharts)
- 🗺️ Borough and neighbourhood inputs sourced directly from the model's known categories (5 boroughs, 218 neighbourhoods)
- 🌗 Dark / light mode with persistence
- ⚡ Real-time inference via a REST API
- 📱 Fully responsive, modern glassmorphism UI

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Framer Motion
- Recharts
- Axios

**Backend**
- FastAPI
- scikit-learn
- pandas / joblib
- Uvicorn

**Deployment**
- Render (Static Site for frontend, Web Service for backend)

---

## 📸 Preview

*(Add a screenshot or GIF of the app here)*

```
![App Screenshot](./screenshot.png)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+

### Backend Setup

```bash
git clone https://github.com/<your-username>/<backend-repo>.git
cd <backend-repo>
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will run at `http://localhost:8000`. Interactive docs available at `http://localhost:8000/docs`.

### Frontend Setup

```bash
git clone https://github.com/<your-username>/<frontend-repo>.git
cd <frontend-repo>
npm install
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:8000
```

Then run:
```bash
npm run dev
```

Visit `http://localhost:5173`.

---

## 🔌 API Reference

### `POST /predict`

**Request body:**
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "price": 150,
  "minimum_nights": 2,
  "number_of_reviews": 50,
  "reviews_per_month": 1.5,
  "calculated_host_listings_count": 3,
  "availability_365": 200,
  "neighbourhood_group": "Manhattan",
  "neighbourhood": "Harlem"
}
```

**Response:**
```json
{
  "predicted_room_type": "Private room",
  "probabilities": [0.1, 0.7, 0.2]
}
```

---

## 📁 Project Structure

```
├── backend/
│   ├── main.py
│   ├── model.pkl
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── data/
    │   ├── hooks/
    │   └── utils/
    └── package.json
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Arkapravo Biswas**
[LinkedIn](https://linkedin.com/in/arkapravo-biswas-126a252b9) · [GitHub](https://github.com/Arka7777)
