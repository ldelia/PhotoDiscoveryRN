import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadFavImageIdListFromStorage = async () => {
    const favImagesJSONStr = await AsyncStorage.getItem('@favImagesJSON');
    const favImagesJSON = JSON.parse(favImagesJSONStr);
    if (favImagesJSON !== null && favImagesJSON['ids']) {
        return favImagesJSON['ids'];
    }
    return [];
};

export const updateFavImageIdFromStorage = async (imageId, newFavStatus) => {
    const favImagesJSONStr = await AsyncStorage.getItem('@favImagesJSON');
    let favImagesJSON = JSON.parse(favImagesJSONStr);
    if (favImagesJSON === null) {
        favImagesJSON = {
            ids: []
        };
    }

    if (newFavStatus) {
        favImagesJSON.ids.push(imageId);
    } else {
        favImagesJSON.ids = favImagesJSON.ids.filter((value) => { return value !== imageId});
    }
    await AsyncStorage.setItem('@favImagesJSON', JSON.stringify(favImagesJSON), ()=>{});
    return favImagesJSON.ids;
}
