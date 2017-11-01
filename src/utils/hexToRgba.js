export default (hex, opacity) =>
  `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt('0x' + hex.slice(3, 5))},${parseInt(
    '0x' + hex.slice(5, 7)
  )},${opacity})`;
