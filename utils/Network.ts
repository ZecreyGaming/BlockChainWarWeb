import EventEmitter from "events";
import { PackageBase, MessageBase, ProtocolBase } from "./ProtocolBase";

var RES_OK = 200;
var RES_FAIL = 500;
var RES_OLD_CLIENT = 501;

export default class Network extends EventEmitter {
  public static Event = {
    CLOSE: "close",
    DISCONNECT: "disconnect",
    RECONNECT: "reconnect",
    IO_ERROR: "io-error",
    ERROR: "error",
    HEARTBEAT_TIMEOUT: "heartbeat_timeout",
    ON_KICK: "onKick",
    ON_MSG: "onMsg",
    ON_PUSH: "onPush",
  };

  private _initCallback: Function | null = null;
  private _handshakeCallback: Function | null = null;

  /** 网络配置项 */
  /** 最大重连数 */
  private _maxReconnectAttempts: number = 3;
  /** 最大心跳超时次数，心跳时间超时时间等于心跳时间乘最大心跳超时次数 */
  private _maxHeartbeatTimeoutTimes: number = 2;
  private _gapThreshold: number = 100;
  /** 重连延迟时间，单位为毫秒 */
  private _reconnectionDelay: number = 1000 * 5;
  /** socket连接后是否需要发送握手协议 */
  private _needSeedHandshake: boolean = true;

  /** 重连url */
  private _reconnectUrl: string | null = null;
  /** 是否需要重新连接 */
  private _reconnect: boolean = false;
  /** 重复连接次数 */
  private _reconnectAttempts: number = 0;
  /** 重连timer */
  private _reconncetTimer: number = 0;

  private _socket: WebSocket | null = null;
  private _handlers: any = {};
  private _callbacks: any = {};
  private _reqId: number = 0;
  private _routeMap: any = {};
  private _dict: any = {}; // route string to code
  private _abbrs: any = {}; // code to route string

  /** 心跳相关运行时变量 */
  private _heartbeatId: number = 0;
  private _heartbeatTimeout: number = 0;
  private _heartbeatTimeoutId: number = -1;
  private _nextHeartbeatTimeout: number = 0;
  private _heartbeatInterval: number = 0;

  /** 编解码相关 */
  private _encode: Function | null = null;
  private _decode: Function | null = null;
  private _package: PackageBase | null = null;
  private _message: MessageBase | null = null;
  private _protocol: ProtocolBase | null = null;

  protected _debug: boolean = false;

  constructor() {
    super();
  }

  public setDebug(debug: boolean) {
    this._debug = debug;
    this._package?.setDebug(this._debug);
    this._message?.setDebug(this._debug);
  }

  public get message() {
    return this._message;
  }

  public get protocol() {
    return this._protocol;
  }

  public get package() {
    return this._package;
  }

  /**
   *
   * @param params
   * {
   *     host: 服务器地址
   *     port: 服务器端口
   *     reconnect: 是否需要重连
   *     protocol: 基础消息协议
   *     package: 发送服务器包协议
   *     message: 接受服务器消息协议
   *     encode:
   *     decode:
   *     handshakeCallback: 握手回调
   *     maxReconnectAttempts: 最大连接次数
   *     maxHeartbeatTimeoutTimes: 最大心跳超时次数，心跳时间超时时间等于心跳时间乘最大心跳超时次数, 默认值是2
   *     heartbeatTriggerMode： 心跳触发方式, 0： 服务器触发 1：客户端触发， 默认值是0
   *     needSeedHandshake: socket连接后是否需要发送握手协议, 默认不发握手协议
   * }
   * @param cb
   */
  public init(params: any, cb?: any) {
    this._initCallback = cb;
    this._package = params.package;
    console.log("join init", this._package);
    this._message = params.message;
    this._protocol = params.protocol;
    this._debug = params.debug || this._debug;

    if (
      this._package == null ||
      this._message == null ||
      this._protocol == null
    ) {
      console.error("Network: init Fail!");
      return;
    }

    this._protocol.owner = this;
    this._message.owner = this;
    this._package.owner = this;
    this._protocol.setDebug(this._debug);
    this._package.setDebug(this._debug);
    this._message.setDebug(this._debug);

    this._encode = params.encode || this.defaultEncode;
    this._decode = params.decode || this.defaultDecode;

    this._maxReconnectAttempts =
      params.maxReconnectAttempts || this._maxReconnectAttempts;
    this._maxHeartbeatTimeoutTimes =
      params.maxHeartbeatTimeoutTimes || this._maxHeartbeatTimeoutTimes;
    this._needSeedHandshake =
      params.needSeedHandshake || this._needSeedHandshake;
    this._reqId = 0;
    this._handshakeCallback = params.handshakeCallback;

    this.connect(params, params.url, cb);
  }

