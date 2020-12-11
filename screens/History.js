import React from "react";
import {useRecoilValue} from 'recoil';
import {View, Dimensions, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {favImageIdListState} from "../atoms/favImageIdListState";

const DEVICE_WIDTH = Dimensions.get('window').width;
const COLUMN_WIDTH = Math.floor(DEVICE_WIDTH / 4);
const IMAGE_WIDTH = COLUMN_WIDTH - 2;

export default function History({ navigation }) {
    const favImageIds = useRecoilValue(favImageIdListState);
    return (
        <View style={styles.main}>
            <ScrollView contentContainerStyle={styles.imgGalleryContainer}>
                {favImageIds.map((imageId, index) => (
                    <TouchableOpacity onPress={() => navigation.navigate('FavImage', {
                        imageId: imageId
                    })} style={styles.itemGallery} key={index}>
                        <Image
                            source={{ uri: "https://picsum.photos/id/" + imageId + "/" + IMAGE_WIDTH }}
                            style={styles.imgGallery} resizeMode="stretch"
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    imgGalleryContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start"
    },
    itemGallery: {
        width: COLUMN_WIDTH,
        height: COLUMN_WIDTH,
        alignContent: 'center',
    },
    imgGallery: {
        width: IMAGE_WIDTH,
        height: IMAGE_WIDTH,
        borderWidth: 1,
        borderColor: "#fff",
        margin: 'auto'
    }
});
