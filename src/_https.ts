import http from 'http';
import https from 'https';




/**
 * Request options for HTTP(S) requests.
 */
export type HttpsRequestOptions = https.RequestOptions;

export interface HttpsIncomingMessage extends http.IncomingMessage {
  /** Represents the response body. */
  body: string
};




/**
 * Get object as query string .
 * @param data object with keys and values
 * @returns query string (key1=value1&key2=value2)
 */
 export function queryString(data: object): string {
  if (data == null) return '';
  var a = new URLSearchParams();
  for (var k in data)
    a.append(k, data[k]);
  return '?' + a.toString();
}


/**
 * Make an HTTPS request.
 * @param url request url
 * @param options request options
 * @param data data to write
 * @returns response +{body}
 */
export function httpsRequest(url: string, options: https.RequestOptions, data: string): Promise<HttpsIncomingMessage> {
  return new Promise((fres, frej) => {
    var req = https.request(url, options, res => {
      var body = '';
      res.setEncoding('utf8');
      res.on('error', frej);
      res.on('data',  chunk => body += chunk);
      res.on('end',   () => fres(Object.assign(res, {body})));
    });
    req.on('error', frej);
    req.write(data);
    req.end();
  });
}
