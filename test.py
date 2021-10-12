from requests import session
import pandas as pd
from time import sleep
s = session()
headers = {
    'Connection': 'keep-alive',
    'Sec-Ch-Ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
    'Accept': '*/*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'Sec-Ch-Ua-Mobile': '?0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Origin': 'https://www.ptpress.com.cn',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'https://www.ptpress.com.cn/shopping/search?tag=search&orderStr=hot&level1=75424c57-6dd7-4d1f-b6b9-8e95773c0593',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
cookies = {
    'gr_user_id': 'e93cb5ef-96b3-453b-a7ea-d16e9e523bbe',
    'acw_tc': '2760823216339722971442101ea95d766ce0db38512f94ead8d8bbe7c6e6ff',
    'JSESSIONID': '0F2E5BE9637D40C2C5844E5472B7E676',
    'gr_session_id_9311c428042bb76e': '2b79ba9b-e947-4bf3-9a67-14a30e39a223',
    'gr_session_id_9311c428042bb76e_2b79ba9b-e947-4bf3-9a67-14a30e39a223': 'true',
}
data = {
    'bookTagId': '75424c57-6dd7-4d1f-b6b9-8e95773c0593',
    'page': '1',
    'rows': '18',
    'orderStr': 'hot',
}
s.headers.update(headers)
s.cookies.update(cookies)
results = []
for i in range(1,20):
    data['page'] = str(i)
    res = s.post('https://www.ptpress.com.cn/bookinfo/getBookListForEBTag', data=data)
    res_json = res.json()
    result = res_json['data']['data']
    print(result)
    results.extend(result)
    sleep(1)
dt = pd.DataFrame(results)
dt.to_csv("./results_1633973545966.csv")
