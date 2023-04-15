import requests, re

def ocr_space_file(filename, overlay=False, api_key='K89580507588957', language='eng'):
    payload = {'isOverlayRequired': overlay,
               'apikey': api_key,
               'language': language,
               }
    with open(filename, 'rb') as f:
        r = requests.post('https://api.ocr.space/parse/image',
                          files={filename: f},
                          data=payload,
                          )
    money_pattern = r'(?:USD\s*)?\$\d+(?:\.\d{2})?'
    matches = re.findall(money_pattern, r.content.decode())
    # print(r.content.decode())
    # print(max(matches))
    prices_float = [float(p[1:]) for p in matches]
    max_price = max(prices_float)
    print("The maximum price is:", max_price)
    print(matches)
    # max_price = int(max_price)
    # max_price = str(max_price)
    return [max_price]

img = 'bill.png'
ocr_space_file(img)