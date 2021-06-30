export const createMap = function (parent, action, coords) {
  const map = L.map(parent)
    .on('load', () => { action;})
    .setView(coords, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  return map;
};

export const createSpecialMarker = function (coords) {
  return L.marker(
    coords,
    {
      draggable: true,
      riseOnHover: true,
      icon: L.icon({
        iconUrl: '../img/main-pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      }),
      zIndexOffset: 1,
      autoPan: true,
      autoPanPadding: [60, 60],
    },
  );
};

export const createCommonMarker = function (coords) {
  return L.marker(
    coords,
    {
      riseOnHover: true,
      icon: L.icon({
        iconUrl: '../img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      }),
    },
  );
};
