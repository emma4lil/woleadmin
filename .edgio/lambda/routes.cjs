var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@edgio/core/constants.js
var require_constants = __commonJS({
  "node_modules/@edgio/core/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FAR_FUTURE_TTL = exports2.DEFLATE_ENCODING = exports2.GZIP_ENCODING = exports2.BROTLI_ENCODING = exports2.IS_BROWSER = exports2.EDGIO_IMAGE_OPTIMIZER_PATH = exports2.HOSTS_NOINDEX_PERMALINK_REGEX = exports2.ROUTES_NOINDEX_GROUP = exports2.ROUTES_CATCH_GROUP = exports2.ROUTES_FALLBACK = exports2.METHOD_QUERY_PARAM = exports2.POST_BODY_QUERY_PARAM = exports2.HEAD_QUERY_PARAM = exports2.DEVTOOLS_PREFETCH_QUERY_PARAM = exports2.PREFETCH_TTL_PARAM = exports2.PREFETCH_QUERY_PARAM = exports2.THROTTLED_QUERY_PARAM = exports2.CACHING_DEBUG_CACHEABLE = exports2.CACHING_DEBUG_STATUS = exports2.CACHING_DEBUG_HEADERS = exports2.CACHEABLE_METHODS = exports2.CACHING_STATUS = exports2.HTTP_HEADERS = exports2.HTTP_METHODS = exports2.JS_BACKEND_HOSTNAME = exports2.BACKENDS = exports2.ACTIONS = exports2.EDGIO_UNCACHED_PREFETCH_STATUS = exports2.EDGIO_TOO_MANY_HEADERS_STATUS_CODE = exports2.EDGIO_MAX_USER_HEADERS_ALLOWED = exports2.EDGIO_SERVERLESS_HINTS = exports2.EDGIO_SERVERLESS_HINT_HEADER = exports2.EDGIO_HEADERS_PREFIX = exports2.EDGIO_DEPLOYMENT_TYPE_AWS = exports2.EDGIO_EDGE_FUNCTION_ENV_VARIABLES = exports2.EDGIO_ENV_VARIABLES = exports2.EDGIO_ASSET_ALIASES_FILE = exports2.EDGIO_CONFIG_FILE = void 0;
    exports2.EDGIO_CONFIG_FILE = "edgio.config.js";
    exports2.EDGIO_ASSET_ALIASES_FILE = "asset-aliases.json";
    exports2.EDGIO_ENV_VARIABLES = {
      config: "EDGIO_CONFIG",
      internalConfig: "EDGIO_INTERNAL_CONFIG",
      deploymentType: "EDGIO_DEPLOYMENT_TYPE",
      versionOverride: "EDGIO_VERSION_OVERRIDE",
      productionBuild: "EDGIO_PRODUCTION_BUILD",
      local: "EDGIO_LOCAL",
      cache: "EDGIO_CACHE"
    };
    exports2.EDGIO_EDGE_FUNCTION_ENV_VARIABLES = {
      path: "__EDGE_FUNCTION_PATH__",
      quickjsBytecodeBase64: "__EDGE_FUNCTION_QUICKJS_BYTECODE_BASE64__"
    };
    exports2.EDGIO_DEPLOYMENT_TYPE_AWS = "AWS";
    exports2.EDGIO_HEADERS_PREFIX = "x-edg-";
    exports2.EDGIO_SERVERLESS_HINT_HEADER = "x-edg-serverless-hint";
    exports2.EDGIO_SERVERLESS_HINTS = {
      app: "app",
      compute: "compute",
      redirect: "redirect",
      proxy: "proxy"
    };
    exports2.EDGIO_MAX_USER_HEADERS_ALLOWED = 70;
    exports2.EDGIO_TOO_MANY_HEADERS_STATUS_CODE = 542;
    exports2.EDGIO_UNCACHED_PREFETCH_STATUS = 412;
    exports2.ACTIONS = {
      setHeader: "set-header",
      updateHeader: "update-header",
      removeHeader: "remove-header",
      syntheticRes: "synthetic-response",
      updatePath: "update-path",
      proxy: "proxy",
      addCookie: "add-cookie",
      updateCookie: "update-cookie",
      removeCookie: "remove-cookie"
    };
    exports2.BACKENDS = {
      js: "__js__",
      static: "__static__",
      permanentStatic: "__permanent_static__",
      imageOptimizer: "__image_optimizer__"
    };
    exports2.JS_BACKEND_HOSTNAME = "127.0.0.1";
    exports2.HTTP_METHODS = {
      head: "head",
      get: "get",
      post: "post",
      delete: "delete",
      put: "put",
      patch: "patch",
      options: "options"
    };
    exports2.HTTP_HEADERS = {
      acceptEncoding: "accept-encoding",
      authorization: "authorization",
      cacheControl: "cache-control",
      contentEncoding: "content-encoding",
      contentLength: "content-length",
      contentType: "content-type",
      cookie: "cookie",
      expires: "expires",
      host: "host",
      location: "location",
      range: "range",
      serverTiming: "server-timing",
      setCookie: "set-cookie",
      userAgent: "user-agent",
      vary: "vary",
      via: "via",
      transferEncoding: "transfer-encoding",
      xEcDebug: "x-ec-debug",
      xForwardedFor: "x-forwarded-for",
      xRequestId: "x-request-id",
      xSwCacheControl: "x-sw-cache-control",
      xEdgeBrowser: "x-edg-browser",
      xEdgeCacheControl: "x-edg-cache-control",
      xEdgeCachingStatus: "x-edg-caching-status",
      xEdgeClientIp: "x-edg-client-ip",
      xEdgeComponents: "x-edg-components",
      xEdgeDestination: "x-edg-destination",
      xEdgeDevice: "x-edg-device",
      xEdgeDeviceIsBot: "x-edg-device-is-bot",
      xEdgeGeoCity: "x-edg-geo-city",
      xEdgeGeoCountryCode: "x-edg-geo-country-code",
      xEdgeGeoLatitude: "x-edg-geo-latitude",
      xEdgeGeoLongitude: "x-edg-geo-longitude",
      xEdgeGeoPostalCode: "x-edg-geo-postal-code",
      xEdgeMatchedRoutes: "x-edg-matched-routes",
      xEdgeProtocol: "x-edg-protocol",
      xEdgeRoute: "x-edg-route",
      xEdgeStatus: "x-edg-status",
      xEdgeSurrogateKey: "x-edg-surrogate-key",
      xEdgeT: "x-edg-t",
      xEdgeUserT: "x-edg-user-t",
      xEdgeVendor: "x-edg-vendor",
      xEdgeVersion: "x-edg-version",
      xEdgServerlessError: "x-edg-serverless-error",
      x0ClientIp: "x-0-client-ip",
      x0Protocol: "x-0-protocol",
      x0Version: "x-0-version"
    };
    exports2.CACHING_STATUS = {
      cached: "cached",
      hit: "hit",
      bypassed: "bypassed",
      private: "private",
      method: "method",
      bodyTooBig: "body-too-big",
      code: "code",
      setCookie: "set-cookie",
      noMaxAge: "no-max-age"
    };
    exports2.CACHEABLE_METHODS = /* @__PURE__ */ new Set(["get", "head"]);
    exports2.CACHING_DEBUG_HEADERS = {
      cache: "x-ec-cache",
      checkCacheable: "x-ec-check-cacheable",
      cacheState: "x-ec-cache-state",
      cacheKey: "x-ec-cache-key"
    };
    exports2.CACHING_DEBUG_STATUS = {
      configNoCache: "CONFIG_NOCACHE",
      none: "NONE",
      tcpClientRefreshMiss: "TCP_CLIENT_REFRESH_MISS",
      tcpExpiredHit: "TCP_EXPIRED_HIT",
      tcpExpiredMiss: "TCP_EXPIRED_MISS",
      tcpHit: "TCP_HIT",
      tcpMiss: "TCP_MISS",
      tcpPartialHit: "TCP_PARTIAL_HIT",
      uncacheable: "UNCACHEABLE"
    };
    exports2.CACHING_DEBUG_CACHEABLE = {
      yes: "YES",
      no: "NO"
    };
    exports2.THROTTLED_QUERY_PARAM = "edgio_prefetch";
    exports2.PREFETCH_QUERY_PARAM = exports2.THROTTLED_QUERY_PARAM;
    exports2.PREFETCH_TTL_PARAM = "edgio_prefetch_ttl";
    exports2.DEVTOOLS_PREFETCH_QUERY_PARAM = "edgio_dt_pf";
    exports2.HEAD_QUERY_PARAM = "edgio_head";
    exports2.POST_BODY_QUERY_PARAM = "pref_edgio_body";
    exports2.METHOD_QUERY_PARAM = "pref_edgio_method";
    exports2.ROUTES_FALLBACK = "fallback";
    exports2.ROUTES_CATCH_GROUP = "catch";
    exports2.ROUTES_NOINDEX_GROUP = "noindex";
    exports2.HOSTS_NOINDEX_PERMALINK_REGEX = /\.edgio\.link|\.edgio-perma\.link/;
    exports2.EDGIO_IMAGE_OPTIMIZER_PATH = "/__layer0_image_optimizer";
    exports2.IS_BROWSER = typeof window !== "undefined";
    exports2.BROTLI_ENCODING = "br";
    exports2.GZIP_ENCODING = "gzip";
    exports2.DEFLATE_ENCODING = "deflate";
    exports2.FAR_FUTURE_TTL = "1y";
  }
});

// node_modules/@edgio/core/environment.js
var require_environment = __commonJS({
  "node_modules/@edgio/core/environment.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isBrowser = exports2.isEdgioRunDev = exports2.isProductionBuild = exports2.isLocal = exports2.isCloud = void 0;
    var constants_1 = require_constants();
    function isCloud() {
      return process.env[constants_1.EDGIO_ENV_VARIABLES.deploymentType] === constants_1.EDGIO_DEPLOYMENT_TYPE_AWS;
    }
    exports2.isCloud = isCloud;
    function isLocal() {
      return process.env[constants_1.EDGIO_ENV_VARIABLES.local] === "true";
    }
    exports2.isLocal = isLocal;
    function isProductionBuild() {
      return process.env.NODE_ENV === "production" || process.env[constants_1.EDGIO_ENV_VARIABLES.productionBuild] === "true";
    }
    exports2.isProductionBuild = isProductionBuild;
    function isEdgioRunDev() {
      return !isCloud() && !isProductionBuild();
    }
    exports2.isEdgioRunDev = isEdgioRunDev;
    function isBrowser() {
      return typeof window !== "undefined";
    }
    exports2.isBrowser = isBrowser;
  }
});

// node_modules/@edgio/devtools/addBuiltInRoutes.js
var require_addBuiltInRoutes = __commonJS({
  "node_modules/@edgio/devtools/addBuiltInRoutes.js"(exports2, module2) {
    var path = require("path");
    var FAR_FUTURE_TTL = 60 * 60 * 24 * 365 * 10;
    var PUBLIC_CACHE_CONFIG = {
      edge: {
        maxAgeSeconds: FAR_FUTURE_TTL
      },
      browser: false
    };
    var EDGIO_DEVTOOLS_ENABLED_COOKIE = "edgio_devtools_enabled";
    var EDGIO_DEVTOOLS_ENV_ENABLED_COOKIE = "edgio_devtools_env_enabled";
    function isDevtoolEnabledByDefault() {
      if (process.env.EDGIO_DEVTOOLS_ENABLED) {
        return process.env.EDGIO_DEVTOOLS_ENABLED === "true";
      }
      if (process.env.PREVIEW_EDGIO_DEVTOOLS_ENABLED) {
        return process.env.PREVIEW_EDGIO_DEVTOOLS_ENABLED === "true";
      }
      return null;
    }
    module2.exports = function addBuiltInRoutes({ router, local }) {
      if (isDevtoolEnabledByDefault() !== null) {
        router.match("/(.*)", ({ addResponseCookie }) => {
          addResponseCookie(EDGIO_DEVTOOLS_ENV_ENABLED_COOKIE, `${isDevtoolEnabledByDefault()}; Path=/`);
        });
      }
      if (local) {
        router.get("/__edgio__/caching", ({ send }) => {
          send(JSON.stringify({ local, enabled: process.env.EDGIO_CACHE === "true" }));
        }).post("/__edgio__/caching", ({ compute, send }) => {
          compute((req) => {
            if (req.query) {
              process.env.EDGIO_CACHE = req.query.enabled;
            }
          });
          send("done");
        });
      }
      router.match("/__edgio__/devtools/:path*", ({ cache, serveStatic }) => {
        cache(PUBLIC_CACHE_CONFIG);
        serveStatic(path.join("node_modules", "@edgio", "devtools", "widget", ":path*"));
      }).get("/__edgio__/devtools/enable", ({ redirect, addResponseCookie, cache }) => {
        addResponseCookie(EDGIO_DEVTOOLS_ENABLED_COOKIE, "true; Path=/");
        cache({
          browser: false,
          edge: false
        });
        redirect("/");
      }).get("/__edgio__/devtools/disable", ({ redirect, addResponseCookie, cache }) => {
        addResponseCookie(EDGIO_DEVTOOLS_ENABLED_COOKIE, "false; Path=/");
        cache({
          browser: false,
          edge: false
        });
        redirect("/");
      }).match("/:path*", {
        headers: {
          debug_header: true
        }
      });
    };
  }
});

