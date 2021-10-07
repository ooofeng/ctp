// 首字母大写
first_word_upper = function (x) {
    return x.replace(x[0], x[0].toUpperCase())
}
// 关键字每段首字母大写
key_to_upper = function (key_string) {
    return key_string.split('-').map((x) => { return first_word_upper(x) }).join('-');
}
// json转换为字符串
jsonify = function (text_json) {
    result = '{\n'
    for(key in text_json){
        val = text_json[key]
        sign = val.indexOf("'") >= 0 ? '"' : "'"
        result += `    '${key}': ${sign}${val}${sign},\n`
    }
    return result + '}'
}

code_model_1 = function(mode,url,method,headers,cookies,data,post_mode){
    text_code = ''
    text_code += 'from requests import session\n';
    text_code += 's = session()\n';
    text_code += `headers = ${headers}\n`;
    if(cookies!=''){
        text_code += `cookies = ${cookies}\n`;
    }
    if(method=='post'){
        text_code += data!='' ? `data = ${data}\n` : '';
    }
    text_code += 's.headers.update(headers)\n';
    if(cookies!=''){
        text_code += 's.cookies.update(cookies)\n';
    }
    if(method=='post'){
        if(data!=''){
            text_code += `res = s.post('${url}', ${post_mode}=data)\n`;
        }else{
            text_code += `res = s.post('${url}')\n`;
        }
    }else{
        text_code += `res = s.get('${url}')\n`;
    }
    text_code += 'print(res.text)\n';
    return text_code;
}
code_model_2 = function(mode,url,method,headers,cookies,data,post_mode){
    text_code = '';
    text_code += 'from requests import session\n';
    text_code += 'import pandas as pd\n';
    text_code += 's = session()\n';
    text_code += `headers = ${headers}\n`;
    if(cookies!=''){
        text_code += `cookies = ${cookies}\n`;
    }
    if(method=='post'){
        text_code += data!='' ? `data = ${data}\n` : '';
    }
    text_code += 's.headers.update(headers)\n';
    if(cookies!=''){
        text_code += 's.cookies.update(cookies)\n';
    }
    text_code += 'results = []\n'
    text_code += 'for i in range(1,<page>):\n'
    if(method=='post'){
        if(data!=''){
            text_code += `    data['<pageIndex>'] = str(i)\n`
            text_code += `    res = s.post('${url}', ${post_mode}=data)\n`;
        }else{
            text_code += `    res = s.post('${url}')\n`;
        }
    }else{
        text_code += `    url = '<pageIndexUrl>'\n`;
        text_code += `    res = s.get(url)\n`;
    }
    text_code += '    res_json = res.json()\n';
    text_code += '    result = res_json[<data_json_path>]\n';
    text_code += '    results.extend(result)\n';
    text_code += 'dt = pd.DataFrame(results)\n';
    text_code += `dt.to_csv("./results_${new Date().getTime()}.csv")\n`;
    return text_code;
}

code_generate = function(mode,url,method,headers,cookies,data,post_mode){
    
    if(mode=='session'){
        text_code = code_model_1(mode,url,method,headers,cookies,data,post_mode);
        return text_code;
    }else if(mode=='session_json'){
        text_code = code_model_1(mode,url,method,headers,cookies,data,post_mode);
        return text_code.replace('print(res.text)','print(res.json())');
    }else if(mode=='session_json_csv'){
        return code_model_2(mode,url,method,headers,cookies,data,post_mode);
    }
}

const user_agent_list = [
    {
        name: 'chrome_windows',
        name_show: 'Windows Chrome',
        ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
    },
    {
        name: 'firefox_windows',
        name_show: 'Windows Firefox',
        ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0'
    },
    {
        name: 'wechat_android',
        name_show: 'Android Wechat',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B329 MicroMessenger/5.0.1'
    },
    {
        name: 'Safari',
        name_show: 'iPhone Safari',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
    },
    {
        name: 'Safari',
        name_show: 'Mac Safari',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
    }
]
const code_mode_list = [
    {
        mode: 'json_mongo',
        name_show: 'json & mongo'
    },
    {
        mode: 'json_csv',
        name_show: 'json & csv'
    },
    {
        mode: 'json_mysql',
        name_show: 'json & mysql'
    },
    {
        mode: 'json_mongo_翻页',
        name_show: 'json & mongo & 翻页'
    },
    {
        mode: 'json_csv_翻页',
        name_show: 'json & csv & 翻页'
    },
    {
        mode: 'session_json_csv',
        name_show: 'xpath & mongo'
    },
    {
        mode: 'session_json_mongo',
        name_show: 'xpath & csv'
    },
    {
        mode: 'session_json_mongo',
        name_show: 'xpath & mysql'
    },
    {
        mode: 'session_json_mongo',
        name_show: 'xpath & csv & 翻页'
    },
    {
        mode: 'session_json_mongo',
        name_show: 'xpath & mysql & 翻页'
    },
]

 

