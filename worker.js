const OPENAI_URL = 'https://api.openai.com';

const keyMap = {
  '自定义api名1': 'openai-api1',
  '自定义api名2': 'openai-api2',
  // ...更多映射关系...
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  url.host = OPENAI_URL.replace(/^https?:\/\//, '');

  const modifiedRequest = new Request(url.toString(), {
    headers: new Headers(request.headers),
    method: request.method,
    body: request.body,
    redirect: 'follow'
  });

  const authHeader = modifiedRequest.headers.get('Authorization');
  if (authHeader) {
    for (const customKey in keyMap) {
      if (authHeader.includes(customKey)) {
        modifiedRequest.headers.set('Authorization', authHeader.replace(customKey, keyMap[customKey]));
        break;
      }
    }
  }

  const response = await fetch(modifiedRequest);
  const modifiedResponse = new Response(response.body, response);

  // 添加允许跨域访问的响应头
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');

  return modifiedResponse;
}
