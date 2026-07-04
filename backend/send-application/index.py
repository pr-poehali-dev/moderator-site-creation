import json
import os
import urllib.request
import urllib.error

RECIPIENT = 'standoff2ggq482@gmail.com'
SENDER = 'Black Russia <onboarding@resend.dev>'


def handler(event: dict, context) -> dict:
    '''
    Принимает анкету модератора и отправляет её на email администратора через Resend.
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

    api_key = os.environ.get('RESEND_API_KEY')

    if not api_key:
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

    payload = json.dumps({
        'from': SENDER,
        'to': [RECIPIENT],
        'reply_to': email,
        'subject': f'Заявка модератора: {nickname}',
        'html': html,
    }).encode('utf-8')

    req = urllib.request.Request(
        'https://api.resend.com/emails',
        data=payload,
        method='POST',
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        },
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            resp.read()
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8', errors='ignore')
        return {
            'statusCode': 502,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Не удалось отправить письмо', 'details': error_body}, ensure_ascii=False),
        }

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена'}, ensure_ascii=False),
    }
