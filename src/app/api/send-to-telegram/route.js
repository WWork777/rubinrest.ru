// app/api/send-to-telegram/route.js
export async function POST(request) {
  const TELEGRAM_BOT_TOKEN = "8254432215:AAG1ktjEgoNjfWkKJM7zlntDSMDijvQ7C5Q";
  const TELEGRAM_CHAT_ID = "-4989412482";

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return new Response(
      JSON.stringify({ error: "Telegram credentials not configured" }),
      { status: 500 }
    );
  }

  try {
    const { message } = await request.json();

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
      const errorData = await response.json();
      throw new Error(errorData.description || "Telegram API error");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send message" }),
      { status: 500 }
    );
  }
}
