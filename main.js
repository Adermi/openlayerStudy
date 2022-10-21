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
    zoom: 2,
    minZoom: 1,
    maxZoom: 20,
    // rotation: Math.PI / 6,  // 旋转地图
  }),
});

// 加载地图导航条
// const zoomslider = new ZoomSlider();
// map.addControl(zoomslider);
// let zoomToExtent = new ZoomToExtent({
//   extent: [13100000, 4290000, 13200000, 5210000],
// });
// map.addControl(zoomToExtent);

// 实现地图基本操作按钮
let container = document.querySelector('#map');
let zoomOut = document.querySelector('.zoom-out');
let zoomIn = document.querySelector('.zoom-in');
let moveDf = document.querySelector('.move-df');
let moveRe = document.querySelector('.move-re');
let moveGs = document.querySelector('.move-gs');
let moveMe = document.querySelector('.move-me');

let view = map.getView();
let zoom = view.getZoom();
let center = view.getCenter();
let rotation = view.getRotation();

zoomOut.addEventListener('click', (e) => {
  view.setZoom(view.getZoom() + 1);
});

zoomIn.addEventListener('click', (e) => {
  view.setZoom(view.getZoom() - 1);
});

moveDf.addEventListener('click', (e) => {
  let pos = fromLonLat([120.43540603026085, 30.429337976615216]);
  view.setCenter(pos);
  view.setZoom(18);
});

moveGs.addEventListener('click', (e) => {
  let pos = fromLonLat([120.42681706743825, 30.467916756869542]);
  view.setCenter(pos);
  view.setZoom(18);
});

moveMe.addEventListener('click', (e) => {
  let pos = fromLonLat([119.7789895353736, 29.21168572448559]);
  view.setCenter(pos);
  view.setZoom(18); // 设置缩放等级
});

moveRe.addEventListener('click', (e) => {
  view.setCenter(center); // 初始中心位置
  view.setZoom(zoom); // 初始缩放级别
  view.setRotation(rotation); // 初始缩放角
});

container.addEventListener('click', (e) => {
  console.log(transform(map.getEventCoordinate(e), 'EPSG:3857', 'EPSG:4326'));
});
