import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import IMG from 'ol/source/Image';
import ZoomSlider from 'ol/control/ZoomSlider';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import { fromLonLat, transform } from 'ol/proj';

const publicKey = 'b04f92e5f9e0d8cda0badeadc46163f6';
// const url = `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=${publicKey}`;
const url = `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${publicKey}`;
const url2 = `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${publicKey}`;
const url3 = `http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${publicKey}`;
const url4 = `http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${publicKey}`;

let lay = new TileLayer({
  name: '天地图矢量图层',
  source: new XYZ({
    url: url,
  }),
});

let layTag = new TileLayer({
  name: '天地图标记层',
  source: new XYZ({
    url: url2,
  }),
});

let shape = new TileLayer({
  name: '天地图地形影像图图层',
  source: new XYZ({
    url: url3,
  }),
});

let shapeTag = new TileLayer({
  name: '天地图地形影像图标记层',
  source: new XYZ({
    url: url4,
  }),
});

let map = new Map({
  target: 'map',
  layers: [lay, layTag, shape, shapeTag],
  view: new View({
    zoom: 2,
    center: [0, 0],
  }),
});

initLayerVisible();

function initLayerVisible() {
  // 图层，图层名和图层是否可见的初始状态列表
  let layer = [];
  let layerName = [];
  let layerVisibity = [];

  let treeContent = document.querySelector('.layerTree');

  // 获取地图中所有图层
  let layers = map.getAllLayers();
  layers.forEach(function (item, idx) {
    layer[idx] = item;
    layerName[idx] = item.get('name');
    layerVisibity[idx] = item.getVisible();

    let className = `ipt${idx}`;
    let li = `
      <li class="${className}">
        <input type="checkbox" id="${className}" ${
      layerVisibity[idx] && 'checked'
    }/>
        <label class="content" for="${className}">${layerName[idx]}</label>
      </li>
    `;

    treeContent.appendChild(
      new DOMParser()
        .parseFromString(li, 'text/html')
        .querySelector(`.${className}`)
    );
    let dom = document.querySelector(`#${className}`);
    dom.addEventListener('click', function (e) {
      console.log(item);
      if (this.checked) {
        item.setVisible(true);
      } else {
        item.setVisible(false);
      }
    });
  });
}