// node_modules/@edgio/core/router/addBuildInRoutes.js
var require_addBuildInRoutes = __commonJS({
  "node_modules/@edgio/core/router/addBuildInRoutes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var environment_1 = require_environment();
    var constants_1 = require_constants();
    function addBuiltInRoutes(router) {
      try {
        require_addBuiltInRoutes()({
          router,
          local: (0, environment_1.isLocal)()
        });
      } catch (e) {
        if (e.code !== "MODULE_NOT_FOUND") {
          throw e;
        }
      }
      if (!router.routerOptions.indexPermalink) {
        router.match({
          headers: {
            host: constants_1.HOSTS_NOINDEX_PERMALINK_REGEX
          }
        }, {
          headers: {
            add_response_headers: {
              "x-robots-tag": "nofollow, noindex"
            }
          }
        });
      }
    }
    exports2.default = addBuiltInRoutes;
  }
});

// node_modules/@edgio/core/router/EdgioRoutes.js
var require_EdgioRoutes = __commonJS({
  "node_modules/@edgio/core/router/EdgioRoutes.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var addBuildInRoutes_1 = __importDefault2(require_addBuildInRoutes());
    var EdgioRoutes = class {
      onRegister(router) {
        (0, addBuildInRoutes_1.default)(router);
      }
    };
    exports2.default = EdgioRoutes;
  }
});

// node_modules/path-to-regexp/dist/index.js
var require_dist = __commonJS({
  "node_modules/path-to-regexp/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.pathToRegexp = exports2.tokensToRegexp = exports2.regexpToFunction = exports2.match = exports2.tokensToFunction = exports2.compile = exports2.parse = void 0;
    function lexer(str) {
      var tokens = [];
      var i = 0;
      while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
          tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
          continue;
        }
        if (char === "\\") {
          tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
          continue;
        }
        if (char === "{") {
          tokens.push({ type: "OPEN", index: i, value: str[i++] });
          continue;
        }
        if (char === "}") {
          tokens.push({ type: "CLOSE", index: i, value: str[i++] });
          continue;
        }
        if (char === ":") {
          var name = "";
          var j = i + 1;
          while (j < str.length) {
            var code = str.charCodeAt(j);
            if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
              name += str[j++];
              continue;
            }
            break;
          }
          if (!name)
            throw new TypeError("Missing parameter name at ".concat(i));
          tokens.push({ type: "NAME", index: i, value: name });
          i = j;
          continue;
        }
        if (char === "(") {
          var count = 1;
          var pattern = "";
          var j = i + 1;
          if (str[j] === "?") {
            throw new TypeError('Pattern cannot start with "?" at '.concat(j));
          }
          while (j < str.length) {
            if (str[j] === "\\") {
              pattern += str[j++] + str[j++];
              continue;
            }
            if (str[j] === ")") {
              count--;
              if (count === 0) {
                j++;
                break;
              }
            } else if (str[j] === "(") {
              count++;
              if (str[j + 1] !== "?") {
                throw new TypeError("Capturing groups are not allowed at ".concat(j));
              }
            }
            pattern += str[j++];
          }
          if (count)
            throw new TypeError("Unbalanced pattern at ".concat(i));
          if (!pattern)
            throw new TypeError("Missing pattern at ".concat(i));
          tokens.push({ type: "PATTERN", index: i, value: pattern });
          i = j;
          continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
      }
      tokens.push({ type: "END", index: i, value: "" });
      return tokens;
    }
    function parse(str, options) {
      if (options === void 0) {
        options = {};
      }
      var tokens = lexer(str);
      var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
      var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
      var result = [];
      var key = 0;
      var i = 0;
      var path = "";
      var tryConsume = function(type) {
        if (i < tokens.length && tokens[i].type === type)
          return tokens[i++].value;
      };
      var mustConsume = function(type) {
        var value2 = tryConsume(type);
        if (value2 !== void 0)
          return value2;
        var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
      };
      var consumeText = function() {
        var result2 = "";
        var value2;
        while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
          result2 += value2;
        }
        return result2;
      };
      while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
          var prefix = char || "";
          if (prefixes.indexOf(prefix) === -1) {
            path += prefix;
            prefix = "";
          }
          if (path) {
            result.push(path);
            path = "";
          }
          result.push({
            name: name || key++,
            prefix,
            suffix: "",
            pattern: pattern || defaultPattern,
            modifier: tryConsume("MODIFIER") || ""
          });
          continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
          path += value;
          continue;
        }
        if (path) {
          result.push(path);
          path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
          var prefix = consumeText();
          var name_1 = tryConsume("NAME") || "";
          var pattern_1 = tryConsume("PATTERN") || "";
          var suffix = consumeText();
          mustConsume("CLOSE");
          result.push({
            name: name_1 || (pattern_1 ? key++ : ""),
            pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
            prefix,
            suffix,
            modifier: tryConsume("MODIFIER") || ""
          });
          continue;
        }
        mustConsume("END");
      }
      return result;
    }
    exports2.parse = parse;
    function compile(str, options) {
      return tokensToFunction(parse(str, options), options);
    }
    exports2.compile = compile;
    function tokensToFunction(tokens, options) {
      if (options === void 0) {
        options = {};
      }
      var reFlags = flags(options);
      var _a = options.encode, encode = _a === void 0 ? function(x) {
        return x;
      } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
      var matches = tokens.map(function(token) {
        if (typeof token === "object") {
          return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
      });
      return function(data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];
          if (typeof token === "string") {
            path += token;
            continue;
          }
          var value = data ? data[token.name] : void 0;
          var optional = token.modifier === "?" || token.modifier === "*";
          var repeat = token.modifier === "*" || token.modifier === "+";
          if (Array.isArray(value)) {
            if (!repeat) {
              throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
            }
            if (value.length === 0) {
              if (optional)
                continue;
              throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
            }
            for (var j = 0; j < value.length; j++) {
              var segment = encode(value[j], token);
              if (validate && !matches[i].test(segment)) {
                throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
              }
              path += token.prefix + segment + token.suffix;
            }
            continue;
          }
          if (typeof value === "string" || typeof value === "number") {
            var segment = encode(String(value), token);
            if (validate && !matches[i].test(segment)) {
              throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
            }
            path += token.prefix + segment + token.suffix;
            continue;
          }
          if (optional)
            continue;
          var typeOfMessage = repeat ? "an array" : "a string";
          throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
        }
        return path;
      };
    }
    exports2.tokensToFunction = tokensToFunction;
    function match(str, options) {
      var keys = [];
      var re = pathToRegexp(str, keys, options);
      return regexpToFunction(re, keys, options);
    }
    exports2.match = match;
    function regexpToFunction(re, keys, options) {
      if (options === void 0) {
        options = {};
      }
      var _a = options.decode, decode = _a === void 0 ? function(x) {
        return x;
      } : _a;
      return function(pathname) {
        var m = re.exec(pathname);
        if (!m)
          return false;
        var path = m[0], index = m.index;
        var params = /* @__PURE__ */ Object.create(null);
        var _loop_1 = function(i2) {
          if (m[i2] === void 0)
            return "continue";
          var key = keys[i2 - 1];
          if (key.modifier === "*" || key.modifier === "+") {
            params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
              return decode(value, key);
            });
          } else {
            params[key.name] = decode(m[i2], key);
          }
        };
        for (var i = 1; i < m.length; i++) {
          _loop_1(i);
        }
        return { path, index, params };
      };
    }
    exports2.regexpToFunction = regexpToFunction;
    function escapeString(str) {
      return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    }
    function flags(options) {
      return options && options.sensitive ? "" : "i";
    }
    function regexpToRegexp(path, keys) {
      if (!keys)
        return path;
      var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
      var index = 0;
      var execResult = groupsRegex.exec(path.source);
      while (execResult) {
        keys.push({
          name: execResult[1] || index++,
          prefix: "",
          suffix: "",
          modifier: "",
          pattern: ""
        });
        execResult = groupsRegex.exec(path.source);
      }
      return path;
    }
    function arrayToRegexp(paths, keys, options) {
      var parts = paths.map(function(path) {
        return pathToRegexp(path, keys, options).source;
      });
      return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
    }
    function stringToRegexp(path, keys, options) {
      return tokensToRegexp(parse(path, options), keys, options);
    }
    function tokensToRegexp(tokens, keys, options) {
      if (options === void 0) {
        options = {};
      }
      var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
        return x;
      } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
      var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
      var delimiterRe = "[".concat(escapeString(delimiter), "]");
      var route = start ? "^" : "";
      for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === "string") {
          route += escapeString(encode(token));
        } else {
          var prefix = escapeString(encode(token.prefix));
          var suffix = escapeString(encode(token.suffix));
          if (token.pattern) {
            if (keys)
              keys.push(token);
            if (prefix || suffix) {
              if (token.modifier === "+" || token.modifier === "*") {
                var mod = token.modifier === "*" ? "?" : "";
                route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
              } else {
                route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
              }
            } else {
              if (token.modifier === "+" || token.modifier === "*") {
                route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
              } else {
                route += "(".concat(token.pattern, ")").concat(token.modifier);
              }
            }
          } else {
            route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
          }
        }
      }
      if (end) {
        if (!strict)
          route += "".concat(delimiterRe, "?");
        route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
      } else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
        if (!strict) {
          route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
        }
        if (!isEndDelimited) {
          route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
        }
      }
      return new RegExp(route, flags(options));
    }
    exports2.tokensToRegexp = tokensToRegexp;
    function pathToRegexp(path, keys, options) {
      if (path instanceof RegExp)
        return regexpToRegexp(path, keys);
      if (Array.isArray(path))
        return arrayToRegexp(path, keys, options);
      return stringToRegexp(path, keys, options);
    }
    exports2.pathToRegexp = pathToRegexp;
  }
});

// node_modules/@edgio/core/utils/regexUtils.js
var require_regexUtils = __commonJS({
  "node_modules/@edgio/core/utils/regexUtils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.bindRegexParams = exports2.substituteParams = void 0;
    function substituteParams(regex, source, destination) {
      return bindRegexParams(destination, regex.exec(source) || []);
    }
    exports2.substituteParams = substituteParams;
    function bindRegexParams(destination, params) {
      var _a;
      return ((_a = destination.match(/(\\?)(\$[0-9]*)/g)) === null || _a === void 0 ? void 0 : _a.reduce((output, substitutionParam) => {
        if (substitutionParam.startsWith("\\"))
          return output;
        const index = parseInt(substitutionParam.substring(1));
        return output.replace(substitutionParam, params[index] || "");
      }, destination)) || destination;
    }
    exports2.bindRegexParams = bindRegexParams;
  }
});

// node_modules/@edgio/core/utils/bindParams.js
var require_bindParams = __commonJS({
  "node_modules/@edgio/core/utils/bindParams.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var regexUtils_1 = require_regexUtils();
    exports2.default = (path, params) => {
      let p = path;
      if (/(^|[^$]){/.test(path)) {
        throw new Error(`{variable} syntax in the path option is no longer supported, use :variable instead (${path})`);
      }
      for (let paramName in params) {
        let value = params[paramName];
        if (Array.isArray(value)) {
          value = value.join("/");
        }
        const pattern = new RegExp(`:${paramName}(\\([^)]*\\))?[?*+]?`, "g");
        const replacement = value === void 0 ? "" : value;
        p = p.replace(pattern, replacement.replace(/\$/g, "$$$"));
      }
      p = p.replace(/:\w+(\*|\+|\?)?/, "");
      p = p.replace("\\?", "?");
      p = p.replace(/\/+/g, "/").replace(/^([^:]+:)\//gi, "$1//");
      p = (params === null || params === void 0 ? void 0 : params.$) ? (0, regexUtils_1.bindRegexParams)(p, params.$) : p;
      return p;
    };
  }
});

// node_modules/@edgio/core/utils/regExpEscape.js
var require_regExpEscape = __commonJS({
  "node_modules/@edgio/core/utils/regExpEscape.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toRegExp = void 0;
    function regExpEscape(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    exports2.default = regExpEscape;
    function toRegExp(string) {
      return new RegExp(regExpEscape(string));
    }
    exports2.toRegExp = toRegExp;
  }
});

// node_modules/@edgio/core/utils/toEdgeRegex.js
var require_toEdgeRegex = __commonJS({
  "node_modules/@edgio/core/utils/toEdgeRegex.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fromEdgeRegex = void 0;
    var regExpEscape_1 = __importDefault2(require_regExpEscape());
    function toEdgeRegex(regex, prefix = "") {
      let source = `${regex.source.slice(0).replace(/\\\//g, "/")}`;
      if (source.startsWith("^")) {
        source = `^${(0, regExpEscape_1.default)(prefix)}${source.slice(1)}`;
      } else {
        source = `${(0, regExpEscape_1.default)(prefix)}${source}`;
      }
      return `${regex.ignoreCase ? "(?i)" : ""}${source}`;
    }
    exports2.default = toEdgeRegex;
    function fromEdgeRegex(edgeRegex) {
      const ignoreCase = edgeRegex.indexOf("(?i)") === 0;
      if (ignoreCase) {
        edgeRegex = edgeRegex.slice("(?i)".length);
      }
      return new RegExp(edgeRegex.replace(/\//g, "/"), ignoreCase ? "i" : "");
    }
    exports2.fromEdgeRegex = fromEdgeRegex;
  }
});

// node_modules/@edgio/core/runtime/toRegExp.js
var require_toRegExp = __commonJS({
  "node_modules/@edgio/core/runtime/toRegExp.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function toRegExp(pattern, flags = "g") {
      if (pattern.startsWith("(?i)")) {
        pattern = pattern.substring(4);
        flags += "i";
      }
      return new RegExp(pattern, flags);
    }
    exports2.default = toRegExp;
  }
});

