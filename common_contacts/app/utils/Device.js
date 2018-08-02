import { Dimensions, Platform, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window')

function isIphoneX () {
  return width === 375 && height === 812
}

function statusBarHeightForIOS () {
  if (isIphoneX()) return 44
  return 20
}

const scale = uiWidth => {
  const screenWidth = width < height ? width : height
  return Math.floor((screenWidth / 375) * uiWidth)
}

const Device = {
  width: Dimensions.get('window').width,

  height: Dimensions.get('window').height,

  isIOS: Platform.OS === 'ios',
  scale: (uiWidth) => {
    // 已375为基准计算
    const width = Dimensions.get(Platform.OS === 'ios' ? 'window' : 'window').width
    return (width / 375) * uiWidth
  },

  statusBarHeight: Platform.OS === 'android' ? scale(18) : statusBarHeightForIOS(),
  navBarHeight: Platform.OS === 'android' ? scale(65) : scale(44) + statusBarHeightForIOS(),
  fontSizeScale: fontSize => Math.round(fontSize * (PixelRatio.get() / PixelRatio.getFontScale())),

  fixedStyle: (style) => {
    const sty = style || {}
    if (Platform.OS === 'ios') {
      return [sty, { flex: 1 }]
    }

    return [sty, { height: Dimensions.get('window').height }]
  }
}

export default Device
