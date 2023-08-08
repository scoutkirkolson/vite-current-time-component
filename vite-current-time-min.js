import { ref as i, computed as a, onMounted as u, openBlock as d, createElementBlock as p, renderSlot as f, createTextVNode as g, toDisplayString as _, unref as v, defineCustomElement as E } from "vue";
const y = `.current-time-component{color:purple}
`, T = (t, c) => {
  const e = t.__vccOpts || t;
  for (const [n, o] of c)
    e[n] = o;
  return e;
}, h = ["id"], Z = {
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
  setup(t, { emit: c }) {
    const e = t, n = i(/* @__PURE__ */ new Date()), o = i(e.timeZone);
    console.log("props", e);
    const s = a(
      () => n.value.toLocaleString("nl-NL", {
        timeZone: o.value || "Europe/Amsterdam"
      })
    );
    function m(r) {
      console.log("changeTimeZone", r.detail), o.value = r.detail?.timeZone || "Europe/Amsterdam";
    }
    function l() {
      console.log("listenEvents", e), document.querySelector(e.id ? "#" + e.id : "current-time").addEventListener("timezonechange", m);
    }
    return u(l), setInterval(() => {
      n.value = /* @__PURE__ */ new Date(), c("datechange", s);
    }, 1e3), (r, x) => (d(), p("div", {
      class: "current-time-component",
      id: t.id
    }, [
      f(r.$slots, "prefix"),
      g(" " + _(v(s)) + " ... ", 1)
    ], 8, h));
  }
}, S = /* @__PURE__ */ T(Z, [["styles", [y]]]);
const C = E(S);
customElements.get("current-time") || customElements.define("current-time", C);
export {
  S as CurrentTime
};
//# sourceMappingURL=vite-current-time-min.js.map