  private connect(params: any, url: any, cb: any) {
    if (this._debug) console.info("Network.connect: url = " + url);

    this._reconnectUrl = url;
    var _params = params || {};
    let self = this;
    let onClose = function (event: any) {
      if (self._socket != null) {
        self.emit(Network.Event.CLOSE, event);
        self.emit(Network.Event.DISCONNECT, event);
        console.error("Network.onClose: closeEvent = ", event);
        if (
          _params.reconnect &&
          self._reconnectAttempts < self._maxReconnectAttempts
        ) {
          self._reconnect = true;
          self._reconnectAttempts++;
          self._reconncetTimer = setTimeout(function () {
            self.connect(_params, self._reconnectUrl, cb);
          }, self._reconnectionDelay) as unknown as number;
          self._reconnectionDelay *= 2;
        }
      }
    };

    this.initHandlers();

    // Init WebSocket
    this._socket = new WebSocket(url);
    this._socket.binaryType = "arraybuffer";
    this._socket.onopen = this.onOpen.bind(this);
    this._socket.onmessage = this.onMessage.bind(this);
    this._socket.onerror = this.onError.bind(this);
    this._socket.onclose = onClose;
  }

  private initHandlers() {
    this._handlers[this._package?.TYPE_HANDSHAKE || 0] =
      this.handshake.bind(this);
    this._handlers[this._package?.TYPE_HEARTBEAT || 0] =
      this.heartbeat.bind(this);
    this._handlers[this._package?.TYPE_DATA || 0] = this.onData.bind(this);
    this._handlers[this._package?.TYPE_KICK || 0] = this.onKick.bind(this);
  }

  public request(route: string, msg: any, cb?: any) {
    if (arguments.length === 2 && typeof msg === "function") {
      cb = msg;
      msg = {};
    } else {
      msg = msg || {};
    }

    route = route || msg.route;
    if (!route) {
      return;
    }

    this._reqId++;
    this.sendMessage(this._reqId, route, msg);

    this._callbacks[this._reqId] = cb;
    this._routeMap[this._reqId] = route;
  }

  public notify(route: string, msg: any) {
    msg = msg || {};
    this.sendMessage(0, route, msg);
  }

  private sendMessage(reqId: number, route: string, msg: any) {
    console.log("join", route, msg, this._package);

    // if (this._debug)
    //   console.log(
    //     `Network.sendMessage: reqId = ${reqId}, route = ${route}, msg = ${JSON.stringify(
    //       msg
    //     )}`
    //   );
    if (this._encode) {
      msg = this._encode(reqId, route, msg);
    }
    var packet = this._package?.encode(this._package.TYPE_DATA, msg);
    this.send(packet);
  }

