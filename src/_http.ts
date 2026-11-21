//#region REQUEST (TYPES)
//-----------------------

/** HTTP(s) Header keys and values. */
export interface HttpHeaders {
  [key: string]: string;
}


/** HTTP(s) Error. */
export interface HttpError extends Error {
  /** Status code (404). */
  code: number;
  /** Response data. */
  response: string | object | null;
}


/** HTTP(s) Request Options. */
export interface HttpRequestOptions {
  /** Full URL, including protocol and query. */
  url: string;
  /** HTTP(s) method (GET). */
  method?: string;
  /** Body of request (JSON). */
  body?: object | null;
  /** Request headers. */
  headers?: HttpHeaders;
  /** What if we don't get a response? (ms) */
  timeout?: number;
}
//#endregion




//#region QUERY
//-------------

/** Convert an object to a query string. */
export function queryString(data: Record<string, string>): string {
  if (data == null) return "";
  const a = new URLSearchParams();
  for (const k in data)
    a.append(k, data[k]);
  return "?" + a.toString();
}
//#endregion




//#region ERROR
//-------------

/** Convert a generic error to an HTTP error. */
function httpError(error: Error, code: number = 0, response: string | null = null): HttpError {
  const a = error as HttpError;
  a.code     = code
  a.response = response;
  return a;
}
//#endregion




//#region HEADERS
//---------------

/** Check if a header exists (case-insensitive). */
function hasHeader(key: string, headers: HttpHeaders): boolean {
  if (headers == null) return false;
  if (headers[key] != null) return true;
  if (headers[key.toLowerCase()] != null) return true;
  return false;
}


/** Set default headers if not already present. */
function setHeaders(headers: HttpHeaders, o: HttpRequestOptions): void {
  if (o.body != null && !hasHeader("Content-Type", headers)) {
    headers["content-type"] = "application/json; charset=utf-8";
  }
  if (!hasHeader("Accept", headers)) {
    headers["accept"] = "application/json, text/*";
  }
}
//#endregion




//#region REQUEST
//---------------

/** Make an HTTP(s) request and return the response as text. */
async function httpRequest(o: HttpRequestOptions): Promise<string> {
  const {url, method = "GET", body} = o;
  const headers: HttpHeaders = {...(o.headers ?? {})};
  setHeaders(headers, o);
  // Fetch API supports AbortSignal.timeout() in modern browsers and Node.js 20+.
  const signal   = o.timeout != null? AbortSignal.timeout(o.timeout) : undefined;
  const bodyText = body != null? JSON.stringify(body) : undefined;
  let res: Response;
  try { res = await fetch(url, {method, headers, body: bodyText, signal}); }
  catch (e) { throw httpError(e as Error); }
  try { return await res.text(); }
  catch (e) { throw httpError(e as Error, res.status, ""); }
}


/** Make an HTTP(s) request and return the response as text. */
export function httpRequestText(options: HttpRequestOptions): Promise<string> {
  return httpRequest(options);
}


/** Make an HTTP(s) request and return the response as JSON. */
export async function httpRequestJson(options: HttpRequestOptions): Promise<object> {
  const res = await httpRequest(options);
  return JSON.parse(res);
}
//#endregion
