import https from 'https';




// REQUEST (TYPES)
// ---------------

export interface HttpHeaders {
  [key: string]: string,
}

export interface HttpRequestError extends Error {
  code: number,
  response: string|object,
}

export interface HttpRequestOptions {
  url: string,
  method?: string,
  body?: object,
  headers?: HttpHeaders,
  timeout?: number,
}




// QUERY
// -----

export function queryString(data: object): string {
  if (data == null) return '';
  var a = new URLSearchParams();
  for (var k in data)
    a.append(k, data[k]);
  return '?' + a.toString();
}




// ERROR
// -----

function getHttpError(error: Error): HttpRequestError {
  var a  = error as HttpRequestError;
  a.code = 0;
  a.response = null;
  return a;
}

function getHttpResponseError(error: Error, code: number, response: string): HttpRequestError {
  var a  = error as HttpRequestError;
  a.code = code;
  a.response = response;
  return a;
}




// HEADERS
// -------

function hasHeader(key: string, o: HttpRequestOptions): boolean {
  if (o.headers == null) return false;
  if (o.headers.hasOwnProperty(key)) return true;
  if (o.headers.hasOwnProperty(key.toLowerCase())) return true;
  return false;
}

function setHeaders(headers: HttpHeaders, o: HttpRequestOptions): void {
  if (o.body != null && !hasHeader('Content-Type', o)) {
    headers['content-type'] = 'application/json; charset=utf-8';
  }
  if (!hasHeader('Accept', o)) {
    headers['accept'] = 'application/json, text/*';
  }
}




// REQUEST
// -------

function httpRequest(o: HttpRequestOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    var {url, method, headers, timeout} = o;
    setHeaders(headers, o);
    var req = https.request(url, {method, headers, timeout}, res => {
      var body = '';
      res.setEncoding('utf8');
      res.on('error', e => reject(getHttpResponseError(e, res.statusCode, body)));
      res.on('data',  chunk => body += chunk);
      res.on('end',   () => resolve(body));
    });
    req.on('error', e => reject(getHttpError(e)));
    if (o.body != null) req.write(JSON.stringify(o.body));
    req.end();
  });
}

export function httpRequestText(options: HttpRequestOptions): Promise<string> {
  return httpRequest(options);
}

export async function httpRequestJson(options: HttpRequestOptions): Promise<object> {
  var response = await httpRequest(options);
  return JSON.parse(response);
}
