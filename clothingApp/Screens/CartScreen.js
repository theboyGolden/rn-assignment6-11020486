import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                let items = await AsyncStorage.getItem('cartItems');
                items = items ? JSON.parse(items) : [];
                setCartItems(items);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCartItems();
    }, []);

    const removeFromCart = async (itemKey) => {
        try {
            let items = await AsyncStorage.getItem('cartItems');
            items = items ? JSON.parse(items) : [];
            const updatedItems = items.filter(item => item.key !== itemKey);
            setCartItems(updatedItems);
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={item.image} style={styles.itemImage} />
                        <View style={{ marginTop: 20, marginLeft: 10 }}>
                            <Text style={styles.itemText}>{item.value}</Text>
                            <Text style={styles.descriptionText}>{item.description}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                        </View>
                        <TouchableOpacity 
                            style={{ marginLeft: 30, paddingTop: 100 }} 
                            onPress={() => removeFromCart(item.key)}
                        >
                            <Image source={require('../assets/remove.png')} style={styles.removefromCartIcon} />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
    },
    itemText: {
        color: '#000',
        fontFamily: 'Verdana',
        fontSize: 18,
    },
    descriptionText: {
        color: '#ABABAB',
        fontSize: 14,
    },
    price: {
        color: '#ff7733',
        fontSize: 16,
    },
    itemImage: {
        width: 80,
        height: 100,
    },
    removefromCartIcon: {
        width: 25,
        height: 25,
    },
});
