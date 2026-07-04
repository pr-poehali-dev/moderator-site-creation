import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

RECIPIENT = 'standoff2ggq482@gmail.com'


def handler(event: dict, context) -> dict:
    '''
    Принимает анкету модератора и отправляет её на email администратора.
    Args: event - dict с httpMethod, body (JSON с полями анкеты)
          context - объект с request_id
    Returns: HTTP-ответ с результатом отправки
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body_data = json.loads(event.get('body') or '{}')

    nickname = str(body_data.get('nickname', '')).strip()
    age = str(body_data.get('age', '')).strip()
    email = str(body_data.get('email', '')).strip()
    phone = str(body_data.get('phone', '')).strip()
    server = str(body_data.get('server', '')).strip()
    online = str(body_data.get('online', '')).strip()
    experience = str(body_data.get('experience', '')).strip()
    motivation = str(body_data.get('motivation', '')).strip()

    if not nickname or not email:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите ник и email'}, ensure_ascii=False),
        }

    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')

    if not smtp_user or not smtp_password:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Почта не настроена'}, ensure_ascii=False),
        }

    html = f'''
    <h2>Новая заявка на модератора</h2>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;">
      <tr><td style="padding:6px 14px;font-weight:bold;">Ник</td><td style="padding:6px 14px;">{nickname}</td></tr>
      <tr><td style="padding:6px 14px;font-weight:bold;">Возраст</td><td style="padding:6px 14px;">{age}</td></tr>
      <tr><td style="padding:6px 14px;font-weight:bold;">Email</td><td style="padding:6px 14px;">{email}</td></tr>
      <tr><td style="padding:6px 14px;font-weight:bold;">Телефон</td><td style="padding:6px 14px;">{phone}</td></tr>
      <tr><td style="padding:6px 14px;font-weight:bold;">Сервер</td><td style="padding:6px 14px;">{server}</td></tr>
      <tr><td style="padding:6px 14px;font-weight:bold;">Онлайн</td><td style="padding:6px 14px;">{online}</td></tr>
      <tr><td style="padding:6px 14px;font-weight:bold;">Опыт</td><td style="padding:6px 14px;">{experience}</td></tr>
      <tr><td style="padding:6px 14px;font-weight:bold;">Мотивация</td><td style="padding:6px 14px;">{motivation}</td></tr>
    </table>
    '''

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Заявка модератора: {nickname}'
    msg['From'] = smtp_user
    msg['To'] = RECIPIENT
    msg['Reply-To'] = email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server_conn:
        server_conn.login(smtp_user, smtp_password)
        server_conn.sendmail(smtp_user, [RECIPIENT], msg.as_string())

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена'}, ensure_ascii=False),
    }
