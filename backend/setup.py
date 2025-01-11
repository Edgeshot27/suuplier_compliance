from datetime import datetime

from sympy.physics.vector.printing import params
from transformers import AutoModelForCausalLM, AutoTokenizer
import requests
from pydantic import BaseModel


model_name = "EleutherAI/gpt-neo-1.3B"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def analyze_compliance_with_llm(data):
    # Prepare the prompt by combining all records
    records_prompt = "\n".join(
        [f"Metric: {record['metric']}, Status: {record['status']}" for record in data]
    )
    prompt = f"Analyze the following Compliance data and identify patterns:\n{records_prompt}"

    inputs = tokenizer.encode(prompt, return_tensors="pt")
    outputs = model.generate(inputs, max_length=300, num_return_sequences=1)

    result = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return result

API_KEY = "4e802ec43cc7767e5a17de320157d23f"
Base_url = "https://api.openweathermap.org/data/2.5/weather"

def get_weather(lat, lon, date):
    timestamp = int(datetime.strptime(str(date), "%Y-%m-%d").timestamp())
    params = {
        "lat": lat,
        "lon": lon,
        "dt": timestamp,
        "appid": API_KEY,
        "units": "metric",
    }
    response = requests.get(Base_url, params=params)
    return response.json()


def check_adverse_weather(weather_data):
    weather_conditions = weather_data.get('current', {}).get('weather', [])
    for condition in weather_conditions:
        if condition['main'] in ['Rain', 'Snow']:
            return True  # Adverse weather detected
    return False