import { StyleSheet } from 'react-native'
import { Variables } from './Variables'

export const Font = (family, size, color) => {
  return {
    fontFamily: Variables().fonts.family[family],
    fontSize: Variables().fonts.size[size],
    color: color
  }
}

export const FontAdapt = (family, size, color) => {
  return {
    fontFamily: Variables().fonts.family[family],
    fontSize: size,
    color: color
  }
}

export const fontConfig = {
  ios: {
    regular: {
      fontFamily: Variables().fonts.family[400],
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: Variables().fonts.family[500],
      fontWeight: 'normal'
    },
    light: {
      fontFamily: Variables().fonts.family[300],
      fontWeight: 'normal'
    },
    thin: {
      fontFamily: Variables().fonts.family[100],
      fontWeight: 'normal'
    }
  },
  android: {
    regular: {
      fontFamily: Variables().fonts.family[400],
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: Variables().fonts.family[500],
      fontWeight: 'normal'
    },
    light: {
      fontFamily: Variables().fonts.family[300],
      fontWeight: 'normal'
    },
    thin: {
      fontFamily: Variables().fonts.family[100],
      fontWeight: 'normal'
    }
  }
}
