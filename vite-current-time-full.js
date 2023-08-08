function vt(e, t) {
  const n = /* @__PURE__ */ Object.create(null), o = e.split(",");
  for (let r = 0; r < o.length; r++)
    n[o[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const Ts = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", $s = /* @__PURE__ */ vt(Ts);
function fr(e) {
  return !!e || e === "";
}
function oo(e) {
  if (C(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], r = Q(o) ? Ps(o) : oo(o);
      if (r)
        for (const s in r)
          t[s] = r[s];
    }
    return t;
  } else {
    if (Q(e))
      return e;
    if (z(e))
      return e;
  }
}
const Is = /;(?![^(]*\))/g, As = /:(.+)/;
function Ps(e) {
  const t = {};
  return e.split(Is).forEach((n) => {
    if (n) {
      const o = n.split(As);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function ro(e) {
  let t = "";
  if (Q(e))
    t = e;
  else if (C(e))
    for (let n = 0; n < e.length; n++) {
      const o = ro(e[n]);
      o && (t += o + " ");
    }
  else if (z(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ms = (e) => Q(e) ? e : e == null ? "" : C(e) || z(e) && (e.toString === pr || !$(e.toString)) ? JSON.stringify(e, ur, 2) : String(e), ur = (e, t) => t && t.__v_isRef ? ur(e, t.value) : tt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [o, r]) => (n[`${o} =>`] = r, n), {})
} : dr(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : z(t) && !C(t) && !hr(t) ? String(t) : t, U = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, mt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], ne = () => {
}, ar = () => !1, Rs = /^on[^a-z]/, St = (e) => Rs.test(e), tn = (e) => e.startsWith("onUpdate:"), X = Object.assign, so = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Ss = Object.prototype.hasOwnProperty, M = (e, t) => Ss.call(e, t), C = Array.isArray, tt = (e) => un(e) === "[object Map]", dr = (e) => un(e) === "[object Set]", $ = (e) => typeof e == "function", Q = (e) => typeof e == "string", io = (e) => typeof e == "symbol", z = (e) => e !== null && typeof e == "object", co = (e) => z(e) && $(e.then) && $(e.catch), pr = Object.prototype.toString, un = (e) => pr.call(e), lo = (e) => un(e).slice(8, -1), hr = (e) => un(e) === "[object Object]", fo = (e) => Q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Yt = /* @__PURE__ */ vt(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Fs = /* @__PURE__ */ vt("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), an = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, js = /-(\w)/g, Ke = an((e) => e.replace(js, (t, n) => n ? n.toUpperCase() : "")), Ls = /\B([A-Z])/g, ve = an((e) => e.replace(Ls, "-$1").toLowerCase()), dn = an((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ze = an((e) => e ? `on${dn(e)}` : ""), $t = (e, t) => !Object.is(e, t), Ot = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, nn = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Rn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let To;
const _r = () => To || (To = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Sn(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let De;
class Hs {
  constructor(t = !1) {
    this.active = !0, this.effects = [], this.cleanups = [], !t && De && (this.parent = De, this.index = (De.scopes || (De.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = De;
      try {
        return De = this, t();
      } finally {
        De = n;
      }
    } else
      process.env.NODE_ENV !== "production" && Sn("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    De = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    De = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, o = this.scopes.length; n < o; n++)
          this.scopes[n].stop(!0);
      if (this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.active = !1;
    }
  }
}
function Us(e, t = De) {
  t && t.active && t.effects.push(e);
}
const It = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, mr = (e) => (e.w & We) > 0, gr = (e) => (e.n & We) > 0, ks = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= We;
}, Bs = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let o = 0; o < t.length; o++) {
      const r = t[o];
      mr(r) && !gr(r) ? r.delete(e) : t[n++] = r, r.w &= ~We, r.n &= ~We;
    }
    t.length = n;
  }
}, Fn = /* @__PURE__ */ new WeakMap();
let Dt = 0, We = 1;
const jn = 30;
let fe;
const nt = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Ln = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class uo {
  constructor(t, n = null, o) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Us(this, o);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = fe, n = Be;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = fe, fe = this, Be = !0, We = 1 << ++Dt, Dt <= jn ? ks(this) : $o(this), this.fn();
    } finally {
      Dt <= jn && Bs(this), We = 1 << --Dt, fe = this.parent, Be = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    fe === this ? this.deferStop = !0 : this.active && ($o(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function $o(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Be = !0;
const Er = [];
function lt() {
  Er.push(Be), Be = !1;
}
function ft() {
  const e = Er.pop();
  Be = e === void 0 ? !0 : e;
}
function pe(e, t, n) {
  if (Be && fe) {
    let o = Fn.get(e);
    o || Fn.set(e, o = /* @__PURE__ */ new Map());
    let r = o.get(n);
    r || o.set(n, r = It());
    const s = process.env.NODE_ENV !== "production" ? { effect: fe, target: e, type: t, key: n } : void 0;
    Hn(r, s);
  }
}
function Hn(e, t) {
  let n = !1;
  Dt <= jn ? gr(e) || (e.n |= We, n = !mr(e)) : n = !e.has(fe), n && (e.add(fe), fe.deps.push(e), process.env.NODE_ENV !== "production" && fe.onTrack && fe.onTrack(Object.assign({ effect: fe }, t)));
}
function Se(e, t, n, o, r, s) {
  const i = Fn.get(e);
  if (!i)
    return;
  let l = [];
  if (t === "clear")
    l = [...i.values()];
  else if (n === "length" && C(e))
    i.forEach((a, h) => {
      (h === "length" || h >= o) && l.push(a);
    });
  else
    switch (n !== void 0 && l.push(i.get(n)), t) {
      case "add":
        C(e) ? fo(n) && l.push(i.get("length")) : (l.push(i.get(nt)), tt(e) && l.push(i.get(Ln)));
        break;
      case "delete":
        C(e) || (l.push(i.get(nt)), tt(e) && l.push(i.get(Ln)));
        break;
      case "set":
        tt(e) && l.push(i.get(nt));
        break;
    }
  const f = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: o, oldValue: r, oldTarget: s } : void 0;
  if (l.length === 1)
    l[0] && (process.env.NODE_ENV !== "production" ? pt(l[0], f) : pt(l[0]));
  else {
    const a = [];
    for (const h of l)
      h && a.push(...h);
    process.env.NODE_ENV !== "production" ? pt(It(a), f) : pt(It(a));
  }
}
function pt(e, t) {
  const n = C(e) ? e : [...e];
  for (const o of n)
    o.computed && Io(o, t);
  for (const o of n)
    o.computed || Io(o, t);
}
function Io(e, t) {
  (e !== fe || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(X({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const Ks = /* @__PURE__ */ vt("__proto__,__v_isRef,__isVue"), Nr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(io)
), Ws = /* @__PURE__ */ pn(), zs = /* @__PURE__ */ pn(!1, !0), qs = /* @__PURE__ */ pn(!0), Js = /* @__PURE__ */ pn(!0, !0), Ao = /* @__PURE__ */ Ys();
function Ys() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const o = A(this);
      for (let s = 0, i = this.length; s < i; s++)
        pe(o, "get", s + "");
      const r = o[t](...n);
      return r === -1 || r === !1 ? o[t](...n.map(A)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      lt();
      const o = A(this)[t].apply(this, n);
      return ft(), o;
    };
  }), e;
}
function pn(e = !1, t = !1) {
  return function(o, r, s) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && s === (e ? t ? Vr : xr : t ? Dr : wr).get(o))
      return o;
    const i = C(o);
    if (!e && i && M(Ao, r))
      return Reflect.get(Ao, r, s);
    const l = Reflect.get(o, r, s);
    return (io(r) ? Nr.has(r) : Ks(r)) || (e || pe(o, "get", r), t) ? l : te(l) ? i && fo(r) ? l : l.value : z(l) ? e ? Cr(l) : po(l) : l;
  };
}
const Zs = /* @__PURE__ */ vr(), Xs = /* @__PURE__ */ vr(!0);
function vr(e = !1) {
  return function(n, o, r, s) {
    let i = n[o];
    if (ze(i) && te(i) && !te(r))
      return !1;
    if (!e && (!on(r) && !ze(r) && (i = A(i), r = A(r)), !C(n) && te(i) && !te(r)))
      return i.value = r, !0;
    const l = C(n) && fo(o) ? Number(o) < n.length : M(n, o), f = Reflect.set(n, o, r, s);
    return n === A(s) && (l ? $t(r, i) && Se(n, "set", o, r, i) : Se(n, "add", o, r)), f;
  };
}
function Qs(e, t) {
  const n = M(e, t), o = e[t], r = Reflect.deleteProperty(e, t);
  return r && n && Se(e, "delete", t, void 0, o), r;
}
function Gs(e, t) {
  const n = Reflect.has(e, t);
  return (!io(t) || !Nr.has(t)) && pe(e, "has", t), n;
}
function ei(e) {
  return pe(e, "iterate", C(e) ? "length" : nt), Reflect.ownKeys(e);
}
const br = {
  get: Ws,
  set: Zs,
  deleteProperty: Qs,
  has: Gs,
  ownKeys: ei
}, yr = {
  get: qs,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && Sn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && Sn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, ti = /* @__PURE__ */ X({}, br, {
  get: zs,
  set: Xs
}), ni = /* @__PURE__ */ X({}, yr, {
  get: Js
}), ao = (e) => e, hn = (e) => Reflect.getPrototypeOf(e);
function Kt(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const r = A(e), s = A(t);
  n || (t !== s && pe(r, "get", t), pe(r, "get", s));
  const { has: i } = hn(r), l = o ? ao : n ? ho : At;
  if (i.call(r, t))
    return l(e.get(t));
  if (i.call(r, s))
    return l(e.get(s));
  e !== r && e.get(t);
}
function Wt(e, t = !1) {
  const n = this.__v_raw, o = A(n), r = A(e);
  return t || (e !== r && pe(o, "has", e), pe(o, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function zt(e, t = !1) {
  return e = e.__v_raw, !t && pe(A(e), "iterate", nt), Reflect.get(e, "size", e);
}
function Po(e) {
  e = A(e);
  const t = A(this);
  return hn(t).has.call(t, e) || (t.add(e), Se(t, "add", e, e)), this;
}
function Mo(e, t) {
  t = A(t);
  const n = A(this), { has: o, get: r } = hn(n);
  let s = o.call(n, e);
  s ? process.env.NODE_ENV !== "production" && Or(n, o, e) : (e = A(e), s = o.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), s ? $t(t, i) && Se(n, "set", e, t, i) : Se(n, "add", e, t), this;
}
function Ro(e) {
  const t = A(this), { has: n, get: o } = hn(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && Or(t, n, e) : (e = A(e), r = n.call(t, e));
  const s = o ? o.call(t, e) : void 0, i = t.delete(e);
  return r && Se(t, "delete", e, void 0, s), i;
}
function So() {
  const e = A(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? tt(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && Se(e, "clear", void 0, void 0, n), o;
}
function qt(e, t) {
  return function(o, r) {
    const s = this, i = s.__v_raw, l = A(i), f = t ? ao : e ? ho : At;
    return !e && pe(l, "iterate", nt), i.forEach((a, h) => o.call(r, f(a), f(h), s));
  };
}
function Jt(e, t, n) {
  return function(...o) {
    const r = this.__v_raw, s = A(r), i = tt(s), l = e === "entries" || e === Symbol.iterator && i, f = e === "keys" && i, a = r[e](...o), h = n ? ao : t ? ho : At;
    return !t && pe(s, "iterate", f ? Ln : nt), {
      // iterator protocol
      next() {
        const { value: d, done: g } = a.next();
        return g ? { value: d, done: g } : {
          value: l ? [h(d[0]), h(d[1])] : h(d),
          done: g
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Le(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${dn(e)} operation ${n}failed: target is readonly.`, A(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function oi() {
  const e = {
    get(s) {
      return Kt(this, s);
    },
    get size() {
      return zt(this);
    },
    has: Wt,
    add: Po,
    set: Mo,
    delete: Ro,
    clear: So,
    forEach: qt(!1, !1)
  }, t = {
    get(s) {
      return Kt(this, s, !1, !0);
    },
    get size() {
      return zt(this);
    },
    has: Wt,
    add: Po,
    set: Mo,
    delete: Ro,
    clear: So,
    forEach: qt(!1, !0)
  }, n = {
    get(s) {
      return Kt(this, s, !0);
    },
    get size() {
      return zt(this, !0);
    },
    has(s) {
      return Wt.call(this, s, !0);
    },
    add: Le(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Le(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Le(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Le(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: qt(!0, !1)
  }, o = {
    get(s) {
      return Kt(this, s, !0, !0);
    },
    get size() {
      return zt(this, !0);
    },
    has(s) {
      return Wt.call(this, s, !0);
    },
    add: Le(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Le(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Le(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Le(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: qt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e[s] = Jt(s, !1, !1), n[s] = Jt(s, !0, !1), t[s] = Jt(s, !1, !0), o[s] = Jt(s, !0, !0);
  }), [
    e,
    n,
    t,
    o
  ];
}
const [ri, si, ii, ci] = /* @__PURE__ */ oi();
function _n(e, t) {
  const n = t ? e ? ci : ii : e ? si : ri;
  return (o, r, s) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? o : Reflect.get(M(n, r) && r in o ? n : o, r, s);
}
const li = {
  get: /* @__PURE__ */ _n(!1, !1)
}, fi = {
  get: /* @__PURE__ */ _n(!1, !0)
}, ui = {
  get: /* @__PURE__ */ _n(!0, !1)
}, ai = {
  get: /* @__PURE__ */ _n(!0, !0)
};
function Or(e, t, n) {
  const o = A(n);
  if (o !== n && t.call(e, o)) {
    const r = lo(e);
    console.warn(`Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const wr = /* @__PURE__ */ new WeakMap(), Dr = /* @__PURE__ */ new WeakMap(), xr = /* @__PURE__ */ new WeakMap(), Vr = /* @__PURE__ */ new WeakMap();
function di(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function pi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : di(lo(e));
}
function po(e) {
  return ze(e) ? e : mn(e, !1, br, li, wr);
}
function hi(e) {
  return mn(e, !1, ti, fi, Dr);
}
function Cr(e) {
  return mn(e, !0, yr, ui, xr);
}
function ht(e) {
  return mn(e, !0, ni, ai, Vr);
}
function mn(e, t, n, o, r) {
  if (!z(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = r.get(e);
  if (s)
    return s;
  const i = pi(e);
  if (i === 0)
    return e;
  const l = new Proxy(e, i === 2 ? o : n);
  return r.set(e, l), l;
}
function ot(e) {
  return ze(e) ? ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ze(e) {
  return !!(e && e.__v_isReadonly);
}
function on(e) {
  return !!(e && e.__v_isShallow);
}
function Un(e) {
  return ot(e) || ze(e);
}
function A(e) {
  const t = e && e.__v_raw;
  return t ? A(t) : e;
}
function Tr(e) {
  return nn(e, "__v_skip", !0), e;
}
const At = (e) => z(e) ? po(e) : e, ho = (e) => z(e) ? Cr(e) : e;
function $r(e) {
  Be && fe && (e = A(e), process.env.NODE_ENV !== "production" ? Hn(e.dep || (e.dep = It()), {
    target: e,
    type: "get",
    key: "value"
  }) : Hn(e.dep || (e.dep = It())));
}
function Ir(e, t) {
  e = A(e), e.dep && (process.env.NODE_ENV !== "production" ? pt(e.dep, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : pt(e.dep));
}
function te(e) {
  return !!(e && e.__v_isRef === !0);
}
function Fo(e) {
  return _i(e, !1);
}
function _i(e, t) {
  return te(e) ? e : new mi(e, t);
}
class mi {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : A(t), this._value = n ? t : At(t);
  }
  get value() {
    return $r(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || on(t) || ze(t);
    t = n ? t : A(t), $t(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : At(t), Ir(this, t));
  }
}
function Ar(e) {
  return te(e) ? e.value : e;
}
const gi = {
  get: (e, t, n) => Ar(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return te(r) && !te(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Pr(e) {
  return ot(e) ? e : new Proxy(e, gi);
}
var Mr;
class Ei {
  constructor(t, n, o, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Mr] = !1, this._dirty = !0, this.effect = new uo(t, () => {
      this._dirty || (this._dirty = !0, Ir(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = o;
  }
  get value() {
    const t = A(this);
    return $r(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
Mr = "__v_isReadonly";
function Ni(e, t, n = !1) {
  let o, r;
  const s = $(e);
  s ? (o = e, r = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : ne) : (o = e.get, r = e.set);
  const i = new Ei(o, r, s || !r, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
const rt = [];
function Zt(e) {
  rt.push(e);
}
function Xt() {
  rt.pop();
}
function y(e, ...t) {
  lt();
  const n = rt.length ? rt[rt.length - 1].component : null, o = n && n.appContext.config.warnHandler, r = vi();
  if (o)
    Re(o, n, 11, [
      e + t.join(""),
      n && n.proxy,
      r.map(({ vnode: s }) => `at <${wn(n, s.type)}>`).join(`
`),
      r
    ]);
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    r.length && s.push(`
`, ...bi(r)), console.warn(...s);
  }
  ft();
}
function vi() {
  let e = rt[rt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function bi(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...yi(n));
  }), t;
}
function yi({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, r = ` at <${wn(e.component, e.type, o)}`, s = ">" + n;
  return e.props ? [r, ...Oi(e.props), s] : [r + s];
}
function Oi(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...Rr(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Rr(e, t, n) {
  return Q(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : te(t) ? (t = Rr(e, A(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : $(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = A(t), n ? t : [`${e}=`, t]);
}
const _o = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function Re(e, t, n, o) {
  let r;
  try {
    r = o ? e(...o) : e();
  } catch (s) {
    gn(s, t, n);
  }
  return r;
}
function me(e, t, n, o) {
  if ($(e)) {
    const s = Re(e, t, n, o);
    return s && co(s) && s.catch((i) => {
      gn(i, t, n);
    }), s;
  }
  const r = [];
  for (let s = 0; s < e.length; s++)
    r.push(me(e[s], t, n, o));
  return r;
}
function gn(e, t, n, o = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy, l = process.env.NODE_ENV !== "production" ? _o[n] : n;
    for (; s; ) {
      const a = s.ec;
      if (a) {
        for (let h = 0; h < a.length; h++)
          if (a[h](e, i, l) === !1)
            return;
      }
      s = s.parent;
    }
    const f = t.appContext.config.errorHandler;
    if (f) {
      Re(f, null, 10, [e, i, l]);
      return;
    }
  }
  wi(e, n, r, o);
}
function wi(e, t, n, o = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = _o[t];
    if (n && Zt(n), y(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Xt(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let rn = !1, kn = !1;
const oe = [];
let Ve = 0;
const gt = [];
let xe = null, He = 0;
const Sr = /* @__PURE__ */ Promise.resolve();
let mo = null;
const Di = 100;
function Fr(e) {
  const t = mo || Sr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function xi(e) {
  let t = Ve + 1, n = oe.length;
  for (; t < n; ) {
    const o = t + n >>> 1;
    Pt(oe[o]) < e ? t = o + 1 : n = o;
  }
  return t;
}
function En(e) {
  (!oe.length || !oe.includes(e, rn && e.allowRecurse ? Ve + 1 : Ve)) && (e.id == null ? oe.push(e) : oe.splice(xi(e.id), 0, e), jr());
}
function jr() {
  !rn && !kn && (kn = !0, mo = Sr.then(Ur));
}
function Vi(e) {
  const t = oe.indexOf(e);
  t > Ve && oe.splice(t, 1);
}
function Lr(e) {
  C(e) ? gt.push(...e) : (!xe || !xe.includes(e, e.allowRecurse ? He + 1 : He)) && gt.push(e), jr();
}
function jo(e, t = Ve) {
  for (process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()); t < oe.length; t++) {
    const n = oe[t];
    if (n && n.pre) {
      if (process.env.NODE_ENV !== "production" && go(e, n))
        continue;
      oe.splice(t, 1), t--, n();
    }
  }
}
function Hr(e) {
  if (gt.length) {
    const t = [...new Set(gt)];
    if (gt.length = 0, xe) {
      xe.push(...t);
      return;
    }
    for (xe = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), xe.sort((n, o) => Pt(n) - Pt(o)), He = 0; He < xe.length; He++)
      process.env.NODE_ENV !== "production" && go(e, xe[He]) || xe[He]();
    xe = null, He = 0;
  }
}
const Pt = (e) => e.id == null ? 1 / 0 : e.id, Ci = (e, t) => {
  const n = Pt(e) - Pt(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Ur(e) {
  kn = !1, rn = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), oe.sort(Ci);
  const t = process.env.NODE_ENV !== "production" ? (n) => go(e, n) : ne;
  try {
    for (Ve = 0; Ve < oe.length; Ve++) {
      const n = oe[Ve];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        Re(
          n,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    Ve = 0, oe.length = 0, Hr(e), rn = !1, mo = null, (oe.length || gt.length) && Ur(e);
  }
}
function go(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Di) {
      const o = t.ownerInstance, r = o && Os(o.type);
      return y(`Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
let st = !1;
const dt = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (_r().__VUE_HMR_RUNTIME__ = {
  createRecord: Cn(kr),
  rerender: Cn(Ii),
  reload: Cn(Ai)
});
const ct = /* @__PURE__ */ new Map();
function Ti(e) {
  const t = e.type.__hmrId;
  let n = ct.get(t);
  n || (kr(t, e.type), n = ct.get(t)), n.instances.add(e);
}
function $i(e) {
  ct.get(e.type.__hmrId).instances.delete(e);
}
function kr(e, t) {
  return ct.has(e) ? !1 : (ct.set(e, {
    initialDef: Vt(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Vt(e) {
  return ws(e) ? e.__vccOpts : e;
}
function Ii(e, t) {
  const n = ct.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Vt(o.type).render = t), o.renderCache = [], st = !0, o.update(), st = !1;
  }));
}
function Ai(e, t) {
  const n = ct.get(e);
  if (!n)
    return;
  t = Vt(t), Lo(n.initialDef, t);
  const o = [...n.instances];
  for (const r of o) {
    const s = Vt(r.type);
    dt.has(s) || (s !== n.initialDef && Lo(s, t), dt.add(s)), r.appContext.optionsCache.delete(r.type), r.ceReload ? (dt.add(s), r.ceReload(t.styles), dt.delete(s)) : r.parent ? (En(r.parent.update), r.parent.type.__asyncLoader && r.parent.ceReload && r.parent.ceReload(t.styles)) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  Lr(() => {
    for (const r of o)
      dt.delete(Vt(r.type));
  });
}
function Lo(e, t) {
  X(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Cn(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let Qe, xt = [], Bn = !1;
function Ft(e, ...t) {
  Qe ? Qe.emit(e, ...t) : Bn || xt.push({ event: e, args: t });
}
function Br(e, t) {
  var n, o;
  Qe = e, Qe ? (Qe.enabled = !0, xt.forEach(({ event: r, args: s }) => Qe.emit(r, ...s)), xt = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  !(!((o = (n = window.navigator) === null || n === void 0 ? void 0 : n.userAgent) === null || o === void 0) && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    Br(s, t);
  }), setTimeout(() => {
    Qe || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Bn = !0, xt = []);
  }, 3e3)) : (Bn = !0, xt = []);
}
function Pi(e, t) {
  Ft("app:init", e, t, {
    Fragment: he,
    Text: bn,
    Comment: se,
    Static: Gt
  });
}
function Mi(e) {
  Ft("app:unmount", e);
}
const Ri = /* @__PURE__ */ Eo(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
), Kr = /* @__PURE__ */ Eo(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
), Si = /* @__PURE__ */ Eo(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
);
function Eo(e) {
  return (t) => {
    Ft(e, t.appContext.app, t.uid, t.parent ? t.parent.uid : void 0, t);
  };
}
const Fi = /* @__PURE__ */ Wr(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
), ji = /* @__PURE__ */ Wr(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function Wr(e) {
  return (t, n, o) => {
    Ft(e, t.appContext.app, t.uid, t, n, o);
  };
}
function Li(e, t, n) {
  Ft("component:emit", e.appContext.app, e, t, n);
}
function Hi(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const o = e.vnode.props || U;
  if (process.env.NODE_ENV !== "production") {
    const { emitsOptions: h, propsOptions: [d] } = e;
    if (h)
      if (!(t in h))
        (!d || !(Ze(t) in d)) && y(`Component emitted event "${t}" but it is neither declared in the emits option nor as an "${Ze(t)}" prop.`);
      else {
        const g = h[t];
        $(g) && (g(...n) || y(`Invalid event arguments: event validation failed for event "${t}".`));
      }
  }
  let r = n;
  const s = t.startsWith("update:"), i = s && t.slice(7);
  if (i && i in o) {
    const h = `${i === "modelValue" ? "model" : i}Modifiers`, { number: d, trim: g } = o[h] || U;
    g && (r = n.map((x) => x.trim())), d && (r = n.map(Rn));
  }
  if (process.env.NODE_ENV !== "production" && Li(e, t, r), process.env.NODE_ENV !== "production") {
    const h = t.toLowerCase();
    h !== t && o[Ze(h)] && y(`Event "${h}" is emitted in component ${wn(e, e.type)} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${ve(t)}" instead of "${t}".`);
  }
  let l, f = o[l = Ze(t)] || // also try camelCase event handler (#2249)
  o[l = Ze(Ke(t))];
  !f && s && (f = o[l = Ze(ve(t))]), f && me(f, e, 6, r);
  const a = o[l + "Once"];
  if (a) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, me(a, e, 6, r);
  }
}
function zr(e, t, n = !1) {
  const o = t.emitsCache, r = o.get(e);
  if (r !== void 0)
    return r;
  const s = e.emits;
  let i = {}, l = !1;
  if (!$(e)) {
    const f = (a) => {
      const h = zr(a, t, !0);
      h && (l = !0, X(i, h));
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !s && !l ? (z(e) && o.set(e, null), null) : (C(s) ? s.forEach((f) => i[f] = null) : X(i, s), z(e) && o.set(e, i), i);
}
function Nn(e, t) {
  return !e || !St(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), M(e, t[0].toLowerCase() + t.slice(1)) || M(e, ve(t)) || M(e, t));
}
let re = null, qr = null;
function sn(e) {
  const t = re;
  return re = e, qr = e && e.type.__scopeId || null, t;
}
function Ui(e, t = re, n) {
  if (!t || e._n)
    return e;
  const o = (...r) => {
    o._d && Xo(-1);
    const s = sn(t), i = e(...r);
    return sn(s), o._d && Xo(1), process.env.NODE_ENV !== "production" && Kr(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
let Kn = !1;
function cn() {
  Kn = !0;
}
function Tn(e) {
  const { type: t, vnode: n, proxy: o, withProxy: r, props: s, propsOptions: [i], slots: l, attrs: f, emit: a, render: h, renderCache: d, data: g, setupState: x, ctx: P, inheritAttrs: I } = e;
  let R, K;
  const H = sn(e);
  process.env.NODE_ENV !== "production" && (Kn = !1);
  try {
    if (n.shapeFlag & 4) {
      const Y = r || o;
      R = Ee(h.call(Y, Y, d, s, x, g, P)), K = f;
    } else {
      const Y = t;
      process.env.NODE_ENV !== "production" && f === s && cn(), R = Ee(Y.length > 1 ? Y(s, process.env.NODE_ENV !== "production" ? {
        get attrs() {
          return cn(), f;
        },
        slots: l,
        emit: a
      } : { attrs: f, slots: l, emit: a }) : Y(
        s,
        null
        /* we know it doesn't need it */
      )), K = t.props ? f : Bi(f);
    }
  } catch (Y) {
    Tt.length = 0, gn(
      Y,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), R = Ce(se);
  }
  let J = R, ue;
  if (process.env.NODE_ENV !== "production" && R.patchFlag > 0 && R.patchFlag & 2048 && ([J, ue] = ki(R)), K && I !== !1) {
    const Y = Object.keys(K), { shapeFlag: $e } = J;
    if (Y.length) {
      if ($e & 7)
        i && Y.some(tn) && (K = Ki(K, i)), J = Te(J, K);
      else if (process.env.NODE_ENV !== "production" && !Kn && J.type !== se) {
        const be = Object.keys(f), S = [], Z = [];
        for (let k = 0, ae = be.length; k < ae; k++) {
          const G = be[k];
          St(G) ? tn(G) || S.push(G[2].toLowerCase() + G.slice(3)) : Z.push(G);
        }
        Z.length && y(`Extraneous non-props attributes (${Z.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`), S.length && y(`Extraneous non-emits event listeners (${S.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !Ho(J) && y("Runtime directive used on component with non-element root node. The directives will not function as intended."), J = Te(J), J.dirs = J.dirs ? J.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !Ho(J) && y("Component inside <Transition> renders non-element root node that cannot be animated."), J.transition = n.transition), process.env.NODE_ENV !== "production" && ue ? ue(J) : R = J, sn(H), R;
}
const ki = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Jr(t);
  if (!o)
    return [e, void 0];
  const r = t.indexOf(o), s = n ? n.indexOf(o) : -1, i = (l) => {
    t[r] = l, n && (s > -1 ? n[s] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [Ee(o), i];
};
function Jr(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    if (yn(o)) {
      if (o.type !== se || o.children === "v-if") {
        if (t)
          return;
        t = o;
      }
    } else
      return;
  }
  return t;
}
const Bi = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || St(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ki = (e, t) => {
  const n = {};
  for (const o in e)
    (!tn(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, Ho = (e) => e.shapeFlag & 7 || e.type === se;
function Wi(e, t, n) {
  const { props: o, children: r, component: s } = e, { props: i, children: l, patchFlag: f } = t, a = s.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (r || l) && st || t.dirs || t.transition)
    return !0;
  if (n && f >= 0) {
    if (f & 1024)
      return !0;
    if (f & 16)
      return o ? Uo(o, i, a) : !!i;
    if (f & 8) {
      const h = t.dynamicProps;
      for (let d = 0; d < h.length; d++) {
        const g = h[d];
        if (i[g] !== o[g] && !Nn(a, g))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : o === i ? !1 : o ? i ? Uo(o, i, a) : !0 : !!i;
  return !1;
}
function Uo(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < o.length; r++) {
    const s = o[r];
    if (t[s] !== e[s] && !Nn(n, s))
      return !0;
  }
  return !1;
}
function zi({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const qi = (e) => e.__isSuspense;
function Ji(e, t) {
  t && t.pendingBranch ? C(e) ? t.effects.push(...e) : t.effects.push(e) : Lr(e);
}
function Yi(e, t) {
  if (!ee)
    process.env.NODE_ENV !== "production" && y("provide() can only be used inside setup().");
  else {
    let n = ee.provides;
    const o = ee.parent && ee.parent.provides;
    o === n && (n = ee.provides = Object.create(o)), n[e] = t;
  }
}
function $n(e, t, n = !1) {
  const o = ee || re;
  if (o) {
    const r = o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && $(t) ? t.call(o.proxy) : t;
    process.env.NODE_ENV !== "production" && y(`injection "${String(e)}" not found.`);
  } else
    process.env.NODE_ENV !== "production" && y("inject() can only be used inside setup() or functional components.");
}
const ko = {};
function In(e, t, n) {
  return process.env.NODE_ENV !== "production" && !$(t) && y("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."), Yr(e, t, n);
}
function Yr(e, t, { immediate: n, deep: o, flush: r, onTrack: s, onTrigger: i } = U) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && y('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), o !== void 0 && y('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const l = (H) => {
    y("Invalid watch source: ", H, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, f = ee;
  let a, h = !1, d = !1;
  if (te(e) ? (a = () => e.value, h = on(e)) : ot(e) ? (a = () => e, o = !0) : C(e) ? (d = !0, h = e.some((H) => ot(H) || on(H)), a = () => e.map((H) => {
    if (te(H))
      return H.value;
    if (ot(H))
      return _t(H);
    if ($(H))
      return Re(
        H,
        f,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    process.env.NODE_ENV !== "production" && l(H);
  })) : $(e) ? t ? a = () => Re(
    e,
    f,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : a = () => {
    if (!(f && f.isUnmounted))
      return g && g(), me(e, f, 3, [x]);
  } : (a = ne, process.env.NODE_ENV !== "production" && l(e)), t && o) {
    const H = a;
    a = () => _t(H());
  }
  let g, x = (H) => {
    g = K.onStop = () => {
      Re(
        H,
        f,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  if (Rt)
    return x = ne, t ? n && me(t, f, 3, [
      a(),
      d ? [] : void 0,
      x
    ]) : a(), ne;
  let P = d ? [] : ko;
  const I = () => {
    if (K.active)
      if (t) {
        const H = K.run();
        (o || h || (d ? H.some((J, ue) => $t(J, P[ue])) : $t(H, P))) && (g && g(), me(t, f, 3, [
          H,
          // pass undefined as the old value when it's changed for the first time
          P === ko ? void 0 : P,
          x
        ]), P = H);
      } else
        K.run();
  };
  I.allowRecurse = !!t;
  let R;
  r === "sync" ? R = I : r === "post" ? R = () => de(I, f && f.suspense) : (I.pre = !0, f && (I.id = f.uid), R = () => En(I));
  const K = new uo(a, R);
  return process.env.NODE_ENV !== "production" && (K.onTrack = s, K.onTrigger = i), t ? n ? I() : P = K.run() : r === "post" ? de(K.run.bind(K), f && f.suspense) : K.run(), () => {
    K.stop(), f && f.scope && so(f.scope.effects, K);
  };
}
function Zi(e, t, n) {
  const o = this.proxy, r = Q(e) ? e.includes(".") ? Zr(o, e) : () => o[e] : e.bind(o, o);
  let s;
  $(t) ? s = t : (s = t.handler, n = t);
  const i = ee;
  Nt(this);
  const l = Yr(r, s.bind(o), n);
  return i ? Nt(i) : it(), l;
}
function Zr(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++)
      o = o[n[r]];
    return o;
  };
}
function _t(e, t) {
  if (!z(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), te(e))
    _t(e.value, t);
  else if (C(e))
    for (let n = 0; n < e.length; n++)
      _t(e[n], t);
  else if (dr(e) || tt(e))
    e.forEach((n) => {
      _t(n, t);
    });
  else if (hr(e))
    for (const n in e)
      _t(e[n], t);
  return e;
}
function Xi() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return No(() => {
    e.isMounted = !0;
  }), es(() => {
    e.isUnmounting = !0;
  }), e;
}
const _e = [Function, Array], Qi = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: _e,
    onEnter: _e,
    onAfterEnter: _e,
    onEnterCancelled: _e,
    // leave
    onBeforeLeave: _e,
    onLeave: _e,
    onAfterLeave: _e,
    onLeaveCancelled: _e,
    // appear
    onBeforeAppear: _e,
    onAppear: _e,
    onAfterAppear: _e,
    onAppearCancelled: _e
  },
  setup(e, { slots: t }) {
    const n = Yc(), o = Xi();
    let r;
    return () => {
      const s = t.default && Qr(t.default(), !0);
      if (!s || !s.length)
        return;
      let i = s[0];
      if (s.length > 1) {
        let I = !1;
        for (const R of s)
          if (R.type !== se) {
            if (process.env.NODE_ENV !== "production" && I) {
              y("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            if (i = R, I = !0, process.env.NODE_ENV === "production")
              break;
          }
      }
      const l = A(e), { mode: f } = l;
      if (process.env.NODE_ENV !== "production" && f && f !== "in-out" && f !== "out-in" && f !== "default" && y(`invalid <transition> mode: ${f}`), o.isLeaving)
        return An(i);
      const a = Bo(i);
      if (!a)
        return An(i);
      const h = Wn(a, l, o, n);
      zn(a, h);
      const d = n.subTree, g = d && Bo(d);
      let x = !1;
      const { getTransitionKey: P } = a.type;
      if (P) {
        const I = P();
        r === void 0 ? r = I : I !== r && (r = I, x = !0);
      }
      if (g && g.type !== se && (!Ge(a, g) || x)) {
        const I = Wn(g, l, o, n);
        if (zn(g, I), f === "out-in")
          return o.isLeaving = !0, I.afterLeave = () => {
            o.isLeaving = !1, n.update();
          }, An(i);
        f === "in-out" && a.type !== se && (I.delayLeave = (R, K, H) => {
          const J = Xr(o, g);
          J[String(g.key)] = g, R._leaveCb = () => {
            K(), R._leaveCb = void 0, delete h.delayedLeave;
          }, h.delayedLeave = H;
        });
      }
      return i;
    };
  }
}, Gi = Qi;
function Xr(e, t) {
  const { leavingVNodes: n } = e;
  let o = n.get(t.type);
  return o || (o = /* @__PURE__ */ Object.create(null), n.set(t.type, o)), o;
}
function Wn(e, t, n, o) {
  const { appear: r, mode: s, persisted: i = !1, onBeforeEnter: l, onEnter: f, onAfterEnter: a, onEnterCancelled: h, onBeforeLeave: d, onLeave: g, onAfterLeave: x, onLeaveCancelled: P, onBeforeAppear: I, onAppear: R, onAfterAppear: K, onAppearCancelled: H } = t, J = String(e.key), ue = Xr(n, e), Y = (S, Z) => {
    S && me(S, o, 9, Z);
  }, $e = (S, Z) => {
    const k = Z[1];
    Y(S, Z), C(S) ? S.every((ae) => ae.length <= 1) && k() : S.length <= 1 && k();
  }, be = {
    mode: s,
    persisted: i,
    beforeEnter(S) {
      let Z = l;
      if (!n.isMounted)
        if (r)
          Z = I || l;
        else
          return;
      S._leaveCb && S._leaveCb(
        !0
        /* cancelled */
      );
      const k = ue[J];
      k && Ge(e, k) && k.el._leaveCb && k.el._leaveCb(), Y(Z, [S]);
    },
    enter(S) {
      let Z = f, k = a, ae = h;
      if (!n.isMounted)
        if (r)
          Z = R || f, k = K || a, ae = H || h;
        else
          return;
      let G = !1;
      const ye = S._enterCb = (Lt) => {
        G || (G = !0, Lt ? Y(ae, [S]) : Y(k, [S]), be.delayedLeave && be.delayedLeave(), S._enterCb = void 0);
      };
      Z ? $e(Z, [S, ye]) : ye();
    },
    leave(S, Z) {
      const k = String(e.key);
      if (S._enterCb && S._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return Z();
      Y(d, [S]);
      let ae = !1;
      const G = S._leaveCb = (ye) => {
        ae || (ae = !0, Z(), ye ? Y(P, [S]) : Y(x, [S]), S._leaveCb = void 0, ue[k] === e && delete ue[k]);
      };
      ue[k] = e, g ? $e(g, [S, G]) : G();
    },
    clone(S) {
      return Wn(S, t, n, o);
    }
  };
  return be;
}
function An(e) {
  if (jt(e))
    return e = Te(e), e.children = null, e;
}
function Bo(e) {
  return jt(e) ? e.children ? e.children[0] : void 0 : e;
}
function zn(e, t) {
  e.shapeFlag & 6 && e.component ? zn(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Qr(e, t = !1, n) {
  let o = [], r = 0;
  for (let s = 0; s < e.length; s++) {
    let i = e[s];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : s);
    i.type === he ? (i.patchFlag & 128 && r++, o = o.concat(Qr(i.children, t, l))) : (t || i.type !== se) && o.push(l != null ? Te(i, { key: l }) : i);
  }
  if (r > 1)
    for (let s = 0; s < o.length; s++)
      o[s].patchFlag = -2;
  return o;
}
function ec(e) {
  return $(e) ? { setup: e, name: e.name } : e;
}
const Ct = (e) => !!e.type.__asyncLoader, jt = (e) => e.type.__isKeepAlive;
function tc(e, t) {
  Gr(e, "a", t);
}
function nc(e, t) {
  Gr(e, "da", t);
}
function Gr(e, t, n = ee) {
  const o = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (vn(t, o, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      jt(r.parent.vnode) && oc(o, t, n, r), r = r.parent;
  }
}
function oc(e, t, n, o) {
  const r = vn(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  ts(() => {
    so(o[t], r);
  }, n);
}
function vn(e, t, n = ee, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      lt(), Nt(n);
      const l = me(t, n, e, i);
      return it(), ft(), l;
    });
    return o ? r.unshift(s) : r.push(s), s;
  } else if (process.env.NODE_ENV !== "production") {
    const r = Ze(_o[e].replace(/ hook$/, ""));
    y(`${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const Fe = (e) => (t, n = ee) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Rt || e === "sp") && vn(e, t, n)
), rc = Fe(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), No = Fe(
  "m"
  /* LifecycleHooks.MOUNTED */
), sc = Fe(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), ic = Fe(
  "u"
  /* LifecycleHooks.UPDATED */
), es = Fe(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), ts = Fe(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), cc = Fe(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), lc = Fe(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), fc = Fe(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function uc(e, t = ee) {
  vn("ec", e, t);
}
function ns(e) {
  Fs(e) && y("Do not use built-in directive ids as custom directive id: " + e);
}
function Je(e, t, n, o) {
  const r = e.dirs, s = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    s && (l.oldValue = s[i].value);
    let f = l.dir[o];
    f && (lt(), me(f, n, 8, [
      e.el,
      l,
      e,
      t
    ]), ft());
  }
}
const ac = Symbol();
function dc(e, t, n = {}, o, r) {
  if (re.isCE || re.parent && Ct(re.parent) && re.parent.isCE)
    return Ce("slot", t === "default" ? null : { name: t }, o && o());
  let s = e[t];
  process.env.NODE_ENV !== "production" && s && s.length > 1 && (y("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."), s = () => []), s && s._c && (s._d = !1), hs();
  const i = s && os(s(n)), l = kc(
    he,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (o ? o() : []),
    i && e._ === 1 ? 64 : -2
    /* PatchFlags.BAIL */
  );
  return !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), s && s._c && (s._d = !0), l;
}
function os(e) {
  return e.some((t) => yn(t) ? !(t.type === se || t.type === he && !os(t.children)) : !0) ? e : null;
}
const qn = (e) => e ? bs(e) ? Oo(e) || e.proxy : qn(e.parent) : null, Et = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ X(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? ht(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? ht(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? ht(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? ht(e.refs) : e.refs,
    $parent: (e) => qn(e.parent),
    $root: (e) => qn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => is(e),
    $forceUpdate: (e) => e.f || (e.f = () => En(e.update)),
    $nextTick: (e) => e.n || (e.n = Fr.bind(e.proxy)),
    $watch: (e) => Zi.bind(e)
  })
), vo = (e) => e === "_" || e === "$", rs = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: r, props: s, accessCache: i, type: l, appContext: f } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (process.env.NODE_ENV !== "production" && o !== U && o.__isScriptSetup && M(o, t))
      return o[t];
    let a;
    if (t[0] !== "$") {
      const x = i[t];
      if (x !== void 0)
        switch (x) {
          case 1:
            return o[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (o !== U && M(o, t))
          return i[t] = 1, o[t];
        if (r !== U && M(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && M(a, t)
        )
          return i[t] = 3, s[t];
        if (n !== U && M(n, t))
          return i[t] = 4, n[t];
        Jn && (i[t] = 0);
      }
    }
    const h = Et[t];
    let d, g;
    if (h)
      return t === "$attrs" && (pe(e, "get", t), process.env.NODE_ENV !== "production" && cn()), h(e);
    if (
      // css module (injected by vue-loader)
      (d = l.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== U && M(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      g = f.config.globalProperties, M(g, t)
    )
      return g[t];
    process.env.NODE_ENV !== "production" && re && (!Q(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== U && vo(t[0]) && M(r, t) ? y(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === re && y(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: r, ctx: s } = e;
    return r !== U && M(r, t) ? (r[t] = n, !0) : o !== U && M(o, t) ? (o[t] = n, !0) : M(e.props, t) ? (process.env.NODE_ENV !== "production" && y(`Attempting to mutate prop "${t}". Props are readonly.`, e), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && y(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`, e), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: s } }, i) {
    let l;
    return !!n[i] || e !== U && M(e, i) || t !== U && M(t, i) || (l = s[0]) && M(l, i) || M(o, i) || M(Et, i) || M(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : M(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (rs.ownKeys = (e) => (y("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function pc(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(Et).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => Et[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: ne
    });
  }), t;
}
function hc(e) {
  const { ctx: t, propsOptions: [n] } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: ne
    });
  });
}
function _c(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(A(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (vo(o[0])) {
        y(`setup() return property ${JSON.stringify(o)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(t, o, {
        enumerable: !0,
        configurable: !0,
        get: () => n[o],
        set: ne
      });
    }
  });
}
function mc() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? y(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let Jn = !0;
function gc(e) {
  const t = is(e), n = e.proxy, o = e.ctx;
  Jn = !1, t.beforeCreate && Ko(
    t.beforeCreate,
    e,
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  );
  const {
    // state
    data: r,
    computed: s,
    methods: i,
    watch: l,
    provide: f,
    inject: a,
    // lifecycle
    created: h,
    beforeMount: d,
    mounted: g,
    beforeUpdate: x,
    updated: P,
    activated: I,
    deactivated: R,
    beforeDestroy: K,
    beforeUnmount: H,
    destroyed: J,
    unmounted: ue,
    render: Y,
    renderTracked: $e,
    renderTriggered: be,
    errorCaptured: S,
    serverPrefetch: Z,
    // public API
    expose: k,
    inheritAttrs: ae,
    // assets
    components: G,
    directives: ye,
    filters: Lt
  } = t, qe = process.env.NODE_ENV !== "production" ? mc() : null;
  if (process.env.NODE_ENV !== "production") {
    const [j] = e.propsOptions;
    if (j)
      for (const F in j)
        qe("Props", F);
  }
  if (a && Ec(a, o, qe, e.appContext.config.unwrapInjectedRef), i)
    for (const j in i) {
      const F = i[j];
      $(F) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, j, {
        value: F.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[j] = F.bind(n), process.env.NODE_ENV !== "production" && qe("Methods", j)) : process.env.NODE_ENV !== "production" && y(`Method "${j}" has type "${typeof F}" in the component definition. Did you reference the function correctly?`);
    }
  if (r) {
    process.env.NODE_ENV !== "production" && !$(r) && y("The data option must be a function. Plain object usage is no longer supported.");
    const j = r.call(n, n);
    if (process.env.NODE_ENV !== "production" && co(j) && y("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."), !z(j))
      process.env.NODE_ENV !== "production" && y("data() should return an object.");
    else if (e.data = po(j), process.env.NODE_ENV !== "production")
      for (const F in j)
        qe("Data", F), vo(F[0]) || Object.defineProperty(o, F, {
          configurable: !0,
          enumerable: !0,
          get: () => j[F],
          set: ne
        });
  }
  if (Jn = !0, s)
    for (const j in s) {
      const F = s[j], Ie = $(F) ? F.bind(n, n) : $(F.get) ? F.get.bind(n, n) : ne;
      process.env.NODE_ENV !== "production" && Ie === ne && y(`Computed property "${j}" has no getter.`);
      const bt = !$(F) && $(F.set) ? F.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        y(`Write operation failed: computed property "${j}" is readonly.`);
      } : ne, Ht = Ds({
        get: Ie,
        set: bt
      });
      Object.defineProperty(o, j, {
        enumerable: !0,
        configurable: !0,
        get: () => Ht.value,
        set: (Ut) => Ht.value = Ut
      }), process.env.NODE_ENV !== "production" && qe("Computed", j);
    }
  if (l)
    for (const j in l)
      ss(l[j], o, n, j);
  if (f) {
    const j = $(f) ? f.call(n) : f;
    Reflect.ownKeys(j).forEach((F) => {
      Yi(F, j[F]);
    });
  }
  h && Ko(
    h,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function ie(j, F) {
    C(F) ? F.forEach((Ie) => j(Ie.bind(n))) : F && j(F.bind(n));
  }
  if (ie(rc, d), ie(No, g), ie(sc, x), ie(ic, P), ie(tc, I), ie(nc, R), ie(uc, S), ie(fc, $e), ie(lc, be), ie(es, H), ie(ts, ue), ie(cc, Z), C(k))
    if (k.length) {
      const j = e.exposed || (e.exposed = {});
      k.forEach((F) => {
        Object.defineProperty(j, F, {
          get: () => n[F],
          set: (Ie) => n[F] = Ie
        });
      });
    } else
      e.exposed || (e.exposed = {});
  Y && e.render === ne && (e.render = Y), ae != null && (e.inheritAttrs = ae), G && (e.components = G), ye && (e.directives = ye);
}
function Ec(e, t, n = ne, o = !1) {
  C(e) && (e = Yn(e));
  for (const r in e) {
    const s = e[r];
    let i;
    z(s) ? "default" in s ? i = $n(
      s.from || r,
      s.default,
      !0
      /* treat default function as factory */
    ) : i = $n(s.from || r) : i = $n(s), te(i) ? o ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : (process.env.NODE_ENV !== "production" && y(`injected property "${r}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`), t[r] = i) : t[r] = i, process.env.NODE_ENV !== "production" && n("Inject", r);
  }
}
function Ko(e, t, n) {
  me(C(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ss(e, t, n, o) {
  const r = o.includes(".") ? Zr(n, o) : () => n[o];
  if (Q(e)) {
    const s = t[e];
    $(s) ? In(r, s) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e}"`, s);
  } else if ($(e))
    In(r, e.bind(n));
  else if (z(e))
    if (C(e))
      e.forEach((s) => ss(s, t, n, o));
    else {
      const s = $(e.handler) ? e.handler.bind(n) : t[e.handler];
      $(s) ? In(r, s, e) : process.env.NODE_ENV !== "production" && y(`Invalid watch handler specified by key "${e.handler}"`, s);
    }
  else
    process.env.NODE_ENV !== "production" && y(`Invalid watch option: "${o}"`, e);
}
function is(e) {
  const t = e.type, { mixins: n, extends: o } = t, { mixins: r, optionsCache: s, config: { optionMergeStrategies: i } } = e.appContext, l = s.get(t);
  let f;
  return l ? f = l : !r.length && !n && !o ? f = t : (f = {}, r.length && r.forEach((a) => ln(f, a, i, !0)), ln(f, t, i)), z(t) && s.set(t, f), f;
}
function ln(e, t, n, o = !1) {
  const { mixins: r, extends: s } = t;
  s && ln(e, s, n, !0), r && r.forEach((i) => ln(e, i, n, !0));
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && y('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const l = Nc[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Nc = {
  data: Wo,
  props: Xe,
  emits: Xe,
  // objects
  methods: Xe,
  computed: Xe,
  // lifecycle
  beforeCreate: le,
  created: le,
  beforeMount: le,
  mounted: le,
  beforeUpdate: le,
  updated: le,
  beforeDestroy: le,
  beforeUnmount: le,
  destroyed: le,
  unmounted: le,
  activated: le,
  deactivated: le,
  errorCaptured: le,
  serverPrefetch: le,
  // assets
  components: Xe,
  directives: Xe,
  // watch
  watch: bc,
  // provide / inject
  provide: Wo,
  inject: vc
};
function Wo(e, t) {
  return t ? e ? function() {
    return X($(e) ? e.call(this, this) : e, $(t) ? t.call(this, this) : t);
  } : t : e;
}
function vc(e, t) {
  return Xe(Yn(e), Yn(t));
}
function Yn(e) {
  if (C(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function le(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Xe(e, t) {
  return e ? X(X(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function bc(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = X(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = le(e[o], t[o]);
  return n;
}
function yc(e, t, n, o = !1) {
  const r = {}, s = {};
  nn(s, On, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), cs(e, t, r, s);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  process.env.NODE_ENV !== "production" && fs(t || {}, r, e), n ? e.props = o ? r : hi(r) : e.type.props ? e.props = r : e.props = s, e.attrs = s;
}
function Oc(e) {
  for (; e; ) {
    if (e.type.__hmrId)
      return !0;
    e = e.parent;
  }
}
function wc(e, t, n, o) {
  const { props: r, attrs: s, vnode: { patchFlag: i } } = e, l = A(r), [f] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && Oc(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const h = e.vnode.dynamicProps;
      for (let d = 0; d < h.length; d++) {
        let g = h[d];
        if (Nn(e.emitsOptions, g))
          continue;
        const x = t[g];
        if (f)
          if (M(s, g))
            x !== s[g] && (s[g] = x, a = !0);
          else {
            const P = Ke(g);
            r[P] = Zn(
              f,
              l,
              P,
              x,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          x !== s[g] && (s[g] = x, a = !0);
      }
    }
  } else {
    cs(e, t, r, s) && (a = !0);
    let h;
    for (const d in l)
      (!t || // for camelCase
      !M(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = ve(d)) === d || !M(t, h))) && (f ? n && // for camelCase
      (n[d] !== void 0 || // for kebab-case
      n[h] !== void 0) && (r[d] = Zn(
        f,
        l,
        d,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete r[d]);
    if (s !== l)
      for (const d in s)
        (!t || !M(t, d)) && (delete s[d], a = !0);
  }
  a && Se(e, "set", "$attrs"), process.env.NODE_ENV !== "production" && fs(t || {}, r, e);
}
function cs(e, t, n, o) {
  const [r, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let f in t) {
      if (Yt(f))
        continue;
      const a = t[f];
      let h;
      r && M(r, h = Ke(f)) ? !s || !s.includes(h) ? n[h] = a : (l || (l = {}))[h] = a : Nn(e.emitsOptions, f) || (!(f in o) || a !== o[f]) && (o[f] = a, i = !0);
    }
  if (s) {
    const f = A(n), a = l || U;
    for (let h = 0; h < s.length; h++) {
      const d = s[h];
      n[d] = Zn(r, f, d, a[d], e, !M(a, d));
    }
  }
  return i;
}
function Zn(e, t, n, o, r, s) {
  const i = e[n];
  if (i != null) {
    const l = M(i, "default");
    if (l && o === void 0) {
      const f = i.default;
      if (i.type !== Function && $(f)) {
        const { propsDefaults: a } = r;
        n in a ? o = a[n] : (Nt(r), o = a[n] = f.call(null, t), it());
      } else
        o = f;
    }
    i[
      0
      /* BooleanFlags.shouldCast */
    ] && (s && !l ? o = !1 : i[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (o === "" || o === ve(n)) && (o = !0));
  }
  return o;
}
function ls(e, t, n = !1) {
  const o = t.propsCache, r = o.get(e);
  if (r)
    return r;
  const s = e.props, i = {}, l = [];
  let f = !1;
  if (!$(e)) {
    const h = (d) => {
      f = !0;
      const [g, x] = ls(d, t, !0);
      X(i, g), x && l.push(...x);
    };
    !n && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!s && !f)
    return z(e) && o.set(e, mt), mt;
  if (C(s))
    for (let h = 0; h < s.length; h++) {
      process.env.NODE_ENV !== "production" && !Q(s[h]) && y("props must be strings when using array syntax.", s[h]);
      const d = Ke(s[h]);
      zo(d) && (i[d] = U);
    }
  else if (s) {
    process.env.NODE_ENV !== "production" && !z(s) && y("invalid props options", s);
    for (const h in s) {
      const d = Ke(h);
      if (zo(d)) {
        const g = s[h], x = i[d] = C(g) || $(g) ? { type: g } : g;
        if (x) {
          const P = Jo(Boolean, x.type), I = Jo(String, x.type);
          x[
            0
            /* BooleanFlags.shouldCast */
          ] = P > -1, x[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = I < 0 || P < I, (P > -1 || M(x, "default")) && l.push(d);
        }
      }
    }
  }
  const a = [i, l];
  return z(e) && o.set(e, a), a;
}
function zo(e) {
  return e[0] !== "$" ? !0 : (process.env.NODE_ENV !== "production" && y(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Xn(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function qo(e, t) {
  return Xn(e) === Xn(t);
}
function Jo(e, t) {
  return C(t) ? t.findIndex((n) => qo(n, e)) : $(t) && qo(t, e) ? 0 : -1;
}
function fs(e, t, n) {
  const o = A(t), r = n.propsOptions[0];
  for (const s in r) {
    let i = r[s];
    i != null && Dc(s, o[s], i, !M(e, s) && !M(e, ve(s)));
  }
}
function Dc(e, t, n, o) {
  const { type: r, required: s, validator: i } = n;
  if (s && o) {
    y('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !n.required)) {
    if (r != null && r !== !0) {
      let l = !1;
      const f = C(r) ? r : [r], a = [];
      for (let h = 0; h < f.length && !l; h++) {
        const { valid: d, expectedType: g } = Vc(t, f[h]);
        a.push(g || ""), l = d;
      }
      if (!l) {
        y(Cc(e, t, a));
        return;
      }
    }
    i && !i(t) && y('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const xc = /* @__PURE__ */ vt("String,Number,Boolean,Function,Symbol,BigInt");
function Vc(e, t) {
  let n;
  const o = Xn(t);
  if (xc(o)) {
    const r = typeof e;
    n = r === o.toLowerCase(), !n && r === "object" && (n = e instanceof t);
  } else
    o === "Object" ? n = z(e) : o === "Array" ? n = C(e) : o === "null" ? n = e === null : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function Cc(e, t, n) {
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(dn).join(" | ")}`;
  const r = n[0], s = lo(t), i = Yo(t, r), l = Yo(t, s);
  return n.length === 1 && Zo(r) && !Tc(r, s) && (o += ` with value ${i}`), o += `, got ${s} `, Zo(s) && (o += `with value ${l}.`), o;
}
function Yo(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function Zo(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Tc(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const us = (e) => e[0] === "_" || e === "$stable", bo = (e) => C(e) ? e.map(Ee) : [Ee(e)], $c = (e, t, n) => {
  if (t._n)
    return t;
  const o = Ui((...r) => (process.env.NODE_ENV !== "production" && ee && y(`Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`), bo(t(...r))), n);
  return o._c = !1, o;
}, as = (e, t, n) => {
  const o = e._ctx;
  for (const r in e) {
    if (us(r))
      continue;
    const s = e[r];
    if ($(s))
      t[r] = $c(r, s, o);
    else if (s != null) {
      process.env.NODE_ENV !== "production" && y(`Non-function value encountered for slot "${r}". Prefer function slots for better performance.`);
      const i = bo(s);
      t[r] = () => i;
    }
  }
}, ds = (e, t) => {
  process.env.NODE_ENV !== "production" && !jt(e.vnode) && y("Non-function value encountered for default slot. Prefer function slots for better performance.");
  const n = bo(t);
  e.slots.default = () => n;
}, Ic = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = A(t), nn(t, "_", n)) : as(t, e.slots = {});
  } else
    e.slots = {}, t && ds(e, t);
  nn(e.slots, On, 1);
}, Ac = (e, t, n) => {
  const { vnode: o, slots: r } = e;
  let s = !0, i = U;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && st ? X(r, t) : n && l === 1 ? s = !1 : (X(r, t), !n && l === 1 && delete r._) : (s = !t.$stable, as(t, r)), i = t;
  } else
    t && (ds(e, t), i = { default: 1 });
  if (s)
    for (const l in r)
      !us(l) && !(l in i) && delete r[l];
};
function ps() {
  return {
    app: null,
    config: {
      isNativeTag: ar,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Pc = 0;
function Mc(e, t) {
  return function(o, r = null) {
    $(o) || (o = Object.assign({}, o)), r != null && !z(r) && (process.env.NODE_ENV !== "production" && y("root props passed to app.mount() must be an object."), r = null);
    const s = ps(), i = /* @__PURE__ */ new Set();
    let l = !1;
    const f = s.app = {
      _uid: Pc++,
      _component: o,
      _props: r,
      _container: null,
      _context: s,
      _instance: null,
      version: er,
      get config() {
        return s.config;
      },
      set config(a) {
        process.env.NODE_ENV !== "production" && y("app.config cannot be replaced. Modify individual options instead.");
      },
      use(a, ...h) {
        return i.has(a) ? process.env.NODE_ENV !== "production" && y("Plugin has already been applied to target app.") : a && $(a.install) ? (i.add(a), a.install(f, ...h)) : $(a) ? (i.add(a), a(f, ...h)) : process.env.NODE_ENV !== "production" && y('A plugin must either be a function or an object with an "install" function.'), f;
      },
      mixin(a) {
        return s.mixins.includes(a) ? process.env.NODE_ENV !== "production" && y("Mixin has already been applied to target app" + (a.name ? `: ${a.name}` : "")) : s.mixins.push(a), f;
      },
      component(a, h) {
        return process.env.NODE_ENV !== "production" && Gn(a, s.config), h ? (process.env.NODE_ENV !== "production" && s.components[a] && y(`Component "${a}" has already been registered in target app.`), s.components[a] = h, f) : s.components[a];
      },
      directive(a, h) {
        return process.env.NODE_ENV !== "production" && ns(a), h ? (process.env.NODE_ENV !== "production" && s.directives[a] && y(`Directive "${a}" has already been registered in target app.`), s.directives[a] = h, f) : s.directives[a];
      },
      mount(a, h, d) {
        if (l)
          process.env.NODE_ENV !== "production" && y("App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`");
        else {
          process.env.NODE_ENV !== "production" && a.__vue_app__ && y("There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first.");
          const g = Ce(o, r);
          return g.appContext = s, process.env.NODE_ENV !== "production" && (s.reload = () => {
            e(Te(g), a, d);
          }), h && t ? t(g, a) : e(g, a, d), l = !0, f._container = a, a.__vue_app__ = f, process.env.NODE_ENV !== "production" && (f._instance = g.component, Pi(f, er)), Oo(g.component) || g.component.proxy;
        }
      },
      unmount() {
        l ? (e(null, f._container), process.env.NODE_ENV !== "production" && (f._instance = null, Mi(f)), delete f._container.__vue_app__) : process.env.NODE_ENV !== "production" && y("Cannot unmount an app that is not mounted.");
      },
      provide(a, h) {
        return process.env.NODE_ENV !== "production" && a in s.provides && y(`App already provides property with key "${String(a)}". It will be overwritten with the new value.`), s.provides[a] = h, f;
      }
    };
    return f;
  };
}
function Qn(e, t, n, o, r = !1) {
  if (C(e)) {
    e.forEach((g, x) => Qn(g, t && (C(t) ? t[x] : t), n, o, r));
    return;
  }
  if (Ct(o) && !r)
    return;
  const s = o.shapeFlag & 4 ? Oo(o.component) || o.component.proxy : o.el, i = r ? null : s, { i: l, r: f } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    y("Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.");
    return;
  }
  const a = t && t.r, h = l.refs === U ? l.refs = {} : l.refs, d = l.setupState;
  if (a != null && a !== f && (Q(a) ? (h[a] = null, M(d, a) && (d[a] = null)) : te(a) && (a.value = null)), $(f))
    Re(f, l, 12, [i, h]);
  else {
    const g = Q(f), x = te(f);
    if (g || x) {
      const P = () => {
        if (e.f) {
          const I = g ? h[f] : f.value;
          r ? C(I) && so(I, s) : C(I) ? I.includes(s) || I.push(s) : g ? (h[f] = [s], M(d, f) && (d[f] = h[f])) : (f.value = [s], e.k && (h[e.k] = f.value));
        } else
          g ? (h[f] = i, M(d, f) && (d[f] = i)) : x ? (f.value = i, e.k && (h[e.k] = i)) : process.env.NODE_ENV !== "production" && y("Invalid template ref type:", f, `(${typeof f})`);
      };
      i ? (P.id = -1, de(P, n)) : P();
    } else
      process.env.NODE_ENV !== "production" && y("Invalid template ref type:", f, `(${typeof f})`);
  }
}
let wt, ke;
function Pe(e, t) {
  e.appContext.config.performance && fn() && ke.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && Fi(e, t, fn() ? ke.now() : Date.now());
}
function Me(e, t) {
  if (e.appContext.config.performance && fn()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end";
    ke.mark(o), ke.measure(`<${wn(e, e.type)}> ${t}`, n, o), ke.clearMarks(n), ke.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && ji(e, t, fn() ? ke.now() : Date.now());
}
function fn() {
  return wt !== void 0 || (typeof window < "u" && window.performance ? (wt = !0, ke = window.performance) : wt = !1), wt;
}
function Rc() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(`Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
}
const de = Ji;
function Sc(e) {
  return Fc(e);
}
function Fc(e, t) {
  Rc();
  const n = _r();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && Br(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const { insert: o, remove: r, patchProp: s, createElement: i, createText: l, createComment: f, setText: a, setElementText: h, parentNode: d, nextSibling: g, setScopeId: x = ne, cloneNode: P, insertStaticContent: I } = e, R = (c, u, p, m = null, _ = null, v = null, O = !1, N = null, b = process.env.NODE_ENV !== "production" && st ? !1 : !!u.dynamicChildren) => {
    if (c === u)
      return;
    c && !Ge(c, u) && (m = Bt(c), je(c, _, v, !0), c = null), u.patchFlag === -2 && (b = !1, u.dynamicChildren = null);
    const { type: E, ref: D, shapeFlag: w } = u;
    switch (E) {
      case bn:
        K(c, u, p, m);
        break;
      case se:
        H(c, u, p, m);
        break;
      case Gt:
        c == null ? J(u, p, m, O) : process.env.NODE_ENV !== "production" && ue(c, u, p, O);
        break;
      case he:
        Lt(c, u, p, m, _, v, O, N, b);
        break;
      default:
        w & 1 ? be(c, u, p, m, _, v, O, N, b) : w & 6 ? qe(c, u, p, m, _, v, O, N, b) : w & 64 || w & 128 ? E.process(c, u, p, m, _, v, O, N, b, ut) : process.env.NODE_ENV !== "production" && y("Invalid VNode type:", E, `(${typeof E})`);
    }
    D != null && _ && Qn(D, c && c.ref, v, u || c, !u);
  }, K = (c, u, p, m) => {
    if (c == null)
      o(u.el = l(u.children), p, m);
    else {
      const _ = u.el = c.el;
      u.children !== c.children && a(_, u.children);
    }
  }, H = (c, u, p, m) => {
    c == null ? o(u.el = f(u.children || ""), p, m) : u.el = c.el;
  }, J = (c, u, p, m) => {
    [c.el, c.anchor] = I(c.children, u, p, m, c.el, c.anchor);
  }, ue = (c, u, p, m) => {
    if (u.children !== c.children) {
      const _ = g(c.anchor);
      $e(c), [u.el, u.anchor] = I(u.children, p, _, m);
    } else
      u.el = c.el, u.anchor = c.anchor;
  }, Y = ({ el: c, anchor: u }, p, m) => {
    let _;
    for (; c && c !== u; )
      _ = g(c), o(c, p, m), c = _;
    o(u, p, m);
  }, $e = ({ el: c, anchor: u }) => {
    let p;
    for (; c && c !== u; )
      p = g(c), r(c), c = p;
    r(u);
  }, be = (c, u, p, m, _, v, O, N, b) => {
    O = O || u.type === "svg", c == null ? S(u, p, m, _, v, O, N, b) : ae(c, u, _, v, O, N, b);
  }, S = (c, u, p, m, _, v, O, N) => {
    let b, E;
    const { type: D, props: w, shapeFlag: V, transition: T, patchFlag: L, dirs: B } = c;
    if (process.env.NODE_ENV === "production" && c.el && P !== void 0 && L === -1)
      b = c.el = P(c.el);
    else {
      if (b = c.el = i(c.type, v, w && w.is, w), V & 8 ? h(b, c.children) : V & 16 && k(c.children, b, null, m, _, v && D !== "foreignObject", O, N), B && Je(c, null, m, "created"), w) {
        for (const q in w)
          q !== "value" && !Yt(q) && s(b, q, null, w[q], v, c.children, m, _, Ae);
        "value" in w && s(b, "value", null, w.value), (E = w.onVnodeBeforeMount) && we(E, m, c);
      }
      Z(b, c, c.scopeId, O, m);
    }
    process.env.NODE_ENV !== "production" && (Object.defineProperty(b, "__vnode", {
      value: c,
      enumerable: !1
    }), Object.defineProperty(b, "__vueParentComponent", {
      value: m,
      enumerable: !1
    })), B && Je(c, null, m, "beforeMount");
    const W = (!_ || _ && !_.pendingBranch) && T && !T.persisted;
    W && T.beforeEnter(b), o(b, u, p), ((E = w && w.onVnodeMounted) || W || B) && de(() => {
      E && we(E, m, c), W && T.enter(b), B && Je(c, null, m, "mounted");
    }, _);
  }, Z = (c, u, p, m, _) => {
    if (p && x(c, p), m)
      for (let v = 0; v < m.length; v++)
        x(c, m[v]);
    if (_) {
      let v = _.subTree;
      if (process.env.NODE_ENV !== "production" && v.patchFlag > 0 && v.patchFlag & 2048 && (v = Jr(v.children) || v), u === v) {
        const O = _.vnode;
        Z(c, O, O.scopeId, O.slotScopeIds, _.parent);
      }
    }
  }, k = (c, u, p, m, _, v, O, N, b = 0) => {
    for (let E = b; E < c.length; E++) {
      const D = c[E] = N ? Ue(c[E]) : Ee(c[E]);
      R(null, D, u, p, m, _, v, O, N);
    }
  }, ae = (c, u, p, m, _, v, O) => {
    const N = u.el = c.el;
    let { patchFlag: b, dynamicChildren: E, dirs: D } = u;
    b |= c.patchFlag & 16;
    const w = c.props || U, V = u.props || U;
    let T;
    p && Ye(p, !1), (T = V.onVnodeBeforeUpdate) && we(T, p, u, c), D && Je(u, c, p, "beforeUpdate"), p && Ye(p, !0), process.env.NODE_ENV !== "production" && st && (b = 0, O = !1, E = null);
    const L = _ && u.type !== "foreignObject";
    if (E ? (G(c.dynamicChildren, E, N, p, m, L, v), process.env.NODE_ENV !== "production" && p && p.type.__hmrId && Qt(c, u)) : O || bt(c, u, N, null, p, m, L, v, !1), b > 0) {
      if (b & 16)
        ye(N, u, w, V, p, m, _);
      else if (b & 2 && w.class !== V.class && s(N, "class", null, V.class, _), b & 4 && s(N, "style", w.style, V.style, _), b & 8) {
        const B = u.dynamicProps;
        for (let W = 0; W < B.length; W++) {
          const q = B[W], ge = w[q], at = V[q];
          (at !== ge || q === "value") && s(N, q, ge, at, _, c.children, p, m, Ae);
        }
      }
      b & 1 && c.children !== u.children && h(N, u.children);
    } else
      !O && E == null && ye(N, u, w, V, p, m, _);
    ((T = V.onVnodeUpdated) || D) && de(() => {
      T && we(T, p, u, c), D && Je(u, c, p, "updated");
    }, m);
  }, G = (c, u, p, m, _, v, O) => {
    for (let N = 0; N < u.length; N++) {
      const b = c[N], E = u[N], D = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        b.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === he || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ge(b, E) || // - In the case of a component, it could contain anything.
        b.shapeFlag & 70) ? d(b.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          p
        )
      );
      R(b, E, D, null, m, _, v, O, !0);
    }
  }, ye = (c, u, p, m, _, v, O) => {
    if (p !== m) {
      for (const N in m) {
        if (Yt(N))
          continue;
        const b = m[N], E = p[N];
        b !== E && N !== "value" && s(c, N, E, b, O, u.children, _, v, Ae);
      }
      if (p !== U)
        for (const N in p)
          !Yt(N) && !(N in m) && s(c, N, p[N], null, O, u.children, _, v, Ae);
      "value" in m && s(c, "value", p.value, m.value);
    }
  }, Lt = (c, u, p, m, _, v, O, N, b) => {
    const E = u.el = c ? c.el : l(""), D = u.anchor = c ? c.anchor : l("");
    let { patchFlag: w, dynamicChildren: V, slotScopeIds: T } = u;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (st || w & 2048) && (w = 0, b = !1, V = null), T && (N = N ? N.concat(T) : T), c == null ? (o(E, p, m), o(D, p, m), k(u.children, p, D, _, v, O, N, b)) : w > 0 && w & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (G(c.dynamicChildren, V, p, _, v, O, N), process.env.NODE_ENV !== "production" && _ && _.type.__hmrId ? Qt(c, u) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (u.key != null || _ && u === _.subTree) && Qt(
        c,
        u,
        !0
        /* shallow */
      )
    )) : bt(c, u, p, D, _, v, O, N, b);
  }, qe = (c, u, p, m, _, v, O, N, b) => {
    u.slotScopeIds = N, c == null ? u.shapeFlag & 512 ? _.ctx.activate(u, p, m, O, b) : ie(u, p, m, _, v, O, b) : j(c, u, b);
  }, ie = (c, u, p, m, _, v, O) => {
    const N = c.component = Jc(c, m, _);
    if (process.env.NODE_ENV !== "production" && N.type.__hmrId && Ti(N), process.env.NODE_ENV !== "production" && (Zt(c), Pe(N, "mount")), jt(c) && (N.ctx.renderer = ut), process.env.NODE_ENV !== "production" && Pe(N, "init"), Xc(N), process.env.NODE_ENV !== "production" && Me(N, "init"), N.asyncDep) {
      if (_ && _.registerDep(N, F), !c.el) {
        const b = N.subTree = Ce(se);
        H(null, b, u, p);
      }
      return;
    }
    F(N, c, u, p, _, v, O), process.env.NODE_ENV !== "production" && (Xt(), Me(N, "mount"));
  }, j = (c, u, p) => {
    const m = u.component = c.component;
    if (Wi(c, u, p))
      if (m.asyncDep && !m.asyncResolved) {
        process.env.NODE_ENV !== "production" && Zt(u), Ie(m, u, p), process.env.NODE_ENV !== "production" && Xt();
        return;
      } else
        m.next = u, Vi(m.update), m.update();
    else
      u.el = c.el, m.vnode = u;
  }, F = (c, u, p, m, _, v, O) => {
    const N = () => {
      if (c.isMounted) {
        let { next: D, bu: w, u: V, parent: T, vnode: L } = c, B = D, W;
        process.env.NODE_ENV !== "production" && Zt(D || c.vnode), Ye(c, !1), D ? (D.el = L.el, Ie(c, D, O)) : D = L, w && Ot(w), (W = D.props && D.props.onVnodeBeforeUpdate) && we(W, T, D, L), Ye(c, !0), process.env.NODE_ENV !== "production" && Pe(c, "render");
        const q = Tn(c);
        process.env.NODE_ENV !== "production" && Me(c, "render");
        const ge = c.subTree;
        c.subTree = q, process.env.NODE_ENV !== "production" && Pe(c, "patch"), R(
          ge,
          q,
          // parent may have changed if it's in a teleport
          d(ge.el),
          // anchor may have changed if it's in a fragment
          Bt(ge),
          c,
          _,
          v
        ), process.env.NODE_ENV !== "production" && Me(c, "patch"), D.el = q.el, B === null && zi(c, q.el), V && de(V, _), (W = D.props && D.props.onVnodeUpdated) && de(() => we(W, T, D, L), _), process.env.NODE_ENV !== "production" && Kr(c), process.env.NODE_ENV !== "production" && Xt();
      } else {
        let D;
        const { el: w, props: V } = u, { bm: T, m: L, parent: B } = c, W = Ct(u);
        if (Ye(c, !1), T && Ot(T), !W && (D = V && V.onVnodeBeforeMount) && we(D, B, u), Ye(c, !0), w && Vn) {
          const q = () => {
            process.env.NODE_ENV !== "production" && Pe(c, "render"), c.subTree = Tn(c), process.env.NODE_ENV !== "production" && Me(c, "render"), process.env.NODE_ENV !== "production" && Pe(c, "hydrate"), Vn(w, c.subTree, c, _, null), process.env.NODE_ENV !== "production" && Me(c, "hydrate");
          };
          W ? u.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !c.isUnmounted && q()
          ) : q();
        } else {
          process.env.NODE_ENV !== "production" && Pe(c, "render");
          const q = c.subTree = Tn(c);
          process.env.NODE_ENV !== "production" && Me(c, "render"), process.env.NODE_ENV !== "production" && Pe(c, "patch"), R(null, q, p, m, c, _, v), process.env.NODE_ENV !== "production" && Me(c, "patch"), u.el = q.el;
        }
        if (L && de(L, _), !W && (D = V && V.onVnodeMounted)) {
          const q = u;
          de(() => we(D, B, q), _);
        }
        (u.shapeFlag & 256 || B && Ct(B.vnode) && B.vnode.shapeFlag & 256) && c.a && de(c.a, _), c.isMounted = !0, process.env.NODE_ENV !== "production" && Ri(c), u = p = m = null;
      }
    }, b = c.effect = new uo(
      N,
      () => En(E),
      c.scope
      // track it in component's effect scope
    ), E = c.update = () => b.run();
    E.id = c.uid, Ye(c, !0), process.env.NODE_ENV !== "production" && (b.onTrack = c.rtc ? (D) => Ot(c.rtc, D) : void 0, b.onTrigger = c.rtg ? (D) => Ot(c.rtg, D) : void 0, E.ownerInstance = c), E();
  }, Ie = (c, u, p) => {
    u.component = c;
    const m = c.vnode.props;
    c.vnode = u, c.next = null, wc(c, u.props, m, p), Ac(c, u.children, p), lt(), jo(), ft();
  }, bt = (c, u, p, m, _, v, O, N, b = !1) => {
    const E = c && c.children, D = c ? c.shapeFlag : 0, w = u.children, { patchFlag: V, shapeFlag: T } = u;
    if (V > 0) {
      if (V & 128) {
        Ut(E, w, p, m, _, v, O, N, b);
        return;
      } else if (V & 256) {
        Ht(E, w, p, m, _, v, O, N, b);
        return;
      }
    }
    T & 8 ? (D & 16 && Ae(E, _, v), w !== E && h(p, w)) : D & 16 ? T & 16 ? Ut(E, w, p, m, _, v, O, N, b) : Ae(E, _, v, !0) : (D & 8 && h(p, ""), T & 16 && k(w, p, m, _, v, O, N, b));
  }, Ht = (c, u, p, m, _, v, O, N, b) => {
    c = c || mt, u = u || mt;
    const E = c.length, D = u.length, w = Math.min(E, D);
    let V;
    for (V = 0; V < w; V++) {
      const T = u[V] = b ? Ue(u[V]) : Ee(u[V]);
      R(c[V], T, p, null, _, v, O, N, b);
    }
    E > D ? Ae(c, _, v, !0, !1, w) : k(u, p, m, _, v, O, N, b, w);
  }, Ut = (c, u, p, m, _, v, O, N, b) => {
    let E = 0;
    const D = u.length;
    let w = c.length - 1, V = D - 1;
    for (; E <= w && E <= V; ) {
      const T = c[E], L = u[E] = b ? Ue(u[E]) : Ee(u[E]);
      if (Ge(T, L))
        R(T, L, p, null, _, v, O, N, b);
      else
        break;
      E++;
    }
    for (; E <= w && E <= V; ) {
      const T = c[w], L = u[V] = b ? Ue(u[V]) : Ee(u[V]);
      if (Ge(T, L))
        R(T, L, p, null, _, v, O, N, b);
      else
        break;
      w--, V--;
    }
    if (E > w) {
      if (E <= V) {
        const T = V + 1, L = T < D ? u[T].el : m;
        for (; E <= V; )
          R(null, u[E] = b ? Ue(u[E]) : Ee(u[E]), p, L, _, v, O, N, b), E++;
      }
    } else if (E > V)
      for (; E <= w; )
        je(c[E], _, v, !0), E++;
    else {
      const T = E, L = E, B = /* @__PURE__ */ new Map();
      for (E = L; E <= V; E++) {
        const ce = u[E] = b ? Ue(u[E]) : Ee(u[E]);
        ce.key != null && (process.env.NODE_ENV !== "production" && B.has(ce.key) && y("Duplicate keys found during update:", JSON.stringify(ce.key), "Make sure keys are unique."), B.set(ce.key, E));
      }
      let W, q = 0;
      const ge = V - L + 1;
      let at = !1, xo = 0;
      const yt = new Array(ge);
      for (E = 0; E < ge; E++)
        yt[E] = 0;
      for (E = T; E <= w; E++) {
        const ce = c[E];
        if (q >= ge) {
          je(ce, _, v, !0);
          continue;
        }
        let Oe;
        if (ce.key != null)
          Oe = B.get(ce.key);
        else
          for (W = L; W <= V; W++)
            if (yt[W - L] === 0 && Ge(ce, u[W])) {
              Oe = W;
              break;
            }
        Oe === void 0 ? je(ce, _, v, !0) : (yt[Oe - L] = E + 1, Oe >= xo ? xo = Oe : at = !0, R(ce, u[Oe], p, null, _, v, O, N, b), q++);
      }
      const Vo = at ? jc(yt) : mt;
      for (W = Vo.length - 1, E = ge - 1; E >= 0; E--) {
        const ce = L + E, Oe = u[ce], Co = ce + 1 < D ? u[ce + 1].el : m;
        yt[E] === 0 ? R(null, Oe, p, Co, _, v, O, N, b) : at && (W < 0 || E !== Vo[W] ? kt(
          Oe,
          p,
          Co,
          2
          /* MoveType.REORDER */
        ) : W--);
      }
    }
  }, kt = (c, u, p, m, _ = null) => {
    const { el: v, type: O, transition: N, children: b, shapeFlag: E } = c;
    if (E & 6) {
      kt(c.component.subTree, u, p, m);
      return;
    }
    if (E & 128) {
      c.suspense.move(u, p, m);
      return;
    }
    if (E & 64) {
      O.move(c, u, p, ut);
      return;
    }
    if (O === he) {
      o(v, u, p);
      for (let w = 0; w < b.length; w++)
        kt(b[w], u, p, m);
      o(c.anchor, u, p);
      return;
    }
    if (O === Gt) {
      Y(c, u, p);
      return;
    }
    if (m !== 2 && E & 1 && N)
      if (m === 0)
        N.beforeEnter(v), o(v, u, p), de(() => N.enter(v), _);
      else {
        const { leave: w, delayLeave: V, afterLeave: T } = N, L = () => o(v, u, p), B = () => {
          w(v, () => {
            L(), T && T();
          });
        };
        V ? V(v, L, B) : B();
      }
    else
      o(v, u, p);
  }, je = (c, u, p, m = !1, _ = !1) => {
    const { type: v, props: O, ref: N, children: b, dynamicChildren: E, shapeFlag: D, patchFlag: w, dirs: V } = c;
    if (N != null && Qn(N, null, p, c, !0), D & 256) {
      u.ctx.deactivate(c);
      return;
    }
    const T = D & 1 && V, L = !Ct(c);
    let B;
    if (L && (B = O && O.onVnodeBeforeUnmount) && we(B, u, c), D & 6)
      Cs(c.component, p, m);
    else {
      if (D & 128) {
        c.suspense.unmount(p, m);
        return;
      }
      T && Je(c, null, u, "beforeUnmount"), D & 64 ? c.type.remove(c, u, p, _, ut, m) : E && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (v !== he || w > 0 && w & 64) ? Ae(E, u, p, !1, !0) : (v === he && w & 384 || !_ && D & 16) && Ae(b, u, p), m && Dn(c);
    }
    (L && (B = O && O.onVnodeUnmounted) || T) && de(() => {
      B && we(B, u, c), T && Je(c, null, u, "unmounted");
    }, p);
  }, Dn = (c) => {
    const { type: u, el: p, anchor: m, transition: _ } = c;
    if (u === he) {
      process.env.NODE_ENV !== "production" && c.patchFlag > 0 && c.patchFlag & 2048 && _ && !_.persisted ? c.children.forEach((O) => {
        O.type === se ? r(O.el) : Dn(O);
      }) : Vs(p, m);
      return;
    }
    if (u === Gt) {
      $e(c);
      return;
    }
    const v = () => {
      r(p), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (c.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: O, delayLeave: N } = _, b = () => O(p, v);
      N ? N(c.el, v, b) : b();
    } else
      v();
  }, Vs = (c, u) => {
    let p;
    for (; c !== u; )
      p = g(c), r(c), c = p;
    r(u);
  }, Cs = (c, u, p) => {
    process.env.NODE_ENV !== "production" && c.type.__hmrId && $i(c);
    const { bum: m, scope: _, update: v, subTree: O, um: N } = c;
    m && Ot(m), _.stop(), v && (v.active = !1, je(O, c, u, p)), N && de(N, u), de(() => {
      c.isUnmounted = !0;
    }, u), u && u.pendingBranch && !u.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === u.pendingId && (u.deps--, u.deps === 0 && u.resolve()), process.env.NODE_ENV !== "production" && Si(c);
  }, Ae = (c, u, p, m = !1, _ = !1, v = 0) => {
    for (let O = v; O < c.length; O++)
      je(c[O], u, p, m, _);
  }, Bt = (c) => c.shapeFlag & 6 ? Bt(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : g(c.anchor || c.el), Do = (c, u, p) => {
    c == null ? u._vnode && je(u._vnode, null, null, !0) : R(u._vnode || null, c, u, null, null, null, p), jo(), Hr(), u._vnode = c;
  }, ut = {
    p: R,
    um: je,
    m: kt,
    r: Dn,
    mt: ie,
    mc: k,
    pc: bt,
    pbc: G,
    n: Bt,
    o: e
  };
  let xn, Vn;
  return t && ([xn, Vn] = t(ut)), {
    render: Do,
    hydrate: xn,
    createApp: Mc(Do, xn)
  };
}
function Ye({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Qt(e, t, n = !1) {
  const o = e.children, r = t.children;
  if (C(o) && C(r))
    for (let s = 0; s < o.length; s++) {
      const i = o[s];
      let l = r[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[s] = Ue(r[s]), l.el = i.el), n || Qt(i, l)), process.env.NODE_ENV !== "production" && l.type === se && !l.el && (l.el = i.el);
    }
}
function jc(e) {
  const t = e.slice(), n = [0];
  let o, r, s, i, l;
  const f = e.length;
  for (o = 0; o < f; o++) {
    const a = e[o];
    if (a !== 0) {
      if (r = n[n.length - 1], e[r] < a) {
        t[o] = r, n.push(o);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        l = s + i >> 1, e[n[l]] < a ? s = l + 1 : i = l;
      a < e[n[s]] && (s > 0 && (t[o] = n[s - 1]), n[s] = o);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
const Lc = (e) => e.__isTeleport, he = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), bn = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), se = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0), Gt = Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0), Tt = [];
let Ne = null;
function hs(e = !1) {
  Tt.push(Ne = e ? null : []);
}
function Hc() {
  Tt.pop(), Ne = Tt[Tt.length - 1] || null;
}
let Mt = 1;
function Xo(e) {
  Mt += e;
}
function _s(e) {
  return e.dynamicChildren = Mt > 0 ? Ne || mt : null, Hc(), Mt > 0 && Ne && Ne.push(e), e;
}
function Uc(e, t, n, o, r, s) {
  return _s(gs(
    e,
    t,
    n,
    o,
    r,
    s,
    !0
    /* isBlock */
  ));
}
function kc(e, t, n, o, r) {
  return _s(Ce(
    e,
    t,
    n,
    o,
    r,
    !0
    /* isBlock: prevent a block from tracking itself */
  ));
}
function yn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ge(e, t) {
  return process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && dt.has(t.type) ? !1 : e.type === t.type && e.key === t.key;
}
const Bc = (...e) => Es(...e), On = "__vInternal", ms = ({ key: e }) => e ?? null, en = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? Q(e) || te(e) || $(e) ? { i: re, r: e, k: t, f: !!n } : e : null;
function gs(e, t = null, n = null, o = 0, r = null, s = e === he ? 0 : 1, i = !1, l = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ms(t),
    ref: t && en(t),
    scopeId: qr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null
  };
  return l ? (yo(f, n), s & 128 && e.normalize(f)) : n && (f.shapeFlag |= Q(n) ? 8 : 16), process.env.NODE_ENV !== "production" && f.key !== f.key && y("VNode created with invalid key (NaN). VNode type:", f.type), Mt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ne && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (f.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  f.patchFlag !== 32 && Ne.push(f), f;
}
const Ce = process.env.NODE_ENV !== "production" ? Bc : Es;
function Es(e, t = null, n = null, o = 0, r = null, s = !1) {
  if ((!e || e === ac) && (process.env.NODE_ENV !== "production" && !e && y(`Invalid vnode type when creating vnode: ${e}.`), e = se), yn(e)) {
    const l = Te(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && yo(l, n), Mt > 0 && !s && Ne && (l.shapeFlag & 6 ? Ne[Ne.indexOf(e)] = l : Ne.push(l)), l.patchFlag |= -2, l;
  }
  if (ws(e) && (e = e.__vccOpts), t) {
    t = Kc(t);
    let { class: l, style: f } = t;
    l && !Q(l) && (t.class = ro(l)), z(f) && (Un(f) && !C(f) && (f = X({}, f)), t.style = oo(f));
  }
  const i = Q(e) ? 1 : qi(e) ? 128 : Lc(e) ? 64 : z(e) ? 4 : $(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Un(e) && (e = A(e), y("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), gs(e, t, n, o, r, i, s, !0);
}
function Kc(e) {
  return e ? Un(e) || On in e ? X({}, e) : e : null;
}
function Te(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: s, children: i } = e, l = t ? Wc(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && ms(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? C(r) ? r.concat(en(t)) : [r, en(t)] : en(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && C(i) ? i.map(Ns) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== he ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Te(e.ssContent),
    ssFallback: e.ssFallback && Te(e.ssFallback),
    el: e.el,
    anchor: e.anchor
  };
}
function Ns(e) {
  const t = Te(e);
  return C(e.children) && (t.children = e.children.map(Ns)), t;
}
function vs(e = " ", t = 0) {
  return Ce(bn, null, e, t);
}
function Ee(e) {
  return e == null || typeof e == "boolean" ? Ce(se) : C(e) ? Ce(
    he,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Ue(e) : Ce(bn, null, String(e));
}
function Ue(e) {
  return e.el === null || e.memo ? e : Te(e);
}
function yo(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (C(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), yo(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(On in t) ? t._ctx = re : r === 3 && re && (re.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    $(t) ? (t = { default: t, _ctx: re }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [vs(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Wc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = ro([t.class, o.class]));
      else if (r === "style")
        t.style = oo([t.style, o.style]);
      else if (St(r)) {
        const s = t[r], i = o[r];
        i && s !== i && !(C(s) && s.includes(i)) && (t[r] = s ? [].concat(s, i) : i);
      } else
        r !== "" && (t[r] = o[r]);
  }
  return t;
}
function we(e, t, n, o = null) {
  me(e, t, 7, [
    n,
    o
  ]);
}
const zc = ps();
let qc = 0;
function Jc(e, t, n) {
  const o = e.type, r = (t ? t.appContext : e.appContext) || zc, s = {
    uid: qc++,
    vnode: e,
    type: o,
    parent: t,
    appContext: r,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new Hs(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: ls(o, r),
    emitsOptions: zr(o, r),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: U,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: U,
    data: U,
    props: U,
    attrs: U,
    slots: U,
    refs: U,
    setupState: U,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return process.env.NODE_ENV !== "production" ? s.ctx = pc(s) : s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Hi.bind(null, s), e.ce && e.ce(s), s;
}
let ee = null;
const Yc = () => ee || re, Nt = (e) => {
  ee = e, e.scope.on();
}, it = () => {
  ee && ee.scope.off(), ee = null;
}, Zc = /* @__PURE__ */ vt("slot,component");
function Gn(e, t) {
  const n = t.isNativeTag || ar;
  (Zc(e) || n(e)) && y("Do not use built-in or reserved HTML elements as component id: " + e);
}
function bs(e) {
  return e.vnode.shapeFlag & 4;
}
let Rt = !1;
function Xc(e, t = !1) {
  Rt = t;
  const { props: n, children: o } = e.vnode, r = bs(e);
  yc(e, n, r, t), Ic(e, o);
  const s = r ? Qc(e, t) : void 0;
  return Rt = !1, s;
}
function Qc(e, t) {
  var n;
  const o = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (o.name && Gn(o.name, e.appContext.config), o.components) {
      const s = Object.keys(o.components);
      for (let i = 0; i < s.length; i++)
        Gn(s[i], e.appContext.config);
    }
    if (o.directives) {
      const s = Object.keys(o.directives);
      for (let i = 0; i < s.length; i++)
        ns(s[i]);
    }
    o.compilerOptions && Gc() && y('"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.');
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Tr(new Proxy(e.ctx, rs)), process.env.NODE_ENV !== "production" && hc(e);
  const { setup: r } = o;
  if (r) {
    const s = e.setupContext = r.length > 1 ? el(e) : null;
    Nt(e), lt();
    const i = Re(r, e, 0, [process.env.NODE_ENV !== "production" ? ht(e.props) : e.props, s]);
    if (ft(), it(), co(i)) {
      if (i.then(it, it), t)
        return i.then((l) => {
          Qo(e, l, t);
        }).catch((l) => {
          gn(
            l,
            e,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      if (e.asyncDep = i, process.env.NODE_ENV !== "production" && !e.suspense) {
        const l = (n = o.name) !== null && n !== void 0 ? n : "Anonymous";
        y(`Component <${l}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
      }
    } else
      Qo(e, i, t);
  } else
    ys(e, t);
}
function Qo(e, t, n) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : z(t) ? (process.env.NODE_ENV !== "production" && yn(t) && y("setup() should not return VNodes directly - return a render function instead."), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Pr(t), process.env.NODE_ENV !== "production" && _c(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && y(`setup() should return an object. Received: ${t === null ? "null" : typeof t}`), ys(e, n);
}
let eo;
const Gc = () => !eo;
function ys(e, t, n) {
  const o = e.type;
  if (!e.render) {
    if (!t && eo && !o.render) {
      const r = o.template;
      if (r) {
        process.env.NODE_ENV !== "production" && Pe(e, "compile");
        const { isCustomElement: s, compilerOptions: i } = e.appContext.config, { delimiters: l, compilerOptions: f } = o, a = X(X({
          isCustomElement: s,
          delimiters: l
        }, i), f);
        o.render = eo(r, a), process.env.NODE_ENV !== "production" && Me(e, "compile");
      }
    }
    e.render = o.render || ne;
  }
  Nt(e), lt(), gc(e), ft(), it(), process.env.NODE_ENV !== "production" && !o.render && e.render === ne && !t && (o.template ? y(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
    /* should not happen */
  ) : y("Component is missing template or render function."));
}
function Go(e) {
  return new Proxy(e.attrs, process.env.NODE_ENV !== "production" ? {
    get(t, n) {
      return cn(), pe(e, "get", "$attrs"), t[n];
    },
    set() {
      return y("setupContext.attrs is readonly."), !1;
    },
    deleteProperty() {
      return y("setupContext.attrs is readonly."), !1;
    }
  } : {
    get(t, n) {
      return pe(e, "get", "$attrs"), t[n];
    }
  });
}
function el(e) {
  const t = (o) => {
    process.env.NODE_ENV !== "production" && e.exposed && y("expose() should be called only once per setup()."), e.exposed = o || {};
  };
  let n;
  return process.env.NODE_ENV !== "production" ? Object.freeze({
    get attrs() {
      return n || (n = Go(e));
    },
    get slots() {
      return ht(e.slots);
    },
    get emit() {
      return (o, ...r) => e.emit(o, ...r);
    },
    expose: t
  }) : {
    get attrs() {
      return n || (n = Go(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Oo(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Pr(Tr(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Et)
          return Et[n](e);
      }
    }));
}
const tl = /(?:^|[-_])(\w)/g, nl = (e) => e.replace(tl, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Os(e, t = !0) {
  return $(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function wn(e, t, n = !1) {
  let o = Os(t);
  if (!o && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (o = r[1]);
  }
  if (!o && e && e.parent) {
    const r = (s) => {
      for (const i in s)
        if (s[i] === t)
          return i;
    };
    o = r(e.components || e.parent.type.components) || r(e.appContext.components);
  }
  return o ? nl(o) : n ? "App" : "Anonymous";
}
function ws(e) {
  return $(e) && "__vccOpts" in e;
}
const Ds = (e, t) => Ni(e, t, Rt);
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function Pn(e) {
  return !!(e && e.__v_isShallow);
}
function ol() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, o = { style: "color:#9d288c" }, r = {
    header(d) {
      return z(d) ? d.__isVue ? ["div", e, "VueInstance"] : te(d) ? [
        "div",
        {},
        ["span", e, h(d)],
        "<",
        l(d.value),
        ">"
      ] : ot(d) ? [
        "div",
        {},
        ["span", e, Pn(d) ? "ShallowReactive" : "Reactive"],
        "<",
        l(d),
        `>${ze(d) ? " (readonly)" : ""}`
      ] : ze(d) ? [
        "div",
        {},
        ["span", e, Pn(d) ? "ShallowReadonly" : "Readonly"],
        "<",
        l(d),
        ">"
      ] : null : null;
    },
    hasBody(d) {
      return d && d.__isVue;
    },
    body(d) {
      if (d && d.__isVue)
        return [
          "div",
          {},
          ...s(d.$)
        ];
    }
  };
  function s(d) {
    const g = [];
    d.type.props && d.props && g.push(i("props", A(d.props))), d.setupState !== U && g.push(i("setup", d.setupState)), d.data !== U && g.push(i("data", A(d.data)));
    const x = f(d, "computed");
    x && g.push(i("computed", x));
    const P = f(d, "inject");
    return P && g.push(i("injected", P)), g.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: d }]
    ]), g;
  }
  function i(d, g) {
    return g = X({}, g), Object.keys(g).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        d
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(g).map((x) => [
          "div",
          {},
          ["span", o, x + ": "],
          l(g[x], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(d, g = !0) {
    return typeof d == "number" ? ["span", t, d] : typeof d == "string" ? ["span", n, JSON.stringify(d)] : typeof d == "boolean" ? ["span", o, d] : z(d) ? ["object", { object: g ? A(d) : d }] : ["span", n, String(d)];
  }
  function f(d, g) {
    const x = d.type;
    if ($(x))
      return;
    const P = {};
    for (const I in d.ctx)
      a(x, I, g) && (P[I] = d.ctx[I]);
    return P;
  }
  function a(d, g, x) {
    const P = d[x];
    if (C(P) && P.includes(g) || z(P) && g in P || d.extends && a(d.extends, g, x) || d.mixins && d.mixins.some((I) => a(I, g, x)))
      return !0;
  }
  function h(d) {
    return Pn(d) ? "ShallowRef" : d.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
const er = "3.2.38", rl = "http://www.w3.org/2000/svg", et = typeof document < "u" ? document : null, tr = et && /* @__PURE__ */ et.createElement("template"), sl = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const r = t ? et.createElementNS(rl, e) : et.createElement(e, n ? { is: n } : void 0);
    return e === "select" && o && o.multiple != null && r.setAttribute("multiple", o.multiple), r;
  },
  createText: (e) => et.createTextNode(e),
  createComment: (e) => et.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => et.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  cloneNode(e) {
    const t = e.cloneNode(!0);
    return "_value" in e && (t._value = e._value), t;
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, r, s) {
    const i = n ? n.previousSibling : t.lastChild;
    if (r && (r === s || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === s || !(r = r.nextSibling)); )
        ;
    else {
      tr.innerHTML = o ? `<svg>${e}</svg>` : e;
      const l = tr.content;
      if (o) {
        const f = l.firstChild;
        for (; f.firstChild; )
          l.appendChild(f.firstChild);
        l.removeChild(f);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function il(e, t, n) {
  const o = e._vtc;
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function cl(e, t, n) {
  const o = e.style, r = Q(n);
  if (n && !r) {
    for (const s in n)
      to(o, s, n[s]);
    if (t && !Q(t))
      for (const s in t)
        n[s] == null && to(o, s, "");
  } else {
    const s = o.display;
    r ? t !== n && (o.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (o.display = s);
  }
}
const nr = /\s*!important$/;
function to(e, t, n) {
  if (C(n))
    n.forEach((o) => to(e, t, o));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = ll(e, t);
    nr.test(n) ? e.setProperty(ve(o), n.replace(nr, ""), "important") : e[o] = n;
  }
}
const or = ["Webkit", "Moz", "ms"], Mn = {};
function ll(e, t) {
  const n = Mn[t];
  if (n)
    return n;
  let o = Ke(t);
  if (o !== "filter" && o in e)
    return Mn[t] = o;
  o = dn(o);
  for (let r = 0; r < or.length; r++) {
    const s = or[r] + o;
    if (s in e)
      return Mn[t] = s;
  }
  return t;
}
const rr = "http://www.w3.org/1999/xlink";
function fl(e, t, n, o, r) {
  if (o && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(rr, t.slice(6, t.length)) : e.setAttributeNS(rr, t, n);
  else {
    const s = $s(t);
    n == null || s && !fr(n) ? e.removeAttribute(t) : e.setAttribute(t, s ? "" : n);
  }
}
function ul(e, t, n, o, r, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    o && i(o, r, s), e[t] = n ?? "";
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && // custom elements may use _value internally
  !e.tagName.includes("-")) {
    e._value = n;
    const f = n ?? "";
    (e.value !== f || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    e.tagName === "OPTION") && (e.value = f), n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const f = typeof e[t];
    f === "boolean" ? n = fr(n) : n == null && f === "string" ? (n = "", l = !0) : f === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch (f) {
    process.env.NODE_ENV !== "production" && y(`Failed setting prop "${t}" on <${e.tagName.toLowerCase()}>: value ${n} is invalid.`, f);
  }
  l && e.removeAttribute(t);
}
const [xs, al] = /* @__PURE__ */ (() => {
  let e = Date.now, t = !1;
  if (typeof window < "u") {
    Date.now() > document.createEvent("Event").timeStamp && (e = performance.now.bind(performance));
    const n = navigator.userAgent.match(/firefox\/(\d+)/i);
    t = !!(n && Number(n[1]) <= 53);
  }
  return [e, t];
})();
let no = 0;
const dl = /* @__PURE__ */ Promise.resolve(), pl = () => {
  no = 0;
}, hl = () => no || (dl.then(pl), no = xs());
function _l(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function ml(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
function gl(e, t, n, o, r = null) {
  const s = e._vei || (e._vei = {}), i = s[t];
  if (o && i)
    i.value = o;
  else {
    const [l, f] = El(t);
    if (o) {
      const a = s[t] = Nl(o, r);
      _l(e, l, a, f);
    } else
      i && (ml(e, l, i, f), s[t] = void 0);
  }
}
const sr = /(?:Once|Passive|Capture)$/;
function El(e) {
  let t;
  if (sr.test(e)) {
    t = {};
    let o;
    for (; o = e.match(sr); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ve(e.slice(2)), t];
}
function Nl(e, t) {
  const n = (o) => {
    const r = o.timeStamp || xs();
    (al || r >= n.attached - 1) && me(vl(o, n.value), t, 5, [o]);
  };
  return n.value = e, n.attached = hl(), n;
}
function vl(e, t) {
  if (C(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((o) => (r) => !r._stopped && o && o(r));
  } else
    return t;
}
const ir = /^on[a-z]/, bl = (e, t, n, o, r = !1, s, i, l, f) => {
  t === "class" ? il(e, o, r) : t === "style" ? cl(e, n, o) : St(t) ? tn(t) || gl(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : yl(e, t, o, r)) ? ul(e, t, o, s, i, l, f) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), fl(e, t, o, r));
};
function yl(e, t, n, o) {
  return o ? !!(t === "innerHTML" || t === "textContent" || t in e && ir.test(t) && $(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || ir.test(t) && Q(n) ? !1 : t in e;
}
function Ol(e, t) {
  const n = ec(e);
  class o extends wo {
    constructor(s) {
      super(n, s, t);
    }
  }
  return o.def = n, o;
}
const wl = typeof HTMLElement < "u" ? HTMLElement : class {
};
class wo extends wl {
  constructor(t, n = {}, o) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && o ? o(this._createVNode(), this.shadowRoot) : (process.env.NODE_ENV !== "production" && this.shadowRoot && y("Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use `defineSSRCustomElement`."), this.attachShadow({ mode: "open" }));
  }
  connectedCallback() {
    this._connected = !0, this._instance || this._resolveDef();
  }
  disconnectedCallback() {
    this._connected = !1, Fr(() => {
      this._connected || (lr(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._resolved)
      return;
    this._resolved = !0;
    for (let o = 0; o < this.attributes.length; o++)
      this._setAttr(this.attributes[o].name);
    new MutationObserver((o) => {
      for (const r of o)
        this._setAttr(r.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (o) => {
      const { props: r, styles: s } = o, i = !C(r), l = r ? i ? Object.keys(r) : r : [];
      let f;
      if (i)
        for (const a in this._props) {
          const h = r[a];
          (h === Number || h && h.type === Number) && (this._props[a] = Rn(this._props[a]), (f || (f = /* @__PURE__ */ Object.create(null)))[a] = !0);
        }
      this._numberProps = f;
      for (const a of Object.keys(this))
        a[0] !== "_" && this._setProp(a, this[a], !0, !1);
      for (const a of l.map(Ke))
        Object.defineProperty(this, a, {
          get() {
            return this._getProp(a);
          },
          set(h) {
            this._setProp(a, h);
          }
        });
      this._applyStyles(s), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then(t) : t(this._def);
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    this._numberProps && this._numberProps[t] && (n = Rn(n)), this._setProp(Ke(t), n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, o = !0, r = !0) {
    n !== this._props[t] && (this._props[t] = n, r && this._instance && this._update(), o && (n === !0 ? this.setAttribute(ve(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(ve(t), n + "") : n || this.removeAttribute(ve(t))));
  }
  _update() {
    lr(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Ce(this._def, X({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0, process.env.NODE_ENV !== "production" && (n.ceReload = (r) => {
        this._styles && (this._styles.forEach((s) => this.shadowRoot.removeChild(s)), this._styles.length = 0), this._applyStyles(r), this._def.__asyncLoader || (this._instance = null, this._update());
      }), n.emit = (r, ...s) => {
        this.dispatchEvent(new CustomEvent(r, {
          detail: s
        }));
      };
      let o = this;
      for (; o = o && (o.parentNode || o.host); )
        if (o instanceof wo) {
          n.parent = o._instance;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const o = document.createElement("style");
      o.textContent = n, this.shadowRoot.appendChild(o), process.env.NODE_ENV !== "production" && (this._styles || (this._styles = [])).push(o);
    });
  }
}
const Dl = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Gi.props;
const xl = /* @__PURE__ */ X({ patchProp: bl }, sl);
let cr;
function Vl() {
  return cr || (cr = Sc(xl));
}
const lr = (...e) => {
  Vl().render(...e);
};
function Cl() {
  ol();
}
process.env.NODE_ENV !== "production" && Cl();
const Tl = `.current-time-component{color:purple}
`, $l = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Il = ["id"], Al = {
  __name: "CurrentTime.ce",
  props: {
    id: {
      type: String,
      default: ""
    },
    timeZone: {
      type: String,
      default: "Europe/Amsterdam"
    }
  },
  emits: ["datechange"],
  setup(e, { emit: t }) {
    const n = e, o = Fo(/* @__PURE__ */ new Date()), r = Fo(n.timeZone);
    console.log("props", n);
    const s = Ds(
      () => o.value.toLocaleString("nl-NL", {
        timeZone: r.value || "Europe/Amsterdam"
      })
    );
    function i(f) {
      console.log("changeTimeZone", f.detail), r.value = f.detail?.timeZone || "Europe/Amsterdam";
    }
    function l() {
      console.log("listenEvents", n), document.querySelector(n.id ? "#" + n.id : "current-time").addEventListener("timezonechange", i);
    }
    return No(l), setInterval(() => {
      o.value = /* @__PURE__ */ new Date(), t("datechange", s);
    }, 1e3), (f, a) => (hs(), Uc("div", {
      class: "current-time-component",
      id: e.id
    }, [
      dc(f.$slots, "prefix"),
      vs(" " + Ms(Ar(s)) + " ... ", 1)
    ], 8, Il));
  }
}, Pl = /* @__PURE__ */ $l(Al, [["styles", [Tl]]]);
const Ml = Ol(Pl);
customElements.get("current-time") || customElements.define("current-time", Ml);
export {
  Pl as CurrentTime
};
//# sourceMappingURL=vite-current-time-full.js.map
