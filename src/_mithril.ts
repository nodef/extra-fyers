// TYPES
// -----

/**
 * The request options to pass.
 */
export interface RequestOptions {
  /** The HTTP method to use. This value should be one of the following: GET, POST, PUT, PATCH, DELETE, HEAD or OPTIONS. Defaults to GET. */
  method?: string,
  /** The data to be interpolated into the URL and/or serialized into the query string. */
  params?: object,
  /** The data to be serialized into the body (for other types of requests). */
  body?: object,
  /** Whether the request should be asynchronous. Defaults to true. */
  async?: boolean,
  /** A username for HTTP authorization. Defaults to undefined. */
  user?: string,
  /** A password for HTTP authorization. Defaults to undefined. This option is provided for XMLHttpRequest compatibility, but you should avoid using it because it sends the password in plain text over the network. */
  password?: string,
  /** Whether to send cookies to 3rd party domains. Defaults to false. */
  withCredentials?: boolean,
  /** The amount of milliseconds a request can take before automatically being terminated. Defaults to undefined. */
  timeout?: number,
  /** The expected type of the response. Defaults to "" if extract is defined, "json" if missing. If responseType: "json", it internally performs JSON.parse(responseText). */
  responseType?: string,
  /** Exposes the underlying XMLHttpRequest object for low-level configuration and optional replacement (by returning a new XHR). */
  config?: (xhr: XMLHttpRequest, ...rest: any[]) => XMLHttpRequest,
  /** Headers to append to the request before sending it (applied right before options.config). */
  headers?: object,
  /** A constructor to be applied to each object in the response. Defaults to the identity function. */
  type?: (value: any) => any,
  /** A serialization method to be applied to body. Defaults to JSON.stringify, or if options.body is an instance of FormData, defaults to the identity function (i.e. function(value) {return value}). */
  serialize?: (value: any) => string,
  /** A deserialization method to be applied to the xhr.response or normalized xhr.responseText. Defaults to the identity function. If extract is defined, deserialize will be skipped. */
  deserialize?: (value: any) => any,
  /** A hook to specify how the XMLHttpRequest response should be read. Useful for processing response data, reading headers and cookies. By default this is a function that returns options.deserialize(parsedResponse), throwing an exception when the server response status code indicates an error or when the response is syntactically invalid. If a custom extract callback is provided, the xhr parameter is the XMLHttpRequest instance used for the request, and options is the object that was passed to the m.request call. Additionally, deserialize will be skipped and the value returned from the extract callback will be left as-is when the promise resolves. */
  extract?: (xhr: XMLHttpRequest, options: object) => any,
  /** If false, redraws mounted components upon completion of the request. If true, it does not. Defaults to false. */
  background?: boolean,
}


/**
 * The request options to pass.
 */
export interface JsonpOptions {
  /** The data to be interpolated into the URL and serialized into the querystring. */
  params?: object,
  /** A constructor to be applied to each object in the response. Defaults to the identity function. */
  type?: (value: any) => any,
  /** The name of the function that will be called as the callback. Defaults to a randomized string (e.g. _mithril_6888197422121285_0({a: 1}). */
  callbackName?: string,
  /** The name of the querystring parameter name that specifies the callback name. Defaults to callback (e.g. /someapi?callback=_mithril_6888197422121285_0). */
  callbackKey?: string,
  /** If false, redraws mounted components upon completion of the request. If true, it does not. Defaults to false. */
  background?: boolean,
}




// HELPERS
// -------

function hasOwn(key: string): boolean {
  return this.hasOwnProperty(key);
}

function hasHeader(args: RequestOptions, name: string): boolean {
  for (var key in args.headers) {
    if (hasOwn.call(args.headers, key) && key.toLowerCase() === name) return true;
  }
  return false;
}




// REQUEST
// -------

/**
 * Makes XHR (aka AJAX) requests, and returns a promise.
 * @param url The path name to send the request to, optionally interpolated with values from args.params.
 * @param args The request options to pass.
 * @returns A promise that resolves to the response data, after it has been piped through the extract, deserialize and type methods.
 */
