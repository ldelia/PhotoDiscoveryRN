import React, {useEffect, useState} from "react";
import {View, Dimensions, AsyncStorage, ScrollView, StyleSheet, Image} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const COLUMN_WIDTH = Math.floor(DEVICE_WIDTH / 4);
const IMAGE_WIDTH = COLUMN_WIDTH - 2;

export default function History() {
    const [favIds, setFavIds] = useState([]);

    useEffect(() => {
        // Se ejecuta cuando se monta el componente
        loadFavImages().then(()=>{});
    }, []);

    const loadFavImages = async () => {
        const favImagesJSONStr = await AsyncStorage.getItem('@favImagesJSON', () => {});
        const favImagesJSON = JSON.parse(favImagesJSONStr);

        if (favImagesJSON === null) return;

        let imageIds = favImagesJSON.urls.map(function(url) {
            // cada url tiene el formato https://i.picsum.photos/id/870/440/815.jpg?hmac=SJAQU7IJHknkN16N32Em58FCiDpPSkOy1tUx57Zv990
            const urlParts = url.split("/");
            return urlParts[4];
        });

        setFavIds(imageIds);
    }

    return (
        <View style={styles.main}>
            <ScrollView contentContainerStyle={styles.imgGalleryContainer}>
                {favIds.map((imageId, index) => (
                    <View style={styles.itemGallery} key={index}>
                        <Image
                            source={{ uri: "https://picsum.photos/id/" + imageId + "/" + IMAGE_WIDTH }}
                            style={styles.imgGallery} resizeMode="stretch"
                        />
                    </View>
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