// node_modules/@edgio/core/router/path.js
var require_path = __commonJS({
  "node_modules/@edgio/core/router/path.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.nameParamsToIndex = exports2.getBackReferences = exports2.mapURL = exports2.rewritePath = exports2.pathToRegex = void 0;
    var path_to_regexp_1 = require_dist();
    var bindParams_1 = __importDefault2(require_bindParams());
    var toEdgeRegex_1 = __importDefault2(require_toEdgeRegex());
    var toRegExp_1 = __importDefault2(require_toRegExp());
    function pathToRegex(path) {
      let prefix = "";
      const protocolRegex = /^[a-z]+:\/\//i;
      const matches = protocolRegex.exec(path);
      if (matches) {
        prefix = matches[0];
      }
      const pathPart = path.substring(prefix.length);
      return (0, toEdgeRegex_1.default)((0, path_to_regexp_1.pathToRegexp)(pathPart), prefix);
    }
    exports2.pathToRegex = pathToRegex;
    function rewritePath(sourcePath, destPath, skipQuery) {
      if (sourcePath == null)
        return { destination: destPath };
      return {
        source: `${sourcePath}:optionalSlash(\\/?)?:optionalQuery(\\?.*)?`,
        syntax: "path-to-regexp",
        destination: `${destPath}${skipQuery ? "" : ":optionalSlash:optionalQuery"}`
      };
    }
    exports2.rewritePath = rewritePath;
    function mapURL(url, source, destination, syntax) {
      let targetSource;
      let targetDest = destination;
      if (!source)
        return targetDest;
      if (syntax === "regexp") {
        targetSource = (0, toRegExp_1.default)(source, "");
      } else {
        targetSource = (0, path_to_regexp_1.pathToRegexp)(source);
        targetDest = (0, bindParams_1.default)(destination, getBackReferences(source));
      }
      if (!url.match(targetSource))
        return null;
      return url.replace(targetSource, targetDest);
    }
    exports2.mapURL = mapURL;
    function getBackReferences(path) {
      const absolutePathMatch = path.match(/https?:\/\/[^/]+(.*)/);
      if (absolutePathMatch) {
        path = `/${absolutePathMatch[1]}`;
      }
      let backReferenceCounter = 1;
      const references = {};
      (0, path_to_regexp_1.parse)(path).forEach((token) => {
        if (typeof token !== "string") {
          references[token.name] = `$${backReferenceCounter++}`;
        }
      });
      return references;
    }
    exports2.getBackReferences = getBackReferences;
    function nameParamsToIndex(source, destination) {
      const backReferences = getBackReferences(source);
      const matches = [
        ...destination.matchAll(/:(.[a-z_-]+)[+|*]/g),
        ...destination.matchAll(/:(.[a-z_-]+)/g)
      ];
      matches.forEach((match) => {
        if (!Object.keys(backReferences).includes(match[1]))
          return;
        const index = Object.keys(backReferences).indexOf(match[1]);
        destination = destination.replace(match[0], `$${index}`);
      });
      return destination;
    }
    exports2.nameParamsToIndex = nameParamsToIndex;
  }
});

// node_modules/@edgio/core/origins.js
var require_origins = __commonJS({
  "node_modules/@edgio/core/origins.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createImageOptimizerOrigin = exports2.createServerlessOrigin = exports2.createPermanentStaticOrigin = exports2.createStaticOrigin = exports2.getPathPrefix = exports2.getEdgioOrigins = exports2.IMAGE_OPTIMIZER_ORIGIN_NAME = exports2.SERVERLESS_ORIGIN_NAME = exports2.PERMANENT_STATIC_ORIGIN_NAME = exports2.STATIC_ORIGIN_NAME = void 0;
    var constants_1 = require_constants();
    var environment_1 = require_environment();
    exports2.STATIC_ORIGIN_NAME = "edgio_static";
    exports2.PERMANENT_STATIC_ORIGIN_NAME = "edgio_permanent_static";
    exports2.SERVERLESS_ORIGIN_NAME = "edgio_serverless";
    exports2.IMAGE_OPTIMIZER_ORIGIN_NAME = "edgio_image_optimizer";
    var internalConfig = process.env[constants_1.EDGIO_ENV_VARIABLES.internalConfig] ? JSON.parse(process.env[constants_1.EDGIO_ENV_VARIABLES.internalConfig] || "{}") : {};
    var getOriginFromConfig = (name) => {
      var _a, _b;
      const origin = (_a = internalConfig === null || internalConfig === void 0 ? void 0 : internalConfig.origins) === null || _a === void 0 ? void 0 : _a.find((origin2) => origin2.name === name);
      if (origin) {
        for (let host of origin.hosts) {
          delete host.path_prefix;
        }
        return {
          ...origin,
          tls_verify: {
            use_sni: true,
            sni_hint_and_strict_san_check: (_b = origin === null || origin === void 0 ? void 0 : origin.hosts.find((host) => host === null || host === void 0 ? void 0 : host.location)) === null || _b === void 0 ? void 0 : _b.location
          }
        };
      }
      return origin;
    };
    function getEdgioOrigins(forEdgeControl = false) {
      return [
        createStaticOrigin(),
        createPermanentStaticOrigin(),
        createServerlessOrigin(forEdgeControl),
        createImageOptimizerOrigin()
      ];
    }
    exports2.getEdgioOrigins = getEdgioOrigins;
    function getPathPrefix(origin) {
      var _a, _b, _c;
      return ((_c = (_b = (_a = internalConfig === null || internalConfig === void 0 ? void 0 : internalConfig.origins) === null || _a === void 0 ? void 0 : _a.find((o) => o.name === origin)) === null || _b === void 0 ? void 0 : _b.hosts[0]) === null || _c === void 0 ? void 0 : _c.path_prefix) || "";
    }
    exports2.getPathPrefix = getPathPrefix;
    function createStaticOrigin() {
      return getOriginFromConfig(exports2.STATIC_ORIGIN_NAME) || {
        name: exports2.STATIC_ORIGIN_NAME,
        hosts: [{ location: "127.0.0.1:3002" }]
      };
    }
    exports2.createStaticOrigin = createStaticOrigin;
    function createPermanentStaticOrigin() {
      return getOriginFromConfig(exports2.PERMANENT_STATIC_ORIGIN_NAME) || {
        name: exports2.PERMANENT_STATIC_ORIGIN_NAME,
        hosts: [{ location: "127.0.0.1:3002" }]
      };
    }
    exports2.createPermanentStaticOrigin = createPermanentStaticOrigin;
    function createServerlessOrigin(forEdgeControl = false) {
      const originFromConfig = forEdgeControl ? getOriginFromConfig(exports2.SERVERLESS_ORIGIN_NAME) : null;
      return originFromConfig || {
        name: exports2.SERVERLESS_ORIGIN_NAME,
        hosts: [{ location: "127.0.0.1:3001" }]
      };
    }
    exports2.createServerlessOrigin = createServerlessOrigin;
    function createImageOptimizerOrigin() {
      var _a;
      const serverlessOriginConfig = getOriginFromConfig(exports2.SERVERLESS_ORIGIN_NAME);
      const optimizerOriginConfig = (0, environment_1.isLocal)() ? {
        hosts: [{ location: "127.0.0.1:3003" }]
      } : {
        ...serverlessOriginConfig,
        override_host_header: (_a = serverlessOriginConfig === null || serverlessOriginConfig === void 0 ? void 0 : serverlessOriginConfig.hosts[0]) === null || _a === void 0 ? void 0 : _a.location
      };
      return {
        ...optimizerOriginConfig,
        name: exports2.IMAGE_OPTIMIZER_ORIGIN_NAME
      };
    }
    exports2.createImageOptimizerOrigin = createImageOptimizerOrigin;
  }
});

// node_modules/@edgio/core/router/RouteCriteria.js
var require_RouteCriteria = __commonJS({
  "node_modules/@edgio/core/router/RouteCriteria.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isNegation = void 0;
    var isNegation = (value) => {
      return !!value && typeof value === "object" && "not" in value;
    };
    exports2.isNegation = isNegation;
  }
});

// node_modules/@edgio/core/router/RedirectOptions.js
var require_RedirectOptions = __commonJS({
  "node_modules/@edgio/core/router/RedirectOptions.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.normalizeRedirectOptions = void 0;
    var url_1 = __importDefault2(require("url"));
    var querystring_1 = __importDefault2(require("querystring"));
    var normalizeRedirectOptions = (to, options) => {
      const { statusCode = 302, query = {} } = typeof options === "number" ? { statusCode: options } : options;
      let toQuery = {};
      const parsedTo = url_1.default.parse(to);
      if (parsedTo === null || parsedTo === void 0 ? void 0 : parsedTo.search) {
        to = to.substr(0, to.length - parsedTo.search.length);
        toQuery = querystring_1.default.parse(parsedTo.query);
      }
      return {
        to,
        statusCode,
        query: {
          ...toQuery,
          ...query
        }
      };
    };
    exports2.normalizeRedirectOptions = normalizeRedirectOptions;
  }
});

// node_modules/@edgio/core/log.js
var require_log = __commonJS({
  "node_modules/@edgio/core/log.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    var LogLevel;
    (function(LogLevel2) {
      LogLevel2[LogLevel2["TRACE"] = 0] = "TRACE";
      LogLevel2[LogLevel2["DEBUG"] = 1] = "DEBUG";
      LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
      LogLevel2[LogLevel2["WARN"] = 3] = "WARN";
      LogLevel2[LogLevel2["ERROR"] = 4] = "ERROR";
    })(LogLevel || (LogLevel = {}));
    var key = (_a = process.env.LOG_LEVEL) === null || _a === void 0 ? void 0 : _a.toUpperCase();
    var configuredLogLevel = key ? LogLevel[key] : null;
    var logger = {
      trace(...params) {
        logger.log(LogLevel.TRACE, ...params);
      },
      debug(...params) {
        logger.log(LogLevel.DEBUG, ...params);
      },
      info(...params) {
        logger.log(LogLevel.INFO, ...params);
      },
      warn(...params) {
        logger.log(LogLevel.WARN, ...params);
      },
      error(...params) {
        logger.log(LogLevel.WARN, ...params);
      },
      log(level, ...params) {
        if (params.length === 1 && typeof params[0] === "function") {
          params = [params[0]()];
        }
        if (configuredLogLevel != null && configuredLogLevel <= level) {
          console.log(`${LogLevel[level].padEnd(5, " ")}`, ...params);
        }
      }
    };
    exports2.default = logger;
  }
});

// node_modules/@edgio/core/errors/BackendFetchError.js
var require_BackendFetchError = __commonJS({
  "node_modules/@edgio/core/errors/BackendFetchError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var BackendFetchError = class extends Error {
      constructor(cause) {
        super(cause.message);
        this.type = "BackendFetchError";
        this.cause = cause;
      }
    };
    exports2.default = BackendFetchError;
  }
});

// node_modules/@edgio/core/runtime/random.js
var require_random = __commonJS({
  "node_modules/@edgio/core/runtime/random.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getRandomInt = exports2.getRandomElement = void 0;
    function getRandomElement(source) {
      const index = getRandomInt(source.length);
      return source[index];
    }
    exports2.getRandomElement = getRandomElement;
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    exports2.getRandomInt = getRandomInt;
  }
});

// node_modules/@edgio/core/utils/mergeQueryString.js
var require_mergeQueryString = __commonJS({
  "node_modules/@edgio/core/utils/mergeQueryString.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var PLACEHOLDER_HOSTNAME = "__";
    function mergeQueryString(requestUrl, targetRedirectOrPath) {
      const requestSearchParams = new URL(requestUrl, `https://${PLACEHOLDER_HOSTNAME}`).searchParams;
      const targetUrl = new URL(targetRedirectOrPath, `https://${PLACEHOLDER_HOSTNAME}`);
      requestSearchParams.forEach((value, key) => {
        if (!targetUrl.searchParams.get(key)) {
          targetUrl.searchParams.set(key, value);
        }
      });
      return targetUrl.hostname === PLACEHOLDER_HOSTNAME ? `${targetUrl.pathname}${targetUrl.search}` : targetUrl.toString();
    }
    exports2.default = mergeQueryString;
  }
});