export function request(url: string, args: RequestOptions={}): Promise<any> {
  return new Promise((resolve, reject) => {
    var method = args.method != null ? args.method.toUpperCase() : "GET";
    var body   = args.body;
    var assumeJSON   = (args.serialize == null || args.serialize === JSON.stringify) && !(body instanceof FormData || body instanceof URLSearchParams);
    var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json");

    var xhr = new XMLHttpRequest(), aborted = false, isTimeout = false;
    var original = xhr, replacedAbort = null;
    var abort = xhr.abort;

    xhr.abort = function() {
      aborted = true;
      abort.call(this);
    };

    xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined);

    if (assumeJSON && body != null && !hasHeader(args, "content-type")) {
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    }
    if (typeof args.deserialize !== "function" && !hasHeader(args, "accept")) {
      xhr.setRequestHeader("Accept", "application/json, text/*");
    }
    if (args.withCredentials) xhr.withCredentials = args.withCredentials;
    if (args.timeout) xhr.timeout = args.timeout;
    xhr.responseType = responseType as XMLHttpRequestResponseType;

    for (var key in args.headers) {
      if (hasOwn.call(args.headers, key)) {
        xhr.setRequestHeader(key, args.headers[key]);
      }
    }

    xhr.onreadystatechange = function(ev) {
      // Don't throw errors on xhr.abort().
      if (aborted) return;

      // @ts-ignore: Property 'readyState' does not exist on type 'EventTarget'.
      if (ev.target.readyState === 4) {
        try {
          // @ts-ignore: Property 'status' does not exist on type 'EventTarget'.
          var success = (ev.target.status >= 200 && ev.target.status < 300) || ev.target.status === 304 || (/^file:\/\//i).test(url);
          // When the response type isn't "" or "text",
          // `xhr.responseText` is the wrong thing to use.
          // Browsers do the right thing and throw here, and we
          // should honor that and do the right thing by
          // preferring `xhr.response` where possible/practical.
          // @ts-ignore: Property 'response' does not exist on type 'EventTarget'.
          var response = ev.target.response, message = null;

          if (responseType === "json") {
            // For IE and Edge, which don't implement
            // `responseType: "json"`.
            // @ts-ignore: Property 'responseType' does not exist on type 'EventTarget'.
            if (!ev.target.responseType && typeof args.extract !== "function") {
              // Handle no-content which will not parse.
              // @ts-ignore: Property 'responseText' does not exist on type 'EventTarget'.
              try { response = JSON.parse(ev.target.responseText); }
              catch (e) { response = null; }
            }
          } else if (!responseType || responseType === "text") {
            // Only use this default if it's text. If a parsed
            // document is needed on old IE and friends (all
            // unsupported), the user should use a custom
            // `config` instead. They're already using this at
            // their own risk.
            // @ts-ignore: Property 'responseText' does not exist on type 'EventTarget'.
            if (response == null) response = ev.target.responseText;
          }

          if (typeof args.extract === "function") {
            response = args.extract(ev.target as XMLHttpRequest, args);
            success = true;
          } else if (typeof args.deserialize === "function") {
            response = args.deserialize(response);
          }
          if (success) resolve(response);
          else {
            var completeErrorResponse = function() {
              // @ts-ignore: Property 'responseText' does not exist on type 'EventTarget'.
              try { message = ev.target.responseText; }
              catch (e) { message = response; }
              var error = new Error(message);
              // @ts-ignore: Property 'code' does not exist on type 'Error'.
              error.code = ev.target.status;
              // @ts-ignore: Property 'response' does not exist on type 'Error'.
              error.response = response;
              reject(error);
            };

            if (xhr.status === 0) {
              // Use setTimeout to push this code block onto the event queue
              // This allows `xhr.ontimeout` to run in the case that there is a timeout
              // Without this setTimeout, `xhr.ontimeout` doesn't have a chance to reject
              // as `xhr.onreadystatechange` will run before it
              setTimeout(function() {
                if (isTimeout) return;
                completeErrorResponse();
              })
            } else completeErrorResponse();
          }
        }
        catch (e) {
          reject(e);
        }
      }
    }

    xhr.ontimeout = function (ev) {
      isTimeout = true;
      var error = new Error("Request timed out");
      // @ts-ignore: Property 'code' does not exist on type 'Error'.
      error.code = ev.target.status;
      reject(error);
    };

    if (typeof args.config === "function") {
      xhr = args.config(xhr, args, url) || xhr;

      // Propagate the `abort` to any replacement XHR as well.
      if (xhr !== original) {
        replacedAbort = xhr.abort;
        xhr.abort = function() {
          aborted = true;
          replacedAbort.call(this);
        }
      }
    }

    if (body == null) xhr.send();
    else if (typeof args.serialize === "function") xhr.send(args.serialize(body));
    else if (body instanceof FormData || body instanceof URLSearchParams) xhr.send(body);
    else xhr.send(JSON.stringify(body));
  });
}






// JSONP
// -----

/**
 * Makes JSON-P requests. Typically, it's useful to interact with servers that allow JSON-P but that don't have CORS enabled.
 * @param url The path name to send the request to, optionally interpolated with values from args.params.
 * @param args The request options to pass.
 * @returns A promise that resolves to the response data, after it has been piped through type method.
 */
export function jsonp(url: string, args: JsonpOptions={}): Promise<any> {
  return new Promise((resolve, reject) => {
    var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_0";
    var script = document.createElement("script")
    window[callbackName] = function(data: any) {
      delete window[callbackName];
      script.parentNode.removeChild(script);
      resolve(data);
    };
    script.onerror = function() {
      delete window[callbackName];
      script.parentNode.removeChild(script);
      reject(new Error("JSONP request failed"));
    };
    script.src = url + (url.indexOf("?") < 0 ? "?" : "&") +
      encodeURIComponent(args.callbackKey || "callback") + "=" +
      encodeURIComponent(callbackName);
    document.documentElement.appendChild(script);
  });
}
