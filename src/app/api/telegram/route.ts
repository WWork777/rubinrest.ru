// app/api/telegram/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { hall, phone } = await request.json();

    // Валидация данных
    if (!hall || !phone) {
      return NextResponse.json(
        { error: "Необходимо указать зал и телефон" },
        { status: 400 }
      );
    }

    const TELEGRAM_BOT_TOKEN = "8254432215:AAG1ktjEgoNjfWkKJM7zlntDSMDijvQ7C5Q";
    const TELEGRAM_CHAT_ID = "-4989412482";

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Telegram credentials not configured");
      return NextResponse.json(
        { error: "Сервис временно недоступен" },
        { status: 500 }
      );
    }

    // Формируем сообщение для Telegram
    const message = `
    <b>Новая заявка на бронирование зала!</b>

🏛 <b>Зал:</b> ${hall}
📞 <b>Телефон:</b> ${phone}
`.trim();

    // Отправляем в Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Telegram API error:", errorData);
      throw new Error(`Telegram API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        message: "Заявка успешно отправлена",
        telegramResponse: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    return NextResponse.json(
      { error: "Ошибка при отправке заявки" },
      { status: 500 }
    );
  }
}
