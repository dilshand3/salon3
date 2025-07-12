import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'

const SalonCard : React.FC = () => {
  const profilePhoto = require("../../../public/Image/shop1.jpg")
  return (
    <View>
        <Image src={profilePhoto} style={styles.profilePhoto}/>
    </View>
  )
}

export default SalonCard;

const styles = StyleSheet.create({
  profilePhoto : {
    height : 100,
    width : 100
  }
})