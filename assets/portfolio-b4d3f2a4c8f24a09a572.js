let Component;
var DotsThree_default = (React) => {
  if (!Component) {
    const renderPathForWeight = (weight, color, pathsByWeight2) => !!pathsByWeight2.get(weight) ? pathsByWeight2.get(weight)(color) : null;
    const pathsByWeight = new Map();
    pathsByWeight.set("bold", () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", {
      cx: "128",
      cy: "128",
      r: "16"
    }), /* @__PURE__ */ React.createElement("circle", {
      cx: "64",
      cy: "128",
      r: "16"
    }), /* @__PURE__ */ React.createElement("circle", {
      cx: "192",
      cy: "128",
      r: "16"
    })));
    pathsByWeight.set("duotone", () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", {
      cx: "128",
      cy: "128",
      r: "12"
    }), /* @__PURE__ */ React.createElement("circle", {
      cx: "192",
      cy: "128",
      r: "12"
    }), /* @__PURE__ */ React.createElement("circle", {
      cx: "64",
      cy: "128",
      r: "12"
    })));
    pathsByWeight.set("fill", () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", {
      d: "M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm52-12a12,12,0,1,0,12,12A12,12,0,0,0,192,116ZM64,116a12,12,0,1,0,12,12A12,12,0,0,0,64,116Z"
    })));
    pathsByWeight.set("light", () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", {
      cx: "128",
      cy: "128",
      r: "10"
    }), /* @__PURE__ */ React.createElement("circle", {
      cx: "64",
      cy: "128",
      r: "10"
    }), /* @__PURE__ */ React.createElement("circle", {
      cx: "192",
      cy: "128",
      r: "10"
    })));
    pathsByWeight.set("thin", () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", {
      cx: "128",
      cy: "128",
      r: "8"
    }), /* @__PURE__ */ React.createElement("circle", {
      cx: "64",
      cy: "128",
      r: "8"
    }), /* @__PURE__ */ React.createElement("circle", {
      cx: "192",
      cy: "128",
      r: "8"
    })));
    pathsByWeight.set("regular", () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", {
      cx: "128",
      cy: "128",
      r: "12"
    }), /* @__PURE__ */ React.createElement("circle", {
      cx: "192",
      cy: "128",
      r: "12"
    }), /* @__PURE__ */ React.createElement("circle", {
      cx: "64",
      cy: "128",
      r: "12"
    })));
    const renderPath = (weight, color) => renderPathForWeight(weight, color, pathsByWeight);
    const DotsThree = React.forwardRef((props, ref) => /* @__PURE__ */ React.createElement("g", {
      ref,
      ...props
    }, renderPath(props.weight, props.color)));
    DotsThree.displayName = "DotsThree";
    Component = DotsThree;
  }
  return Component;
};
const __FramerMetadata__ = {
  exports: {
    default: {
      type: "reactComponent",
      slots: [],
      annotations: { portfolioContractVersion: "1" }
    },
    __FramerMetadata__: { type: "variable" }
  }
};
export {
  __FramerMetadata__,
  DotsThree_default as default
};
