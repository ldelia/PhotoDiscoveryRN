import React, {useEffect} from "react";
import {useRecoilState} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Discover from "./screens/Discover";
import History from "./screens/History";
import FavImage from "./screens/FavImage";
import {favImageIdListState} from "./atoms/favImageIdListState";
import {loadFavImageIdListFromStorage} from "./storage";

const Stack = createStackNavigator();

export default function Dashboard() {
    const [favImageIdList, setFavImageIdList] = useRecoilState(favImageIdListState)
    useEffect(() => {
        loadFavImageIdListFromStorage().then( r => setFavImageIdList(r));
    }, []);
    return (
        <>
            {
                (favImageIdList !== null) && (
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Discover">
                            <Stack.Screen name="Discover" component={Discover} options={{ headerShown: false }}/>
                            <Stack.Screen name="History" component={History} />
                            <Stack.Screen name="FavImage" component={FavImage} />
                        </Stack.Navigator>
                    </NavigationContainer>
                )
            }
        </>
    );
}