// node_modules/@edgio/core/runtime/Backend.js
var require_Backend = __commonJS({
  "node_modules/@edgio/core/runtime/Backend.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var url_1 = require("url");
    var http_1 = __importDefault2(require("http"));
    var https_1 = __importDefault2(require("https"));
    var BackendFetchError_1 = __importDefault2(require_BackendFetchError());
    var constants_1 = require_constants();
    var random_1 = require_random();
    var log_1 = __importDefault2(require_log());
    var bindParams_1 = __importDefault2(require_bindParams());
    var mergeQueryString_1 = __importDefault2(require_mergeQueryString());
    var IGNORE_RESPONSE_HEADERS = ["transfer-encoding", "content-length"];
    var Backend = class {
      static setImpl(implementation) {
        impl = implementation;
      }
      static create(config, origin) {
        return new impl(config, origin);
      }
      constructor(config, origin) {
        this.config = config;
        this.origin = origin;
        this.hostHeader = origin.override_host_header;
      }
      async fetch(req, res, options = {}) {
        const url = this.getProxyTarget(req);
        const requestOptions = this.getProxyRequestOptions(url, req, options);
        log_1.default.debug("[Backend]", "fetch", requestOptions);
        return new Promise((resolve, reject) => {
          const lib = url.protocol === "https:" ? https_1.default : http_1.default;
          let metadataApplied = false;
          const upstreamReq = lib.request(requestOptions, (upstreamRes) => {
            const processMetadata = () => {
              if (!metadataApplied) {
                metadataApplied = true;
                Object.entries(upstreamRes.headers).filter(([name]) => !IGNORE_RESPONSE_HEADERS.includes(name.toLowerCase())).forEach(([name, value]) => {
                  try {
                    res.setHeader(name, value);
                  } catch (e) {
                    log_1.default.warn(`Could not relay upstream response header ${name} with value ${value}`, e);
                  }
                });
                res.statusCode = upstreamRes.statusCode;
                res.statusMessage = upstreamRes.statusMessage;
                log_1.default.debug("proxy", `[${res.statusCode} ${res.statusMessage}]`, url);
              }
            };
            upstreamRes.on("data", async (chunk) => {
              try {
                processMetadata();
                await res.write(chunk);
              } catch (e) {
                reject(e);
                upstreamRes.destroy();
              }
            }).on("end", async () => {
              try {
                if (upstreamRes.complete) {
                  processMetadata();
                  await res.end();
                  await res.waitForFlush();
                  resolve();
                }
              } catch (e) {
                reject(e);
                upstreamRes.destroy();
              }
            }).on(
              "error",
              (e) => {
                reject(new BackendFetchError_1.default(e));
              }
            ).on(
              "close",
              () => {
                if (!upstreamRes.complete) {
                  reject(new BackendFetchError_1.default(new Error("The connection was terminated while the message was still being sent")));
                }
              }
            );
          });
          upstreamReq.on("error", (e) => reject(new BackendFetchError_1.default(e)));
          upstreamReq.end(req.rawBody);
        });
      }
      getProxyTarget(req) {
        let location;
        if (Array.isArray(this.config.location)) {
          location = (0, random_1.getRandomElement)(this.config.location);
        } else {
          location = this.config.location;
        }
        if (typeof location === "string") {
          location = { hostname: location };
        }
        const { hostname, port } = location;
        const protocol = hostname.match(/^(127.0.0.1|localhost)(:\d+)?$/) ? "http" : "https";
        const host = `${hostname}${port ? `:${port}` : ""}`;
        const parsed = (0, url_1.parse)(`${protocol}://${host}${req.url}`, true);
        if (req.getHeader(constants_1.HTTP_HEADERS.xEdgeProtocol) === "http") {
          parsed.protocol = "http:";
        }
        return parsed;
      }
      isLocal(url) {
        return url.hostname === constants_1.JS_BACKEND_HOSTNAME;
      }
      getProxyRequestOptions(originUrl, req, options = {}) {
        var _a, _b, _c;
        let agent = null;
        if (((_a = this.origin.tls_verify) === null || _a === void 0 ? void 0 : _a.allow_self_signed_certs) && originUrl.protocol === "https:") {
          agent = new https_1.default.Agent({ rejectUnauthorized: false });
        }
        let pathWithQuery = (_b = originUrl.path) !== null && _b !== void 0 ? _b : "/";
        if (options === null || options === void 0 ? void 0 : options.path) {
          const updatedPathWithQuery = (0, bindParams_1.default)(typeof options.path === "function" ? options.path() || "" : options.path, req.params);
          pathWithQuery = (0, mergeQueryString_1.default)(pathWithQuery !== null && pathWithQuery !== void 0 ? pathWithQuery : "", updatedPathWithQuery);
        }
        if ((options === null || options === void 0 ? void 0 : options.removeEmptySearchParamValues) && originUrl.path) {
          pathWithQuery = pathWithQuery === null || pathWithQuery === void 0 ? void 0 : pathWithQuery.replace(/=(?=&|$)/gm, "");
        }
        const upstreamHeaders = {
          ...req.headers,
          ...(_c = options === null || options === void 0 ? void 0 : options.headers) !== null && _c !== void 0 ? _c : {},
          host: this.hostHeader || originUrl.host
        };
        if (this.isLocal(originUrl)) {
          upstreamHeaders["x-forwarded-proto"] = req.secure ? "https" : "http";
        }
        return {
          ...originUrl,
          path: pathWithQuery,
          method: req.method,
          timeout: this.config.firstByteTimeout || 0,
          agent,
          body: req.rawBody,
          headers: upstreamHeaders
        };
      }
    };
    exports2.default = Backend;
    var impl = Backend;
  }
});

// node_modules/@edgio/core/runtime/Origin.js
var require_Origin = __commonJS({
  "node_modules/@edgio/core/runtime/Origin.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var log_1 = __importDefault2(require_log());
    var Backend_1 = __importDefault2(require_Backend());
    var random_1 = require_random();
    var Origin = class {
      constructor(config) {
        this.config = config;
      }
      async fetch(request, response, options = {}) {
        const hostConfig = this.selectHost();
        const host = Backend_1.default.create(hostConfig, this.config);
        return host.fetch(request, response, options);
      }
      selectHost() {
        const { balancer } = this.config;
        if ("static_weighted" === balancer) {
          return this.config.hosts[0];
        } else if ("round_robin" === balancer) {
          return (0, random_1.getRandomElement)(this.config.hosts);
        } else {
          if (balancer) {
            log_1.default.warn(`balancer type "${balancer}" is not supported during local development, falling back to "static".`);
          }
          return this.config.hosts[0];
        }
      }
    };
    exports2.default = Origin;
  }
});

// node_modules/@edgio/core/runtime/OriginFetcher.js
var require_OriginFetcher = __commonJS({
  "node_modules/@edgio/core/runtime/OriginFetcher.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var Origin_1 = __importDefault2(require_Origin());
    var constants_1 = require_constants();
    var OriginFetcher = class {
      constructor(propertyContext) {
        this.propertyContext = propertyContext;
      }
      async fetch(req, res, options, providedOriginName) {
        options = options || {};
        const originName = providedOriginName || this.propertyContext.getDefaultOrigin(req);
        const originConfig = this.propertyContext.getOrigin(originName);
        if (!originConfig) {
          throw new Error(`No origin was found with id=${originName}.`);
        }
        try {
          await new Origin_1.default(originConfig).fetch(req, res, options);
        } catch (e) {
          console.error(`Error fetching from origin ${originName}`, e);
          convertErrorToResponse(e, res);
        }
        if (res.statusCode === 416 && options.ignoreUnsatisfiableRanges) {
          req.removeHeader(constants_1.HTTP_HEADERS.range);
          res.clear();
          return this.fetch(req, res, options);
        }
      }
      removeSensitiveHeaders(req) {
        req.removeHeader("authorization");
        req.removeHeader("cookie");
      }
    };
    exports2.default = OriginFetcher;
    function convertErrorToResponse(e, res) {
      var _a;
      if (e instanceof Error) {
        res.setHeader(constants_1.HTTP_HEADERS.xEdgServerlessError, e.message);
        if (((_a = e.cause) === null || _a === void 0 ? void 0 : _a.code) === "ETIMEDOUT") {
          res.statusCode = 504;
          res.statusMessage = "Gateway Timeout";
          res.body = "504 - Gateway Timeout";
          return;
        } else {
          res.statusCode = 502;
          res.statusMessage = "Bad Gateway";
          res.body = "502 - Bad Gateway";
          return;
        }
      } else {
        res.setHeader(constants_1.HTTP_HEADERS.xEdgServerlessError, e.toString());
      }
    }
  }
});

// node_modules/@edgio/core/utils/isEmpty.js
var require_isEmpty = __commonJS({
  "node_modules/@edgio/core/utils/isEmpty.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function isEmpty(value) {
      if (!value) {
        return true;
      }
      if (typeof value.length === "number") {
        return !value.length;
      }
      if (typeof value === "object" && Object.keys(value).length) {
        return false;
      }
      return true;
    }
    exports2.default = isEmpty;
  }
});

// node_modules/@edgio/core/router/CacheManifersRegexp.js
var require_CacheManifersRegexp = __commonJS({
  "node_modules/@edgio/core/router/CacheManifersRegexp.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CacheManifestRegexp = void 0;
    var CacheManifestRegexp = class extends RegExp {
      constructor(pattern, flags, isNot) {
        super(pattern, flags);
        this.isNot = isNot;
      }
      test(value) {
        const res = super.test(value);
        return this.isNot === true ? !res : res;
      }
    };
    exports2.CacheManifestRegexp = CacheManifestRegexp;
  }
});

// node_modules/@edgio/core/utils/universalRouteUtils.js
var require_universalRouteUtils = __commonJS({
  "node_modules/@edgio/core/utils/universalRouteUtils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.testRegExp = exports2.paramMatcherToParam = exports2.isParamMatcher = exports2.deepMatchObject = exports2.matchCriteriaRegexObjectWithRequestObject = void 0;
    var CacheManifersRegexp_1 = require_CacheManifersRegexp();
    var identity = (x) => x;
    function matchCriteriaRegexObjectWithRequestObject(criteriaObj, requestObj, criteriaObjKeyNameFn = identity) {
      let params = {};
      return Object.entries(criteriaObj).every(([name, regex]) => {
        const value = requestObj[criteriaObjKeyNameFn(name)];
        if (regex === null) {
          return value === void 0;
        } else if (typeof regex === "string") {
          if (typeof value === "string" && isParamMatcher(regex)) {
            const paramName = paramMatcherToParam(regex);
            params[paramName] = value;
            return true;
          }
          regex = new RegExp(`^${regex}$`, "i");
        }
        return testRegExp(regex, value);
      }) && params;
    }
    exports2.matchCriteriaRegexObjectWithRequestObject = matchCriteriaRegexObjectWithRequestObject;
    function deepMatchObject(source, criteria) {
      return Object.entries(criteria).every(([key, criteriaValue]) => {
        const sourceValue = source[key];
        if (!sourceValue)
          return false;
        if (criteriaValue instanceof RegExp) {
          return testRegExp(criteriaValue, sourceValue);
        } else if (typeof criteriaValue === "object" && criteriaValue !== null) {
          return deepMatchObject(sourceValue, criteriaValue);
        } else {
          return sourceValue == criteriaValue;
        }
      });
    }
    exports2.deepMatchObject = deepMatchObject;
    function isParamMatcher(value) {
      return typeof value === "string" && /^:\w+$/.test(value);
    }
    exports2.isParamMatcher = isParamMatcher;
    function paramMatcherToParam(value) {
      return value.slice(1);
    }
    exports2.paramMatcherToParam = paramMatcherToParam;
    function testRegExp(regexp, value) {
      if (value == null) {
        return false;
      }
      if (regexp.global) {
        regexp = new CacheManifersRegexp_1.CacheManifestRegexp(regexp, regexp.flags, regexp.isNot);
      }
      if (Array.isArray(value)) {
        return value.some((v) => regexp.test(v));
      } else {
        return regexp.test(value);
      }
    }
    exports2.testRegExp = testRegExp;
  }
});

// node_modules/@edgio/core/router/ParamsExtractor.js
var require_ParamsExtractor = __commonJS({
  "node_modules/@edgio/core/router/ParamsExtractor.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var RouteCriteria_1 = require_RouteCriteria();
    var path_to_regexp_1 = require_dist();
    var universalRouteUtils_1 = require_universalRouteUtils();
    var ParamsExtractor = class {
      constructor(routeCriteria) {
        this.routeCriteria = {};
        this.updateRouteCriteria(routeCriteria);
      }
      updateRouteCriteria(routeCriteria) {
        this.routeCriteria = {
          path: routeCriteria === null || routeCriteria === void 0 ? void 0 : routeCriteria.path,
          query: routeCriteria === null || routeCriteria === void 0 ? void 0 : routeCriteria.query
        };
      }
      extract(request) {
        var _a, _b;
        return {
          ...((_a = this.routeCriteria) === null || _a === void 0 ? void 0 : _a.path) && !(0, RouteCriteria_1.isNegation)(this.routeCriteria.path) ? ParamsExtractor.getMatchedPathParams(this.routeCriteria.path, request.path) : {},
          ...((_b = this.routeCriteria) === null || _b === void 0 ? void 0 : _b.query) ? ParamsExtractor.getMatchedQueryParams(this.routeCriteria.query, request.query) : {}
        };
      }
      static getMatchedPathParams(criteriaPath, requestPath) {
        if (criteriaPath instanceof RegExp)
          return {
            $: criteriaPath.exec(requestPath) || []
          };
        if (Array.isArray(criteriaPath))
          return void 0;
        const pathMatcher = (0, path_to_regexp_1.match)(criteriaPath.toString(), { decode: decodeURIComponent });
        const result = pathMatcher(requestPath);
        return result ? result.params : void 0;
      }
      static getMatchedQueryParams(criteriaQuery, requestQuery) {
        let extractedParams = {};
        if (typeof requestQuery !== "object")
          return extractedParams;
        for (const criteriaQueryKey in criteriaQuery) {
          const criteriaQueryValue = criteriaQuery[criteriaQueryKey];
          if (typeof criteriaQueryValue !== "string" || !(0, universalRouteUtils_1.isParamMatcher)(criteriaQueryValue))
            continue;
          const paramName = (0, universalRouteUtils_1.paramMatcherToParam)(criteriaQueryValue);
          extractedParams = {
            ...extractedParams,
            [paramName]: requestQuery[paramName]
          };
        }
        return extractedParams;
      }
    };
    exports2.default = ParamsExtractor;
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports2, module2) {
    "use strict";
    module2.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports2, module2) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/has-proto/index.js
var require_has_proto = __commonJS({
  "node_modules/has-proto/index.js"(exports2, module2) {
    "use strict";
    var test = {
      foo: {}
    };
    var $Object = Object;
    module2.exports = function hasProto() {
      return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
    };
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports2, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            args.concat(slice.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(
            that,
            args.concat(slice.call(arguments))
          );
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports2, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/has/src/index.js
var require_src = __commonJS({
  "node_modules/has/src/index.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    module2.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports2, module2) {
    "use strict";
    var undefined2;
    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError = TypeError;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var hasProto = require_has_proto()();
    var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
      return x.__proto__;
    } : null);
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_src();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var $exec = bind.call(Function.call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module2.exports = function callBind(originalFunction) {
      var func = $reflectApply(bind, $call, arguments);
      if ($gOPD && $defineProperty) {
        var desc = $gOPD(func, "length");
        if (desc.configurable) {
          $defineProperty(
            func,
            "length",
            { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
          );
        }
      }
      return func;
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module2.exports, "apply", { value: applyBind });
    } else {
      module2.exports.apply = applyBind;
    }
  }
});

// node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/call-bind/callBound.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module2.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  }
});

// node_modules/object-inspect/util.inspect.js
var require_util_inspect = __commonJS({
  "node_modules/object-inspect/util.inspect.js"(exports2, module2) {
    module2.exports = require("util").inspect;
  }
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports2, module2) {
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
      return O.__proto__;
    } : null);
    function addNumericSeparator(num, str) {
      if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    var utilInspect = require_util_inspect();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    module2.exports = function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (has(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
          s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
        }
        s += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s += "...";
        }
        s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
          return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
          return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
          mapForEach.call(obj, function(value, key) {
            mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function(value) {
            setParts.push(inspect(value, obj));
          });
        }
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + $join.call(ys, ", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s, defaultStyle, opts) {
      var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
      return quoteChar + s + quoteChar;
    }
    function quote(s) {
      return $replace.call(String(s), /"/g, "&quot;");
    }
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isError(obj) {
      return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isString(obj) {
      return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
      return key in this;
    };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    function toStr(obj) {
      return objectToString.call(obj);
    }
    function nameOf(f) {
      if (f.name) {
        return f.name;
      }
      var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
      if (m) {
        return m[1];
      }
      return null;
    }
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    }
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {
      }
      return false;
    }
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {
      }
      return false;
    }
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {
      }
      return false;
    }
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {
      }
      return false;
    }
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
      }
      var s = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s, "single", opts);
    }
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key)) {
          xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
  }
});

