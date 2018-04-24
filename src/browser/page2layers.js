import {
  Page,
  SymbolMaster,
  nodeToSketchLayers
} from "@brainly/html-sketchapp";

export const getSymbol = ({
  name = "symbol",
  x = 0,
  y = 0,
  querySelector = "*"
} = {}) => {
  let nodes;

  if (querySelector === "*") {
    nodes = document.querySelectorAll("*");
  } else {
    nodes = document.querySelectorAll(querySelector);
  }

  const layers = Array.from(nodes).map(nodeToSketchLayers);

  const symbol = new SymbolMaster({ x, y });

  symbol.setName(name);

  layers
    .reduce((prev, current) => prev.concat(current), []) // single node can produce multiple layers - concatenate them
    .forEach(layer => {
      symbol.addLayer(layer);
    });

  return symbol.toJSON();
};

export const getPage = ({ title, width, height }) => {
  const page = new Page({
    width,
    height
  });

  page.setName(title);

  return page.toJSON();
};
