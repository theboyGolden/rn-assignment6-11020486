import React from 'react';
import { SafeAreaView, View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const numColumns = 2;  

export default function HomeScreen() {

    const data = [
        { key: '1', value: 'Office Wear', description: 'reversible angora cardigan', price: '$70', image: require('../assets/dress1.png') },
        { key: '2', value: 'Black', description: 'reversible angora cardigan', price: '$40', image: require('../assets/dress2.png') },
        { key: '3', value: 'Church Wear', description: 'reversible angora cardigan', price: '$60', image: require('../assets/dress3.png') },
        { key: '4', value: 'Lamerei', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress4.png') },
        { key: '5', value: '21WN', description: 'reversible angora cardigan', price: '$50', image: require('../assets/dress5.png') },
        { key: '6', value: 'Lopo', description: 'reversible angora cardigan', price: '$100', image: require('../assets/dress6.png') },
        { key: '7', value: '21WN', description: 'reversible angora cardigan', price: '$500', image: require('../assets/dress7.png') },
        { key: '8', value: 'lame', description: 'reversible angora cardigan', price: '$80', image: require('../assets/dress8.jpeg') },
    ];

    const formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);

        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }

        return data;
    };

    const addToCart = async (item) => {
        try {
            let cartItems = await AsyncStorage.getItem('cartItems');
            cartItems = cartItems ? JSON.parse(cartItems) : [];
            cartItems.push(item);
            await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
            alert(`${item.value} added to cart!`);
        } catch (error) {
            console.error(error);
        }
    };

    const GridItem = ({ item }) => {
        if (item.empty) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }

        return (
            <View style={styles.item}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.value}</Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity style={styles.cartIconContainer} onPress={() => addToCart(item)}>
                    <Image source={require('../assets/add_circle.png')} style={styles.cartIcon} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.storyContainer}>
                    <Text style={styles.storyText}>OUR STORY</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Image source={require('../assets/thumbnail.png')} style={styles.icon} />
                </View>
                <View style={styles.iconContainer}>
                    <Image source={require('../assets/filter.png')} style={styles.icon} />
                </View>
            </View>
            <FlatList
                data={formatData(data, numColumns)}
                renderItem={({ item }) => <GridItem item={item} />}
                numColumns={numColumns}
                keyExtractor={(item) => item.key}
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
    header: {
        flexDirection: 'row',
        marginTop: 10,
    },
    storyContainer: {
        paddingTop: 10,
    },
    storyText: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'Verdana',
        paddingRight: 130,
    },
    iconContainer: {
        marginRight: 20,
        padding: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 30,
    },
    icon: {
        height: 25,
        width: 25,
    },
    item: {
        // backgroundColor: '#4D243D',
        alignItems: 'left',
        justifyContent: 'center',
        flex: 1,
        marginTop: 60,
        margin: 5,
        marginBottom: 20,
        height: 230,
        // height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    itemText: {
        color: '#000',
        fontFamily: 'Verdana',
        paddingTop: 5, 
    },
    descriptionText: {
        color: '#ABABAB',
    },
    price: {
        color: '#ff7733',
        fontSize: 18,
    },
    cartIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5,
    },
    cartIcon: {
        width: 20,
        height: 20,
    },
});