// node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "node_modules/side-channel/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_callBound();
    var inspect = require_object_inspect();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $Map = GetIntrinsic("%Map%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var listGetNode = function(list, key) {
      for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          curr.next = list.next;
          list.next = curr;
          return curr;
        }
      }
    };
    var listGet = function(objects, key) {
      var node = listGetNode(objects, key);
      return node && node.value;
    };
    var listSet = function(objects, key, value) {
      var node = listGetNode(objects, key);
      if (node) {
        node.value = value;
      } else {
        objects.next = {
          key,
          next: objects.next,
          value
        };
      }
    };
    var listHas = function(objects, key) {
      return !!listGetNode(objects, key);
    };
    module2.exports = function getSideChannel() {
      var $wm;
      var $m;
      var $o;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        get: function(key) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if ($wm) {
              return $weakMapGet($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapGet($m, key);
            }
          } else {
            if ($o) {
              return listGet($o, key);
            }
          }
        },
        has: function(key) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if ($wm) {
              return $weakMapHas($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapHas($m, key);
            }
          } else {
            if ($o) {
              return listHas($o, key);
            }
          }
          return false;
        },
        set: function(key, value) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if (!$wm) {
              $wm = new $WeakMap();
            }
            $weakMapSet($wm, key, value);
          } else if ($Map) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key, value);
          } else {
            if (!$o) {
              $o = { key: {}, next: null };
            }
            listSet($o, key, value);
          }
        }
      };
      return channel;
    };
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports2, module2) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module2.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports2, module2) {
    "use strict";
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
      var array = [];
      for (var i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    }();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i) {
          if (has.call(target, i)) {
            var targetItem = target[i];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i] = merge2(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          acc[key] = merge2(acc[key], value, options);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    };
    var decode = function(str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };
    var encode = function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);
        if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
          out += string.charAt(i);
          continue;
        }
        if (c < 128) {
          out = out + hexTable[c];
          continue;
        }
        if (c < 2048) {
          out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
          continue;
        }
        if (c < 55296 || c >= 57344) {
          out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
          continue;
        }
        i += 1;
        c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
        out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
          var key = keys[j];
          var val = obj[key];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a, b) {
      return [].concat(a, b);
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }
        return mapped;
      }
      return fn(val);
    };
    module2.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isRegExp,
      maybeMap,
      merge
    };
  }
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports2, module2) {
    "use strict";
    var getSideChannel = require_side_channel();
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key) {
        return prefix + "[" + key + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray = Array.isArray;
    var split = String.prototype.split;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    };
    var sentinel = {};
    var stringify = function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
      var obj = object;
      var tmpSc = sideChannel;
      var step = 0;
      var findFlag = false;
      while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            findFlag = true;
          }
        }
        if (typeof tmpSc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
          if (generateArrayPrefix === "comma" && encodeValuesOnly) {
            var valuesArray = split.call(String(obj), ",");
            var valuesJoined = "";
            for (var i = 0; i < valuesArray.length; ++i) {
              valuesJoined += (i === 0 ? "" : ",") + formatter(encoder(valuesArray[i], defaults.encoder, charset, "value", format));
            }
            return [formatter(keyValue) + (commaRoundTrip && isArray(obj) && valuesArray.length === 1 ? "[]" : "") + "=" + valuesJoined];
          }
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? prefix + "[]" : prefix;
      for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, key) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + key : "[" + key + "]");
        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify2(
          value,
          keyPrefix,
          generateArrayPrefix,
          commaRoundTrip,
          strictNullHandling,
          skipNulls,
          encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset,
          valueSideChannel
        ));
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module2.exports = function(object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if (opts && "indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = "indices";
      }
      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
      if (opts && "commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      var commaRoundTrip = generateArrayPrefix === "comma" && opts && opts.commaRoundTrip;
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      var sideChannel = getSideChannel();
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (options.skipNulls && obj[key] === null) {
          continue;
        }
        pushToArray(keys, stringify(
          obj[key],
          key,
          generateArrayPrefix,
          commaRoundTrip,
          options.strictNullHandling,
          options.skipNulls,
          options.encode ? options.encoder : null,
          options.filter,
          options.sort,
          options.allowDots,
          options.serializeDate,
          options.format,
          options.formatter,
          options.encodeValuesOnly,
          options.charset,
          sideChannel
        ));
      }
      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function(val, options) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1;
      var i;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf("utf8=") === 0) {
            if (parts[i] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i;
            i = parts.length;
          }
        }
      }
      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key, val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(
            parseArrayValue(part.slice(pos + 1), options),
            function(encodedVal) {
              return options.decoder(encodedVal, defaults.decoder, charset, "value");
            }
          );
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(val);
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (has.call(obj, key)) {
          obj[key] = utils.combine(obj[key], val);
        } else {
          obj[key] = val;
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);
      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === "[]" && options.parseArrays) {
          obj = [].concat(leaf);
        } else {
          obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var index = parseInt(cleanRoot, 10);
          if (!options.parseArrays && cleanRoot === "") {
            obj = { 0: leaf };
          } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
            obj = [];
            obj[index] = leaf;
          } else if (cleanRoot !== "__proto__") {
            obj[cleanRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
      var keys = [];
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(parent);
      }
      var i = 0;
      while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        keys.push("[" + key.slice(segment.index) + "]");
      }
      return parseObject(keys, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      return {
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module2.exports = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
        obj = utils.merge(obj, newObj, options);
      }
      if (options.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
  }
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports2, module2) {
    "use strict";
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// node_modules/@edgio/core/utils/cookieUtils.js
var require_cookieUtils = __commonJS({
  "node_modules/@edgio/core/utils/cookieUtils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.serializeCookie = void 0;
    function serializeCookie(name, value, options = {}) {
      return Object.keys(options).reduce((output, key) => {
        const opt = options[key];
        if (typeof opt === "boolean" && opt)
          return `${output}; ${key}`;
        return `${output}; ${key}=${opt}`;
      }, `${name}=${value}`);
    }
    exports2.serializeCookie = serializeCookie;
  }
});

// node_modules/@edgio/core/router/exact.js
var require_exact = __commonJS({
  "node_modules/@edgio/core/router/exact.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ExactPath = void 0;
    var ExactPath = class {
      constructor(value) {
        this.value = value;
      }
      toString() {
        return this.value;
      }
    };
    exports2.ExactPath = ExactPath;
    function exact(path) {
      return new ExactPath(path);
    }
    exports2.default = exact;
  }
});

// node_modules/@edgio/core/router/converters/toTimeInterval.js
var require_toTimeInterval = __commonJS({
  "node_modules/@edgio/core/router/converters/toTimeInterval.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toTimeInterval = void 0;
    var toTimeInterval = (value) => {
      if (typeof value === "string") {
        return value;
      }
      return `${value}s`;
    };
    exports2.toTimeInterval = toTimeInterval;
  }
});

