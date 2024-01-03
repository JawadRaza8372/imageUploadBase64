import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const ShowImageScreen = ({navigation, route}) => {
  const {imageLink} = route?.params;
  return (
    <View style={styles.fillMyScreen}>
      <Text style={{...styles.UploadTxt, color: 'black'}}>Uploaded Image</Text>
      <Image source={{uri: imageLink}} style={styles.showImage} />
      <TouchableOpacity onPress={() => navigation.pop()} style={styles.backBtn}>
        <Text style={styles.UploadTxt}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShowImageScreen;

const styles = StyleSheet.create({
  UploadTxt: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  backBtn: {
    width: '85%',
    height: 45,
    backgroundColor: 'grey',
    borderRadius: 40,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  showImage: {
    width: '85%',
    height: Dimensions.get('screen').height / 2.5,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    backgroundColor: 'lightgrey',
    borderRadius: 40,
    overflow: 'hidden',
  },
  fillMyScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
});
