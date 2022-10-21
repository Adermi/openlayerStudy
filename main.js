import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import IMG from 'ol/source/Image';

const publicKey = 'b04f92e5f9e0d8cda0badeadc46163f6';
// const url = `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=${publicKey}`;
const url = `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${publicKey}`;
const url2 = `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${publicKey}`;

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      title: '天地矢量图层',
      source: new XYZ({
        url: url,
        attributions: '天地图的属性描述',
        wrapX: false,
      }),
    }),
    new TileLayer({
      title: '天地矢量标记图层',
      source: new XYZ({
        url: url2,
      }),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 3,
  }),
});