// node_modules/@edgio/core/router/RouteHelper.js
var require_RouteHelper = __commonJS({
  "node_modules/@edgio/core/router/RouteHelper.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var constants_1 = require_constants();
    var path_1 = require_path();
    var origins_1 = require_origins();
    var RouteCriteria_1 = require_RouteCriteria();
    var constants_2 = require_constants();
    var RedirectOptions_1 = require_RedirectOptions();
    var OriginFetcher_1 = __importDefault2(require_OriginFetcher());
    var isEmpty_1 = __importDefault2(require_isEmpty());
    var bindParams_1 = __importDefault2(require_bindParams());
    var ParamsExtractor_1 = __importDefault2(require_ParamsExtractor());
    var qs_1 = __importDefault2(require_lib());
    var toEdgeRegex_1 = __importDefault2(require_toEdgeRegex());
    var cookieUtils_1 = require_cookieUtils();
    var exact_1 = require_exact();
    var toTimeInterval_1 = require_toTimeInterval();
    var RouteHelper = class {
      constructor(criteria, router) {
        this.features = {};
        this.serviceWorker = (filePath) => {
          this.cache({ edge: { maxAgeSeconds: constants_1.FAR_FUTURE_TTL }, browser: false });
          if (filePath) {
            this.serveStatic(filePath);
          } else {
            this.setOrigin(origins_1.STATIC_ORIGIN_NAME);
            this.rewritePath(void 0, `${(0, origins_1.getPathPrefix)(origins_1.STATIC_ORIGIN_NAME)}/service-worker.js`);
          }
        };
        this.cache = (options) => {
          this.features.caching = this.features.caching || {};
          const { caching } = this.features;
          if (options.edge) {
            if (options.edge.maxAgeSeconds) {
              caching.max_age = (0, toTimeInterval_1.toTimeInterval)(options.edge.maxAgeSeconds);
            }
            if (options.edge.staleWhileRevalidateSeconds) {
              caching.stale_while_revalidate = (0, toTimeInterval_1.toTimeInterval)(options.edge.staleWhileRevalidateSeconds);
            }
            if (options.edge.forcePrivateCaching) {
              caching.ignore_origin_no_cache = [200];
            }
          } else if (options.edge === false) {
            caching.bypass_cache = true;
          }
          if (options && options.cacheableStatusCodes) {
            caching.cacheable_status_codes = options.cacheableStatusCodes;
          }
          if (options && options.enableCachingMethods) {
            caching.enable_caching_for_methods = options.enableCachingMethods;
          }
          if (options.browser) {
            if (options.browser.serviceWorkerSeconds == null && options.browser.maxAgeSeconds == null) {
              throw new Error("The browser cache setting should specify serviceWorkerSeconds or maxAgeSeconds.");
            }
            if (options.browser.serviceWorkerSeconds) {
              this.setResponseHeader(constants_2.HTTP_HEADERS.xSwCacheControl, `max-age=${options.browser.serviceWorkerSeconds}`);
              caching.service_worker_max_age = (0, toTimeInterval_1.toTimeInterval)(options.browser.serviceWorkerSeconds);
            }
            if (options.browser.maxAgeSeconds === 0) {
              caching.bypass_client_cache = true;
            } else if (options.browser.maxAgeSeconds) {
              caching.client_max_age = (0, toTimeInterval_1.toTimeInterval)(options.browser.maxAgeSeconds);
            }
          } else if (options.browser === false) {
            caching.bypass_client_cache = true;
          }
          if (options.key) {
            options.key.applyCaching(this.features);
          }
        };
        this.serveStatic = (path, options = {}) => {
          var _a, _b;
          const { edgeMaxAgeSeconds = constants_1.FAR_FUTURE_TTL, permanent } = options;
          this.cache({ edge: { maxAgeSeconds: edgeMaxAgeSeconds } });
          const origin = permanent ? origins_1.PERMANENT_STATIC_ORIGIN_NAME : origins_1.STATIC_ORIGIN_NAME;
          this.setOrigin(origin);
          const pathPrefix = (0, origins_1.getPathPrefix)(origin);
          path = path.startsWith("/") ? path.slice(1) : path;
          const source = Array.isArray(this.routeCriteria.path) || (0, RouteCriteria_1.isNegation)(this.routeCriteria.path) ? (_a = options.rewritePathSource) !== null && _a !== void 0 ? _a : "/:path*" : (_b = this.routeCriteria.path) !== null && _b !== void 0 ? _b : "/:path*";
          if (options.statusCode) {
            this.setResponseCode(options.statusCode);
          }
          this.rewritePath(source, `${pathPrefix}/${path}`, true);
        };
        this.renderWithApp = () => {
          this.sendToServerless(constants_1.EDGIO_SERVERLESS_HINTS.app);
        };
        this.compute = (fn) => {
          this.sendToServerless(constants_1.EDGIO_SERVERLESS_HINTS.compute, fn);
        };
        this.proxy = (backend, options) => {
          this.setOrigin(backend);
          if ((options === null || options === void 0 ? void 0 : options.transformRequest) || (options === null || options === void 0 ? void 0 : options.transformResponse)) {
            this.sendToServerless(constants_1.EDGIO_SERVERLESS_HINTS.proxy, async (req, res, propertyContext) => {
              const lambdaResponse = res;
              (options === null || options === void 0 ? void 0 : options.transformRequest) && options.transformRequest(req);
              await new OriginFetcher_1.default(propertyContext).fetch(req, res, {
                headers: options === null || options === void 0 ? void 0 : options.headers,
                removeEmptySearchParamValues: options === null || options === void 0 ? void 0 : options.removeEmptySearchParamValues,
                path: options === null || options === void 0 ? void 0 : options.path
              }, backend);
              lambdaResponse.body = Buffer.concat(lambdaResponse.chunks.slice(0, -1));
              if (options === null || options === void 0 ? void 0 : options.transformResponse) {
                options.transformResponse(res, req);
                res.setHeader("Content-Length", lambdaResponse.body.length.toString());
              }
            });
          } else if (options) {
            if (options.path) {
              const destination = typeof options.path === "string" ? options.path : options.path();
              const path = Array.isArray(this.routeCriteria.path) || (0, RouteCriteria_1.isNegation)(this.routeCriteria.path) ? "/:path*" : this.routeCriteria.path;
              if (destination) {
                this.rewritePath(path, destination);
              }
            }
            if (options === null || options === void 0 ? void 0 : options.headers) {
              for (const [key, value] of Object.entries(options.headers)) {
                this.setRequestHeader(key, value);
              }
            }
            if ((options === null || options === void 0 ? void 0 : options.followRedirects) != null) {
              if (!this.features.url)
                this.features.url = {};
              this.features.url.follow_redirects = options === null || options === void 0 ? void 0 : options.followRedirects;
            }
          }
        };
        this.setResponseHeader = (name, value) => {
          if (!this.features.headers) {
            this.features.headers = {};
          }
          if (!this.features.headers.set_response_headers) {
            this.features.headers.set_response_headers = {};
          }
          const headers = this.features.headers.set_response_headers;
          headers[name] = value;
        };
        this.addResponseHeader = (name, value) => {
          if (!this.features.headers) {
            this.features.headers = {};
          }
          if (!this.features.headers.add_response_headers) {
            this.features.headers.add_response_headers = {};
          }
          const headers = this.features.headers.add_response_headers;
          headers[name] = value;
        };
        this.updateResponseHeader = (name, match, replace) => {
          this.setResponseHeader(name, `%{resp_${name}/${match.global ? "/" : ""}${(0, toEdgeRegex_1.default)(match)}/${replace}}`);
        };
        this.removeResponseHeader = (name) => {
          if (!this.features.headers) {
            this.features.headers = {};
          }
          if (!this.features.headers.remove_response_headers) {
            this.features.headers.remove_response_headers = [];
          }
          this.features.headers.remove_response_headers.push(name);
        };
        this.removeUpstreamResponseHeader = (name) => {
          if (!this.features.headers) {
            this.features.headers = {};
          }
          if (!this.features.headers.remove_origin_response_headers) {
            this.features.headers.remove_origin_response_headers = [];
          }
          this.features.headers.remove_origin_response_headers.push(name);
        };
        this.setRequestHeader = (name, value) => {
          if (!this.features.headers) {
            this.features.headers = {};
          }
          if (!this.features.headers.set_request_headers) {
            this.features.headers.set_request_headers = {};
          }
          const headers = this.features.headers.set_request_headers;
          headers[name] = value;
        };
        this.updateRequestHeader = (name, match, replace) => {
          this.setRequestHeader(name, `%{http_${name}/${match.global ? "/" : ""}${(0, toEdgeRegex_1.default)(match)}/${replace}}`);
        };
        this.setResponseBody = (body, code, done) => {
          if (!this.features.response) {
            this.features.response = {};
          }
          this.features.response.set_done = !!done;
          this.features.response.set_response_body = body;
          if (code)
            this.features.response.set_status_code = code;
        };
        this.setResponseCode = (code) => {
          if (!this.features.response) {
            this.features.response = {};
          }
          this.features.response.set_status_code = code;
        };
        this.allowCors = (config = {}) => {
          this.setResponseHeader("Access-Control-Allow-Origin", config.origin || "*");
          if (config.methods) {
            this.setResponseHeader("Access-Control-Allow-Methods", config.methods.join(", "));
          }
          if (config.headers) {
            this.setResponseHeader("Access-Control-Allow-Headers", config.headers.join(", "));
          }
          if (config.maxAge) {
            this.setResponseHeader("Access-Control-Max-Age", config.maxAge.toString());
          }
          if (config.credentials != null) {
            this.setResponseHeader("Access-Control-Allow-Credentials", config.credentials.toString());
          }
        };
        this.rewritePath = (source, destination, skipOptionalQuery) => {
          if (!this.features.url) {
            this.features.url = {};
          }
          if (!this.features.url.url_rewrite) {
            this.features.url.url_rewrite = [];
          }
          if (source instanceof exact_1.ExactPath) {
            source = source.toString();
          }
          if (typeof source === "string") {
            this.features.url.url_rewrite.push((0, path_1.rewritePath)(source, destination, skipOptionalQuery));
          } else {
            this.features.url.url_rewrite.push({
              syntax: "regexp",
              source: source ? (0, toEdgeRegex_1.default)(source) : void 0,
              destination
            });
          }
        };
        this.updatePath = (destination) => {
          var _a;
          this.paramsExtractor.updateRouteCriteria({
            path: destination
          });
          this.rewritePath((_a = this.routeCriteria.path) !== null && _a !== void 0 ? _a : "/:path*", destination);
        };
        this.send = (content, statusCode) => {
          if (typeof content === "function") {
            this.compute(async (req, res) => {
              res.body = content();
              res.statusCode = statusCode;
            });
            return;
          }
          this.setResponseBody(content, statusCode, true);
        };
        this.removeRequestHeader = (name) => {
          this.features.headers = !this.features.headers ? {} : this.features.headers;
          this.features.headers.set_request_headers = !this.features.headers.set_request_headers ? {} : this.features.headers.set_request_headers;
          const headers = this.features.headers.set_request_headers;
          headers[name] = "";
        };
        this.appShell = (indexHtmlPath) => {
          this.setResponseHeader(constants_2.HTTP_HEADERS.contentType, "text/html");
          this.serveStatic(indexHtmlPath);
        };
        this.redirect = (to, options = {}) => {
          var _a, _b, _c, _d, _e, _f;
          const { to: toPath, statusCode, query } = (0, RedirectOptions_1.normalizeRedirectOptions)(to, options);
          const isMatchOnlyQuery = () => {
            var _a2;
            return !Object.values((_a2 = this.routeCriteria.query) !== null && _a2 !== void 0 ? _a2 : {}).find((value) => typeof value === "string" && value.startsWith(":"));
          };
          this.rewritePath("/:path*", "/:path*");
          if ((0, isEmpty_1.default)(query) && isMatchOnlyQuery()) {
            this.features.url = (_a = this.features.url) !== null && _a !== void 0 ? _a : {};
            this.features.url.url_redirect = (_b = this.features.url.url_redirect) !== null && _b !== void 0 ? _b : {};
            this.features.url.url_redirect.code = statusCode;
            if (((_c = this.routeCriteria) === null || _c === void 0 ? void 0 : _c.path) instanceof RegExp) {
              this.features.url.url_redirect.source = (0, toEdgeRegex_1.default)((_d = this.routeCriteria) === null || _d === void 0 ? void 0 : _d.path);
              this.features.url.url_redirect.destination = toPath;
              this.features.url.url_redirect.syntax = "regexp";
              return;
            }
            this.features.url.url_redirect = {
              ...this.features.url.url_redirect,
              ...(0, path_1.rewritePath)((_f = (_e = this.routeCriteria) === null || _e === void 0 ? void 0 : _e.path) === null || _f === void 0 ? void 0 : _f.toString(), toPath, true)
            };
            return;
          }
          this.sendToServerless(constants_1.EDGIO_SERVERLESS_HINTS.redirect, async (req, res) => {
            let queryWithReplacedParams = {};
            for (const queryKey in query) {
              queryWithReplacedParams = {
                ...queryWithReplacedParams,
                [(0, bindParams_1.default)(queryKey, req.params)]: (0, bindParams_1.default)(query[queryKey], req.params)
              };
            }
            res.setHeader(constants_2.HTTP_HEADERS.location, `${(0, bindParams_1.default)(toPath, req.params)}${Object.keys(queryWithReplacedParams).length > 0 ? "?" + qs_1.default.stringify(queryWithReplacedParams) : ""}`);
            res.statusCode = statusCode;
            res.body = "";
          });
          this.cache({
            cacheableStatusCodes: [301, 302, 305, 307, 308],
            edge: {
              maxAgeSeconds: constants_1.FAR_FUTURE_TTL
            }
          });
        };
        this.addResponseCookie = (name, value, options) => {
          this.addResponseHeader(constants_2.HTTP_HEADERS.setCookie, (0, cookieUtils_1.serializeCookie)(name, value, options));
        };
        this.setOrigin = (name) => {
          if (!this.features.origin)
            this.features.origin = {};
          this.features.origin.set_origin = name;
        };
        this.setComment = (message, append = false) => {
          if (!append)
            this.features.comment = "";
          this.features.comment += message;
        };
        this.routeCriteria = criteria;
        this.paramsExtractor = new ParamsExtractor_1.default(criteria);
        this.router = router;
      }
      evaluate(creator) {
        creator(this);
        return this.features;
      }
      sendToServerless(hint, fn) {
        const hintIndex = fn ? this.router.addFunction(async (req, res, propertyContext) => {
          req.params = this.paramsExtractor.extract(req);
          await fn(req, res, propertyContext);
        }) : null;
        this.setRequestHeader(`+${constants_1.EDGIO_SERVERLESS_HINT_HEADER}`, hintIndex !== null ? `${hint}:${hintIndex}` : hint);
        this.setOrigin(origins_1.SERVERLESS_ORIGIN_NAME);
      }
    };
    exports2.default = RouteHelper;
  }
});

// node_modules/@edgio/core/source.js
var require_source = __commonJS({
  "node_modules/@edgio/core/source.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.setSourceDir = exports2.getSourceDir = void 0;
    function getSourceDir() {
      return process.env.EDGIO_ROOT_SOURCE_DIR || process.cwd();
    }
    exports2.getSourceDir = getSourceDir;
    function setSourceDir(dir) {
      process.env.EDGIO_ROOT_SOURCE_DIR = dir;
    }
    exports2.setSourceDir = setSourceDir;
  }
});

// node_modules/slash/index.js
var require_slash = __commonJS({
  "node_modules/slash/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (path) => {
      const isExtendedLengthPath = /^\\\\\?\\/.test(path);
      const hasNonAscii = /[^\u0000-\u0080]+/.test(path);
      if (isExtendedLengthPath || hasNonAscii) {
        return path;
      }
      return path.replace(/\\/g, "/");
    };
  }
});

// node_modules/@edgio/core/utils/nonWebpackRequire.js
var require_nonWebpackRequire = __commonJS({
  "node_modules/@edgio/core/utils/nonWebpackRequire.js"(exports, module) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var slash_1 = __importDefault(require_slash());
    function nonWebpackRequire(modulePath, { ignoreErrors = false } = {}) {
      try {
        return eval("require")((0, slash_1.default)(modulePath));
      } catch (e) {
        if (ignoreErrors) {
          return void 0;
        } else {
          throw e;
        }
      }
    }
    exports.default = nonWebpackRequire;
  }
});

// node_modules/@edgio/core/utils/index.js
var require_utils2 = __commonJS({
  "node_modules/@edgio/core/utils/index.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.nonWebpackRequire = void 0;
    var nonWebpackRequire_1 = require_nonWebpackRequire();
    Object.defineProperty(exports2, "nonWebpackRequire", { enumerable: true, get: function() {
      return __importDefault2(nonWebpackRequire_1).default;
    } });
  }
});

// node_modules/@edgio/core/utils/requireInternal.js
var require_requireInternal = __commonJS({
  "node_modules/@edgio/core/utils/requireInternal.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var nonWebpackRequire_1 = __importDefault2(require_nonWebpackRequire());
    function requireInternal(packagePath) {
      try {
        const resolved = require.resolve(packagePath, {
          paths: [require.resolve("@edgio/core")]
        });
        return (0, nonWebpackRequire_1.default)(resolved);
      } catch (e) {
        return (0, nonWebpackRequire_1.default)(packagePath);
      }
    }
    exports2.default = requireInternal;
  }
});

// node_modules/@edgio/core/errors/InvalidRoutePatternError.js
var require_InvalidRoutePatternError = __commonJS({
  "node_modules/@edgio/core/errors/InvalidRoutePatternError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var InvalidRoutePatternError = class extends Error {
      constructor(pattern) {
        super(`Route pattern "${pattern}" contains invalid syntax. To force exact matching, wrap the path in the 'exact' function.
See https://docs.edg.io/guides/performance/cdn_as_code/common_routing_patterns for more information.`);
        this.isUserError = true;
      }
    };
    exports2.default = InvalidRoutePatternError;
  }
});