  public disconnect() {
    if (this._socket) {
      let socket = this._socket;
      if ((socket as any).disconnect) (socket as any).disconnect();
      if (socket.close) socket.close();
      if ((this as any).logOn) {
        console.info("Network: disconnect");
      }
      this._socket = null;
    }

    if (this._heartbeatId > 0) {
      clearTimeout(this._heartbeatId);
      this._heartbeatId = 0;
    }

    if (this._heartbeatTimeoutId > -1) {
      clearTimeout(this._heartbeatTimeoutId);
      this._heartbeatTimeoutId = -1;
    }
  }

  private onOpen() {
    console.log("Network.onOpen: ws open");
    if (this._reconnect == true) {
      this.emit(Network.Event.RECONNECT);
    }
    this.reset();
    if (this._needSeedHandshake == true) {
      console.log("Network.onOpen: send handshake");
      var pck = this._package?.encode(
        this._package?.TYPE_HANDSHAKE,
        this._package?.strencode(JSON.stringify(this._package.handshakeBuffer))
      );
      this.send(pck?.buffer);
    }
  }

  private reset() {
    this._reconnect = false;
    this._reconnectionDelay = 1000 * 5;
    this._reconnectAttempts = 0;
    if (this._reconncetTimer > 0) {
      clearTimeout(this._reconncetTimer);
      this._reconncetTimer = 0;
    }
  }

  private onMessage(evt: MessageEvent) {
    // if (this._debug) console.info("Network.onMessage: ", evt.data);
    this.processPackage(this._package?.decode(evt.data));
    // new package arrived, update the heartbeat timeout
    if (this._heartbeatTimeout) {
      this._nextHeartbeatTimeout = Date.now() + this._heartbeatTimeout;
    }
  }

  private onError() {
    this.emit(Network.Event.IO_ERROR);
    console.error("Network.onError: io-error = ", event);
  }

  private send(buffer?: ArrayBuffer) {
    if (this._socket) {
      // if (this._debug) console.info("Network.send: ", buffer);
      this._socket.send(buffer || new ArrayBuffer(0));
    }
  }

  private processPackage(msgs: any) {
    if (msgs == null) {
      if (this._debug) console.error("Network.processPackage: msgs is null!");
      return;
    }
    // if (this._debug) console.log(`Network.processPackage: type = ${msgs.type}`);
    if (Array.isArray(msgs)) {
      for (var i = 0; i < msgs.length; i++) {
        let msg = msgs[i];
        let type = this._package?.getPckType(msg);
        let handler = this._handlers[type];
        if (handler != null) {
          let body = this._package?.getPckBody(msg);
          handler(body);
        } else {
          console.warn(
            "Network.processPackage.Array: handler not found, type = " +
              msg.type
          );
        }
      }
    } else {
      let type = this._package?.getPckType(msgs);
      let handler = this._handlers[type];
      if (handler != null) {
        let body = this._package?.getPckBody(msgs);
        handler(body);
      } else {
        console.warn(
          "Network.processPackage: handler not found, type = " + msgs.type
        );
      }
    }
  }

  private processMessage(msg: any) {
    // if (this._debug) console.log(`Network.processMessage: msg.type = ${msg.type}, msg.id = ${msg.id},  msg.body = ${JSON.stringify(msg.body)}`);
    if (!msg.id) {
      this.emit(Network.Event.ON_PUSH, msg.route, msg.body);
      return;
    }
    var cb = this._callbacks[msg.id];
    delete this._callbacks[msg.id];
    if (typeof cb !== "function") return;
    cb(msg.body);
    this.emit(Network.Event.ON_MSG, msg.route, msg);
  }

  public heartbeat() {
    if (this._heartbeatInterval <= 0) {
      return;
    }

    if (this._heartbeatTimeoutId) {
      clearTimeout(this._heartbeatTimeoutId);
      this._heartbeatTimeoutId = 0;
    }

    if (this._heartbeatId) {
      return;
    }

    var pck = this._package?.encode(this._package.TYPE_HEARTBEAT);
    this._heartbeatId = setTimeout(() => {
      this._heartbeatId = 0;
      this.send(pck?.buffer);
      this._nextHeartbeatTimeout = Date.now() + this._heartbeatTimeout;
      this._heartbeatTimeoutId = setTimeout(
        this.heartbeatTimeoutCb.bind(this),
        this._heartbeatTimeout
      ) as unknown as number;
    }, this._heartbeatInterval) as unknown as number;
  }

