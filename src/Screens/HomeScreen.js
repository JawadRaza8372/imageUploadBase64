import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

const HomeScreen = ({navigation}) => {
  const [ImageLink, setImageLink] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [imageFile, setimageFile] = useState(null);
  const [nextBtn, setnextBtn] = useState('');
  const pickImage = async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      async responce => {
        if (!responce.cancelled) {
          setImageLink(responce.assets[0].base64);
          setimageFile(responce.assets[0]);
        }
      },
    );
  };
  const uploadImageFun = async () => {
    setisLoading(true);
    await fetch(`http://10.0.2.2:5000/uploadImage`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({imageLink: ImageLink}),
    })
      .then(response => {
        return response.json();
      })
      .then(rest => {
        setnextBtn(`${rest?.imageLink}`);
        setImageLink('');
        setimageFile(null);
        setisLoading(false);
      })
      .catch(e => {
        console.log(e);
        setisLoading(true);
      });
  };
  return (
    <View style={styles.fillMyScreen}>
      {imageFile ? (
        <Text style={{...styles.UploadTxt, color: 'black'}}>
          Preview Before upload
        </Text>
      ) : (
        <Text style={{...styles.UploadTxt, color: 'black'}}>
          Press To Choose image
        </Text>
      )}
      <TouchableOpacity style={styles.uploadImageBtn} onPress={pickImage}>
        {ImageLink ? (
          <Image
            source={{uri: 'data:image/png;base64,' + ImageLink}}
            style={styles.tinyLogo}
          />
        ) : (
          <Text style={{...styles.UploadTxt, color: 'black'}}>
            Choose Image
          </Text>
        )}
      </TouchableOpacity>
      {imageFile ? (
        <TouchableOpacity
          onPress={uploadImageFun}
          style={styles.uploadImageBtnBlo}>
          <Text style={styles.UploadTxt}>Upload</Text>
        </TouchableOpacity>
      ) : null}
      {nextBtn?.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShowImageScreen', {imageLink: nextBtn});
            setnextBtn('');
          }}
          style={styles.uploadImageBtnBlo}>
          <Text style={styles.UploadTxt}>View Image</Text>
        </TouchableOpacity>
      ) : null}
      <Modal
        visible={isLoading}
        transparent
        onRequestClose={() => console.log('hy')}>
        <View
          style={{
            ...styles.fillMyScreen,
            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'white'} />
          <Text style={styles.UploadTxt}>loading...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  UploadTxt: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  tinyLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  uploadImageBtnBlo: {
    width: '85%',
    height: 45,
    backgroundColor: 'blue',
    borderRadius: 40,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  uploadImageBtn: {
    width: '85%',
    height: Dimensions.get('screen').height / 2.5,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    backgroundColor: 'lightgrey',
    borderRadius: 40,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