// node_modules/@edgio/core/utils/toPathRegexp.js
var require_toPathRegexp = __commonJS({
  "node_modules/@edgio/core/utils/toPathRegexp.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var path_to_regexp_1 = require_dist();
    var InvalidRoutePatternError_1 = __importDefault2(require_InvalidRoutePatternError());
    function toPathRegexp(path) {
      if (path) {
        try {
          return (0, path_to_regexp_1.pathToRegexp)(path);
        } catch (e) {
          throw new InvalidRoutePatternError_1.default(path);
        }
      } else {
        return /^.*$/;
      }
    }
    exports2.default = toPathRegexp;
  }
});

// node_modules/@edgio/core/router/converters/toCondition.js
var require_toCondition = __commonJS({
  "node_modules/@edgio/core/router/converters/toCondition.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toCondition = void 0;
    var exact_1 = require_exact();
    var toEdgeRegex_1 = __importDefault2(require_toEdgeRegex());
    var toPathRegexp_1 = __importDefault2(require_toPathRegexp());
    var RouteCriteria_1 = require_RouteCriteria();
    var toCondition = (property, value) => {
      if ((0, RouteCriteria_1.isNegation)(value)) {
        if (typeof value.not === "string") {
          if (property.request === "path" && (0, toPathRegexp_1.default)(value.not)) {
            return { ["!="]: [property, value.not] };
          }
          return { ["!=="]: [property, value.not] };
        } else if (value.not instanceof RegExp) {
          return { ["!~"]: [property, (0, toEdgeRegex_1.default)(value.not)] };
        } else if (value.not instanceof exact_1.ExactPath) {
          return { ["!=="]: [property, value.not.value] };
        } else if (Array.isArray(value)) {
          return { not_in: [property, value] };
        }
      } else {
        if (typeof value === "string") {
          if (property.request === "path" && (0, toPathRegexp_1.default)(value)) {
            return { ["=="]: [property, value] };
          }
          return { ["==="]: [property, value] };
        } else if (value instanceof RegExp) {
          return { ["=~"]: [property, (0, toEdgeRegex_1.default)(value)] };
        } else if (value instanceof exact_1.ExactPath) {
          return { ["==="]: [property, value.value] };
        } else if (Array.isArray(value)) {
          return { in: [property, value] };
        }
      }
      throw new Error(`Invalid type for match condition: ${typeof value}`);
    };
    exports2.toCondition = toCondition;
  }
});

// node_modules/@edgio/core/router/createMatchers.js
var require_createMatchers = __commonJS({
  "node_modules/@edgio/core/router/createMatchers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createMatchers = void 0;
    var toCondition_1 = require_toCondition();
    function createMatchers(criteria) {
      var _a;
      const rules = [];
      const add = (property, value) => {
        const condition = (0, toCondition_1.toCondition)(property, value);
        rules.push(condition);
      };
      if (criteria.path) {
        add({ request: "path" }, criteria.path);
      }
      if (criteria.scheme) {
        add({ request: "scheme" }, criteria.scheme);
      }
      if (criteria.method) {
        add(
          { request: "method" },
          typeof criteria.method === "string" ? criteria.method.toUpperCase() : criteria.method
        );
      }
      if (criteria.headers) {
        Object.entries(criteria.headers).forEach(([name, value]) => {
          add({ "request.header": name.toLowerCase() }, value);
        });
      }
      if (criteria.query) {
        Object.entries(criteria.query).forEach(([name, value]) => {
          add({ "request.origin_query": name }, typeof value === "string" && value.startsWith(":") ? new RegExp(".+") : value);
        });
      }
      if (criteria.cookies) {
        Object.entries(criteria.cookies).forEach(([name, value]) => {
          add({ "request.cookie": name }, value);
        });
      }
      if (criteria.device) {
        Object.entries(criteria.device).forEach(([name, value]) => {
          add({ device: name }, value);
        });
      }
      if (criteria.location) {
        Object.entries(criteria.location).forEach(([name, value]) => {
          add({ location: name }, value);
        });
      }
      if (criteria.variable) {
        Object.entries(criteria.variable).forEach(([name, value]) => {
          add({ variable: name }, value);
        });
      }
      if (criteria.client_ip) {
        add({ request: "client_ip" }, criteria.client_ip);
      }
      if (criteria["referring-domain"]) {
        add({ request: "referring_domain" }, criteria["referring-domain"]);
      }
      if ((_a = criteria.response) === null || _a === void 0 ? void 0 : _a.status_code) {
        add({ response: "status_code" }, criteria.response.status_code);
      }
      return rules;
    }
    exports2.createMatchers = createMatchers;
  }
});

// node_modules/@edgio/core/router/converters/toRule.js
var require_toRule = __commonJS({
  "node_modules/@edgio/core/router/converters/toRule.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toRule = void 0;
    var createMatchers_1 = require_createMatchers();
    var toRule = (criteria, features) => {
      let matchers = (0, createMatchers_1.createMatchers)(criteria);
      if (matchers.length === 0) {
        return features;
      }
      matchers = matchers.length == 1 ? matchers[0] : { and: matchers };
      const rule = {
        if: [matchers, features]
      };
      return rule;
    };
    exports2.toRule = toRule;
  }
});

// node_modules/@edgio/core/router/converters/toFeature.js
var require_toFeature = __commonJS({
  "node_modules/@edgio/core/router/converters/toFeature.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toFeature = void 0;
    var RouteHelper_1 = __importDefault2(require_RouteHelper());
    var toFeature = (criteria, features, router) => {
      if (typeof features === "function") {
        return new RouteHelper_1.default(criteria, router).evaluate(features);
      } else {
        return features;
      }
    };
    exports2.toFeature = toFeature;
  }
});

// node_modules/@edgio/core/deploy/paths.js
var require_paths = __commonJS({
  "node_modules/@edgio/core/deploy/paths.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getConfigSrcPath = exports2.getRouterSrcPath = exports2.pathForBackend = exports2.STATIC_ASSET_MANIFEST_FILE_NAME = exports2.CONFIG_FILE_NAME = exports2.ROUTES_FILE_NAME = exports2.SOURCES_DIR = exports2.PERMANENT_ASSETS_DIR = exports2.ASSETS_DIR = exports2.EDGE_FUNCTIONS_QUICKJS_BYTECODE_PATH = exports2.EDGE_FUNCTIONS_QUICKJS_BYTECODE_FILENAME = exports2.EDGE_FUNCTIONS_INDEX_PATH = exports2.EDGE_FUNCTIONS_INDEX_FILENAME = exports2.JS_DIR = exports2.EDGIO_DIR = void 0;
    var fs_1 = require("fs");
    var path_1 = require("path");
    exports2.EDGIO_DIR = ".edgio";
    exports2.JS_DIR = (0, path_1.join)(exports2.EDGIO_DIR, "lambda");
    exports2.EDGE_FUNCTIONS_INDEX_FILENAME = "__edge-functions__.js";
    exports2.EDGE_FUNCTIONS_INDEX_PATH = (0, path_1.join)(exports2.JS_DIR, exports2.EDGE_FUNCTIONS_INDEX_FILENAME);
    exports2.EDGE_FUNCTIONS_QUICKJS_BYTECODE_FILENAME = "__edge-functions__.qbc";
    exports2.EDGE_FUNCTIONS_QUICKJS_BYTECODE_PATH = (0, path_1.join)(exports2.JS_DIR, exports2.EDGE_FUNCTIONS_QUICKJS_BYTECODE_FILENAME);
    exports2.ASSETS_DIR = (0, path_1.join)(exports2.EDGIO_DIR, "s3");
    exports2.PERMANENT_ASSETS_DIR = (0, path_1.join)(exports2.EDGIO_DIR, "s3-permanent");
    exports2.SOURCES_DIR = (0, path_1.join)(exports2.EDGIO_DIR, "src");
    exports2.ROUTES_FILE_NAME = "routes.cjs";
    exports2.CONFIG_FILE_NAME = "edgio.config.js";
    exports2.STATIC_ASSET_MANIFEST_FILE_NAME = "static-asset-manifest.json";
    function pathForBackend(backend) {
      return (0, path_1.join)("__backends__", `${backend}.js`);
    }
    exports2.pathForBackend = pathForBackend;
    function getRouterSrcPath(config) {
      const result = (config.routes ? [config.routes] : ["routes.js", "routes.ts", "routes.cjs"]).find((file) => (0, fs_1.existsSync)((0, path_1.join)(process.cwd(), file)));
      if (result == null) {
        const srcFile = config.routes || `routes.js, routes.ts, or routes.cjs`;
        throw new Error(`Edgio routes file not found. Please create ${srcFile} in the root directory of your project.`);
      }
      return result;
    }
    exports2.getRouterSrcPath = getRouterSrcPath;
    function getConfigSrcPath() {
      const cwd = process.cwd();
      const result = [(0, path_1.join)(cwd, "edgio.config.js"), (0, path_1.join)(cwd, "edgio.config.cjs")].find(fs_1.existsSync);
      if (result == null) {
        throw new Error("Edgio config file not found. Please create edgio.config.js or edgio.config.cjs in the root directory of your project.");
      }
      return result;
    }
    exports2.getConfigSrcPath = getConfigSrcPath;
  }
});

// node_modules/@edgio/core/config.js
var require_config = __commonJS({
  "node_modules/@edgio/core/config.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getConfig = void 0;
    var paths_1 = require_paths();
    var utils_1 = require_utils2();
    var log_1 = __importDefault2(require_log());
    var config;
    function getConfig(reload = false) {
      if (!config || reload) {
        const srcPath = (0, paths_1.getConfigSrcPath)();
        if (reload) {
          delete require.cache[srcPath];
        }
        config = (0, utils_1.nonWebpackRequire)(srcPath);
        const environment = process.env.EDGIO_ENVIRONMENT_NAME;
        if (environment && config.environments && config.environments[environment]) {
          log_1.default.info(`using config overrides for ${environment}`);
          Object.assign(config, config.environments[environment]);
        }
      }
      return config;
    }
    exports2.getConfig = getConfig;
  }
});

// node_modules/@edgio/core/utils/Tasks.js
var require_Tasks = __commonJS({
  "node_modules/@edgio/core/utils/Tasks.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var Tasks = class {
      constructor() {
        this._tasks = [];
        this._resolveHandler = Function.prototype;
        this._errorHandler = (err) => {
          throw err;
        };
      }
      add(...tasks) {
        this._tasks.push(...tasks);
        return this;
      }
      onTaskDone(handler) {
        this._resolveHandler = handler;
        return this;
      }
      onTaskError(errorHandler) {
        this._errorHandler = errorHandler;
        return this;
      }
      resolve() {
        const promises = this._convertTasksToPromises().map((task, i) => {
          return task.then((res) => {
            this._resolveHandler(res);
            return res;
          }).catch((err) => {
            return this._errorHandler(err);
          });
        });
        return Promise.all(promises);
      }
      _convertTasksToPromises() {
        return this._tasks.map((task) => {
          if (typeof task !== "function") {
            return Promise.resolve(task);
          }
          try {
            const taskResult = task();
            if (taskResult instanceof Promise) {
              return taskResult;
            }
            return Promise.resolve(taskResult);
          } catch (e) {
            return Promise.reject(e);
          }
        });
      }
    };
    exports2.default = Tasks;
  }
});

// node_modules/@edgio/core/router/PreloadRequests.js
var require_PreloadRequests = __commonJS({
  "node_modules/@edgio/core/router/PreloadRequests.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var config_1 = require_config();
    var Tasks_1 = __importDefault2(require_Tasks());
    var PreloadRequests = class {
      constructor() {
        this.options = [];
      }
      push(...options) {
        this.options.push(...options);
      }
      async getPreloadConfig() {
        const edgioConfig = (0, config_1.getConfig)();
        const requests = [];
        await new Tasks_1.default().add(...this.options).onTaskDone((result) => requests.push(...result)).resolve();
        return {
          requests,
          concurrency: edgioConfig === null || edgioConfig === void 0 ? void 0 : edgioConfig.prerenderConcurrency
        };
      }
    };
    exports2.default = PreloadRequests;
  }
});

