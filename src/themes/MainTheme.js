import { StyleSheet } from 'react-native'

export const colors = {
  primary: "#fc5c65",
  secondary: "#4ecdc4",
  black: "#000",
  textDark: '#14478b',
  textLight: '#f8f9f8',
  textholder: '#666666',
  forground: '#275ca5',
  forground2: '#f2b80e',
  forground3: '#f2f2f2',
  forground4: '#44a6a6',
  background: '#009387',
  background1: '#08d4c4',
  background2: '#d61503',
  white: '#ffffff',
  light: "#f8f4f4",
  medium: "#6e6969",
}

export default MainTheme = StyleSheet.create({
  header1: {
    fontSize: 25,
    fontWeight: '600',
    color: colors.forground4,
  },
  header2: {
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'italic',
    color: colors.forground2,
  },
  body: {
    fontSize: 16,
    color: colors.textDark,
  },
  card: {
    borderColor: colors.forground,
    borderWidth: 5,
    borderRadius: 10,
    padding: 20,
    width: '50%',
    height: 150,
  },
})