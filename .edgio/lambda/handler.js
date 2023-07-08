"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/uuid/dist/rng.js
var require_rng = __commonJS({
  "node_modules/uuid/dist/rng.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = rng;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var rnds8Pool = new Uint8Array(256);
    var poolPtr = rnds8Pool.length;
    function rng() {
      if (poolPtr > rnds8Pool.length - 16) {
        _crypto.default.randomFillSync(rnds8Pool);
        poolPtr = 0;
      }
      return rnds8Pool.slice(poolPtr, poolPtr += 16);
    }
  }
});

// node_modules/uuid/dist/regex.js
var require_regex = __commonJS({
  "node_modules/uuid/dist/regex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/validate.js
var require_validate = __commonJS({
  "node_modules/uuid/dist/validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _regex = _interopRequireDefault(require_regex());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function validate2(uuid2) {
      return typeof uuid2 === "string" && _regex.default.test(uuid2);
    }
    var _default = validate2;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/stringify.js
var require_stringify = __commonJS({
  "node_modules/uuid/dist/stringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    function stringify3(arr, offset = 0) {
      const uuid2 = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError("Stringified UUID is invalid");
      }
      return uuid2;
    }
    var _default = stringify3;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v1.js
var require_v1 = __commonJS({
  "node_modules/uuid/dist/v1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v12(options, buf, offset) {
      let i = buf && offset || 0;
      const b = buf || new Array(16);
      options = options || {};
      let node = options.node || _nodeId;
      let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
          node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      const tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf || (0, _stringify.default)(b);
    }
    var _default = v12;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/parse.js
var require_parse = __commonJS({
  "node_modules/uuid/dist/parse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function parse5(uuid2) {
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError("Invalid UUID");
      }
      let v;
      const arr = new Uint8Array(16);
      arr[0] = (v = parseInt(uuid2.slice(0, 8), 16)) >>> 24;
      arr[1] = v >>> 16 & 255;
      arr[2] = v >>> 8 & 255;
      arr[3] = v & 255;
      arr[4] = (v = parseInt(uuid2.slice(9, 13), 16)) >>> 8;
      arr[5] = v & 255;
      arr[6] = (v = parseInt(uuid2.slice(14, 18), 16)) >>> 8;
      arr[7] = v & 255;
      arr[8] = (v = parseInt(uuid2.slice(19, 23), 16)) >>> 8;
      arr[9] = v & 255;
      arr[10] = (v = parseInt(uuid2.slice(24, 36), 16)) / 1099511627776 & 255;
      arr[11] = v / 4294967296 & 255;
      arr[12] = v >>> 24 & 255;
      arr[13] = v >>> 16 & 255;
      arr[14] = v >>> 8 & 255;
      arr[15] = v & 255;
      return arr;
    }
    var _default = parse5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v35.js
var require_v35 = __commonJS({
  "node_modules/uuid/dist/v35.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.URL = exports.DNS = void 0;
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = [];
      for (let i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
      }
      return bytes;
    }
    var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    exports.DNS = DNS;
    var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    exports.URL = URL2;
    function _default(name, version2, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        if (typeof value === "string") {
          value = stringToBytes(value);
        }
        if (typeof namespace === "string") {
          namespace = (0, _parse.default)(namespace);
        }
        if (namespace.length !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 15 | version2;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, _stringify.default)(bytes);
      }
      try {
        generateUUID.name = name;
      } catch (err) {
      }
      generateUUID.DNS = DNS;
      generateUUID.URL = URL2;
      return generateUUID;
    }
  }
});

// node_modules/uuid/dist/md5.js
var require_md5 = __commonJS({
  "node_modules/uuid/dist/md5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function md5(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("md5").update(bytes).digest();
    }
    var _default = md5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v3.js
var require_v3 = __commonJS({
  "node_modules/uuid/dist/v3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _md = _interopRequireDefault(require_md5());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v32 = (0, _v.default)("v3", 48, _md.default);
    var _default = v32;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v4.js
var require_v4 = __commonJS({
  "node_modules/uuid/dist/v4.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function v42(options, buf, offset) {
      options = options || {};
      const rnds = options.random || (options.rng || _rng.default)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, _stringify.default)(rnds);
    }
    var _default = v42;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/sha1.js
var require_sha1 = __commonJS({
  "node_modules/uuid/dist/sha1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function sha1(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("sha1").update(bytes).digest();
    }
    var _default = sha1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v5.js
var require_v5 = __commonJS({
  "node_modules/uuid/dist/v5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _sha = _interopRequireDefault(require_sha1());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v52 = (0, _v.default)("v5", 80, _sha.default);
    var _default = v52;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/nil.js
var require_nil = __commonJS({
  "node_modules/uuid/dist/nil.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = "00000000-0000-0000-0000-000000000000";
    exports.default = _default;
  }
});

// node_modules/uuid/dist/version.js
var require_version = __commonJS({
  "node_modules/uuid/dist/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function version2(uuid2) {
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError("Invalid UUID");
      }
      return parseInt(uuid2.substr(14, 1), 16);
    }
    var _default = version2;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/index.js
var require_dist = __commonJS({
  "node_modules/uuid/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "v1", {
      enumerable: true,
      get: function() {
        return _v.default;
      }
    });
    Object.defineProperty(exports, "v3", {
      enumerable: true,
      get: function() {
        return _v2.default;
      }
    });
    Object.defineProperty(exports, "v4", {
      enumerable: true,
      get: function() {
        return _v3.default;
      }
    });
    Object.defineProperty(exports, "v5", {
      enumerable: true,
      get: function() {
        return _v4.default;
      }
    });
    Object.defineProperty(exports, "NIL", {
      enumerable: true,
      get: function() {
        return _nil.default;
      }
    });
    Object.defineProperty(exports, "version", {
      enumerable: true,
      get: function() {
        return _version.default;
      }
    });
    Object.defineProperty(exports, "validate", {
      enumerable: true,
      get: function() {
        return _validate.default;
      }
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: function() {
        return _stringify.default;
      }
    });
    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: function() {
        return _parse.default;
      }
    });
    var _v = _interopRequireDefault(require_v1());
    var _v2 = _interopRequireDefault(require_v3());
    var _v3 = _interopRequireDefault(require_v4());
    var _v4 = _interopRequireDefault(require_v5());
    var _nil = _interopRequireDefault(require_nil());
    var _version = _interopRequireDefault(require_version());
    var _validate = _interopRequireDefault(require_validate());
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/uuid/wrapper.mjs
var import_dist, v1, v3, v4, v5, NIL, version, validate, stringify, parse;
var init_wrapper = __esm({
  "node_modules/uuid/wrapper.mjs"() {
    import_dist = __toESM(require_dist(), 1);
    v1 = import_dist.default.v1;
    v3 = import_dist.default.v3;
    v4 = import_dist.default.v4;
    v5 = import_dist.default.v5;
    NIL = import_dist.default.NIL;
    version = import_dist.default.version;
    validate = import_dist.default.validate;
    stringify = import_dist.default.stringify;
    parse = import_dist.default.parse;
  }
});

// src/lambda/lambdaInstance.ts
var lambdaInstance_exports = {};
__export(lambdaInstance_exports, {
  LambdaInvocation: () => LambdaInvocation,
  default: () => LambdaInstance
});
var LambdaInstance, LambdaInvocation;
var init_lambdaInstance = __esm({
  "src/lambda/lambdaInstance.ts"() {
    "use strict";
    init_wrapper();
    LambdaInstance = class {
      constructor() {
        this._id = v4().toString();
        this._spawnedAt = Date.now();
        this._invocationCounter = 0;
        this._lifetimeDuration = 0;
      }
      get id() {
        return this._id;
      }
      get age() {
        return Date.now() - this._spawnedAt;
      }
      get invocationCounter() {
        return this._invocationCounter;
      }
      get lifetimeDuration() {
        return this._lifetimeDuration;
      }
      startInvocation() {
        ++this._invocationCounter;
      }
      stopInvocation(duration) {
        this._lifetimeDuration += duration;
      }
    };
    LambdaInvocation = class {
      constructor(lambda) {
        this._startTime = Date.now();
        this._isRunning = false;
        this._lambda = lambda;
        this._stopTime = this._startTime;
      }
      get lambda() {
        return this._lambda;
      }
      get duration() {
        return this._stopTime - this._startTime;
      }
      start() {
        if (!this._isRunning) {
          this._isRunning = true;
          this._lambda.startInvocation();
        }
      }
      stop() {
        if (this._isRunning) {
          this._isRunning = false;
          this._stopTime = Date.now();
          this._lambda.stopInvocation(this.duration);
        }
      }
    };
  }
});

// node_modules/pino-std-serializers/lib/err.js
var require_err = __commonJS({
  "node_modules/pino-std-serializers/lib/err.js"(exports, module2) {
    "use strict";
    module2.exports = errSerializer;
    var { toString } = Object.prototype;
    var seen = Symbol("circular-ref-tag");
    var rawSymbol = Symbol("pino-raw-err-ref");
    var pinoErrProto = Object.create({}, {
      type: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      message: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      stack: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoErrProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function errSerializer(err) {
      if (!(err instanceof Error)) {
        return err;
      }
      err[seen] = void 0;
      const _err = Object.create(pinoErrProto);
      _err.type = toString.call(err.constructor) === "[object Function]" ? err.constructor.name : err.name;
      _err.message = err.message;
      _err.stack = err.stack;
      for (const key2 in err) {
        if (_err[key2] === void 0) {
          const val = err[key2];
          if (val instanceof Error) {
            if (!val.hasOwnProperty(seen)) {
              _err[key2] = errSerializer(val);
            }
          } else {
            _err[key2] = val;
          }
        }
      }
      delete err[seen];
      _err.raw = err;
      return _err;
    }
  }
});

// node_modules/pino-std-serializers/lib/req.js
var require_req = __commonJS({
  "node_modules/pino-std-serializers/lib/req.js"(exports, module2) {
    "use strict";
    module2.exports = {
      mapHttpRequest,
      reqSerializer
    };
    var rawSymbol = Symbol("pino-raw-req-ref");
    var pinoReqProto = Object.create({}, {
      id: {
        enumerable: true,
        writable: true,
        value: ""
      },
      method: {
        enumerable: true,
        writable: true,
        value: ""
      },
      url: {
        enumerable: true,
        writable: true,
        value: ""
      },
      query: {
        enumerable: true,
        writable: true,
        value: ""
      },
      params: {
        enumerable: true,
        writable: true,
        value: ""
      },
      headers: {
        enumerable: true,
        writable: true,
        value: {}
      },
      remoteAddress: {
        enumerable: true,
        writable: true,
        value: ""
      },
      remotePort: {
        enumerable: true,
        writable: true,
        value: ""
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoReqProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function reqSerializer(req) {
      const connection = req.info || req.socket;
      const _req = Object.create(pinoReqProto);
      _req.id = typeof req.id === "function" ? req.id() : req.id || (req.info ? req.info.id : void 0);
      _req.method = req.method;
      if (req.originalUrl) {
        _req.url = req.originalUrl;
        _req.query = req.query;
        _req.params = req.params;
      } else {
        _req.url = req.path || (req.url ? req.url.path || req.url : void 0);
      }
      _req.headers = req.headers;
      _req.remoteAddress = connection && connection.remoteAddress;
      _req.remotePort = connection && connection.remotePort;
      _req.raw = req.raw || req;
      return _req;
    }
    function mapHttpRequest(req) {
      return {
        req: reqSerializer(req)
      };
    }
  }
});

// node_modules/pino-std-serializers/lib/res.js
var require_res = __commonJS({
  "node_modules/pino-std-serializers/lib/res.js"(exports, module2) {
    "use strict";
    module2.exports = {
      mapHttpResponse,
      resSerializer
    };
    var rawSymbol = Symbol("pino-raw-res-ref");
    var pinoResProto = Object.create({}, {
      statusCode: {
        enumerable: true,
        writable: true,
        value: 0
      },
      headers: {
        enumerable: true,
        writable: true,
        value: ""
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoResProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function resSerializer(res) {
      const _res = Object.create(pinoResProto);
      _res.statusCode = res.statusCode;
      _res.headers = res.getHeaders ? res.getHeaders() : res._headers;
      _res.raw = res;
      return _res;
    }
    function mapHttpResponse(res) {
      return {
        res: resSerializer(res)
      };
    }
  }
});

// node_modules/pino-std-serializers/index.js
var require_pino_std_serializers = __commonJS({
  "node_modules/pino-std-serializers/index.js"(exports, module2) {
    "use strict";
    var errSerializer = require_err();
    var reqSerializers = require_req();
    var resSerializers = require_res();
    module2.exports = {
      err: errSerializer,
      mapHttpRequest: reqSerializers.mapHttpRequest,
      mapHttpResponse: resSerializers.mapHttpResponse,
      req: reqSerializers.reqSerializer,
      res: resSerializers.resSerializer,
      wrapErrorSerializer: function wrapErrorSerializer(customSerializer) {
        if (customSerializer === errSerializer)
          return customSerializer;
        return function wrapErrSerializer(err) {
          return customSerializer(errSerializer(err));
        };
      },
      wrapRequestSerializer: function wrapRequestSerializer(customSerializer) {
        if (customSerializer === reqSerializers.reqSerializer)
          return customSerializer;
        return function wrappedReqSerializer(req) {
          return customSerializer(reqSerializers.reqSerializer(req));
        };
      },
      wrapResponseSerializer: function wrapResponseSerializer(customSerializer) {
        if (customSerializer === resSerializers.resSerializer)
          return customSerializer;
        return function wrappedResSerializer(res) {
          return customSerializer(resSerializers.resSerializer(res));
        };
      }
    };
  }
});

// node_modules/fast-redact/lib/validator.js
var require_validator = __commonJS({
  "node_modules/fast-redact/lib/validator.js"(exports, module2) {
    "use strict";
    var { createContext, runInContext } = require("vm");
    module2.exports = validator;
    function validator(opts = {}) {
      const {
        ERR_PATHS_MUST_BE_STRINGS = () => "fast-redact - Paths must be (non-empty) strings",
        ERR_INVALID_PATH = (s) => `fast-redact \u2013 Invalid path (${s})`
      } = opts;
      return function validate2({ paths }) {
        paths.forEach((s) => {
          if (typeof s !== "string") {
            throw Error(ERR_PATHS_MUST_BE_STRINGS());
          }
          try {
            if (/〇/.test(s))
              throw Error();
            const proxy = new Proxy({}, { get: () => proxy, set: () => {
              throw Error();
            } });
            const expr = (s[0] === "[" ? "" : ".") + s.replace(/^\*/, "\u3007").replace(/\.\*/g, ".\u3007").replace(/\[\*\]/g, "[\u3007]");
            if (/\n|\r|;/.test(expr))
              throw Error();
            if (/\/\*/.test(expr))
              throw Error();
            runInContext(`
          (function () {
            'use strict'
            o${expr}
            if ([o${expr}].length !== 1) throw Error()
          })()
        `, createContext({ o: proxy, "\u3007": null }), {
              codeGeneration: { strings: false, wasm: false }
            });
          } catch (e) {
            throw Error(ERR_INVALID_PATH(s));
          }
        });
      };
    }
  }
});

// node_modules/fast-redact/lib/rx.js
var require_rx = __commonJS({
  "node_modules/fast-redact/lib/rx.js"(exports, module2) {
    "use strict";
    module2.exports = /[^.[\]]+|\[((?:.)*?)\]/g;
  }
});

// node_modules/fast-redact/lib/parse.js
var require_parse2 = __commonJS({
  "node_modules/fast-redact/lib/parse.js"(exports, module2) {
    "use strict";
    var rx = require_rx();
    module2.exports = parse5;
    function parse5({ paths }) {
      const wildcards = [];
      var wcLen = 0;
      const secret = paths.reduce(function(o, strPath, ix) {
        var path3 = strPath.match(rx).map((p) => p.replace(/'|"|`/g, ""));
        const leadingBracket = strPath[0] === "[";
        path3 = path3.map((p) => {
          if (p[0] === "[")
            return p.substr(1, p.length - 2);
          else
            return p;
        });
        const star = path3.indexOf("*");
        if (star > -1) {
          const before = path3.slice(0, star);
          const beforeStr = before.join(".");
          const after = path3.slice(star + 1, path3.length);
          if (after.indexOf("*") > -1)
            throw Error("fast-redact \u2013 Only one wildcard per path is supported");
          const nested = after.length > 0;
          wcLen++;
          wildcards.push({
            before,
            beforeStr,
            after,
            nested
          });
        } else {
          o[strPath] = {
            path: path3,
            val: void 0,
            precensored: false,
            circle: "",
            escPath: JSON.stringify(strPath),
            leadingBracket
          };
        }
        return o;
      }, {});
      return { wildcards, wcLen, secret };
    }
  }
});

// node_modules/fast-redact/lib/redactor.js
var require_redactor = __commonJS({
  "node_modules/fast-redact/lib/redactor.js"(exports, module2) {
    "use strict";
    var rx = require_rx();
    module2.exports = redactor;
    function redactor({ secret, serialize, wcLen, strict, isCensorFct, censorFctTakesPath }, state) {
      const redact = Function("o", `
    if (typeof o !== 'object' || o == null) {
      ${strictImpl(strict, serialize)}
    }
    const { censor, secret } = this
    ${redactTmpl(secret, isCensorFct, censorFctTakesPath)}
    this.compileRestore()
    ${dynamicRedactTmpl(wcLen > 0, isCensorFct, censorFctTakesPath)}
    ${resultTmpl(serialize)}
  `).bind(state);
      if (serialize === false) {
        redact.restore = (o) => state.restore(o);
      }
      return redact;
    }
    function redactTmpl(secret, isCensorFct, censorFctTakesPath) {
      return Object.keys(secret).map((path3) => {
        const { escPath, leadingBracket, path: arrPath } = secret[path3];
        const skip = leadingBracket ? 1 : 0;
        const delim = leadingBracket ? "" : ".";
        const hops = [];
        var match2;
        while ((match2 = rx.exec(path3)) !== null) {
          const [, ix] = match2;
          const { index, input } = match2;
          if (index > skip)
            hops.push(input.substring(0, index - (ix ? 0 : 1)));
        }
        var existence = hops.map((p) => `o${delim}${p}`).join(" && ");
        if (existence.length === 0)
          existence += `o${delim}${path3} != null`;
        else
          existence += ` && o${delim}${path3} != null`;
        const circularDetection = `
      switch (true) {
        ${hops.reverse().map((p) => `
          case o${delim}${p} === censor:
            secret[${escPath}].circle = ${JSON.stringify(p)}
            break
        `).join("\n")}
      }
    `;
        const censorArgs = censorFctTakesPath ? `val, ${JSON.stringify(arrPath)}` : `val`;
        return `
      if (${existence}) {
        const val = o${delim}${path3}
        if (val === censor) {
          secret[${escPath}].precensored = true
        } else {
          secret[${escPath}].val = val
          o${delim}${path3} = ${isCensorFct ? `censor(${censorArgs})` : "censor"}
          ${circularDetection}
        }
      }
    `;
      }).join("\n");
    }
    function dynamicRedactTmpl(hasWildcards, isCensorFct, censorFctTakesPath) {
      return hasWildcards === true ? `
    {
      const { wildcards, wcLen, groupRedact, nestedRedact } = this
      for (var i = 0; i < wcLen; i++) {
        const { before, beforeStr, after, nested } = wildcards[i]
        if (nested === true) {
          secret[beforeStr] = secret[beforeStr] || []
          nestedRedact(secret[beforeStr], o, before, after, censor, ${isCensorFct}, ${censorFctTakesPath})
        } else secret[beforeStr] = groupRedact(o, before, censor, ${isCensorFct}, ${censorFctTakesPath})
      }
    }
  ` : "";
    }
    function resultTmpl(serialize) {
      return serialize === false ? `return o` : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `;
    }
    function strictImpl(strict, serialize) {
      return strict === true ? `throw Error('fast-redact: primitives cannot be redacted')` : serialize === false ? `return o` : `return this.serialize(o)`;
    }
  }
});

// node_modules/fast-redact/lib/modifiers.js
var require_modifiers = __commonJS({
  "node_modules/fast-redact/lib/modifiers.js"(exports, module2) {
    "use strict";
    module2.exports = {
      groupRedact,
      groupRestore,
      nestedRedact,
      nestedRestore
    };
    function groupRestore({ keys, values, target }) {
      if (target == null)
        return;
      const length = keys.length;
      for (var i = 0; i < length; i++) {
        const k = keys[i];
        target[k] = values[i];
      }
    }
    function groupRedact(o, path3, censor, isCensorFct, censorFctTakesPath) {
      const target = get2(o, path3);
      if (target == null)
        return { keys: null, values: null, target: null, flat: true };
      const keys = Object.keys(target);
      const keysLength = keys.length;
      const pathLength = path3.length;
      const pathWithKey = censorFctTakesPath ? [...path3] : void 0;
      const values = new Array(keysLength);
      for (var i = 0; i < keysLength; i++) {
        const key2 = keys[i];
        values[i] = target[key2];
        if (censorFctTakesPath) {
          pathWithKey[pathLength] = key2;
          target[key2] = censor(target[key2], pathWithKey);
        } else if (isCensorFct) {
          target[key2] = censor(target[key2]);
        } else {
          target[key2] = censor;
        }
      }
      return { keys, values, target, flat: true };
    }
    function nestedRestore(arr) {
      const length = arr.length;
      for (var i = 0; i < length; i++) {
        const { key: key2, target, value } = arr[i];
        target[key2] = value;
      }
    }
    function nestedRedact(store, o, path3, ns, censor, isCensorFct, censorFctTakesPath) {
      const target = get2(o, path3);
      if (target == null)
        return;
      const keys = Object.keys(target);
      const keysLength = keys.length;
      for (var i = 0; i < keysLength; i++) {
        const key2 = keys[i];
        const { value, parent, exists } = specialSet(target, key2, path3, ns, censor, isCensorFct, censorFctTakesPath);
        if (exists === true && parent !== null) {
          store.push({ key: ns[ns.length - 1], target: parent, value });
        }
      }
      return store;
    }
    function has(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    function specialSet(o, k, path3, afterPath, censor, isCensorFct, censorFctTakesPath) {
      const afterPathLen = afterPath.length;
      const lastPathIndex = afterPathLen - 1;
      const originalKey = k;
      var i = -1;
      var n;
      var nv;
      var ov;
      var oov = null;
      var exists = true;
      ov = n = o[k];
      if (typeof n !== "object")
        return { value: null, parent: null, exists };
      while (n != null && ++i < afterPathLen) {
        k = afterPath[i];
        oov = ov;
        if (!(k in n)) {
          exists = false;
          break;
        }
        ov = n[k];
        nv = i !== lastPathIndex ? ov : isCensorFct ? censorFctTakesPath ? censor(ov, [...path3, originalKey, ...afterPath]) : censor(ov) : censor;
        n[k] = has(n, k) && nv === ov || nv === void 0 && censor !== void 0 ? n[k] : nv;
        n = n[k];
        if (typeof n !== "object")
          break;
      }
      return { value: ov, parent: oov, exists };
    }
    function get2(o, p) {
      var i = -1;
      var l = p.length;
      var n = o;
      while (n != null && ++i < l) {
        n = n[p[i]];
      }
      return n;
    }
  }
});

// node_modules/fast-redact/lib/restorer.js
var require_restorer = __commonJS({
  "node_modules/fast-redact/lib/restorer.js"(exports, module2) {
    "use strict";
    var { groupRestore, nestedRestore } = require_modifiers();
    module2.exports = restorer;
    function restorer({ secret, wcLen }) {
      return function compileRestore() {
        if (this.restore)
          return;
        const paths = Object.keys(secret);
        const resetters = resetTmpl(secret, paths);
        const hasWildcards = wcLen > 0;
        const state = hasWildcards ? { secret, groupRestore, nestedRestore } : { secret };
        this.restore = Function("o", restoreTmpl(resetters, paths, hasWildcards)).bind(state);
      };
    }
    function resetTmpl(secret, paths) {
      return paths.map((path3) => {
        const { circle, escPath, leadingBracket } = secret[path3];
        const delim = leadingBracket ? "" : ".";
        const reset = circle ? `o.${circle} = secret[${escPath}].val` : `o${delim}${path3} = secret[${escPath}].val`;
        const clear = `secret[${escPath}].val = undefined`;
        return `
      if (secret[${escPath}].val !== undefined) {
        try { ${reset} } catch (e) {}
        ${clear}
      }
    `;
      }).join("");
    }
    function restoreTmpl(resetters, paths, hasWildcards) {
      const dynamicReset = hasWildcards === true ? `
    const keys = Object.keys(secret)
    const len = keys.length
    for (var i = len - 1; i >= ${paths.length}; i--) {
      const k = keys[i]
      const o = secret[k]
      if (o.flat === true) this.groupRestore(o)
      else this.nestedRestore(o)
      secret[k] = null
    }
  ` : "";
      return `
    const secret = this.secret
    ${dynamicReset}
    ${resetters}
    return o
  `;
    }
  }
});

// node_modules/fast-redact/lib/state.js
var require_state = __commonJS({
  "node_modules/fast-redact/lib/state.js"(exports, module2) {
    "use strict";
    module2.exports = state;
    function state(o) {
      const {
        secret,
        censor,
        compileRestore,
        serialize,
        groupRedact,
        nestedRedact,
        wildcards,
        wcLen
      } = o;
      const builder = [{ secret, censor, compileRestore }];
      if (serialize !== false)
        builder.push({ serialize });
      if (wcLen > 0)
        builder.push({ groupRedact, nestedRedact, wildcards, wcLen });
      return Object.assign(...builder);
    }
  }
});

// node_modules/fast-redact/index.js
var require_fast_redact = __commonJS({
  "node_modules/fast-redact/index.js"(exports, module2) {
    "use strict";
    var validator = require_validator();
    var parse5 = require_parse2();
    var redactor = require_redactor();
    var restorer = require_restorer();
    var { groupRedact, nestedRedact } = require_modifiers();
    var state = require_state();
    var rx = require_rx();
    var validate2 = validator();
    var noop = (o) => o;
    noop.restore = noop;
    var DEFAULT_CENSOR = "[REDACTED]";
    fastRedact.rx = rx;
    fastRedact.validator = validator;
    module2.exports = fastRedact;
    function fastRedact(opts = {}) {
      const paths = Array.from(new Set(opts.paths || []));
      const serialize = "serialize" in opts ? opts.serialize === false ? opts.serialize : typeof opts.serialize === "function" ? opts.serialize : JSON.stringify : JSON.stringify;
      const remove = opts.remove;
      if (remove === true && serialize !== JSON.stringify) {
        throw Error("fast-redact \u2013 remove option may only be set when serializer is JSON.stringify");
      }
      const censor = remove === true ? void 0 : "censor" in opts ? opts.censor : DEFAULT_CENSOR;
      const isCensorFct = typeof censor === "function";
      const censorFctTakesPath = isCensorFct && censor.length > 1;
      if (paths.length === 0)
        return serialize || noop;
      validate2({ paths, serialize, censor });
      const { wildcards, wcLen, secret } = parse5({ paths, censor });
      const compileRestore = restorer({ secret, wcLen });
      const strict = "strict" in opts ? opts.strict : true;
      return redactor({ secret, wcLen, serialize, strict, isCensorFct, censorFctTakesPath }, state({
        secret,
        censor,
        compileRestore,
        serialize,
        groupRedact,
        nestedRedact,
        wildcards,
        wcLen
      }));
    }
  }
});

// node_modules/pino/lib/symbols.js
var require_symbols = __commonJS({
  "node_modules/pino/lib/symbols.js"(exports, module2) {
    "use strict";
    var setLevelSym = Symbol("pino.setLevel");
    var getLevelSym = Symbol("pino.getLevel");
    var levelValSym = Symbol("pino.levelVal");
    var useLevelLabelsSym = Symbol("pino.useLevelLabels");
    var useOnlyCustomLevelsSym = Symbol("pino.useOnlyCustomLevels");
    var mixinSym = Symbol("pino.mixin");
    var lsCacheSym = Symbol("pino.lsCache");
    var chindingsSym = Symbol("pino.chindings");
    var parsedChindingsSym = Symbol("pino.parsedChindings");
    var asJsonSym = Symbol("pino.asJson");
    var writeSym = Symbol("pino.write");
    var redactFmtSym = Symbol("pino.redactFmt");
    var timeSym = Symbol("pino.time");
    var timeSliceIndexSym = Symbol("pino.timeSliceIndex");
    var streamSym = Symbol("pino.stream");
    var stringifySym = Symbol("pino.stringify");
    var stringifiersSym = Symbol("pino.stringifiers");
    var endSym = Symbol("pino.end");
    var formatOptsSym = Symbol("pino.formatOpts");
    var messageKeySym = Symbol("pino.messageKey");
    var nestedKeySym = Symbol("pino.nestedKey");
    var wildcardFirstSym = Symbol("pino.wildcardFirst");
    var serializersSym = Symbol.for("pino.serializers");
    var formattersSym = Symbol.for("pino.formatters");
    var hooksSym = Symbol.for("pino.hooks");
    var needsMetadataGsym = Symbol.for("pino.metadata");
    module2.exports = {
      setLevelSym,
      getLevelSym,
      levelValSym,
      useLevelLabelsSym,
      mixinSym,
      lsCacheSym,
      chindingsSym,
      parsedChindingsSym,
      asJsonSym,
      writeSym,
      serializersSym,
      redactFmtSym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      stringifySym,
      stringifiersSym,
      endSym,
      formatOptsSym,
      messageKeySym,
      nestedKeySym,
      wildcardFirstSym,
      needsMetadataGsym,
      useOnlyCustomLevelsSym,
      formattersSym,
      hooksSym
    };
  }
});

// node_modules/pino/lib/redaction.js
var require_redaction = __commonJS({
  "node_modules/pino/lib/redaction.js"(exports, module2) {
    "use strict";
    var fastRedact = require_fast_redact();
    var { redactFmtSym, wildcardFirstSym } = require_symbols();
    var { rx, validator } = fastRedact;
    var validate2 = validator({
      ERR_PATHS_MUST_BE_STRINGS: () => "pino \u2013 redacted paths must be strings",
      ERR_INVALID_PATH: (s) => `pino \u2013 redact paths array contains an invalid path (${s})`
    });
    var CENSOR = "[Redacted]";
    var strict = false;
    function redaction(opts, serialize) {
      const { paths, censor } = handle(opts);
      const shape = paths.reduce((o, str) => {
        rx.lastIndex = 0;
        const first2 = rx.exec(str);
        const next = rx.exec(str);
        let ns = first2[1] !== void 0 ? first2[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, "$1") : first2[0];
        if (ns === "*") {
          ns = wildcardFirstSym;
        }
        if (next === null) {
          o[ns] = null;
          return o;
        }
        if (o[ns] === null) {
          return o;
        }
        const { index } = next;
        const nextPath = `${str.substr(index, str.length - 1)}`;
        o[ns] = o[ns] || [];
        if (ns !== wildcardFirstSym && o[ns].length === 0) {
          o[ns].push(...o[wildcardFirstSym] || []);
        }
        if (ns === wildcardFirstSym) {
          Object.keys(o).forEach(function(k) {
            if (o[k]) {
              o[k].push(nextPath);
            }
          });
        }
        o[ns].push(nextPath);
        return o;
      }, {});
      const result = {
        [redactFmtSym]: fastRedact({ paths, censor, serialize, strict })
      };
      const topCensor = (...args) => {
        return typeof censor === "function" ? serialize(censor(...args)) : serialize(censor);
      };
      return [...Object.keys(shape), ...Object.getOwnPropertySymbols(shape)].reduce((o, k) => {
        if (shape[k] === null) {
          o[k] = (value) => topCensor(value, [k]);
        } else {
          const wrappedCensor = typeof censor === "function" ? (value, path3) => {
            return censor(value, [k, ...path3]);
          } : censor;
          o[k] = fastRedact({
            paths: shape[k],
            censor: wrappedCensor,
            serialize,
            strict
          });
        }
        return o;
      }, result);
    }
    function handle(opts) {
      if (Array.isArray(opts)) {
        opts = { paths: opts, censor: CENSOR };
        validate2(opts);
        return opts;
      }
      let { paths, censor = CENSOR, remove } = opts;
      if (Array.isArray(paths) === false) {
        throw Error("pino \u2013 redact must contain an array of strings");
      }
      if (remove === true)
        censor = void 0;
      validate2({ paths, censor });
      return { paths, censor };
    }
    module2.exports = redaction;
  }
});

// node_modules/pino/lib/time.js
var require_time = __commonJS({
  "node_modules/pino/lib/time.js"(exports, module2) {
    "use strict";
    var nullTime = () => "";
    var epochTime = () => `,"time":${Date.now()}`;
    var unixTime = () => `,"time":${Math.round(Date.now() / 1e3)}`;
    var isoTime = () => `,"time":"${new Date(Date.now()).toISOString()}"`;
    module2.exports = { nullTime, epochTime, unixTime, isoTime };
  }
});

// node_modules/flatstr/index.js
var require_flatstr = __commonJS({
  "node_modules/flatstr/index.js"(exports, module2) {
    "use strict";
    function flatstr(s) {
      s | 0;
      return s;
    }
    module2.exports = flatstr;
  }
});

// node_modules/atomic-sleep/index.js
var require_atomic_sleep = __commonJS({
  "node_modules/atomic-sleep/index.js"(exports, module2) {
    "use strict";
    if (typeof SharedArrayBuffer !== "undefined" && typeof Atomics !== "undefined") {
      let sleep = function(ms) {
        const valid = ms > 0 && ms < Infinity;
        if (valid === false) {
          if (typeof ms !== "number" && typeof ms !== "bigint") {
            throw TypeError("sleep: ms must be a number");
          }
          throw RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
        }
        Atomics.wait(nil, 0, 0, Number(ms));
      };
      const nil = new Int32Array(new SharedArrayBuffer(4));
      module2.exports = sleep;
    } else {
      let sleep = function(ms) {
        const valid = ms > 0 && ms < Infinity;
        if (valid === false) {
          if (typeof ms !== "number" && typeof ms !== "bigint") {
            throw TypeError("sleep: ms must be a number");
          }
          throw RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
        }
        const target = Date.now() + Number(ms);
        while (target > Date.now()) {
        }
      };
      module2.exports = sleep;
    }
  }
});

// node_modules/sonic-boom/index.js
var require_sonic_boom = __commonJS({
  "node_modules/sonic-boom/index.js"(exports, module2) {
    "use strict";
    var fs = require("fs");
    var EventEmitter = require("events");
    var flatstr = require_flatstr();
    var inherits = require("util").inherits;
    var BUSY_WRITE_TIMEOUT = 100;
    var sleep = require_atomic_sleep();
    var MAX_WRITE = 16 * 1024 * 1024;
    function openFile(file, sonic) {
      sonic._opening = true;
      sonic._writing = true;
      sonic._asyncDrainScheduled = false;
      function fileOpened(err, fd) {
        if (err) {
          sonic._reopening = false;
          sonic._writing = false;
          sonic._opening = false;
          if (sonic.sync) {
            process.nextTick(() => {
              if (sonic.listenerCount("error") > 0) {
                sonic.emit("error", err);
              }
            });
          } else {
            sonic.emit("error", err);
          }
          return;
        }
        sonic.fd = fd;
        sonic.file = file;
        sonic._reopening = false;
        sonic._opening = false;
        sonic._writing = false;
        if (sonic.sync) {
          process.nextTick(() => sonic.emit("ready"));
        } else {
          sonic.emit("ready");
        }
        if (sonic._reopening) {
          return;
        }
        const len = sonic._buf.length;
        if (len > 0 && len > sonic.minLength && !sonic.destroyed) {
          actualWrite(sonic);
        }
      }
      if (sonic.sync) {
        try {
          const fd = fs.openSync(file, "a");
          fileOpened(null, fd);
        } catch (err) {
          fileOpened(err);
          throw err;
        }
      } else {
        fs.open(file, "a", fileOpened);
      }
    }
    function SonicBoom(opts) {
      if (!(this instanceof SonicBoom)) {
        return new SonicBoom(opts);
      }
      let { fd, dest, minLength, sync } = opts || {};
      fd = fd || dest;
      this._buf = "";
      this.fd = -1;
      this._writing = false;
      this._writingBuf = "";
      this._ending = false;
      this._reopening = false;
      this._asyncDrainScheduled = false;
      this.file = null;
      this.destroyed = false;
      this.sync = sync || false;
      this.minLength = minLength || 0;
      if (typeof fd === "number") {
        this.fd = fd;
        process.nextTick(() => this.emit("ready"));
      } else if (typeof fd === "string") {
        openFile(fd, this);
      } else {
        throw new Error("SonicBoom supports only file descriptors and files");
      }
      this.release = (err, n) => {
        if (err) {
          if (err.code === "EAGAIN") {
            if (this.sync) {
              try {
                sleep(BUSY_WRITE_TIMEOUT);
                this.release(void 0, 0);
              } catch (err2) {
                this.release(err2);
              }
            } else {
              setTimeout(() => {
                fs.write(this.fd, this._writingBuf, "utf8", this.release);
              }, BUSY_WRITE_TIMEOUT);
            }
          } else {
            this._buf = this._writingBuf + this._buf;
            this._writingBuf = "";
            this._writing = false;
            this.emit("error", err);
          }
          return;
        }
        if (this._writingBuf.length !== n) {
          this._writingBuf = this._writingBuf.slice(n);
          if (this.sync) {
            try {
              do {
                n = fs.writeSync(this.fd, this._writingBuf, "utf8");
                this._writingBuf = this._writingBuf.slice(n);
              } while (this._writingBuf.length !== 0);
            } catch (err2) {
              this.release(err2);
              return;
            }
          } else {
            fs.write(this.fd, this._writingBuf, "utf8", this.release);
            return;
          }
        }
        this._writingBuf = "";
        if (this.destroyed) {
          return;
        }
        const len = this._buf.length;
        if (this._reopening) {
          this._writing = false;
          this._reopening = false;
          this.reopen();
        } else if (len > 0 && len > this.minLength) {
          actualWrite(this);
        } else if (this._ending) {
          if (len > 0) {
            actualWrite(this);
          } else {
            this._writing = false;
            actualClose(this);
          }
        } else {
          this._writing = false;
          if (this.sync) {
            if (!this._asyncDrainScheduled) {
              this._asyncDrainScheduled = true;
              process.nextTick(emitDrain, this);
            }
          } else {
            this.emit("drain");
          }
        }
      };
      this.on("newListener", function(name) {
        if (name === "drain") {
          this._asyncDrainScheduled = false;
        }
      });
    }
    function emitDrain(sonic) {
      const hasListeners = sonic.listenerCount("drain") > 0;
      if (!hasListeners)
        return;
      sonic._asyncDrainScheduled = false;
      sonic.emit("drain");
    }
    inherits(SonicBoom, EventEmitter);
    SonicBoom.prototype.write = function(data) {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      this._buf += data;
      const len = this._buf.length;
      if (!this._writing && len > this.minLength) {
        actualWrite(this);
      }
      return len < 16384;
    };
    SonicBoom.prototype.flush = function() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this._writing || this.minLength <= 0) {
        return;
      }
      actualWrite(this);
    };
    SonicBoom.prototype.reopen = function(file) {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this._opening) {
        this.once("ready", () => {
          this.reopen(file);
        });
        return;
      }
      if (this._ending) {
        return;
      }
      if (!this.file) {
        throw new Error("Unable to reopen a file descriptor, you must pass a file to SonicBoom");
      }
      this._reopening = true;
      if (this._writing) {
        return;
      }
      const fd = this.fd;
      this.once("ready", () => {
        if (fd !== this.fd) {
          fs.close(fd, (err) => {
            if (err) {
              return this.emit("error", err);
            }
          });
        }
      });
      openFile(file || this.file, this);
    };
    SonicBoom.prototype.end = function() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this._opening) {
        this.once("ready", () => {
          this.end();
        });
        return;
      }
      if (this._ending) {
        return;
      }
      this._ending = true;
      if (!this._writing && this._buf.length > 0 && this.fd >= 0) {
        actualWrite(this);
        return;
      }
      if (this._writing) {
        return;
      }
      actualClose(this);
    };
    SonicBoom.prototype.flushSync = function() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this.fd < 0) {
        throw new Error("sonic boom is not ready yet");
      }
      while (this._buf.length > 0) {
        try {
          fs.writeSync(this.fd, this._buf, "utf8");
          this._buf = "";
        } catch (err) {
          if (err.code !== "EAGAIN") {
            throw err;
          }
          sleep(BUSY_WRITE_TIMEOUT);
        }
      }
    };
    SonicBoom.prototype.destroy = function() {
      if (this.destroyed) {
        return;
      }
      actualClose(this);
    };
    function actualWrite(sonic) {
      sonic._writing = true;
      let buf = sonic._buf;
      const release = sonic.release;
      if (buf.length > MAX_WRITE) {
        buf = buf.slice(0, MAX_WRITE);
        sonic._buf = sonic._buf.slice(MAX_WRITE);
      } else {
        sonic._buf = "";
      }
      flatstr(buf);
      sonic._writingBuf = buf;
      if (sonic.sync) {
        try {
          const written = fs.writeSync(sonic.fd, buf, "utf8");
          release(null, written);
        } catch (err) {
          release(err);
        }
      } else {
        fs.write(sonic.fd, buf, "utf8", release);
      }
    }
    function actualClose(sonic) {
      if (sonic.fd === -1) {
        sonic.once("ready", actualClose.bind(null, sonic));
        return;
      }
      fs.close(sonic.fd, (err) => {
        if (err) {
          sonic.emit("error", err);
          return;
        }
        if (sonic._ending && !sonic._writing) {
          sonic.emit("finish");
        }
        sonic.emit("close");
      });
      sonic.destroyed = true;
      sonic._buf = "";
    }
    module2.exports = SonicBoom;
  }
});

// node_modules/fastify-warning/index.js
var require_fastify_warning = __commonJS({
  "node_modules/fastify-warning/index.js"(exports, module2) {
    "use strict";
    var { format } = require("util");
    function build2() {
      const codes = {};
      const emitted = /* @__PURE__ */ new Map();
      function create(name, code, message) {
        if (!name)
          throw new Error("Fastify warning name must not be empty");
        if (!code)
          throw new Error("Fastify warning code must not be empty");
        if (!message)
          throw new Error("Fastify warning message must not be empty");
        code = code.toUpperCase();
        if (codes[code] !== void 0) {
          throw new Error(`The code '${code}' already exist`);
        }
        function buildWarnOpts(a, b, c) {
          let formatted;
          if (a && b && c) {
            formatted = format(message, a, b, c);
          } else if (a && b) {
            formatted = format(message, a, b);
          } else if (a) {
            formatted = format(message, a);
          } else {
            formatted = message;
          }
          return {
            code,
            name,
            message: formatted
          };
        }
        emitted.set(code, false);
        codes[code] = buildWarnOpts;
        return codes[code];
      }
      function emit(code, a, b, c) {
        if (codes[code] === void 0)
          throw new Error(`The code '${code}' does not exist`);
        if (emitted.get(code) === true)
          return;
        emitted.set(code, true);
        const warning = codes[code](a, b, c);
        process.emitWarning(warning.message, warning.name, warning.code);
      }
      return {
        create,
        emit,
        emitted
      };
    }
    module2.exports = build2;
  }
});

// node_modules/pino/lib/deprecations.js
var require_deprecations = __commonJS({
  "node_modules/pino/lib/deprecations.js"(exports, module2) {
    "use strict";
    var warning = require_fastify_warning()();
    module2.exports = warning;
    var warnName = "PinoWarning";
    warning.create(warnName, "PINODEP004", "bindings.serializers is deprecated, use options.serializers option instead");
    warning.create(warnName, "PINODEP005", "bindings.formatters is deprecated, use options.formatters option instead");
    warning.create(warnName, "PINODEP006", "bindings.customLevels is deprecated, use options.customLevels option instead");
    warning.create(warnName, "PINODEP007", "bindings.level is deprecated, use options.level option instead");
  }
});

// node_modules/quick-format-unescaped/index.js
var require_quick_format_unescaped = __commonJS({
  "node_modules/quick-format-unescaped/index.js"(exports, module2) {
    "use strict";
    function tryStringify(o) {
      try {
        return JSON.stringify(o);
      } catch (e) {
        return '"[Circular]"';
      }
    }
    module2.exports = format;
    function format(f, args, opts) {
      var ss = opts && opts.stringify || tryStringify;
      var offset = 1;
      if (typeof f === "object" && f !== null) {
        var len = args.length + offset;
        if (len === 1)
          return f;
        var objects = new Array(len);
        objects[0] = ss(f);
        for (var index = 1; index < len; index++) {
          objects[index] = ss(args[index]);
        }
        return objects.join(" ");
      }
      if (typeof f !== "string") {
        return f;
      }
      var argLen = args.length;
      if (argLen === 0)
        return f;
      var str = "";
      var a = 1 - offset;
      var lastPos = -1;
      var flen = f && f.length || 0;
      for (var i = 0; i < flen; ) {
        if (f.charCodeAt(i) === 37 && i + 1 < flen) {
          lastPos = lastPos > -1 ? lastPos : 0;
          switch (f.charCodeAt(i + 1)) {
            case 100:
            case 102:
              if (a >= argLen)
                break;
              if (args[a] == null)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += Number(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 105:
              if (a >= argLen)
                break;
              if (args[a] == null)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += Math.floor(Number(args[a]));
              lastPos = i + 2;
              i++;
              break;
            case 79:
            case 111:
            case 106:
              if (a >= argLen)
                break;
              if (args[a] === void 0)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              var type = typeof args[a];
              if (type === "string") {
                str += "'" + args[a] + "'";
                lastPos = i + 2;
                i++;
                break;
              }
              if (type === "function") {
                str += args[a].name || "<anonymous>";
                lastPos = i + 2;
                i++;
                break;
              }
              str += ss(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 115:
              if (a >= argLen)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += String(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 37:
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += "%";
              lastPos = i + 2;
              i++;
              a--;
              break;
          }
          ++a;
        }
        ++i;
      }
      if (lastPos === -1)
        return f;
      else if (lastPos < flen) {
        str += f.slice(lastPos);
      }
      return str;
    }
  }
});

// node_modules/fast-safe-stringify/index.js
var require_fast_safe_stringify = __commonJS({
  "node_modules/fast-safe-stringify/index.js"(exports, module2) {
    module2.exports = stringify3;
    stringify3.default = stringify3;
    stringify3.stable = deterministicStringify;
    stringify3.stableStringify = deterministicStringify;
    var LIMIT_REPLACE_NODE = "[...]";
    var CIRCULAR_REPLACE_NODE = "[Circular]";
    var arr = [];
    var replacerStack = [];
    function defaultOptions() {
      return {
        depthLimit: Number.MAX_SAFE_INTEGER,
        edgesLimit: Number.MAX_SAFE_INTEGER
      };
    }
    function stringify3(obj, replacer, spacer, options) {
      if (typeof options === "undefined") {
        options = defaultOptions();
      }
      decirc(obj, "", 0, [], void 0, 0, options);
      var res;
      try {
        if (replacerStack.length === 0) {
          res = JSON.stringify(obj, replacer, spacer);
        } else {
          res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
        }
      } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
      } finally {
        while (arr.length !== 0) {
          var part = arr.pop();
          if (part.length === 4) {
            Object.defineProperty(part[0], part[1], part[3]);
          } else {
            part[0][part[1]] = part[2];
          }
        }
      }
      return res;
    }
    function setReplace(replace, val, k, parent) {
      var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
      if (propertyDescriptor.get !== void 0) {
        if (propertyDescriptor.configurable) {
          Object.defineProperty(parent, k, { value: replace });
          arr.push([parent, k, val, propertyDescriptor]);
        } else {
          replacerStack.push([val, k, replace]);
        }
      } else {
        parent[k] = replace;
        arr.push([parent, k, val]);
      }
    }
    function decirc(val, k, edgeIndex, stack, parent, depth, options) {
      depth += 1;
      var i;
      if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
          if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
          }
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        stack.push(val);
        if (Array.isArray(val)) {
          for (i = 0; i < val.length; i++) {
            decirc(val[i], i, i, stack, val, depth, options);
          }
        } else {
          var keys = Object.keys(val);
          for (i = 0; i < keys.length; i++) {
            var key2 = keys[i];
            decirc(val[key2], key2, i, stack, val, depth, options);
          }
        }
        stack.pop();
      }
    }
    function compareFunction(a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }
    function deterministicStringify(obj, replacer, spacer, options) {
      if (typeof options === "undefined") {
        options = defaultOptions();
      }
      var tmp = deterministicDecirc(obj, "", 0, [], void 0, 0, options) || obj;
      var res;
      try {
        if (replacerStack.length === 0) {
          res = JSON.stringify(tmp, replacer, spacer);
        } else {
          res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
        }
      } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
      } finally {
        while (arr.length !== 0) {
          var part = arr.pop();
          if (part.length === 4) {
            Object.defineProperty(part[0], part[1], part[3]);
          } else {
            part[0][part[1]] = part[2];
          }
        }
      }
      return res;
    }
    function deterministicDecirc(val, k, edgeIndex, stack, parent, depth, options) {
      depth += 1;
      var i;
      if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
          if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
          }
        }
        try {
          if (typeof val.toJSON === "function") {
            return;
          }
        } catch (_) {
          return;
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        stack.push(val);
        if (Array.isArray(val)) {
          for (i = 0; i < val.length; i++) {
            deterministicDecirc(val[i], i, i, stack, val, depth, options);
          }
        } else {
          var tmp = {};
          var keys = Object.keys(val).sort(compareFunction);
          for (i = 0; i < keys.length; i++) {
            var key2 = keys[i];
            deterministicDecirc(val[key2], key2, i, stack, val, depth, options);
            tmp[key2] = val[key2];
          }
          if (typeof parent !== "undefined") {
            arr.push([parent, k, val]);
            parent[k] = tmp;
          } else {
            return tmp;
          }
        }
        stack.pop();
      }
    }
    function replaceGetterValues(replacer) {
      replacer = typeof replacer !== "undefined" ? replacer : function(k, v) {
        return v;
      };
      return function(key2, val) {
        if (replacerStack.length > 0) {
          for (var i = 0; i < replacerStack.length; i++) {
            var part = replacerStack[i];
            if (part[1] === key2 && part[0] === val) {
              val = part[2];
              replacerStack.splice(i, 1);
              break;
            }
          }
        }
        return replacer.call(this, key2, val);
      };
    }
  }
});

// node_modules/pino/lib/tools.js
var require_tools = __commonJS({
  "node_modules/pino/lib/tools.js"(exports, module2) {
    "use strict";
    var format = require_quick_format_unescaped();
    var { mapHttpRequest, mapHttpResponse } = require_pino_std_serializers();
    var SonicBoom = require_sonic_boom();
    var stringifySafe = require_fast_safe_stringify();
    var {
      lsCacheSym,
      chindingsSym,
      parsedChindingsSym,
      writeSym,
      serializersSym,
      formatOptsSym,
      endSym,
      stringifiersSym,
      stringifySym,
      wildcardFirstSym,
      needsMetadataGsym,
      redactFmtSym,
      streamSym,
      nestedKeySym,
      formattersSym,
      messageKeySym
    } = require_symbols();
    function noop() {
    }
    function genLog(level, hook) {
      if (!hook)
        return LOG;
      return function hookWrappedLog(...args) {
        hook.call(this, args, LOG, level);
      };
      function LOG(o, ...n) {
        if (typeof o === "object") {
          let msg = o;
          if (o !== null) {
            if (o.method && o.headers && o.socket) {
              o = mapHttpRequest(o);
            } else if (typeof o.setHeader === "function") {
              o = mapHttpResponse(o);
            }
          }
          if (this[nestedKeySym])
            o = { [this[nestedKeySym]]: o };
          let formatParams;
          if (msg === null && n.length === 0) {
            formatParams = [null];
          } else {
            msg = n.shift();
            formatParams = n;
          }
          this[writeSym](o, format(msg, formatParams, this[formatOptsSym]), level);
        } else {
          this[writeSym](null, format(o, n, this[formatOptsSym]), level);
        }
      }
    }
    function asString(str) {
      let result = "";
      let last = 0;
      let found = false;
      let point = 255;
      const l = str.length;
      if (l > 100) {
        return JSON.stringify(str);
      }
      for (var i = 0; i < l && point >= 32; i++) {
        point = str.charCodeAt(i);
        if (point === 34 || point === 92) {
          result += str.slice(last, i) + "\\";
          last = i;
          found = true;
        }
      }
      if (!found) {
        result = str;
      } else {
        result += str.slice(last);
      }
      return point < 32 ? JSON.stringify(str) : '"' + result + '"';
    }
    function asJson(obj, msg, num, time) {
      const stringify4 = this[stringifySym];
      const stringifiers = this[stringifiersSym];
      const end = this[endSym];
      const chindings = this[chindingsSym];
      const serializers = this[serializersSym];
      const formatters = this[formattersSym];
      const messageKey = this[messageKeySym];
      let data = this[lsCacheSym][num] + time;
      data = data + chindings;
      let value;
      const notHasOwnProperty = obj.hasOwnProperty === void 0;
      if (formatters.log) {
        obj = formatters.log(obj);
      }
      if (msg !== void 0) {
        obj[messageKey] = msg;
      }
      const wildcardStringifier = stringifiers[wildcardFirstSym];
      for (const key2 in obj) {
        value = obj[key2];
        if ((notHasOwnProperty || obj.hasOwnProperty(key2)) && value !== void 0) {
          value = serializers[key2] ? serializers[key2](value) : value;
          const stringifier = stringifiers[key2] || wildcardStringifier;
          switch (typeof value) {
            case "undefined":
            case "function":
              continue;
            case "number":
              if (Number.isFinite(value) === false) {
                value = null;
              }
            case "boolean":
              if (stringifier)
                value = stringifier(value);
              break;
            case "string":
              value = (stringifier || asString)(value);
              break;
            default:
              value = (stringifier || stringify4)(value);
          }
          if (value === void 0)
            continue;
          data += ',"' + key2 + '":' + value;
        }
      }
      return data + end;
    }
    function asChindings(instance2, bindings) {
      let value;
      let data = instance2[chindingsSym];
      const stringify4 = instance2[stringifySym];
      const stringifiers = instance2[stringifiersSym];
      const wildcardStringifier = stringifiers[wildcardFirstSym];
      const serializers = instance2[serializersSym];
      const formatter = instance2[formattersSym].bindings;
      bindings = formatter(bindings);
      for (const key2 in bindings) {
        value = bindings[key2];
        const valid = key2 !== "level" && key2 !== "serializers" && key2 !== "formatters" && key2 !== "customLevels" && bindings.hasOwnProperty(key2) && value !== void 0;
        if (valid === true) {
          value = serializers[key2] ? serializers[key2](value) : value;
          value = (stringifiers[key2] || wildcardStringifier || stringify4)(value);
          if (value === void 0)
            continue;
          data += ',"' + key2 + '":' + value;
        }
      }
      return data;
    }
    function getPrettyStream(opts, prettifier, dest, instance2) {
      if (prettifier && typeof prettifier === "function") {
        prettifier = prettifier.bind(instance2);
        return prettifierMetaWrapper(prettifier(opts), dest, opts);
      }
      try {
        const prettyFactory = require("pino-pretty").prettyFactory || require("pino-pretty");
        prettyFactory.asMetaWrapper = prettifierMetaWrapper;
        return prettifierMetaWrapper(prettyFactory(opts), dest, opts);
      } catch (e) {
        if (e.message.startsWith("Cannot find module 'pino-pretty'")) {
          throw Error("Missing `pino-pretty` module: `pino-pretty` must be installed separately");
        }
        ;
        throw e;
      }
    }
    function prettifierMetaWrapper(pretty, dest, opts) {
      opts = Object.assign({ suppressFlushSyncWarning: false }, opts);
      let warned = false;
      return {
        [needsMetadataGsym]: true,
        lastLevel: 0,
        lastMsg: null,
        lastObj: null,
        lastLogger: null,
        flushSync() {
          if (opts.suppressFlushSyncWarning || warned) {
            return;
          }
          warned = true;
          setMetadataProps(dest, this);
          dest.write(pretty(Object.assign({
            level: 40,
            msg: "pino.final with prettyPrint does not support flushing",
            time: Date.now()
          }, this.chindings())));
        },
        chindings() {
          const lastLogger = this.lastLogger;
          let chindings = null;
          if (!lastLogger) {
            return null;
          }
          if (lastLogger.hasOwnProperty(parsedChindingsSym)) {
            chindings = lastLogger[parsedChindingsSym];
          } else {
            chindings = JSON.parse("{" + lastLogger[chindingsSym].substr(1) + "}");
            lastLogger[parsedChindingsSym] = chindings;
          }
          return chindings;
        },
        write(chunk) {
          const lastLogger = this.lastLogger;
          const chindings = this.chindings();
          let time = this.lastTime;
          if (time.match(/^\d+/)) {
            time = parseInt(time);
          } else {
            time = time.slice(1, -1);
          }
          const lastObj = this.lastObj;
          const lastMsg = this.lastMsg;
          const errorProps = null;
          const formatters = lastLogger[formattersSym];
          const formattedObj = formatters.log ? formatters.log(lastObj) : lastObj;
          const messageKey = lastLogger[messageKeySym];
          if (lastMsg && formattedObj && !formattedObj.hasOwnProperty(messageKey)) {
            formattedObj[messageKey] = lastMsg;
          }
          const obj = Object.assign({
            level: this.lastLevel,
            time
          }, formattedObj, errorProps);
          const serializers = lastLogger[serializersSym];
          const keys = Object.keys(serializers);
          for (var i = 0; i < keys.length; i++) {
            const key2 = keys[i];
            if (obj[key2] !== void 0) {
              obj[key2] = serializers[key2](obj[key2]);
            }
          }
          for (const key2 in chindings) {
            if (!obj.hasOwnProperty(key2)) {
              obj[key2] = chindings[key2];
            }
          }
          const stringifiers = lastLogger[stringifiersSym];
          const redact = stringifiers[redactFmtSym];
          const formatted = pretty(typeof redact === "function" ? redact(obj) : obj);
          if (formatted === void 0)
            return;
          setMetadataProps(dest, this);
          dest.write(formatted);
        }
      };
    }
    function hasBeenTampered(stream) {
      return stream.write !== stream.constructor.prototype.write;
    }
    function buildSafeSonicBoom(opts) {
      const stream = new SonicBoom(opts);
      stream.on("error", filterBrokenPipe);
      return stream;
      function filterBrokenPipe(err) {
        if (err.code === "EPIPE") {
          stream.write = noop;
          stream.end = noop;
          stream.flushSync = noop;
          stream.destroy = noop;
          return;
        }
        stream.removeListener("error", filterBrokenPipe);
        stream.emit("error", err);
      }
    }
    function createArgsNormalizer(defaultOptions) {
      return function normalizeArgs(instance2, opts = {}, stream) {
        if (typeof opts === "string") {
          stream = buildSafeSonicBoom({ dest: opts, sync: true });
          opts = {};
        } else if (typeof stream === "string") {
          stream = buildSafeSonicBoom({ dest: stream, sync: true });
        } else if (opts instanceof SonicBoom || opts.writable || opts._writableState) {
          stream = opts;
          opts = null;
        }
        opts = Object.assign({}, defaultOptions, opts);
        if ("extreme" in opts) {
          throw Error("The extreme option has been removed, use pino.destination({ sync: false }) instead");
        }
        if ("onTerminated" in opts) {
          throw Error("The onTerminated option has been removed, use pino.final instead");
        }
        if ("changeLevelName" in opts) {
          process.emitWarning("The changeLevelName option is deprecated and will be removed in v7. Use levelKey instead.", { code: "changeLevelName_deprecation" });
          opts.levelKey = opts.changeLevelName;
          delete opts.changeLevelName;
        }
        const { enabled, prettyPrint, prettifier, messageKey } = opts;
        if (enabled === false)
          opts.level = "silent";
        stream = stream || process.stdout;
        if (stream === process.stdout && stream.fd >= 0 && !hasBeenTampered(stream)) {
          stream = buildSafeSonicBoom({ fd: stream.fd, sync: true });
        }
        if (prettyPrint) {
          const prettyOpts = Object.assign({ messageKey }, prettyPrint);
          stream = getPrettyStream(prettyOpts, prettifier, stream, instance2);
        }
        return { opts, stream };
      };
    }
    function final(logger2, handler2) {
      if (typeof logger2 === "undefined" || typeof logger2.child !== "function") {
        throw Error("expected a pino logger instance");
      }
      const hasHandler = typeof handler2 !== "undefined";
      if (hasHandler && typeof handler2 !== "function") {
        throw Error("if supplied, the handler parameter should be a function");
      }
      const stream = logger2[streamSym];
      if (typeof stream.flushSync !== "function") {
        throw Error("final requires a stream that has a flushSync method, such as pino.destination");
      }
      const finalLogger = new Proxy(logger2, {
        get: (logger3, key2) => {
          if (key2 in logger3.levels.values) {
            return (...args) => {
              logger3[key2](...args);
              stream.flushSync();
            };
          }
          return logger3[key2];
        }
      });
      if (!hasHandler) {
        return finalLogger;
      }
      return (err = null, ...args) => {
        try {
          stream.flushSync();
        } catch (e) {
        }
        return handler2(err, finalLogger, ...args);
      };
    }
    function stringify3(obj) {
      try {
        return JSON.stringify(obj);
      } catch (_) {
        return stringifySafe(obj);
      }
    }
    function buildFormatters(level, bindings, log) {
      return {
        level,
        bindings,
        log
      };
    }
    function setMetadataProps(dest, that) {
      if (dest[needsMetadataGsym] === true) {
        dest.lastLevel = that.lastLevel;
        dest.lastMsg = that.lastMsg;
        dest.lastObj = that.lastObj;
        dest.lastTime = that.lastTime;
        dest.lastLogger = that.lastLogger;
      }
    }
    module2.exports = {
      noop,
      buildSafeSonicBoom,
      getPrettyStream,
      asChindings,
      asJson,
      genLog,
      createArgsNormalizer,
      final,
      stringify: stringify3,
      buildFormatters
    };
  }
});

// node_modules/pino/lib/levels.js
var require_levels = __commonJS({
  "node_modules/pino/lib/levels.js"(exports, module2) {
    "use strict";
    var flatstr = require_flatstr();
    var {
      lsCacheSym,
      levelValSym,
      useOnlyCustomLevelsSym,
      streamSym,
      formattersSym,
      hooksSym
    } = require_symbols();
    var { noop, genLog } = require_tools();
    var levels = {
      trace: 10,
      debug: 20,
      info: 30,
      warn: 40,
      error: 50,
      fatal: 60
    };
    var levelMethods = {
      fatal: (hook) => {
        const logFatal = genLog(levels.fatal, hook);
        return function(...args) {
          const stream = this[streamSym];
          logFatal.call(this, ...args);
          if (typeof stream.flushSync === "function") {
            try {
              stream.flushSync();
            } catch (e) {
            }
          }
        };
      },
      error: (hook) => genLog(levels.error, hook),
      warn: (hook) => genLog(levels.warn, hook),
      info: (hook) => genLog(levels.info, hook),
      debug: (hook) => genLog(levels.debug, hook),
      trace: (hook) => genLog(levels.trace, hook)
    };
    var nums = Object.keys(levels).reduce((o, k) => {
      o[levels[k]] = k;
      return o;
    }, {});
    var initialLsCache = Object.keys(nums).reduce((o, k) => {
      o[k] = flatstr('{"level":' + Number(k));
      return o;
    }, {});
    function genLsCache(instance2) {
      const formatter = instance2[formattersSym].level;
      const { labels } = instance2.levels;
      const cache = {};
      for (const label in labels) {
        const level = formatter(labels[label], Number(label));
        cache[label] = JSON.stringify(level).slice(0, -1);
      }
      instance2[lsCacheSym] = cache;
      return instance2;
    }
    function isStandardLevel(level, useOnlyCustomLevels) {
      if (useOnlyCustomLevels) {
        return false;
      }
      switch (level) {
        case "fatal":
        case "error":
        case "warn":
        case "info":
        case "debug":
        case "trace":
          return true;
        default:
          return false;
      }
    }
    function setLevel(level) {
      const { labels, values } = this.levels;
      if (typeof level === "number") {
        if (labels[level] === void 0)
          throw Error("unknown level value" + level);
        level = labels[level];
      }
      if (values[level] === void 0)
        throw Error("unknown level " + level);
      const preLevelVal = this[levelValSym];
      const levelVal = this[levelValSym] = values[level];
      const useOnlyCustomLevelsVal = this[useOnlyCustomLevelsSym];
      const hook = this[hooksSym].logMethod;
      for (const key2 in values) {
        if (levelVal > values[key2]) {
          this[key2] = noop;
          continue;
        }
        this[key2] = isStandardLevel(key2, useOnlyCustomLevelsVal) ? levelMethods[key2](hook) : genLog(values[key2], hook);
      }
      this.emit("level-change", level, levelVal, labels[preLevelVal], preLevelVal);
    }
    function getLevel(level) {
      const { levels: levels2, levelVal } = this;
      return levels2 && levels2.labels ? levels2.labels[levelVal] : "";
    }
    function isLevelEnabled(logLevel) {
      const { values } = this.levels;
      const logLevelVal = values[logLevel];
      return logLevelVal !== void 0 && logLevelVal >= this[levelValSym];
    }
    function mappings(customLevels = null, useOnlyCustomLevels = false) {
      const customNums = customLevels ? Object.keys(customLevels).reduce((o, k) => {
        o[customLevels[k]] = k;
        return o;
      }, {}) : null;
      const labels = Object.assign(Object.create(Object.prototype, { Infinity: { value: "silent" } }), useOnlyCustomLevels ? null : nums, customNums);
      const values = Object.assign(Object.create(Object.prototype, { silent: { value: Infinity } }), useOnlyCustomLevels ? null : levels, customLevels);
      return { labels, values };
    }
    function assertDefaultLevelFound(defaultLevel, customLevels, useOnlyCustomLevels) {
      if (typeof defaultLevel === "number") {
        const values = [].concat(Object.keys(customLevels || {}).map((key2) => customLevels[key2]), useOnlyCustomLevels ? [] : Object.keys(nums).map((level) => +level), Infinity);
        if (!values.includes(defaultLevel)) {
          throw Error(`default level:${defaultLevel} must be included in custom levels`);
        }
        return;
      }
      const labels = Object.assign(Object.create(Object.prototype, { silent: { value: Infinity } }), useOnlyCustomLevels ? null : levels, customLevels);
      if (!(defaultLevel in labels)) {
        throw Error(`default level:${defaultLevel} must be included in custom levels`);
      }
    }
    function assertNoLevelCollisions(levels2, customLevels) {
      const { labels, values } = levels2;
      for (const k in customLevels) {
        if (k in values) {
          throw Error("levels cannot be overridden");
        }
        if (customLevels[k] in labels) {
          throw Error("pre-existing level values cannot be used for new levels");
        }
      }
    }
    module2.exports = {
      initialLsCache,
      genLsCache,
      levelMethods,
      getLevel,
      setLevel,
      isLevelEnabled,
      mappings,
      assertNoLevelCollisions,
      assertDefaultLevelFound
    };
  }
});

// node_modules/pino/package.json
var require_package = __commonJS({
  "node_modules/pino/package.json"(exports, module2) {
    module2.exports = {
      _args: [
        [
          "pino@6.13.3",
          "/home/runner/work/xdn/xdn/packages/core"
        ]
      ],
      _from: "pino@6.13.3",
      _id: "pino@6.13.3",
      _inBundle: false,
      _integrity: "sha512-tJy6qVgkh9MwNgqX1/oYi3ehfl2Y9H0uHyEEMsBe74KinESIjdMrMQDWpcZPpPicg3VV35d/GLQZmo4QgU2Xkg==",
      _location: "/pino",
      _phantomChildren: {},
      _requested: {
        type: "version",
        registry: true,
        raw: "pino@6.13.3",
        name: "pino",
        escapedName: "pino",
        rawSpec: "6.13.3",
        saveSpec: null,
        fetchSpec: "6.13.3"
      },
      _requiredBy: [
        "/"
      ],
      _resolved: "https://registry.npmjs.org/pino/-/pino-6.13.3.tgz",
      _spec: "6.13.3",
      _where: "/home/runner/work/xdn/xdn/packages/core",
      author: {
        name: "Matteo Collina",
        email: "hello@matteocollina.com"
      },
      bin: {
        pino: "bin.js"
      },
      browser: "./browser.js",
      bugs: {
        url: "https://github.com/pinojs/pino/issues"
      },
      contributors: [
        {
          name: "David Mark Clements",
          email: "huperekchuno@googlemail.com"
        },
        {
          name: "James Sumners",
          email: "james.sumners@gmail.com"
        },
        {
          name: "Thomas Watson Steen",
          email: "w@tson.dk",
          url: "https://twitter.com/wa7son"
        }
      ],
      dependencies: {
        "fast-redact": "^3.0.0",
        "fast-safe-stringify": "^2.0.8",
        "fastify-warning": "^0.2.0",
        flatstr: "^1.0.12",
        "pino-std-serializers": "^3.1.0",
        "quick-format-unescaped": "^4.0.3",
        "sonic-boom": "^1.0.2"
      },
      description: "super fast, all natural json logger",
      devDependencies: {
        airtap: "4.0.3",
        benchmark: "^2.1.4",
        bole: "^4.0.0",
        bunyan: "^1.8.14",
        "docsify-cli": "^4.4.1",
        eslint: "^7.17.0",
        "eslint-config-standard": "^16.0.2",
        "eslint-plugin-import": "^2.22.1",
        "eslint-plugin-node": "^11.1.0",
        "eslint-plugin-promise": "^5.1.0",
        execa: "^5.0.0",
        fastbench: "^1.0.1",
        "flush-write-stream": "^2.0.0",
        "import-fresh": "^3.2.1",
        log: "^6.0.0",
        loglevel: "^1.6.7",
        "pino-pretty": "^5.0.0",
        "pre-commit": "^1.2.2",
        proxyquire: "^2.1.3",
        pump: "^3.0.0",
        semver: "^7.0.0",
        split2: "^3.1.1",
        steed: "^1.1.3",
        "strip-ansi": "^6.0.0",
        tap: "^15.0.1",
        tape: "^5.0.0",
        through2: "^4.0.0",
        winston: "^3.3.3"
      },
      files: [
        "pino.js",
        "bin.js",
        "browser.js",
        "pretty.js",
        "usage.txt",
        "test",
        "docs",
        "example.js",
        "lib"
      ],
      homepage: "http://getpino.io",
      keywords: [
        "fast",
        "logger",
        "stream",
        "json"
      ],
      license: "MIT",
      main: "pino.js",
      name: "pino",
      precommit: "test",
      repository: {
        type: "git",
        url: "git+https://github.com/pinojs/pino.git"
      },
      scripts: {
        bench: "node benchmarks/utils/runbench all",
        "bench-basic": "node benchmarks/utils/runbench basic",
        "bench-child": "node benchmarks/utils/runbench child",
        "bench-child-child": "node benchmarks/utils/runbench child-child",
        "bench-child-creation": "node benchmarks/utils/runbench child-creation",
        "bench-deep-object": "node benchmarks/utils/runbench deep-object",
        "bench-formatters": "node benchmarks/utils/runbench formatters",
        "bench-longs-tring": "node benchmarks/utils/runbench long-string",
        "bench-multi-arg": "node benchmarks/utils/runbench multi-arg",
        "bench-object": "node benchmarks/utils/runbench object",
        "browser-test": "airtap --local 8080 test/browser*test.js",
        "cov-ui": "tap --coverage-report=html test/*test.js test/*/*test.js",
        docs: "docsify serve",
        lint: "eslint .",
        test: "npm run lint && tap --100 test/*test.js test/*/*test.js",
        "test-ci": "npm run lint && tap test/*test.js test/*/*test.js --coverage-report=lcovonly",
        "update-bench-doc": "node benchmarks/utils/generate-benchmark-doc > docs/benchmarks.md"
      },
      version: "6.13.3"
    };
  }
});

// node_modules/pino/lib/meta.js
var require_meta = __commonJS({
  "node_modules/pino/lib/meta.js"(exports, module2) {
    "use strict";
    var { version: version2 } = require_package();
    module2.exports = { version: version2 };
  }
});

// node_modules/pino/lib/proto.js
var require_proto = __commonJS({
  "node_modules/pino/lib/proto.js"(exports, module2) {
    "use strict";
    var { EventEmitter } = require("events");
    var SonicBoom = require_sonic_boom();
    var flatstr = require_flatstr();
    var warning = require_deprecations();
    var {
      lsCacheSym,
      levelValSym,
      setLevelSym,
      getLevelSym,
      chindingsSym,
      parsedChindingsSym,
      mixinSym,
      asJsonSym,
      writeSym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      serializersSym,
      formattersSym,
      useOnlyCustomLevelsSym,
      needsMetadataGsym,
      redactFmtSym,
      stringifySym,
      formatOptsSym,
      stringifiersSym
    } = require_symbols();
    var {
      getLevel,
      setLevel,
      isLevelEnabled,
      mappings,
      initialLsCache,
      genLsCache,
      assertNoLevelCollisions
    } = require_levels();
    var {
      asChindings,
      asJson,
      buildFormatters,
      stringify: stringify3
    } = require_tools();
    var {
      version: version2
    } = require_meta();
    var redaction = require_redaction();
    var constructor = class Pino {
    };
    var prototype = {
      constructor,
      child,
      bindings,
      setBindings,
      flush,
      isLevelEnabled,
      version: version2,
      get level() {
        return this[getLevelSym]();
      },
      set level(lvl) {
        this[setLevelSym](lvl);
      },
      get levelVal() {
        return this[levelValSym];
      },
      set levelVal(n) {
        throw Error("levelVal is read-only");
      },
      [lsCacheSym]: initialLsCache,
      [writeSym]: write,
      [asJsonSym]: asJson,
      [getLevelSym]: getLevel,
      [setLevelSym]: setLevel
    };
    Object.setPrototypeOf(prototype, EventEmitter.prototype);
    module2.exports = function() {
      return Object.create(prototype);
    };
    var resetChildingsFormatter = (bindings2) => bindings2;
    function child(bindings2, options) {
      if (!bindings2) {
        throw Error("missing bindings for child Pino");
      }
      options = options || {};
      const serializers = this[serializersSym];
      const formatters = this[formattersSym];
      const instance2 = Object.create(this);
      if (bindings2.hasOwnProperty("serializers") === true) {
        warning.emit("PINODEP004");
        options.serializers = bindings2.serializers;
      }
      if (bindings2.hasOwnProperty("formatters") === true) {
        warning.emit("PINODEP005");
        options.formatters = bindings2.formatters;
      }
      if (bindings2.hasOwnProperty("customLevels") === true) {
        warning.emit("PINODEP006");
        options.customLevels = bindings2.customLevels;
      }
      if (bindings2.hasOwnProperty("level") === true) {
        warning.emit("PINODEP007");
        options.level = bindings2.level;
      }
      if (options.hasOwnProperty("serializers") === true) {
        instance2[serializersSym] = /* @__PURE__ */ Object.create(null);
        for (const k in serializers) {
          instance2[serializersSym][k] = serializers[k];
        }
        const parentSymbols = Object.getOwnPropertySymbols(serializers);
        for (var i = 0; i < parentSymbols.length; i++) {
          const ks = parentSymbols[i];
          instance2[serializersSym][ks] = serializers[ks];
        }
        for (const bk in options.serializers) {
          instance2[serializersSym][bk] = options.serializers[bk];
        }
        const bindingsSymbols = Object.getOwnPropertySymbols(options.serializers);
        for (var bi = 0; bi < bindingsSymbols.length; bi++) {
          const bks = bindingsSymbols[bi];
          instance2[serializersSym][bks] = options.serializers[bks];
        }
      } else
        instance2[serializersSym] = serializers;
      if (options.hasOwnProperty("formatters")) {
        const { level, bindings: chindings, log } = options.formatters;
        instance2[formattersSym] = buildFormatters(level || formatters.level, chindings || resetChildingsFormatter, log || formatters.log);
      } else {
        instance2[formattersSym] = buildFormatters(formatters.level, resetChildingsFormatter, formatters.log);
      }
      if (options.hasOwnProperty("customLevels") === true) {
        assertNoLevelCollisions(this.levels, options.customLevels);
        instance2.levels = mappings(options.customLevels, instance2[useOnlyCustomLevelsSym]);
        genLsCache(instance2);
      }
      if (typeof options.redact === "object" && options.redact !== null || Array.isArray(options.redact)) {
        instance2.redact = options.redact;
        const stringifiers = redaction(instance2.redact, stringify3);
        const formatOpts = { stringify: stringifiers[redactFmtSym] };
        instance2[stringifySym] = stringify3;
        instance2[stringifiersSym] = stringifiers;
        instance2[formatOptsSym] = formatOpts;
      }
      instance2[chindingsSym] = asChindings(instance2, bindings2);
      const childLevel = options.level || this.level;
      instance2[setLevelSym](childLevel);
      return instance2;
    }
    function bindings() {
      const chindings = this[chindingsSym];
      const chindingsJson = `{${chindings.substr(1)}}`;
      const bindingsFromJson = JSON.parse(chindingsJson);
      delete bindingsFromJson.pid;
      delete bindingsFromJson.hostname;
      return bindingsFromJson;
    }
    function setBindings(newBindings) {
      const chindings = asChindings(this, newBindings);
      this[chindingsSym] = chindings;
      delete this[parsedChindingsSym];
    }
    function write(_obj, msg, num) {
      const t = this[timeSym]();
      const mixin = this[mixinSym];
      const objError = _obj instanceof Error;
      let obj;
      if (_obj === void 0 || _obj === null) {
        obj = mixin ? mixin({}) : {};
      } else {
        obj = Object.assign(mixin ? mixin(_obj) : {}, _obj);
        if (!msg && objError) {
          msg = _obj.message;
        }
        if (objError) {
          obj.stack = _obj.stack;
          if (!obj.type) {
            obj.type = "Error";
          }
        }
      }
      const s = this[asJsonSym](obj, msg, num, t);
      const stream = this[streamSym];
      if (stream[needsMetadataGsym] === true) {
        stream.lastLevel = num;
        stream.lastObj = obj;
        stream.lastMsg = msg;
        stream.lastTime = t.slice(this[timeSliceIndexSym]);
        stream.lastLogger = this;
      }
      if (stream instanceof SonicBoom)
        stream.write(s);
      else
        stream.write(flatstr(s));
    }
    function flush() {
      const stream = this[streamSym];
      if ("flush" in stream)
        stream.flush();
    }
  }
});

// node_modules/pino/pino.js
var require_pino = __commonJS({
  "node_modules/pino/pino.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var stdSerializers = require_pino_std_serializers();
    var redaction = require_redaction();
    var time = require_time();
    var proto = require_proto();
    var symbols = require_symbols();
    var { assertDefaultLevelFound, mappings, genLsCache } = require_levels();
    var {
      createArgsNormalizer,
      asChindings,
      final,
      stringify: stringify3,
      buildSafeSonicBoom,
      buildFormatters,
      noop
    } = require_tools();
    var { version: version2 } = require_meta();
    var {
      chindingsSym,
      redactFmtSym,
      serializersSym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      stringifySym,
      stringifiersSym,
      setLevelSym,
      endSym,
      formatOptsSym,
      messageKeySym,
      nestedKeySym,
      mixinSym,
      useOnlyCustomLevelsSym,
      formattersSym,
      hooksSym
    } = symbols;
    var { epochTime, nullTime } = time;
    var { pid } = process;
    var hostname = os.hostname();
    var defaultErrorSerializer = stdSerializers.err;
    var defaultOptions = {
      level: "info",
      messageKey: "msg",
      nestedKey: null,
      enabled: true,
      prettyPrint: false,
      base: { pid, hostname },
      serializers: Object.assign(/* @__PURE__ */ Object.create(null), {
        err: defaultErrorSerializer
      }),
      formatters: Object.assign(/* @__PURE__ */ Object.create(null), {
        bindings(bindings) {
          return bindings;
        },
        level(label, number) {
          return { level: number };
        }
      }),
      hooks: {
        logMethod: void 0
      },
      timestamp: epochTime,
      name: void 0,
      redact: null,
      customLevels: null,
      levelKey: void 0,
      useOnlyCustomLevels: false
    };
    var normalize = createArgsNormalizer(defaultOptions);
    var serializers = Object.assign(/* @__PURE__ */ Object.create(null), stdSerializers);
    function pino2(...args) {
      const instance2 = {};
      const { opts, stream } = normalize(instance2, ...args);
      const {
        redact,
        crlf,
        serializers: serializers2,
        timestamp,
        messageKey,
        nestedKey,
        base,
        name,
        level,
        customLevels,
        useLevelLabels,
        changeLevelName,
        levelKey,
        mixin,
        useOnlyCustomLevels,
        formatters,
        hooks
      } = opts;
      const allFormatters = buildFormatters(formatters.level, formatters.bindings, formatters.log);
      if (useLevelLabels && !(changeLevelName || levelKey)) {
        process.emitWarning("useLevelLabels is deprecated, use the formatters.level option instead", "Warning", "PINODEP001");
        allFormatters.level = labelsFormatter;
      } else if ((changeLevelName || levelKey) && !useLevelLabels) {
        process.emitWarning("changeLevelName and levelKey are deprecated, use the formatters.level option instead", "Warning", "PINODEP002");
        allFormatters.level = levelNameFormatter(changeLevelName || levelKey);
      } else if ((changeLevelName || levelKey) && useLevelLabels) {
        process.emitWarning("useLevelLabels is deprecated, use the formatters.level option instead", "Warning", "PINODEP001");
        process.emitWarning("changeLevelName and levelKey are deprecated, use the formatters.level option instead", "Warning", "PINODEP002");
        allFormatters.level = levelNameLabelFormatter(changeLevelName || levelKey);
      }
      if (serializers2[Symbol.for("pino.*")]) {
        process.emitWarning("The pino.* serializer is deprecated, use the formatters.log options instead", "Warning", "PINODEP003");
        allFormatters.log = serializers2[Symbol.for("pino.*")];
      }
      if (!allFormatters.bindings) {
        allFormatters.bindings = defaultOptions.formatters.bindings;
      }
      if (!allFormatters.level) {
        allFormatters.level = defaultOptions.formatters.level;
      }
      const stringifiers = redact ? redaction(redact, stringify3) : {};
      const formatOpts = redact ? { stringify: stringifiers[redactFmtSym] } : { stringify: stringify3 };
      const end = "}" + (crlf ? "\r\n" : "\n");
      const coreChindings = asChindings.bind(null, {
        [chindingsSym]: "",
        [serializersSym]: serializers2,
        [stringifiersSym]: stringifiers,
        [stringifySym]: stringify3,
        [formattersSym]: allFormatters
      });
      let chindings = "";
      if (base !== null) {
        if (name === void 0) {
          chindings = coreChindings(base);
        } else {
          chindings = coreChindings(Object.assign({}, base, { name }));
        }
      }
      const time2 = timestamp instanceof Function ? timestamp : timestamp ? epochTime : nullTime;
      const timeSliceIndex = time2().indexOf(":") + 1;
      if (useOnlyCustomLevels && !customLevels)
        throw Error("customLevels is required if useOnlyCustomLevels is set true");
      if (mixin && typeof mixin !== "function")
        throw Error(`Unknown mixin type "${typeof mixin}" - expected "function"`);
      assertDefaultLevelFound(level, customLevels, useOnlyCustomLevels);
      const levels = mappings(customLevels, useOnlyCustomLevels);
      Object.assign(instance2, {
        levels,
        [useOnlyCustomLevelsSym]: useOnlyCustomLevels,
        [streamSym]: stream,
        [timeSym]: time2,
        [timeSliceIndexSym]: timeSliceIndex,
        [stringifySym]: stringify3,
        [stringifiersSym]: stringifiers,
        [endSym]: end,
        [formatOptsSym]: formatOpts,
        [messageKeySym]: messageKey,
        [nestedKeySym]: nestedKey,
        [serializersSym]: serializers2,
        [mixinSym]: mixin,
        [chindingsSym]: chindings,
        [formattersSym]: allFormatters,
        [hooksSym]: hooks,
        silent: noop
      });
      Object.setPrototypeOf(instance2, proto());
      genLsCache(instance2);
      instance2[setLevelSym](level);
      return instance2;
    }
    function labelsFormatter(label, number) {
      return { level: label };
    }
    function levelNameFormatter(name) {
      return function(label, number) {
        return { [name]: number };
      };
    }
    function levelNameLabelFormatter(name) {
      return function(label, number) {
        return { [name]: label };
      };
    }
    module2.exports = pino2;
    module2.exports.extreme = (dest = process.stdout.fd) => {
      process.emitWarning("The pino.extreme() option is deprecated and will be removed in v7. Use pino.destination({ sync: false }) instead.", { code: "extreme_deprecation" });
      return buildSafeSonicBoom({ dest, minLength: 4096, sync: false });
    };
    module2.exports.destination = (dest = process.stdout.fd) => {
      if (typeof dest === "object") {
        dest.dest = dest.dest || process.stdout.fd;
        return buildSafeSonicBoom(dest);
      } else {
        return buildSafeSonicBoom({ dest, minLength: 0, sync: true });
      }
    };
    module2.exports.final = final;
    module2.exports.levels = mappings();
    module2.exports.stdSerializers = serializers;
    module2.exports.stdTimeFunctions = Object.assign({}, time);
    module2.exports.symbols = symbols;
    module2.exports.version = version2;
    module2.exports.default = pino2;
    module2.exports.pino = pino2;
  }
});

// src/lambda/consoleWrapper.ts
function pinoLogArgConcatenationMethod(args, method) {
  if (args.length >= 2) {
    method.apply(this, [
      args.map((arg) => typeof arg === "string" ? "%s" : "%j").join(" "),
      ...args
    ]);
  } else {
    method.apply(this, args);
  }
}
var awsCloudWatchTag, util, pino, edgioOriginalConsole, _timers, ConsoleWrapper;
var init_consoleWrapper = __esm({
  "src/lambda/consoleWrapper.ts"() {
    "use strict";
    awsCloudWatchTag = { awsTag: "userLogs" };
    util = require("util");
    pino = require_pino();
    edgioOriginalConsole = {
      assert: console.assert,
      debug: console.debug,
      dir: console.dir,
      error: console.error,
      info: console.info,
      log: console.log,
      time: console.time,
      timeEnd: console.timeEnd,
      timeLog: console.timeLog,
      trace: console.trace,
      warn: console.warn
    };
    _timers = {};
    ConsoleWrapper = class {
      static _assert(condition, ...args) {
        if (!condition) {
          console.info(...args);
        }
      }
      static _dir(...args) {
        console.info(util.inspect(...args));
      }
      static _time(label) {
        _timers[label] = Date.now();
      }
      static _timeEnd(label) {
        ConsoleWrapper._timeLog(label);
      }
      static _timeLog(label, ...args) {
        if (!_timers[label]) {
          console.warn(`Warning: No such label '${label}' for console.timeEnd()`);
          return;
        }
        const deltaTime = Date.now() - _timers[label];
        _timers[label] = Date.now();
        console.info(`${label}: ${deltaTime}ms`, ...args);
      }
      static enable({
        clientIp,
        requestId,
        wi
      } = {}) {
        _timers = {};
        let logger2 = pino({
          base: {
            ...awsCloudWatchTag,
            ...{ wi }
          },
          timestamp: true,
          hooks: {
            logMethod: pinoLogArgConcatenationMethod
          }
        });
        if (clientIp) {
          logger2 = logger2.child({ clientIp });
        }
        if (requestId) {
          logger2 = logger2.child({ requestId });
        }
        console.assert = ConsoleWrapper._assert;
        console.debug = logger2.debug.bind(logger2);
        console.dir = ConsoleWrapper._dir;
        console.error = logger2.error.bind(logger2);
        console.info = logger2.info.bind(logger2);
        console.log = logger2.info.bind(logger2);
        console.time = ConsoleWrapper._time;
        console.timeEnd = ConsoleWrapper._timeEnd;
        console.timeLog = ConsoleWrapper._timeLog;
        console.trace = logger2.trace.bind(logger2);
        console.warn = logger2.warn.bind(logger2);
      }
      static disable() {
        console.assert = edgioOriginalConsole.assert;
        console.debug = edgioOriginalConsole.debug;
        console.dir = edgioOriginalConsole.dir;
        console.error = edgioOriginalConsole.error;
        console.info = edgioOriginalConsole.info;
        console.log = edgioOriginalConsole.log;
        console.time = edgioOriginalConsole.time;
        console.timeEnd = edgioOriginalConsole.timeEnd;
        console.timeLog = edgioOriginalConsole.timeLog;
        console.trace = edgioOriginalConsole.trace;
        console.warn = edgioOriginalConsole.warn;
      }
    };
  }
});

// src/constants.ts
var constants_exports = {};
__export(constants_exports, {
  ACTIONS: () => ACTIONS,
  BACKENDS: () => BACKENDS,
  BROTLI_ENCODING: () => BROTLI_ENCODING,
  CACHEABLE_METHODS: () => CACHEABLE_METHODS,
  CACHING_DEBUG_CACHEABLE: () => CACHING_DEBUG_CACHEABLE,
  CACHING_DEBUG_HEADERS: () => CACHING_DEBUG_HEADERS,
  CACHING_DEBUG_STATUS: () => CACHING_DEBUG_STATUS,
  CACHING_STATUS: () => CACHING_STATUS,
  DEFLATE_ENCODING: () => DEFLATE_ENCODING,
  DEVTOOLS_PREFETCH_QUERY_PARAM: () => DEVTOOLS_PREFETCH_QUERY_PARAM,
  EDGIO_ASSET_ALIASES_FILE: () => EDGIO_ASSET_ALIASES_FILE,
  EDGIO_CONFIG_FILE: () => EDGIO_CONFIG_FILE,
  EDGIO_DEPLOYMENT_TYPE_AWS: () => EDGIO_DEPLOYMENT_TYPE_AWS,
  EDGIO_EDGE_FUNCTION_ENV_VARIABLES: () => EDGIO_EDGE_FUNCTION_ENV_VARIABLES,
  EDGIO_ENV_VARIABLES: () => EDGIO_ENV_VARIABLES,
  EDGIO_HEADERS_PREFIX: () => EDGIO_HEADERS_PREFIX,
  EDGIO_IMAGE_OPTIMIZER_PATH: () => EDGIO_IMAGE_OPTIMIZER_PATH,
  EDGIO_MAX_USER_HEADERS_ALLOWED: () => EDGIO_MAX_USER_HEADERS_ALLOWED,
  EDGIO_SERVERLESS_HINTS: () => EDGIO_SERVERLESS_HINTS,
  EDGIO_SERVERLESS_HINT_HEADER: () => EDGIO_SERVERLESS_HINT_HEADER,
  EDGIO_TOO_MANY_HEADERS_STATUS_CODE: () => EDGIO_TOO_MANY_HEADERS_STATUS_CODE,
  EDGIO_UNCACHED_PREFETCH_STATUS: () => EDGIO_UNCACHED_PREFETCH_STATUS,
  FAR_FUTURE_TTL: () => FAR_FUTURE_TTL,
  GZIP_ENCODING: () => GZIP_ENCODING,
  HEAD_QUERY_PARAM: () => HEAD_QUERY_PARAM,
  HOSTS_NOINDEX_PERMALINK_REGEX: () => HOSTS_NOINDEX_PERMALINK_REGEX,
  HTTP_HEADERS: () => HTTP_HEADERS,
  HTTP_METHODS: () => HTTP_METHODS,
  IS_BROWSER: () => IS_BROWSER,
  JS_BACKEND_HOSTNAME: () => JS_BACKEND_HOSTNAME,
  METHOD_QUERY_PARAM: () => METHOD_QUERY_PARAM,
  POST_BODY_QUERY_PARAM: () => POST_BODY_QUERY_PARAM,
  PREFETCH_QUERY_PARAM: () => PREFETCH_QUERY_PARAM,
  PREFETCH_TTL_PARAM: () => PREFETCH_TTL_PARAM,
  ROUTES_CATCH_GROUP: () => ROUTES_CATCH_GROUP,
  ROUTES_FALLBACK: () => ROUTES_FALLBACK,
  ROUTES_NOINDEX_GROUP: () => ROUTES_NOINDEX_GROUP,
  THROTTLED_QUERY_PARAM: () => THROTTLED_QUERY_PARAM
});
var EDGIO_CONFIG_FILE, EDGIO_ASSET_ALIASES_FILE, EDGIO_ENV_VARIABLES, EDGIO_EDGE_FUNCTION_ENV_VARIABLES, EDGIO_DEPLOYMENT_TYPE_AWS, EDGIO_HEADERS_PREFIX, EDGIO_SERVERLESS_HINT_HEADER, EDGIO_SERVERLESS_HINTS, EDGIO_MAX_USER_HEADERS_ALLOWED, EDGIO_TOO_MANY_HEADERS_STATUS_CODE, EDGIO_UNCACHED_PREFETCH_STATUS, ACTIONS, BACKENDS, JS_BACKEND_HOSTNAME, HTTP_METHODS, HTTP_HEADERS, CACHING_STATUS, CACHEABLE_METHODS, CACHING_DEBUG_HEADERS, CACHING_DEBUG_STATUS, CACHING_DEBUG_CACHEABLE, THROTTLED_QUERY_PARAM, PREFETCH_QUERY_PARAM, PREFETCH_TTL_PARAM, DEVTOOLS_PREFETCH_QUERY_PARAM, HEAD_QUERY_PARAM, POST_BODY_QUERY_PARAM, METHOD_QUERY_PARAM, ROUTES_FALLBACK, ROUTES_CATCH_GROUP, ROUTES_NOINDEX_GROUP, HOSTS_NOINDEX_PERMALINK_REGEX, EDGIO_IMAGE_OPTIMIZER_PATH, IS_BROWSER, BROTLI_ENCODING, GZIP_ENCODING, DEFLATE_ENCODING, FAR_FUTURE_TTL;
var init_constants = __esm({
  "src/constants.ts"() {
    "use strict";
    EDGIO_CONFIG_FILE = "edgio.config.js";
    EDGIO_ASSET_ALIASES_FILE = "asset-aliases.json";
    EDGIO_ENV_VARIABLES = {
      config: "EDGIO_CONFIG",
      internalConfig: "EDGIO_INTERNAL_CONFIG",
      deploymentType: "EDGIO_DEPLOYMENT_TYPE",
      versionOverride: "EDGIO_VERSION_OVERRIDE",
      productionBuild: "EDGIO_PRODUCTION_BUILD",
      local: "EDGIO_LOCAL",
      cache: "EDGIO_CACHE"
    };
    EDGIO_EDGE_FUNCTION_ENV_VARIABLES = {
      path: "__EDGE_FUNCTION_PATH__",
      quickjsBytecodeBase64: "__EDGE_FUNCTION_QUICKJS_BYTECODE_BASE64__"
    };
    EDGIO_DEPLOYMENT_TYPE_AWS = "AWS";
    EDGIO_HEADERS_PREFIX = "x-edg-";
    EDGIO_SERVERLESS_HINT_HEADER = "x-edg-serverless-hint";
    EDGIO_SERVERLESS_HINTS = {
      app: "app",
      compute: "compute",
      redirect: "redirect",
      proxy: "proxy"
    };
    EDGIO_MAX_USER_HEADERS_ALLOWED = 70;
    EDGIO_TOO_MANY_HEADERS_STATUS_CODE = 542;
    EDGIO_UNCACHED_PREFETCH_STATUS = 412;
    ACTIONS = {
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
    BACKENDS = {
      js: "__js__",
      static: "__static__",
      permanentStatic: "__permanent_static__",
      imageOptimizer: "__image_optimizer__"
    };
    JS_BACKEND_HOSTNAME = "127.0.0.1";
    HTTP_METHODS = {
      head: "head",
      get: "get",
      post: "post",
      delete: "delete",
      put: "put",
      patch: "patch",
      options: "options"
    };
    HTTP_HEADERS = {
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
    CACHING_STATUS = {
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
    CACHEABLE_METHODS = /* @__PURE__ */ new Set(["get", "head"]);
    CACHING_DEBUG_HEADERS = {
      cache: "x-ec-cache",
      checkCacheable: "x-ec-check-cacheable",
      cacheState: "x-ec-cache-state",
      cacheKey: "x-ec-cache-key"
    };
    CACHING_DEBUG_STATUS = {
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
    CACHING_DEBUG_CACHEABLE = {
      yes: "YES",
      no: "NO"
    };
    THROTTLED_QUERY_PARAM = "edgio_prefetch";
    PREFETCH_QUERY_PARAM = THROTTLED_QUERY_PARAM;
    PREFETCH_TTL_PARAM = "edgio_prefetch_ttl";
    DEVTOOLS_PREFETCH_QUERY_PARAM = "edgio_dt_pf";
    HEAD_QUERY_PARAM = "edgio_head";
    POST_BODY_QUERY_PARAM = "pref_edgio_body";
    METHOD_QUERY_PARAM = "pref_edgio_method";
    ROUTES_FALLBACK = "fallback";
    ROUTES_CATCH_GROUP = "catch";
    ROUTES_NOINDEX_GROUP = "noindex";
    HOSTS_NOINDEX_PERMALINK_REGEX = /\.edgio\.link|\.edgio-perma\.link/;
    EDGIO_IMAGE_OPTIMIZER_PATH = "/__layer0_image_optimizer";
    IS_BROWSER = typeof window !== "undefined";
    BROTLI_ENCODING = "br";
    GZIP_ENCODING = "gzip";
    DEFLATE_ENCODING = "deflate";
    FAR_FUTURE_TTL = "1y";
  }
});

// src/environment.ts
var environment_exports = {};
__export(environment_exports, {
  isBrowser: () => isBrowser,
  isCloud: () => isCloud,
  isEdgioRunDev: () => isEdgioRunDev,
  isLocal: () => isLocal,
  isProductionBuild: () => isProductionBuild
});
function isCloud() {
  return process.env[EDGIO_ENV_VARIABLES.deploymentType] === EDGIO_DEPLOYMENT_TYPE_AWS;
}
function isLocal() {
  return process.env[EDGIO_ENV_VARIABLES.local] === "true";
}
function isProductionBuild() {
  return process.env.NODE_ENV === "production" || process.env[EDGIO_ENV_VARIABLES.productionBuild] === "true";
}
function isEdgioRunDev() {
  return !isCloud() && !isProductionBuild();
}
function isBrowser() {
  return typeof window !== "undefined";
}
var init_environment = __esm({
  "src/environment.ts"() {
    "use strict";
    init_constants();
  }
});

// src/lambda/stdStreamsWrapper.ts
var stdStreamsWrapper_exports = {};
__export(stdStreamsWrapper_exports, {
  deepRequestInspectionLogger: () => deepRequestInspectionLogger,
  default: () => stdStreamsWrapper_default
});
function isEdgioJsonLog(log) {
  return log.indexOf(JSON_LOG_IDENTIFIER) >= 0;
}
function deepRequestInspectionLogger(instance2) {
  function logHttpRequestInfo(data, level) {
    try {
      if (process.env.EDGIO_HTTP_REQUEST_LOGGING === "1") {
        edgioOriginalOutputs.stdoutWrite.apply(process.stdout, [
          JSON.stringify({
            level,
            time: Date.now(),
            wi: instance2.id,
            ...currentBaseJsonObject,
            data
          })
        ]);
        edgioOriginalOutputs.stdoutWrite.apply(process.stdout, ["\n"]);
      }
    } catch (e) {
      console.error(`Error while logging HTTP request info at level ${level}: ${e && e.message}`);
    }
  }
  function logDownstreamRequestInfo(data) {
    return logHttpRequestInfo(data, DOWNSTREAM_REQUEST_INFO_LEVEL);
  }
  function logDownstreamResponseInfo(data) {
    return logHttpRequestInfo(data, DOWNSTREAM_RESPONSE_INFO_LEVEL);
  }
  function logUpstreamRequestInfo(data) {
    return logHttpRequestInfo(data, UPSTREAM_REQUEST_INFO_LEVEL);
  }
  function logUpstreamResponseInfo(data) {
    return logHttpRequestInfo(data, UPSTREAM_RESPONSE_INFO_LEVEL);
  }
  function logUpstreamResponseBodyInfo(data) {
    return logHttpRequestInfo(data, UPSTREAM_RESPONSE_BODY_INFO_LEVEL);
  }
  return {
    logDownstreamRequestInfo,
    logDownstreamResponseInfo,
    logUpstreamRequestInfo,
    logUpstreamResponseInfo,
    logUpstreamResponseBodyInfo
  };
}
function jsonifyWriteStream(stream, baseJsonObject) {
  const originalWrite = stream.write;
  stream.write = function(chunk, ...otherArgs) {
    let convertedChunk;
    if (typeof chunk === "object") {
      convertedChunk = Buffer.from(chunk).toString();
    } else {
      convertedChunk = chunk;
    }
    const dynamicObject = {
      time: Date.now()
    };
    if (chunk && !isEdgioJsonLog(convertedChunk)) {
      chunk = JSON.stringify({
        ...baseJsonObject,
        ...dynamicObject,
        msg: convertedChunk
      }) + "\n";
    }
    return originalWrite.apply(stream, [chunk, ...otherArgs]);
  };
}
var environment, edgioOriginalOutputs, PINO_ERROR_LEVEL, PINO_INFO_LEVEL, edgioEnabledCount, JSON_LOG_IDENTIFIER, DOWNSTREAM_REQUEST_INFO_LEVEL, DOWNSTREAM_RESPONSE_INFO_LEVEL, UPSTREAM_REQUEST_INFO_LEVEL, UPSTREAM_RESPONSE_INFO_LEVEL, UPSTREAM_RESPONSE_BODY_INFO_LEVEL, currentBaseJsonObject, stdStreamsWrapper, stdStreamsWrapper_default;
var init_stdStreamsWrapper = __esm({
  "src/lambda/stdStreamsWrapper.ts"() {
    "use strict";
    init_consoleWrapper();
    environment = (init_environment(), __toCommonJS(environment_exports));
    edgioOriginalOutputs = {
      stdoutWrite: process.stdout.write,
      stderrWrite: process.stderr.write
    };
    PINO_ERROR_LEVEL = 50;
    PINO_INFO_LEVEL = 30;
    edgioEnabledCount = 0;
    JSON_LOG_IDENTIFIER = JSON.stringify(awsCloudWatchTag).replace("{", "").replace("}", "");
    DOWNSTREAM_REQUEST_INFO_LEVEL = 100;
    DOWNSTREAM_RESPONSE_INFO_LEVEL = 101;
    UPSTREAM_REQUEST_INFO_LEVEL = 102;
    UPSTREAM_RESPONSE_INFO_LEVEL = 103;
    UPSTREAM_RESPONSE_BODY_INFO_LEVEL = 104;
    currentBaseJsonObject = {};
    stdStreamsWrapper = {
      enable: ({
        clientIp,
        requestId,
        wi
      } = {}) => {
        if (!environment.isCloud()) {
          return;
        }
        if (edgioEnabledCount === 0) {
          let basePayload = awsCloudWatchTag;
          if (clientIp) {
            basePayload = {
              ...basePayload,
              clientIp
            };
          }
          if (requestId) {
            basePayload = {
              ...basePayload,
              requestId
            };
          }
          if (wi) {
            basePayload = {
              ...basePayload,
              wi
            };
          }
          currentBaseJsonObject = basePayload;
          jsonifyWriteStream(process.stdout, { level: PINO_INFO_LEVEL, ...basePayload });
          jsonifyWriteStream(process.stderr, { level: PINO_ERROR_LEVEL, ...basePayload });
          ConsoleWrapper.enable({ clientIp, requestId, wi });
        }
        edgioEnabledCount++;
      },
      disable: () => {
        if (!environment.isCloud()) {
          return;
        }
        edgioEnabledCount--;
        if (edgioEnabledCount === 0) {
          process.stdout.write = edgioOriginalOutputs.stdoutWrite;
          process.stderr.write = edgioOriginalOutputs.stderrWrite;
          currentBaseJsonObject = {};
          ConsoleWrapper.disable();
        }
      }
    };
    stdStreamsWrapper_default = stdStreamsWrapper;
  }
});

// src/lambda/getBodyLoggingData.ts
var getBodyLoggingData_exports = {};
__export(getBodyLoggingData_exports, {
  default: () => getBodyLoggingData
});
function base64encode(str) {
  return Buffer.from(str).toString("base64");
}
function getContentEncoding(headers) {
  if (!headers) {
    return void 0;
  }
  let encoding = headers[HTTP_HEADERS.contentEncoding];
  if (!encoding) {
    for (let name of Object.keys(headers)) {
      if (name.toLowerCase() === HTTP_HEADERS.contentEncoding) {
        encoding = headers[name];
        break;
      }
    }
  }
  if (Array.isArray(encoding)) {
    if (encoding.length) {
      encoding = encoding[0];
    } else {
      encoding = void 0;
    }
  }
  return encoding;
}
function getBodyLoggingData(rawBody, headers) {
  var _a2;
  try {
    if (!rawBody || rawBody.length === 0) {
      return {};
    }
    let body;
    if (typeof rawBody === "string") {
      body = Buffer.from(rawBody, "base64");
    } else if (Buffer.isBuffer(rawBody)) {
      body = rawBody;
    } else if (Array.isArray(rawBody)) {
      body = Buffer.concat(rawBody);
    } else {
      return {
        body: base64encode(`Unknown body format: ${typeof rawBody}`),
        bodyLength: rawBody.length,
        bodyTruncated: true
      };
    }
    let encoding = (_a2 = getContentEncoding(headers)) == null ? void 0 : _a2.toLowerCase();
    try {
      switch (encoding) {
        case GZIP_ENCODING: {
          body = (0, import_zlib.gunzipSync)(body);
          break;
        }
        case BROTLI_ENCODING: {
          body = (0, import_zlib.brotliDecompressSync)(body);
          break;
        }
        case DEFLATE_ENCODING: {
          body = (0, import_zlib.inflateSync)(body);
          break;
        }
        default: {
        }
      }
    } catch (e) {
      return {
        body: base64encode(`Error while decompressing the body [${encoding}]: ${e.message}`),
        bodyLength: body.length,
        bodyTruncated: true
      };
    }
    return {
      body: body.slice(0, MAX_BODY_LENGTH).toString("base64"),
      bodyLength: body.length,
      bodyTruncated: body.length > MAX_BODY_LENGTH
    };
  } catch (e) {
    return {
      body: base64encode(`Error while getting body logging data: ${e && e.message}`),
      bodyLength: rawBody.length,
      bodyTruncated: true
    };
  }
}
var import_zlib, MAX_BODY_LENGTH;
var init_getBodyLoggingData = __esm({
  "src/lambda/getBodyLoggingData.ts"() {
    "use strict";
    import_zlib = require("zlib");
    init_constants();
    MAX_BODY_LENGTH = 8 * 1024;
  }
});

// src/lambda/httpRequestInterceptor.js
var require_httpRequestInterceptor = __commonJS({
  "src/lambda/httpRequestInterceptor.js"(exports, module2) {
    "use strict";
    var { inherits } = require("util");
    var { deepRequestInspectionLogger: deepRequestInspectionLogger2 } = (init_stdStreamsWrapper(), __toCommonJS(stdStreamsWrapper_exports));
    var http2 = require("http");
    var https2 = require("https");
    var url2 = require("url");
    var { HTTP_HEADERS: HTTP_HEADERS2 } = (init_constants(), __toCommonJS(constants_exports));
    var getBodyLoggingData2 = (init_getBodyLoggingData(), __toCommonJS(getBodyLoggingData_exports)).default;
    var EDGIO_STATIC_BACKEND_DOMAIN_REGEX = /^xdn-user-assets-[a-zA-Z0-9-]+-[0-9]+\.s3\.amazonaws\.com$/;
    function urlToOptions(url3) {
      const options = {
        protocol: url3.protocol,
        hostname: typeof url3.hostname === "string" && url3.hostname.startsWith("[") ? url3.hostname.slice(1, -1) : url3.hostname,
        hash: url3.hash,
        search: url3.search,
        pathname: url3.pathname,
        path: `${url3.pathname || ""}${url3.search || ""}`,
        href: url3.href
      };
      if (url3.port !== "") {
        options.port = Number(url3.port);
      }
      if (url3.username || url3.password) {
        options.auth = `${url3.username}:${url3.password}`;
      }
      return options;
    }
    var urlWarningEmitted = false;
    var searchParams = Symbol("query");
    var searchParamsSymbol = searchParams;
    function normalizeClientRequestArgs(input, options, cb) {
      if (typeof input === "string") {
        const urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        } catch (err) {
          input = url2.parse(urlStr);
          if (!input.hostname) {
            throw err;
          }
          if (!urlWarningEmitted && !process.noDeprecation) {
            urlWarningEmitted = true;
            process.emitWarning(`The provided URL ${urlStr} is not a valid URL, and is supported in the http module solely for compatibility.`, "DeprecationWarning", "DEP0109");
          }
        }
      } else if (input && input[searchParamsSymbol] && input[searchParamsSymbol][searchParamsSymbol]) {
        input = urlToOptions(input);
      } else {
        cb = options;
        options = input;
        input = null;
      }
      if (typeof options === "function") {
        cb = options;
        options = input || {};
      } else {
        options = Object.assign(input || {}, options);
      }
      return { options, callback: cb };
    }
    var OriginalClientRequest = http2.ClientRequest;
    var upstreamRequestCounter = 0;
    var upstreamRequestStart = [];
    var upstreamRequestInterceptionOptions = {};
    var upstreamRequestViaHeaderValue = "Layer0";
    var downstreamX0CacheVersionHeaderValue = null;
    function getUpstreamRequestViaHeaderValue(event) {
      let upstreamViaHeaderValue = null;
      const headers = event && event.multiValueHeaders || {};
      for (const [key2, value] of Object.entries(headers)) {
        if (key2.toLowerCase() === HTTP_HEADERS2.via) {
          upstreamViaHeaderValue = value;
          break;
        }
      }
      if (!upstreamViaHeaderValue) {
        upstreamViaHeaderValue = "Layer0";
      }
      if (!/\bLayer0\b/.test(upstreamViaHeaderValue)) {
        upstreamViaHeaderValue = upstreamViaHeaderValue + ", Layer0";
      }
      return upstreamViaHeaderValue;
    }
    function getX0CacheVersionHeaderValue(event) {
      const headers = event && event.multiValueHeaders || {};
      for (const [key2, value] of Object.entries(headers)) {
        if (key2.toLowerCase() === HTTP_HEADERS2.x0CacheVersion) {
          return value;
        }
      }
    }
    function injectPlatformControlledHeaders(headers, viaHeaderValue, downstreamX0CacheVersionHeaderValue2) {
      for (let name of Object.keys(headers)) {
        const lowerCaseName = name.toLowerCase();
        if (lowerCaseName === HTTP_HEADERS2.via || lowerCaseName === HTTP_HEADERS2.x0CacheVersion) {
          delete headers[name];
        }
      }
      if (viaHeaderValue) {
        headers[HTTP_HEADERS2.via] = viaHeaderValue;
      }
      if (downstreamX0CacheVersionHeaderValue2) {
        headers[HTTP_HEADERS2.x0CacheVersion] = downstreamX0CacheVersionHeaderValue2;
      }
    }
    function EdgioClientRequest(...args) {
      const { options, callback } = normalizeClientRequestArgs(...args);
      if (!options.headers) {
        options.headers = {};
      }
      injectPlatformControlledHeaders(options.headers, upstreamRequestViaHeaderValue, downstreamX0CacheVersionHeaderValue);
      const host = options.hostname || options.host;
      const loggingDisabled = host && (["127.0.0.1", "0.0.0.0", "::1", "0:0:0:0:0:0:0:1", "localhost"].includes(host) || EDGIO_STATIC_BACKEND_DOMAIN_REGEX.test(host));
      if (loggingDisabled) {
        OriginalClientRequest.call(this, options, callback);
      } else {
        const wrappedCallback = patchClientRequest(this, options, callback);
        OriginalClientRequest.call(this, options, wrappedCallback);
      }
    }
    function patchClientRequest(clientRequest, options, callback) {
      const id = upstreamRequestCounter++;
      upstreamRequestStart[id] = Date.now();
      const upstreamRequestInfo = {
        method: options.method,
        protocol: options.protocol,
        host: options.hostname || options.host,
        port: options.port,
        path: options.path
      };
      const driLogger = new deepRequestInspectionLogger2(upstreamRequestInterceptionOptions.lambdaInstance);
      const wrappedCallback = (res) => {
        const bodyBuffers = [];
        res.once("end", () => {
          driLogger.logUpstreamResponseBodyInfo({
            id,
            ...upstreamRequestInfo,
            ...getBodyLoggingData2(bodyBuffers, res.headers)
          });
        });
        if (upstreamRequestInterceptionOptions.enableHttpRequestLogging) {
          driLogger.logUpstreamResponseInfo({
            id,
            ...upstreamRequestInfo,
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
            headers: res.headers,
            duration: Date.now() - upstreamRequestStart[id]
          });
          let encoding;
          const { setEncoding } = res;
          res.setEncoding = function(newEncoding) {
            encoding = newEncoding;
            return setEncoding.apply(this, arguments);
          };
          const origResPush = res.push;
          res.push = function(data) {
            if (data) {
              if (encoding) {
                data = Buffer.from(data, encoding);
              }
              bodyBuffers.push(data);
            }
            return origResPush.call(res, data);
          };
        }
        if (callback) {
          callback(res);
        }
      };
      const requestBodyBuffers = [];
      const addRequestBodyBuffer = function(buffer, encoding) {
        if (Buffer.isBuffer(buffer) || typeof buffer === "string") {
          let internalBuffer = buffer;
          if (!Buffer.isBuffer(internalBuffer)) {
            if (typeof encoding !== "string") {
              encoding = null;
            }
            internalBuffer = Buffer.from(buffer, encoding);
          }
          requestBodyBuffers.push(internalBuffer);
        }
      };
      clientRequest.write = function(buffer, encoding, callback2) {
        addRequestBodyBuffer(buffer, encoding);
        return Object.getPrototypeOf(Object.getPrototypeOf(clientRequest)).write.call(clientRequest, buffer, encoding, callback2);
      }.bind(clientRequest);
      clientRequest.end = function(buffer, encoding, callback2) {
        addRequestBodyBuffer(buffer, encoding);
        if (upstreamRequestInterceptionOptions.enableHttpRequestLogging) {
          driLogger.logUpstreamRequestInfo({
            id,
            ...upstreamRequestInfo,
            headers: options.headers,
            ...getBodyLoggingData2(requestBodyBuffers, options.headers)
          });
        }
        return Object.getPrototypeOf(Object.getPrototypeOf(clientRequest)).end.call(clientRequest, buffer, encoding, callback2);
      }.bind(clientRequest);
      clientRequest.once("error", (err) => {
        if (upstreamRequestInterceptionOptions.enableHttpRequestLogging) {
          driLogger.logUpstreamResponseInfo({
            id,
            ...upstreamRequestInfo,
            duration: Date.now() - upstreamRequestStart[id],
            code: err && err.code,
            error: err && err.message
          });
        }
      });
      return wrappedCallback;
    }
    inherits(EdgioClientRequest, http2.ClientRequest);
    var CurrentClientRequest = OriginalClientRequest;
    http2.request = function request(url3, options, cb) {
      return new CurrentClientRequest(url3, options, cb);
    };
    https2.request = function request(...args) {
      const { options, callback } = normalizeClientRequestArgs(...args);
      options._defaultAgent = https2.globalAgent;
      return new CurrentClientRequest(options, callback);
    };
    CurrentClientRequest = EdgioClientRequest;
    http2.ClientRequest = EdgioClientRequest;
    function interceptRequests2(event, options) {
      upstreamRequestCounter = 0;
      upstreamRequestStart = [];
      upstreamRequestInterceptionOptions = options || {};
      upstreamRequestViaHeaderValue = getUpstreamRequestViaHeaderValue(event);
      downstreamX0CacheVersionHeaderValue = getX0CacheVersionHeaderValue(event);
    }
    module2.exports = {
      interceptRequests: interceptRequests2
    };
  }
});

// node_modules/universalify/index.js
var require_universalify = __commonJS({
  "node_modules/universalify/index.js"(exports) {
    "use strict";
    exports.fromCallback = function(fn) {
      return Object.defineProperty(function() {
        if (typeof arguments[arguments.length - 1] === "function")
          fn.apply(this, arguments);
        else {
          return new Promise((resolve2, reject) => {
            arguments[arguments.length] = (err, res) => {
              if (err)
                return reject(err);
              resolve2(res);
            };
            arguments.length++;
            fn.apply(this, arguments);
          });
        }
      }, "name", { value: fn.name });
    };
    exports.fromPromise = function(fn) {
      return Object.defineProperty(function() {
        const cb = arguments[arguments.length - 1];
        if (typeof cb !== "function")
          return fn.apply(this, arguments);
        else
          fn.apply(this, arguments).then((r) => cb(null, r), cb);
      }, "name", { value: fn.name });
    };
  }
});

// node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "node_modules/graceful-fs/polyfills.js"(exports, module2) {
    var constants = require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    var chdir = process.chdir;
    process.chdir = function(d) {
      cwd = null;
      chdir.call(process, d);
    };
    module2.exports = patch;
    function patch(fs) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs);
      }
      if (!fs.lutimes) {
        patchLutimes(fs);
      }
      fs.chown = chownFix(fs.chown);
      fs.fchown = chownFix(fs.fchown);
      fs.lchown = chownFix(fs.lchown);
      fs.chmod = chmodFix(fs.chmod);
      fs.fchmod = chmodFix(fs.fchmod);
      fs.lchmod = chmodFix(fs.lchmod);
      fs.chownSync = chownFixSync(fs.chownSync);
      fs.fchownSync = chownFixSync(fs.fchownSync);
      fs.lchownSync = chownFixSync(fs.lchownSync);
      fs.chmodSync = chmodFixSync(fs.chmodSync);
      fs.fchmodSync = chmodFixSync(fs.fchmodSync);
      fs.lchmodSync = chmodFixSync(fs.lchmodSync);
      fs.stat = statFix(fs.stat);
      fs.fstat = statFix(fs.fstat);
      fs.lstat = statFix(fs.lstat);
      fs.statSync = statFixSync(fs.statSync);
      fs.fstatSync = statFixSync(fs.fstatSync);
      fs.lstatSync = statFixSync(fs.lstatSync);
      if (!fs.lchmod) {
        fs.lchmod = function(path3, mode, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs.lchmodSync = function() {
        };
      }
      if (!fs.lchown) {
        fs.lchown = function(path3, uid, gid, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs.rename = function(fs$rename) {
          return function(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb)
                cb(er);
            });
          };
        }(fs.rename);
      }
      fs.read = function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs, fd, buffer, offset, length, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs, fd, buffer, offset, length, position, callback);
        }
        read.__proto__ = fs$read;
        return read;
      }(fs.read);
      fs.readSync = function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs, fd, buffer, offset, length, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs.readSync);
      function patchLchmod(fs2) {
        fs2.lchmod = function(path3, mode, callback) {
          fs2.open(path3, constants.O_WRONLY | constants.O_SYMLINK, mode, function(err, fd) {
            if (err) {
              if (callback)
                callback(err);
              return;
            }
            fs2.fchmod(fd, mode, function(err2) {
              fs2.close(fd, function(err22) {
                if (callback)
                  callback(err2 || err22);
              });
            });
          });
        };
        fs2.lchmodSync = function(path3, mode) {
          var fd = fs2.openSync(path3, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs2.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs2.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs2.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs2) {
        if (constants.hasOwnProperty("O_SYMLINK")) {
          fs2.lutimes = function(path3, at, mt, cb) {
            fs2.open(path3, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb)
                  cb(er);
                return;
              }
              fs2.futimes(fd, at, mt, function(er2) {
                fs2.close(fd, function(er22) {
                  if (cb)
                    cb(er2 || er22);
                });
              });
            });
          };
          fs2.lutimesSync = function(path3, at, mt) {
            var fd = fs2.openSync(path3, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs2.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs2.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs2.closeSync(fd);
              }
            }
            return ret;
          };
        } else {
          fs2.lutimes = function(_a2, _b, _c, cb) {
            if (cb)
              process.nextTick(cb);
          };
          fs2.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig)
          return orig;
        return function(target, mode, cb) {
          return orig.call(fs, target, mode, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, mode) {
          try {
            return orig.call(fs, target, mode);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs, target, uid, gid, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig)
          return orig;
        return function(target, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0)
                stats.uid += 4294967296;
              if (stats.gid < 0)
                stats.gid += 4294967296;
            }
            if (cb)
              cb.apply(this, arguments);
          }
          return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
          if (stats.uid < 0)
            stats.uid += 4294967296;
          if (stats.gid < 0)
            stats.gid += 4294967296;
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "node_modules/graceful-fs/legacy-streams.js"(exports, module2) {
    var Stream2 = require("stream").Stream;
    module2.exports = legacy;
    function legacy(fs) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path3, options) {
        if (!(this instanceof ReadStream))
          return new ReadStream(path3, options);
        Stream2.call(this);
        var self2 = this;
        this.path = path3;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key2 = keys[index];
          this[key2] = options[key2];
        }
        if (this.encoding)
          this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self2._read();
          });
          return;
        }
        fs.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self2.emit("error", err);
            self2.readable = false;
            return;
          }
          self2.fd = fd;
          self2.emit("open", fd);
          self2._read();
        });
      }
      function WriteStream(path3, options) {
        if (!(this instanceof WriteStream))
          return new WriteStream(path3, options);
        Stream2.call(this);
        this.path = path3;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key2 = keys[index];
          this[key2] = options[key2];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "node_modules/graceful-fs/clone.js"(exports, module2) {
    "use strict";
    module2.exports = clone;
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: obj.__proto__ };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key2) {
        Object.defineProperty(copy, key2, Object.getOwnPropertyDescriptor(obj, key2));
      });
      return copy;
    }
  }
});

// node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "node_modules/graceful-fs/graceful-fs.js"(exports, module2) {
    var fs = require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone = require_clone();
    var util2 = require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop() {
    }
    var debug = noop;
    if (util2.debuglog)
      debug = util2.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m = util2.format.apply(util2, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
        console.error(m);
      };
    if (!global[gracefulQueue]) {
      queue = [];
      Object.defineProperty(global, gracefulQueue, {
        get: function() {
          return queue;
        }
      });
      fs.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs, fd, function(err) {
            if (!err) {
              retry();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs.close);
      fs.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs, arguments);
          retry();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(global[gracefulQueue]);
          require("assert").equal(global[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    module2.exports = patch(clone(fs));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
      module2.exports = patch(fs);
      fs.__patched = true;
    }
    function patch(fs2) {
      polyfills(fs2);
      fs2.gracefulify = patch;
      fs2.createReadStream = createReadStream;
      fs2.createWriteStream = createWriteStream;
      var fs$readFile = fs2.readFile;
      fs2.readFile = readFile;
      function readFile(path3, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path3, options, cb);
        function go$readFile(path4, options2, cb2) {
          return fs$readFile(path4, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path4, options2, cb2]]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
              retry();
            }
          });
        }
      }
      var fs$writeFile = fs2.writeFile;
      fs2.writeFile = writeFile;
      function writeFile(path3, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path3, data, options, cb);
        function go$writeFile(path4, data2, options2, cb2) {
          return fs$writeFile(path4, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path4, data2, options2, cb2]]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
              retry();
            }
          });
        }
      }
      var fs$appendFile = fs2.appendFile;
      if (fs$appendFile)
        fs2.appendFile = appendFile;
      function appendFile(path3, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path3, data, options, cb);
        function go$appendFile(path4, data2, options2, cb2) {
          return fs$appendFile(path4, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path4, data2, options2, cb2]]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
              retry();
            }
          });
        }
      }
      var fs$readdir = fs2.readdir;
      fs2.readdir = readdir;
      function readdir(path3, options, cb) {
        var args = [path3];
        if (typeof options !== "function") {
          args.push(options);
        } else {
          cb = options;
        }
        args.push(go$readdir$cb);
        return go$readdir(args);
        function go$readdir$cb(err, files) {
          if (files && files.sort)
            files.sort();
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$readdir, [args]]);
          else {
            if (typeof cb === "function")
              cb.apply(this, arguments);
            retry();
          }
        }
      }
      function go$readdir(args) {
        return fs$readdir.apply(fs2, args);
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs2);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs2.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs2.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs2, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs2, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs2, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs2, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path3, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path3, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream(path3, options) {
        return new fs2.ReadStream(path3, options);
      }
      function createWriteStream(path3, options) {
        return new fs2.WriteStream(path3, options);
      }
      var fs$open = fs2.open;
      fs2.open = open;
      function open(path3, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path3, flags, mode, cb);
        function go$open(path4, flags2, mode2, cb2) {
          return fs$open(path4, flags2, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path4, flags2, mode2, cb2]]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
              retry();
            }
          });
        }
      }
      return fs2;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      global[gracefulQueue].push(elem);
    }
    function retry() {
      var elem = global[gracefulQueue].shift();
      if (elem) {
        debug("RETRY", elem[0].name, elem[1]);
        elem[0].apply(null, elem[1]);
      }
    }
  }
});

// node_modules/fs-extra/lib/fs/index.js
var require_fs = __commonJS({
  "node_modules/fs-extra/lib/fs/index.js"(exports) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs = require_graceful_fs();
    var api = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchown",
      "lchmod",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "readFile",
      "readdir",
      "readlink",
      "realpath",
      "rename",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((key2) => {
      return typeof fs[key2] === "function";
    });
    Object.keys(fs).forEach((key2) => {
      if (key2 === "promises") {
        return;
      }
      exports[key2] = fs[key2];
    });
    api.forEach((method) => {
      exports[method] = u(fs[method]);
    });
    exports.exists = function(filename, callback) {
      if (typeof callback === "function") {
        return fs.exists(filename, callback);
      }
      return new Promise((resolve2) => {
        return fs.exists(filename, resolve2);
      });
    };
    exports.read = function(fd, buffer, offset, length, position, callback) {
      if (typeof callback === "function") {
        return fs.read(fd, buffer, offset, length, position, callback);
      }
      return new Promise((resolve2, reject) => {
        fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer2) => {
          if (err)
            return reject(err);
          resolve2({ bytesRead, buffer: buffer2 });
        });
      });
    };
    exports.write = function(fd, buffer, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs.write(fd, buffer, ...args);
      }
      return new Promise((resolve2, reject) => {
        fs.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
          if (err)
            return reject(err);
          resolve2({ bytesWritten, buffer: buffer2 });
        });
      });
    };
    if (typeof fs.realpath.native === "function") {
      exports.realpath.native = u(fs.realpath.native);
    }
  }
});

// node_modules/fs-extra/lib/mkdirs/win32.js
var require_win32 = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/win32.js"(exports, module2) {
    "use strict";
    var path3 = require("path");
    function getRootPath(p) {
      p = path3.normalize(path3.resolve(p)).split(path3.sep);
      if (p.length > 0)
        return p[0];
      return null;
    }
    var INVALID_PATH_CHARS = /[<>:"|?*]/;
    function invalidWin32Path(p) {
      const rp = getRootPath(p);
      p = p.replace(rp, "");
      return INVALID_PATH_CHARS.test(p);
    }
    module2.exports = {
      getRootPath,
      invalidWin32Path
    };
  }
});

// node_modules/fs-extra/lib/mkdirs/mkdirs.js
var require_mkdirs = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/mkdirs.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path3 = require("path");
    var invalidWin32Path = require_win32().invalidWin32Path;
    var o777 = parseInt("0777", 8);
    function mkdirs(p, opts, callback, made) {
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      } else if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      if (process.platform === "win32" && invalidWin32Path(p)) {
        const errInval = new Error(p + " contains invalid WIN32 path characters.");
        errInval.code = "EINVAL";
        return callback(errInval);
      }
      let mode = opts.mode;
      const xfs = opts.fs || fs;
      if (mode === void 0) {
        mode = o777 & ~process.umask();
      }
      if (!made)
        made = null;
      callback = callback || function() {
      };
      p = path3.resolve(p);
      xfs.mkdir(p, mode, (er) => {
        if (!er) {
          made = made || p;
          return callback(null, made);
        }
        switch (er.code) {
          case "ENOENT":
            if (path3.dirname(p) === p)
              return callback(er);
            mkdirs(path3.dirname(p), opts, (er2, made2) => {
              if (er2)
                callback(er2, made2);
              else
                mkdirs(p, opts, callback, made2);
            });
            break;
          default:
            xfs.stat(p, (er2, stat) => {
              if (er2 || !stat.isDirectory())
                callback(er, made);
              else
                callback(null, made);
            });
            break;
        }
      });
    }
    module2.exports = mkdirs;
  }
});

// node_modules/fs-extra/lib/mkdirs/mkdirs-sync.js
var require_mkdirs_sync = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/mkdirs-sync.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path3 = require("path");
    var invalidWin32Path = require_win32().invalidWin32Path;
    var o777 = parseInt("0777", 8);
    function mkdirsSync(p, opts, made) {
      if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      let mode = opts.mode;
      const xfs = opts.fs || fs;
      if (process.platform === "win32" && invalidWin32Path(p)) {
        const errInval = new Error(p + " contains invalid WIN32 path characters.");
        errInval.code = "EINVAL";
        throw errInval;
      }
      if (mode === void 0) {
        mode = o777 & ~process.umask();
      }
      if (!made)
        made = null;
      p = path3.resolve(p);
      try {
        xfs.mkdirSync(p, mode);
        made = made || p;
      } catch (err0) {
        if (err0.code === "ENOENT") {
          if (path3.dirname(p) === p)
            throw err0;
          made = mkdirsSync(path3.dirname(p), opts, made);
          mkdirsSync(p, opts, made);
        } else {
          let stat;
          try {
            stat = xfs.statSync(p);
          } catch (err1) {
            throw err0;
          }
          if (!stat.isDirectory())
            throw err0;
        }
      }
      return made;
    }
    module2.exports = mkdirsSync;
  }
});

// node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs2 = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var mkdirs = u(require_mkdirs());
    var mkdirsSync = require_mkdirs_sync();
    module2.exports = {
      mkdirs,
      mkdirsSync,
      mkdirp: mkdirs,
      mkdirpSync: mkdirsSync,
      ensureDir: mkdirs,
      ensureDirSync: mkdirsSync
    };
  }
});

// node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS({
  "node_modules/fs-extra/lib/util/utimes.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var os = require("os");
    var path3 = require("path");
    function hasMillisResSync() {
      let tmpfile = path3.join("millis-test-sync" + Date.now().toString() + Math.random().toString().slice(2));
      tmpfile = path3.join(os.tmpdir(), tmpfile);
      const d = new Date(1435410243862);
      fs.writeFileSync(tmpfile, "https://github.com/jprichardson/node-fs-extra/pull/141");
      const fd = fs.openSync(tmpfile, "r+");
      fs.futimesSync(fd, d, d);
      fs.closeSync(fd);
      return fs.statSync(tmpfile).mtime > 1435410243e3;
    }
    function hasMillisRes(callback) {
      let tmpfile = path3.join("millis-test" + Date.now().toString() + Math.random().toString().slice(2));
      tmpfile = path3.join(os.tmpdir(), tmpfile);
      const d = new Date(1435410243862);
      fs.writeFile(tmpfile, "https://github.com/jprichardson/node-fs-extra/pull/141", (err) => {
        if (err)
          return callback(err);
        fs.open(tmpfile, "r+", (err2, fd) => {
          if (err2)
            return callback(err2);
          fs.futimes(fd, d, d, (err3) => {
            if (err3)
              return callback(err3);
            fs.close(fd, (err4) => {
              if (err4)
                return callback(err4);
              fs.stat(tmpfile, (err5, stats) => {
                if (err5)
                  return callback(err5);
                callback(null, stats.mtime > 1435410243e3);
              });
            });
          });
        });
      });
    }
    function timeRemoveMillis(timestamp) {
      if (typeof timestamp === "number") {
        return Math.floor(timestamp / 1e3) * 1e3;
      } else if (timestamp instanceof Date) {
        return new Date(Math.floor(timestamp.getTime() / 1e3) * 1e3);
      } else {
        throw new Error("fs-extra: timeRemoveMillis() unknown parameter type");
      }
    }
    function utimesMillis(path4, atime, mtime, callback) {
      fs.open(path4, "r+", (err, fd) => {
        if (err)
          return callback(err);
        fs.futimes(fd, atime, mtime, (futimesErr) => {
          fs.close(fd, (closeErr) => {
            if (callback)
              callback(futimesErr || closeErr);
          });
        });
      });
    }
    function utimesMillisSync(path4, atime, mtime) {
      const fd = fs.openSync(path4, "r+");
      fs.futimesSync(fd, atime, mtime);
      return fs.closeSync(fd);
    }
    module2.exports = {
      hasMillisRes,
      hasMillisResSync,
      timeRemoveMillis,
      utimesMillis,
      utimesMillisSync
    };
  }
});

// node_modules/fs-extra/lib/util/stat.js
var require_stat = __commonJS({
  "node_modules/fs-extra/lib/util/stat.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path3 = require("path");
    var NODE_VERSION_MAJOR_WITH_BIGINT = 10;
    var NODE_VERSION_MINOR_WITH_BIGINT = 5;
    var NODE_VERSION_PATCH_WITH_BIGINT = 0;
    var nodeVersion = process.versions.node.split(".");
    var nodeVersionMajor = Number.parseInt(nodeVersion[0], 10);
    var nodeVersionMinor = Number.parseInt(nodeVersion[1], 10);
    var nodeVersionPatch = Number.parseInt(nodeVersion[2], 10);
    function nodeSupportsBigInt() {
      if (nodeVersionMajor > NODE_VERSION_MAJOR_WITH_BIGINT) {
        return true;
      } else if (nodeVersionMajor === NODE_VERSION_MAJOR_WITH_BIGINT) {
        if (nodeVersionMinor > NODE_VERSION_MINOR_WITH_BIGINT) {
          return true;
        } else if (nodeVersionMinor === NODE_VERSION_MINOR_WITH_BIGINT) {
          if (nodeVersionPatch >= NODE_VERSION_PATCH_WITH_BIGINT) {
            return true;
          }
        }
      }
      return false;
    }
    function getStats(src, dest, cb) {
      if (nodeSupportsBigInt()) {
        fs.stat(src, { bigint: true }, (err, srcStat) => {
          if (err)
            return cb(err);
          fs.stat(dest, { bigint: true }, (err2, destStat) => {
            if (err2) {
              if (err2.code === "ENOENT")
                return cb(null, { srcStat, destStat: null });
              return cb(err2);
            }
            return cb(null, { srcStat, destStat });
          });
        });
      } else {
        fs.stat(src, (err, srcStat) => {
          if (err)
            return cb(err);
          fs.stat(dest, (err2, destStat) => {
            if (err2) {
              if (err2.code === "ENOENT")
                return cb(null, { srcStat, destStat: null });
              return cb(err2);
            }
            return cb(null, { srcStat, destStat });
          });
        });
      }
    }
    function getStatsSync(src, dest) {
      let srcStat, destStat;
      if (nodeSupportsBigInt()) {
        srcStat = fs.statSync(src, { bigint: true });
      } else {
        srcStat = fs.statSync(src);
      }
      try {
        if (nodeSupportsBigInt()) {
          destStat = fs.statSync(dest, { bigint: true });
        } else {
          destStat = fs.statSync(dest);
        }
      } catch (err) {
        if (err.code === "ENOENT")
          return { srcStat, destStat: null };
        throw err;
      }
      return { srcStat, destStat };
    }
    function checkPaths(src, dest, funcName, cb) {
      getStats(src, dest, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
          return cb(new Error("Source and destination must not be the same."));
        }
        if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return cb(null, { srcStat, destStat });
      });
    }
    function checkPathsSync(src, dest, funcName) {
      const { srcStat, destStat } = getStatsSync(src, dest);
      if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        throw new Error("Source and destination must not be the same.");
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    function checkParentPaths(src, srcStat, dest, funcName, cb) {
      const srcParent = path3.resolve(path3.dirname(src));
      const destParent = path3.resolve(path3.dirname(dest));
      if (destParent === srcParent || destParent === path3.parse(destParent).root)
        return cb();
      if (nodeSupportsBigInt()) {
        fs.stat(destParent, { bigint: true }, (err, destStat) => {
          if (err) {
            if (err.code === "ENOENT")
              return cb();
            return cb(err);
          }
          if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
            return cb(new Error(errMsg(src, dest, funcName)));
          }
          return checkParentPaths(src, srcStat, destParent, funcName, cb);
        });
      } else {
        fs.stat(destParent, (err, destStat) => {
          if (err) {
            if (err.code === "ENOENT")
              return cb();
            return cb(err);
          }
          if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
            return cb(new Error(errMsg(src, dest, funcName)));
          }
          return checkParentPaths(src, srcStat, destParent, funcName, cb);
        });
      }
    }
    function checkParentPathsSync(src, srcStat, dest, funcName) {
      const srcParent = path3.resolve(path3.dirname(src));
      const destParent = path3.resolve(path3.dirname(dest));
      if (destParent === srcParent || destParent === path3.parse(destParent).root)
        return;
      let destStat;
      try {
        if (nodeSupportsBigInt()) {
          destStat = fs.statSync(destParent, { bigint: true });
        } else {
          destStat = fs.statSync(destParent);
        }
      } catch (err) {
        if (err.code === "ENOENT")
          return;
        throw err;
      }
      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName);
    }
    function isSrcSubdir(src, dest) {
      const srcArr = path3.resolve(src).split(path3.sep).filter((i) => i);
      const destArr = path3.resolve(dest).split(path3.sep).filter((i) => i);
      return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true);
    }
    function errMsg(src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
    }
    module2.exports = {
      checkPaths,
      checkPathsSync,
      checkParentPaths,
      checkParentPathsSync,
      isSrcSubdir
    };
  }
});

// node_modules/fs-extra/lib/util/buffer.js
var require_buffer = __commonJS({
  "node_modules/fs-extra/lib/util/buffer.js"(exports, module2) {
    "use strict";
    module2.exports = function(size) {
      if (typeof Buffer.allocUnsafe === "function") {
        try {
          return Buffer.allocUnsafe(size);
        } catch (e) {
          return new Buffer(size);
        }
      }
      return new Buffer(size);
    };
  }
});

// node_modules/fs-extra/lib/copy-sync/copy-sync.js
var require_copy_sync = __commonJS({
  "node_modules/fs-extra/lib/copy-sync/copy-sync.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path3 = require("path");
    var mkdirpSync = require_mkdirs2().mkdirsSync;
    var utimesSync = require_utimes().utimesMillisSync;
    var stat = require_stat();
    function copySync(src, dest, opts) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
      }
      const { srcStat, destStat } = stat.checkPathsSync(src, dest, "copy");
      stat.checkParentPathsSync(src, srcStat, dest, "copy");
      return handleFilterAndCopy(destStat, src, dest, opts);
    }
    function handleFilterAndCopy(destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest))
        return;
      const destParent = path3.dirname(dest);
      if (!fs.existsSync(destParent))
        mkdirpSync(destParent);
      return startCopy(destStat, src, dest, opts);
    }
    function startCopy(destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest))
        return;
      return getStats(destStat, src, dest, opts);
    }
    function getStats(destStat, src, dest, opts) {
      const statSync = opts.dereference ? fs.statSync : fs.lstatSync;
      const srcStat = statSync(src);
      if (srcStat.isDirectory())
        return onDir(srcStat, destStat, src, dest, opts);
      else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
        return onFile(srcStat, destStat, src, dest, opts);
      else if (srcStat.isSymbolicLink())
        return onLink(destStat, src, dest, opts);
    }
    function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts);
      return mayCopyFile(srcStat, src, dest, opts);
    }
    function mayCopyFile(srcStat, src, dest, opts) {
      if (opts.overwrite) {
        fs.unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts);
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    function copyFile(srcStat, src, dest, opts) {
      if (typeof fs.copyFileSync === "function") {
        fs.copyFileSync(src, dest);
        fs.chmodSync(dest, srcStat.mode);
        if (opts.preserveTimestamps) {
          return utimesSync(dest, srcStat.atime, srcStat.mtime);
        }
        return;
      }
      return copyFileFallback(srcStat, src, dest, opts);
    }
    function copyFileFallback(srcStat, src, dest, opts) {
      const BUF_LENGTH = 64 * 1024;
      const _buff = require_buffer()(BUF_LENGTH);
      const fdr = fs.openSync(src, "r");
      const fdw = fs.openSync(dest, "w", srcStat.mode);
      let pos = 0;
      while (pos < srcStat.size) {
        const bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
        fs.writeSync(fdw, _buff, 0, bytesRead);
        pos += bytesRead;
      }
      if (opts.preserveTimestamps)
        fs.futimesSync(fdw, srcStat.atime, srcStat.mtime);
      fs.closeSync(fdr);
      fs.closeSync(fdw);
    }
    function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return mkDirAndCopy(srcStat, src, dest, opts);
      if (destStat && !destStat.isDirectory()) {
        throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
      }
      return copyDir(src, dest, opts);
    }
    function mkDirAndCopy(srcStat, src, dest, opts) {
      fs.mkdirSync(dest);
      copyDir(src, dest, opts);
      return fs.chmodSync(dest, srcStat.mode);
    }
    function copyDir(src, dest, opts) {
      fs.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
    }
    function copyDirItem(item, src, dest, opts) {
      const srcItem = path3.join(src, item);
      const destItem = path3.join(dest, item);
      const { destStat } = stat.checkPathsSync(srcItem, destItem, "copy");
      return startCopy(destStat, srcItem, destItem, opts);
    }
    function onLink(destStat, src, dest, opts) {
      let resolvedSrc = fs.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path3.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs.symlinkSync(resolvedSrc, dest);
      } else {
        let resolvedDest;
        try {
          resolvedDest = fs.readlinkSync(dest);
        } catch (err) {
          if (err.code === "EINVAL" || err.code === "UNKNOWN")
            return fs.symlinkSync(resolvedSrc, dest);
          throw err;
        }
        if (opts.dereference) {
          resolvedDest = path3.resolve(process.cwd(), resolvedDest);
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
        }
        if (fs.statSync(dest).isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
        }
        return copyLink(resolvedSrc, dest);
      }
    }
    function copyLink(resolvedSrc, dest) {
      fs.unlinkSync(dest);
      return fs.symlinkSync(resolvedSrc, dest);
    }
    module2.exports = copySync;
  }
});

// node_modules/fs-extra/lib/copy-sync/index.js
var require_copy_sync2 = __commonJS({
  "node_modules/fs-extra/lib/copy-sync/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      copySync: require_copy_sync()
    };
  }
});

// node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists = __commonJS({
  "node_modules/fs-extra/lib/path-exists/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs = require_fs();
    function pathExists(path3) {
      return fs.access(path3).then(() => true).catch(() => false);
    }
    module2.exports = {
      pathExists: u(pathExists),
      pathExistsSync: fs.existsSync
    };
  }
});

// node_modules/fs-extra/lib/copy/copy.js
var require_copy = __commonJS({
  "node_modules/fs-extra/lib/copy/copy.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path3 = require("path");
    var mkdirp = require_mkdirs2().mkdirs;
    var pathExists = require_path_exists().pathExists;
    var utimes = require_utimes().utimesMillis;
    var stat = require_stat();
    function copy(src, dest, opts, cb) {
      if (typeof opts === "function" && !cb) {
        cb = opts;
        opts = {};
      } else if (typeof opts === "function") {
        opts = { filter: opts };
      }
      cb = cb || function() {
      };
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
      }
      stat.checkPaths(src, dest, "copy", (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        stat.checkParentPaths(src, srcStat, dest, "copy", (err2) => {
          if (err2)
            return cb(err2);
          if (opts.filter)
            return handleFilter(checkParentDir, destStat, src, dest, opts, cb);
          return checkParentDir(destStat, src, dest, opts, cb);
        });
      });
    }
    function checkParentDir(destStat, src, dest, opts, cb) {
      const destParent = path3.dirname(dest);
      pathExists(destParent, (err, dirExists) => {
        if (err)
          return cb(err);
        if (dirExists)
          return startCopy(destStat, src, dest, opts, cb);
        mkdirp(destParent, (err2) => {
          if (err2)
            return cb(err2);
          return startCopy(destStat, src, dest, opts, cb);
        });
      });
    }
    function handleFilter(onInclude, destStat, src, dest, opts, cb) {
      Promise.resolve(opts.filter(src, dest)).then((include) => {
        if (include)
          return onInclude(destStat, src, dest, opts, cb);
        return cb();
      }, (error) => cb(error));
    }
    function startCopy(destStat, src, dest, opts, cb) {
      if (opts.filter)
        return handleFilter(getStats, destStat, src, dest, opts, cb);
      return getStats(destStat, src, dest, opts, cb);
    }
    function getStats(destStat, src, dest, opts, cb) {
      const stat2 = opts.dereference ? fs.stat : fs.lstat;
      stat2(src, (err, srcStat) => {
        if (err)
          return cb(err);
        if (srcStat.isDirectory())
          return onDir(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
          return onFile(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isSymbolicLink())
          return onLink(destStat, src, dest, opts, cb);
      });
    }
    function onFile(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts, cb);
      return mayCopyFile(srcStat, src, dest, opts, cb);
    }
    function mayCopyFile(srcStat, src, dest, opts, cb) {
      if (opts.overwrite) {
        fs.unlink(dest, (err) => {
          if (err)
            return cb(err);
          return copyFile(srcStat, src, dest, opts, cb);
        });
      } else if (opts.errorOnExist) {
        return cb(new Error(`'${dest}' already exists`));
      } else
        return cb();
    }
    function copyFile(srcStat, src, dest, opts, cb) {
      if (typeof fs.copyFile === "function") {
        return fs.copyFile(src, dest, (err) => {
          if (err)
            return cb(err);
          return setDestModeAndTimestamps(srcStat, dest, opts, cb);
        });
      }
      return copyFileFallback(srcStat, src, dest, opts, cb);
    }
    function copyFileFallback(srcStat, src, dest, opts, cb) {
      const rs = fs.createReadStream(src);
      rs.on("error", (err) => cb(err)).once("open", () => {
        const ws = fs.createWriteStream(dest, { mode: srcStat.mode });
        ws.on("error", (err) => cb(err)).on("open", () => rs.pipe(ws)).once("close", () => setDestModeAndTimestamps(srcStat, dest, opts, cb));
      });
    }
    function setDestModeAndTimestamps(srcStat, dest, opts, cb) {
      fs.chmod(dest, srcStat.mode, (err) => {
        if (err)
          return cb(err);
        if (opts.preserveTimestamps) {
          return utimes(dest, srcStat.atime, srcStat.mtime, cb);
        }
        return cb();
      });
    }
    function onDir(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return mkDirAndCopy(srcStat, src, dest, opts, cb);
      if (destStat && !destStat.isDirectory()) {
        return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
      }
      return copyDir(src, dest, opts, cb);
    }
    function mkDirAndCopy(srcStat, src, dest, opts, cb) {
      fs.mkdir(dest, (err) => {
        if (err)
          return cb(err);
        copyDir(src, dest, opts, (err2) => {
          if (err2)
            return cb(err2);
          return fs.chmod(dest, srcStat.mode, cb);
        });
      });
    }
    function copyDir(src, dest, opts, cb) {
      fs.readdir(src, (err, items) => {
        if (err)
          return cb(err);
        return copyDirItems(items, src, dest, opts, cb);
      });
    }
    function copyDirItems(items, src, dest, opts, cb) {
      const item = items.pop();
      if (!item)
        return cb();
      return copyDirItem(items, item, src, dest, opts, cb);
    }
    function copyDirItem(items, item, src, dest, opts, cb) {
      const srcItem = path3.join(src, item);
      const destItem = path3.join(dest, item);
      stat.checkPaths(srcItem, destItem, "copy", (err, stats) => {
        if (err)
          return cb(err);
        const { destStat } = stats;
        startCopy(destStat, srcItem, destItem, opts, (err2) => {
          if (err2)
            return cb(err2);
          return copyDirItems(items, src, dest, opts, cb);
        });
      });
    }
    function onLink(destStat, src, dest, opts, cb) {
      fs.readlink(src, (err, resolvedSrc) => {
        if (err)
          return cb(err);
        if (opts.dereference) {
          resolvedSrc = path3.resolve(process.cwd(), resolvedSrc);
        }
        if (!destStat) {
          return fs.symlink(resolvedSrc, dest, cb);
        } else {
          fs.readlink(dest, (err2, resolvedDest) => {
            if (err2) {
              if (err2.code === "EINVAL" || err2.code === "UNKNOWN")
                return fs.symlink(resolvedSrc, dest, cb);
              return cb(err2);
            }
            if (opts.dereference) {
              resolvedDest = path3.resolve(process.cwd(), resolvedDest);
            }
            if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
              return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
            }
            if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
              return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
            }
            return copyLink(resolvedSrc, dest, cb);
          });
        }
      });
    }
    function copyLink(resolvedSrc, dest, cb) {
      fs.unlink(dest, (err) => {
        if (err)
          return cb(err);
        return fs.symlink(resolvedSrc, dest, cb);
      });
    }
    module2.exports = copy;
  }
});

// node_modules/fs-extra/lib/copy/index.js
var require_copy2 = __commonJS({
  "node_modules/fs-extra/lib/copy/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    module2.exports = {
      copy: u(require_copy())
    };
  }
});

// node_modules/fs-extra/lib/remove/rimraf.js
var require_rimraf = __commonJS({
  "node_modules/fs-extra/lib/remove/rimraf.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path3 = require("path");
    var assert = require("assert");
    var isWindows = process.platform === "win32";
    function defaults(options) {
      const methods = [
        "unlink",
        "chmod",
        "stat",
        "lstat",
        "rmdir",
        "readdir"
      ];
      methods.forEach((m) => {
        options[m] = options[m] || fs[m];
        m = m + "Sync";
        options[m] = options[m] || fs[m];
      });
      options.maxBusyTries = options.maxBusyTries || 3;
    }
    function rimraf(p, options, cb) {
      let busyTries = 0;
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      assert(p, "rimraf: missing path");
      assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
      assert.strictEqual(typeof cb, "function", "rimraf: callback function required");
      assert(options, "rimraf: invalid options argument provided");
      assert.strictEqual(typeof options, "object", "rimraf: options should be object");
      defaults(options);
      rimraf_(p, options, function CB(er) {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
            busyTries++;
            const time = busyTries * 100;
            return setTimeout(() => rimraf_(p, options, CB), time);
          }
          if (er.code === "ENOENT")
            er = null;
        }
        cb(er);
      });
    }
    function rimraf_(p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.lstat(p, (er, st) => {
        if (er && er.code === "ENOENT") {
          return cb(null);
        }
        if (er && er.code === "EPERM" && isWindows) {
          return fixWinEPERM(p, options, er, cb);
        }
        if (st && st.isDirectory()) {
          return rmdir(p, options, er, cb);
        }
        options.unlink(p, (er2) => {
          if (er2) {
            if (er2.code === "ENOENT") {
              return cb(null);
            }
            if (er2.code === "EPERM") {
              return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
            }
            if (er2.code === "EISDIR") {
              return rmdir(p, options, er2, cb);
            }
          }
          return cb(er2);
        });
      });
    }
    function fixWinEPERM(p, options, er, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      if (er) {
        assert(er instanceof Error);
      }
      options.chmod(p, 438, (er2) => {
        if (er2) {
          cb(er2.code === "ENOENT" ? null : er);
        } else {
          options.stat(p, (er3, stats) => {
            if (er3) {
              cb(er3.code === "ENOENT" ? null : er);
            } else if (stats.isDirectory()) {
              rmdir(p, options, er, cb);
            } else {
              options.unlink(p, cb);
            }
          });
        }
      });
    }
    function fixWinEPERMSync(p, options, er) {
      let stats;
      assert(p);
      assert(options);
      if (er) {
        assert(er instanceof Error);
      }
      try {
        options.chmodSync(p, 438);
      } catch (er2) {
        if (er2.code === "ENOENT") {
          return;
        } else {
          throw er;
        }
      }
      try {
        stats = options.statSync(p);
      } catch (er3) {
        if (er3.code === "ENOENT") {
          return;
        } else {
          throw er;
        }
      }
      if (stats.isDirectory()) {
        rmdirSync(p, options, er);
      } else {
        options.unlinkSync(p);
      }
    }
    function rmdir(p, options, originalEr, cb) {
      assert(p);
      assert(options);
      if (originalEr) {
        assert(originalEr instanceof Error);
      }
      assert(typeof cb === "function");
      options.rmdir(p, (er) => {
        if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) {
          rmkids(p, options, cb);
        } else if (er && er.code === "ENOTDIR") {
          cb(originalEr);
        } else {
          cb(er);
        }
      });
    }
    function rmkids(p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.readdir(p, (er, files) => {
        if (er)
          return cb(er);
        let n = files.length;
        let errState;
        if (n === 0)
          return options.rmdir(p, cb);
        files.forEach((f) => {
          rimraf(path3.join(p, f), options, (er2) => {
            if (errState) {
              return;
            }
            if (er2)
              return cb(errState = er2);
            if (--n === 0) {
              options.rmdir(p, cb);
            }
          });
        });
      });
    }
    function rimrafSync(p, options) {
      let st;
      options = options || {};
      defaults(options);
      assert(p, "rimraf: missing path");
      assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
      assert(options, "rimraf: missing options");
      assert.strictEqual(typeof options, "object", "rimraf: options should be object");
      try {
        st = options.lstatSync(p);
      } catch (er) {
        if (er.code === "ENOENT") {
          return;
        }
        if (er.code === "EPERM" && isWindows) {
          fixWinEPERMSync(p, options, er);
        }
      }
      try {
        if (st && st.isDirectory()) {
          rmdirSync(p, options, null);
        } else {
          options.unlinkSync(p);
        }
      } catch (er) {
        if (er.code === "ENOENT") {
          return;
        } else if (er.code === "EPERM") {
          return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
        } else if (er.code !== "EISDIR") {
          throw er;
        }
        rmdirSync(p, options, er);
      }
    }
    function rmdirSync(p, options, originalEr) {
      assert(p);
      assert(options);
      if (originalEr) {
        assert(originalEr instanceof Error);
      }
      try {
        options.rmdirSync(p);
      } catch (er) {
        if (er.code === "ENOTDIR") {
          throw originalEr;
        } else if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") {
          rmkidsSync(p, options);
        } else if (er.code !== "ENOENT") {
          throw er;
        }
      }
    }
    function rmkidsSync(p, options) {
      assert(p);
      assert(options);
      options.readdirSync(p).forEach((f) => rimrafSync(path3.join(p, f), options));
      if (isWindows) {
        const startTime = Date.now();
        do {
          try {
            const ret = options.rmdirSync(p, options);
            return ret;
          } catch (er) {
          }
        } while (Date.now() - startTime < 500);
      } else {
        const ret = options.rmdirSync(p, options);
        return ret;
      }
    }
    module2.exports = rimraf;
    rimraf.sync = rimrafSync;
  }
});

// node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS({
  "node_modules/fs-extra/lib/remove/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var rimraf = require_rimraf();
    module2.exports = {
      remove: u(rimraf),
      removeSync: rimraf.sync
    };
  }
});

// node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS({
  "node_modules/fs-extra/lib/empty/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs = require_graceful_fs();
    var path3 = require("path");
    var mkdir = require_mkdirs2();
    var remove = require_remove();
    var emptyDir = u(function emptyDir2(dir, callback) {
      callback = callback || function() {
      };
      fs.readdir(dir, (err, items) => {
        if (err)
          return mkdir.mkdirs(dir, callback);
        items = items.map((item) => path3.join(dir, item));
        deleteItem();
        function deleteItem() {
          const item = items.pop();
          if (!item)
            return callback();
          remove.remove(item, (err2) => {
            if (err2)
              return callback(err2);
            deleteItem();
          });
        }
      });
    });
    function emptyDirSync(dir) {
      let items;
      try {
        items = fs.readdirSync(dir);
      } catch (err) {
        return mkdir.mkdirsSync(dir);
      }
      items.forEach((item) => {
        item = path3.join(dir, item);
        remove.removeSync(item);
      });
    }
    module2.exports = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };
  }
});

// node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS({
  "node_modules/fs-extra/lib/ensure/file.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path3 = require("path");
    var fs = require_graceful_fs();
    var mkdir = require_mkdirs2();
    var pathExists = require_path_exists().pathExists;
    function createFile(file, callback) {
      function makeFile() {
        fs.writeFile(file, "", (err) => {
          if (err)
            return callback(err);
          callback();
        });
      }
      fs.stat(file, (err, stats) => {
        if (!err && stats.isFile())
          return callback();
        const dir = path3.dirname(file);
        pathExists(dir, (err2, dirExists) => {
          if (err2)
            return callback(err2);
          if (dirExists)
            return makeFile();
          mkdir.mkdirs(dir, (err3) => {
            if (err3)
              return callback(err3);
            makeFile();
          });
        });
      });
    }
    function createFileSync(file) {
      let stats;
      try {
        stats = fs.statSync(file);
      } catch (e) {
      }
      if (stats && stats.isFile())
        return;
      const dir = path3.dirname(file);
      if (!fs.existsSync(dir)) {
        mkdir.mkdirsSync(dir);
      }
      fs.writeFileSync(file, "");
    }
    module2.exports = {
      createFile: u(createFile),
      createFileSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS({
  "node_modules/fs-extra/lib/ensure/link.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path3 = require("path");
    var fs = require_graceful_fs();
    var mkdir = require_mkdirs2();
    var pathExists = require_path_exists().pathExists;
    function createLink(srcpath, dstpath, callback) {
      function makeLink(srcpath2, dstpath2) {
        fs.link(srcpath2, dstpath2, (err) => {
          if (err)
            return callback(err);
          callback(null);
        });
      }
      pathExists(dstpath, (err, destinationExists) => {
        if (err)
          return callback(err);
        if (destinationExists)
          return callback(null);
        fs.lstat(srcpath, (err2) => {
          if (err2) {
            err2.message = err2.message.replace("lstat", "ensureLink");
            return callback(err2);
          }
          const dir = path3.dirname(dstpath);
          pathExists(dir, (err3, dirExists) => {
            if (err3)
              return callback(err3);
            if (dirExists)
              return makeLink(srcpath, dstpath);
            mkdir.mkdirs(dir, (err4) => {
              if (err4)
                return callback(err4);
              makeLink(srcpath, dstpath);
            });
          });
        });
      });
    }
    function createLinkSync(srcpath, dstpath) {
      const destinationExists = fs.existsSync(dstpath);
      if (destinationExists)
        return void 0;
      try {
        fs.lstatSync(srcpath);
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      const dir = path3.dirname(dstpath);
      const dirExists = fs.existsSync(dir);
      if (dirExists)
        return fs.linkSync(srcpath, dstpath);
      mkdir.mkdirsSync(dir);
      return fs.linkSync(srcpath, dstpath);
    }
    module2.exports = {
      createLink: u(createLink),
      createLinkSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports, module2) {
    "use strict";
    var path3 = require("path");
    var fs = require_graceful_fs();
    var pathExists = require_path_exists().pathExists;
    function symlinkPaths(srcpath, dstpath, callback) {
      if (path3.isAbsolute(srcpath)) {
        return fs.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace("lstat", "ensureSymlink");
            return callback(err);
          }
          return callback(null, {
            "toCwd": srcpath,
            "toDst": srcpath
          });
        });
      } else {
        const dstdir = path3.dirname(dstpath);
        const relativeToDst = path3.join(dstdir, srcpath);
        return pathExists(relativeToDst, (err, exists) => {
          if (err)
            return callback(err);
          if (exists) {
            return callback(null, {
              "toCwd": relativeToDst,
              "toDst": srcpath
            });
          } else {
            return fs.lstat(srcpath, (err2) => {
              if (err2) {
                err2.message = err2.message.replace("lstat", "ensureSymlink");
                return callback(err2);
              }
              return callback(null, {
                "toCwd": srcpath,
                "toDst": path3.relative(dstdir, srcpath)
              });
            });
          }
        });
      }
    }
    function symlinkPathsSync(srcpath, dstpath) {
      let exists;
      if (path3.isAbsolute(srcpath)) {
        exists = fs.existsSync(srcpath);
        if (!exists)
          throw new Error("absolute srcpath does not exist");
        return {
          "toCwd": srcpath,
          "toDst": srcpath
        };
      } else {
        const dstdir = path3.dirname(dstpath);
        const relativeToDst = path3.join(dstdir, srcpath);
        exists = fs.existsSync(relativeToDst);
        if (exists) {
          return {
            "toCwd": relativeToDst,
            "toDst": srcpath
          };
        } else {
          exists = fs.existsSync(srcpath);
          if (!exists)
            throw new Error("relative srcpath does not exist");
          return {
            "toCwd": srcpath,
            "toDst": path3.relative(dstdir, srcpath)
          };
        }
      }
    }
    module2.exports = {
      symlinkPaths,
      symlinkPathsSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-type.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    function symlinkType(srcpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      if (type)
        return callback(null, type);
      fs.lstat(srcpath, (err, stats) => {
        if (err)
          return callback(null, "file");
        type = stats && stats.isDirectory() ? "dir" : "file";
        callback(null, type);
      });
    }
    function symlinkTypeSync(srcpath, type) {
      let stats;
      if (type)
        return type;
      try {
        stats = fs.lstatSync(srcpath);
      } catch (e) {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    module2.exports = {
      symlinkType,
      symlinkTypeSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path3 = require("path");
    var fs = require_graceful_fs();
    var _mkdirs = require_mkdirs2();
    var mkdirs = _mkdirs.mkdirs;
    var mkdirsSync = _mkdirs.mkdirsSync;
    var _symlinkPaths = require_symlink_paths();
    var symlinkPaths = _symlinkPaths.symlinkPaths;
    var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
    var _symlinkType = require_symlink_type();
    var symlinkType = _symlinkType.symlinkType;
    var symlinkTypeSync = _symlinkType.symlinkTypeSync;
    var pathExists = require_path_exists().pathExists;
    function createSymlink(srcpath, dstpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      pathExists(dstpath, (err, destinationExists) => {
        if (err)
          return callback(err);
        if (destinationExists)
          return callback(null);
        symlinkPaths(srcpath, dstpath, (err2, relative) => {
          if (err2)
            return callback(err2);
          srcpath = relative.toDst;
          symlinkType(relative.toCwd, type, (err3, type2) => {
            if (err3)
              return callback(err3);
            const dir = path3.dirname(dstpath);
            pathExists(dir, (err4, dirExists) => {
              if (err4)
                return callback(err4);
              if (dirExists)
                return fs.symlink(srcpath, dstpath, type2, callback);
              mkdirs(dir, (err5) => {
                if (err5)
                  return callback(err5);
                fs.symlink(srcpath, dstpath, type2, callback);
              });
            });
          });
        });
      });
    }
    function createSymlinkSync(srcpath, dstpath, type) {
      const destinationExists = fs.existsSync(dstpath);
      if (destinationExists)
        return void 0;
      const relative = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative.toDst;
      type = symlinkTypeSync(relative.toCwd, type);
      const dir = path3.dirname(dstpath);
      const exists = fs.existsSync(dir);
      if (exists)
        return fs.symlinkSync(srcpath, dstpath, type);
      mkdirsSync(dir);
      return fs.symlinkSync(srcpath, dstpath, type);
    }
    module2.exports = {
      createSymlink: u(createSymlink),
      createSymlinkSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS({
  "node_modules/fs-extra/lib/ensure/index.js"(exports, module2) {
    "use strict";
    var file = require_file();
    var link = require_link();
    var symlink = require_symlink();
    module2.exports = {
      createFile: file.createFile,
      createFileSync: file.createFileSync,
      ensureFile: file.createFile,
      ensureFileSync: file.createFileSync,
      createLink: link.createLink,
      createLinkSync: link.createLinkSync,
      ensureLink: link.createLink,
      ensureLinkSync: link.createLinkSync,
      createSymlink: symlink.createSymlink,
      createSymlinkSync: symlink.createSymlinkSync,
      ensureSymlink: symlink.createSymlink,
      ensureSymlinkSync: symlink.createSymlinkSync
    };
  }
});

// node_modules/jsonfile/index.js
var require_jsonfile = __commonJS({
  "node_modules/jsonfile/index.js"(exports, module2) {
    var _fs;
    try {
      _fs = require_graceful_fs();
    } catch (_) {
      _fs = require("fs");
    }
    function readFile(file, options, callback) {
      if (callback == null) {
        callback = options;
        options = {};
      }
      if (typeof options === "string") {
        options = { encoding: options };
      }
      options = options || {};
      var fs = options.fs || _fs;
      var shouldThrow = true;
      if ("throws" in options) {
        shouldThrow = options.throws;
      }
      fs.readFile(file, options, function(err, data) {
        if (err)
          return callback(err);
        data = stripBom(data);
        var obj;
        try {
          obj = JSON.parse(data, options ? options.reviver : null);
        } catch (err2) {
          if (shouldThrow) {
            err2.message = file + ": " + err2.message;
            return callback(err2);
          } else {
            return callback(null, null);
          }
        }
        callback(null, obj);
      });
    }
    function readFileSync2(file, options) {
      options = options || {};
      if (typeof options === "string") {
        options = { encoding: options };
      }
      var fs = options.fs || _fs;
      var shouldThrow = true;
      if ("throws" in options) {
        shouldThrow = options.throws;
      }
      try {
        var content = fs.readFileSync(file, options);
        content = stripBom(content);
        return JSON.parse(content, options.reviver);
      } catch (err) {
        if (shouldThrow) {
          err.message = file + ": " + err.message;
          throw err;
        } else {
          return null;
        }
      }
    }
    function stringify3(obj, options) {
      var spaces;
      var EOL = "\n";
      if (typeof options === "object" && options !== null) {
        if (options.spaces) {
          spaces = options.spaces;
        }
        if (options.EOL) {
          EOL = options.EOL;
        }
      }
      var str = JSON.stringify(obj, options ? options.replacer : null, spaces);
      return str.replace(/\n/g, EOL) + EOL;
    }
    function writeFile(file, obj, options, callback) {
      if (callback == null) {
        callback = options;
        options = {};
      }
      options = options || {};
      var fs = options.fs || _fs;
      var str = "";
      try {
        str = stringify3(obj, options);
      } catch (err) {
        if (callback)
          callback(err, null);
        return;
      }
      fs.writeFile(file, str, options, callback);
    }
    function writeFileSync(file, obj, options) {
      options = options || {};
      var fs = options.fs || _fs;
      var str = stringify3(obj, options);
      return fs.writeFileSync(file, str, options);
    }
    function stripBom(content) {
      if (Buffer.isBuffer(content))
        content = content.toString("utf8");
      content = content.replace(/^\uFEFF/, "");
      return content;
    }
    var jsonfile = {
      readFile,
      readFileSync: readFileSync2,
      writeFile,
      writeFileSync
    };
    module2.exports = jsonfile;
  }
});

// node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile2 = __commonJS({
  "node_modules/fs-extra/lib/json/jsonfile.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var jsonFile = require_jsonfile();
    module2.exports = {
      readJson: u(jsonFile.readFile),
      readJsonSync: jsonFile.readFileSync,
      writeJson: u(jsonFile.writeFile),
      writeJsonSync: jsonFile.writeFileSync
    };
  }
});

// node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS({
  "node_modules/fs-extra/lib/json/output-json.js"(exports, module2) {
    "use strict";
    var path3 = require("path");
    var mkdir = require_mkdirs2();
    var pathExists = require_path_exists().pathExists;
    var jsonFile = require_jsonfile2();
    function outputJson(file, data, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      const dir = path3.dirname(file);
      pathExists(dir, (err, itDoes) => {
        if (err)
          return callback(err);
        if (itDoes)
          return jsonFile.writeJson(file, data, options, callback);
        mkdir.mkdirs(dir, (err2) => {
          if (err2)
            return callback(err2);
          jsonFile.writeJson(file, data, options, callback);
        });
      });
    }
    module2.exports = outputJson;
  }
});

// node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS({
  "node_modules/fs-extra/lib/json/output-json-sync.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path3 = require("path");
    var mkdir = require_mkdirs2();
    var jsonFile = require_jsonfile2();
    function outputJsonSync(file, data, options) {
      const dir = path3.dirname(file);
      if (!fs.existsSync(dir)) {
        mkdir.mkdirsSync(dir);
      }
      jsonFile.writeJsonSync(file, data, options);
    }
    module2.exports = outputJsonSync;
  }
});

// node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS({
  "node_modules/fs-extra/lib/json/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var jsonFile = require_jsonfile2();
    jsonFile.outputJson = u(require_output_json());
    jsonFile.outputJsonSync = require_output_json_sync();
    jsonFile.outputJSON = jsonFile.outputJson;
    jsonFile.outputJSONSync = jsonFile.outputJsonSync;
    jsonFile.writeJSON = jsonFile.writeJson;
    jsonFile.writeJSONSync = jsonFile.writeJsonSync;
    jsonFile.readJSON = jsonFile.readJson;
    jsonFile.readJSONSync = jsonFile.readJsonSync;
    module2.exports = jsonFile;
  }
});

// node_modules/fs-extra/lib/move-sync/move-sync.js
var require_move_sync = __commonJS({
  "node_modules/fs-extra/lib/move-sync/move-sync.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path3 = require("path");
    var copySync = require_copy_sync2().copySync;
    var removeSync = require_remove().removeSync;
    var mkdirpSync = require_mkdirs2().mkdirpSync;
    var stat = require_stat();
    function moveSync(src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat } = stat.checkPathsSync(src, dest, "move");
      stat.checkParentPathsSync(src, srcStat, dest, "move");
      mkdirpSync(path3.dirname(dest));
      return doRename(src, dest, overwrite);
    }
    function doRename(src, dest, overwrite) {
      if (overwrite) {
        removeSync(dest);
        return rename(src, dest, overwrite);
      }
      if (fs.existsSync(dest))
        throw new Error("dest already exists.");
      return rename(src, dest, overwrite);
    }
    function rename(src, dest, overwrite) {
      try {
        fs.renameSync(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV")
          throw err;
        return moveAcrossDevice(src, dest, overwrite);
      }
    }
    function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copySync(src, dest, opts);
      return removeSync(src);
    }
    module2.exports = moveSync;
  }
});

// node_modules/fs-extra/lib/move-sync/index.js
var require_move_sync2 = __commonJS({
  "node_modules/fs-extra/lib/move-sync/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      moveSync: require_move_sync()
    };
  }
});

// node_modules/fs-extra/lib/move/move.js
var require_move = __commonJS({
  "node_modules/fs-extra/lib/move/move.js"(exports, module2) {
    "use strict";
    var fs = require_graceful_fs();
    var path3 = require("path");
    var copy = require_copy2().copy;
    var remove = require_remove().remove;
    var mkdirp = require_mkdirs2().mkdirp;
    var pathExists = require_path_exists().pathExists;
    var stat = require_stat();
    function move(src, dest, opts, cb) {
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      const overwrite = opts.overwrite || opts.clobber || false;
      stat.checkPaths(src, dest, "move", (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat } = stats;
        stat.checkParentPaths(src, srcStat, dest, "move", (err2) => {
          if (err2)
            return cb(err2);
          mkdirp(path3.dirname(dest), (err3) => {
            if (err3)
              return cb(err3);
            return doRename(src, dest, overwrite, cb);
          });
        });
      });
    }
    function doRename(src, dest, overwrite, cb) {
      if (overwrite) {
        return remove(dest, (err) => {
          if (err)
            return cb(err);
          return rename(src, dest, overwrite, cb);
        });
      }
      pathExists(dest, (err, destExists) => {
        if (err)
          return cb(err);
        if (destExists)
          return cb(new Error("dest already exists."));
        return rename(src, dest, overwrite, cb);
      });
    }
    function rename(src, dest, overwrite, cb) {
      fs.rename(src, dest, (err) => {
        if (!err)
          return cb();
        if (err.code !== "EXDEV")
          return cb(err);
        return moveAcrossDevice(src, dest, overwrite, cb);
      });
    }
    function moveAcrossDevice(src, dest, overwrite, cb) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copy(src, dest, opts, (err) => {
        if (err)
          return cb(err);
        return remove(src, cb);
      });
    }
    module2.exports = move;
  }
});

// node_modules/fs-extra/lib/move/index.js
var require_move2 = __commonJS({
  "node_modules/fs-extra/lib/move/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    module2.exports = {
      move: u(require_move())
    };
  }
});

// node_modules/fs-extra/lib/output/index.js
var require_output = __commonJS({
  "node_modules/fs-extra/lib/output/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs = require_graceful_fs();
    var path3 = require("path");
    var mkdir = require_mkdirs2();
    var pathExists = require_path_exists().pathExists;
    function outputFile(file, data, encoding, callback) {
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = "utf8";
      }
      const dir = path3.dirname(file);
      pathExists(dir, (err, itDoes) => {
        if (err)
          return callback(err);
        if (itDoes)
          return fs.writeFile(file, data, encoding, callback);
        mkdir.mkdirs(dir, (err2) => {
          if (err2)
            return callback(err2);
          fs.writeFile(file, data, encoding, callback);
        });
      });
    }
    function outputFileSync(file, ...args) {
      const dir = path3.dirname(file);
      if (fs.existsSync(dir)) {
        return fs.writeFileSync(file, ...args);
      }
      mkdir.mkdirsSync(dir);
      fs.writeFileSync(file, ...args);
    }
    module2.exports = {
      outputFile: u(outputFile),
      outputFileSync
    };
  }
});

// node_modules/fs-extra/lib/index.js
var require_lib = __commonJS({
  "node_modules/fs-extra/lib/index.js"(exports, module2) {
    "use strict";
    module2.exports = Object.assign({}, require_fs(), require_copy_sync2(), require_copy2(), require_empty(), require_ensure(), require_json(), require_mkdirs2(), require_move_sync2(), require_move2(), require_output(), require_path_exists(), require_remove());
    var fs = require("fs");
    if (Object.getOwnPropertyDescriptor(fs, "promises")) {
      Object.defineProperty(module2.exports, "promises", {
        get() {
          return fs.promises;
        }
      });
    }
  }
});

// src/deploy/paths.ts
function pathForBackend(backend) {
  return (0, import_path.join)("__backends__", `${backend}.js`);
}
function getConfigSrcPath() {
  const cwd = process.cwd();
  const result = [(0, import_path.join)(cwd, "edgio.config.js"), (0, import_path.join)(cwd, "edgio.config.cjs")].find(import_fs.existsSync);
  if (result == null) {
    throw new Error("Edgio config file not found. Please create edgio.config.js or edgio.config.cjs in the root directory of your project.");
  }
  return result;
}
var import_fs, import_path, EDGIO_DIR, JS_DIR, EDGE_FUNCTIONS_INDEX_FILENAME, EDGE_FUNCTIONS_INDEX_PATH, EDGE_FUNCTIONS_QUICKJS_BYTECODE_FILENAME, EDGE_FUNCTIONS_QUICKJS_BYTECODE_PATH, ASSETS_DIR, PERMANENT_ASSETS_DIR, SOURCES_DIR, ROUTES_FILE_NAME;
var init_paths = __esm({
  "src/deploy/paths.ts"() {
    "use strict";
    import_fs = require("fs");
    import_path = require("path");
    EDGIO_DIR = ".edgio";
    JS_DIR = (0, import_path.join)(EDGIO_DIR, "lambda");
    EDGE_FUNCTIONS_INDEX_FILENAME = "__edge-functions__.js";
    EDGE_FUNCTIONS_INDEX_PATH = (0, import_path.join)(JS_DIR, EDGE_FUNCTIONS_INDEX_FILENAME);
    EDGE_FUNCTIONS_QUICKJS_BYTECODE_FILENAME = "__edge-functions__.qbc";
    EDGE_FUNCTIONS_QUICKJS_BYTECODE_PATH = (0, import_path.join)(JS_DIR, EDGE_FUNCTIONS_QUICKJS_BYTECODE_FILENAME);
    ASSETS_DIR = (0, import_path.join)(EDGIO_DIR, "s3");
    PERMANENT_ASSETS_DIR = (0, import_path.join)(EDGIO_DIR, "s3-permanent");
    SOURCES_DIR = (0, import_path.join)(EDGIO_DIR, "src");
    ROUTES_FILE_NAME = "routes.cjs";
  }
});

// node_modules/slash/index.js
var require_slash = __commonJS({
  "node_modules/slash/index.js"(exports, module2) {
    "use strict";
    module2.exports = (path3) => {
      const isExtendedLengthPath = /^\\\\\?\\/.test(path3);
      const hasNonAscii = /[^\u0000-\u0080]+/.test(path3);
      if (isExtendedLengthPath || hasNonAscii) {
        return path3;
      }
      return path3.replace(/\\/g, "/");
    };
  }
});

// src/utils/nonWebpackRequire.ts
function nonWebpackRequire(modulePath, { ignoreErrors = false } = {}) {
  try {
    return eval("require")((0, import_slash.default)(modulePath));
  } catch (e) {
    if (ignoreErrors) {
      return void 0;
    } else {
      throw e;
    }
  }
}
var import_slash;
var init_nonWebpackRequire = __esm({
  "src/utils/nonWebpackRequire.ts"() {
    "use strict";
    import_slash = __toESM(require_slash());
  }
});

// src/context.ts
function withContext(cb) {
  if (isLocal()) {
    return createClsNamespace().runAndReturn(cb);
  } else {
    global.__edgio_timings__ = new SingletonContext();
    return cb();
  }
}
function createClsNamespace() {
  const cls = nonWebpackRequire("cls-hooked");
  if (!clsNamespace) {
    clsNamespace = cls.createNamespace(CONTEXT);
  }
  return clsNamespace;
}
var CONTEXT, clsNamespace, SingletonContext;
var init_context = __esm({
  "src/context.ts"() {
    "use strict";
    init_environment();
    init_nonWebpackRequire();
    CONTEXT = "edgio";
    SingletonContext = class {
      constructor() {
        this.values = {};
      }
      get(key2) {
        return this.values[key2];
      }
      set(key2, value) {
        this.values[key2] = value;
      }
    };
  }
});

// src/timing.ts
function withTimings(handler2) {
  return (...args) => {
    return withContext(() => {
      return handler2(...args);
    });
  };
}
var init_timing = __esm({
  "src/timing.ts"() {
    "use strict";
    init_constants();
    init_context();
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports, module2) {
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
  "node_modules/has-symbols/index.js"(exports, module2) {
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

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module2) {
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
          var result = target.apply(this, args.concat(slice.call(arguments)));
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(that, args.concat(slice.call(arguments)));
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
  "node_modules/function-bind/index.js"(exports, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/has/src/index.js
var require_src = __commonJS({
  "node_modules/has/src/index.js"(exports, module2) {
    "use strict";
    var bind = require_function_bind();
    module2.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports, module2) {
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
    var getProto = Object.getPrototypeOf || function(x) {
      return x.__proto__;
    };
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
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
      "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
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
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined2,
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
        if (gen) {
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
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first2 = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first2 === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first2 !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match2, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match2;
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
        var first2 = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first2 === '"' || first2 === "'" || first2 === "`" || (last === '"' || last === "'" || last === "`")) && first2 !== last) {
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
  "node_modules/call-bind/index.js"(exports, module2) {
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
          $defineProperty(func, "length", { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) });
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
  "node_modules/call-bind/callBound.js"(exports, module2) {
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
  "node_modules/object-inspect/util.inspect.js"(exports, module2) {
    module2.exports = require("util").inspect;
  }
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports, module2) {
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
          mapForEach.call(obj, function(value, key2) {
            mapParts.push(inspect(key2, obj, true) + " => " + inspect(value, obj));
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
    var hasOwn = Object.prototype.hasOwnProperty || function(key2) {
      return key2 in this;
    };
    function has(obj, key2) {
      return hasOwn.call(obj, key2);
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
      for (var key2 in obj) {
        if (!has(obj, key2)) {
          continue;
        }
        if (isArr && String(Number(key2)) === key2 && key2 < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key2] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key2)) {
          xs.push(inspect(key2, obj) + ": " + inspect(obj[key2], obj));
        } else {
          xs.push(key2 + ": " + inspect(obj[key2], obj));
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
  "node_modules/side-channel/index.js"(exports, module2) {
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
    var listGetNode = function(list, key2) {
      for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
        if (curr.key === key2) {
          prev.next = curr.next;
          curr.next = list.next;
          list.next = curr;
          return curr;
        }
      }
    };
    var listGet = function(objects, key2) {
      var node = listGetNode(objects, key2);
      return node && node.value;
    };
    var listSet = function(objects, key2, value) {
      var node = listGetNode(objects, key2);
      if (node) {
        node.value = value;
      } else {
        objects.next = {
          key: key2,
          next: objects.next,
          value
        };
      }
    };
    var listHas = function(objects, key2) {
      return !!listGetNode(objects, key2);
    };
    module2.exports = function getSideChannel() {
      var $wm;
      var $m;
      var $o;
      var channel = {
        assert: function(key2) {
          if (!channel.has(key2)) {
            throw new $TypeError("Side channel does not contain " + inspect(key2));
          }
        },
        get: function(key2) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if ($wm) {
              return $weakMapGet($wm, key2);
            }
          } else if ($Map) {
            if ($m) {
              return $mapGet($m, key2);
            }
          } else {
            if ($o) {
              return listGet($o, key2);
            }
          }
        },
        has: function(key2) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if ($wm) {
              return $weakMapHas($wm, key2);
            }
          } else if ($Map) {
            if ($m) {
              return $mapHas($m, key2);
            }
          } else {
            if ($o) {
              return listHas($o, key2);
            }
          }
          return false;
        },
        set: function(key2, value) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if (!$wm) {
              $wm = new $WeakMap();
            }
            $weakMapSet($wm, key2, value);
          } else if ($Map) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key2, value);
          } else {
            if (!$o) {
              $o = { key: {}, next: null };
            }
            listSet($o, key2, value);
          }
        }
      };
      return channel;
    };
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports, module2) {
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
  "node_modules/qs/lib/utils.js"(exports, module2) {
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
      return Object.keys(source).reduce(function(acc, key2) {
        var value = source[key2];
        if (has.call(acc, key2)) {
          acc[key2] = merge2(acc[key2], value, options);
        } else {
          acc[key2] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key2) {
        acc[key2] = source[key2];
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
          var key2 = keys[j];
          var val = obj[key2];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key2 });
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
var require_stringify2 = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports, module2) {
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
      indices: function indices(prefix, key2) {
        return prefix + "[" + key2 + "]";
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
    var stringify3 = function stringify4(object, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
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
        var key2 = objKeys[j];
        var value = typeof key2 === "object" && typeof key2.value !== "undefined" ? key2.value : obj[key2];
        if (skipNulls && value === null) {
          continue;
        }
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, key2) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + key2 : "[" + key2 + "]");
        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify4(value, keyPrefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, valueSideChannel));
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
        var key2 = objKeys[i];
        if (options.skipNulls && obj[key2] === null) {
          continue;
        }
        pushToArray(keys, stringify3(obj[key2], key2, generateArrayPrefix, commaRoundTrip, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel));
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
var require_parse3 = __commonJS({
  "node_modules/qs/lib/parse.js"(exports, module2) {
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
        var key2, val;
        if (pos === -1) {
          key2 = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key2 = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options), function(encodedVal) {
            return options.decoder(encodedVal, defaults.decoder, charset, "value");
          });
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(val);
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (has.call(obj, key2)) {
          obj[key2] = utils.combine(obj[key2], val);
        } else {
          obj[key2] = val;
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
      var key2 = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key2);
      var parent = segment ? key2.slice(0, segment.index) : key2;
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
      while (options.depth > 0 && (segment = child.exec(key2)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        keys.push("[" + key2.slice(segment.index) + "]");
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
        var key2 = keys[i];
        var newObj = parseKeys(key2, tempObj[key2], options, typeof str === "string");
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
var require_lib2 = __commonJS({
  "node_modules/qs/lib/index.js"(exports, module2) {
    "use strict";
    var stringify3 = require_stringify2();
    var parse5 = require_parse3();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse: parse5,
      stringify: stringify3
    };
  }
});

// src/runtime/LambdaResponse.ts
var import_stream, LambdaResponse;
var init_LambdaResponse = __esm({
  "src/runtime/LambdaResponse.ts"() {
    "use strict";
    import_stream = require("stream");
    LambdaResponse = class {
      constructor(responseStream) {
        this.chunks = [];
        this.encodedChunks = [];
        this.onStream = () => {
        };
        this.onEnd = () => {
        };
        this.onHeaders = () => {
        };
        this.onFlush = () => {
        };
        this.isHeadersStreamed = false;
        this.isEnded = false;
        this.isDownstreamInit = false;
        this.isStreaming = false;
        this.isStreamableCallback = () => false;
        this.statusCode = 200;
        this.statusMessage = "OK";
        this.headers = {};
        this.byteLength = 0;
        this.maxByteLength = 128 * 1e3 * 1e3;
        this.isDirectStream = false;
        this.initDownstream();
        this.isDownstreamInit = false;
        this.responseStream = responseStream;
      }
      setHeader(name, value) {
        this.headers[name.toLowerCase()] = value;
      }
      removeHeader(name) {
        delete this.headers[name.toLowerCase()];
      }
      getHeader(name) {
        return this.headers[name.toLowerCase()];
      }
      getHeaders() {
        return this.headers;
      }
      clear() {
        this.chunks = [];
        this.byteLength = 0;
      }
      isCachable() {
        return !this.isDirectStream && this.byteLength < this.maxByteLength;
      }
      async write(chunk) {
        if (this.chunks.length === 0)
          this.setIsStreamable(this.isStreamable());
        this.chunks.push(chunk);
        this.isStreamable() && await this.onStream();
      }
      async end() {
        this.chunks.push(null);
        if (this.chunks.length === 1) {
          this.isStreamable() && await this.onStream();
        }
      }
      setEncoder(value) {
        this.encoder = value;
      }
      setDecoder(value) {
        this.decoder = value;
      }
      setDirectStream(value) {
        this.isDirectStream = value;
      }
      stream() {
        this.isStreaming = true;
        if (!this.isHeadersStreamed) {
          this.onHeaders();
          this.isHeadersStreamed = true;
        }
        this.chunks.forEach((chunk) => this.downstream.push(chunk));
        this.chunks = [];
      }
      async waitForFlush() {
        return this.isStreaming ? new Promise((resolve2) => {
          this.onFlush = resolve2;
          this.isEnded && resolve2();
        }) : Promise.resolve(true);
      }
      initDownstream() {
        if (!this.isDownstreamInit) {
          this.isDownstreamInit = true;
          this.downstream = new import_stream.Stream.Readable({
            read: () => {
            }
          });
          let curPipe = this.downstream;
          this.decoder && (curPipe = curPipe.pipe(this.decoder));
          this.encoder && (curPipe = curPipe.pipe(this.encoder));
          curPipe.pipe(new import_stream.PassThrough().on("data", (chunk) => {
            var _a2;
            (_a2 = this.responseStream) == null ? void 0 : _a2.write(chunk);
            if (!this.isDirectStream) {
              this.byteLength += Buffer.byteLength(chunk);
              this.byteLength < this.maxByteLength && this.encodedChunks.push(chunk);
            }
          }).on("end", () => {
            if (this.responseStream) {
              this.responseStream.end();
            } else {
              if (this.encodedChunks.length > 0) {
                if (this.byteLength < this.maxByteLength) {
                  this.body = Buffer.concat(this.encodedChunks);
                } else {
                  this.statusCode = 413;
                  this.statusMessage = "Content Too Large";
                }
              }
            }
            this.encodedChunks.push(null);
            this.isEnded = true;
            this.onFlush();
            this.onEnd();
          }));
        }
      }
      setIsStreamable(callback) {
        if (typeof callback === "boolean") {
          return this.isStreamableCallback = () => callback;
        }
        this.isStreamableCallback = callback;
      }
      isStreamable() {
        return this.isStreamableCallback();
      }
      setOnStream(callback) {
        this.onStream = callback;
      }
      setOnEnd(callback) {
        this.onEnd = callback;
      }
      setOnHeaders(callback) {
        this.onHeaders = callback;
      }
      getData() {
        return {
          body: this.body,
          statusCode: this.statusCode,
          statusMessage: this.statusMessage,
          headers: this.headers
        };
      }
    };
  }
});

// src/runtime/LambdaRequest.ts
function normalizeHeaders(headers) {
  let result = {};
  for (let name in headers) {
    const header = headers[name];
    result[name.toLowerCase()] = Array.isArray(header) && header.length === 1 ? header[0] : header;
  }
  return result;
}
var import_qs, LambdaRequest;
var init_LambdaRequest = __esm({
  "src/runtime/LambdaRequest.ts"() {
    "use strict";
    import_qs = __toESM(require_lib2());
    init_environment();
    init_constants();
    LambdaRequest = class {
      constructor(options) {
        this.url = "/";
        this.path = "/";
        this.rawHeaders = [];
        this.query = {};
        this.method = "GET";
        this.protocol = "http";
        this.secure = true;
        this.socket = { remoteAddress: "127.0.0.1", encrypted: true };
        this.connection = { encrypted: true };
        this.httpVersion = "1.1";
        this.port = "";
        var _a2;
        this.options = options;
        this.url = options.url.pathname + (options.url.search ?? "");
        this.query = (0, import_qs.parse)(options.url.search ?? "", { ignoreQueryPrefix: true });
        this.path = options.url.pathname;
        this.method = options.method ?? this.method;
        this.headers = normalizeHeaders(options.headers ?? {});
        options.url.host && this.setHeader("host", options.url.host);
        for (const key2 of Object.keys(this.headers)) {
          const header = this.headers[key2];
          for (const value of Array.isArray(header) ? header : [header]) {
            this.rawHeaders.push(key2);
            this.rawHeaders.push(value);
          }
        }
        this.port = options.url.port ?? this.port;
        this.httpVersion = options.httpVersion ?? this.httpVersion;
        this.socket.remoteAddress = this.getHeader(HTTP_HEADERS.xEdgeClientIp) || this.getHeader(HTTP_HEADERS.x0ClientIp) || this.socket.remoteAddress;
        if (options.url.protocol) {
          this.protocol = (_a2 = options.url.protocol) == null ? void 0 : _a2.replace(":", "");
        } else if (!isLocal()) {
          this.protocol = this.getHeader(HTTP_HEADERS.xEdgeProtocol) || this.getHeader(HTTP_HEADERS.x0Protocol) || "https";
        }
        this.secure = this.protocol === "https";
        this.socket.encrypted = this.secure;
        this.connection.encrypted = this.secure;
        this.rawBody = Buffer.from(options.body ?? "");
      }
      cloneOriginal() {
        return new LambdaRequest(this.options);
      }
      setHeader(name, value) {
        this.headers[name.toLowerCase()] = value;
      }
      getHeader(name) {
        return this.headers[name.toLowerCase()];
      }
      getHeaders() {
        return this.headers;
      }
      removeHeader(name) {
        delete this.headers[name.toLowerCase()];
      }
      get body() {
        return this.rawBody.toString("utf8");
      }
    };
  }
});

// package.json
var require_package2 = __commonJS({
  "package.json"(exports, module2) {
    module2.exports = {
      name: "@edgio/core",
      version: "7.0.24",
      main: "./index.js",
      license: "UNLICENSED",
      scripts: {
        docs: "typedoc",
        build: "rm -rf ./dist; mkdir -p ./dist/schemas; cp -r package.json README.md serverless.yml default-app ./dist; cp schemas/edgecontrol-scl-schema.json ./dist/schemas/; tsc; npm run bundle-handler; npm run bundle-edge-functions-worker; npm run bundle-edge-functions-browser-worker; npm run bundle-wasm; npm run bundle-edge-functions-sdk; npm run bundle-edge-functions-index-template; ",
        "bundle-handler": "esbuild src/lambda/handler.ts --bundle  --platform=node --target=node14.0 --outfile=dist/lambda/handler.js --log-level=error --sourcemap",
        "bundle-edge-functions-worker": "esbuild src/runtime/edge-functions/EdgeFunctionWorker.ts --bundle --platform=node --target=node14.0 --outfile=dist/runtime/edge-functions/EdgeFunctionWorker.js --log-level=error --sourcemap",
        "bundle-edge-functions-browser-worker": "esbuild src/runtime/edge-functions/EdgeFunctionWorker.ts --bundle --minify --platform=browser --external:v8 --outfile=dist/runtime/edge-functions/EdgeFunctionBrowserWorker.js --log-level=error --sourcemap",
        "bundle-wasm": "cp src/runtime/edge-functions/quickjs-*.wasm dist/runtime/edge-functions/",
        "bundle-edge-functions-sdk": "./bundle-object-inspect.sh && esbuild src/runtime/edge-functions/sdk.js --bundle  --platform=node --target=es2020 --outfile=dist/runtime/edge-functions/sdk.js --log-level=error --sourcemap",
        "bundle-edge-functions-index-template": "esbuild src/deploy/edge-functions/edgeFunctionsIndexCodeTemplate.js --bundle --minify --platform=node --target=node14.0 --outfile=dist/deploy/edge-functions/edgeFunctionsIndexCodeTemplate.js --log-level=error --sourcemap",
        watch: "npm-watch",
        "ts:watch": "tsc --watch",
        "push-build": "npm run build && cd dist && yalc push --force && cd ..",
        release: "cd ./dist; npm publish --access public",
        test: "npx jest --watchAll=false --forceExit",
        "test-quickjs": "./bundle-object-inspect.sh && npx jest --coverage=false test/runtime/EdgeFunction.test.js && npx jest --coverage=false test/runtime/EdgeFunctionsManager.test.js",
        "create-types": "json2ts schemas/edgecontrol-scl-schema.json src/types.ts",
        generate: "./bundle-object-inspect.sh && npx ts-node test/runtime/edge_function_tests/generator/generate-javascript.js",
        "test-server": "npm run generate && node test/runtime/edge_function_tests/generator/webserver.js"
      },
      quickjs: {
        "version-tag": "0.23.0"
      },
      dependencies: {
        "@babel/parser": "^7.18.9",
        "@babel/traverse": "^7.18.9",
        "@types/lodash.clonedeep": "^4.5.6",
        "@vercel/ncc": "^0.34.0",
        ajv: "^8.12.0",
        "babel-loader": "^8.2.2",
        buffer: "^6.0.3",
        "cache-control-parser": "^2.0.2",
        "chai-as-promised": "^7.1.1",
        chalk: "^4.1.2",
        chardet: "^1.4.0",
        chokidar: "^3.5.1",
        "cls-hooked": "^4.2.2",
        "content-type": "^1.0.4",
        cookie: "^0.4.1",
        "cross-spawn": "^7.0.3",
        "decode-uri-component": "^0.2.0",
        deepmerge: "^4.2.2",
        esbuild: "^0.14.49",
        express: "^4.17.3",
        "fluentvalidation-ts": "^2.2.2",
        "fs-extra": "^8.1.0",
        globby: "^11.0.2",
        "http-proxy": "^1.18.1",
        "lodash.clonedeep": "^4.5.0",
        "lodash.debounce": "^4.0.8",
        "lodash.escaperegexp": "^4.1.2",
        "lru-cache": "^7.14.0",
        "mime-types": "^2.1.35",
        "node-fetch": "^2.6.7",
        "path-to-regexp": "^6.2.0",
        pino: "^6.13.3",
        qs: "^6.11.0",
        "resolve-package-path": "^4.0.3",
        semver: "^7.3.5",
        shelljs: "^0.8.5",
        slash: "^3.0.0",
        "stream-buffers": "^3.0.2",
        "tcp-port-used": "^1.0.2",
        "ts-loader": "^8.2.0",
        unixify: "^1.0.0",
        uuid: "^8.3.2",
        "workbox-build": "^6.5.4",
        "yaml-validator": "^4.0.0"
      },
      publishConfig: {
        directory: "dist"
      },
      watch: {
        "push-build": {
          patterns: [
            "src",
            "bin",
            "serverless.yml",
            "default-app",
            "package.json"
          ],
          extensions: [
            "js",
            "ts"
          ],
          quiet: false
        }
      },
      jest: {
        maxWorkers: "50%",
        clearMocks: true,
        collectCoverage: true,
        collectCoverageFrom: [
          "src/**/*.{ts,js}",
          "!**/node_modules/**",
          "!**/mocks/**",
          "!**/index.ts"
        ],
        testMatch: [
          "**/test/**/*.test.js"
        ],
        transform: {
          "^.+\\.(t|j)sx?$": "@swc/jest"
        },
        moduleFileExtensions: [
          "ts",
          "js",
          "json"
        ],
        setupFilesAfterEnv: [
          "<rootDir>/test/jest.js"
        ],
        transformIgnorePatterns: [
          "<rootDir>/node_modules/"
        ],
        moduleNameMapper: {
          "../package.json": "<rootDir>/package.json",
          "^@edgio/core(.*)$": "<rootDir>/src/$1"
        }
      },
      devDependencies: {
        "@swc/core": "^1.3.5",
        "@swc/jest": "^0.2.23",
        "@types/babel__traverse": "^7.18.3",
        "@types/cls-hooked": "^4.3.1",
        "@types/content-type": "^1.1.3",
        "@types/cookie": "^0.3.3",
        "@types/cross-spawn": "^6.0.2",
        "@types/decode-uri-component": "^0.2.0",
        "@types/express": "^4.17.7",
        "@types/fs-extra": "^8.1.1",
        "@types/http-proxy": "^1.17.4",
        "@types/jest": "^26.0.23",
        "@types/lodash.debounce": "^4.0.7",
        "@types/lodash.escaperegexp": "^4.1.7",
        "@types/lru-cache": "^5.1.0",
        "@types/mime-types": "^2.1.0",
        "@types/node": "^14.6.4",
        "@types/node-fetch": "^2.6.2",
        "@types/route-parser": "^0.1.3",
        "@types/semver": "^7.3.9",
        "@types/shelljs": "^0.8.8",
        "@types/tcp-port-used": "^1.0.0",
        "@types/unixify": "^1.0.0",
        "@types/uuid": "^8.0.1",
        "@types/webpack-bundle-analyzer": "^3.9.0",
        "@types/workbox-build": "^5.0.1",
        camelcase: "^7.0.0",
        chai: "^4.3.7",
        "fastestsmallesttextencoderdecoder-encodeinto": "1.0.21",
        "js-yaml": "^4.1.0",
        "json-schema-to-typescript": "^11.0.2",
        json2ts: "0.0.7",
        jsonschema: "^1.4.1",
        lodash: "^4.17.21",
        nock: "^13.2.8",
        "object-inspect": "^1.12.3",
        "require-from-string": "^2.0.2",
        stripe: "^9.12.0",
        "ts-node": "^10.9.1",
        typescript: "^4.9.4",
        webpack: "^5.27.0",
        "webpack-bundle-analyzer": "^3.9.0",
        "webpack-dev-middleware": "^4.1.0",
        yaml: "^2.2.1"
      }
    };
  }
});

// src/lambda/reqResMapper.ts
function getEdgioVersion() {
  return process.env[EDGIO_ENV_VARIABLES.versionOverride] || require_package2().version;
}
function logStatusCode(response) {
  prefixResponseHeader(response, HTTP_HEADERS.xEdgeStatus, `w=${response.statusCode}`);
}
function logExecutionTime(response, invocation) {
  const lambda = invocation.lambda;
  prefixResponseHeader(response, HTTP_HEADERS.xEdgeT, `wt=${invocation.duration},wc=${lambda.invocationCounter},wg=${lambda.age},wl=${lambda.lifetimeDuration}`);
}
function logComponentVersion(response, version2, lambdaId) {
  prefixResponseHeader(response, HTTP_HEADERS.xEdgeComponents, `w=${version2},wi=${lambdaId}`);
}
function prefixResponseHeader(response, headerName, prefixValue) {
  const headerValue = response.multiValueHeaders[headerName];
  if (headerValue) {
    if (Array.isArray(headerValue)) {
      headerValue[0] = `${prefixValue},${headerValue[0]}`;
    } else {
      response.multiValueHeaders[headerName] = `${prefixValue},${headerValue}`;
    }
  } else {
    response.multiValueHeaders[headerName] = `${prefixValue}`;
  }
}
function normalizeLambdaQuery(event) {
  let query;
  if (event.multiValueQueryStringParameters && Object.keys(event.multiValueQueryStringParameters).length) {
    Object.keys(event.multiValueQueryStringParameters).forEach((key2) => {
      const curVal = event.multiValueQueryStringParameters[key2];
      if (Array.isArray(curVal) && curVal.length === 1) {
        event.multiValueQueryStringParameters[key2] = curVal[0];
      }
    });
    query = (0, import_qs2.stringify)(event.multiValueQueryStringParameters, {
      indices: false
    });
  }
  return query ? "?" + query : "";
}
var import_qs2, reqResMapper_default;
var init_reqResMapper = __esm({
  "src/lambda/reqResMapper.ts"() {
    "use strict";
    init_constants();
    import_qs2 = __toESM(require_lib2());
    init_wrapper();
    init_LambdaResponse();
    init_LambdaRequest();
    reqResMapper_default = (event, invocation) => {
      let responsePromise;
      const req = new LambdaRequest({
        url: {
          pathname: event.path,
          search: normalizeLambdaQuery(event)
        },
        method: event.httpMethod,
        headers: event.multiValueHeaders,
        body: Buffer.from(event.body ?? "", event.isBase64Encoded ? "base64" : void 0)
      });
      const res = new LambdaResponse();
      let newRequestId;
      if (!req.headers[HTTP_HEADERS.xRequestId]) {
        newRequestId = v4();
        req.headers[HTTP_HEADERS.xRequestId] = newRequestId;
      }
      const onResEnd = (resolve2) => {
        var _a2;
        newRequestId && res.setHeader(HTTP_HEADERS.xRequestId, newRequestId);
        const responseData = res.getData();
        responseData.body = ((_a2 = responseData.body) == null ? void 0 : _a2.toString("base64")) ?? "";
        responseData.isBase64Encoded = true;
        responseData.multiValueHeaders = res.headers;
        invocation.stop();
        logStatusCode(responseData);
        logExecutionTime(responseData, invocation);
        logComponentVersion(responseData, getEdgioVersion(), invocation.lambda.id);
        fixApiGatewayMultipleHeaders(responseData);
        resolve2(responseData);
      };
      responsePromise = new Promise((resolve2) => res.setOnEnd(() => onResEnd(resolve2)));
      function fixApiGatewayMultipleHeaders(responseData) {
        for (const key2 of Object.keys(responseData.multiValueHeaders)) {
          if (!Array.isArray(responseData.multiValueHeaders[key2])) {
            responseData.multiValueHeaders[key2] = [responseData.multiValueHeaders[key2]];
          }
        }
      }
      return { req, res, responsePromise };
    };
  }
});

// src/utils/index.ts
var init_utils = __esm({
  "src/utils/index.ts"() {
    "use strict";
    init_nonWebpackRequire();
  }
});

// src/log.ts
var LogLevel, _a, key, configuredLogLevel, logger, log_default;
var init_log = __esm({
  "src/log.ts"() {
    "use strict";
    LogLevel = /* @__PURE__ */ ((LogLevel2) => {
      LogLevel2[LogLevel2["TRACE"] = 0] = "TRACE";
      LogLevel2[LogLevel2["DEBUG"] = 1] = "DEBUG";
      LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
      LogLevel2[LogLevel2["WARN"] = 3] = "WARN";
      LogLevel2[LogLevel2["ERROR"] = 4] = "ERROR";
      return LogLevel2;
    })(LogLevel || {});
    key = (_a = process.env.LOG_LEVEL) == null ? void 0 : _a.toUpperCase();
    configuredLogLevel = key ? LogLevel[key] : null;
    logger = {
      trace(...params) {
        logger.log(0 /* TRACE */, ...params);
      },
      debug(...params) {
        logger.log(1 /* DEBUG */, ...params);
      },
      info(...params) {
        logger.log(2 /* INFO */, ...params);
      },
      warn(...params) {
        logger.log(3 /* WARN */, ...params);
      },
      error(...params) {
        logger.log(3 /* WARN */, ...params);
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
    log_default = logger;
  }
});

// src/config.ts
function getConfig(reload = false) {
  if (!config || reload) {
    const srcPath = getConfigSrcPath();
    if (reload) {
      delete require.cache[srcPath];
    }
    config = nonWebpackRequire(srcPath);
    const environment2 = process.env.EDGIO_ENVIRONMENT_NAME;
    if (environment2 && config.environments && config.environments[environment2]) {
      log_default.info(`using config overrides for ${environment2}`);
      Object.assign(config, config.environments[environment2]);
    }
  }
  return config;
}
var config;
var init_config = __esm({
  "src/config.ts"() {
    "use strict";
    init_paths();
    init_utils();
    init_log();
  }
});

// src/source.ts
function getSourceDir() {
  return process.env.EDGIO_ROOT_SOURCE_DIR || process.cwd();
}
var init_source = __esm({
  "src/source.ts"() {
    "use strict";
  }
});

// src/utils/requireInternal.ts
function requireInternal(packagePath) {
  try {
    const resolved = require.resolve(packagePath, {
      paths: [require.resolve("@edgio/core")]
    });
    return nonWebpackRequire(resolved);
  } catch (e) {
    return nonWebpackRequire(packagePath);
  }
}
var init_requireInternal = __esm({
  "src/utils/requireInternal.ts"() {
    "use strict";
    init_nonWebpackRequire();
  }
});

// src/router/exact.ts
var ExactPath;
var init_exact = __esm({
  "src/router/exact.ts"() {
    "use strict";
    ExactPath = class {
      constructor(value) {
        this.value = value;
      }
      toString() {
        return this.value;
      }
    };
  }
});

// src/utils/regExpEscape.ts
function regExpEscape(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var init_regExpEscape = __esm({
  "src/utils/regExpEscape.ts"() {
    "use strict";
  }
});

// src/utils/toEdgeRegex.ts
function toEdgeRegex(regex, prefix = "") {
  let source = `${regex.source.slice(0).replace(/\\\//g, "/")}`;
  if (source.startsWith("^")) {
    source = `^${regExpEscape(prefix)}${source.slice(1)}`;
  } else {
    source = `${regExpEscape(prefix)}${source}`;
  }
  return `${regex.ignoreCase ? "(?i)" : ""}${source}`;
}
function fromEdgeRegex(edgeRegex) {
  const ignoreCase = edgeRegex.indexOf("(?i)") === 0;
  if (ignoreCase) {
    edgeRegex = edgeRegex.slice("(?i)".length);
  }
  return new RegExp(edgeRegex.replace(/\//g, "/"), ignoreCase ? "i" : "");
}
var init_toEdgeRegex = __esm({
  "src/utils/toEdgeRegex.ts"() {
    "use strict";
    init_regExpEscape();
  }
});

// node_modules/path-to-regexp/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/path-to-regexp/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pathToRegexp = exports.tokensToRegexp = exports.regexpToFunction = exports.match = exports.tokensToFunction = exports.compile = exports.parse = void 0;
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
            throw new TypeError("Missing parameter name at " + i);
          tokens.push({ type: "NAME", index: i, value: name });
          i = j;
          continue;
        }
        if (char === "(") {
          var count = 1;
          var pattern = "";
          var j = i + 1;
          if (str[j] === "?") {
            throw new TypeError('Pattern cannot start with "?" at ' + j);
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
                throw new TypeError("Capturing groups are not allowed at " + j);
              }
            }
            pattern += str[j++];
          }
          if (count)
            throw new TypeError("Unbalanced pattern at " + i);
          if (!pattern)
            throw new TypeError("Missing pattern at " + i);
          tokens.push({ type: "PATTERN", index: i, value: pattern });
          i = j;
          continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
      }
      tokens.push({ type: "END", index: i, value: "" });
      return tokens;
    }
    function parse5(str, options) {
      if (options === void 0) {
        options = {};
      }
      var tokens = lexer(str);
      var _a2 = options.prefixes, prefixes = _a2 === void 0 ? "./" : _a2;
      var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
      var result = [];
      var key2 = 0;
      var i = 0;
      var path3 = "";
      var tryConsume = function(type) {
        if (i < tokens.length && tokens[i].type === type)
          return tokens[i++].value;
      };
      var mustConsume = function(type) {
        var value2 = tryConsume(type);
        if (value2 !== void 0)
          return value2;
        var _a3 = tokens[i], nextType = _a3.type, index = _a3.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
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
            path3 += prefix;
            prefix = "";
          }
          if (path3) {
            result.push(path3);
            path3 = "";
          }
          result.push({
            name: name || key2++,
            prefix,
            suffix: "",
            pattern: pattern || defaultPattern,
            modifier: tryConsume("MODIFIER") || ""
          });
          continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
          path3 += value;
          continue;
        }
        if (path3) {
          result.push(path3);
          path3 = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
          var prefix = consumeText();
          var name_1 = tryConsume("NAME") || "";
          var pattern_1 = tryConsume("PATTERN") || "";
          var suffix = consumeText();
          mustConsume("CLOSE");
          result.push({
            name: name_1 || (pattern_1 ? key2++ : ""),
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
    exports.parse = parse5;
    function compile(str, options) {
      return tokensToFunction(parse5(str, options), options);
    }
    exports.compile = compile;
    function tokensToFunction(tokens, options) {
      if (options === void 0) {
        options = {};
      }
      var reFlags = flags(options);
      var _a2 = options.encode, encode = _a2 === void 0 ? function(x) {
        return x;
      } : _a2, _b = options.validate, validate2 = _b === void 0 ? true : _b;
      var matches = tokens.map(function(token) {
        if (typeof token === "object") {
          return new RegExp("^(?:" + token.pattern + ")$", reFlags);
        }
      });
      return function(data) {
        var path3 = "";
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];
          if (typeof token === "string") {
            path3 += token;
            continue;
          }
          var value = data ? data[token.name] : void 0;
          var optional = token.modifier === "?" || token.modifier === "*";
          var repeat = token.modifier === "*" || token.modifier === "+";
          if (Array.isArray(value)) {
            if (!repeat) {
              throw new TypeError('Expected "' + token.name + '" to not repeat, but got an array');
            }
            if (value.length === 0) {
              if (optional)
                continue;
              throw new TypeError('Expected "' + token.name + '" to not be empty');
            }
            for (var j = 0; j < value.length; j++) {
              var segment = encode(value[j], token);
              if (validate2 && !matches[i].test(segment)) {
                throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
              }
              path3 += token.prefix + segment + token.suffix;
            }
            continue;
          }
          if (typeof value === "string" || typeof value === "number") {
            var segment = encode(String(value), token);
            if (validate2 && !matches[i].test(segment)) {
              throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
            }
            path3 += token.prefix + segment + token.suffix;
            continue;
          }
          if (optional)
            continue;
          var typeOfMessage = repeat ? "an array" : "a string";
          throw new TypeError('Expected "' + token.name + '" to be ' + typeOfMessage);
        }
        return path3;
      };
    }
    exports.tokensToFunction = tokensToFunction;
    function match2(str, options) {
      var keys = [];
      var re = pathToRegexp3(str, keys, options);
      return regexpToFunction(re, keys, options);
    }
    exports.match = match2;
    function regexpToFunction(re, keys, options) {
      if (options === void 0) {
        options = {};
      }
      var _a2 = options.decode, decode = _a2 === void 0 ? function(x) {
        return x;
      } : _a2;
      return function(pathname) {
        var m = re.exec(pathname);
        if (!m)
          return false;
        var path3 = m[0], index = m.index;
        var params = /* @__PURE__ */ Object.create(null);
        var _loop_1 = function(i2) {
          if (m[i2] === void 0)
            return "continue";
          var key2 = keys[i2 - 1];
          if (key2.modifier === "*" || key2.modifier === "+") {
            params[key2.name] = m[i2].split(key2.prefix + key2.suffix).map(function(value) {
              return decode(value, key2);
            });
          } else {
            params[key2.name] = decode(m[i2], key2);
          }
        };
        for (var i = 1; i < m.length; i++) {
          _loop_1(i);
        }
        return { path: path3, index, params };
      };
    }
    exports.regexpToFunction = regexpToFunction;
    function escapeString(str) {
      return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    }
    function flags(options) {
      return options && options.sensitive ? "" : "i";
    }
    function regexpToRegexp(path3, keys) {
      if (!keys)
        return path3;
      var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
      var index = 0;
      var execResult = groupsRegex.exec(path3.source);
      while (execResult) {
        keys.push({
          name: execResult[1] || index++,
          prefix: "",
          suffix: "",
          modifier: "",
          pattern: ""
        });
        execResult = groupsRegex.exec(path3.source);
      }
      return path3;
    }
    function arrayToRegexp(paths, keys, options) {
      var parts = paths.map(function(path3) {
        return pathToRegexp3(path3, keys, options).source;
      });
      return new RegExp("(?:" + parts.join("|") + ")", flags(options));
    }
    function stringToRegexp(path3, keys, options) {
      return tokensToRegexp(parse5(path3, options), keys, options);
    }
    function tokensToRegexp(tokens, keys, options) {
      if (options === void 0) {
        options = {};
      }
      var _a2 = options.strict, strict = _a2 === void 0 ? false : _a2, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
        return x;
      } : _d;
      var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
      var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
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
                route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
              } else {
                route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
              }
            } else {
              route += "(" + token.pattern + ")" + token.modifier;
            }
          } else {
            route += "(?:" + prefix + suffix + ")" + token.modifier;
          }
        }
      }
      if (end) {
        if (!strict)
          route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
      } else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string" ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
        if (!strict) {
          route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }
        if (!isEndDelimited) {
          route += "(?=" + delimiter + "|" + endsWith + ")";
        }
      }
      return new RegExp(route, flags(options));
    }
    exports.tokensToRegexp = tokensToRegexp;
    function pathToRegexp3(path3, keys, options) {
      if (path3 instanceof RegExp)
        return regexpToRegexp(path3, keys);
      if (Array.isArray(path3))
        return arrayToRegexp(path3, keys, options);
      return stringToRegexp(path3, keys, options);
    }
    exports.pathToRegexp = pathToRegexp3;
  }
});

// src/errors/InvalidRoutePatternError.ts
var InvalidRoutePatternError;
var init_InvalidRoutePatternError = __esm({
  "src/errors/InvalidRoutePatternError.ts"() {
    "use strict";
    InvalidRoutePatternError = class extends Error {
      constructor(pattern) {
        super(`Route pattern "${pattern}" contains invalid syntax. To force exact matching, wrap the path in the 'exact' function.
See https://docs.edg.io/guides/performance/cdn_as_code/common_routing_patterns for more information.`);
        this.isUserError = true;
      }
    };
  }
});

// src/utils/toPathRegexp.ts
function toPathRegexp(path3) {
  if (path3) {
    try {
      return (0, import_path_to_regexp.pathToRegexp)(path3);
    } catch (e) {
      throw new InvalidRoutePatternError(path3);
    }
  } else {
    return /^.*$/;
  }
}
var import_path_to_regexp;
var init_toPathRegexp = __esm({
  "src/utils/toPathRegexp.ts"() {
    "use strict";
    import_path_to_regexp = __toESM(require_dist2());
    init_InvalidRoutePatternError();
  }
});

// src/router/RouteCriteria.ts
var isNegation;
var init_RouteCriteria = __esm({
  "src/router/RouteCriteria.ts"() {
    "use strict";
    isNegation = (value) => {
      return !!value && typeof value === "object" && "not" in value;
    };
  }
});

// src/router/converters/toCondition.ts
var toCondition;
var init_toCondition = __esm({
  "src/router/converters/toCondition.ts"() {
    "use strict";
    init_exact();
    init_toEdgeRegex();
    init_toPathRegexp();
    init_RouteCriteria();
    toCondition = (property, value) => {
      if (isNegation(value)) {
        if (typeof value.not === "string") {
          if (property.request === "path" && toPathRegexp(value.not)) {
            return { ["!="]: [property, value.not] };
          }
          return { ["!=="]: [property, value.not] };
        } else if (value.not instanceof RegExp) {
          return { ["!~"]: [property, toEdgeRegex(value.not)] };
        } else if (value.not instanceof ExactPath) {
          return { ["!=="]: [property, value.not.value] };
        } else if (Array.isArray(value)) {
          return { not_in: [property, value] };
        }
      } else {
        if (typeof value === "string") {
          if (property.request === "path" && toPathRegexp(value)) {
            return { ["=="]: [property, value] };
          }
          return { ["==="]: [property, value] };
        } else if (value instanceof RegExp) {
          return { ["=~"]: [property, toEdgeRegex(value)] };
        } else if (value instanceof ExactPath) {
          return { ["==="]: [property, value.value] };
        } else if (Array.isArray(value)) {
          return { in: [property, value] };
        }
      }
      throw new Error(`Invalid type for match condition: ${typeof value}`);
    };
  }
});

// src/router/createMatchers.ts
function createMatchers(criteria) {
  var _a2;
  const rules = [];
  const add = (property, value) => {
    const condition = toCondition(property, value);
    rules.push(condition);
  };
  if (criteria.path) {
    add({ request: "path" }, criteria.path);
  }
  if (criteria.scheme) {
    add({ request: "scheme" }, criteria.scheme);
  }
  if (criteria.method) {
    add({ request: "method" }, typeof criteria.method === "string" ? criteria.method.toUpperCase() : criteria.method);
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
  if ((_a2 = criteria.response) == null ? void 0 : _a2.status_code) {
    add({ response: "status_code" }, criteria.response.status_code);
  }
  return rules;
}
var init_createMatchers = __esm({
  "src/router/createMatchers.ts"() {
    "use strict";
    init_toCondition();
  }
});

// src/router/converters/toRule.ts
var toRule;
var init_toRule = __esm({
  "src/router/converters/toRule.ts"() {
    "use strict";
    init_createMatchers();
    toRule = (criteria, features) => {
      let matchers = createMatchers(criteria);
      if (matchers.length === 0) {
        return features;
      }
      matchers = matchers.length == 1 ? matchers[0] : { and: matchers };
      const rule = {
        if: [matchers, features]
      };
      return rule;
    };
  }
});

// src/utils/regexUtils.ts
function substituteParams(regex, source, destination) {
  return bindRegexParams(destination, regex.exec(source) || []);
}
function bindRegexParams(destination, params) {
  var _a2;
  return ((_a2 = destination.match(/(\\?)(\$[0-9]*)/g)) == null ? void 0 : _a2.reduce((output, substitutionParam) => {
    if (substitutionParam.startsWith("\\"))
      return output;
    const index = parseInt(substitutionParam.substring(1));
    return output.replace(substitutionParam, params[index] || "");
  }, destination)) || destination;
}
var init_regexUtils = __esm({
  "src/utils/regexUtils.ts"() {
    "use strict";
  }
});

// src/utils/bindParams.ts
var bindParams_default;
var init_bindParams = __esm({
  "src/utils/bindParams.ts"() {
    "use strict";
    init_regexUtils();
    bindParams_default = (path3, params) => {
      let p = path3;
      if (/(^|[^$]){/.test(path3)) {
        throw new Error(`{variable} syntax in the path option is no longer supported, use :variable instead (${path3})`);
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
      p = (params == null ? void 0 : params.$) ? bindRegexParams(p, params.$) : p;
      return p;
    };
  }
});

// src/runtime/toRegExp.ts
function toRegExp(pattern, flags = "g") {
  if (pattern.startsWith("(?i)")) {
    pattern = pattern.substring(4);
    flags += "i";
  }
  return new RegExp(pattern, flags);
}
var init_toRegExp = __esm({
  "src/runtime/toRegExp.ts"() {
    "use strict";
  }
});

// src/router/path.ts
function rewritePath(sourcePath, destPath, skipQuery) {
  if (sourcePath == null)
    return { destination: destPath };
  return {
    source: `${sourcePath}:optionalSlash(\\/?)?:optionalQuery(\\?.*)?`,
    syntax: "path-to-regexp",
    destination: `${destPath}${skipQuery ? "" : ":optionalSlash:optionalQuery"}`
  };
}
function mapURL(url2, source, destination, syntax) {
  let targetSource;
  let targetDest = destination;
  if (!source)
    return targetDest;
  if (syntax === "regexp") {
    targetSource = toRegExp(source, "");
  } else {
    targetSource = (0, import_path_to_regexp2.pathToRegexp)(source);
    targetDest = bindParams_default(destination, getBackReferences(source));
  }
  if (!url2.match(targetSource))
    return null;
  return url2.replace(targetSource, targetDest);
}
function getBackReferences(path3) {
  const absolutePathMatch = path3.match(/https?:\/\/[^/]+(.*)/);
  if (absolutePathMatch) {
    path3 = `/${absolutePathMatch[1]}`;
  }
  let backReferenceCounter = 1;
  const references = {};
  (0, import_path_to_regexp2.parse)(path3).forEach((token) => {
    if (typeof token !== "string") {
      references[token.name] = `$${backReferenceCounter++}`;
    }
  });
  return references;
}
var import_path_to_regexp2;
var init_path = __esm({
  "src/router/path.ts"() {
    "use strict";
    import_path_to_regexp2 = __toESM(require_dist2());
    init_bindParams();
    init_toEdgeRegex();
    init_toRegExp();
  }
});

// src/origins.ts
function getEdgioOrigins(forEdgeControl = false) {
  return [
    createStaticOrigin(),
    createPermanentStaticOrigin(),
    createServerlessOrigin(forEdgeControl),
    createImageOptimizerOrigin()
  ];
}
function getPathPrefix(origin) {
  var _a2, _b, _c;
  return ((_c = (_b = (_a2 = internalConfig == null ? void 0 : internalConfig.origins) == null ? void 0 : _a2.find((o) => o.name === origin)) == null ? void 0 : _b.hosts[0]) == null ? void 0 : _c.path_prefix) || "";
}
function createStaticOrigin() {
  return getOriginFromConfig(STATIC_ORIGIN_NAME) || {
    name: STATIC_ORIGIN_NAME,
    hosts: [{ location: "127.0.0.1:3002" }]
  };
}
function createPermanentStaticOrigin() {
  return getOriginFromConfig(PERMANENT_STATIC_ORIGIN_NAME) || {
    name: PERMANENT_STATIC_ORIGIN_NAME,
    hosts: [{ location: "127.0.0.1:3002" }]
  };
}
function createServerlessOrigin(forEdgeControl = false) {
  const originFromConfig = forEdgeControl ? getOriginFromConfig(SERVERLESS_ORIGIN_NAME) : null;
  return originFromConfig || {
    name: SERVERLESS_ORIGIN_NAME,
    hosts: [{ location: "127.0.0.1:3001" }]
  };
}
function createImageOptimizerOrigin() {
  var _a2;
  const serverlessOriginConfig = getOriginFromConfig(SERVERLESS_ORIGIN_NAME);
  const optimizerOriginConfig = isLocal() ? {
    hosts: [{ location: "127.0.0.1:3003" }]
  } : {
    ...serverlessOriginConfig,
    override_host_header: (_a2 = serverlessOriginConfig == null ? void 0 : serverlessOriginConfig.hosts[0]) == null ? void 0 : _a2.location
  };
  return {
    ...optimizerOriginConfig,
    name: IMAGE_OPTIMIZER_ORIGIN_NAME
  };
}
var STATIC_ORIGIN_NAME, PERMANENT_STATIC_ORIGIN_NAME, SERVERLESS_ORIGIN_NAME, IMAGE_OPTIMIZER_ORIGIN_NAME, internalConfig, getOriginFromConfig;
var init_origins = __esm({
  "src/origins.ts"() {
    "use strict";
    init_constants();
    init_environment();
    STATIC_ORIGIN_NAME = "edgio_static";
    PERMANENT_STATIC_ORIGIN_NAME = "edgio_permanent_static";
    SERVERLESS_ORIGIN_NAME = "edgio_serverless";
    IMAGE_OPTIMIZER_ORIGIN_NAME = "edgio_image_optimizer";
    internalConfig = process.env[EDGIO_ENV_VARIABLES.internalConfig] ? JSON.parse(process.env[EDGIO_ENV_VARIABLES.internalConfig] || "{}") : {};
    getOriginFromConfig = (name) => {
      var _a2, _b;
      const origin = (_a2 = internalConfig == null ? void 0 : internalConfig.origins) == null ? void 0 : _a2.find((origin2) => origin2.name === name);
      if (origin) {
        for (let host of origin.hosts) {
          delete host.path_prefix;
        }
        return {
          ...origin,
          tls_verify: {
            use_sni: true,
            sni_hint_and_strict_san_check: (_b = origin == null ? void 0 : origin.hosts.find((host) => host == null ? void 0 : host.location)) == null ? void 0 : _b.location
          }
        };
      }
      return origin;
    };
  }
});

// src/router/RedirectOptions.ts
var import_url, import_querystring, normalizeRedirectOptions;
var init_RedirectOptions = __esm({
  "src/router/RedirectOptions.ts"() {
    "use strict";
    import_url = __toESM(require("url"));
    import_querystring = __toESM(require("querystring"));
    normalizeRedirectOptions = (to, options) => {
      const { statusCode = 302, query = {} } = typeof options === "number" ? { statusCode: options } : options;
      let toQuery = {};
      const parsedTo = import_url.default.parse(to);
      if (parsedTo == null ? void 0 : parsedTo.search) {
        to = to.substr(0, to.length - parsedTo.search.length);
        toQuery = import_querystring.default.parse(parsedTo.query);
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
  }
});

// src/errors/BackendFetchError.ts
var BackendFetchError;
var init_BackendFetchError = __esm({
  "src/errors/BackendFetchError.ts"() {
    "use strict";
    BackendFetchError = class extends Error {
      constructor(cause) {
        super(cause.message);
        this.type = "BackendFetchError";
        this.cause = cause;
      }
    };
  }
});

// src/runtime/random.ts
function getRandomElement(source) {
  const index = getRandomInt(source.length);
  return source[index];
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
var init_random = __esm({
  "src/runtime/random.ts"() {
    "use strict";
  }
});

// src/utils/mergeQueryString.ts
function mergeQueryString(requestUrl, targetRedirectOrPath) {
  const requestSearchParams = new URL(requestUrl, `https://${PLACEHOLDER_HOSTNAME}`).searchParams;
  const targetUrl = new URL(targetRedirectOrPath, `https://${PLACEHOLDER_HOSTNAME}`);
  requestSearchParams.forEach((value, key2) => {
    if (!targetUrl.searchParams.get(key2)) {
      targetUrl.searchParams.set(key2, value);
    }
  });
  return targetUrl.hostname === PLACEHOLDER_HOSTNAME ? `${targetUrl.pathname}${targetUrl.search}` : targetUrl.toString();
}
var PLACEHOLDER_HOSTNAME;
var init_mergeQueryString = __esm({
  "src/utils/mergeQueryString.ts"() {
    "use strict";
    PLACEHOLDER_HOSTNAME = "__";
  }
});

// src/runtime/Backend.ts
var import_url2, import_http, import_https, IGNORE_RESPONSE_HEADERS, Backend, impl;
var init_Backend = __esm({
  "src/runtime/Backend.ts"() {
    "use strict";
    import_url2 = require("url");
    import_http = __toESM(require("http"));
    import_https = __toESM(require("https"));
    init_BackendFetchError();
    init_constants();
    init_random();
    init_log();
    init_bindParams();
    init_mergeQueryString();
    IGNORE_RESPONSE_HEADERS = ["transfer-encoding", "content-length"];
    Backend = class {
      static setImpl(implementation) {
        impl = implementation;
      }
      static create(config2, origin) {
        return new impl(config2, origin);
      }
      constructor(config2, origin) {
        this.config = config2;
        this.origin = origin;
        this.hostHeader = origin.override_host_header;
      }
      async fetch(req, res, options = {}) {
        const url2 = this.getProxyTarget(req);
        const requestOptions = this.getProxyRequestOptions(url2, req, options);
        log_default.debug("[Backend]", "fetch", requestOptions);
        return new Promise((resolve2, reject) => {
          const lib = url2.protocol === "https:" ? import_https.default : import_http.default;
          let metadataApplied = false;
          const upstreamReq = lib.request(requestOptions, (upstreamRes) => {
            const processMetadata = () => {
              if (!metadataApplied) {
                metadataApplied = true;
                Object.entries(upstreamRes.headers).filter(([name]) => !IGNORE_RESPONSE_HEADERS.includes(name.toLowerCase())).forEach(([name, value]) => {
                  try {
                    res.setHeader(name, value);
                  } catch (e) {
                    log_default.warn(`Could not relay upstream response header ${name} with value ${value}`, e);
                  }
                });
                res.statusCode = upstreamRes.statusCode;
                res.statusMessage = upstreamRes.statusMessage;
                log_default.debug("proxy", `[${res.statusCode} ${res.statusMessage}]`, url2);
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
                  resolve2();
                }
              } catch (e) {
                reject(e);
                upstreamRes.destroy();
              }
            }).on("error", (e) => {
              reject(new BackendFetchError(e));
            }).on("close", () => {
              if (!upstreamRes.complete) {
                reject(new BackendFetchError(new Error("The connection was terminated while the message was still being sent")));
              }
            });
          });
          upstreamReq.on("error", (e) => reject(new BackendFetchError(e)));
          upstreamReq.end(req.rawBody);
        });
      }
      getProxyTarget(req) {
        let location;
        if (Array.isArray(this.config.location)) {
          location = getRandomElement(this.config.location);
        } else {
          location = this.config.location;
        }
        if (typeof location === "string") {
          location = { hostname: location };
        }
        const { hostname, port } = location;
        const protocol = hostname.match(/^(127.0.0.1|localhost)(:\d+)?$/) ? "http" : "https";
        const host = `${hostname}${port ? `:${port}` : ""}`;
        const parsed = (0, import_url2.parse)(`${protocol}://${host}${req.url}`, true);
        if (req.getHeader(HTTP_HEADERS.xEdgeProtocol) === "http") {
          parsed.protocol = "http:";
        }
        return parsed;
      }
      isLocal(url2) {
        return url2.hostname === JS_BACKEND_HOSTNAME;
      }
      getProxyRequestOptions(originUrl, req, options = {}) {
        var _a2;
        let agent = null;
        if (((_a2 = this.origin.tls_verify) == null ? void 0 : _a2.allow_self_signed_certs) && originUrl.protocol === "https:") {
          agent = new import_https.default.Agent({ rejectUnauthorized: false });
        }
        let pathWithQuery = originUrl.path ?? "/";
        if (options == null ? void 0 : options.path) {
          const updatedPathWithQuery = bindParams_default(typeof options.path === "function" ? options.path() || "" : options.path, req.params);
          pathWithQuery = mergeQueryString(pathWithQuery ?? "", updatedPathWithQuery);
        }
        if ((options == null ? void 0 : options.removeEmptySearchParamValues) && originUrl.path) {
          pathWithQuery = pathWithQuery == null ? void 0 : pathWithQuery.replace(/=(?=&|$)/gm, "");
        }
        const upstreamHeaders = {
          ...req.headers,
          ...(options == null ? void 0 : options.headers) ?? {},
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
    impl = Backend;
  }
});

// src/runtime/Origin.ts
var Origin;
var init_Origin = __esm({
  "src/runtime/Origin.ts"() {
    "use strict";
    init_log();
    init_Backend();
    init_random();
    Origin = class {
      constructor(config2) {
        this.config = config2;
      }
      async fetch(request, response, options = {}) {
        const hostConfig = this.selectHost();
        const host = Backend.create(hostConfig, this.config);
        return host.fetch(request, response, options);
      }
      selectHost() {
        const { balancer } = this.config;
        if ("static_weighted" === balancer) {
          return this.config.hosts[0];
        } else if ("round_robin" === balancer) {
          return getRandomElement(this.config.hosts);
        } else {
          if (balancer) {
            log_default.warn(`balancer type "${balancer}" is not supported during local development, falling back to "static".`);
          }
          return this.config.hosts[0];
        }
      }
    };
  }
});

// src/runtime/OriginFetcher.ts
function convertErrorToResponse(e, res) {
  var _a2;
  if (e instanceof Error) {
    res.setHeader(HTTP_HEADERS.xEdgServerlessError, e.message);
    if (((_a2 = e.cause) == null ? void 0 : _a2.code) === "ETIMEDOUT") {
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
    res.setHeader(HTTP_HEADERS.xEdgServerlessError, e.toString());
  }
}
var OriginFetcher;
var init_OriginFetcher = __esm({
  "src/runtime/OriginFetcher.ts"() {
    "use strict";
    init_Origin();
    init_constants();
    OriginFetcher = class {
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
          await new Origin(originConfig).fetch(req, res, options);
        } catch (e) {
          console.error(`Error fetching from origin ${originName}`, e);
          convertErrorToResponse(e, res);
        }
        if (res.statusCode === 416 && options.ignoreUnsatisfiableRanges) {
          req.removeHeader(HTTP_HEADERS.range);
          res.clear();
          return this.fetch(req, res, options);
        }
      }
      removeSensitiveHeaders(req) {
        req.removeHeader("authorization");
        req.removeHeader("cookie");
      }
    };
  }
});

// src/utils/isEmpty.ts
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
var init_isEmpty = __esm({
  "src/utils/isEmpty.ts"() {
    "use strict";
  }
});

// src/router/CacheManifersRegexp.ts
var init_CacheManifersRegexp = __esm({
  "src/router/CacheManifersRegexp.ts"() {
    "use strict";
  }
});

// src/utils/universalRouteUtils.ts
function isParamMatcher(value) {
  return typeof value === "string" && /^:\w+$/.test(value);
}
function paramMatcherToParam(value) {
  return value.slice(1);
}
var init_universalRouteUtils = __esm({
  "src/utils/universalRouteUtils.ts"() {
    "use strict";
    init_CacheManifersRegexp();
  }
});

// src/router/ParamsExtractor.ts
var import_path_to_regexp3, ParamsExtractor;
var init_ParamsExtractor = __esm({
  "src/router/ParamsExtractor.ts"() {
    "use strict";
    init_RouteCriteria();
    import_path_to_regexp3 = __toESM(require_dist2());
    init_universalRouteUtils();
    ParamsExtractor = class {
      constructor(routeCriteria) {
        this.routeCriteria = {};
        this.updateRouteCriteria(routeCriteria);
      }
      updateRouteCriteria(routeCriteria) {
        this.routeCriteria = {
          path: routeCriteria == null ? void 0 : routeCriteria.path,
          query: routeCriteria == null ? void 0 : routeCriteria.query
        };
      }
      extract(request) {
        var _a2, _b;
        return {
          ...((_a2 = this.routeCriteria) == null ? void 0 : _a2.path) && !isNegation(this.routeCriteria.path) ? ParamsExtractor.getMatchedPathParams(this.routeCriteria.path, request.path) : {},
          ...((_b = this.routeCriteria) == null ? void 0 : _b.query) ? ParamsExtractor.getMatchedQueryParams(this.routeCriteria.query, request.query) : {}
        };
      }
      static getMatchedPathParams(criteriaPath, requestPath) {
        if (criteriaPath instanceof RegExp)
          return {
            $: criteriaPath.exec(requestPath) || []
          };
        if (Array.isArray(criteriaPath))
          return void 0;
        const pathMatcher = (0, import_path_to_regexp3.match)(criteriaPath.toString(), { decode: decodeURIComponent });
        const result = pathMatcher(requestPath);
        return result ? result.params : void 0;
      }
      static getMatchedQueryParams(criteriaQuery, requestQuery) {
        let extractedParams = {};
        if (typeof requestQuery !== "object")
          return extractedParams;
        for (const criteriaQueryKey in criteriaQuery) {
          const criteriaQueryValue = criteriaQuery[criteriaQueryKey];
          if (typeof criteriaQueryValue !== "string" || !isParamMatcher(criteriaQueryValue))
            continue;
          const paramName = paramMatcherToParam(criteriaQueryValue);
          extractedParams = {
            ...extractedParams,
            [paramName]: requestQuery[paramName]
          };
        }
        return extractedParams;
      }
    };
  }
});

// src/utils/cookieUtils.ts
function serializeCookie(name, value, options = {}) {
  return Object.keys(options).reduce((output, key2) => {
    const opt = options[key2];
    if (typeof opt === "boolean" && opt)
      return `${output}; ${key2}`;
    return `${output}; ${key2}=${opt}`;
  }, `${name}=${value}`);
}
var init_cookieUtils = __esm({
  "src/utils/cookieUtils.ts"() {
    "use strict";
  }
});

// src/router/converters/toTimeInterval.ts
var toTimeInterval;
var init_toTimeInterval = __esm({
  "src/router/converters/toTimeInterval.ts"() {
    "use strict";
    toTimeInterval = (value) => {
      if (typeof value === "string") {
        return value;
      }
      return `${value}s`;
    };
  }
});

// src/router/RouteHelper.ts
var import_qs3, RouteHelper;
var init_RouteHelper = __esm({
  "src/router/RouteHelper.ts"() {
    "use strict";
    init_constants();
    init_path();
    init_origins();
    init_RouteCriteria();
    init_constants();
    init_RedirectOptions();
    init_OriginFetcher();
    init_isEmpty();
    init_bindParams();
    init_ParamsExtractor();
    import_qs3 = __toESM(require_lib2());
    init_toEdgeRegex();
    init_cookieUtils();
    init_exact();
    init_toTimeInterval();
    RouteHelper = class {
      constructor(criteria, router) {
        this.features = {};
        this.serviceWorker = (filePath) => {
          this.cache({ edge: { maxAgeSeconds: FAR_FUTURE_TTL }, browser: false });
          if (filePath) {
            this.serveStatic(filePath);
          } else {
            this.setOrigin(STATIC_ORIGIN_NAME);
            this.rewritePath(void 0, `${getPathPrefix(STATIC_ORIGIN_NAME)}/service-worker.js`);
          }
        };
        this.cache = (options) => {
          this.features.caching = this.features.caching || {};
          const { caching } = this.features;
          if (options.edge) {
            if (options.edge.maxAgeSeconds) {
              caching.max_age = toTimeInterval(options.edge.maxAgeSeconds);
            }
            if (options.edge.staleWhileRevalidateSeconds) {
              caching.stale_while_revalidate = toTimeInterval(options.edge.staleWhileRevalidateSeconds);
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
              this.setResponseHeader(HTTP_HEADERS.xSwCacheControl, `max-age=${options.browser.serviceWorkerSeconds}`);
              caching.service_worker_max_age = toTimeInterval(options.browser.serviceWorkerSeconds);
            }
            if (options.browser.maxAgeSeconds === 0) {
              caching.bypass_client_cache = true;
            } else if (options.browser.maxAgeSeconds) {
              caching.client_max_age = toTimeInterval(options.browser.maxAgeSeconds);
            }
          } else if (options.browser === false) {
            caching.bypass_client_cache = true;
          }
          if (options.key) {
            options.key.applyCaching(this.features);
          }
        };
        this.serveStatic = (path3, options = {}) => {
          const { edgeMaxAgeSeconds = FAR_FUTURE_TTL, permanent } = options;
          this.cache({ edge: { maxAgeSeconds: edgeMaxAgeSeconds } });
          const origin = permanent ? PERMANENT_STATIC_ORIGIN_NAME : STATIC_ORIGIN_NAME;
          this.setOrigin(origin);
          const pathPrefix = getPathPrefix(origin);
          path3 = path3.startsWith("/") ? path3.slice(1) : path3;
          const source = Array.isArray(this.routeCriteria.path) || isNegation(this.routeCriteria.path) ? options.rewritePathSource ?? "/:path*" : this.routeCriteria.path ?? "/:path*";
          if (options.statusCode) {
            this.setResponseCode(options.statusCode);
          }
          this.rewritePath(source, `${pathPrefix}/${path3}`, true);
        };
        this.renderWithApp = () => {
          this.sendToServerless(EDGIO_SERVERLESS_HINTS.app);
        };
        this.compute = (fn) => {
          this.sendToServerless(EDGIO_SERVERLESS_HINTS.compute, fn);
        };
        this.proxy = (backend, options) => {
          this.setOrigin(backend);
          if ((options == null ? void 0 : options.transformRequest) || (options == null ? void 0 : options.transformResponse)) {
            this.sendToServerless(EDGIO_SERVERLESS_HINTS.proxy, async (req, res, propertyContext) => {
              const lambdaResponse = res;
              (options == null ? void 0 : options.transformRequest) && options.transformRequest(req);
              await new OriginFetcher(propertyContext).fetch(req, res, {
                headers: options == null ? void 0 : options.headers,
                removeEmptySearchParamValues: options == null ? void 0 : options.removeEmptySearchParamValues,
                path: options == null ? void 0 : options.path
              }, backend);
              lambdaResponse.body = Buffer.concat(lambdaResponse.chunks.slice(0, -1));
              if (options == null ? void 0 : options.transformResponse) {
                options.transformResponse(res, req);
                res.setHeader("Content-Length", lambdaResponse.body.length.toString());
              }
            });
          } else if (options) {
            if (options.path) {
              const destination = typeof options.path === "string" ? options.path : options.path();
              const path3 = Array.isArray(this.routeCriteria.path) || isNegation(this.routeCriteria.path) ? "/:path*" : this.routeCriteria.path;
              if (destination) {
                this.rewritePath(path3, destination);
              }
            }
            if (options == null ? void 0 : options.headers) {
              for (const [key2, value] of Object.entries(options.headers)) {
                this.setRequestHeader(key2, value);
              }
            }
            if ((options == null ? void 0 : options.followRedirects) != null) {
              if (!this.features.url)
                this.features.url = {};
              this.features.url.follow_redirects = options == null ? void 0 : options.followRedirects;
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
        this.updateResponseHeader = (name, match2, replace) => {
          this.setResponseHeader(name, `%{resp_${name}/${match2.global ? "/" : ""}${toEdgeRegex(match2)}/${replace}}`);
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
        this.updateRequestHeader = (name, match2, replace) => {
          this.setRequestHeader(name, `%{http_${name}/${match2.global ? "/" : ""}${toEdgeRegex(match2)}/${replace}}`);
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
        this.allowCors = (config2 = {}) => {
          this.setResponseHeader("Access-Control-Allow-Origin", config2.origin || "*");
          if (config2.methods) {
            this.setResponseHeader("Access-Control-Allow-Methods", config2.methods.join(", "));
          }
          if (config2.headers) {
            this.setResponseHeader("Access-Control-Allow-Headers", config2.headers.join(", "));
          }
          if (config2.maxAge) {
            this.setResponseHeader("Access-Control-Max-Age", config2.maxAge.toString());
          }
          if (config2.credentials != null) {
            this.setResponseHeader("Access-Control-Allow-Credentials", config2.credentials.toString());
          }
        };
        this.rewritePath = (source, destination, skipOptionalQuery) => {
          if (!this.features.url) {
            this.features.url = {};
          }
          if (!this.features.url.url_rewrite) {
            this.features.url.url_rewrite = [];
          }
          if (source instanceof ExactPath) {
            source = source.toString();
          }
          if (typeof source === "string") {
            this.features.url.url_rewrite.push(rewritePath(source, destination, skipOptionalQuery));
          } else {
            this.features.url.url_rewrite.push({
              syntax: "regexp",
              source: source ? toEdgeRegex(source) : void 0,
              destination
            });
          }
        };
        this.updatePath = (destination) => {
          this.paramsExtractor.updateRouteCriteria({
            path: destination
          });
          this.rewritePath(this.routeCriteria.path ?? "/:path*", destination);
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
          this.setResponseHeader(HTTP_HEADERS.contentType, "text/html");
          this.serveStatic(indexHtmlPath);
        };
        this.redirect = (to, options = {}) => {
          var _a2, _b, _c, _d;
          const { to: toPath, statusCode, query } = normalizeRedirectOptions(to, options);
          const isMatchOnlyQuery = () => !Object.values(this.routeCriteria.query ?? {}).find((value) => typeof value === "string" && value.startsWith(":"));
          this.rewritePath("/:path*", "/:path*");
          if (isEmpty(query) && isMatchOnlyQuery()) {
            this.features.url = this.features.url ?? {};
            this.features.url.url_redirect = this.features.url.url_redirect ?? {};
            this.features.url.url_redirect.code = statusCode;
            if (((_a2 = this.routeCriteria) == null ? void 0 : _a2.path) instanceof RegExp) {
              this.features.url.url_redirect.source = toEdgeRegex((_b = this.routeCriteria) == null ? void 0 : _b.path);
              this.features.url.url_redirect.destination = toPath;
              this.features.url.url_redirect.syntax = "regexp";
              return;
            }
            this.features.url.url_redirect = {
              ...this.features.url.url_redirect,
              ...rewritePath((_d = (_c = this.routeCriteria) == null ? void 0 : _c.path) == null ? void 0 : _d.toString(), toPath, true)
            };
            return;
          }
          this.sendToServerless(EDGIO_SERVERLESS_HINTS.redirect, async (req, res) => {
            let queryWithReplacedParams = {};
            for (const queryKey in query) {
              queryWithReplacedParams = {
                ...queryWithReplacedParams,
                [bindParams_default(queryKey, req.params)]: bindParams_default(query[queryKey], req.params)
              };
            }
            res.setHeader(HTTP_HEADERS.location, `${bindParams_default(toPath, req.params)}${Object.keys(queryWithReplacedParams).length > 0 ? "?" + import_qs3.default.stringify(queryWithReplacedParams) : ""}`);
            res.statusCode = statusCode;
            res.body = "";
          });
          this.cache({
            cacheableStatusCodes: [301, 302, 305, 307, 308],
            edge: {
              maxAgeSeconds: FAR_FUTURE_TTL
            }
          });
        };
        this.addResponseCookie = (name, value, options) => {
          this.addResponseHeader(HTTP_HEADERS.setCookie, serializeCookie(name, value, options));
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
        this.paramsExtractor = new ParamsExtractor(criteria);
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
        this.setRequestHeader(`+${EDGIO_SERVERLESS_HINT_HEADER}`, hintIndex !== null ? `${hint}:${hintIndex}` : hint);
        this.setOrigin(SERVERLESS_ORIGIN_NAME);
      }
    };
  }
});

// src/router/converters/toFeature.ts
var toFeature;
var init_toFeature = __esm({
  "src/router/converters/toFeature.ts"() {
    "use strict";
    init_RouteHelper();
    toFeature = (criteria, features, router) => {
      if (typeof features === "function") {
        return new RouteHelper(criteria, router).evaluate(features);
      } else {
        return features;
      }
    };
  }
});

// src/utils/Tasks.ts
var Tasks;
var init_Tasks = __esm({
  "src/utils/Tasks.ts"() {
    "use strict";
    Tasks = class {
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
      onTaskDone(handler2) {
        this._resolveHandler = handler2;
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
  }
});

// src/router/PreloadRequests.ts
var PreloadRequests;
var init_PreloadRequests = __esm({
  "src/router/PreloadRequests.ts"() {
    "use strict";
    init_config();
    init_Tasks();
    PreloadRequests = class {
      constructor() {
        this.options = [];
      }
      push(...options) {
        this.options.push(...options);
      }
      async getPreloadConfig() {
        const edgioConfig = getConfig();
        const requests = [];
        await new Tasks().add(...this.options).onTaskDone((result) => requests.push(...result)).resolve();
        return {
          requests,
          concurrency: edgioConfig == null ? void 0 : edgioConfig.prerenderConcurrency
        };
      }
    };
  }
});

// src/router/Router.ts
var import_path3, import_slash2, STATIC_ASSET_MANIFEST_FILE, Router;
var init_Router = __esm({
  "src/router/Router.ts"() {
    "use strict";
    import_path3 = require("path");
    init_constants();
    init_source();
    init_utils();
    init_requireInternal();
    init_toRule();
    init_toFeature();
    init_PreloadRequests();
    init_exact();
    init_environment();
    import_slash2 = __toESM(require_slash());
    STATIC_ASSET_MANIFEST_FILE = "static-asset-manifest.json";
    Router = class {
      constructor(options = {}) {
        this.rules = [];
        this.routerOptions = {};
        this.functions = [];
        this.preloadRequests = new PreloadRequests();
        this.staticAssetManifest = {};
        this.routerOptions = options;
      }
      addStaticAssetManifestEntry(path3, data) {
        if (this.staticAssetManifest[path3] === void 0) {
          this.staticAssetManifest[path3] = data;
        } else {
          this.staticAssetManifest[path3].push(...data);
        }
      }
      static load(routerPath) {
        const routerModule = nonWebpackRequire(routerPath);
        return routerModule.default || routerModule;
      }
      get(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.get, criteria, features, options);
      }
      put(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.put, criteria, features, options);
      }
      patch(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.patch, criteria, features, options);
      }
      post(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.post, criteria, features, options);
      }
      head(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.head, criteria, features, options);
      }
      delete(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.delete, criteria, features, options);
      }
      options(criteria, features, options) {
        return this.matchMethod(HTTP_METHODS.options, criteria, features, options);
      }
      match(criteria, features, options) {
        if (typeof criteria === "string" || criteria instanceof RegExp || criteria instanceof ExactPath) {
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
        const features = toFeature(criteria, featuresParam, this);
        const rule = toRule(criteria, features);
        this.rules.push(rule);
        return this;
      }
      matchMethod(method, criteria, features, options) {
        if (typeof criteria === "string" || criteria instanceof RegExp || criteria instanceof ExactPath) {
          return this.match({
            method,
            path: criteria
          }, features);
        }
        if (criteria == null ? void 0 : criteria.method) {
          throw new Error(`Invalid criteria property method passed to call to Router#${method}. Specifying a method in the criteria is redundant.`);
        }
        return this.match({ ...criteria, method }, features, options);
      }
      dir(sourcePath, features, options = {}) {
        const createInMatcher = (files) => {
          if (!files || files.length === 0)
            return;
          const paths = files.flatMap((file) => {
            var _a2;
            return ((_a2 = options == null ? void 0 : options.paths) == null ? void 0 : _a2.call(options, file)) || [`/${file}`];
          }).flatMap((path3) => {
            if (!path3.endsWith("/index.html"))
              return [path3];
            return Array.from(/* @__PURE__ */ new Set([
              path3.toString().replace(/\/index.html$/, "/"),
              path3.toString().replace(/\/index.html$/, "")
            ])).filter((path4) => path4.length > 0);
          });
          this.match({ path: paths }, features);
        };
        if (isCloud()) {
          const files = this.staticAssetsForPath(sourcePath);
          createInMatcher(files);
        } else {
          const files = Router.collectFiles(sourcePath, options);
          this.addStaticAssetManifestEntry((0, import_slash2.default)(sourcePath), files);
          createInMatcher(files);
        }
        return this;
      }
      static(sourcePath, options = {}) {
        const features = (helper) => {
          helper.serveStatic(`${sourcePath}/:path*`, {
            rewritePathSource: options == null ? void 0 : options.rewritePathSource
          });
          if (options == null ? void 0 : options.handler)
            options.handler(helper);
        };
        return this.dir(sourcePath, features, options);
      }
      staticAssetsForPath(path3) {
        return nonWebpackRequire((0, import_path3.join)(process.cwd(), STATIC_ASSET_MANIFEST_FILE))[path3];
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
        const directory = (0, import_path3.join)(getSourceDir(), sourcePath);
        const ignore = typeof options.ignore === "string" ? [options.ignore] : options.ignore ?? [];
        let files = requireInternal("globby").sync(options.glob || "**/*", {
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
  }
});

// node_modules/lru-cache/index.js
var require_lru_cache = __commonJS({
  "node_modules/lru-cache/index.js"(exports, module2) {
    var perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
    var hasAbortController = typeof AbortController === "function";
    var AC = hasAbortController ? AbortController : class AbortController {
      constructor() {
        this.signal = new AS();
      }
      abort() {
        this.signal.dispatchEvent("abort");
      }
    };
    var hasAbortSignal = typeof AbortSignal === "function";
    var hasACAbortSignal = typeof AC.AbortSignal === "function";
    var AS = hasAbortSignal ? AbortSignal : hasACAbortSignal ? AC.AbortController : class AbortSignal {
      constructor() {
        this.aborted = false;
        this._listeners = [];
      }
      dispatchEvent(type) {
        if (type === "abort") {
          this.aborted = true;
          const e = { type, target: this };
          this.onabort(e);
          this._listeners.forEach((f) => f(e), this);
        }
      }
      onabort() {
      }
      addEventListener(ev, fn) {
        if (ev === "abort") {
          this._listeners.push(fn);
        }
      }
      removeEventListener(ev, fn) {
        if (ev === "abort") {
          this._listeners = this._listeners.filter((f) => f !== fn);
        }
      }
    };
    var warned = /* @__PURE__ */ new Set();
    var deprecatedOption = (opt, instead) => {
      const code = `LRU_CACHE_OPTION_${opt}`;
      if (shouldWarn(code)) {
        warn(code, `${opt} option`, `options.${instead}`, LRUCache);
      }
    };
    var deprecatedMethod = (method, instead) => {
      const code = `LRU_CACHE_METHOD_${method}`;
      if (shouldWarn(code)) {
        const { prototype } = LRUCache;
        const { get: get2 } = Object.getOwnPropertyDescriptor(prototype, method);
        warn(code, `${method} method`, `cache.${instead}()`, get2);
      }
    };
    var deprecatedProperty = (field, instead) => {
      const code = `LRU_CACHE_PROPERTY_${field}`;
      if (shouldWarn(code)) {
        const { prototype } = LRUCache;
        const { get: get2 } = Object.getOwnPropertyDescriptor(prototype, field);
        warn(code, `${field} property`, `cache.${instead}`, get2);
      }
    };
    var emitWarning = (...a) => {
      typeof process === "object" && process && typeof process.emitWarning === "function" ? process.emitWarning(...a) : console.error(...a);
    };
    var shouldWarn = (code) => !warned.has(code);
    var warn = (code, what, instead, fn) => {
      warned.add(code);
      const msg = `The ${what} is deprecated. Please use ${instead} instead.`;
      emitWarning(msg, "DeprecationWarning", code, fn);
    };
    var isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
    var getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
    var ZeroArray = class extends Array {
      constructor(size) {
        super(size);
        this.fill(0);
      }
    };
    var Stack = class {
      constructor(max) {
        if (max === 0) {
          return [];
        }
        const UintArray = getUintArray(max);
        this.heap = new UintArray(max);
        this.length = 0;
      }
      push(n) {
        this.heap[this.length++] = n;
      }
      pop() {
        return this.heap[--this.length];
      }
    };
    var LRUCache = class {
      constructor(options = {}) {
        const {
          max = 0,
          ttl,
          ttlResolution = 1,
          ttlAutopurge,
          updateAgeOnGet,
          updateAgeOnHas,
          allowStale,
          dispose,
          disposeAfter,
          noDisposeOnSet,
          noUpdateTTL,
          maxSize = 0,
          maxEntrySize = 0,
          sizeCalculation,
          fetchMethod,
          fetchContext,
          noDeleteOnFetchRejection,
          noDeleteOnStaleGet
        } = options;
        const { length, maxAge, stale } = options instanceof LRUCache ? {} : options;
        if (max !== 0 && !isPosInt(max)) {
          throw new TypeError("max option must be a nonnegative integer");
        }
        const UintArray = max ? getUintArray(max) : Array;
        if (!UintArray) {
          throw new Error("invalid max value: " + max);
        }
        this.max = max;
        this.maxSize = maxSize;
        this.maxEntrySize = maxEntrySize || this.maxSize;
        this.sizeCalculation = sizeCalculation || length;
        if (this.sizeCalculation) {
          if (!this.maxSize && !this.maxEntrySize) {
            throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
          }
          if (typeof this.sizeCalculation !== "function") {
            throw new TypeError("sizeCalculation set to non-function");
          }
        }
        this.fetchMethod = fetchMethod || null;
        if (this.fetchMethod && typeof this.fetchMethod !== "function") {
          throw new TypeError("fetchMethod must be a function if specified");
        }
        this.fetchContext = fetchContext;
        if (!this.fetchMethod && fetchContext !== void 0) {
          throw new TypeError("cannot set fetchContext without fetchMethod");
        }
        this.keyMap = /* @__PURE__ */ new Map();
        this.keyList = new Array(max).fill(null);
        this.valList = new Array(max).fill(null);
        this.next = new UintArray(max);
        this.prev = new UintArray(max);
        this.head = 0;
        this.tail = 0;
        this.free = new Stack(max);
        this.initialFill = 1;
        this.size = 0;
        if (typeof dispose === "function") {
          this.dispose = dispose;
        }
        if (typeof disposeAfter === "function") {
          this.disposeAfter = disposeAfter;
          this.disposed = [];
        } else {
          this.disposeAfter = null;
          this.disposed = null;
        }
        this.noDisposeOnSet = !!noDisposeOnSet;
        this.noUpdateTTL = !!noUpdateTTL;
        this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
        if (this.maxEntrySize !== 0) {
          if (this.maxSize !== 0) {
            if (!isPosInt(this.maxSize)) {
              throw new TypeError("maxSize must be a positive integer if specified");
            }
          }
          if (!isPosInt(this.maxEntrySize)) {
            throw new TypeError("maxEntrySize must be a positive integer if specified");
          }
          this.initializeSizeTracking();
        }
        this.allowStale = !!allowStale || !!stale;
        this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
        this.updateAgeOnGet = !!updateAgeOnGet;
        this.updateAgeOnHas = !!updateAgeOnHas;
        this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
        this.ttlAutopurge = !!ttlAutopurge;
        this.ttl = ttl || maxAge || 0;
        if (this.ttl) {
          if (!isPosInt(this.ttl)) {
            throw new TypeError("ttl must be a positive integer if specified");
          }
          this.initializeTTLTracking();
        }
        if (this.max === 0 && this.ttl === 0 && this.maxSize === 0) {
          throw new TypeError("At least one of max, maxSize, or ttl is required");
        }
        if (!this.ttlAutopurge && !this.max && !this.maxSize) {
          const code = "LRU_CACHE_UNBOUNDED";
          if (shouldWarn(code)) {
            warned.add(code);
            const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
            emitWarning(msg, "UnboundedCacheWarning", code, LRUCache);
          }
        }
        if (stale) {
          deprecatedOption("stale", "allowStale");
        }
        if (maxAge) {
          deprecatedOption("maxAge", "ttl");
        }
        if (length) {
          deprecatedOption("length", "sizeCalculation");
        }
      }
      getRemainingTTL(key2) {
        return this.has(key2, { updateAgeOnHas: false }) ? Infinity : 0;
      }
      initializeTTLTracking() {
        this.ttls = new ZeroArray(this.max);
        this.starts = new ZeroArray(this.max);
        this.setItemTTL = (index, ttl, start = perf.now()) => {
          this.starts[index] = ttl !== 0 ? start : 0;
          this.ttls[index] = ttl;
          if (ttl !== 0 && this.ttlAutopurge) {
            const t = setTimeout(() => {
              if (this.isStale(index)) {
                this.delete(this.keyList[index]);
              }
            }, ttl + 1);
            if (t.unref) {
              t.unref();
            }
          }
        };
        this.updateItemAge = (index) => {
          this.starts[index] = this.ttls[index] !== 0 ? perf.now() : 0;
        };
        let cachedNow = 0;
        const getNow = () => {
          const n = perf.now();
          if (this.ttlResolution > 0) {
            cachedNow = n;
            const t = setTimeout(() => cachedNow = 0, this.ttlResolution);
            if (t.unref) {
              t.unref();
            }
          }
          return n;
        };
        this.getRemainingTTL = (key2) => {
          const index = this.keyMap.get(key2);
          if (index === void 0) {
            return 0;
          }
          return this.ttls[index] === 0 || this.starts[index] === 0 ? Infinity : this.starts[index] + this.ttls[index] - (cachedNow || getNow());
        };
        this.isStale = (index) => {
          return this.ttls[index] !== 0 && this.starts[index] !== 0 && (cachedNow || getNow()) - this.starts[index] > this.ttls[index];
        };
      }
      updateItemAge(index) {
      }
      setItemTTL(index, ttl, start) {
      }
      isStale(index) {
        return false;
      }
      initializeSizeTracking() {
        this.calculatedSize = 0;
        this.sizes = new ZeroArray(this.max);
        this.removeItemSize = (index) => {
          this.calculatedSize -= this.sizes[index];
          this.sizes[index] = 0;
        };
        this.requireSize = (k, v, size, sizeCalculation) => {
          if (!isPosInt(size)) {
            if (sizeCalculation) {
              if (typeof sizeCalculation !== "function") {
                throw new TypeError("sizeCalculation must be a function");
              }
              size = sizeCalculation(v, k);
              if (!isPosInt(size)) {
                throw new TypeError("sizeCalculation return invalid (expect positive integer)");
              }
            } else {
              throw new TypeError("invalid size value (must be positive integer)");
            }
          }
          return size;
        };
        this.addItemSize = (index, size) => {
          this.sizes[index] = size;
          const maxSize = this.maxSize - this.sizes[index];
          while (this.calculatedSize > maxSize) {
            this.evict(true);
          }
          this.calculatedSize += this.sizes[index];
        };
      }
      removeItemSize(index) {
      }
      addItemSize(index, size) {
      }
      requireSize(k, v, size, sizeCalculation) {
        if (size || sizeCalculation) {
          throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
        }
      }
      *indexes({ allowStale = this.allowStale } = {}) {
        if (this.size) {
          for (let i = this.tail; true; ) {
            if (!this.isValidIndex(i)) {
              break;
            }
            if (allowStale || !this.isStale(i)) {
              yield i;
            }
            if (i === this.head) {
              break;
            } else {
              i = this.prev[i];
            }
          }
        }
      }
      *rindexes({ allowStale = this.allowStale } = {}) {
        if (this.size) {
          for (let i = this.head; true; ) {
            if (!this.isValidIndex(i)) {
              break;
            }
            if (allowStale || !this.isStale(i)) {
              yield i;
            }
            if (i === this.tail) {
              break;
            } else {
              i = this.next[i];
            }
          }
        }
      }
      isValidIndex(index) {
        return this.keyMap.get(this.keyList[index]) === index;
      }
      *entries() {
        for (const i of this.indexes()) {
          yield [this.keyList[i], this.valList[i]];
        }
      }
      *rentries() {
        for (const i of this.rindexes()) {
          yield [this.keyList[i], this.valList[i]];
        }
      }
      *keys() {
        for (const i of this.indexes()) {
          yield this.keyList[i];
        }
      }
      *rkeys() {
        for (const i of this.rindexes()) {
          yield this.keyList[i];
        }
      }
      *values() {
        for (const i of this.indexes()) {
          yield this.valList[i];
        }
      }
      *rvalues() {
        for (const i of this.rindexes()) {
          yield this.valList[i];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      find(fn, getOptions = {}) {
        for (const i of this.indexes()) {
          if (fn(this.valList[i], this.keyList[i], this)) {
            return this.get(this.keyList[i], getOptions);
          }
        }
      }
      forEach(fn, thisp = this) {
        for (const i of this.indexes()) {
          fn.call(thisp, this.valList[i], this.keyList[i], this);
        }
      }
      rforEach(fn, thisp = this) {
        for (const i of this.rindexes()) {
          fn.call(thisp, this.valList[i], this.keyList[i], this);
        }
      }
      get prune() {
        deprecatedMethod("prune", "purgeStale");
        return this.purgeStale;
      }
      purgeStale() {
        let deleted = false;
        for (const i of this.rindexes({ allowStale: true })) {
          if (this.isStale(i)) {
            this.delete(this.keyList[i]);
            deleted = true;
          }
        }
        return deleted;
      }
      dump() {
        const arr = [];
        for (const i of this.indexes({ allowStale: true })) {
          const key2 = this.keyList[i];
          const v = this.valList[i];
          const value = this.isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          const entry = { value };
          if (this.ttls) {
            entry.ttl = this.ttls[i];
            const age = perf.now() - this.starts[i];
            entry.start = Math.floor(Date.now() - age);
          }
          if (this.sizes) {
            entry.size = this.sizes[i];
          }
          arr.unshift([key2, entry]);
        }
        return arr;
      }
      load(arr) {
        this.clear();
        for (const [key2, entry] of arr) {
          if (entry.start) {
            const age = Date.now() - entry.start;
            entry.start = perf.now() - age;
          }
          this.set(key2, entry.value, entry);
        }
      }
      dispose(v, k, reason) {
      }
      set(k, v, {
        ttl = this.ttl,
        start,
        noDisposeOnSet = this.noDisposeOnSet,
        size = 0,
        sizeCalculation = this.sizeCalculation,
        noUpdateTTL = this.noUpdateTTL
      } = {}) {
        size = this.requireSize(k, v, size, sizeCalculation);
        if (this.maxEntrySize && size > this.maxEntrySize) {
          return this;
        }
        let index = this.size === 0 ? void 0 : this.keyMap.get(k);
        if (index === void 0) {
          index = this.newIndex();
          this.keyList[index] = k;
          this.valList[index] = v;
          this.keyMap.set(k, index);
          this.next[this.tail] = index;
          this.prev[index] = this.tail;
          this.tail = index;
          this.size++;
          this.addItemSize(index, size);
          noUpdateTTL = false;
        } else {
          const oldVal = this.valList[index];
          if (v !== oldVal) {
            if (this.isBackgroundFetch(oldVal)) {
              oldVal.__abortController.abort();
            } else {
              if (!noDisposeOnSet) {
                this.dispose(oldVal, k, "set");
                if (this.disposeAfter) {
                  this.disposed.push([oldVal, k, "set"]);
                }
              }
            }
            this.removeItemSize(index);
            this.valList[index] = v;
            this.addItemSize(index, size);
          }
          this.moveToTail(index);
        }
        if (ttl !== 0 && this.ttl === 0 && !this.ttls) {
          this.initializeTTLTracking();
        }
        if (!noUpdateTTL) {
          this.setItemTTL(index, ttl, start);
        }
        if (this.disposeAfter) {
          while (this.disposed.length) {
            this.disposeAfter(...this.disposed.shift());
          }
        }
        return this;
      }
      newIndex() {
        if (this.size === 0) {
          return this.tail;
        }
        if (this.size === this.max && this.max !== 0) {
          return this.evict(false);
        }
        if (this.free.length !== 0) {
          return this.free.pop();
        }
        return this.initialFill++;
      }
      pop() {
        if (this.size) {
          const val = this.valList[this.head];
          this.evict(true);
          return val;
        }
      }
      evict(free) {
        const head = this.head;
        const k = this.keyList[head];
        const v = this.valList[head];
        if (this.isBackgroundFetch(v)) {
          v.__abortController.abort();
        } else {
          this.dispose(v, k, "evict");
          if (this.disposeAfter) {
            this.disposed.push([v, k, "evict"]);
          }
        }
        this.removeItemSize(head);
        if (free) {
          this.keyList[head] = null;
          this.valList[head] = null;
          this.free.push(head);
        }
        this.head = this.next[head];
        this.keyMap.delete(k);
        this.size--;
        return head;
      }
      has(k, { updateAgeOnHas = this.updateAgeOnHas } = {}) {
        const index = this.keyMap.get(k);
        if (index !== void 0) {
          if (!this.isStale(index)) {
            if (updateAgeOnHas) {
              this.updateItemAge(index);
            }
            return true;
          }
        }
        return false;
      }
      peek(k, { allowStale = this.allowStale } = {}) {
        const index = this.keyMap.get(k);
        if (index !== void 0 && (allowStale || !this.isStale(index))) {
          const v = this.valList[index];
          return this.isBackgroundFetch(v) ? v.__staleWhileFetching : v;
        }
      }
      backgroundFetch(k, index, options, context) {
        const v = index === void 0 ? void 0 : this.valList[index];
        if (this.isBackgroundFetch(v)) {
          return v;
        }
        const ac = new AC();
        const fetchOpts = {
          signal: ac.signal,
          options,
          context
        };
        const cb = (v2) => {
          if (!ac.signal.aborted) {
            this.set(k, v2, fetchOpts.options);
          }
          return v2;
        };
        const eb = (er) => {
          if (this.valList[index] === p) {
            const del = !options.noDeleteOnFetchRejection || p.__staleWhileFetching === void 0;
            if (del) {
              this.delete(k);
            } else {
              this.valList[index] = p.__staleWhileFetching;
            }
          }
          if (p.__returned === p) {
            throw er;
          }
        };
        const pcall = (res) => res(this.fetchMethod(k, v, fetchOpts));
        const p = new Promise(pcall).then(cb, eb);
        p.__abortController = ac;
        p.__staleWhileFetching = v;
        p.__returned = null;
        if (index === void 0) {
          this.set(k, p, fetchOpts.options);
          index = this.keyMap.get(k);
        } else {
          this.valList[index] = p;
        }
        return p;
      }
      isBackgroundFetch(p) {
        return p && typeof p === "object" && typeof p.then === "function" && Object.prototype.hasOwnProperty.call(p, "__staleWhileFetching") && Object.prototype.hasOwnProperty.call(p, "__returned") && (p.__returned === p || p.__returned === null);
      }
      async fetch(k, {
        allowStale = this.allowStale,
        updateAgeOnGet = this.updateAgeOnGet,
        noDeleteOnStaleGet = this.noDeleteOnStaleGet,
        ttl = this.ttl,
        noDisposeOnSet = this.noDisposeOnSet,
        size = 0,
        sizeCalculation = this.sizeCalculation,
        noUpdateTTL = this.noUpdateTTL,
        noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
        fetchContext = this.fetchContext,
        forceRefresh = false
      } = {}) {
        if (!this.fetchMethod) {
          return this.get(k, {
            allowStale,
            updateAgeOnGet,
            noDeleteOnStaleGet
          });
        }
        const options = {
          allowStale,
          updateAgeOnGet,
          noDeleteOnStaleGet,
          ttl,
          noDisposeOnSet,
          size,
          sizeCalculation,
          noUpdateTTL,
          noDeleteOnFetchRejection
        };
        let index = this.keyMap.get(k);
        if (index === void 0) {
          const p = this.backgroundFetch(k, index, options, fetchContext);
          return p.__returned = p;
        } else {
          const v = this.valList[index];
          if (this.isBackgroundFetch(v)) {
            return allowStale && v.__staleWhileFetching !== void 0 ? v.__staleWhileFetching : v.__returned = v;
          }
          if (!forceRefresh && !this.isStale(index)) {
            this.moveToTail(index);
            if (updateAgeOnGet) {
              this.updateItemAge(index);
            }
            return v;
          }
          const p = this.backgroundFetch(k, index, options, fetchContext);
          return allowStale && p.__staleWhileFetching !== void 0 ? p.__staleWhileFetching : p.__returned = p;
        }
      }
      get(k, {
        allowStale = this.allowStale,
        updateAgeOnGet = this.updateAgeOnGet,
        noDeleteOnStaleGet = this.noDeleteOnStaleGet
      } = {}) {
        const index = this.keyMap.get(k);
        if (index !== void 0) {
          const value = this.valList[index];
          const fetching = this.isBackgroundFetch(value);
          if (this.isStale(index)) {
            if (!fetching) {
              if (!noDeleteOnStaleGet) {
                this.delete(k);
              }
              return allowStale ? value : void 0;
            } else {
              return allowStale ? value.__staleWhileFetching : void 0;
            }
          } else {
            if (fetching) {
              return void 0;
            }
            this.moveToTail(index);
            if (updateAgeOnGet) {
              this.updateItemAge(index);
            }
            return value;
          }
        }
      }
      connect(p, n) {
        this.prev[n] = p;
        this.next[p] = n;
      }
      moveToTail(index) {
        if (index !== this.tail) {
          if (index === this.head) {
            this.head = this.next[index];
          } else {
            this.connect(this.prev[index], this.next[index]);
          }
          this.connect(this.tail, index);
          this.tail = index;
        }
      }
      get del() {
        deprecatedMethod("del", "delete");
        return this.delete;
      }
      delete(k) {
        let deleted = false;
        if (this.size !== 0) {
          const index = this.keyMap.get(k);
          if (index !== void 0) {
            deleted = true;
            if (this.size === 1) {
              this.clear();
            } else {
              this.removeItemSize(index);
              const v = this.valList[index];
              if (this.isBackgroundFetch(v)) {
                v.__abortController.abort();
              } else {
                this.dispose(v, k, "delete");
                if (this.disposeAfter) {
                  this.disposed.push([v, k, "delete"]);
                }
              }
              this.keyMap.delete(k);
              this.keyList[index] = null;
              this.valList[index] = null;
              if (index === this.tail) {
                this.tail = this.prev[index];
              } else if (index === this.head) {
                this.head = this.next[index];
              } else {
                this.next[this.prev[index]] = this.next[index];
                this.prev[this.next[index]] = this.prev[index];
              }
              this.size--;
              this.free.push(index);
            }
          }
        }
        if (this.disposed) {
          while (this.disposed.length) {
            this.disposeAfter(...this.disposed.shift());
          }
        }
        return deleted;
      }
      clear() {
        for (const index of this.rindexes({ allowStale: true })) {
          const v = this.valList[index];
          if (this.isBackgroundFetch(v)) {
            v.__abortController.abort();
          } else {
            const k = this.keyList[index];
            this.dispose(v, k, "delete");
            if (this.disposeAfter) {
              this.disposed.push([v, k, "delete"]);
            }
          }
        }
        this.keyMap.clear();
        this.valList.fill(null);
        this.keyList.fill(null);
        if (this.ttls) {
          this.ttls.fill(0);
          this.starts.fill(0);
        }
        if (this.sizes) {
          this.sizes.fill(0);
        }
        this.head = 0;
        this.tail = 0;
        this.initialFill = 1;
        this.free.length = 0;
        this.calculatedSize = 0;
        this.size = 0;
        if (this.disposed) {
          while (this.disposed.length) {
            this.disposeAfter(...this.disposed.shift());
          }
        }
      }
      get reset() {
        deprecatedMethod("reset", "clear");
        return this.clear;
      }
      get length() {
        deprecatedProperty("length", "size");
        return this.size;
      }
      static get AbortController() {
        return AC;
      }
      static get AbortSignal() {
        return AS;
      }
    };
    module2.exports = LRUCache;
  }
});

// node_modules/lodash.clonedeep/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.clonedeep/index.js"(exports, module2) {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reFlags = /\w*$/;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    function addMapEntry(map, pair) {
      map.set(pair[0], pair[1]);
      return map;
    }
    function addSetEntry(set, value) {
      set.add(value);
      return set;
    }
    function arrayEach(array, iteratee) {
      var index = -1, length = array ? array.length : 0;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1, length = array ? array.length : 0;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function getValue(object, key2) {
      return object == null ? void 0 : object[key2];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key2) {
        result[++index] = [key2, value];
      });
      return result;
    }
    function overArg(func, transform2) {
      return function(arg) {
        return func(transform2(arg));
      };
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    var objectCreate = Object.create;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var nativeKeys = overArg(Object.keys, Object);
    var DataView2 = getNative(root, "DataView");
    var Map2 = getNative(root, "Map");
    var Promise2 = getNative(root, "Promise");
    var Set2 = getNative(root, "Set");
    var WeakMap2 = getNative(root, "WeakMap");
    var nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView2);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key2) {
      return this.has(key2) && delete this.__data__[key2];
    }
    function hashGet(key2) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key2];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key2) ? data[key2] : void 0;
    }
    function hashHas(key2) {
      var data = this.__data__;
      return nativeCreate ? data[key2] !== void 0 : hasOwnProperty.call(data, key2);
    }
    function hashSet(key2, value) {
      var data = this.__data__;
      data[key2] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key2) {
      var data = this.__data__, index = assocIndexOf(data, key2);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key2) {
      var data = this.__data__, index = assocIndexOf(data, key2);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key2) {
      return assocIndexOf(this.__data__, key2) > -1;
    }
    function listCacheSet(key2, value) {
      var data = this.__data__, index = assocIndexOf(data, key2);
      if (index < 0) {
        data.push([key2, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key2) {
      return getMapData(this, key2)["delete"](key2);
    }
    function mapCacheGet(key2) {
      return getMapData(this, key2).get(key2);
    }
    function mapCacheHas(key2) {
      return getMapData(this, key2).has(key2);
    }
    function mapCacheSet(key2, value) {
      getMapData(this, key2).set(key2, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    function stackClear() {
      this.__data__ = new ListCache();
    }
    function stackDelete(key2) {
      return this.__data__["delete"](key2);
    }
    function stackGet(key2) {
      return this.__data__.get(key2);
    }
    function stackHas(key2) {
      return this.__data__.has(key2);
    }
    function stackSet(key2, value) {
      var cache = this.__data__;
      if (cache instanceof ListCache) {
        var pairs = cache.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key2, value]);
          return this;
        }
        cache = this.__data__ = new MapCache(pairs);
      }
      cache.set(key2, value);
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key2 in value) {
        if ((inherited || hasOwnProperty.call(value, key2)) && !(skipIndexes && (key2 == "length" || isIndex(key2, length)))) {
          result.push(key2);
        }
      }
      return result;
    }
    function assignValue(object, key2, value) {
      var objValue = object[key2];
      if (!(hasOwnProperty.call(object, key2) && eq(objValue, value)) || value === void 0 && !(key2 in object)) {
        object[key2] = value;
      }
    }
    function assocIndexOf(array, key2) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key2)) {
          return length;
        }
      }
      return -1;
    }
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }
    function baseClone(value, isDeep, isFull, customizer, key2, object, stack) {
      var result;
      if (customizer) {
        result = object ? customizer(value, key2, object, stack) : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || isFunc && !object) {
          if (isHostObject(value)) {
            return object ? value : {};
          }
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (!isArr) {
        var props = isFull ? getAllKeys(value) : keys(value);
      }
      arrayEach(props || value, function(subValue, key3) {
        if (props) {
          key3 = subValue;
          subValue = value[key3];
        }
        assignValue(result, key3, baseClone(subValue, isDeep, isFull, customizer, key3, value, stack));
      });
      return result;
    }
    function baseCreate(proto) {
      return isObject(proto) ? objectCreate(proto) : {};
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function baseGetTag(value) {
      return objectToString.call(value);
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key2 in Object(object)) {
        if (hasOwnProperty.call(object, key2) && key2 != "constructor") {
          result.push(key2);
        }
      }
      return result;
    }
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var result = new buffer.constructor(buffer.length);
      buffer.copy(result);
      return result;
    }
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
      return result;
    }
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    function cloneMap(map, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
      return arrayReduce(array, addMapEntry, new map.constructor());
    }
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    function cloneSet(set, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
      return arrayReduce(array, addSetEntry, new set.constructor());
    }
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    function copyArray(source, array) {
      var index = -1, length = source.length;
      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }
    function copyObject(source, props, object, customizer) {
      object || (object = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key2 = props[index];
        var newValue = customizer ? customizer(object[key2], source[key2], key2, object, source) : void 0;
        assignValue(object, key2, newValue === void 0 ? source[key2] : newValue);
      }
      return object;
    }
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    function getMapData(map, key2) {
      var data = map.__data__;
      return isKeyable(key2) ? data[typeof key2 == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key2) {
      var value = getValue(object, key2);
      return baseIsNative(value) ? value : void 0;
    }
    var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
    var getTag = baseGetTag;
    if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function initCloneArray(array) {
      var length = array.length, result = array.constructor(length);
      if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }
    function initCloneObject(object) {
      return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    function initCloneByTag(object, tag, cloneFunc, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
          return new Ctor(+object);
        case dataViewTag:
          return cloneDataView(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object, isDeep);
        case mapTag:
          return cloneMap(object, isDeep, cloneFunc);
        case numberTag:
        case stringTag:
          return new Ctor(object);
        case regexpTag:
          return cloneRegExp(object);
        case setTag:
          return cloneSet(object, isDeep, cloneFunc);
        case symbolTag:
          return cloneSymbol(object);
      }
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function cloneDeep2(value) {
      return baseClone(value, true, true);
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    module2.exports = cloneDeep2;
  }
});

// src/runtime/Cache.ts
function isCacheEnabled() {
  return process.env[EDGIO_ENV_VARIABLES.cache] === "true";
}
function convertToCachedResponse(response, ttl, serveStaleUntil) {
  return {
    cachedAt: Date.now(),
    ttl,
    statusCode: response.statusCode,
    statusMessage: response.statusMessage,
    headers: JSON.parse(JSON.stringify(response.getHeaders())),
    chunks: response.encodedChunks,
    serveStaleUntil,
    someObject: { key: "value" }
  };
}
var import_lru_cache, import_lodash, Cache;
var init_Cache = __esm({
  "src/runtime/Cache.ts"() {
    "use strict";
    import_lru_cache = __toESM(require_lru_cache());
    import_lodash = __toESM(require_lodash());
    init_constants();
    Cache = class {
      constructor() {
        this.cache = new import_lru_cache.default({
          ttl: 1,
          allowStale: true,
          ttlAutopurge: false,
          max: 1e5
        });
        this.revalidationCache = new import_lru_cache.default({
          ttl: 500,
          allowStale: false,
          ttlAutopurge: false,
          max: 1e4
        });
      }
      clear() {
        this.cache.clear();
      }
      get(key2) {
        const keyValue = key2.toString();
        const response = this.cache.get(keyValue, { allowStale: true, noDeleteOnStaleGet: true });
        const remainingTtl = this.cache.getRemainingTTL(keyValue);
        const stale = remainingTtl <= 0;
        if (!response) {
          return void 0;
        }
        const now = Date.now();
        const { serveStaleUntil } = response;
        if (stale && (serveStaleUntil == null || serveStaleUntil < now)) {
          return void 0;
        }
        return {
          response: (0, import_lodash.default)(response),
          revalidate: stale
        };
      }
      put(cacheKey, response, { ttl, staleWhileRevalidate }) {
        let serveStaleUntil = void 0;
        if (staleWhileRevalidate) {
          serveStaleUntil = new Date().getTime() + ttl * 1e3 + staleWhileRevalidate * 1e3;
        }
        const cached = convertToCachedResponse(response, ttl, serveStaleUntil);
        this.cache.set(cacheKey.toString(), cached, {
          ttl: ttl * 1e3
        });
      }
      isRevalidating(cacheKey) {
        return !!this.revalidationCache.get(cacheKey.toString());
      }
      setRevalidating(cacheKey, value) {
        this.revalidationCache.set(cacheKey.toString(), value);
      }
      dump() {
        return this.cache.dump();
      }
    };
  }
});

// src/runtime/PropertyContext.ts
var PropertyContext;
var init_PropertyContext = __esm({
  "src/runtime/PropertyContext.ts"() {
    "use strict";
    PropertyContext = class {
      constructor(property) {
        this.accountID = process.env.ACCOUNT_ID || "development";
        this.property = property;
        this.origins = this.property.origins ?? [];
        this.originsByName = this.createOriginMap();
        this.defaultOrigins = this.createDefaultOriginMap();
      }
      getOrigin(name) {
        return this.originsByName[name];
      }
      getDefaultOrigin(request) {
        let hostname = request.getHeader("host").toLowerCase();
        const defaultOrigin = this.defaultOrigins[hostname];
        const origins = this.origins;
        if (defaultOrigin && defaultOrigin.name) {
          return defaultOrigin.name;
        }
        return origins[0].name;
      }
      createOriginMap() {
        const originGroups = {};
        const origins = this.origins;
        for (const origin of origins) {
          originGroups[origin.name] = origin;
        }
        return originGroups;
      }
      createDefaultOriginMap() {
        const defaultOriginMap = {};
        const { hostnames } = this.property;
        if (hostnames) {
          for (const hostname of hostnames) {
            if (hostname.default_origin_name) {
              const origin = this.originsByName[hostname.default_origin_name];
              if (origin) {
                defaultOriginMap[hostname.hostname] = origin;
              } else {
                throw new Error(`No origin with id="${hostname.default_origin_name}" was found.`);
              }
            }
          }
        }
        return defaultOriginMap;
      }
    };
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse5;
    exports.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var pairSplitRegExp = /; */;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse5(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var pairs = str.split(pairSplitRegExp);
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var eq_idx = pair.indexOf("=");
        if (eq_idx < 0) {
          continue;
        }
        var key2 = pair.substr(0, eq_idx).trim();
        var val = pair.substr(++eq_idx, pair.length).trim();
        if ('"' == val[0]) {
          val = val.slice(1, -1);
        }
        if (void 0 == obj[key2]) {
          obj[key2] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// src/runtime/CacheKey.ts
var CacheKey;
var init_CacheKey = __esm({
  "src/runtime/CacheKey.ts"() {
    "use strict";
    CacheKey = class {
      constructor(request) {
        var _a2;
        const { host } = request.headers;
        this.method = (_a2 = request.method) == null ? void 0 : _a2.toLowerCase();
        this.query = this.excludeEdgioQueryParams(request.query || {});
        this.pathname = new URL(request.url, `http://${host}`).pathname;
      }
      resetQueryParams(request) {
        this.query = this.excludeEdgioQueryParams(request.query);
      }
      excludeEdgioQueryParams(query) {
        const result = {};
        for (let name in query) {
          if (!name.startsWith("edgio_")) {
            result[name] = query[name];
          }
        }
        return result;
      }
      toSortedArray(source) {
        return Object.keys(source).sort().map((key2) => [key2, source[key2]]);
      }
      toString() {
        return JSON.stringify({
          pathname: this.pathname,
          method: this.method,
          query: this.toSortedArray(this.query)
        });
      }
    };
  }
});

// src/utils/first.ts
function first(value) {
  if (Array.isArray(value)) {
    return value[0];
  } else {
    return value;
  }
}
var init_first = __esm({
  "src/utils/first.ts"() {
    "use strict";
  }
});

// src/runtime/Phase.ts
var Phase, Phase_default;
var init_Phase = __esm({
  "src/runtime/Phase.ts"() {
    "use strict";
    Phase = /* @__PURE__ */ ((Phase2) => {
      Phase2[Phase2["UriRaw"] = 0] = "UriRaw";
      Phase2[Phase2["UriClean"] = 1] = "UriClean";
      Phase2[Phase2["HandleDocRoot"] = 2] = "HandleDocRoot";
      Phase2[Phase2["SendRequestContent"] = 3] = "SendRequestContent";
      Phase2[Phase2["HandleResponseHeader"] = 4] = "HandleResponseHeader";
      Phase2[Phase2["HandleResponseDone"] = 5] = "HandleResponseDone";
      Phase2[Phase2["StreamResponse"] = 6] = "StreamResponse";
      return Phase2;
    })(Phase || {});
    Phase_default = Phase;
  }
});

// src/runtime/mods/Mod.ts
var Mod;
var init_Mod = __esm({
  "src/runtime/mods/Mod.ts"() {
    "use strict";
    Mod = class {
      constructor(context) {
        this.context = context;
      }
    };
  }
});

// src/runtime/url.ts
function parseURL(url2) {
  const [rest, query] = url2.split("?");
  const splitByProtocol = rest.split("://");
  const protocol = splitByProtocol.length >= 2 ? `${splitByProtocol.shift()}://` : "";
  const path3 = splitByProtocol.pop() || "";
  const sanitizedURL = `${protocol}${path3.replace(/(\/\/+)/gm, "/")}${query ? `?${query}` : ""}`;
  const parsed = new URL(sanitizedURL, "http://host");
  return {
    url: sanitizedURL,
    path: parsed.pathname,
    query: (0, import_qs4.parse)(parsed.search.replace("?", ""))
  };
}
function setURL(req, url2) {
  Object.assign(req, parseURL(url2));
}
var import_qs4;
var init_url = __esm({
  "src/runtime/url.ts"() {
    "use strict";
    import_qs4 = __toESM(require_lib2());
  }
});

// src/utils/decodeUnreservedURIChars.ts
function decodeUnreservedURIChars(input) {
  const symbols = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~"];
  const symbolsEncoded = [
    "%61",
    "%62",
    "%63",
    "%64",
    "%65",
    "%66",
    "%67",
    "%68",
    "%69",
    "%6A",
    "%6B",
    "%6C",
    "%6D",
    "%6E",
    "%6F",
    "%70",
    "%71",
    "%72",
    "%73",
    "%74",
    "%75",
    "%76",
    "%77",
    "%78",
    "%79",
    "%7A",
    "%41",
    "%42",
    "%43",
    "%44",
    "%45",
    "%46",
    "%47",
    "%48",
    "%49",
    "%4A",
    "%4B",
    "%4C",
    "%4D",
    "%4E",
    "%4F",
    "%50",
    "%51",
    "%52",
    "%53",
    "%54",
    "%55",
    "%56",
    "%57",
    "%58",
    "%59",
    "%5A",
    "%30",
    "%31",
    "%32",
    "%33",
    "%34",
    "%35",
    "%36",
    "%37",
    "%38",
    "%39",
    "%2D",
    "%2E",
    "%5F",
    "%7E"
  ];
  return symbolsEncoded.reduce((output, symbolEncoded, index) => output.replace(symbolEncoded, symbols[index]), input);
}
var init_decodeUnreservedURIChars = __esm({
  "src/utils/decodeUnreservedURIChars.ts"() {
    "use strict";
  }
});

// src/runtime/evaluators/EvaluatorGroup.ts
var EvaluatorGroup;
var init_EvaluatorGroup = __esm({
  "src/runtime/evaluators/EvaluatorGroup.ts"() {
    "use strict";
    EvaluatorGroup = class {
      constructor(evaluators = [], matcher = /(.*)/) {
        this.evaluators = [...evaluators];
        this.matcher = matcher;
      }
      execute(input, values) {
        if (!this.matcher.test(input))
          return void 0;
        for (const evaluator of this.evaluators) {
          const result = evaluator.execute(input, values);
          if (typeof result === "string")
            return result;
        }
        return void 0;
      }
      add(evaluator) {
        this.evaluators.push(evaluator);
      }
    };
  }
});

// src/runtime/evaluators/Evaluator.ts
var Evaluator;
var init_Evaluator = __esm({
  "src/runtime/evaluators/Evaluator.ts"() {
    "use strict";
    Evaluator = class {
      constructor(action, matcher) {
        this.action = action;
        this.matcher = matcher;
      }
      execute(input, values) {
        const result = this.matcher.exec(input);
        if (!result)
          return void 0;
        const [_, valueName, ...others] = result.values();
        return this.action({
          values,
          matched: [valueName.toLowerCase(), ...others]
        });
      }
    };
  }
});

// src/runtime/evaluators/index.ts
var assignOnNullEvaluator, assignOnNotNullEvaluator, removeLeadingEvaluator, removeTrailingEvaluator, substringEvaluator, findReplaceEvaluator, toLowercaseEvaluator, toUppercaseEvaluator, simpleEvaluator;
var init_evaluators = __esm({
  "src/runtime/evaluators/index.ts"() {
    "use strict";
    init_Evaluator();
    init_toEdgeRegex();
    init_regexUtils();
    assignOnNullEvaluator = new Evaluator((params) => {
      const [lowerCaseName, colon, newValue] = params.matched;
      if (lowerCaseName in params.values && (!colon || params.values[lowerCaseName].length > 0))
        return params.values[lowerCaseName];
      params.values[lowerCaseName] = newValue;
      return newValue;
    }, /^([A-Za-z0-9_-]+)(:?)=(.*)$/);
    assignOnNotNullEvaluator = new Evaluator((params) => {
      const [lowerCaseName, colon, newValue] = params.matched;
      if (!(lowerCaseName in params.values) || colon && params.values[lowerCaseName].length === 0)
        return "";
      params.values[lowerCaseName] = newValue;
      return newValue;
    }, /^([A-Za-z0-9_-]+)(:?)\+(.*)$/);
    removeLeadingEvaluator = new Evaluator((params) => {
      const [lowerCaseName, pattern] = params.matched;
      if (!(lowerCaseName in params.values))
        return void 0;
      return params.values[lowerCaseName].replace(new RegExp(`^${pattern}`), "");
    }, /^([A-Za-z0-9_-]+)#(.+)$/);
    removeTrailingEvaluator = new Evaluator((params) => {
      const [lowerCaseName, pattern] = params.matched;
      if (!(lowerCaseName in params.values))
        return void 0;
      return params.values[lowerCaseName].replace(new RegExp(`${pattern}$`), "");
    }, /^([A-Za-z0-9_-]+)%(.+)$/);
    substringEvaluator = new Evaluator((params) => {
      const [lowerCaseName, offsetString, lengthString] = params.matched;
      if (!(lowerCaseName in params.values))
        return void 0;
      const valueLength = params.values[lowerCaseName].length;
      const offset = parseInt(offsetString);
      const length = !lengthString ? valueLength : parseInt(lengthString);
      const startIndex = offset < 0 && length >= 0 ? valueLength + offset : offset;
      const endIndex = (startIndex < 0 ? 0 : startIndex) + length;
      return params.values[lowerCaseName].slice(startIndex, endIndex);
    }, /^([A-Za-z0-9_-]+):(-?[0-9]+):(-?[0-9]*)$/);
    findReplaceEvaluator = new Evaluator((params) => {
      const [lowerCaseName, delimiter, searchValue, replaceValue] = params.matched;
      if (!(lowerCaseName in params.values))
        return void 0;
      const patternRegex = fromEdgeRegex(searchValue);
      if (delimiter === "/=")
        return substituteParams(patternRegex, params.values[lowerCaseName], replaceValue);
      return params.values[lowerCaseName].replace(new RegExp(patternRegex.source, `${patternRegex.flags}${delimiter === "//" ? "g" : ""}`), replaceValue);
    }, /^([A-Za-z0-9_-]+)(\/\/?=?)(.+)\/(.*)$/);
    toLowercaseEvaluator = new Evaluator((params) => {
      const [lowerCaseName, delimiter, pattern] = params.matched;
      if (!(lowerCaseName in params.values))
        return void 0;
      const patternRegex = new RegExp(`(${!pattern ? "(.*)" : pattern})`, `i${delimiter === ",," ? "g" : ""}`);
      return params.values[lowerCaseName].replace(patternRegex, (match2) => match2.toLowerCase());
    }, /^([A-Za-z0-9_-]+)(,,?)(.*)$/);
    toUppercaseEvaluator = new Evaluator((params) => {
      const [lowerCaseName, delimiter, pattern] = params.matched;
      if (!(lowerCaseName in params.values))
        return void 0;
      const patternRegex = new RegExp(`(${!pattern ? "(.*)" : pattern})`, `i${delimiter === "^^" ? "g" : ""}`);
      return params.values[lowerCaseName].replace(patternRegex, (match2) => match2.toUpperCase());
    }, /^([A-Za-z0-9_-]+)(\^\^?)(.*)$/);
    simpleEvaluator = new Evaluator((params) => {
      const [lowerCaseName] = params.matched;
      if (lowerCaseName in params.values)
        return params.values[lowerCaseName];
      return /(http|resp|arg|cookie)_[A-Za-z0-9_-]+/g.test(lowerCaseName) ? "" : void 0;
    }, /(.+)/);
  }
});

// src/runtime/interpolate.ts
var import_path4, import_qs5, interpolate, interpolate_default, interpolateObject, defaultInterpolationValues, extractInterpolationValues, extractValuesFromObject;
var init_interpolate = __esm({
  "src/runtime/interpolate.ts"() {
    "use strict";
    init_constants();
    init_decodeUnreservedURIChars();
    import_path4 = __toESM(require("path"));
    import_qs5 = __toESM(require_lib2());
    init_EvaluatorGroup();
    init_evaluators();
    interpolate = (value, context, values = extractInterpolationValues(context)) => {
      const expressionEvaluator = new EvaluatorGroup([
        assignOnNullEvaluator,
        assignOnNotNullEvaluator,
        removeLeadingEvaluator,
        removeTrailingEvaluator,
        substringEvaluator,
        findReplaceEvaluator,
        toLowercaseEvaluator,
        toUppercaseEvaluator,
        simpleEvaluator
      ]);
      const matches = value.matchAll(/%{(.*?)}/g);
      for (const match2 of matches) {
        const [expressionFull, expression] = match2;
        const result = expressionEvaluator.execute(expression, values);
        if (typeof result !== "string")
          continue;
        value = value.replace(expressionFull, result);
      }
      return value;
    };
    interpolate_default = interpolate;
    interpolateObject = (target, context) => {
      const values = extractInterpolationValues(context);
      const newObject = {};
      Object.entries(target).forEach((p) => {
        const [key2, value] = p;
        newObject[key2] = value !== void 0 ? interpolate(value, context, values) : value;
      });
      return newObject;
    };
    defaultInterpolationValues = {
      is_origin_shield: "N/A",
      is_subrequest: "N/A",
      physical_path: "N/A",
      physical_rel_path: "N/A",
      physical_doc_root: "N/A",
      referring_domain: "N/A",
      virt_dst_country: "N/A",
      virt_dst_continent: "N/A",
      virt_dst_asnum: "N/A",
      virt_dst_port: "N/A",
      geo_country: "N/A",
      virt_ssl_protocol: "N/A",
      virt_ssl_cipher: "N/A",
      virt_ssl_client_ciphers: "N/A",
      virt_ssl_client_cipher_codes: "N/A",
      virt_ssl_client_tlsext_ids: "N/A",
      virt_http_version: "N/A",
      wurfl_vcap_is_smartphone: "N/A",
      wurfl_cap_is_tablet: "N/A",
      wurfl_vcap_is_full_desktop: "N/A",
      wurfl_vcap_is_ios: "N/A",
      wurfl_vcap_is_android: "N/A",
      wurfl_vcap_is_robot: "N/A",
      wurfl_cap_mobile_browser: "N/A"
    };
    extractInterpolationValues = (context) => {
      var _a2, _b;
      const { cookies, interpolationValues } = context;
      const request = context.getRequest();
      const response = context.getResponse();
      const host = request.getHeader("host") ?? "";
      const fullUrl = new URL(`${request.protocol}://${host}${request.url}`);
      const values = {
        ...defaultInterpolationValues,
        ...interpolationValues
      };
      values.host = host;
      values.is_args = fullUrl.search !== "" ? "?" : "";
      values.is_amp = fullUrl.search !== "" ? "&" : "";
      values.query_string = fullUrl.search.substring(1);
      values.request_protocol = `HTTP/${request.httpVersion}`;
      values.request_method = request.method.toUpperCase();
      values.request_uri = request.url;
      values.request_header = ((_a2 = request.rawHeaders) == null ? void 0 : _a2.join(", ")) ?? "";
      values.request = `${values["request_method"]} ${values["request_uri"]} ${values["request_protocol"]}`;
      values.path = request.path;
      values.normalized_path = decodeUnreservedURIChars(import_path4.default.normalize(values["path"]));
      values.normalized_query = fullUrl.searchParams.toString();
      values.normalized_uri = `${values.normalized_path}?${values.normalized_query}`;
      values.scheme = request.secure ? "https" : "http";
      values.server_name = host;
      values.server_port = request.port;
      values.server_socket_port = request.port;
      values.status = ((_b = response.statusCode) == null ? void 0 : _b.toString()) ?? "";
      values.http_status = values.status;
      values.cache_status = response.getHeader(HTTP_HEADERS.xEdgeCachingStatus) ?? "";
      values.virt_dst_addr = (request.getHeader("x-forwarded-for") || request.socket.remoteAddress) ?? "";
      const undecodedQuery = import_qs5.default.parse(fullUrl.search, {
        ignoreQueryPrefix: true,
        decoder: (value, defaultEncoder, charset, type) => type === "key" ? value.toLowerCase() : value
      });
      extractValuesFromObject("http_", request.getHeaders() ?? {}, values);
      extractValuesFromObject("resp_", response.getHeaders() ?? {}, values);
      extractValuesFromObject("arg_", undecodedQuery ?? {}, values);
      extractValuesFromObject("cookie_", cookies ?? {}, values);
      return values;
    };
    extractValuesFromObject = (prefix, srcObj, destObj) => {
      Object.keys(srcObj).forEach((srcKey) => {
        const destKey = `${prefix}${srcKey}`.toLowerCase();
        const srcValues = !Array.isArray(srcObj[srcKey]) ? [srcObj[srcKey]] : srcObj[srcKey];
        const destValues = destObj[destKey] ? [[destObj[destKey]]] : [];
        destObj[destKey] = [...destValues, ...srcValues].join(", ");
      });
    };
  }
});

// src/runtime/mods/ModRewrite.ts
var ModRewrite;
var init_ModRewrite = __esm({
  "src/runtime/mods/ModRewrite.ts"() {
    "use strict";
    init_Mod();
    init_Phase();
    init_url();
    init_interpolate();
    init_path();
    init_log();
    ModRewrite = class extends Mod {
      async execute(phase) {
        if (phase === Phase_default.UriRaw) {
          this.context.forLastMatchingRule((rule) => this.applyFeatures(rule, phase));
        }
      }
      applyFeatures(features, _phase) {
        var _a2;
        if ((_a2 = features.url) == null ? void 0 : _a2.url_rewrite) {
          const request = this.context.getRequest();
          for (let { source, destination, syntax } of features.url.url_rewrite) {
            if (!destination) {
              throw new Error("url.url_rewrite.destination is required but was not provided.");
            }
            log_default.debug(`Rewriting ${source} to ${destination} using ${syntax}`);
            const updatedURL = mapURL(request.url, source, interpolate_default(destination, this.context), syntax);
            log_default.debug(`Rewritten URL: ${updatedURL}`);
            if (!updatedURL)
              continue;
            setURL(request, updatedURL);
          }
          return true;
        }
        return false;
      }
      toString() {
        return "ModRewrite";
      }
    };
  }
});

// node_modules/cache-control-parser/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/cache-control-parser/dist/index.js"(exports, module2) {
    !function(e, t) {
      "object" == typeof exports && "object" == typeof module2 ? module2.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.cacheControl = t() : e.cacheControl = t();
    }(exports, function() {
      return function(e) {
        var t = {};
        function r(n) {
          if (t[n])
            return t[n].exports;
          var o = t[n] = { i: n, l: false, exports: {} };
          return e[n].call(o.exports, o, o.exports, r), o.l = true, o.exports;
        }
        return r.m = e, r.c = t, r.d = function(e2, t2, n) {
          r.o(e2, t2) || Object.defineProperty(e2, t2, { enumerable: true, get: n });
        }, r.r = function(e2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        }, r.t = function(e2, t2) {
          if (1 & t2 && (e2 = r(e2)), 8 & t2)
            return e2;
          if (4 & t2 && "object" == typeof e2 && e2 && e2.__esModule)
            return e2;
          var n = /* @__PURE__ */ Object.create(null);
          if (r.r(n), Object.defineProperty(n, "default", { enumerable: true, value: e2 }), 2 & t2 && "string" != typeof e2)
            for (var o in e2)
              r.d(n, o, function(t3) {
                return e2[t3];
              }.bind(null, o));
          return n;
        }, r.n = function(e2) {
          var t2 = e2 && e2.__esModule ? function() {
            return e2.default;
          } : function() {
            return e2;
          };
          return r.d(t2, "a", t2), t2;
        }, r.o = function(e2, t2) {
          return Object.prototype.hasOwnProperty.call(e2, t2);
        }, r.p = "", r(r.s = 1);
      }([function(e, t) {
      }, function(e, t, r) {
        "use strict";
        function n(e2) {
          return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
            return typeof e3;
          } : function(e3) {
            return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
          })(e2);
        }
        function o(e2, t2) {
          return function(e3) {
            if (Array.isArray(e3))
              return e3;
          }(e2) || function(e3, t3) {
            if (!(Symbol.iterator in Object(e3) || "[object Arguments]" === Object.prototype.toString.call(e3)))
              return;
            var r2 = [], n2 = true, o2 = false, a2 = void 0;
            try {
              for (var i2, u2 = e3[Symbol.iterator](); !(n2 = (i2 = u2.next()).done) && (r2.push(i2.value), !t3 || r2.length !== t3); n2 = true)
                ;
            } catch (e4) {
              o2 = true, a2 = e4;
            } finally {
              try {
                n2 || null == u2.return || u2.return();
              } finally {
                if (o2)
                  throw a2;
              }
            }
            return r2;
          }(e2, t2) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }();
        }
        r.r(t);
        var a = ["max-age", "s-maxage", "stale-while-revalidate", "stale-if-error", "public", "private", "no-store", "no-cache", "must-revalidate", "proxy-revalidate", "immutable", "no-transform"], i = function(e2) {
          var t2 = {}, r2 = e2.toLowerCase().split(",").map(function(e3) {
            return e3.trim().split("=").map(function(e4) {
              return e4.trim();
            });
          }), n2 = true, a2 = false, i2 = void 0;
          try {
            for (var u2, c2 = r2[Symbol.iterator](); !(n2 = (u2 = c2.next()).done); n2 = true) {
              var l = o(u2.value, 2), f = l[0], s = l[1];
              switch (f) {
                case "max-age":
                  var p = parseInt(s, 10);
                  if (isNaN(p))
                    continue;
                  t2["max-age"] = p;
                  break;
                case "s-maxage":
                  var b = parseInt(s, 10);
                  if (isNaN(b))
                    continue;
                  t2["s-maxage"] = b;
                  break;
                case "stale-while-revalidate":
                  var y = parseInt(s, 10);
                  if (isNaN(y))
                    continue;
                  t2["stale-while-revalidate"] = y;
                  break;
                case "stale-if-error":
                  var m = parseInt(s, 10);
                  if (isNaN(m))
                    continue;
                  t2["stale-if-error"] = m;
                  break;
                case "public":
                  t2.public = true;
                  break;
                case "private":
                  t2.private = true;
                  break;
                case "no-store":
                  t2["no-store"] = true;
                  break;
                case "no-cache":
                  t2["no-cache"] = true;
                  break;
                case "must-revalidate":
                  t2["must-revalidate"] = true;
                  break;
                case "proxy-revalidate":
                  t2["proxy-revalidate"] = true;
                  break;
                case "immutable":
                  t2.immutable = true;
                  break;
                case "no-transform":
                  t2["no-transform"] = true;
              }
            }
          } catch (e3) {
            a2 = true, i2 = e3;
          } finally {
            try {
              n2 || null == c2.return || c2.return();
            } finally {
              if (a2)
                throw i2;
            }
          }
          return t2;
        }, u = function(e2) {
          for (var t2 = [], r2 = 0, i2 = Object.entries(e2); r2 < i2.length; r2++) {
            var u2 = o(i2[r2], 2), c2 = u2[0], l = u2[1];
            if (a.includes(c2))
              switch (n(l)) {
                case "boolean":
                  t2.push("".concat(c2));
                  break;
                case "number":
                  t2.push("".concat(c2, "=").concat(l));
              }
          }
          return t2.join(", ");
        }, c = r(0);
        r.d(t, "parse", function() {
          return i;
        }), r.d(t, "stringify", function() {
          return u;
        }), r.d(t, "CacheControl", function() {
          return c.CacheControl;
        });
      }]);
    });
  }
});

// src/router/converters/toSeconds.ts
var convertSailfishTimeIntervalToSeconds, toSeconds;
var init_toSeconds = __esm({
  "src/router/converters/toSeconds.ts"() {
    "use strict";
    convertSailfishTimeIntervalToSeconds = (timeInterval) => {
      const regex = /^([0-9]+)(s|m|h|d|w|y)$/g;
      const res = regex.exec(timeInterval);
      if (res == null)
        throw new Error(`Unsupported time interval "${timeInterval}".`);
      const value = parseInt(res[1]);
      const timeUnit = res[2];
      switch (timeUnit) {
        case "s":
          return value;
        case "m":
          return value * 60;
        case "h":
          return value * 60 * 60;
        case "d":
          return value * 60 * 60 * 24;
        case "w":
          return value * 60 * 60 * 24 * 7;
        case "y":
          return value * 60 * 60 * 24 * 365;
        default:
          throw new Error(`Unsupported time unit "${timeUnit}".`);
      }
    };
    toSeconds = (maxAge, code) => {
      if (typeof maxAge === "string") {
        return convertSailfishTimeIntervalToSeconds(maxAge);
      } else {
        return convertSailfishTimeIntervalToSeconds(maxAge[code]);
      }
    };
  }
});

// src/router/converters/toTimeUnitAbbrev.ts
var toTimeUnitAbbrev;
var init_toTimeUnitAbbrev = __esm({
  "src/router/converters/toTimeUnitAbbrev.ts"() {
    "use strict";
    toTimeUnitAbbrev = (seconds) => {
      const hours = 60 * 60;
      const days = hours * 24;
      const months = days * 30.437;
      const years = months * 12;
      if (seconds >= years) {
        return Math.floor(seconds / years) + "y";
      } else if (seconds >= months) {
        return Math.floor(seconds / months) + "m";
      } else if (seconds >= days) {
        return Math.floor(seconds / days) + "d";
      } else if (seconds >= hours) {
        return Math.floor(seconds / hours) + "h";
      }
      return seconds + "s";
    };
  }
});

// src/runtime/mods/ModCache.ts
var import_cache_control_parser, ModCache;
var init_ModCache = __esm({
  "src/runtime/mods/ModCache.ts"() {
    "use strict";
    init_Mod();
    init_Phase();
    init_toRegExp();
    init_log();
    init_interpolate();
    init_constants();
    import_cache_control_parser = __toESM(require_dist3());
    init_toSeconds();
    init_toTimeUnitAbbrev();
    init_log();
    ModCache = class extends Mod {
      constructor() {
        super(...arguments);
        this.cachingFeatures = { caching: {} };
      }
      async execute(phase) {
        if (Phase_default.UriClean === phase) {
          this.context.forEachMatchingRule((rule) => this.applyCacheReadFeatures(rule));
        } else if (Phase_default.HandleDocRoot === phase) {
          this.readCachedResponse();
        }
        if (Phase_default.HandleResponseHeader === phase || this.context.useCacheFile && Phase_default.HandleDocRoot === phase) {
          this.context.forEachMatchingRule((rule) => this.applyCacheWriteFeatures(rule));
          this.ensureAge();
          this.applyResponseCachingHeaders();
          this.context.forEachMatchingRule((rule) => {
            this.applyDebugHeaderFeatures(rule);
            this.applyExternalMaxAge(rule);
          });
          this.maybeApplyAdditionalCachingHeaders();
        } else if (Phase_default.HandleResponseDone === phase) {
          this.maybeWriteCachedResponse();
        }
      }
      readCachedResponse() {
        const response = this.context.getResponse();
        if (!this.context.cache) {
          return;
        }
        if (this.context.bypassCache || this.context.bypassCacheByHonor) {
          log_default.info(() => `[pass] ${this.context.summarize()}`);
          this.setCachingStatus(CACHING_STATUS.bypassed);
        } else {
          log_default.trace(`[ModCache] cache key: ${this.context.cacheKey}`);
          const result = this.context.cache.get(this.context.cacheKey);
          if (result) {
            response.statusCode = result.response.statusCode;
            response.statusMessage = result.response.statusMessage;
            response.chunks = result.response.chunks;
            for (let name in result.response.headers) {
              const value = result.response.headers[name];
              response.setHeader(name, value);
            }
            this.setCachingStatus(CACHING_STATUS.hit);
            let age = parseInt(response.getHeader("age") || "0");
            const timeSinceCached = Math.floor((Date.now() - result.response.cachedAt) / 1e3);
            response.setHeader("age", (age + timeSinceCached).toString());
            const contentLength = response.chunks.reduce((value, chunk) => value + (chunk == null ? void 0 : chunk.byteLength), 0);
            if (!Number.isNaN(contentLength)) {
              response.setHeader(HTTP_HEADERS.contentLength, contentLength);
              response.removeHeader(HTTP_HEADERS.transferEncoding);
            }
            this.context.useCacheFile = true;
            this.context.bypassCache = true;
            if (result.revalidate && !this.context.cache.isRevalidating(this.context.cacheKey)) {
              this.context.cache.setRevalidating(this.context.cacheKey, true);
              this.context.revalidate = true;
            } else {
              this.context.revalidate = false;
            }
            if (result.revalidate) {
              log_default.info(() => `[stale]  ${this.context.summarize()}`);
            } else {
              log_default.info(() => `[hit]  ${this.context.summarize()}`);
            }
          } else {
            log_default.info(() => `[miss] ${this.context.summarize()}`);
          }
        }
      }
      applyExternalMaxAge(features) {
        var _a2, _b, _c;
        if ((_a2 = features.caching) == null ? void 0 : _a2.client_max_age) {
          const response = this.context.getResponse();
          const setHeaders = (headerName, treatment, setHeader) => {
            switch (treatment) {
              case "pass":
                break;
              case "if_missing":
                !response.getHeader(headerName) && setHeader();
                break;
              case "remove":
                response.removeHeader(headerName);
                break;
              default:
                setHeader();
            }
          };
          const maxAgeSeconds = toSeconds(features.caching.client_max_age);
          setHeaders(HTTP_HEADERS.cacheControl, (_b = features.caching) == null ? void 0 : _b.cache_control_header_treatment, () => this.context.setResponseHeader({
            [HTTP_HEADERS.cacheControl]: `max-age=${maxAgeSeconds}`
          }));
          setHeaders(HTTP_HEADERS.expires, (_c = features.caching) == null ? void 0 : _c.expires_header_treatment, () => {
            var _a3;
            const cacheState = ((_a3 = this.context.cache) == null ? void 0 : _a3.get(this.context.cacheKey)) ?? {
              response: { cachedAt: Date.now() }
            };
            this.context.setResponseHeader({
              [HTTP_HEADERS.expires]: new Date(cacheState.response.cachedAt + maxAgeSeconds * 1e3).toUTCString()
            });
          });
        }
      }
      applyCacheReadFeatures(features) {
        const { caching } = features;
        const request = this.context.getRequest();
        if (!caching) {
          return;
        }
        if (caching.bypass_cache) {
          this.context.bypassCache = true;
        }
        const reqCacheControl = {
          ...(0, import_cache_control_parser.parse)(request.getHeader("pragma") || ""),
          ...(0, import_cache_control_parser.parse)(request.getHeader("cache-control") || "")
        };
        if (reqCacheControl["no-cache"] && caching.honor_no_cache_request_header) {
          this.context.bypassCacheByHonor = true;
        }
        if (caching.cache_key_rewrite) {
          const { source, destination } = caching.cache_key_rewrite;
          const newDestination = destination ? interpolate_default(destination, this.context) : destination;
          if (source && destination) {
            this.context.cacheKey.pathname = this.context.cacheKey.pathname.replace(toRegExp(source), newDestination);
          } else if (destination) {
            this.context.cacheKey.pathname = newDestination;
          }
        }
        if (caching.cache_key_query_string) {
          const { include, include_all_except, exclude_all, include_all } = caching.cache_key_query_string;
          if (include_all_except) {
            for (let param of include_all_except) {
              delete this.context.cacheKey.query[param];
            }
          }
          if (include) {
            const params = new Set(include);
            for (let param in this.context.cacheKey.query) {
              if (!params.has(param)) {
                delete this.context.cacheKey.query[param];
              }
            }
          }
          if (exclude_all) {
            this.context.cacheKey.query = {};
          }
          if (include_all) {
            this.context.cacheKey.resetQueryParams(this.context.getRequest());
          }
        }
      }
      applyCacheWriteFeatures(features) {
        if (features.caching) {
          const { caching } = this.cachingFeatures;
          Object.assign(caching, features.caching);
        }
      }
      applyResponseCachingHeaders() {
        const request = this.context.getRequest();
        const response = this.context.getResponse();
        const { caching } = this.cachingFeatures;
        if (!caching || !this.context.cache) {
          return;
        }
        if (this.context.bypassCache) {
          return;
        }
        const getMaxAgeFromExpires = () => {
          const expires = response.getHeader("expires");
          if (expires) {
            return Math.round((new Date(expires).getTime() - new Date().getTime()) / 1e3);
          }
          return 0;
        };
        const resCacheControl = {
          ...(0, import_cache_control_parser.parse)(response.getHeader("pragma") || ""),
          ...(0, import_cache_control_parser.parse)(response.getHeader("cache-control") || "")
        };
        const staleWhileRevalidate = this.getStaleWhileRevalidate(resCacheControl);
        staleWhileRevalidate && this.context.cache.setRevalidating(this.context.cacheKey, false);
        const noStore = resCacheControl["no-store"];
        const noCache = resCacheControl["no-cache"];
        const method = request.method.toUpperCase();
        const {
          enable_caching_for_methods = [],
          cacheable_status_codes = [],
          ignore_origin_no_cache
        } = caching;
        if ((resCacheControl.private || noStore || noCache) && !ignore_origin_no_cache) {
          return this.setCachingStatus(CACHING_STATUS.private);
        }
        if (method !== "GET" && !enable_caching_for_methods.includes(method)) {
          return this.setCachingStatus(CACHING_STATUS.method);
        }
        if (response.statusCode !== 200 && !cacheable_status_codes.includes(response.statusCode ?? 0)) {
          return this.setCachingStatus(CACHING_STATUS.code);
        }
        const ttl = caching.max_age ? toSeconds(caching.max_age, response.statusCode) : resCacheControl["s-maxage"] ?? resCacheControl["max-age"] ?? getMaxAgeFromExpires();
        if (ttl === 0) {
          return this.setCachingStatus(CACHING_STATUS.noMaxAge);
        }
        this.setCachingStatus(CACHING_STATUS.cached);
        this.context.cacheConfig = {
          ttl,
          staleWhileRevalidate
        };
      }
      maybeWriteCachedResponse() {
        const response = this.context.getResponse();
        if (!response.isCachable()) {
          return log_default.warn("Response payload is too large - caching skipped.");
        }
        this.context.cacheConfig && response.isCachable() && this.context.cache.put(this.context.cacheKey, response, this.context.cacheConfig);
      }
      maybeApplyAdditionalCachingHeaders() {
        const { caching } = this.cachingFeatures;
        if (caching == null ? void 0 : caching.bypass_client_cache) {
          this.context.getResponse().setHeader(HTTP_HEADERS.cacheControl, "private, no-cache, no-store, must-revalidate");
        }
        if (caching == null ? void 0 : caching.service_worker_max_age) {
          const maxAgeSeconds = toSeconds(caching == null ? void 0 : caching.service_worker_max_age);
          this.context.getResponse().setHeader(HTTP_HEADERS.xSwCacheControl, `max-age=${maxAgeSeconds}`);
        }
      }
      applyDebugHeaderFeatures(features) {
        var _a2, _b, _c;
        if ((_a2 = features.headers) == null ? void 0 : _a2.debug_header) {
          const request = this.context.getRequest();
          const response = this.context.getResponse();
          const debugHeader = request.headers[HTTP_HEADERS.xEcDebug];
          if (typeof debugHeader === "string") {
            const debugChecks = debugHeader.replace(/ /g, "").split(",").reduce((prev, cur) => {
              prev[cur] = true;
              return prev;
            }, {});
            const cachingStatus = response.getHeader(HTTP_HEADERS.xEdgeCachingStatus);
            if (debugChecks[CACHING_DEBUG_HEADERS.cache]) {
              let statusCode = CACHING_DEBUG_STATUS.uncacheable;
              if (cachingStatus == CACHING_STATUS.hit)
                statusCode = CACHING_DEBUG_STATUS.tcpHit;
              if (cachingStatus == CACHING_STATUS.cached && !this.context.bypassCacheByHonor)
                statusCode = CACHING_DEBUG_STATUS.tcpMiss;
              if (cachingStatus == CACHING_STATUS.cached && this.context.bypassCacheByHonor)
                statusCode = CACHING_DEBUG_STATUS.tcpClientRefreshMiss;
              response.setHeader(CACHING_DEBUG_HEADERS.cache, `${statusCode} from SIMULATOR`);
            }
            if (debugChecks[CACHING_DEBUG_HEADERS.cacheKey]) {
              response.setHeader(CACHING_DEBUG_HEADERS.cacheKey, this.context.cacheKey.toString());
            }
            if (debugChecks[CACHING_DEBUG_HEADERS.cacheState]) {
              const cacheState = ((_b = this.context.cache) == null ? void 0 : _b.get(this.context.cacheKey)) ?? {
                response: { cachedAt: Date.now(), ttl: ((_c = this.context.cacheConfig) == null ? void 0 : _c.ttl) ?? 0 }
              };
              const cacheAge = Math.floor((Date.now() - cacheState.response.cachedAt) / 1e3);
              const remainingTtl = Math.floor(cacheState.response.ttl - cacheAge);
              let outputState = `max-age=${cacheState.response.ttl} (${toTimeUnitAbbrev(cacheState.response.ttl)}); `;
              outputState += `cache-ts=${cacheState.response.cachedAt} (${new Date(cacheState.response.cachedAt).toUTCString()}); `;
              outputState += `cache-age=${cacheAge} (${toTimeUnitAbbrev(cacheAge)}); `;
              outputState += `remaining-ttl=${remainingTtl} (${toTimeUnitAbbrev(remainingTtl)}); `;
              outputState += `expires-delta=none;`;
              response.setHeader(CACHING_DEBUG_HEADERS.cacheState, outputState);
            }
            if (debugChecks[CACHING_DEBUG_HEADERS.checkCacheable]) {
              response.setHeader(CACHING_DEBUG_HEADERS.checkCacheable, !features.caching || cachingStatus === CACHING_STATUS.noMaxAge ? CACHING_DEBUG_CACHEABLE.no : CACHING_DEBUG_CACHEABLE.yes);
            }
          }
        }
      }
      getStaleWhileRevalidate(cacheControl) {
        const { caching } = this.cachingFeatures;
        if (caching) {
          if (caching.stale_while_revalidate) {
            return toSeconds(caching.stale_while_revalidate);
          } else if (cacheControl["stale-while-revalidate"]) {
            return cacheControl["stale-while-revalidate"];
          }
        }
      }
      setCachingStatus(status) {
        this.context.getResponse().setHeader(HTTP_HEADERS.xEdgeCachingStatus, status);
      }
      ensureAge() {
        const response = this.context.getResponse();
        response.getHeader("age") || response.setHeader("age", "0");
      }
      toString() {
        return "ModCache";
      }
    };
  }
});

// src/runtime/EarlyReturn.ts
var EarlyReturn;
var init_EarlyReturn = __esm({
  "src/runtime/EarlyReturn.ts"() {
    "use strict";
    EarlyReturn = class {
      constructor(reason) {
        this.reason = reason;
      }
    };
  }
});

// src/runtime/mods/ModAccess.ts
var import_http2, ModAccess;
var init_ModAccess = __esm({
  "src/runtime/mods/ModAccess.ts"() {
    "use strict";
    init_Mod();
    init_EarlyReturn();
    import_http2 = require("http");
    ModAccess = class extends Mod {
      async execute(phase) {
        this.context.forEachMatchingRule((rule) => this.applyFeatures(rule, phase));
      }
      applyFeatures(features, _phase) {
        var _a2;
        if ((_a2 = features.access) == null ? void 0 : _a2.deny_access) {
          const response = this.context.getResponse();
          response.statusCode = 403;
          response.statusMessage = import_http2.STATUS_CODES[403];
          throw new EarlyReturn("deny_access");
        }
      }
      toString() {
        return "ModAccess";
      }
    };
  }
});

// src/runtime/mods/ModSetEnv.ts
var ModSetEnv;
var init_ModSetEnv = __esm({
  "src/runtime/mods/ModSetEnv.ts"() {
    "use strict";
    init_Mod();
    init_Phase();
    init_EarlyReturn();
    ModSetEnv = class extends Mod {
      async execute(phase) {
        if (Phase_default.UriClean === phase || Phase_default.SendRequestContent === phase || Phase_default.HandleResponseDone === phase || Phase_default.HandleResponseHeader === phase) {
          this.context.forEachMatchingRule((rule) => this.applyUpstreamFeatures(rule, phase));
          this.context.forEachMatchingRule((rule) => this.applyFeatures(rule, phase));
        }
      }
      applyUpstreamFeatures(features, _phase) {
        var _a2, _b;
        const response = this.context.getResponse();
        if (_phase === Phase_default.HandleResponseHeader) {
          (_b = (_a2 = features.headers) == null ? void 0 : _a2.remove_origin_response_headers) == null ? void 0 : _b.forEach((header) => response.removeHeader(header));
        }
      }
      applyFeatures(features, _phase) {
        var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
        const response = this.context.getResponse();
        if (_phase === Phase_default.UriClean) {
          ((_a2 = features.headers) == null ? void 0 : _a2.set_request_headers) && this.context.setRequestHeader(features.headers.set_request_headers);
        }
        if (_phase === Phase_default.HandleResponseHeader || _phase === Phase_default.HandleResponseDone && this.context.followRedirects || ((_b = features.response) == null ? void 0 : _b.set_done) || this.context.useCacheFile) {
          ((_c = features.headers) == null ? void 0 : _c.set_response_headers) && this.context.setResponseHeader(features.headers.set_response_headers);
          ((_d = features.headers) == null ? void 0 : _d.add_response_headers) && this.context.setResponseHeader((_e = features.headers) == null ? void 0 : _e.add_response_headers, true);
          (_g = (_f = features.headers) == null ? void 0 : _f.remove_response_headers) == null ? void 0 : _g.forEach((header) => response.removeHeader(header));
          if ((_h = features.response) == null ? void 0 : _h.set_status_code)
            response.statusCode = features.response.set_status_code;
        }
        if (_phase === Phase_default.SendRequestContent || ((_i = features.response) == null ? void 0 : _i.set_done)) {
          if ((_j = features.response) == null ? void 0 : _j.set_response_body) {
            response.clear();
            response.write(features.response.set_response_body);
            response.end();
          }
        }
        if (features.set_variables) {
          Object.entries(features.set_variables).forEach(([name, value]) => {
            this.context.variables[name] = value;
          });
        }
        if (((_k = features.response) == null ? void 0 : _k.set_done) && _phase !== Phase_default.HandleResponseHeader) {
          throw new EarlyReturn("set_done on response is set to true");
        }
      }
      toString() {
        return "ModSetEnv";
      }
    };
  }
});

// src/runtime/mods/ModProxyCore.ts
var ModProxyCore;
var init_ModProxyCore = __esm({
  "src/runtime/mods/ModProxyCore.ts"() {
    "use strict";
    init_Mod();
    init_Phase();
    init_OriginFetcher();
    init_origins();
    init_log();
    ModProxyCore = class extends Mod {
      async execute(phase) {
        if (Phase_default.SendRequestContent === phase) {
          await this.handleSendRequestContent();
        }
      }
      async handleSendRequestContent() {
        const request = this.context.getRequest();
        const response = this.context.getResponse();
        const originName = this.getOriginName();
        try {
          if (this.context.useCacheFile) {
            log_default.trace(`[ModProxyCore] using cached response`);
            return;
          } else if (originName === SERVERLESS_ORIGIN_NAME && await this.context.executeServerless()) {
            log_default.trace(`[ModProxyCore] using response from serverless function`);
            return;
          } else {
            log_default.trace(`[ModProxyCore] fetching response from origin: ${originName}`);
            const originConfig = this.context.propertyContext.getOrigin(originName);
            if (!originConfig) {
              throw new Error(`No origin was found with id=${originName}.`);
            }
            await new OriginFetcher(this.context.propertyContext).fetch(request, response, {
              ignoreUnsatisfiableRanges: this.context.ignoreUnsatisfiableRanges
            }, originName);
          }
        } finally {
          this.context.originResponseStatus = response.statusCode;
        }
      }
      getOriginName() {
        let originName = this.context.propertyContext.getDefaultOrigin(this.context.getRequest());
        this.context.forEachMatchingRule((rule) => {
          var _a2;
          if ((_a2 = rule == null ? void 0 : rule.origin) == null ? void 0 : _a2.set_origin)
            originName = rule.origin.set_origin;
        });
        return originName;
      }
      toString() {
        return "ModProxyCore";
      }
    };
  }
});

// src/runtime/mods/ModProxyFeatures.ts
var ModProxyFeatures;
var init_ModProxyFeatures = __esm({
  "src/runtime/mods/ModProxyFeatures.ts"() {
    "use strict";
    init_Mod();
    ModProxyFeatures = class extends Mod {
      async execute(phase) {
        this.context.forEachMatchingRule((rule) => this.applyFeatures(rule, phase));
      }
      applyFeatures(features, _phase) {
        var _a2;
        this.context.ignoreUnsatisfiableRanges = ((_a2 = features == null ? void 0 : features.caching) == null ? void 0 : _a2.ignore_unsatisfiable_ranges) ?? this.context.ignoreUnsatisfiableRanges;
      }
      toString() {
        return "ModProxyFeatures";
      }
    };
  }
});

// src/runtime/mods/ModRedirect.ts
var ModRedirect;
var init_ModRedirect = __esm({
  "src/runtime/mods/ModRedirect.ts"() {
    "use strict";
    init_Mod();
    init_Phase();
    init_EarlyReturn();
    init_interpolate();
    init_path();
    ModRedirect = class extends Mod {
      async execute(phase) {
        this.context.forEachMatchingRule((rule) => this.applyFeatures(rule, phase));
      }
      applyFeatures(features, phase) {
        var _a2;
        const request = this.context.getRequest();
        const response = this.context.getResponse();
        const requestUrl = request.url;
        if (((_a2 = features.url) == null ? void 0 : _a2.follow_redirects) !== void 0) {
          this.context.followRedirects = features.url.follow_redirects;
        }
        if (phase === Phase_default.UriClean) {
          if (!features.url || !features.url.url_redirect) {
            return;
          }
          const { url_redirect } = features.url;
          const { code, source, destination, syntax } = url_redirect;
          if (!destination) {
            throw new Error("url.url_redirect.destination is required but was not provided.");
          }
          const location = mapURL(requestUrl, source, interpolate_default(destination, this.context), syntax);
          if (!location)
            return;
          response.statusCode = code || 302;
          response.setHeader("location", location);
          response.end();
          throw new EarlyReturn("redirect");
        }
      }
      toString() {
        return "ModRedirect";
      }
    };
  }
});

// src/runtime/mods/ModEdgeFunctions.ts
var ModEdgeFunctions;
var init_ModEdgeFunctions = __esm({
  "src/runtime/mods/ModEdgeFunctions.ts"() {
    "use strict";
    init_Mod();
    ModEdgeFunctions = class extends Mod {
      async execute(phase) {
      }
      toString() {
        return "ModEdgeFunctions-Disabled";
      }
    };
  }
});

// node_modules/content-type/index.js
var require_content_type = __commonJS({
  "node_modules/content-type/index.js"(exports) {
    "use strict";
    var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g;
    var TEXT_REGEXP = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/;
    var TOKEN_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
    var QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g;
    var QUOTE_REGEXP = /([\\"])/g;
    var TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
    exports.format = format;
    exports.parse = parse5;
    function format(obj) {
      if (!obj || typeof obj !== "object") {
        throw new TypeError("argument obj is required");
      }
      var parameters = obj.parameters;
      var type = obj.type;
      if (!type || !TYPE_REGEXP.test(type)) {
        throw new TypeError("invalid type");
      }
      var string = type;
      if (parameters && typeof parameters === "object") {
        var param;
        var params = Object.keys(parameters).sort();
        for (var i = 0; i < params.length; i++) {
          param = params[i];
          if (!TOKEN_REGEXP.test(param)) {
            throw new TypeError("invalid parameter name");
          }
          string += "; " + param + "=" + qstring(parameters[param]);
        }
      }
      return string;
    }
    function parse5(string) {
      if (!string) {
        throw new TypeError("argument string is required");
      }
      var header = typeof string === "object" ? getcontenttype(string) : string;
      if (typeof header !== "string") {
        throw new TypeError("argument string is required to be a string");
      }
      var index = header.indexOf(";");
      var type = index !== -1 ? header.substr(0, index).trim() : header.trim();
      if (!TYPE_REGEXP.test(type)) {
        throw new TypeError("invalid media type");
      }
      var obj = new ContentType(type.toLowerCase());
      if (index !== -1) {
        var key2;
        var match2;
        var value;
        PARAM_REGEXP.lastIndex = index;
        while (match2 = PARAM_REGEXP.exec(header)) {
          if (match2.index !== index) {
            throw new TypeError("invalid parameter format");
          }
          index += match2[0].length;
          key2 = match2[1].toLowerCase();
          value = match2[2];
          if (value[0] === '"') {
            value = value.substr(1, value.length - 2).replace(QESC_REGEXP, "$1");
          }
          obj.parameters[key2] = value;
        }
        if (index !== header.length) {
          throw new TypeError("invalid parameter format");
        }
      }
      return obj;
    }
    function getcontenttype(obj) {
      var header;
      if (typeof obj.getHeader === "function") {
        header = obj.getHeader("content-type");
      } else if (typeof obj.headers === "object") {
        header = obj.headers && obj.headers["content-type"];
      }
      if (typeof header !== "string") {
        throw new TypeError("content-type header is missing from object");
      }
      return header;
    }
    function qstring(val) {
      var str = String(val);
      if (TOKEN_REGEXP.test(str)) {
        return str;
      }
      if (str.length > 0 && !TEXT_REGEXP.test(str)) {
        throw new TypeError("invalid parameter value");
      }
      return '"' + str.replace(QUOTE_REGEXP, "\\$1") + '"';
    }
    function ContentType(type) {
      this.parameters = /* @__PURE__ */ Object.create(null);
      this.type = type;
    }
  }
});

// src/runtime/mods/ModTranscode.ts
var import_zlib2, import_content_type, COMPRESSIBLE_TYPES, ModTranscode;
var init_ModTranscode = __esm({
  "src/runtime/mods/ModTranscode.ts"() {
    "use strict";
    init_Mod();
    init_Phase();
    init_constants();
    import_zlib2 = __toESM(require("zlib"));
    import_content_type = __toESM(require_content_type());
    COMPRESSIBLE_TYPES = /* @__PURE__ */ new Set([
      "application/atom_xml",
      "application/javascript",
      "application/json",
      "application/rss+xml",
      "application/vnd.ms-fontobject",
      "application/x-font-opentype",
      "application/x-font-ttf",
      "application/x-javascript",
      "application/xhtml+xml",
      "application/xml",
      "application/xml+rss",
      "font/eot",
      "font/opentype",
      "font/otf",
      "image/svg+xml",
      "image/x-icon",
      "text/css",
      "text/html",
      "text/javascript",
      "text/js",
      "text/plain"
    ]);
    ModTranscode = class extends Mod {
      async execute(phase) {
        if (!this.isEncodable())
          return;
        if (this.context.useCacheFile && phase === Phase_default.HandleDocRoot || phase === Phase_default.StreamResponse || phase === Phase_default.HandleResponseHeader) {
          const request = this.context.getRequest();
          const response = this.context.getResponse();
          const contentEncoding = response.getHeader(HTTP_HEADERS.contentEncoding);
          const acceptEncoding = request.getHeader(HTTP_HEADERS.acceptEncoding);
          const BROTLI_ENCODING_REGEX = /\bbr\b/;
          const GZIP_ENCODING_REGEX = /\bgzip\b/;
          const DEFLATE_ENCODING_REGEX = /\deflate\b/;
          const downstreamIsGzipCompatible = GZIP_ENCODING_REGEX.test(acceptEncoding);
          const downstreamIsBrotliCompatible = BROTLI_ENCODING_REGEX.test(acceptEncoding);
          const downstreamIsDeflateCompatible = DEFLATE_ENCODING_REGEX.test(acceptEncoding);
          if (downstreamIsGzipCompatible && contentEncoding === GZIP_ENCODING) {
            return;
          }
          if (downstreamIsBrotliCompatible && contentEncoding === BROTLI_ENCODING) {
            return;
          }
          if (downstreamIsDeflateCompatible && contentEncoding === DEFLATE_ENCODING) {
            return;
          }
          response.removeHeader(HTTP_HEADERS.contentLength);
          response.setHeader(HTTP_HEADERS.transferEncoding, "chunked");
          const chunkSize = void 0;
          switch (contentEncoding) {
            case GZIP_ENCODING:
              response.setDecoder(import_zlib2.default.createGunzip({ chunkSize }));
              break;
            case BROTLI_ENCODING:
              response.setDecoder(import_zlib2.default.createBrotliDecompress({
                chunkSize
              }));
              break;
            case DEFLATE_ENCODING:
              response.setDecoder(import_zlib2.default.createInflate({ chunkSize }));
              break;
          }
          let contentType = response.getHeader(HTTP_HEADERS.contentType);
          if (Array.isArray(contentType)) {
            contentType = contentType[0];
          }
          const parsedContentType = contentType && (0, import_content_type.parse)(contentType).type.toLowerCase();
          if (this.context.executingSimulator || parsedContentType && COMPRESSIBLE_TYPES.has(parsedContentType)) {
            switch (acceptEncoding) {
              case GZIP_ENCODING:
                response.setEncoder(import_zlib2.default.createGzip({ chunkSize }));
                response.setHeader(HTTP_HEADERS.contentEncoding, GZIP_ENCODING);
                break;
              case BROTLI_ENCODING:
                response.setEncoder(import_zlib2.default.createBrotliCompress({
                  chunkSize,
                  params: {
                    [import_zlib2.default.constants.BROTLI_PARAM_QUALITY]: 5
                  }
                }));
                response.setHeader(HTTP_HEADERS.contentEncoding, BROTLI_ENCODING);
                break;
              case DEFLATE_ENCODING:
                response.setEncoder(import_zlib2.default.createDeflate({ chunkSize }));
                response.setHeader(HTTP_HEADERS.contentEncoding, DEFLATE_ENCODING);
            }
          } else {
            response.removeHeader(HTTP_HEADERS.contentEncoding);
          }
          response.initDownstream();
        }
      }
      isEncodable() {
        const responseCode = this.context.getResponse().statusCode;
        return ![100, 101, 204, 205, 206, 302, 304, 307].find((invalidCode) => invalidCode === responseCode);
      }
      toString() {
        return "ModTranscode";
      }
    };
  }
});

// src/runtime/formatters/RulesVisitor.ts
var RulesVisitor;
var init_RulesVisitor = __esm({
  "src/runtime/formatters/RulesVisitor.ts"() {
    "use strict";
    init_RequestContext();
    RulesVisitor = class {
      constructor(callbacks = {}) {
        this.callbacks = callbacks;
      }
      onRuleVisit(callback) {
        this.callbacks.onRuleVisit = callback;
      }
      onMatchesVisit(callback) {
        this.callbacks.onMatchesVisit = callback;
      }
      onFeaturesVisit(callback) {
        this.callbacks.onFeaturesVisit = callback;
      }
      onConditionalsVisit(callback) {
        this.callbacks.onConditionalsVisit = callback;
      }
      onBooleanVisit(callback) {
        this.callbacks.onBooleanVisit = callback;
      }
      visit(rules) {
        rules.forEach((rule) => this.visitRule(rule));
      }
      visitRule(rule) {
        var _a2, _b;
        if (RulesVisitor.isMatches(rule)) {
          this.visitMatches(rule);
        } else {
          this.visitFeatures(rule);
        }
        (_b = (_a2 = this.callbacks) == null ? void 0 : _a2.onRuleVisit) == null ? void 0 : _b.call(_a2, rule);
      }
      visitMatches(matches) {
        var _a2, _b, _c, _d;
        const condition = (_a2 = matches == null ? void 0 : matches.if) == null ? void 0 : _a2[0];
        const features = (_b = matches == null ? void 0 : matches.if) == null ? void 0 : _b[1];
        if (condition && RulesVisitor.isBoolean(condition)) {
          this.visitBoolean(condition);
        }
        if (condition && RulesVisitor.isConditionals(condition)) {
          this.visitConditionals(condition);
        }
        if (features) {
          this.visitFeatures(features);
        }
        (_d = (_c = this.callbacks) == null ? void 0 : _c.onMatchesVisit) == null ? void 0 : _d.call(_c, matches);
      }
      visitFeatures(features) {
        var _a2, _b;
        (_b = (_a2 = this.callbacks) == null ? void 0 : _a2.onFeaturesVisit) == null ? void 0 : _b.call(_a2, features);
      }
      visitConditionals(conditionals) {
        var _a2, _b;
        (_b = (_a2 = this.callbacks) == null ? void 0 : _a2.onConditionalsVisit) == null ? void 0 : _b.call(_a2, conditionals);
        Object.keys(conditionals).forEach((operator) => {
          const condition = conditionals[operator];
          this.visitCondition(condition, operator);
        });
      }
      visitCondition(condition, operator) {
        var _a2, _b;
        (_b = (_a2 = this.callbacks) == null ? void 0 : _a2.onConditionVisit) == null ? void 0 : _b.call(_a2, condition, operator);
      }
      visitBoolean(boolean) {
        var _a2, _b, _c, _d;
        (_a2 = boolean == null ? void 0 : boolean.and) == null ? void 0 : _a2.forEach((conditionals) => this.visitConditionals(conditionals));
        (_b = boolean == null ? void 0 : boolean.or) == null ? void 0 : _b.forEach((conditionals) => this.visitConditionals(conditionals));
        (_d = (_c = this.callbacks) == null ? void 0 : _c.onBooleanVisit) == null ? void 0 : _d.call(_c, boolean);
      }
      static isMatches(rule) {
        return "if" in rule;
      }
      static isBoolean(condition) {
        return [AND, OR].some((key2) => Object.keys(condition).includes(key2));
      }
      static isConditionals(condition) {
        return [
          EQUALS_EXPRESS,
          EQUALS,
          NOT_EQUALS_EXPRESS,
          NOT_EQUALS,
          MATCHES,
          NOT_MATCHES,
          GREATER_THAN,
          GREATER_THAN_OR_EQUALS,
          LESS_THAN,
          LESS_THAN_OR_EQUALS,
          IN,
          NOT_IN
        ].some((key2) => Object.keys(condition).includes(key2));
      }
    };
  }
});

// src/runtime/mods/ModStream.ts
var ModStream;
var init_ModStream = __esm({
  "src/runtime/mods/ModStream.ts"() {
    "use strict";
    init_Mod();
    init_Phase();
    init_RulesVisitor();
    init_toEdgeRegex();
    ModStream = class extends Mod {
      async execute(phase) {
        if (Phase_default.UriClean === phase) {
          this.applyStreamingConfig();
        }
        if (Phase_default.HandleResponseDone === phase || Phase_default.StreamResponse === phase) {
          await this.stream();
        }
      }
      applyStreamingConfig() {
        const response = this.context.getResponse();
        const statusCodePatterns = this.getCatchStatusCodes();
        response.setIsStreamable(() => {
          let setResponseBodyFeatureFound = false;
          this.context.forEachMatchingRule((features, _phase) => {
            var _a2;
            if ((_a2 = features.response) == null ? void 0 : _a2.set_response_body) {
              return setResponseBodyFeatureFound = true;
            }
          });
          if (setResponseBodyFeatureFound)
            return false;
          if (response.statusCode === 416)
            return false;
          if (response.getHeader("location") && this.context.followRedirects)
            return false;
          if (statusCodePatterns.find((pattern) => pattern.test(response.statusCode.toString())))
            return false;
          return true;
        });
      }
      async stream() {
        if (this.context.followRedirects)
          return;
        const response = this.context.getResponse();
        if (!response.isHeadersStreamed && response.chunks.length > 0) {
          await this.context.executeStreamResponse();
        }
        await response.waitForFlush();
      }
      getCatchStatusCodes() {
        const statusCodePatterns = [];
        new RulesVisitor({
          onConditionVisit: (condition, _operator) => {
            const leftSide = condition == null ? void 0 : condition[0];
            const rightSide = condition == null ? void 0 : condition[1];
            if (leftSide["response"] !== "status_code")
              return;
            statusCodePatterns.push(fromEdgeRegex(rightSide));
          }
        }).visit(this.context.rules);
        return statusCodePatterns;
      }
      toString() {
        return "ModStream";
      }
    };
  }
});

// src/runtime/HandlerFinished.ts
var HandlerFinished;
var init_HandlerFinished = __esm({
  "src/runtime/HandlerFinished.ts"() {
    "use strict";
    HandlerFinished = class {
      constructor(reason) {
        this.reason = reason;
      }
    };
  }
});

// src/runtime/executePlan.ts
async function executePlan(plan) {
  try {
    for (let step of plan) {
      try {
        for (let mod of step.modules) {
          const start = new Date().getTime();
          try {
            await mod.execute(step.phase);
          } finally {
            log_default.trace(`executed ${Phase_default[step.phase]}: ${mod.constructor.name} in ${new Date().getTime() - start}ms`);
          }
        }
      } catch (e) {
        if (!(e instanceof HandlerFinished)) {
          throw e;
        }
      }
    }
  } catch (e) {
    if (!(e instanceof EarlyReturn)) {
      throw e;
    }
  }
}
var init_executePlan = __esm({
  "src/runtime/executePlan.ts"() {
    "use strict";
    init_log();
    init_EarlyReturn();
    init_HandlerFinished();
    init_Phase();
  }
});

// src/runtime/RequestContext.ts
var import_cookie, import_path7, EQUALS_EXPRESS, EQUALS, AND, OR, NOT_EQUALS_EXPRESS, NOT_EQUALS, MATCHES, NOT_MATCHES, GREATER_THAN, GREATER_THAN_OR_EQUALS, LESS_THAN, LESS_THAN_OR_EQUALS, IN, NOT_IN, RequestContext;
var init_RequestContext = __esm({
  "src/runtime/RequestContext.ts"() {
    "use strict";
    import_cookie = __toESM(require_cookie());
    init_toRegExp();
    init_CacheKey();
    init_first();
    init_Phase();
    init_ModRewrite();
    init_ModCache();
    init_ModAccess();
    init_ModSetEnv();
    init_ModProxyCore();
    init_ModProxyFeatures();
    init_ModRedirect();
    init_log();
    init_constants();
    init_origins();
    init_Origin();
    init_ModEdgeFunctions();
    init_interpolate();
    init_LambdaResponse();
    init_toPathRegexp();
    import_path7 = __toESM(require("path"));
    init_ModTranscode();
    init_ModStream();
    init_executePlan();
    EQUALS_EXPRESS = "==";
    EQUALS = "===";
    AND = "and";
    OR = "or";
    NOT_EQUALS_EXPRESS = "!=";
    NOT_EQUALS = "!==";
    MATCHES = "=~";
    NOT_MATCHES = "!~";
    GREATER_THAN = ">";
    GREATER_THAN_OR_EQUALS = ">=";
    LESS_THAN = "<";
    LESS_THAN_OR_EQUALS = "<=";
    IN = "in";
    NOT_IN = "not_in";
    RequestContext = class {
      constructor({
        request,
        response,
        propertyContext,
        rules,
        cache,
        functions,
        interpolationValues,
        variables,
        location,
        device,
        stdout,
        stderr,
        edgeFunctions
      }) {
        this.functions = [];
        this.useCacheFile = false;
        this.bypassCache = false;
        this.bypassCacheByHonor = false;
        this.revalidate = false;
        this.followRedirects = false;
        this.ignoreUnsatisfiableRanges = false;
        this.executingSimulator = false;
        this.originResponseStatus = void 0;
        this.revalidation = null;
        this.revalidateResponse = null;
        this.stdout = process == null ? void 0 : process.stdout;
        this.stderr = process == null ? void 0 : process.stderr;
        this.request = request;
        this.cacheKey = new CacheKey(request);
        this.response = response;
        this.propertyContext = propertyContext;
        this.rules = rules;
        this.edgeFunctions = edgeFunctions;
        this.cookies = (0, import_cookie.parse)(first(request.headers["cookie"] || ""));
        this.variables = variables ?? {};
        this.cache = cache;
        this.originalPath = this.request.path;
        this.originalQuery = this.request.query;
        this.originalQueryString = new URL(request.url, "http://localhost").search;
        this.functions = functions;
        this.interpolationValues = interpolationValues;
        this.stdout = stdout || process.stdout;
        this.stderr = stderr || process.stderr;
        this.device = device ?? {
          device_os: "iOS",
          brand_name: "Apple",
          dual_orientation: "true",
          html_preferred_dtd: "html5",
          image_inlining: "partial",
          is_android: "false",
          is_app: "true",
          is_full_desktop: "false",
          is_html_preferred: "true",
          is_ios: "true",
          is_largescreen: "true",
          is_mobile: "false",
          is_robot: "false",
          is_smartphone: "false",
          is_smarttv: "false",
          is_tablet: "false",
          is_touchscreen: "false",
          is_windows_phone: "false",
          is_wireless_device: "false",
          is_wml_preferred: "false",
          marketing_name: "iPhone",
          mobile_browser: "Safari",
          model_name: "iPhone",
          pointing_method: "touchscreen",
          preferred_markup: "html_wi_w3_xhtmlbasic",
          progressive_download: "true",
          release_date: "2011",
          resolution_height: "1136",
          resolution_width: "640",
          ux_full_desktop: "false",
          xhtml_support_level: "1"
        };
        this.location = location ?? {
          asn: "Telia Eesti",
          city: "Tallinn",
          continent: "Europe",
          dms_code: "",
          country: "EE",
          latitude: "59.433",
          longitude: "24.7323",
          postal_code: "11911",
          region_code: "EU"
        };
        const modRewrite = new ModRewrite(this);
        const modCache = new ModCache(this);
        const modAccess = new ModAccess(this);
        const modSetEnv = new ModSetEnv(this);
        const modProxyCore = new ModProxyCore(this);
        const modProxyFeatures = new ModProxyFeatures(this);
        const modRedirect = new ModRedirect(this);
        const modEdgeFunctions = new ModEdgeFunctions(this);
        const modTranscode = new ModTranscode(this);
        const modStream = new ModStream(this);
        this.revalidatePlan = [
          {
            phase: Phase_default.SendRequestContent,
            modules: [modEdgeFunctions, modProxyCore, modSetEnv]
          },
          {
            phase: Phase_default.HandleResponseDone,
            modules: [modRedirect, modSetEnv, modStream, modCache]
          }
        ];
        this.simulatorPlan = [
          {
            phase: Phase_default.UriRaw,
            modules: [modRewrite]
          },
          {
            phase: Phase_default.UriClean,
            modules: [modAccess, modRedirect, modSetEnv, modCache, modProxyFeatures, modStream]
          },
          {
            phase: Phase_default.HandleDocRoot,
            modules: [modCache, modTranscode]
          },
          ...this.revalidatePlan
        ];
        this.writeHeadPlan = [
          {
            phase: Phase_default.HandleResponseHeader,
            modules: [modSetEnv, modCache, modTranscode]
          }
        ];
        this.streamPlan = [
          {
            phase: Phase_default.StreamResponse,
            modules: [modTranscode, modStream]
          }
        ];
        this.appPlan = [
          {
            phase: Phase_default.StreamResponse,
            modules: [modTranscode]
          }
        ];
      }
      async executeSimulator() {
        this.executingSimulator = true;
        this.response.setOnStream(async () => await this.executeStreamResponse());
        await executePlan(this.simulatorPlan);
        await executePlan(this.streamPlan);
        this.revalidation = new Promise((resolve2) => this.executeRevalidate().then(resolve2));
      }
      async executeServerless() {
        const hintHeader = this.request.getHeader(EDGIO_SERVERLESS_HINT_HEADER);
        if (!hintHeader) {
          log_default.trace("No serverless hints found.");
          return false;
        }
        const hintsWithValue = hintHeader.split(",").reverse();
        const redirectHint = hintsWithValue.find((value) => value.startsWith(EDGIO_SERVERLESS_HINTS.redirect));
        if (redirectHint) {
          log_default.trace("Serverless hint", redirectHint);
          await this.handleHint(redirectHint);
        } else {
          const hintToRun = hintsWithValue[0];
          log_default.trace("Serverless hint", hintToRun);
          await this.handleHint(hintToRun);
        }
        this.response.clear();
        this.response.body && this.response.write(this.response.body);
        this.response.end();
        if (!this.executingSimulator) {
          await executePlan(this.streamPlan);
        }
        return true;
      }
      async handleHint(hintWithValue) {
        const hint = hintWithValue.split(":").shift() || "";
        const value = hintWithValue.split(":").pop() || "";
        if (hint === EDGIO_SERVERLESS_HINTS.app) {
          this.response.setIsStreamable(true);
          await this.executeApp();
          return true;
        }
        if (value !== "") {
          await this.executeCompute(Number(value));
          return true;
        }
        log_default.trace(`Serverless hint with name '${hint}' was not found.`);
        return false;
      }
      async executeApp() {
        log_default.debug(`skipping to app`);
        this.response.setOnStream(async () => await this.executeStreamResponse());
        const appOrigin = this.propertyContext.getOrigin(SERVERLESS_ORIGIN_NAME);
        await new Origin(appOrigin).fetch(this.request, this.response);
      }
      async executeCompute(functionIndex) {
        const fn = this.functions[functionIndex];
        if (!fn) {
          throw new Error(`Serverless function with index ${functionIndex} not found.`);
        }
        log_default.debug(`[RequestContext] skipping to compute, function #${functionIndex}`);
        await fn(this.request, this.response, this.propertyContext);
      }
      async executeRevalidate() {
        if (this.revalidate) {
          this.revalidateResponse = new LambdaResponse();
          this.useCacheFile = false;
          this.bypassCache = false;
          await executePlan(this.revalidatePlan);
          log_default.debug(`Revalidated ${this.originalPath}.`);
        }
      }
      async executeStreamResponse() {
        const response = this.getResponse();
        if (!response.isHeadersStreamed) {
          if (this.executingSimulator) {
            await executePlan(this.writeHeadPlan);
          } else {
            await executePlan(this.appPlan);
          }
        }
        await response.stream();
      }
      forEachMatchingRule(callback) {
        this.rules.forEach((rule, i) => this.callIfMatched(rule, callback, i));
      }
      forLastMatchingRule(callback) {
        let isBreak = false;
        for (let i = this.rules.length - 1; i >= 0; i--) {
          const rule = this.rules[i];
          this.callIfMatched(rule, (features) => {
            if (callback(features)) {
              isBreak = true;
            }
          }, i);
          if (isBreak) {
            break;
          }
        }
      }
      callIfMatched(rule, callback, index) {
        let matches = rule;
        if (matches.if) {
          const conditional = matches.if[0];
          if (this.isTrue(conditional)) {
            this.callIfMatched(matches.if[1], callback, index);
          } else if (matches.if[2]) {
            this.callIfMatched(matches.if[2], callback, index);
          }
        } else {
          callback(rule, index);
        }
      }
      isTrue(conditional) {
        const operators = Object.keys(conditional);
        if (operators.length !== 1) {
          throw new Error(`Conditional statements must contain a single operator. The following operators were found: ${operators.join(", ")}`);
        } else if (conditional[OR]) {
          if (conditional[OR].every((c) => !this.isTrue(c))) {
            return false;
          }
        } else if (conditional[AND]) {
          if (conditional[AND].some((c) => !this.isTrue(c))) {
            return false;
          }
        } else if (conditional[EQUALS_EXPRESS]) {
          const [left, right] = conditional[EQUALS_EXPRESS].map((v) => this.eval(v));
          if (!toPathRegexp(right).test((left == null ? void 0 : left.toString()) ?? "")) {
            return false;
          }
        } else if (conditional[EQUALS]) {
          const [left, right] = conditional[EQUALS].map((v) => this.eval(v));
          if (left != right) {
            return false;
          }
        } else if (conditional[NOT_EQUALS_EXPRESS]) {
          const [left, right] = conditional[NOT_EQUALS_EXPRESS].map((v) => this.eval(v));
          if (toPathRegexp(right).test((left == null ? void 0 : left.toString()) ?? "")) {
            return false;
          }
        } else if (conditional[NOT_EQUALS]) {
          const [left, right] = conditional[NOT_EQUALS].map((v) => this.eval(v));
          if (left === right) {
            return false;
          }
        } else if (conditional[LESS_THAN]) {
          const [left, right] = conditional[LESS_THAN].map((v) => this.eval(v));
          if (!(Number(left) < Number(right))) {
            return false;
          }
        } else if (conditional[LESS_THAN_OR_EQUALS]) {
          const [left, right] = conditional[LESS_THAN_OR_EQUALS].map((v) => this.eval(v));
          if (!(Number(left) <= Number(right))) {
            return false;
          }
        } else if (conditional[GREATER_THAN]) {
          const [left, right] = conditional[GREATER_THAN].map((v) => this.eval(v));
          if (!(Number(left) > Number(right))) {
            return false;
          }
        } else if (conditional[GREATER_THAN_OR_EQUALS]) {
          const [left, right] = conditional[GREATER_THAN_OR_EQUALS].map((v) => this.eval(v));
          if (!(Number(left) >= Number(right))) {
            return false;
          }
        } else if (conditional[MATCHES]) {
          const [left, right] = conditional[MATCHES].map((v) => this.eval(v));
          if (!toRegExp(right).test((left == null ? void 0 : left.toString()) ?? "")) {
            return false;
          }
        } else if (conditional[NOT_MATCHES]) {
          const [left, right] = conditional[NOT_MATCHES].map((v) => this.eval(v));
          if (toRegExp(right).test((left == null ? void 0 : left.toString()) ?? "")) {
            return false;
          }
        } else if (conditional[IN]) {
          const left = this.eval(conditional[IN][0]);
          const right = conditional[IN][1];
          if (!right.some((v) => v === left))
            return false;
        } else if (conditional[NOT_IN]) {
          const left = this.eval(conditional[IN][0]);
          const right = conditional[IN][1];
          if (right.some((v) => v === left))
            return false;
        } else {
          throw new Error(`Unsupported operator "${Object.keys(conditional)[0]}".`);
        }
        return true;
      }
      eval(operand) {
        if (operand == null) {
          return operand;
        } else if (typeof operand === "string") {
          return operand;
        } else if (typeof operand === "boolean") {
          return operand;
        } else if (typeof operand === "number") {
          return operand;
        } else {
          return this.evalVariable(operand);
        }
      }
      evalVariable(variable) {
        if (variable.request) {
          switch (variable.request) {
            case "client_ip":
              return this.request.socket.remoteAddress;
            case "pop_code":
              return process.env.POP_CODE;
            case "method":
              return this.request.method.toUpperCase();
            case "origin_path":
              return this.request.path;
            case "path":
              return this.originalPath;
            case "origin_query_string":
              return this.request.url.split("?")[1];
            case "query":
              return this.originalQueryString;
            case "scheme":
              return this.request.secure ? "https" : "http";
            case "referring_domain": {
              const referrer = this.request.getHeader("referrer");
              if (referrer) {
                const splitReferrer = referrer.split("/");
                if (splitReferrer.length > 2) {
                  return referrer.split("/")[2];
                }
              }
              return "";
            }
            default: {
              throw new Error(`Unsupported request property "${variable.request}".`);
            }
          }
        } else if (variable["request.header"]) {
          const header = variable["request.header"];
          return first(this.request.getHeader(header));
        } else if (variable["request.cookie"]) {
          const cookieName = variable["request.cookie"];
          return this.cookies[cookieName];
        } else if (variable["request.origin_query"]) {
          const param = variable["request.origin_query"];
          return this.request.query && this.request.query[param];
        } else if (variable.variable) {
          return this.variables[variable.variable];
        } else if (variable["request.path"]) {
          const param = variable["request.path"];
          switch (param) {
            case "filename":
              return import_path7.default.basename(this.request.path);
            case "extension":
              return import_path7.default.extname(this.request.path);
            case "directory":
              return import_path7.default.dirname(this.request.path);
          }
        } else if (variable.location) {
          return this.location[variable.location];
        } else if (variable.random) {
          return Math.floor(Math.random() * (variable["random"] + 1));
        } else if (variable.device) {
          return this.device[variable.device];
        } else if (variable.response === "status_code") {
          return this.originResponseStatus;
        } else {
          throw new Error(`Unsupported variable "${Object.keys(variable)[0]}".`);
        }
      }
      getRequest() {
        return this.request;
      }
      getResponse() {
        return this.revalidateResponse ?? this.response;
      }
      setRequestHeader(feature, forceAppend) {
        return this.setHeader(this.getRequest(), feature, forceAppend);
      }
      setResponseHeader(feature, forceAppend) {
        return this.setHeader(this.getResponse(), feature, forceAppend);
      }
      setHeader(target, feature, allowMultiple) {
        var _a2;
        const targetFeature = interpolateObject(feature, this);
        for (let [name, value] of Object.entries(targetFeature)) {
          const evaluatedValue = (_a2 = this.eval(value)) == null ? void 0 : _a2.toString();
          if (evaluatedValue) {
            let outputHeader = evaluatedValue;
            if (name.startsWith("+")) {
              name = name.substring(1);
              const curVal = target.getHeader(name);
              if (curVal) {
                outputHeader = Array.isArray(curVal) ? curVal.map((value2) => value2 + "," + evaluatedValue) : curVal + "," + evaluatedValue;
              }
            } else {
              const curVal = target.getHeader(name);
              if (curVal && allowMultiple) {
                outputHeader = Array.isArray(curVal) ? [...curVal, evaluatedValue] : [curVal, evaluatedValue];
              }
            }
            target.setHeader(name, outputHeader);
          } else {
            target.removeHeader(name);
          }
        }
      }
      summarize() {
        return `${this.request.method.toUpperCase()} ${this.originalPath}${this.originalQueryString || ""}`;
      }
    };
  }
});

// src/runtime/formatters/RulesFormatter.ts
var RulesFormatter;
var init_RulesFormatter = __esm({
  "src/runtime/formatters/RulesFormatter.ts"() {
    "use strict";
    init_RulesVisitor();
    RulesFormatter = class {
      constructor() {
        this.rulesVisitor = new RulesVisitor({
          onFeaturesVisit: (features) => {
            this.formatResponseSetResponseBody(features);
            this.formatCachingMaxAge(features);
          }
        });
      }
      format(rules, clone = true) {
        const changedRules = clone ? JSON.parse(JSON.stringify(rules)) : rules;
        this.rulesVisitor.visit(changedRules);
        return changedRules;
      }
      formatResponseSetResponseBody(features) {
        const { response } = features;
        if (response == null ? void 0 : response.set_response_body) {
          response.set_response_body = Buffer.from(response.set_response_body).toString("base64");
        }
      }
      formatCachingMaxAge(features) {
        const { caching } = features;
        if ((caching == null ? void 0 : caching.max_age) && typeof (caching == null ? void 0 : caching.max_age) === "string") {
          const statusCodes = [200, ...(caching == null ? void 0 : caching.cacheable_status_codes) || []];
          const timeInterval = caching.max_age;
          caching.max_age = {};
          statusCodes.forEach((statusCode) => caching.max_age = {
            ...caching.max_age,
            [statusCode.toString()]: timeInterval
          });
        }
      }
    };
  }
});

// src/runtime/createEdgeConfig.ts
function createEdgeConfig(context, router) {
  return JSON.stringify(createEdgeConfigPropertiesObject(context, router), null, 2);
}
function createEdgeConfigPropertiesObject(context, router) {
  const edgeConfig = {
    name: context.property.name,
    hostnames: context.property.hostnames,
    origins: context.origins,
    rules: router.rules,
    edge_functions: context.property.edge_functions
  };
  const rulesFormatter = new RulesFormatter();
  const rules = rulesFormatter.format(router.rules);
  return {
    ...edgeConfig,
    rules
  };
}
var init_createEdgeConfig = __esm({
  "src/runtime/createEdgeConfig.ts"() {
    "use strict";
    init_RulesFormatter();
  }
});

// src/utils/edgeFunctionUtils.ts
function getEdgeFunctionFeatures(rules) {
  const features = [];
  forEachFeature(rules, (feature) => {
    if (feature.edge_function) {
      features.push(feature);
    }
  });
  return features;
}
function forEachFeature(rules, callback) {
  if (Array.isArray(rules)) {
    for (let item of rules) {
      forEachFeature(item, callback);
    }
  } else if (typeof rules === "object") {
    callback(rules);
    for (const key2 in rules) {
      forEachFeature(rules[key2], callback);
    }
  }
}
function containsEdgeFunctionFeature(rules) {
  return getEdgeFunctionFeatures(rules).length > 0;
}
var init_edgeFunctionUtils = __esm({
  "src/utils/edgeFunctionUtils.ts"() {
    "use strict";
  }
});

// src/deploy/edge-functions/EdgeFunctionsBuilder.ts
var init_EdgeFunctionsBuilder = __esm({
  "src/deploy/edge-functions/EdgeFunctionsBuilder.ts"() {
    "use strict";
    init_edgeFunctionUtils();
  }
});

// node_modules/esbuild/lib/main.js
var require_main = __commonJS({
  "node_modules/esbuild/lib/main.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key2) && key2 !== except)
            __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var node_exports = {};
    __export2(node_exports, {
      analyzeMetafile: () => analyzeMetafile,
      analyzeMetafileSync: () => analyzeMetafileSync,
      build: () => build2,
      buildSync: () => buildSync,
      default: () => node_default,
      formatMessages: () => formatMessages,
      formatMessagesSync: () => formatMessagesSync,
      initialize: () => initialize,
      serve: () => serve,
      transform: () => transform2,
      transformSync: () => transformSync,
      version: () => version2
    });
    module2.exports = __toCommonJS2(node_exports);
    function encodePacket(packet) {
      let visit = (value) => {
        if (value === null) {
          bb.write8(0);
        } else if (typeof value === "boolean") {
          bb.write8(1);
          bb.write8(+value);
        } else if (typeof value === "number") {
          bb.write8(2);
          bb.write32(value | 0);
        } else if (typeof value === "string") {
          bb.write8(3);
          bb.write(encodeUTF8(value));
        } else if (value instanceof Uint8Array) {
          bb.write8(4);
          bb.write(value);
        } else if (value instanceof Array) {
          bb.write8(5);
          bb.write32(value.length);
          for (let item of value) {
            visit(item);
          }
        } else {
          let keys = Object.keys(value);
          bb.write8(6);
          bb.write32(keys.length);
          for (let key2 of keys) {
            bb.write(encodeUTF8(key2));
            visit(value[key2]);
          }
        }
      };
      let bb = new ByteBuffer();
      bb.write32(0);
      bb.write32(packet.id << 1 | +!packet.isRequest);
      visit(packet.value);
      writeUInt32LE(bb.buf, bb.len - 4, 0);
      return bb.buf.subarray(0, bb.len);
    }
    function decodePacket(bytes) {
      let visit = () => {
        switch (bb.read8()) {
          case 0:
            return null;
          case 1:
            return !!bb.read8();
          case 2:
            return bb.read32();
          case 3:
            return decodeUTF8(bb.read());
          case 4:
            return bb.read();
          case 5: {
            let count = bb.read32();
            let value2 = [];
            for (let i = 0; i < count; i++) {
              value2.push(visit());
            }
            return value2;
          }
          case 6: {
            let count = bb.read32();
            let value2 = {};
            for (let i = 0; i < count; i++) {
              value2[decodeUTF8(bb.read())] = visit();
            }
            return value2;
          }
          default:
            throw new Error("Invalid packet");
        }
      };
      let bb = new ByteBuffer(bytes);
      let id = bb.read32();
      let isRequest = (id & 1) === 0;
      id >>>= 1;
      let value = visit();
      if (bb.ptr !== bytes.length) {
        throw new Error("Invalid packet");
      }
      return { id, isRequest, value };
    }
    var ByteBuffer = class {
      constructor(buf = new Uint8Array(1024)) {
        this.buf = buf;
        this.len = 0;
        this.ptr = 0;
      }
      _write(delta) {
        if (this.len + delta > this.buf.length) {
          let clone = new Uint8Array((this.len + delta) * 2);
          clone.set(this.buf);
          this.buf = clone;
        }
        this.len += delta;
        return this.len - delta;
      }
      write8(value) {
        let offset = this._write(1);
        this.buf[offset] = value;
      }
      write32(value) {
        let offset = this._write(4);
        writeUInt32LE(this.buf, value, offset);
      }
      write(bytes) {
        let offset = this._write(4 + bytes.length);
        writeUInt32LE(this.buf, bytes.length, offset);
        this.buf.set(bytes, offset + 4);
      }
      _read(delta) {
        if (this.ptr + delta > this.buf.length) {
          throw new Error("Invalid packet");
        }
        this.ptr += delta;
        return this.ptr - delta;
      }
      read8() {
        return this.buf[this._read(1)];
      }
      read32() {
        return readUInt32LE(this.buf, this._read(4));
      }
      read() {
        let length = this.read32();
        let bytes = new Uint8Array(length);
        let ptr = this._read(bytes.length);
        bytes.set(this.buf.subarray(ptr, ptr + length));
        return bytes;
      }
    };
    var encodeUTF8;
    var decodeUTF8;
    if (typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined") {
      let encoder = new TextEncoder();
      let decoder = new TextDecoder();
      encodeUTF8 = (text) => encoder.encode(text);
      decodeUTF8 = (bytes) => decoder.decode(bytes);
    } else if (typeof Buffer !== "undefined") {
      encodeUTF8 = (text) => {
        let buffer = Buffer.from(text);
        if (!(buffer instanceof Uint8Array)) {
          buffer = new Uint8Array(buffer);
        }
        return buffer;
      };
      decodeUTF8 = (bytes) => {
        let { buffer, byteOffset, byteLength } = bytes;
        return Buffer.from(buffer, byteOffset, byteLength).toString();
      };
    } else {
      throw new Error("No UTF-8 codec found");
    }
    function readUInt32LE(buffer, offset) {
      return buffer[offset++] | buffer[offset++] << 8 | buffer[offset++] << 16 | buffer[offset++] << 24;
    }
    function writeUInt32LE(buffer, value, offset) {
      buffer[offset++] = value;
      buffer[offset++] = value >> 8;
      buffer[offset++] = value >> 16;
      buffer[offset++] = value >> 24;
    }
    function validateTarget(target) {
      target += "";
      if (target.indexOf(",") >= 0)
        throw new Error(`Invalid target: ${target}`);
      return target;
    }
    var canBeAnything = () => null;
    var mustBeBoolean = (value) => typeof value === "boolean" ? null : "a boolean";
    var mustBeBooleanOrObject = (value) => typeof value === "boolean" || typeof value === "object" && !Array.isArray(value) ? null : "a boolean or an object";
    var mustBeString = (value) => typeof value === "string" ? null : "a string";
    var mustBeRegExp = (value) => value instanceof RegExp ? null : "a RegExp object";
    var mustBeInteger = (value) => typeof value === "number" && value === (value | 0) ? null : "an integer";
    var mustBeFunction = (value) => typeof value === "function" ? null : "a function";
    var mustBeArray = (value) => Array.isArray(value) ? null : "an array";
    var mustBeObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value) ? null : "an object";
    var mustBeWebAssemblyModule = (value) => value instanceof WebAssembly.Module ? null : "a WebAssembly.Module";
    var mustBeArrayOrRecord = (value) => typeof value === "object" && value !== null ? null : "an array or an object";
    var mustBeObjectOrNull = (value) => typeof value === "object" && !Array.isArray(value) ? null : "an object or null";
    var mustBeStringOrBoolean = (value) => typeof value === "string" || typeof value === "boolean" ? null : "a string or a boolean";
    var mustBeStringOrObject = (value) => typeof value === "string" || typeof value === "object" && value !== null && !Array.isArray(value) ? null : "a string or an object";
    var mustBeStringOrArray = (value) => typeof value === "string" || Array.isArray(value) ? null : "a string or an array";
    var mustBeStringOrUint8Array = (value) => typeof value === "string" || value instanceof Uint8Array ? null : "a string or a Uint8Array";
    function getFlag(object, keys, key2, mustBeFn) {
      let value = object[key2];
      keys[key2 + ""] = true;
      if (value === void 0)
        return void 0;
      let mustBe = mustBeFn(value);
      if (mustBe !== null)
        throw new Error(`"${key2}" must be ${mustBe}`);
      return value;
    }
    function checkForInvalidFlags(object, keys, where) {
      for (let key2 in object) {
        if (!(key2 in keys)) {
          throw new Error(`Invalid option ${where}: "${key2}"`);
        }
      }
    }
    function validateInitializeOptions(options) {
      let keys = /* @__PURE__ */ Object.create(null);
      let wasmURL = getFlag(options, keys, "wasmURL", mustBeString);
      let wasmModule = getFlag(options, keys, "wasmModule", mustBeWebAssemblyModule);
      let worker = getFlag(options, keys, "worker", mustBeBoolean);
      checkForInvalidFlags(options, keys, "in initialize() call");
      return {
        wasmURL,
        wasmModule,
        worker
      };
    }
    function validateMangleCache(mangleCache) {
      let validated;
      if (mangleCache !== void 0) {
        validated = /* @__PURE__ */ Object.create(null);
        for (let key2 of Object.keys(mangleCache)) {
          let value = mangleCache[key2];
          if (typeof value === "string" || value === false) {
            validated[key2] = value;
          } else {
            throw new Error(`Expected ${JSON.stringify(key2)} in mangle cache to map to either a string or false`);
          }
        }
      }
      return validated;
    }
    function pushLogFlags(flags, options, keys, isTTY2, logLevelDefault) {
      let color = getFlag(options, keys, "color", mustBeBoolean);
      let logLevel = getFlag(options, keys, "logLevel", mustBeString);
      let logLimit = getFlag(options, keys, "logLimit", mustBeInteger);
      if (color !== void 0)
        flags.push(`--color=${color}`);
      else if (isTTY2)
        flags.push(`--color=true`);
      flags.push(`--log-level=${logLevel || logLevelDefault}`);
      flags.push(`--log-limit=${logLimit || 0}`);
    }
    function pushCommonFlags(flags, options, keys) {
      let legalComments = getFlag(options, keys, "legalComments", mustBeString);
      let sourceRoot = getFlag(options, keys, "sourceRoot", mustBeString);
      let sourcesContent = getFlag(options, keys, "sourcesContent", mustBeBoolean);
      let target = getFlag(options, keys, "target", mustBeStringOrArray);
      let format = getFlag(options, keys, "format", mustBeString);
      let globalName = getFlag(options, keys, "globalName", mustBeString);
      let mangleProps = getFlag(options, keys, "mangleProps", mustBeRegExp);
      let reserveProps = getFlag(options, keys, "reserveProps", mustBeRegExp);
      let mangleQuoted = getFlag(options, keys, "mangleQuoted", mustBeBoolean);
      let minify = getFlag(options, keys, "minify", mustBeBoolean);
      let minifySyntax = getFlag(options, keys, "minifySyntax", mustBeBoolean);
      let minifyWhitespace = getFlag(options, keys, "minifyWhitespace", mustBeBoolean);
      let minifyIdentifiers = getFlag(options, keys, "minifyIdentifiers", mustBeBoolean);
      let drop = getFlag(options, keys, "drop", mustBeArray);
      let charset = getFlag(options, keys, "charset", mustBeString);
      let treeShaking = getFlag(options, keys, "treeShaking", mustBeBoolean);
      let ignoreAnnotations = getFlag(options, keys, "ignoreAnnotations", mustBeBoolean);
      let jsx = getFlag(options, keys, "jsx", mustBeString);
      let jsxFactory = getFlag(options, keys, "jsxFactory", mustBeString);
      let jsxFragment = getFlag(options, keys, "jsxFragment", mustBeString);
      let define2 = getFlag(options, keys, "define", mustBeObject);
      let logOverride = getFlag(options, keys, "logOverride", mustBeObject);
      let supported = getFlag(options, keys, "supported", mustBeObject);
      let pure = getFlag(options, keys, "pure", mustBeArray);
      let keepNames = getFlag(options, keys, "keepNames", mustBeBoolean);
      if (legalComments)
        flags.push(`--legal-comments=${legalComments}`);
      if (sourceRoot !== void 0)
        flags.push(`--source-root=${sourceRoot}`);
      if (sourcesContent !== void 0)
        flags.push(`--sources-content=${sourcesContent}`);
      if (target) {
        if (Array.isArray(target))
          flags.push(`--target=${Array.from(target).map(validateTarget).join(",")}`);
        else
          flags.push(`--target=${validateTarget(target)}`);
      }
      if (format)
        flags.push(`--format=${format}`);
      if (globalName)
        flags.push(`--global-name=${globalName}`);
      if (minify)
        flags.push("--minify");
      if (minifySyntax)
        flags.push("--minify-syntax");
      if (minifyWhitespace)
        flags.push("--minify-whitespace");
      if (minifyIdentifiers)
        flags.push("--minify-identifiers");
      if (charset)
        flags.push(`--charset=${charset}`);
      if (treeShaking !== void 0)
        flags.push(`--tree-shaking=${treeShaking}`);
      if (ignoreAnnotations)
        flags.push(`--ignore-annotations`);
      if (drop)
        for (let what of drop)
          flags.push(`--drop:${what}`);
      if (mangleProps)
        flags.push(`--mangle-props=${mangleProps.source}`);
      if (reserveProps)
        flags.push(`--reserve-props=${reserveProps.source}`);
      if (mangleQuoted !== void 0)
        flags.push(`--mangle-quoted=${mangleQuoted}`);
      if (jsx)
        flags.push(`--jsx=${jsx}`);
      if (jsxFactory)
        flags.push(`--jsx-factory=${jsxFactory}`);
      if (jsxFragment)
        flags.push(`--jsx-fragment=${jsxFragment}`);
      if (define2) {
        for (let key2 in define2) {
          if (key2.indexOf("=") >= 0)
            throw new Error(`Invalid define: ${key2}`);
          flags.push(`--define:${key2}=${define2[key2]}`);
        }
      }
      if (logOverride) {
        for (let key2 in logOverride) {
          if (key2.indexOf("=") >= 0)
            throw new Error(`Invalid log override: ${key2}`);
          flags.push(`--log-override:${key2}=${logOverride[key2]}`);
        }
      }
      if (supported) {
        for (let key2 in supported) {
          if (key2.indexOf("=") >= 0)
            throw new Error(`Invalid supported: ${key2}`);
          flags.push(`--supported:${key2}=${supported[key2]}`);
        }
      }
      if (pure)
        for (let fn of pure)
          flags.push(`--pure:${fn}`);
      if (keepNames)
        flags.push(`--keep-names`);
    }
    function flagsForBuildOptions(callName, options, isTTY2, logLevelDefault, writeDefault) {
      var _a22;
      let flags = [];
      let entries = [];
      let keys = /* @__PURE__ */ Object.create(null);
      let stdinContents = null;
      let stdinResolveDir = null;
      let watchMode = null;
      pushLogFlags(flags, options, keys, isTTY2, logLevelDefault);
      pushCommonFlags(flags, options, keys);
      let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
      let bundle = getFlag(options, keys, "bundle", mustBeBoolean);
      let watch = getFlag(options, keys, "watch", mustBeBooleanOrObject);
      let splitting = getFlag(options, keys, "splitting", mustBeBoolean);
      let preserveSymlinks = getFlag(options, keys, "preserveSymlinks", mustBeBoolean);
      let metafile = getFlag(options, keys, "metafile", mustBeBoolean);
      let outfile = getFlag(options, keys, "outfile", mustBeString);
      let outdir = getFlag(options, keys, "outdir", mustBeString);
      let outbase = getFlag(options, keys, "outbase", mustBeString);
      let platform = getFlag(options, keys, "platform", mustBeString);
      let tsconfig = getFlag(options, keys, "tsconfig", mustBeString);
      let resolveExtensions = getFlag(options, keys, "resolveExtensions", mustBeArray);
      let nodePathsInput = getFlag(options, keys, "nodePaths", mustBeArray);
      let mainFields = getFlag(options, keys, "mainFields", mustBeArray);
      let conditions = getFlag(options, keys, "conditions", mustBeArray);
      let external = getFlag(options, keys, "external", mustBeArray);
      let loader = getFlag(options, keys, "loader", mustBeObject);
      let outExtension = getFlag(options, keys, "outExtension", mustBeObject);
      let publicPath = getFlag(options, keys, "publicPath", mustBeString);
      let entryNames = getFlag(options, keys, "entryNames", mustBeString);
      let chunkNames = getFlag(options, keys, "chunkNames", mustBeString);
      let assetNames = getFlag(options, keys, "assetNames", mustBeString);
      let inject = getFlag(options, keys, "inject", mustBeArray);
      let banner = getFlag(options, keys, "banner", mustBeObject);
      let footer = getFlag(options, keys, "footer", mustBeObject);
      let entryPoints = getFlag(options, keys, "entryPoints", mustBeArrayOrRecord);
      let absWorkingDir = getFlag(options, keys, "absWorkingDir", mustBeString);
      let stdin = getFlag(options, keys, "stdin", mustBeObject);
      let write = (_a22 = getFlag(options, keys, "write", mustBeBoolean)) != null ? _a22 : writeDefault;
      let allowOverwrite = getFlag(options, keys, "allowOverwrite", mustBeBoolean);
      let incremental = getFlag(options, keys, "incremental", mustBeBoolean) === true;
      let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
      keys.plugins = true;
      checkForInvalidFlags(options, keys, `in ${callName}() call`);
      if (sourcemap)
        flags.push(`--sourcemap${sourcemap === true ? "" : `=${sourcemap}`}`);
      if (bundle)
        flags.push("--bundle");
      if (allowOverwrite)
        flags.push("--allow-overwrite");
      if (watch) {
        flags.push("--watch");
        if (typeof watch === "boolean") {
          watchMode = {};
        } else {
          let watchKeys = /* @__PURE__ */ Object.create(null);
          let onRebuild = getFlag(watch, watchKeys, "onRebuild", mustBeFunction);
          checkForInvalidFlags(watch, watchKeys, `on "watch" in ${callName}() call`);
          watchMode = { onRebuild };
        }
      }
      if (splitting)
        flags.push("--splitting");
      if (preserveSymlinks)
        flags.push("--preserve-symlinks");
      if (metafile)
        flags.push(`--metafile`);
      if (outfile)
        flags.push(`--outfile=${outfile}`);
      if (outdir)
        flags.push(`--outdir=${outdir}`);
      if (outbase)
        flags.push(`--outbase=${outbase}`);
      if (platform)
        flags.push(`--platform=${platform}`);
      if (tsconfig)
        flags.push(`--tsconfig=${tsconfig}`);
      if (resolveExtensions) {
        let values = [];
        for (let value of resolveExtensions) {
          value += "";
          if (value.indexOf(",") >= 0)
            throw new Error(`Invalid resolve extension: ${value}`);
          values.push(value);
        }
        flags.push(`--resolve-extensions=${values.join(",")}`);
      }
      if (publicPath)
        flags.push(`--public-path=${publicPath}`);
      if (entryNames)
        flags.push(`--entry-names=${entryNames}`);
      if (chunkNames)
        flags.push(`--chunk-names=${chunkNames}`);
      if (assetNames)
        flags.push(`--asset-names=${assetNames}`);
      if (mainFields) {
        let values = [];
        for (let value of mainFields) {
          value += "";
          if (value.indexOf(",") >= 0)
            throw new Error(`Invalid main field: ${value}`);
          values.push(value);
        }
        flags.push(`--main-fields=${values.join(",")}`);
      }
      if (conditions) {
        let values = [];
        for (let value of conditions) {
          value += "";
          if (value.indexOf(",") >= 0)
            throw new Error(`Invalid condition: ${value}`);
          values.push(value);
        }
        flags.push(`--conditions=${values.join(",")}`);
      }
      if (external)
        for (let name of external)
          flags.push(`--external:${name}`);
      if (banner) {
        for (let type in banner) {
          if (type.indexOf("=") >= 0)
            throw new Error(`Invalid banner file type: ${type}`);
          flags.push(`--banner:${type}=${banner[type]}`);
        }
      }
      if (footer) {
        for (let type in footer) {
          if (type.indexOf("=") >= 0)
            throw new Error(`Invalid footer file type: ${type}`);
          flags.push(`--footer:${type}=${footer[type]}`);
        }
      }
      if (inject)
        for (let path32 of inject)
          flags.push(`--inject:${path32}`);
      if (loader) {
        for (let ext in loader) {
          if (ext.indexOf("=") >= 0)
            throw new Error(`Invalid loader extension: ${ext}`);
          flags.push(`--loader:${ext}=${loader[ext]}`);
        }
      }
      if (outExtension) {
        for (let ext in outExtension) {
          if (ext.indexOf("=") >= 0)
            throw new Error(`Invalid out extension: ${ext}`);
          flags.push(`--out-extension:${ext}=${outExtension[ext]}`);
        }
      }
      if (entryPoints) {
        if (Array.isArray(entryPoints)) {
          for (let entryPoint of entryPoints) {
            entries.push(["", entryPoint + ""]);
          }
        } else {
          for (let [key2, value] of Object.entries(entryPoints)) {
            entries.push([key2 + "", value + ""]);
          }
        }
      }
      if (stdin) {
        let stdinKeys = /* @__PURE__ */ Object.create(null);
        let contents = getFlag(stdin, stdinKeys, "contents", mustBeString);
        let resolveDir = getFlag(stdin, stdinKeys, "resolveDir", mustBeString);
        let sourcefile = getFlag(stdin, stdinKeys, "sourcefile", mustBeString);
        let loader2 = getFlag(stdin, stdinKeys, "loader", mustBeString);
        checkForInvalidFlags(stdin, stdinKeys, 'in "stdin" object');
        if (sourcefile)
          flags.push(`--sourcefile=${sourcefile}`);
        if (loader2)
          flags.push(`--loader=${loader2}`);
        if (resolveDir)
          stdinResolveDir = resolveDir + "";
        stdinContents = contents ? contents + "" : "";
      }
      let nodePaths = [];
      if (nodePathsInput) {
        for (let value of nodePathsInput) {
          value += "";
          nodePaths.push(value);
        }
      }
      return {
        entries,
        flags,
        write,
        stdinContents,
        stdinResolveDir,
        absWorkingDir,
        incremental,
        nodePaths,
        watch: watchMode,
        mangleCache: validateMangleCache(mangleCache)
      };
    }
    function flagsForTransformOptions(callName, options, isTTY2, logLevelDefault) {
      let flags = [];
      let keys = /* @__PURE__ */ Object.create(null);
      pushLogFlags(flags, options, keys, isTTY2, logLevelDefault);
      pushCommonFlags(flags, options, keys);
      let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
      let tsconfigRaw = getFlag(options, keys, "tsconfigRaw", mustBeStringOrObject);
      let sourcefile = getFlag(options, keys, "sourcefile", mustBeString);
      let loader = getFlag(options, keys, "loader", mustBeString);
      let banner = getFlag(options, keys, "banner", mustBeString);
      let footer = getFlag(options, keys, "footer", mustBeString);
      let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
      checkForInvalidFlags(options, keys, `in ${callName}() call`);
      if (sourcemap)
        flags.push(`--sourcemap=${sourcemap === true ? "external" : sourcemap}`);
      if (tsconfigRaw)
        flags.push(`--tsconfig-raw=${typeof tsconfigRaw === "string" ? tsconfigRaw : JSON.stringify(tsconfigRaw)}`);
      if (sourcefile)
        flags.push(`--sourcefile=${sourcefile}`);
      if (loader)
        flags.push(`--loader=${loader}`);
      if (banner)
        flags.push(`--banner=${banner}`);
      if (footer)
        flags.push(`--footer=${footer}`);
      return {
        flags,
        mangleCache: validateMangleCache(mangleCache)
      };
    }
    function createChannel(streamIn) {
      let responseCallbacks = /* @__PURE__ */ new Map();
      let pluginCallbacks = /* @__PURE__ */ new Map();
      let watchCallbacks = /* @__PURE__ */ new Map();
      let serveCallbacks = /* @__PURE__ */ new Map();
      let closeData = null;
      let nextRequestID = 0;
      let nextBuildKey = 0;
      let stdout = new Uint8Array(16 * 1024);
      let stdoutUsed = 0;
      let readFromStdout = (chunk) => {
        let limit = stdoutUsed + chunk.length;
        if (limit > stdout.length) {
          let swap = new Uint8Array(limit * 2);
          swap.set(stdout);
          stdout = swap;
        }
        stdout.set(chunk, stdoutUsed);
        stdoutUsed += chunk.length;
        let offset = 0;
        while (offset + 4 <= stdoutUsed) {
          let length = readUInt32LE(stdout, offset);
          if (offset + 4 + length > stdoutUsed) {
            break;
          }
          offset += 4;
          handleIncomingPacket(stdout.subarray(offset, offset + length));
          offset += length;
        }
        if (offset > 0) {
          stdout.copyWithin(0, offset, stdoutUsed);
          stdoutUsed -= offset;
        }
      };
      let afterClose = (error) => {
        closeData = { reason: error ? ": " + (error.message || error) : "" };
        const text = "The service was stopped" + closeData.reason;
        for (let callback of responseCallbacks.values()) {
          callback(text, null);
        }
        responseCallbacks.clear();
        for (let callbacks of serveCallbacks.values()) {
          callbacks.onWait(text);
        }
        serveCallbacks.clear();
        for (let callback of watchCallbacks.values()) {
          try {
            callback(new Error(text), null);
          } catch (e) {
            console.error(e);
          }
        }
        watchCallbacks.clear();
      };
      let sendRequest = (refs, value, callback) => {
        if (closeData)
          return callback("The service is no longer running" + closeData.reason, null);
        let id = nextRequestID++;
        responseCallbacks.set(id, (error, response) => {
          try {
            callback(error, response);
          } finally {
            if (refs)
              refs.unref();
          }
        });
        if (refs)
          refs.ref();
        streamIn.writeToStdin(encodePacket({ id, isRequest: true, value }));
      };
      let sendResponse = (id, value) => {
        if (closeData)
          throw new Error("The service is no longer running" + closeData.reason);
        streamIn.writeToStdin(encodePacket({ id, isRequest: false, value }));
      };
      let handleRequest = async (id, request) => {
        try {
          switch (request.command) {
            case "ping": {
              sendResponse(id, {});
              break;
            }
            case "on-start": {
              let callback = pluginCallbacks.get(request.key);
              if (!callback)
                sendResponse(id, {});
              else
                sendResponse(id, await callback(request));
              break;
            }
            case "on-resolve": {
              let callback = pluginCallbacks.get(request.key);
              if (!callback)
                sendResponse(id, {});
              else
                sendResponse(id, await callback(request));
              break;
            }
            case "on-load": {
              let callback = pluginCallbacks.get(request.key);
              if (!callback)
                sendResponse(id, {});
              else
                sendResponse(id, await callback(request));
              break;
            }
            case "serve-request": {
              let callbacks = serveCallbacks.get(request.key);
              if (callbacks && callbacks.onRequest)
                callbacks.onRequest(request.args);
              sendResponse(id, {});
              break;
            }
            case "serve-wait": {
              let callbacks = serveCallbacks.get(request.key);
              if (callbacks)
                callbacks.onWait(request.error);
              sendResponse(id, {});
              break;
            }
            case "watch-rebuild": {
              let callback = watchCallbacks.get(request.key);
              try {
                if (callback)
                  callback(null, request.args);
              } catch (err) {
                console.error(err);
              }
              sendResponse(id, {});
              break;
            }
            default:
              throw new Error(`Invalid command: ` + request.command);
          }
        } catch (e) {
          sendResponse(id, { errors: [extractErrorMessageV8(e, streamIn, null, void 0, "")] });
        }
      };
      let isFirstPacket = true;
      let handleIncomingPacket = (bytes) => {
        if (isFirstPacket) {
          isFirstPacket = false;
          let binaryVersion = String.fromCharCode(...bytes);
          if (binaryVersion !== "0.14.49") {
            throw new Error(`Cannot start service: Host version "${"0.14.49"}" does not match binary version ${JSON.stringify(binaryVersion)}`);
          }
          return;
        }
        let packet = decodePacket(bytes);
        if (packet.isRequest) {
          handleRequest(packet.id, packet.value);
        } else {
          let callback = responseCallbacks.get(packet.id);
          responseCallbacks.delete(packet.id);
          if (packet.value.error)
            callback(packet.value.error, {});
          else
            callback(null, packet.value);
        }
      };
      let handlePlugins = async (initialOptions, plugins, buildKey, stash, refs) => {
        let onStartCallbacks = [];
        let onEndCallbacks = [];
        let onResolveCallbacks = {};
        let onLoadCallbacks = {};
        let nextCallbackID = 0;
        let i = 0;
        let requestPlugins = [];
        let isSetupDone = false;
        plugins = [...plugins];
        for (let item of plugins) {
          let keys = {};
          if (typeof item !== "object")
            throw new Error(`Plugin at index ${i} must be an object`);
          const name = getFlag(item, keys, "name", mustBeString);
          if (typeof name !== "string" || name === "")
            throw new Error(`Plugin at index ${i} is missing a name`);
          try {
            let setup = getFlag(item, keys, "setup", mustBeFunction);
            if (typeof setup !== "function")
              throw new Error(`Plugin is missing a setup function`);
            checkForInvalidFlags(item, keys, `on plugin ${JSON.stringify(name)}`);
            let plugin = {
              name,
              onResolve: [],
              onLoad: []
            };
            i++;
            let resolve2 = (path32, options = {}) => {
              if (!isSetupDone)
                throw new Error('Cannot call "resolve" before plugin setup has completed');
              if (typeof path32 !== "string")
                throw new Error(`The path to resolve must be a string`);
              let keys2 = /* @__PURE__ */ Object.create(null);
              let pluginName = getFlag(options, keys2, "pluginName", mustBeString);
              let importer = getFlag(options, keys2, "importer", mustBeString);
              let namespace = getFlag(options, keys2, "namespace", mustBeString);
              let resolveDir = getFlag(options, keys2, "resolveDir", mustBeString);
              let kind = getFlag(options, keys2, "kind", mustBeString);
              let pluginData = getFlag(options, keys2, "pluginData", canBeAnything);
              checkForInvalidFlags(options, keys2, "in resolve() call");
              return new Promise((resolve22, reject) => {
                const request = {
                  command: "resolve",
                  path: path32,
                  key: buildKey,
                  pluginName: name
                };
                if (pluginName != null)
                  request.pluginName = pluginName;
                if (importer != null)
                  request.importer = importer;
                if (namespace != null)
                  request.namespace = namespace;
                if (resolveDir != null)
                  request.resolveDir = resolveDir;
                if (kind != null)
                  request.kind = kind;
                if (pluginData != null)
                  request.pluginData = stash.store(pluginData);
                sendRequest(refs, request, (error, response) => {
                  if (error !== null)
                    reject(new Error(error));
                  else
                    resolve22({
                      errors: replaceDetailsInMessages(response.errors, stash),
                      warnings: replaceDetailsInMessages(response.warnings, stash),
                      path: response.path,
                      external: response.external,
                      sideEffects: response.sideEffects,
                      namespace: response.namespace,
                      suffix: response.suffix,
                      pluginData: stash.load(response.pluginData)
                    });
                });
              });
            };
            let promise = setup({
              initialOptions,
              resolve: resolve2,
              onStart(callback2) {
                let registeredText = `This error came from the "onStart" callback registered here:`;
                let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onStart");
                onStartCallbacks.push({ name, callback: callback2, note: registeredNote });
              },
              onEnd(callback2) {
                let registeredText = `This error came from the "onEnd" callback registered here:`;
                let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onEnd");
                onEndCallbacks.push({ name, callback: callback2, note: registeredNote });
              },
              onResolve(options, callback2) {
                let registeredText = `This error came from the "onResolve" callback registered here:`;
                let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onResolve");
                let keys2 = {};
                let filter = getFlag(options, keys2, "filter", mustBeRegExp);
                let namespace = getFlag(options, keys2, "namespace", mustBeString);
                checkForInvalidFlags(options, keys2, `in onResolve() call for plugin ${JSON.stringify(name)}`);
                if (filter == null)
                  throw new Error(`onResolve() call is missing a filter`);
                let id = nextCallbackID++;
                onResolveCallbacks[id] = { name, callback: callback2, note: registeredNote };
                plugin.onResolve.push({ id, filter: filter.source, namespace: namespace || "" });
              },
              onLoad(options, callback2) {
                let registeredText = `This error came from the "onLoad" callback registered here:`;
                let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onLoad");
                let keys2 = {};
                let filter = getFlag(options, keys2, "filter", mustBeRegExp);
                let namespace = getFlag(options, keys2, "namespace", mustBeString);
                checkForInvalidFlags(options, keys2, `in onLoad() call for plugin ${JSON.stringify(name)}`);
                if (filter == null)
                  throw new Error(`onLoad() call is missing a filter`);
                let id = nextCallbackID++;
                onLoadCallbacks[id] = { name, callback: callback2, note: registeredNote };
                plugin.onLoad.push({ id, filter: filter.source, namespace: namespace || "" });
              },
              esbuild: streamIn.esbuild
            });
            if (promise)
              await promise;
            requestPlugins.push(plugin);
          } catch (e) {
            return { ok: false, error: e, pluginName: name };
          }
        }
        const callback = async (request) => {
          switch (request.command) {
            case "on-start": {
              let response = { errors: [], warnings: [] };
              await Promise.all(onStartCallbacks.map(async ({ name, callback: callback2, note }) => {
                try {
                  let result = await callback2();
                  if (result != null) {
                    if (typeof result !== "object")
                      throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(name)} to return an object`);
                    let keys = {};
                    let errors = getFlag(result, keys, "errors", mustBeArray);
                    let warnings = getFlag(result, keys, "warnings", mustBeArray);
                    checkForInvalidFlags(result, keys, `from onStart() callback in plugin ${JSON.stringify(name)}`);
                    if (errors != null)
                      response.errors.push(...sanitizeMessages(errors, "errors", stash, name));
                    if (warnings != null)
                      response.warnings.push(...sanitizeMessages(warnings, "warnings", stash, name));
                  }
                } catch (e) {
                  response.errors.push(extractErrorMessageV8(e, streamIn, stash, note && note(), name));
                }
              }));
              return response;
            }
            case "on-resolve": {
              let response = {}, name = "", callback2, note;
              for (let id of request.ids) {
                try {
                  ({ name, callback: callback2, note } = onResolveCallbacks[id]);
                  let result = await callback2({
                    path: request.path,
                    importer: request.importer,
                    namespace: request.namespace,
                    resolveDir: request.resolveDir,
                    kind: request.kind,
                    pluginData: stash.load(request.pluginData)
                  });
                  if (result != null) {
                    if (typeof result !== "object")
                      throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(name)} to return an object`);
                    let keys = {};
                    let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                    let path32 = getFlag(result, keys, "path", mustBeString);
                    let namespace = getFlag(result, keys, "namespace", mustBeString);
                    let suffix = getFlag(result, keys, "suffix", mustBeString);
                    let external = getFlag(result, keys, "external", mustBeBoolean);
                    let sideEffects = getFlag(result, keys, "sideEffects", mustBeBoolean);
                    let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                    let errors = getFlag(result, keys, "errors", mustBeArray);
                    let warnings = getFlag(result, keys, "warnings", mustBeArray);
                    let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
                    let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
                    checkForInvalidFlags(result, keys, `from onResolve() callback in plugin ${JSON.stringify(name)}`);
                    response.id = id;
                    if (pluginName != null)
                      response.pluginName = pluginName;
                    if (path32 != null)
                      response.path = path32;
                    if (namespace != null)
                      response.namespace = namespace;
                    if (suffix != null)
                      response.suffix = suffix;
                    if (external != null)
                      response.external = external;
                    if (sideEffects != null)
                      response.sideEffects = sideEffects;
                    if (pluginData != null)
                      response.pluginData = stash.store(pluginData);
                    if (errors != null)
                      response.errors = sanitizeMessages(errors, "errors", stash, name);
                    if (warnings != null)
                      response.warnings = sanitizeMessages(warnings, "warnings", stash, name);
                    if (watchFiles != null)
                      response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                    if (watchDirs != null)
                      response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                    break;
                  }
                } catch (e) {
                  return { id, errors: [extractErrorMessageV8(e, streamIn, stash, note && note(), name)] };
                }
              }
              return response;
            }
            case "on-load": {
              let response = {}, name = "", callback2, note;
              for (let id of request.ids) {
                try {
                  ({ name, callback: callback2, note } = onLoadCallbacks[id]);
                  let result = await callback2({
                    path: request.path,
                    namespace: request.namespace,
                    suffix: request.suffix,
                    pluginData: stash.load(request.pluginData)
                  });
                  if (result != null) {
                    if (typeof result !== "object")
                      throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(name)} to return an object`);
                    let keys = {};
                    let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                    let contents = getFlag(result, keys, "contents", mustBeStringOrUint8Array);
                    let resolveDir = getFlag(result, keys, "resolveDir", mustBeString);
                    let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                    let loader = getFlag(result, keys, "loader", mustBeString);
                    let errors = getFlag(result, keys, "errors", mustBeArray);
                    let warnings = getFlag(result, keys, "warnings", mustBeArray);
                    let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
                    let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
                    checkForInvalidFlags(result, keys, `from onLoad() callback in plugin ${JSON.stringify(name)}`);
                    response.id = id;
                    if (pluginName != null)
                      response.pluginName = pluginName;
                    if (contents instanceof Uint8Array)
                      response.contents = contents;
                    else if (contents != null)
                      response.contents = encodeUTF8(contents);
                    if (resolveDir != null)
                      response.resolveDir = resolveDir;
                    if (pluginData != null)
                      response.pluginData = stash.store(pluginData);
                    if (loader != null)
                      response.loader = loader;
                    if (errors != null)
                      response.errors = sanitizeMessages(errors, "errors", stash, name);
                    if (warnings != null)
                      response.warnings = sanitizeMessages(warnings, "warnings", stash, name);
                    if (watchFiles != null)
                      response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                    if (watchDirs != null)
                      response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                    break;
                  }
                } catch (e) {
                  return { id, errors: [extractErrorMessageV8(e, streamIn, stash, note && note(), name)] };
                }
              }
              return response;
            }
            default:
              throw new Error(`Invalid command: ` + request.command);
          }
        };
        let runOnEndCallbacks = (result, logPluginError, done) => done();
        if (onEndCallbacks.length > 0) {
          runOnEndCallbacks = (result, logPluginError, done) => {
            (async () => {
              for (const { name, callback: callback2, note } of onEndCallbacks) {
                try {
                  await callback2(result);
                } catch (e) {
                  result.errors.push(await new Promise((resolve2) => logPluginError(e, name, note && note(), resolve2)));
                }
              }
            })().then(done);
          };
        }
        isSetupDone = true;
        let refCount = 0;
        return {
          ok: true,
          requestPlugins,
          runOnEndCallbacks,
          pluginRefs: {
            ref() {
              if (++refCount === 1)
                pluginCallbacks.set(buildKey, callback);
            },
            unref() {
              if (--refCount === 0)
                pluginCallbacks.delete(buildKey);
            }
          }
        };
      };
      let buildServeData = (refs, options, request, key2) => {
        let keys = {};
        let port = getFlag(options, keys, "port", mustBeInteger);
        let host = getFlag(options, keys, "host", mustBeString);
        let servedir = getFlag(options, keys, "servedir", mustBeString);
        let onRequest = getFlag(options, keys, "onRequest", mustBeFunction);
        let onWait;
        let wait = new Promise((resolve2, reject) => {
          onWait = (error) => {
            serveCallbacks.delete(key2);
            if (error !== null)
              reject(new Error(error));
            else
              resolve2();
          };
        });
        request.serve = {};
        checkForInvalidFlags(options, keys, `in serve() call`);
        if (port !== void 0)
          request.serve.port = port;
        if (host !== void 0)
          request.serve.host = host;
        if (servedir !== void 0)
          request.serve.servedir = servedir;
        serveCallbacks.set(key2, {
          onRequest,
          onWait
        });
        return {
          wait,
          stop() {
            sendRequest(refs, { command: "serve-stop", key: key2 }, () => {
            });
          }
        };
      };
      const buildLogLevelDefault = "warning";
      const transformLogLevelDefault = "silent";
      let buildOrServe = (args) => {
        let key2 = nextBuildKey++;
        const details = createObjectStash();
        let plugins;
        let { refs, options, isTTY: isTTY2, callback } = args;
        if (typeof options === "object") {
          let value = options.plugins;
          if (value !== void 0) {
            if (!Array.isArray(value))
              throw new Error(`"plugins" must be an array`);
            plugins = value;
          }
        }
        let logPluginError = (e, pluginName, note, done) => {
          let flags = [];
          try {
            pushLogFlags(flags, options, {}, isTTY2, buildLogLevelDefault);
          } catch {
          }
          const message = extractErrorMessageV8(e, streamIn, details, note, pluginName);
          sendRequest(refs, { command: "error", flags, error: message }, () => {
            message.detail = details.load(message.detail);
            done(message);
          });
        };
        let handleError = (e, pluginName) => {
          logPluginError(e, pluginName, void 0, (error) => {
            callback(failureErrorWithLog("Build failed", [error], []), null);
          });
        };
        if (plugins && plugins.length > 0) {
          if (streamIn.isSync)
            return handleError(new Error("Cannot use plugins in synchronous API calls"), "");
          handlePlugins(options, plugins, key2, details, refs).then((result) => {
            if (!result.ok) {
              handleError(result.error, result.pluginName);
            } else {
              try {
                buildOrServeContinue({
                  ...args,
                  key: key2,
                  details,
                  logPluginError,
                  requestPlugins: result.requestPlugins,
                  runOnEndCallbacks: result.runOnEndCallbacks,
                  pluginRefs: result.pluginRefs
                });
              } catch (e) {
                handleError(e, "");
              }
            }
          }, (e) => handleError(e, ""));
        } else {
          try {
            buildOrServeContinue({
              ...args,
              key: key2,
              details,
              logPluginError,
              requestPlugins: null,
              runOnEndCallbacks: (result, logPluginError2, done) => done(),
              pluginRefs: null
            });
          } catch (e) {
            handleError(e, "");
          }
        }
      };
      let buildOrServeContinue = ({
        callName,
        refs: callerRefs,
        serveOptions,
        options,
        isTTY: isTTY2,
        defaultWD: defaultWD2,
        callback,
        key: key2,
        details,
        logPluginError,
        requestPlugins,
        runOnEndCallbacks,
        pluginRefs
      }) => {
        const refs = {
          ref() {
            if (pluginRefs)
              pluginRefs.ref();
            if (callerRefs)
              callerRefs.ref();
          },
          unref() {
            if (pluginRefs)
              pluginRefs.unref();
            if (callerRefs)
              callerRefs.unref();
          }
        };
        let writeDefault = !streamIn.isWriteUnavailable;
        let {
          entries,
          flags,
          write,
          stdinContents,
          stdinResolveDir,
          absWorkingDir,
          incremental,
          nodePaths,
          watch,
          mangleCache
        } = flagsForBuildOptions(callName, options, isTTY2, buildLogLevelDefault, writeDefault);
        let request = {
          command: "build",
          key: key2,
          entries,
          flags,
          write,
          stdinContents,
          stdinResolveDir,
          absWorkingDir: absWorkingDir || defaultWD2,
          incremental,
          nodePaths
        };
        if (requestPlugins)
          request.plugins = requestPlugins;
        if (mangleCache)
          request.mangleCache = mangleCache;
        let serve2 = serveOptions && buildServeData(refs, serveOptions, request, key2);
        let rebuild;
        let stop;
        let copyResponseToResult = (response, result) => {
          if (response.outputFiles)
            result.outputFiles = response.outputFiles.map(convertOutputFiles);
          if (response.metafile)
            result.metafile = JSON.parse(response.metafile);
          if (response.mangleCache)
            result.mangleCache = response.mangleCache;
          if (response.writeToStdout !== void 0)
            console.log(decodeUTF8(response.writeToStdout).replace(/\n$/, ""));
        };
        let buildResponseToResult = (response, callback2) => {
          let result = {
            errors: replaceDetailsInMessages(response.errors, details),
            warnings: replaceDetailsInMessages(response.warnings, details)
          };
          copyResponseToResult(response, result);
          runOnEndCallbacks(result, logPluginError, () => {
            if (result.errors.length > 0) {
              return callback2(failureErrorWithLog("Build failed", result.errors, result.warnings), null);
            }
            if (response.rebuild) {
              if (!rebuild) {
                let isDisposed = false;
                rebuild = () => new Promise((resolve2, reject) => {
                  if (isDisposed || closeData)
                    throw new Error("Cannot rebuild");
                  sendRequest(refs, { command: "rebuild", key: key2 }, (error2, response2) => {
                    if (error2) {
                      const message = { id: "", pluginName: "", text: error2, location: null, notes: [], detail: void 0 };
                      return callback2(failureErrorWithLog("Build failed", [message], []), null);
                    }
                    buildResponseToResult(response2, (error3, result3) => {
                      if (error3)
                        reject(error3);
                      else
                        resolve2(result3);
                    });
                  });
                });
                refs.ref();
                rebuild.dispose = () => {
                  if (isDisposed)
                    return;
                  isDisposed = true;
                  sendRequest(refs, { command: "rebuild-dispose", key: key2 }, () => {
                  });
                  refs.unref();
                };
              }
              result.rebuild = rebuild;
            }
            if (response.watch) {
              if (!stop) {
                let isStopped = false;
                refs.ref();
                stop = () => {
                  if (isStopped)
                    return;
                  isStopped = true;
                  watchCallbacks.delete(key2);
                  sendRequest(refs, { command: "watch-stop", key: key2 }, () => {
                  });
                  refs.unref();
                };
                if (watch) {
                  watchCallbacks.set(key2, (serviceStopError, watchResponse) => {
                    if (serviceStopError) {
                      if (watch.onRebuild)
                        watch.onRebuild(serviceStopError, null);
                      return;
                    }
                    let result2 = {
                      errors: replaceDetailsInMessages(watchResponse.errors, details),
                      warnings: replaceDetailsInMessages(watchResponse.warnings, details)
                    };
                    copyResponseToResult(watchResponse, result2);
                    runOnEndCallbacks(result2, logPluginError, () => {
                      if (result2.errors.length > 0) {
                        if (watch.onRebuild)
                          watch.onRebuild(failureErrorWithLog("Build failed", result2.errors, result2.warnings), null);
                        return;
                      }
                      if (watchResponse.rebuildID !== void 0)
                        result2.rebuild = rebuild;
                      result2.stop = stop;
                      if (watch.onRebuild)
                        watch.onRebuild(null, result2);
                    });
                  });
                }
              }
              result.stop = stop;
            }
            callback2(null, result);
          });
        };
        if (write && streamIn.isWriteUnavailable)
          throw new Error(`The "write" option is unavailable in this environment`);
        if (incremental && streamIn.isSync)
          throw new Error(`Cannot use "incremental" with a synchronous build`);
        if (watch && streamIn.isSync)
          throw new Error(`Cannot use "watch" with a synchronous build`);
        sendRequest(refs, request, (error, response) => {
          if (error)
            return callback(new Error(error), null);
          if (serve2) {
            let serveResponse = response;
            let isStopped = false;
            refs.ref();
            let result = {
              port: serveResponse.port,
              host: serveResponse.host,
              wait: serve2.wait,
              stop() {
                if (isStopped)
                  return;
                isStopped = true;
                serve2.stop();
                refs.unref();
              }
            };
            refs.ref();
            serve2.wait.then(refs.unref, refs.unref);
            return callback(null, result);
          }
          return buildResponseToResult(response, callback);
        });
      };
      let transform22 = ({ callName, refs, input, options, isTTY: isTTY2, fs: fs3, callback }) => {
        const details = createObjectStash();
        let start = (inputPath) => {
          try {
            if (typeof input !== "string")
              throw new Error('The input to "transform" must be a string');
            let {
              flags,
              mangleCache
            } = flagsForTransformOptions(callName, options, isTTY2, transformLogLevelDefault);
            let request = {
              command: "transform",
              flags,
              inputFS: inputPath !== null,
              input: inputPath !== null ? inputPath : input
            };
            if (mangleCache)
              request.mangleCache = mangleCache;
            sendRequest(refs, request, (error, response) => {
              if (error)
                return callback(new Error(error), null);
              let errors = replaceDetailsInMessages(response.errors, details);
              let warnings = replaceDetailsInMessages(response.warnings, details);
              let outstanding = 1;
              let next = () => {
                if (--outstanding === 0) {
                  let result = { warnings, code: response.code, map: response.map };
                  if (response.mangleCache)
                    result.mangleCache = response == null ? void 0 : response.mangleCache;
                  callback(null, result);
                }
              };
              if (errors.length > 0)
                return callback(failureErrorWithLog("Transform failed", errors, warnings), null);
              if (response.codeFS) {
                outstanding++;
                fs3.readFile(response.code, (err, contents) => {
                  if (err !== null) {
                    callback(err, null);
                  } else {
                    response.code = contents;
                    next();
                  }
                });
              }
              if (response.mapFS) {
                outstanding++;
                fs3.readFile(response.map, (err, contents) => {
                  if (err !== null) {
                    callback(err, null);
                  } else {
                    response.map = contents;
                    next();
                  }
                });
              }
              next();
            });
          } catch (e) {
            let flags = [];
            try {
              pushLogFlags(flags, options, {}, isTTY2, transformLogLevelDefault);
            } catch {
            }
            const error = extractErrorMessageV8(e, streamIn, details, void 0, "");
            sendRequest(refs, { command: "error", flags, error }, () => {
              error.detail = details.load(error.detail);
              callback(failureErrorWithLog("Transform failed", [error], []), null);
            });
          }
        };
        if (typeof input === "string" && input.length > 1024 * 1024) {
          let next = start;
          start = () => fs3.writeFile(input, next);
        }
        start(null);
      };
      let formatMessages2 = ({ callName, refs, messages, options, callback }) => {
        let result = sanitizeMessages(messages, "messages", null, "");
        if (!options)
          throw new Error(`Missing second argument in ${callName}() call`);
        let keys = {};
        let kind = getFlag(options, keys, "kind", mustBeString);
        let color = getFlag(options, keys, "color", mustBeBoolean);
        let terminalWidth = getFlag(options, keys, "terminalWidth", mustBeInteger);
        checkForInvalidFlags(options, keys, `in ${callName}() call`);
        if (kind === void 0)
          throw new Error(`Missing "kind" in ${callName}() call`);
        if (kind !== "error" && kind !== "warning")
          throw new Error(`Expected "kind" to be "error" or "warning" in ${callName}() call`);
        let request = {
          command: "format-msgs",
          messages: result,
          isWarning: kind === "warning"
        };
        if (color !== void 0)
          request.color = color;
        if (terminalWidth !== void 0)
          request.terminalWidth = terminalWidth;
        sendRequest(refs, request, (error, response) => {
          if (error)
            return callback(new Error(error), null);
          callback(null, response.messages);
        });
      };
      let analyzeMetafile2 = ({ callName, refs, metafile, options, callback }) => {
        if (options === void 0)
          options = {};
        let keys = {};
        let color = getFlag(options, keys, "color", mustBeBoolean);
        let verbose = getFlag(options, keys, "verbose", mustBeBoolean);
        checkForInvalidFlags(options, keys, `in ${callName}() call`);
        let request = {
          command: "analyze-metafile",
          metafile
        };
        if (color !== void 0)
          request.color = color;
        if (verbose !== void 0)
          request.verbose = verbose;
        sendRequest(refs, request, (error, response) => {
          if (error)
            return callback(new Error(error), null);
          callback(null, response.result);
        });
      };
      return {
        readFromStdout,
        afterClose,
        service: {
          buildOrServe,
          transform: transform22,
          formatMessages: formatMessages2,
          analyzeMetafile: analyzeMetafile2
        }
      };
    }
    function createObjectStash() {
      const map = /* @__PURE__ */ new Map();
      let nextID = 0;
      return {
        load(id) {
          return map.get(id);
        },
        store(value) {
          if (value === void 0)
            return -1;
          const id = nextID++;
          map.set(id, value);
          return id;
        }
      };
    }
    function extractCallerV8(e, streamIn, ident) {
      let note;
      let tried = false;
      return () => {
        if (tried)
          return note;
        tried = true;
        try {
          let lines = (e.stack + "").split("\n");
          lines.splice(1, 1);
          let location = parseStackLinesV8(streamIn, lines, ident);
          if (location) {
            note = { text: e.message, location };
            return note;
          }
        } catch {
        }
      };
    }
    function extractErrorMessageV8(e, streamIn, stash, note, pluginName) {
      let text = "Internal error";
      let location = null;
      try {
        text = (e && e.message || e) + "";
      } catch {
      }
      try {
        location = parseStackLinesV8(streamIn, (e.stack + "").split("\n"), "");
      } catch {
      }
      return { id: "", pluginName, text, location, notes: note ? [note] : [], detail: stash ? stash.store(e) : -1 };
    }
    function parseStackLinesV8(streamIn, lines, ident) {
      let at = "    at ";
      if (streamIn.readFileSync && !lines[0].startsWith(at) && lines[1].startsWith(at)) {
        for (let i = 1; i < lines.length; i++) {
          let line = lines[i];
          if (!line.startsWith(at))
            continue;
          line = line.slice(at.length);
          while (true) {
            let match2 = /^(?:new |async )?\S+ \((.*)\)$/.exec(line);
            if (match2) {
              line = match2[1];
              continue;
            }
            match2 = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(line);
            if (match2) {
              line = match2[1];
              continue;
            }
            match2 = /^(\S+):(\d+):(\d+)$/.exec(line);
            if (match2) {
              let contents;
              try {
                contents = streamIn.readFileSync(match2[1], "utf8");
              } catch {
                break;
              }
              let lineText = contents.split(/\r\n|\r|\n|\u2028|\u2029/)[+match2[2] - 1] || "";
              let column = +match2[3] - 1;
              let length = lineText.slice(column, column + ident.length) === ident ? ident.length : 0;
              return {
                file: match2[1],
                namespace: "file",
                line: +match2[2],
                column: encodeUTF8(lineText.slice(0, column)).length,
                length: encodeUTF8(lineText.slice(column, column + length)).length,
                lineText: lineText + "\n" + lines.slice(1).join("\n"),
                suggestion: ""
              };
            }
            break;
          }
        }
      }
      return null;
    }
    function failureErrorWithLog(text, errors, warnings) {
      let limit = 5;
      let summary = errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e, i) => {
        if (i === limit)
          return "\n...";
        if (!e.location)
          return `
error: ${e.text}`;
        let { file, line, column } = e.location;
        let pluginText = e.pluginName ? `[plugin: ${e.pluginName}] ` : "";
        return `
${file}:${line}:${column}: ERROR: ${pluginText}${e.text}`;
      }).join("");
      let error = new Error(`${text}${summary}`);
      error.errors = errors;
      error.warnings = warnings;
      return error;
    }
    function replaceDetailsInMessages(messages, stash) {
      for (const message of messages) {
        message.detail = stash.load(message.detail);
      }
      return messages;
    }
    function sanitizeLocation(location, where) {
      if (location == null)
        return null;
      let keys = {};
      let file = getFlag(location, keys, "file", mustBeString);
      let namespace = getFlag(location, keys, "namespace", mustBeString);
      let line = getFlag(location, keys, "line", mustBeInteger);
      let column = getFlag(location, keys, "column", mustBeInteger);
      let length = getFlag(location, keys, "length", mustBeInteger);
      let lineText = getFlag(location, keys, "lineText", mustBeString);
      let suggestion = getFlag(location, keys, "suggestion", mustBeString);
      checkForInvalidFlags(location, keys, where);
      return {
        file: file || "",
        namespace: namespace || "",
        line: line || 0,
        column: column || 0,
        length: length || 0,
        lineText: lineText || "",
        suggestion: suggestion || ""
      };
    }
    function sanitizeMessages(messages, property, stash, fallbackPluginName) {
      let messagesClone = [];
      let index = 0;
      for (const message of messages) {
        let keys = {};
        let id = getFlag(message, keys, "id", mustBeString);
        let pluginName = getFlag(message, keys, "pluginName", mustBeString);
        let text = getFlag(message, keys, "text", mustBeString);
        let location = getFlag(message, keys, "location", mustBeObjectOrNull);
        let notes = getFlag(message, keys, "notes", mustBeArray);
        let detail = getFlag(message, keys, "detail", canBeAnything);
        let where = `in element ${index} of "${property}"`;
        checkForInvalidFlags(message, keys, where);
        let notesClone = [];
        if (notes) {
          for (const note of notes) {
            let noteKeys = {};
            let noteText = getFlag(note, noteKeys, "text", mustBeString);
            let noteLocation = getFlag(note, noteKeys, "location", mustBeObjectOrNull);
            checkForInvalidFlags(note, noteKeys, where);
            notesClone.push({
              text: noteText || "",
              location: sanitizeLocation(noteLocation, where)
            });
          }
        }
        messagesClone.push({
          id: id || "",
          pluginName: pluginName || fallbackPluginName,
          text: text || "",
          location: sanitizeLocation(location, where),
          notes: notesClone,
          detail: stash ? stash.store(detail) : -1
        });
        index++;
      }
      return messagesClone;
    }
    function sanitizeStringArray(values, property) {
      const result = [];
      for (const value of values) {
        if (typeof value !== "string")
          throw new Error(`${JSON.stringify(property)} must be an array of strings`);
        result.push(value);
      }
      return result;
    }
    function convertOutputFiles({ path: path32, contents }) {
      let text = null;
      return {
        path: path32,
        contents,
        get text() {
          if (text === null)
            text = decodeUTF8(contents);
          return text;
        }
      };
    }
    var fs = require("fs");
    var os = require("os");
    var path3 = require("path");
    var ESBUILD_BINARY_PATH = process.env.ESBUILD_BINARY_PATH || ESBUILD_BINARY_PATH;
    var knownWindowsPackages = {
      "win32 arm64 LE": "esbuild-windows-arm64",
      "win32 ia32 LE": "esbuild-windows-32",
      "win32 x64 LE": "esbuild-windows-64"
    };
    var knownUnixlikePackages = {
      "android arm64 LE": "esbuild-android-arm64",
      "darwin arm64 LE": "esbuild-darwin-arm64",
      "darwin x64 LE": "esbuild-darwin-64",
      "freebsd arm64 LE": "esbuild-freebsd-arm64",
      "freebsd x64 LE": "esbuild-freebsd-64",
      "linux arm LE": "esbuild-linux-arm",
      "linux arm64 LE": "esbuild-linux-arm64",
      "linux ia32 LE": "esbuild-linux-32",
      "linux mips64el LE": "esbuild-linux-mips64le",
      "linux ppc64 LE": "esbuild-linux-ppc64le",
      "linux riscv64 LE": "esbuild-linux-riscv64",
      "linux s390x BE": "esbuild-linux-s390x",
      "linux x64 LE": "esbuild-linux-64",
      "netbsd x64 LE": "esbuild-netbsd-64",
      "openbsd x64 LE": "esbuild-openbsd-64",
      "sunos x64 LE": "esbuild-sunos-64"
    };
    var knownWebAssemblyFallbackPackages = {
      "android x64 LE": "esbuild-android-64"
    };
    function pkgAndSubpathForCurrentPlatform() {
      let pkg;
      let subpath;
      let isWASM = false;
      let platformKey = `${process.platform} ${os.arch()} ${os.endianness()}`;
      if (platformKey in knownWindowsPackages) {
        pkg = knownWindowsPackages[platformKey];
        subpath = "esbuild.exe";
      } else if (platformKey in knownUnixlikePackages) {
        pkg = knownUnixlikePackages[platformKey];
        subpath = "bin/esbuild";
      } else if (platformKey in knownWebAssemblyFallbackPackages) {
        pkg = knownWebAssemblyFallbackPackages[platformKey];
        subpath = "bin/esbuild";
        isWASM = true;
      } else {
        throw new Error(`Unsupported platform: ${platformKey}`);
      }
      return { pkg, subpath, isWASM };
    }
    function pkgForSomeOtherPlatform() {
      const libMainJS = require.resolve("esbuild");
      const nodeModulesDirectory = path3.dirname(path3.dirname(path3.dirname(libMainJS)));
      if (path3.basename(nodeModulesDirectory) === "node_modules") {
        for (const unixKey in knownUnixlikePackages) {
          try {
            const pkg = knownUnixlikePackages[unixKey];
            if (fs.existsSync(path3.join(nodeModulesDirectory, pkg)))
              return pkg;
          } catch {
          }
        }
        for (const windowsKey in knownWindowsPackages) {
          try {
            const pkg = knownWindowsPackages[windowsKey];
            if (fs.existsSync(path3.join(nodeModulesDirectory, pkg)))
              return pkg;
          } catch {
          }
        }
      }
      return null;
    }
    function downloadedBinPath(pkg, subpath) {
      const esbuildLibDir = path3.dirname(require.resolve("esbuild"));
      return path3.join(esbuildLibDir, `downloaded-${pkg}-${path3.basename(subpath)}`);
    }
    function generateBinPath() {
      if (ESBUILD_BINARY_PATH) {
        return { binPath: ESBUILD_BINARY_PATH, isWASM: false };
      }
      const { pkg, subpath, isWASM } = pkgAndSubpathForCurrentPlatform();
      let binPath;
      try {
        binPath = require.resolve(`${pkg}/${subpath}`);
      } catch (e) {
        binPath = downloadedBinPath(pkg, subpath);
        if (!fs.existsSync(binPath)) {
          try {
            require.resolve(pkg);
          } catch {
            const otherPkg = pkgForSomeOtherPlatform();
            if (otherPkg) {
              throw new Error(`
You installed esbuild on another platform than the one you're currently using.
This won't work because esbuild is written with native code and needs to
install a platform-specific binary executable.

Specifically the "${otherPkg}" package is present but this platform
needs the "${pkg}" package instead. People often get into this
situation by installing esbuild on Windows or macOS and copying "node_modules"
into a Docker image that runs Linux, or by copying "node_modules" between
Windows and WSL environments.

If you are installing with npm, you can try not copying the "node_modules"
directory when you copy the files over, and running "npm ci" or "npm install"
on the destination platform after the copy. Or you could consider using yarn
instead which has built-in support for installing a package on multiple
platforms simultaneously.

If you are installing with yarn, you can try listing both this platform and the
other platform in your ".yarnrc.yml" file using the "supportedArchitectures"
feature: https://yarnpkg.com/configuration/yarnrc/#supportedArchitectures
Keep in mind that this means multiple copies of esbuild will be present.

Another alternative is to use the "esbuild-wasm" package instead, which works
the same way on all platforms. But it comes with a heavy performance cost and
can sometimes be 10x slower than the "esbuild" package, so you may also not
want to do that.
`);
            }
            throw new Error(`The package "${pkg}" could not be found, and is needed by esbuild.

If you are installing esbuild with npm, make sure that you don't specify the
"--no-optional" flag. The "optionalDependencies" package.json feature is used
by esbuild to install the correct binary executable for your current platform.`);
          }
          throw e;
        }
      }
      let isYarnPnP = false;
      try {
        require("pnpapi");
        isYarnPnP = true;
      } catch (e) {
      }
      if (isYarnPnP) {
        const esbuildLibDir = path3.dirname(require.resolve("esbuild"));
        const binTargetPath = path3.join(esbuildLibDir, `pnpapi-${pkg}-${path3.basename(subpath)}`);
        if (!fs.existsSync(binTargetPath)) {
          fs.copyFileSync(binPath, binTargetPath);
          fs.chmodSync(binTargetPath, 493);
        }
        return { binPath: binTargetPath, isWASM };
      }
      return { binPath, isWASM };
    }
    var child_process = require("child_process");
    var crypto = require("crypto");
    var path22 = require("path");
    var fs2 = require("fs");
    var os2 = require("os");
    var tty = require("tty");
    var worker_threads;
    if (process.env.ESBUILD_WORKER_THREADS !== "0") {
      try {
        worker_threads = require("worker_threads");
      } catch {
      }
      let [major, minor] = process.versions.node.split(".");
      if (+major < 12 || +major === 12 && +minor < 17 || +major === 13 && +minor < 13) {
        worker_threads = void 0;
      }
    }
    var _a2;
    var isInternalWorkerThread = ((_a2 = worker_threads == null ? void 0 : worker_threads.workerData) == null ? void 0 : _a2.esbuildVersion) === "0.14.49";
    var esbuildCommandAndArgs = () => {
      if ((!ESBUILD_BINARY_PATH || false) && (path22.basename(__filename) !== "main.js" || path22.basename(__dirname) !== "lib")) {
        throw new Error(`The esbuild JavaScript API cannot be bundled. Please mark the "esbuild" package as external so it's not included in the bundle.

More information: The file containing the code for esbuild's JavaScript API (${__filename}) does not appear to be inside the esbuild package on the file system, which usually means that the esbuild package was bundled into another file. This is problematic because the API needs to run a binary executable inside the esbuild package which is located using a relative path from the API code to the executable. If the esbuild package is bundled, the relative path will be incorrect and the executable won't be found.`);
      }
      if (false) {
        return ["node", [path22.join(__dirname, "..", "bin", "esbuild")]];
      }
      const { binPath, isWASM } = generateBinPath();
      if (isWASM) {
        return ["node", [binPath]];
      } else {
        return [binPath, []];
      }
    };
    var isTTY = () => tty.isatty(2);
    var fsSync = {
      readFile(tempFile, callback) {
        try {
          let contents = fs2.readFileSync(tempFile, "utf8");
          try {
            fs2.unlinkSync(tempFile);
          } catch {
          }
          callback(null, contents);
        } catch (err) {
          callback(err, null);
        }
      },
      writeFile(contents, callback) {
        try {
          let tempFile = randomFileName();
          fs2.writeFileSync(tempFile, contents);
          callback(tempFile);
        } catch {
          callback(null);
        }
      }
    };
    var fsAsync = {
      readFile(tempFile, callback) {
        try {
          fs2.readFile(tempFile, "utf8", (err, contents) => {
            try {
              fs2.unlink(tempFile, () => callback(err, contents));
            } catch {
              callback(err, contents);
            }
          });
        } catch (err) {
          callback(err, null);
        }
      },
      writeFile(contents, callback) {
        try {
          let tempFile = randomFileName();
          fs2.writeFile(tempFile, contents, (err) => err !== null ? callback(null) : callback(tempFile));
        } catch {
          callback(null);
        }
      }
    };
    var version2 = "0.14.49";
    var build2 = (options) => ensureServiceIsRunning().build(options);
    var serve = (serveOptions, buildOptions) => ensureServiceIsRunning().serve(serveOptions, buildOptions);
    var transform2 = (input, options) => ensureServiceIsRunning().transform(input, options);
    var formatMessages = (messages, options) => ensureServiceIsRunning().formatMessages(messages, options);
    var analyzeMetafile = (messages, options) => ensureServiceIsRunning().analyzeMetafile(messages, options);
    var buildSync = (options) => {
      if (worker_threads && !isInternalWorkerThread) {
        if (!workerThreadService)
          workerThreadService = startWorkerThreadService(worker_threads);
        return workerThreadService.buildSync(options);
      }
      let result;
      runServiceSync((service) => service.buildOrServe({
        callName: "buildSync",
        refs: null,
        serveOptions: null,
        options,
        isTTY: isTTY(),
        defaultWD,
        callback: (err, res) => {
          if (err)
            throw err;
          result = res;
        }
      }));
      return result;
    };
    var transformSync = (input, options) => {
      if (worker_threads && !isInternalWorkerThread) {
        if (!workerThreadService)
          workerThreadService = startWorkerThreadService(worker_threads);
        return workerThreadService.transformSync(input, options);
      }
      let result;
      runServiceSync((service) => service.transform({
        callName: "transformSync",
        refs: null,
        input,
        options: options || {},
        isTTY: isTTY(),
        fs: fsSync,
        callback: (err, res) => {
          if (err)
            throw err;
          result = res;
        }
      }));
      return result;
    };
    var formatMessagesSync = (messages, options) => {
      if (worker_threads && !isInternalWorkerThread) {
        if (!workerThreadService)
          workerThreadService = startWorkerThreadService(worker_threads);
        return workerThreadService.formatMessagesSync(messages, options);
      }
      let result;
      runServiceSync((service) => service.formatMessages({
        callName: "formatMessagesSync",
        refs: null,
        messages,
        options,
        callback: (err, res) => {
          if (err)
            throw err;
          result = res;
        }
      }));
      return result;
    };
    var analyzeMetafileSync = (metafile, options) => {
      if (worker_threads && !isInternalWorkerThread) {
        if (!workerThreadService)
          workerThreadService = startWorkerThreadService(worker_threads);
        return workerThreadService.analyzeMetafileSync(metafile, options);
      }
      let result;
      runServiceSync((service) => service.analyzeMetafile({
        callName: "analyzeMetafileSync",
        refs: null,
        metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
        options,
        callback: (err, res) => {
          if (err)
            throw err;
          result = res;
        }
      }));
      return result;
    };
    var initializeWasCalled = false;
    var initialize = (options) => {
      options = validateInitializeOptions(options || {});
      if (options.wasmURL)
        throw new Error(`The "wasmURL" option only works in the browser`);
      if (options.wasmModule)
        throw new Error(`The "wasmModule" option only works in the browser`);
      if (options.worker)
        throw new Error(`The "worker" option only works in the browser`);
      if (initializeWasCalled)
        throw new Error('Cannot call "initialize" more than once');
      ensureServiceIsRunning();
      initializeWasCalled = true;
      return Promise.resolve();
    };
    var defaultWD = process.cwd();
    var longLivedService;
    var ensureServiceIsRunning = () => {
      if (longLivedService)
        return longLivedService;
      let [command, args] = esbuildCommandAndArgs();
      let child = child_process.spawn(command, args.concat(`--service=${"0.14.49"}`, "--ping"), {
        windowsHide: true,
        stdio: ["pipe", "pipe", "inherit"],
        cwd: defaultWD
      });
      let { readFromStdout, afterClose, service } = createChannel({
        writeToStdin(bytes) {
          child.stdin.write(bytes, (err) => {
            if (err)
              afterClose(err);
          });
        },
        readFileSync: fs2.readFileSync,
        isSync: false,
        isWriteUnavailable: false,
        esbuild: node_exports
      });
      child.stdin.on("error", afterClose);
      child.on("error", afterClose);
      const stdin = child.stdin;
      const stdout = child.stdout;
      stdout.on("data", readFromStdout);
      stdout.on("end", afterClose);
      let refCount = 0;
      child.unref();
      if (stdin.unref) {
        stdin.unref();
      }
      if (stdout.unref) {
        stdout.unref();
      }
      const refs = {
        ref() {
          if (++refCount === 1)
            child.ref();
        },
        unref() {
          if (--refCount === 0)
            child.unref();
        }
      };
      longLivedService = {
        build: (options) => {
          return new Promise((resolve2, reject) => {
            service.buildOrServe({
              callName: "build",
              refs,
              serveOptions: null,
              options,
              isTTY: isTTY(),
              defaultWD,
              callback: (err, res) => err ? reject(err) : resolve2(res)
            });
          });
        },
        serve: (serveOptions, buildOptions) => {
          if (serveOptions === null || typeof serveOptions !== "object")
            throw new Error("The first argument must be an object");
          return new Promise((resolve2, reject) => service.buildOrServe({
            callName: "serve",
            refs,
            serveOptions,
            options: buildOptions,
            isTTY: isTTY(),
            defaultWD,
            callback: (err, res) => err ? reject(err) : resolve2(res)
          }));
        },
        transform: (input, options) => {
          return new Promise((resolve2, reject) => service.transform({
            callName: "transform",
            refs,
            input,
            options: options || {},
            isTTY: isTTY(),
            fs: fsAsync,
            callback: (err, res) => err ? reject(err) : resolve2(res)
          }));
        },
        formatMessages: (messages, options) => {
          return new Promise((resolve2, reject) => service.formatMessages({
            callName: "formatMessages",
            refs,
            messages,
            options,
            callback: (err, res) => err ? reject(err) : resolve2(res)
          }));
        },
        analyzeMetafile: (metafile, options) => {
          return new Promise((resolve2, reject) => service.analyzeMetafile({
            callName: "analyzeMetafile",
            refs,
            metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
            options,
            callback: (err, res) => err ? reject(err) : resolve2(res)
          }));
        }
      };
      return longLivedService;
    };
    var runServiceSync = (callback) => {
      let [command, args] = esbuildCommandAndArgs();
      let stdin = new Uint8Array();
      let { readFromStdout, afterClose, service } = createChannel({
        writeToStdin(bytes) {
          if (stdin.length !== 0)
            throw new Error("Must run at most one command");
          stdin = bytes;
        },
        isSync: true,
        isWriteUnavailable: false,
        esbuild: node_exports
      });
      callback(service);
      let stdout = child_process.execFileSync(command, args.concat(`--service=${"0.14.49"}`), {
        cwd: defaultWD,
        windowsHide: true,
        input: stdin,
        maxBuffer: +process.env.ESBUILD_MAX_BUFFER || 16 * 1024 * 1024
      });
      readFromStdout(stdout);
      afterClose(null);
    };
    var randomFileName = () => {
      return path22.join(os2.tmpdir(), `esbuild-${crypto.randomBytes(32).toString("hex")}`);
    };
    var workerThreadService = null;
    var startWorkerThreadService = (worker_threads2) => {
      let { port1: mainPort, port2: workerPort } = new worker_threads2.MessageChannel();
      let worker = new worker_threads2.Worker(__filename, {
        workerData: { workerPort, defaultWD, esbuildVersion: "0.14.49" },
        transferList: [workerPort],
        execArgv: []
      });
      let nextID = 0;
      let wasStopped = false;
      let fakeBuildError = (text) => {
        let error = new Error(`Build failed with 1 error:
error: ${text}`);
        let errors = [{ id: "", pluginName: "", text, location: null, notes: [], detail: void 0 }];
        error.errors = errors;
        error.warnings = [];
        return error;
      };
      let validateBuildSyncOptions = (options) => {
        if (!options)
          return;
        let plugins = options.plugins;
        let incremental = options.incremental;
        let watch = options.watch;
        if (plugins && plugins.length > 0)
          throw fakeBuildError(`Cannot use plugins in synchronous API calls`);
        if (incremental)
          throw fakeBuildError(`Cannot use "incremental" with a synchronous build`);
        if (watch)
          throw fakeBuildError(`Cannot use "watch" with a synchronous build`);
      };
      let applyProperties = (object, properties) => {
        for (let key2 in properties) {
          object[key2] = properties[key2];
        }
      };
      let runCallSync = (command, args) => {
        if (wasStopped)
          throw new Error("The service was stopped");
        let id = nextID++;
        let sharedBuffer = new SharedArrayBuffer(8);
        let sharedBufferView = new Int32Array(sharedBuffer);
        let msg = { sharedBuffer, id, command, args };
        worker.postMessage(msg);
        let status = Atomics.wait(sharedBufferView, 0, 0);
        if (status !== "ok" && status !== "not-equal")
          throw new Error("Internal error: Atomics.wait() failed: " + status);
        let { message: { id: id2, resolve: resolve2, reject, properties } } = worker_threads2.receiveMessageOnPort(mainPort);
        if (id !== id2)
          throw new Error(`Internal error: Expected id ${id} but got id ${id2}`);
        if (reject) {
          applyProperties(reject, properties);
          throw reject;
        }
        return resolve2;
      };
      worker.unref();
      return {
        buildSync(options) {
          validateBuildSyncOptions(options);
          return runCallSync("build", [options]);
        },
        transformSync(input, options) {
          return runCallSync("transform", [input, options]);
        },
        formatMessagesSync(messages, options) {
          return runCallSync("formatMessages", [messages, options]);
        },
        analyzeMetafileSync(metafile, options) {
          return runCallSync("analyzeMetafile", [metafile, options]);
        }
      };
    };
    var startSyncServiceWorker = () => {
      let workerPort = worker_threads.workerData.workerPort;
      let parentPort = worker_threads.parentPort;
      let service = ensureServiceIsRunning();
      defaultWD = worker_threads.workerData.defaultWD;
      let extractProperties = (object) => {
        let properties = {};
        if (object && typeof object === "object") {
          for (let key2 in object) {
            properties[key2] = object[key2];
          }
        }
        return properties;
      };
      parentPort.on("message", (msg) => {
        (async () => {
          let { sharedBuffer, id, command, args } = msg;
          let sharedBufferView = new Int32Array(sharedBuffer);
          try {
            switch (command) {
              case "build":
                workerPort.postMessage({ id, resolve: await service.build(args[0]) });
                break;
              case "transform":
                workerPort.postMessage({ id, resolve: await service.transform(args[0], args[1]) });
                break;
              case "formatMessages":
                workerPort.postMessage({ id, resolve: await service.formatMessages(args[0], args[1]) });
                break;
              case "analyzeMetafile":
                workerPort.postMessage({ id, resolve: await service.analyzeMetafile(args[0], args[1]) });
                break;
              default:
                throw new Error(`Invalid command: ${command}`);
            }
          } catch (reject) {
            workerPort.postMessage({ id, reject, properties: extractProperties(reject) });
          }
          Atomics.add(sharedBufferView, 0, 1);
          Atomics.notify(sharedBufferView, 0, Infinity);
        })();
      });
    };
    if (isInternalWorkerThread) {
      startSyncServiceWorker();
    }
    var node_default = node_exports;
  }
});

// src/runtime/edge-functions/WasmMemory.ts
var init_WasmMemory = __esm({
  "src/runtime/edge-functions/WasmMemory.ts"() {
    "use strict";
  }
});

// src/runtime/edge-functions/WasmProgram.ts
var init_WasmProgram = __esm({
  "src/runtime/edge-functions/WasmProgram.ts"() {
    "use strict";
    init_WasmMemory();
  }
});

// src/runtime/edge-functions/EdgeFunctionsWasmManager.ts
var EdgeFunctionsWasmManager;
var init_EdgeFunctionsWasmManager = __esm({
  "src/runtime/edge-functions/EdgeFunctionsWasmManager.ts"() {
    "use strict";
    EdgeFunctionsWasmManager = class {
      static async getWasmFileFromCache(filename) {
        if (this.cache[filename])
          return this.cache[filename];
        this.cache[filename] = await this.getWasmFile(filename);
        return this.cache[filename];
      }
      static async getQuickjsCompilerBytes() {
        return this.getWasmFileFromCache("quickjs-compiler.wasm");
      }
      static async getQuickjsRuntimeBytes() {
        return this.getWasmFileFromCache("quickjs-runtime.wasm");
      }
      static async getWasmFile(filename) {
        try {
          const { join: join6 } = require("path");
          const { promises } = require("fs");
          return promises.readFile(join6(__dirname, filename));
        } catch {
          const res = await fetch(`/${filename}`);
          return res.arrayBuffer();
        }
      }
    };
    EdgeFunctionsWasmManager.cache = {};
  }
});

// src/runtime/edge-functions/EdgeFunctionCompiler.ts
var init_EdgeFunctionCompiler = __esm({
  "src/runtime/edge-functions/EdgeFunctionCompiler.ts"() {
    "use strict";
    init_WasmProgram();
    init_EdgeFunctionsWasmManager();
  }
});

// src/deploy/edge-functions/paths.ts
function getQuickJSBytecodePath() {
  if (isCloud()) {
    return EDGE_FUNCTIONS_QUICKJS_BYTECODE_FILENAME;
  } else {
    return (0, import_path8.join)(process.cwd(), EDGE_FUNCTIONS_QUICKJS_BYTECODE_PATH);
  }
}
var import_path8;
var init_paths2 = __esm({
  "src/deploy/edge-functions/paths.ts"() {
    "use strict";
    init_paths();
    import_path8 = require("path");
    init_environment();
  }
});

// src/deploy/edge-functions/EdgeFunctionsNodeBuilder.ts
var import_esbuild;
var init_EdgeFunctionsNodeBuilder = __esm({
  "src/deploy/edge-functions/EdgeFunctionsNodeBuilder.ts"() {
    "use strict";
    init_EdgeFunctionsBuilder();
    import_esbuild = __toESM(require_main());
    init_environment();
    init_EdgeFunctionCompiler();
    init_paths2();
    init_edgeFunctionUtils();
  }
});

// src/deploy/edge-functions/index.ts
function getEdgeFunctionBytecode(rules = []) {
  if (!containsEdgeFunctionFeature(rules))
    return void 0;
  const path3 = getQuickJSBytecodePath();
  if (!(0, import_fs2.existsSync)(path3)) {
    return void 0;
  }
  return (0, import_fs2.readFileSync)(path3);
}
var import_fs2;
var init_edge_functions = __esm({
  "src/deploy/edge-functions/index.ts"() {
    "use strict";
    init_utils();
    init_edgeFunctionUtils();
    init_EdgeFunctionsNodeBuilder();
    init_paths2();
    import_fs2 = require("fs");
  }
});

// src/runtime/RequestHandler.ts
var import_path9, REDIRECT_STATUS_CODES, RequestHandler;
var init_RequestHandler = __esm({
  "src/runtime/RequestHandler.ts"() {
    "use strict";
    import_path9 = require("path");
    init_config();
    init_Router();
    init_Cache();
    init_PropertyContext();
    init_RequestContext();
    init_environment();
    init_paths();
    init_createEdgeConfig();
    init_edge_functions();
    init_constants();
    init_log();
    REDIRECT_STATUS_CODES = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    RequestHandler = class {
      constructor(basedir, injectOrigins = []) {
        this.basedir = basedir;
        this.injectOrigins = injectOrigins;
        this.config = {};
        if (isCacheEnabled()) {
          this.cache = new Cache();
        }
        if (isProductionBuild()) {
          this.reload();
        }
      }
      reload(router, propertyContext) {
        var _a2, _b;
        this.config = this.withOrigins(getConfig(!isProductionBuild()));
        const routerPath = (0, import_path9.resolve)((0, import_path9.join)(this.basedir, ROUTES_FILE_NAME));
        this.router = router ?? Router.load(routerPath);
        this.propertyContext = propertyContext ?? new PropertyContext({
          ...this.config,
          edge_functions: {
            quickjs_bytecode_base64: (_a2 = getEdgeFunctionBytecode(this.router.rules)) == null ? void 0 : _a2.toString("base64")
          }
        });
        delete require.cache[routerPath];
        (_b = this.cache) == null ? void 0 : _b.clear();
        return this.router;
      }
      withOrigins(config2) {
        return {
          ...config2,
          origins: [...config2.origins ?? [], ...this.injectOrigins]
        };
      }
      async handle(request, response) {
        try {
          if (this.router && this.propertyContext) {
            const serverlessHint = request.getHeader(EDGIO_SERVERLESS_HINT_HEADER);
            const context = this.createRequestContext(request, response);
            log_default.debug(`[RequestHandler] ${request.method} ${request.url}`);
            if (serverlessHint) {
              await context.executeServerless();
            } else {
              await context.executeSimulator();
            }
            log_default.debug(`[RequestHandler] response status: ${response.statusCode} ${response.statusMessage || ""}`);
            if (context.followRedirects && REDIRECT_STATUS_CODES.has(response.statusCode)) {
              context.followRedirects = false;
              await this.handleRedirects(request, response);
              if (context.followRedirects && REDIRECT_STATUS_CODES.has(response.statusCode)) {
                throw new Error("Too many internal redirects");
              }
            }
          } else {
            throw new Error("Server not yet initialized.");
          }
        } catch (e) {
          response.clear();
          response.statusCode = 500;
          response.statusMessage = "Internal Server Error";
          response.write(JSON.stringify({ error: e.stack }));
          response.end();
          response.stream();
          await response.waitForFlush();
        }
      }
      createRequestContext(request, response) {
        var _a2;
        return new RequestContext({
          request,
          response,
          propertyContext: this.propertyContext,
          rules: this.router.rules,
          edgeFunctions: {
            quickjs_bytecode_base64: (_a2 = getEdgeFunctionBytecode(this.router.rules)) == null ? void 0 : _a2.toString("base64")
          },
          cache: this.cache,
          functions: this.router.functions,
          interpolationValues: this.config.interpolationValues
        });
      }
      async handleRedirects(request, response) {
        const location = response.getHeader("location");
        const url2 = new URL(location);
        log_default.debug(`[RequestHandler] Following redirect to ${location}`);
        const clone = request.cloneOriginal();
        clone.url = url2.pathname + url2.search;
        clone.path = url2.pathname;
        response.clear();
        response.statusCode = 200;
        response.statusMessage = "OK";
        response.body = "";
        Object.keys(response.getHeaders()).forEach((header) => response.removeHeader(header));
        await this.handle(clone, response);
      }
      createEdgeConfig() {
        if (this.router && this.propertyContext) {
          return createEdgeConfig(this.propertyContext, this.router);
        } else {
          throw new Error("Not yet initialized.");
        }
      }
      createPreloadConfig() {
        if (!this.router) {
          throw new Error("Not yet initialized.");
        }
        return this.router.preloadRequests.getPreloadConfig();
      }
    };
  }
});

// src/lambda/innerHandler.ts
var innerHandler_exports = {};
__export(innerHandler_exports, {
  default: () => innerHandler
});
async function innerHandler(event, instance2) {
  const invocation = new LambdaInvocation(instance2);
  invocation.start();
  const driLogger = deepRequestInspectionLogger(instance2);
  await ensureAppStarted(3001);
  switch (event.action) {
    case "getEdgeConfig":
      return new RequestHandler(process.cwd(), getEdgioOrigins(true)).createEdgeConfig();
    case "getPreloadConfig":
      return withLogging(() => requestHandler.createPreloadConfig());
  }
  let req, res, responsePromise;
  try {
    const reqResResult = reqResMapper_default(event, invocation);
    req = reqResResult.req;
    res = reqResResult.res;
    responsePromise = reqResResult.responsePromise;
  } catch (e) {
    return withLogging(() => {
      console.log("Failed to parse the event to get request and response data:", e.message, e.stack);
      return {
        body: Buffer.from('{"error":"Failed to parse the event to get request and response data"}'),
        isBase64Encoded: true,
        statusCode: 530,
        statusMessage: "Internal Edgio Error",
        multiValueHeaders: {}
      };
    });
  }
  return await withLogging(async () => {
    const headers = req.headers || {};
    driLogger.logDownstreamRequestInfo({
      method: req.method,
      path: req.url,
      host: headers["host"],
      headers,
      protocol: `${headers[HTTP_HEADERS.xEdgeProtocol] || headers[HTTP_HEADERS.x0Protocol] || "https"}:`,
      ...getBodyLoggingData(req.rawBody, req.headers)
    });
    try {
      await ensureAppStarted(3001);
    } catch (error) {
      console.error(error);
      throw error;
    }
    withTimings(() => {
      return requestHandler.handle(req, res);
    })();
    return responsePromise.then((result) => {
      const headers2 = res.headers || {};
      driLogger.logDownstreamResponseInfo({
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        headers: headers2,
        ...getBodyLoggingData(result.body, res.headers)
      });
      return result;
    });
  }, req, instance2);
}
async function startApp(port) {
  const modulePath2 = (0, import_path10.join)(process.cwd(), pathForBackend(BACKENDS.js));
  if ((0, import_fs_extra.existsSync)(modulePath2)) {
    let prod = nonWebpackRequire(modulePath2);
    if (prod.default) {
      prod = prod.default;
    }
    const workingDir = process.cwd();
    await prod(port);
    process.chdir(workingDir);
  }
}
async function ensureAppStarted(port) {
  if (!appStartedPromise) {
    appStartedPromise = startApp(port);
  }
  return appStartedPromise;
}
function startLogging(req, lambdaInstance) {
  if (process.env.EDGIO_LOCAL !== "true" || process.env.EDGIO_LOCAL_CONSOLE_WRAP === "true") {
    stdStreamsWrapper_default.enable({
      clientIp: req && req.headers[HTTP_HEADERS.xEdgeClientIp] || req.headers[HTTP_HEADERS.x0ClientIp],
      requestId: req && req.headers[HTTP_HEADERS.xRequestId],
      wi: lambdaInstance == null ? void 0 : lambdaInstance.id
    });
  }
}
function stopLogging() {
  stdStreamsWrapper_default.disable();
}
async function withLogging(action, req, lambdaInstance) {
  try {
    startLogging(req, lambdaInstance);
    return await action();
  } finally {
    stopLogging();
  }
}
var import_fs_extra, import_path10, requestHandler, appStartedPromise;
var init_innerHandler = __esm({
  "src/lambda/innerHandler.ts"() {
    "use strict";
    init_constants();
    import_fs_extra = __toESM(require_lib());
    import_path10 = require("path");
    init_paths();
    init_timing();
    init_nonWebpackRequire();
    init_reqResMapper();
    init_stdStreamsWrapper();
    init_getBodyLoggingData();
    init_lambdaInstance();
    init_RequestHandler();
    init_origins();
    requestHandler = new RequestHandler(process.cwd(), getEdgioOrigins());
  }
});

// src/lambda/handler.ts
var handler_exports = {};
__export(handler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(handler_exports);
var { default: LambdaInstance3 } = (init_lambdaInstance(), __toCommonJS(lambdaInstance_exports));
var instance = new LambdaInstance3();
var { interceptRequests } = require_httpRequestInterceptor();
async function handler(event) {
  interceptRequests(event, {
    enableHttpRequestLogging: process.env.EDGIO_HTTP_REQUEST_LOGGING === "1",
    lambdaInstance: instance
  });
  return (async () => await (init_innerHandler(), __toCommonJS(innerHandler_exports)).default(event, instance))();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=handler.js.map
