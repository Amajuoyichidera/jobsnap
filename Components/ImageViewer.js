import { StyleSheet, View, Image } from 'react-native';

const ImageViewer = ({placeholder, image}) => {
    const imageSource = image ? {uri: image} : placeholder;
  return (
    <View>
      <Image source={imageSource} style={styles.image} />
    </View>
  )
}

export default ImageViewer

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
})