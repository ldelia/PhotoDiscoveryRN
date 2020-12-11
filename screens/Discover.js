import React, {useState, useEffect} from "react";
import {useRecoilState} from 'recoil';
import {StyleSheet, View, Button, Image, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {favImageIdListState} from "../atoms/favImageIdListState";
import {updateFavImageIdFromStorage} from "../storage";

export default function Discover({ navigation }) {
    const [favImageIdList, setFavImageIdList] = useRecoilState(favImageIdListState);
    const [currentImageUrl, setImageUrl] = useState(null);
    const [currentImageFavStatus, setImageFavStatus] = useState(false);

    const DOUBLE_PRESS_DELAY = 300;
    let lastTimeImagePress = null;

    useEffect(() => {
        loadRandomImage();
    }, []);

    const getImageIdFromUrl = (url) => {
        const urlParts = url.split("/");
        return  urlParts[4];
    }

    const loadRandomImage = () => {
        const width = Math.floor(Dimensions.get('window').width);
        const height = Math.floor(Dimensions.get('window').height);
        fetch('https://picsum.photos/' + width + '/' + height)
        .then(async function (response){
            setImageUrl(response.url);
            const randomImageFavStatus = favImageIdList.includes( getImageIdFromUrl(response.url) );
            if (randomImageFavStatus !== currentImageFavStatus) {
                setImageFavStatus(randomImageFavStatus);
            }
        });
    };

    const imageTap = () => {
        const now = new Date().getTime();
        if (lastTimeImagePress !== null && (now - lastTimeImagePress) < DOUBLE_PRESS_DELAY) {
            lastTimeImagePress = null;
            toggleImageFavStatus().then(() => {});
        } else {
            lastTimeImagePress = now;
        }
    }

    const toggleImageFavStatus = async () => {
        const newFavStatus = !currentImageFavStatus;
        updateFavImageIdFromStorage(getImageIdFromUrl(currentImageUrl), newFavStatus).then( r => setFavImageIdList(r));
        setImageFavStatus(newFavStatus);
    }

    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={imageTap} style={styles.touchableOpacity}>
                { (currentImageUrl != null) && (
                    <View style={styles.imageHolder}>
                        <Image style={styles.image} source={{ uri: currentImageUrl }}/>
                        <TouchableOpacity onPress={toggleImageFavStatus} style={styles.favIconTouchableOpacity}>
                            <Icon
                                name={ currentImageFavStatus === false ? "heart-o" : "heart" }
                                size={30}
                                color={ currentImageFavStatus === false ? "#000" : "#F00" }
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </TouchableOpacity>
            <View style={styles.footer}>
                <Button title="Descubrir nueva" onPress={loadRandomImage} />
                <Button title="Mis favoritas" onPress={() => navigation.navigate('History')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
    },
    touchableOpacity: {
        flex: 1
    },
    imageHolder: {
        flex: 1
    },
    image: {
        flex: 1
    },
    favIconTouchableOpacity: {
        position: 'absolute',
        right: 20,
        top: 40
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
    }
});
