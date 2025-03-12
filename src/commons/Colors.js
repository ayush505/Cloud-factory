/* eslint-disable */
// Partner Hub brand Color
export const PH_BLUE = '#0252cd';
export const PH_DARK_BLUE = '#0b2b5c';
export const PH_PRIMARY_BLUE = '#095FE0';

// Primary brand Color
export const BLUE = '#0486ff';
export const BLUE_6 = '#1890FF';
export const BLUE_80 = '#379fff';
export const BLUE_60 = '#8cc7ff';
export const BLUE_40 = '#d0e8ff';
export const BLUE_20 = '#f1f8ff';
export const BLUE_FAINT = '#2684FF';
export const BLUE_LIGHT = '#1D67FA';

// Dark Blue Shade
export const DARK_BLUE = '#3e4977';
export const DARK_BLUE_10 = '#47517D';
export const DARK_BLUE_20 = '#556B8D';
export const DARK_BLUE_60 = '#747ea9';
export const DARK_BLUE_40 = '#949bbc';

// Grayscale
export const GREY_5 = '#d8dde6';
export const GREY_8 = '#7A8AAC';
export const GREY_9 = '#3D4961';
export const GREY_80 = '#cbd1e0';
export const GREY_70 = '#CCD0E2';
export const GREY_60 = '#d7ddeb';
export const GREY_40 = '#e2e7f4';
export const GREY_30 = '#F3F5F8';
export const GREY_20 = '#f2f4f8';
export const GREY_10 = '#f7f8fb';
export const GREY = '#ADB9CC';
export const BORDER_GREY = '#E8ECF6';
export const WHITE = '#FFFFFF';
export const PROFILE_GREY = '#f1f2f5';
export const DARK_GREY = '#54575a';

// Green
export const GREEN_01 = '#3DC98D';
export const GREEN_6 = '#52C41A';
export const GREEN = '#00ac65';
export const GREEN_80 = '#00bd6f';
export const GREEN_40 = '#cff0e2';
export const GREEN_20 = '#f6fef8';

// Reds
export const RED = '#d0021b';
export const RED_7 = '#CF1322';
export const RED_60 = '#fc6c7d';
export const RED_40 = '#febfc7';
export const RED_20 = '#ffe6e9';

// Yellow
export const YELLOW_01 = '#FEC93E';
export const YELLOW = '#edb72f';
export const YELLOW_60 = '#f2cd6e';
export const YELLOW_20 = '#fff7e8';

// Purple = Not as per brand book, which we have not recd
export const PURPLE = '#9657ce';
export const PURPLE_80 = '#af7eda';
export const PURPLE_20 = '#f2e4ff';

// BLACK
export const BLACK = '#000';

// ADD ON COLORS
export const GREY_BORDER = '#D9DFEE';
export const GREY_FILL = '#D9DFEE';
export const GREY_BORDER_77 = '#C4C4C4';
export const GREY_82 = '#D1D1D1';
export const GREY_NOBEL = '#D1D1D1';
export const GREY_FAINT = '#979797';
export const GREY_DISABLED = '#E5E7EC';
export const GREY_LIGHT = '#F2F2F2';
export const GREY_SHADOW = '#ECEDF5';

// Convert COlor to RGB Format
export const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

export const rgba = (hex, alpha) => {
  const color = hexToRgb(hex);
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
};
