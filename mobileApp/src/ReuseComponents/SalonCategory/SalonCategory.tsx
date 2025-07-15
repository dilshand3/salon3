import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export interface ISalonCategory {
    title: string;
    img: any;
}

const SalonCategory: React.FC<ISalonCategory> = ({ title, img }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.card}>
            <Text style={styles.text}>{title}</Text>
            <Image source={img} style={styles.image} />
        </TouchableOpacity>
    );
};

export default SalonCategory;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "flex-end",
        backgroundColor: '#F2F2F2',
        borderRadius: 12,
        marginBottom: 15,
        height: 95,
        width: "49%",
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1c1c1c',
        flex: 1,
        paddingBottom : 13,
        paddingLeft : 10
    },
    image: {
        width: 90,
        height: '100%',
        resizeMode: "stretch",
    },
});
