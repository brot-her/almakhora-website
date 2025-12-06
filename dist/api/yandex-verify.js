export default function handler(req, res) {
  // ⚠️ ВАЖНО: ЗАМЕНИТЕ 'ВАШ_КОД' на реальный код из Яндекс.Вебмастера!
  const yandexCode = "ВАШ_КОД_ИЗ_ЯНДЕКС_ВЕБМАСТЕРА";
  
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Яндекс.Вебмастер Verification</title>
      </head>
      <body>
        <p>Verification code: ${yandexCode}</p>
      </body>
    </html>
  `);
}
