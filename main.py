from fastapi import FastAPI
import joblib
import pandas as pd
from pydantic import BaseModel,Field
from typing import Literal, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    
    allow_methods=["*"],
    allow_headers=["*"],
)

COLUMNS = ['latitude', 'longitude', 'price', 'minimum_nights', 'number_of_reviews','reviews_per_month', 'calculated_host_listings_count', 'availability_365', 'neighbourhood_group', 'neighbourhood']

model=joblib.load("model.pkl")



class InputData(BaseModel):
  latitude: float = Field(..., description="Latitude of the location", ge=-90, le=90)
  longitude: float = Field(..., description="Longitude of the location", ge=-180, le=180)
  price: float = Field(..., gt=0, description="Price of the listing")
  minimum_nights: int = Field(..., gt=0,le=365, description="Minimum number of nights for booking")
  number_of_reviews: int = Field(..., ge=0, description="Number of reviews for the listing")
  reviews_per_month: float = Field(..., ge=0, description="Average number of reviews per month")
  calculated_host_listings_count: int = Field(..., ge=0, description="Calculated number of listings for the host")
  availability_365: int = Field(..., ge=0, le=365, description="Availability of the listing throughout the year")
  neighbourhood_group: str=Field(..., description="Neighbourhood group of the listing", min_length=1)
  neighbourhood: str=Field(..., description="Neighbourhood of the listing", min_length=1)

@app.get("/")
def greet():
  return {"message": "Hello, World!"}

@app.post("/predict")
def prediction(input_data: InputData):
    row=pd.DataFrame([input_data.model_dump()], columns=COLUMNS)
    prediction = model.predict(row)[0]
    probabilities = model.predict_proba(row)[0].tolist()
    return {
       "predicted Room Type": prediction,
        "probabilities": probabilities
    }