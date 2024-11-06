import React, { useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons

interface Book {
    id: number;
    title: string;
    author: string;
    progress: string;
    cover: any;
}

const books: Book[] = [
    {
        id: 1,
        title: 'O Príncipe das Sombras',
        author: 'por @autor',
        progress: 'Progresso: Cap 3 de 12',
        cover: require('../assets/imagens/image-1.png'),
    },
    {
        id: 2,
        title: 'Além do Horizonte',
        author: 'por @escritor',
        progress: 'Progresso: Cap 1 de 8',
        cover: require('../assets/imagens/image-2.png'),
    },
];

const Biblioteca: React.FC = () => {
    const navigation = useNavigation();

    const handleBookPress = useCallback((book: Book) => {
        Alert.alert(book.title, book.progress);
    }, []);

    const handleAddNewStory = useCallback(() => {
        // TODO: Navegar para a tela de criação de nova história
        Alert.alert('Adicionar Nova História', 'Navegar para criação de nova história');
    }, []);

    const handleProfilePress = useCallback(() => {
        navigation.navigate('Perfil' as never);
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/ficpad-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.headerTitle}>Minha Biblioteca</Text>
                <TouchableOpacity style={styles.profileIcon} onPress={handleProfilePress}>
                    <Ionicons name="person-circle-outline" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                {books.map((book) => (
                    <TouchableOpacity key={book.id} style={styles.readingCard} onPress={() => handleBookPress(book)}>
                        <Image
                            source={book.cover}
                            style={styles.bookCover}
                            resizeMode="cover"
                        />
                        <View style={styles.bookInfo}>
                            <Text style={styles.bookTitle}>{book.title}</Text>
                            <Text style={styles.bookAuthor}>{book.author}</Text>
                            <Text style={styles.bookProgress}>{book.progress}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.addCard} onPress={handleAddNewStory}>
                    <Text style={styles.addText}>+ Adicionar nova história</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#6B5B95',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#6B5B95',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        position: 'relative',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    profileIcon: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    section: {
        padding: 20,
    },
    readingCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bookCover: {
        width: 80,
        height: 120,
        borderRadius: 10,
    },
    bookInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 5,
    },
    bookAuthor: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    bookProgress: {
        fontSize: 14,
        color: '#999',
    },
    addCard: {
        backgroundColor: '#6B5B95',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#6B5B95',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    addText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default React.memo(Biblioteca);
