from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import httpx
import os

app = FastAPI()

class Application(BaseModel):
    phone: str
    telegram: str

# Эти данные должны быть в переменных окружения на сервере
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "PLACEHOLDER_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "PLACEHOLDER_ID")

@app.post("/api/send-message")
async def send_message(application: Application):
    # 1. Сохранение данных (152-ФЗ)
    # Здесь мы будем сохранять в БД (SQLite/PostgreSQL) на сервере в РФ
    print(f"Received application: {application}")
    
    # 2. Отправка в Telegram
    message = (
        f"🚀 Новая заявка: Мирраника\n"
        f"📞 Телефон: {application.phone}\n"
        f"✈️ Telegram: {application.telegram}"
    )
    
    async with httpx.AsyncClient() as client:
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        payload = {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message
        }
        response = await client.post(url, json=payload)
        
    if response.status_code != 200:
        # Логируем ошибку, но пользователю можем не показывать детали
        print(f"Telegram error: {response.text}")
        # Не кидаем ошибку пользователю, если данные уже сохранены, 
        # но для обучения кинем:
        # raise HTTPException(status_code=500, detail="Telegram notification failed")

    return {"status": "success", "message": "Application received"}