  private heartbeatTimeoutCb() {
    var gap = this._nextHeartbeatTimeout - Date.now();
    if (gap > this._gapThreshold) {
      this._heartbeatTimeoutId = setTimeout(
        this.heartbeatTimeoutCb.bind(this),
        gap
      ) as unknown as number;
    } else {
      this.emit(Network.Event.HEARTBEAT_TIMEOUT);
      console.error("Network: heartbeat timeout");
      this.disconnect();
    }
  }

  private handshake(data: ArrayBuffer | any) {
    let s = this._protocol?.strdecode(data);
    let d: any = JSON.parse(s || "");

    if (this._debug) console.log("Network.handshake: data = " + s);
    if (d.code === RES_OLD_CLIENT) {
      this.emit(Network.Event.ERROR, "client version old!");
      console.error("Network: client version old!");
      return;
    }

    if (d.code !== RES_OK) {
      this.emit(Network.Event.ERROR, "handshake fail!");
      console.error("Network: handshake fail!");
      return;
    }

    this.handshakeInit(d);

    var obj = this._package?.encode(this._package.TYPE_HANDSHAKE_ACK);
    this.send(obj?.buffer);

    if (this._initCallback) {
      this._initCallback(this._socket);
    }
  }

  private handshakeInit(data: any) {
    if (data.sys && data.sys.heartbeat) {
      this._heartbeatInterval = data.sys.heartbeat * 1000; // heartbeat interval
      this._heartbeatTimeout =
        this._heartbeatInterval * this._maxHeartbeatTimeoutTimes; // max heartbeat timeout
    } else {
      this._heartbeatInterval = 0;
      this._heartbeatTimeout = 0;
    }

    this.initData(data);

    if (this._handshakeCallback instanceof Function) {
      this._handshakeCallback(data.user);
    }
  }

  private initData(data: any) {
    if (!data || !data.sys) {
      return;
    }

    let dict = data.sys.dict;
    if (dict) {
      this._dict = dict;
      this._abbrs = {};
      for (var route in dict) {
        this._abbrs[dict[route]] = route;
      }
    }
  }

  private onData(data: any) {
    var msg = data;
    if (this._decode) msg = this._decode(msg);
    this.processMessage(msg);
  }

  private onKick(data: any) {
    this.emit(Network.Event.ON_KICK, data);
  }

  private defaultEncode(reqId: any, route: any, msg: any) {
    var type = reqId ? this._message?.TYPE_REQUEST : this._message?.TYPE_NOTIFY;
    msg = this._protocol?.strencode(JSON.stringify(msg));

    var compressRoute = 0;
    if (this._dict && this._dict[route]) {
      route = this._dict[route];
      compressRoute = 1;
    }

    return this._message?.encode(reqId, type || 0, compressRoute, route, msg);
  }

  private defaultDecode(data: any) {
    var msg = this._message?.decode(data);
    if (msg && msg.id > 0) {
      msg.route = this._routeMap[msg.id];
      delete this._routeMap[msg.id];
      if (!msg.route) {
        return;
      }
    }
    if (msg) msg.body = this.deCompose(msg);
    return msg;
  }

  private deCompose(msg: any) {
    var route = msg.route;
    if (msg.compressRoute) {
      if (!this._abbrs[route]) {
        return {};
      }
      route = msg.route = this._abbrs[route];
    }
    let s = this._protocol?.strdecode(msg.body);
    return JSON.parse(s || "");
  }

  public emit(msg: string, param1: any = null, param2: any = null) {
    return super.emit(msg, param1, param2);
  }
}
