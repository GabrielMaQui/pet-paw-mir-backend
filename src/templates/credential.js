export const getHTMLTemplate = (name, token) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Completa tu Registro en Pet Paw</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #2c3e50;
                margin: 0;
                padding: 0;
            }
            .container {
                background-color: #ffffff;
                width: 80%;
                max-width: 600px;
                margin: 50px auto;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #27ae60;
                color: white;
                padding: 20px;
                text-align: center;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
            .header img {
                width: 50px;
                height: auto;
                display: block;
                margin: 0 auto 10px auto;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                margin: 20px 0;
            }
            .content p {
                line-height: 1.6;
            }
            .token {
                display: block;
                width: 18rem;
                margin: 10px auto;
                padding: 10px;
                background-color: #2c3e50;
                color: white;
                border-radius: 5px;
                font-weight: bold;
                text-align: center;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                color: #34495e;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://raw.githubusercontent.com/Gabicho258/votify-frontend/master/src/assets/logo_clean_zoom.png" alt="Pet Paw Logo" />
                <h1>Completa tu Registro en Pet Paw</h1>
            </div>
            <div class="content">
                <p>¡Hola ${name}!</p>
                <p>Gracias por unirte a Pet Paw. Para completar tu registro, usa el siguiente token de verificación:</p>
                <span class="token">Token: ${token}</span>
            </div>
            <div class="footer">
                <p>¡Gracias por ser parte de Pet Paw!</p>
            </div>
        </div>
    </body>
    </html>
  `;
};