// node_modules/@edgio/core/router/Router.js
var require_Router = __commonJS({
  "node_modules/@edgio/core/router/Router.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.STATIC_ASSET_MANIFEST_FILE = void 0;
    var path_1 = require("path");
    var constants_1 = require_constants();
    var source_1 = require_source();
    var utils_1 = require_utils2();
    var requireInternal_1 = __importDefault2(require_requireInternal());
    var toRule_1 = require_toRule();
    var toFeature_1 = require_toFeature();
    var PreloadRequests_1 = __importDefault2(require_PreloadRequests());
    var exact_1 = require_exact();
    var environment_1 = require_environment();
    var slash_12 = __importDefault2(require_slash());
    exports2.STATIC_ASSET_MANIFEST_FILE = "static-asset-manifest.json";
    var Router2 = class {
      constructor(options = {}) {
        this.rules = [];
        this.routerOptions = {};
        this.functions = [];
        this.preloadRequests = new PreloadRequests_1.default();
        this.staticAssetManifest = {};
        this.routerOptions = options;
      }
      addStaticAssetManifestEntry(path, data) {
        if (this.staticAssetManifest[path] === void 0) {
          this.staticAssetManifest[path] = data;
        } else {
          this.staticAssetManifest[path].push(...data);
        }
      }
      static load(routerPath) {
        const routerModule = (0, utils_1.nonWebpackRequire)(routerPath);
        return routerModule.default || routerModule;
      }
      get(criteria, features, options) {
        return this.matchMethod(constants_1.HTTP_METHODS.get, criteria, features, options);
      }
      put(criteria, features, options) {
        return this.matchMethod(constants_1.HTTP_METHODS.put, criteria, features, options);
      }
      patch(criteria, features, options) {
        return this.matchMethod(constants_1.HTTP_METHODS.patch, criteria, features, options);
      }
      post(criteria, features, options) {
        return this.matchMethod(constants_1.HTTP_METHODS.post, criteria, features, options);
      }
      head(criteria, features, options) {
        return this.matchMethod(constants_1.HTTP_METHODS.head, criteria, features, options);
      }
      delete(criteria, features, options) {
        return this.matchMethod(constants_1.HTTP_METHODS.delete, criteria, features, options);
      }
      options(criteria, features, options) {
        return this.matchMethod(constants_1.HTTP_METHODS.options, criteria, features, options);
      }
      match(criteria, features, options) {
        if (typeof criteria === "string" || criteria instanceof RegExp || criteria instanceof exact_1.ExactPath) {
          return this.matchInternal({ path: criteria }, features, options);
        } else {
          return this.matchInternal(criteria, features, options);
        }
      }
      conditional(criteria) {
        this.rules.push(criteria);
        return this;
      }
      use(plugin) {
        plugin.onRegister(this);
        return this;
      }
      matchInternal(criteria, featuresParam, options) {
        const features = (0, toFeature_1.toFeature)(criteria, featuresParam, this);
        const rule = (0, toRule_1.toRule)(criteria, features);
        this.rules.push(rule);
        return this;
      }
      matchMethod(method, criteria, features, options) {
        if (typeof criteria === "string" || criteria instanceof RegExp || criteria instanceof exact_1.ExactPath) {
          return this.match({
            method,
            path: criteria
          }, features);
        }
        if (criteria === null || criteria === void 0 ? void 0 : criteria.method) {
          throw new Error(`Invalid criteria property method passed to call to Router#${method}. Specifying a method in the criteria is redundant.`);
        }
        return this.match({ ...criteria, method }, features, options);
      }
      dir(sourcePath, features, options = {}) {
        const createInMatcher = (files) => {
          if (!files || files.length === 0)
            return;
          const paths = files.flatMap((file) => {
            var _a;
            return ((_a = options === null || options === void 0 ? void 0 : options.paths) === null || _a === void 0 ? void 0 : _a.call(options, file)) || [`/${file}`];
          }).flatMap((path) => {
            if (!path.endsWith("/index.html"))
              return [path];
            return Array.from(/* @__PURE__ */ new Set([
              path.toString().replace(/\/index.html$/, "/"),
              path.toString().replace(/\/index.html$/, "")
            ])).filter((path2) => path2.length > 0);
          });
          this.match({ path: paths }, features);
        };
        if ((0, environment_1.isCloud)()) {
          const files = this.staticAssetsForPath(sourcePath);
          createInMatcher(files);
        } else {
          const files = Router2.collectFiles(sourcePath, options);
          this.addStaticAssetManifestEntry((0, slash_12.default)(sourcePath), files);
          createInMatcher(files);
        }
        return this;
      }
      static(sourcePath, options = {}) {
        const features = (helper) => {
          helper.serveStatic(`${sourcePath}/:path*`, {
            rewritePathSource: options === null || options === void 0 ? void 0 : options.rewritePathSource
          });
          if (options === null || options === void 0 ? void 0 : options.handler)
            options.handler(helper);
        };
        return this.dir(sourcePath, features, options);
      }
      staticAssetsForPath(path) {
        return (0, utils_1.nonWebpackRequire)((0, path_1.join)(process.cwd(), exports2.STATIC_ASSET_MANIFEST_FILE))[path];
      }
      addFunction(fn) {
        this.functions.push(fn);
        return this.functions.length - 1;
      }
      prerender(...preloadOptions) {
        this.preloadRequests.push(...preloadOptions);
        return this;
      }
      noIndexPermalink() {
        return this;
      }
      static collectFiles(sourcePath, options) {
        var _a;
        const directory = (0, path_1.join)((0, source_1.getSourceDir)(), sourcePath);
        const ignore = typeof options.ignore === "string" ? [options.ignore] : (_a = options.ignore) !== null && _a !== void 0 ? _a : [];
        let files = (0, requireInternal_1.default)("globby").sync(options.glob || "**/*", {
          cwd: directory,
          onlyFiles: true,
          ignore
        });
        if (options.sort) {
          files = options.sort(files);
        }
        return files;
      }
      catch(error, features) {
        let errorRegex;
        if (error instanceof RegExp) {
          errorRegex = error;
        } else {
          errorRegex = new RegExp(`^${error.toString()}$`);
        }
        return this.matchInternal({ response: { status_code: errorRegex } }, features);
      }
    };
    exports2.default = Router2;
  }
});

// node_modules/@edgio/core/router/index.js
var require_router = __commonJS({
  "node_modules/@edgio/core/router/index.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.edgioRoutes = exports2.Router = exports2.RouteHelper = void 0;
    var EdgioRoutes_1 = __importDefault2(require_EdgioRoutes());
    var RouteHelper_1 = require_RouteHelper();
    Object.defineProperty(exports2, "RouteHelper", { enumerable: true, get: function() {
      return __importDefault2(RouteHelper_1).default;
    } });
    var Router_1 = require_Router();
    Object.defineProperty(exports2, "Router", { enumerable: true, get: function() {
      return __importDefault2(Router_1).default;
    } });
    exports2.edgioRoutes = new EdgioRoutes_1.default();
  }
});

// node_modules/@edgio/nuxt/router/assets.js
var require_assets = __commonJS({
  "node_modules/@edgio/nuxt/router/assets.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readAsset = void 0;
    var fs_1 = __importDefault2(require("fs"));
    function readAsset(path) {
      return fs_1.default.readFileSync(path, "utf8");
    }
    exports2.readAsset = readAsset;
  }
});

// node_modules/@edgio/nuxt/router/NuxtRoutes.js
var require_NuxtRoutes = __commonJS({
  "node_modules/@edgio/nuxt/router/NuxtRoutes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.browserAssetOpts = exports2.FAR_FUTURE_TTL_WITH_UNIT = exports2.EDGIO_NUXT_CONFIG_PATH = void 0;
    var path_1 = require("path");
    var assets_1 = require_assets();
    var environment_1 = require_environment();
    var router_1 = require_router();
    exports2.EDGIO_NUXT_CONFIG_PATH = ".edgio/edgio-nuxt.config.json";
    exports2.FAR_FUTURE_TTL_WITH_UNIT = "10y";
    var FAR_FUTURE_CACHE_CONFIG = {
      browser: {
        maxAgeSeconds: exports2.FAR_FUTURE_TTL_WITH_UNIT
      },
      edge: {
        maxAgeSeconds: exports2.FAR_FUTURE_TTL_WITH_UNIT
      }
    };
    exports2.browserAssetOpts = {
      permanent: true,
      exclude: ["service-worker.js", "LICENSES"]
    };
    var NuxtRoutes = class {
      constructor() {
        this.buildDir = "";
        this.config = {};
        if ((0, environment_1.isProductionBuild)()) {
          this.config = JSON.parse((0, assets_1.readAsset)(exports2.EDGIO_NUXT_CONFIG_PATH));
          if (this.config.target !== "static") {
            this.buildDir = ".nuxt";
            if (this.config.buildDir) {
              console.log("> Found buildDir inside nuxt.config.* to be", `"${this.config.buildDir}"`);
              this.buildDir = this.config.buildDir;
            }
          }
        }
      }
      onRegister(router) {
        this.router = router;
        this.addFallback();
        this.addNuxtRoutes();
        this.router.use(router_1.edgioRoutes);
      }
      addFallback() {
        var _a, _b, _c, _d;
        if (this.config.target === "static") {
          const fallback = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.generate) === null || _b === void 0 ? void 0 : _b.fallback;
          let targetPage;
          if (fallback === true) {
            targetPage = (0, path_1.join)("dist", "404.html");
          } else if (fallback === false) {
            return;
          } else if (typeof fallback === "string") {
            targetPage = (0, path_1.join)("dist", `${fallback}`);
          } else {
            targetPage = (0, path_1.join)("dist", "200.html");
          }
          this.log("[@edgio/nuxt] fallback", targetPage);
          (_c = this.router) === null || _c === void 0 ? void 0 : _c.match("/:path*", ({ serveStatic }) => serveStatic(targetPage));
        } else {
          (_d = this.router) === null || _d === void 0 ? void 0 : _d.match("/:path*", ({ renderWithApp }) => renderWithApp());
        }
      }
      addNuxtRoutes() {
        this.addPages();
        this.addAssets();
      }
      addPages() {
        var _a;
        if (this.config.target !== "static")
          return;
        (_a = this.router) === null || _a === void 0 ? void 0 : _a.static("dist");
      }
      addAssets() {
        var _a, _b, _c, _d, _e, _f;
        (_a = this.router) === null || _a === void 0 ? void 0 : _a.static("static", {});
        if ((0, environment_1.isProductionBuild)()) {
          (_b = this.router) === null || _b === void 0 ? void 0 : _b.match("/service-worker.js", ({ serviceWorker }) => {
            serviceWorker(this.config.target === "static" ? (0, path_1.join)("dist", "_nuxt", "service-worker.js") : (0, path_1.join)(`${this.buildDir}`, "dist", "client", "service-worker.js"));
          });
          (_c = this.router) === null || _c === void 0 ? void 0 : _c.match("/_nuxt/:path*", ({ cache, serveStatic }) => {
            this.config.target === "static" ? serveStatic((0, path_1.join)("dist", "_nuxt", ":path*")) : serveStatic((0, path_1.join)(`${this.buildDir}`, "dist", "client", ":path*"), exports2.browserAssetOpts);
            cache(FAR_FUTURE_CACHE_CONFIG);
          });
        } else {
          const streamHandler = ({ send }) => send("NOT IMPLEMENTED", 200);
          (_d = this.router) === null || _d === void 0 ? void 0 : _d.match("/__webpack_hmr/:path*", streamHandler);
          (_e = this.router) === null || _e === void 0 ? void 0 : _e.match("/_nuxt/:hash.hot-update.json", streamHandler);
          (_f = this.router) === null || _f === void 0 ? void 0 : _f.match("/_loading/:path*", streamHandler);
        }
      }
      log(...messages) {
        (0, environment_1.isProductionBuild)() && (0, environment_1.isLocal)() && console.log(...messages);
      }
    };
    exports2.default = NuxtRoutes;
  }
});

// node_modules/@edgio/core/router/addPreloadHeaders.js
var require_addPreloadHeaders = __commonJS({
  "node_modules/@edgio/core/router/addPreloadHeaders.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function addPreloadHeaders(res) {
      if (/text\/html/i.test(res.getHeader("Content-Type"))) {
        let { body } = res;
        const matches = [];
        const preloadRegex = /<link rel="preload" href="([^"]*)".+?(?=>)/gis;
        const typeRegex = /as="([^"]*)"/i;
        let match;
        if (Buffer.isBuffer(body)) {
          body = body.toString("utf8");
        }
        if (typeof body === "string") {
          while (match = preloadRegex.exec(body)) {
            const type = typeRegex.exec(match[0]);
            matches.push({ uri: match[1], as: type && type[1] });
          }
        }
        const newLinks = matches.map(linkFile).join(", ");
        const existingLinks = res.getHeader("link");
        if (existingLinks) {
          res.setHeader("link", `${existingLinks}, ${newLinks}`);
        } else if (newLinks.length) {
          res.setHeader("link", newLinks);
        }
      }
    }
    exports2.default = addPreloadHeaders;
    function linkFile(link) {
      let { uri, as } = link;
      let name = uri.split("?")[0];
      if (!as) {
        if (name.toLowerCase().endsWith(".css")) {
          as = "style";
        } else if (name.toLowerCase().match(/(woff|woff2|truetype|opentype|embedded-opentype)$/)) {
          as = "font";
        } else {
          as = "script";
        }
      }
      return `<${name}>; as=${as}; rel=preload`;
    }
  }
});

// node_modules/@edgio/nuxt/router/renderNuxtPage.js
var require_renderNuxtPage = __commonJS({
  "node_modules/@edgio/nuxt/router/renderNuxtPage.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var constants_1 = require_constants();
    var addPreloadHeaders_1 = __importDefault2(require_addPreloadHeaders());
    function renderNuxtPage(res) {
      return res.proxy(constants_1.BACKENDS.js, {
        transformResponse: addPreloadHeaders_1.default
      });
    }
    exports2.default = renderNuxtPage;
  }
});

// node_modules/@edgio/nuxt/router/index.js
var require_router2 = __commonJS({
  "node_modules/@edgio/nuxt/router/index.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.renderNuxtPage = exports2.nuxtRoutes = void 0;
    var NuxtRoutes_1 = __importDefault2(require_NuxtRoutes());
    exports2.nuxtRoutes = new NuxtRoutes_1.default();
    var renderNuxtPage_1 = require_renderNuxtPage();
    Object.defineProperty(exports2, "renderNuxtPage", { enumerable: true, get: function() {
      return __importDefault2(renderNuxtPage_1).default;
    } });
  }
});

// node_modules/@edgio/nuxt/index.js
var require_nuxt = __commonJS({
  "node_modules/@edgio/nuxt/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_router2(), exports2);
  }
});

// routes.js
var { Router } = require_router();
var { nuxtRoutes } = require_nuxt();
module.exports = new Router().match("/service-worker.js", ({ serviceWorker }) => {
  serviceWorker(".nuxt/dist/client/service-worker.js");
}).use(nuxtRoutes);
//# sourceMappingURL=routes.cjs.map
