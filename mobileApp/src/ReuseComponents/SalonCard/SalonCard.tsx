import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import StarIcon from '../../../public/SvgIcon/StarIcon/StarIcon';

export interface ISalonCard {
  profilePhoto: any;
  salonName: string;
  overAllRating: string;
  totalRating: string;
  location: string;
  shopType: string;
}

const SalonCard: React.FC<ISalonCard> = ({
 profilePhoto,
 salonName,
 overAllRating,
 totalRating,
 location,
 shopType
}) => {

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <Image source={profilePhoto} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {salonName}
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.ratingText}>{overAllRating}</Text>
          <StarIcon />
          <Text style={styles.reviewCount}>({totalRating})</Text>
        </View>

        <Text style={styles.address} numberOfLines={1}>
          {location}
        </Text>

        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{shopType}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SalonCard;

const styles = StyleSheet.create({
  card: {
    width: 240,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: "#e9e9e9",
    overflow: 'hidden',
    marginBottom: 16,
    marginTop: 10
  },
  image: {
    width: '100%',
    height: 135,
    resizeMode: "stretch",
    margin : "auto"
  },
  content: {
    padding: 9,
    paddingBottom: 10.3
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#141819',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#050a0d',
  },
  reviewCount: {
    fontSize: 13,
    color: '#535456',
    fontWeight: 300
  },
  address: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 6,
  },
  tagContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 220,
    borderWidth: 2,
    borderColor: "#ededed",
    marginTop: 2.5
  },
  tag: {
    fontSize: 13,
    color: '#444',
    fontWeight: '400',
  },
});
