from sympy.physics.vector.printing import params
from transformers import AutoModelForCausalLM,AutoTokenizer
import requests
model_name="EleutherAI/gpt-neo-1.3B"

tokenizer=AutoTokenizer.from_pretrained(model_name)
model=AutoModelForCausalLM.from_pretrained(model_name)

def analyze_compliance(data):
    prompt=f"Analyze the following Compliance data and identify patterns."

    inputs=tokenizer.encode(prompt, return_tensor='pt')

    outputs=model.generate(inputs,max_length=300,num_return_sequences=1)


    result=tokenizer.decode(outputs[0],skip_special_tokens=True)
    return result

API_KEY="4e802ec43cc7767e5a17de320157d23f"
Base_url="http://api.openweathermap.org/data/2.5/weather"

def get_weather(city):
    params={"q":city,"appid":API_KEY,"units":"metric"}
    response=requests.get(Base_url,params=params)
    return response.json()



