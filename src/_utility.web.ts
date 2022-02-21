// SHA256
// ------

export async function sha256DigestHex(text: string): Promise<string> {
  var data   = new TextEncoder().encode(text);
  var buffer = await crypto.subtle.digest('SHA-256', data);
  var bytes  = Array.from(new Uint8Array(buffer));
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
}




// HTTP
// ----

export interface HttpHeaders {
  [key: string]: string,
}

export interface HttpRequestError extends Error {
  code: number,
  response: string|object,
}

export interface HttpRequestOptions {
  method?: string,
  query?: object,
  body?: object,
  headers?: HttpHeaders,
  timeout?: number,
}


function queryString(data: object): string {
  if (data == null) return '';
  var a = new URLSearchParams();
  for (var k in data)
    a.append(k, data[k]);
  return '?' + a.toString();
}


function isXhrAborted(xhr: XMLHttpRequest): boolean {
  return xhr.readyState === XMLHttpRequest.UNSENT && xhr.status === 0;
}

function isXhrDone(xhr: XMLHttpRequest): boolean {
  return xhr.readyState === xhr.DONE;
}

function isXhrSuccess(xhr: XMLHttpRequest, url: string=''): boolean {
  return (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (/^file:\/\//i).test(url);
}

function getXhrResponse(xhr: XMLHttpRequest, responseType: string): string|object {
  if (responseType === 'json') {
    if (!xhr.responseType) {
      try { return JSON.parse(xhr.responseText); }
      catch (e) { return null; }
    }
  }
  else if (!responseType || responseType === 'text') {
    if (xhr.response == null) return xhr.responseText;
  }
  return xhr.response;
}

function getXhrError(xhr: XMLHttpRequest, message: string): HttpRequestError {
  var error  = new Error(message) as HttpRequestError;
  error.code = xhr.status;
  error.response = null;
  return error;
}

function getXhrResponseError(xhr: XMLHttpRequest, response: string|object): HttpRequestError {
  var message = null;
  try       { message = xhr.responseText; }
  catch (e) { message = response; }
  var error  = new Error(message) as HttpRequestError;
  error.code = xhr.status;
  error.response = response;
  return error;
}


function hasHeader(key: string, o: HttpRequestOptions): boolean {
  if (o.headers == null) return false;
  if (o.headers.hasOwnProperty(key)) return true;
  if (o.headers.hasOwnProperty(key.toLowerCase())) return true;
  return false;
}

function setHeaders(xhr: XMLHttpRequest, o: HttpRequestOptions): void {
  if (o.body != null && !hasHeader('Content-Type', o)) {
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  }
  if (!hasHeader('Accept', o)) {
    xhr.setRequestHeader('Accept', 'application/json, text/*');
  }
  for (var key in o.headers) {
    xhr.setRequestHeader(key, o.headers[key]);
  }
}


function httpRequest(responseType: string, url: string, o: HttpRequestOptions={}): Promise<string|object> {
  return new Promise((resolve, reject) => {
    url += queryString(o.query);
    var method = o.method || 'GET';
    var isError = false, isAbort = false, isTimeout = false;
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    setHeaders(xhr, o);
    if (o.timeout) xhr.timeout = o.timeout;
    xhr.responseType = responseType as XMLHttpRequestResponseType;
    xhr.onerror = function(e) {
      isError = true;
      var xhr = e.target as XMLHttpRequest;
      reject(getXhrError(xhr, 'Unexpected error occurred'));
    };
    xhr.onabort = function(e) {
      isAbort = true;
      var xhr = e.target as XMLHttpRequest;
      reject(getXhrError(xhr, 'Request was aborted'));
    };
    xhr.ontimeout = function(e) {
      isTimeout = true;
      var xhr = e.target as XMLHttpRequest;
      reject(getXhrError(xhr, 'Request timed out'));
    };
    xhr.onreadystatechange = function(e) {
      if (isError || isAbort || isTimeout) return;
      var xhr = e.target as XMLHttpRequest;
      if (isXhrDone(xhr)) {
        try {
          var response = getXhrResponse(xhr, responseType);
          if (isXhrSuccess(xhr, url)) resolve(response);
          else {
            setTimeout(function() {
              if (isError || isAbort || isTimeout) return;
              reject(getXhrResponseError(xhr, response));
            });
          }
        }
        catch (e) { reject(e); }
      }
    };
    if (o.body == null) xhr.send();
    else if (o.body instanceof FormData || o.body instanceof URLSearchParams) xhr.send(o.body);
    else xhr.send(JSON.stringify(o.body));
  });
}

export function httpRequestText(url: string, o: HttpRequestOptions={}): Promise<string> {
  return httpRequest('text', url, o) as Promise<string>;
}

export function httpRequestJson(url: string, o: HttpRequestOptions={}): Promise<object> {
  return httpRequest('json', url, o) as Promise<object>;
}
