const OPENAI_URL = 'https://api.openai.com';

// 将敏感词汇放在一个数组中
const sensitiveWords = ['关键词1', '关键词2', '更多关键词'];

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  url.host = OPENAI_URL.replace(/^https?:\/\//, '');

  const requestBody = await request.clone().text();
  
  // 检查请求体中是否包含任何敏感词汇
  if (sensitiveWords.some(word => requestBody.includes(word))) {
    return new Response('请求中包含敏感词汇，无法处理。', { status: 400 });
  }

  const modifiedRequest = new Request(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: 'follow'
  });

  const response = await fetch(modifiedRequest);
  const modifiedResponse = new Response(response.body, response);

  // 添加允许跨域访问的响应头
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');

  return modifiedResponse;
}
