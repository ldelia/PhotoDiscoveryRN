import React, {useState} from "react";
import {StyleSheet, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRecoilState} from "recoil";
import alert from '../components/alert'
import {favImageIdListState} from "../atoms/favImageIdListState";
import {updateFavImageIdFromStorage} from "../storage";

const DEVICE_WIDTH = Math.floor(Dimensions.get('window').width);

export default function FavImage({route, navigation}) {
    const [favImageIdList, setFavImageIdList] = useRecoilState(favImageIdListState);
    const {imageId} = route.params;
    const [currentImageUrl, setImageUrl] = useState(null);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.favIconTouchableOpacity} onPress={removeImageFromFavList}>
                    <Icon
                        name={"heart"}
                        size={30}
                        color={"#F00"}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const removeImageFromFavList = () => {
        alert(
            "Confirmation",
            "Are you sure you want to remove the photo from the favorite list?",
            [
                { text: "Cancel",style: "cancel", onPress: () => {} },
                { text: "OK", onPress: () => {
                    updateFavImageIdFromStorage(imageId, false).then(r => setFavImageIdList(r));
                    navigation.goBack();
                } }
            ],
            { cancelable: false }
        );
    };

    const onLayout = ({ nativeEvent: { layout: { height } } }) => {
        const IMAGE_HOLDER_HEIGHT = Math.floor(height);
        setImageUrl("https://picsum.photos/id/" + imageId + "/" + DEVICE_WIDTH + "/" + IMAGE_HOLDER_HEIGHT);
    };

    return (
        <View style={styles.main} onLayout={onLayout}>
            { (currentImageUrl != null) && (
                <View style={styles.imageHolder}>
                    <Image style={styles.image} source={{ uri: currentImageUrl }}/>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    imageHolder: {
        flex: 1
    },
    image: {
        flex: 1
    },
    favIconTouchableOpacity: {
        marginRight: 20
    }
});
