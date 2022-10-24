import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import { defaults as defaultControls } from 'ol/control';
import { transform } from 'ol/proj';

const publicKey = 'b04f92e5f9e0d8cda0badeadc46163f6';
const url = `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${publicKey}`;
const url2 = `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${publicKey}`;

const mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  className: 'custom-mouse-position',
  target: document.querySelector('.mouse-position'),
  placeholder: '找不到',
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: url,
        wrapX: false,
      }),
    }),
    new TileLayer({
      source: new XYZ({
        url: url2,
        wrapX: false,
      }),
    }),
  ],
  view: new View({
    zoom: 2, // 地图初始显示层级
    center: [0, 0],
  }),
  controls: defaultControls().extend([mousePositionControl]),
});

// 修改投影坐标
const projection = document.querySelector('#projection');
projection.addEventListener('change', function (e) {
  mousePositionControl.setProjection(e.target.value);
});

// 修改投影坐标精度
const number = document.querySelector('#Precision');
number.addEventListener('change', function (e) {
  const format = createStringXY(e.target.valueAsNumber);
  mousePositionControl.setCoordinateFormat(format);
});

map.addEventListener('click', (e) => {
  console.log(transform(map.getEventCoordinate(e), 'EPSG:3857', 'EPSG:4326'));
});
