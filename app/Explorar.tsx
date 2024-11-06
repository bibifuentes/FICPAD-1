import React, { useCallback, useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons

interface Section {
    id: number;
    title: string;
    genre: string;
    images: any[];
}

const sections: Section[] = [
    {
        id: 1,
        title: 'Shawn Mendes - Drama',
        genre: 'Drama',
        images: [
            require('../assets/imagens/image-7.png'),
            require('../assets/imagens/image-8.png'),
            require('../assets/imagens/image-9.png'),
        ],
    },
    {
        id: 2,
        title: 'Jaden Hossler - Romance',
        genre: 'Romance',
        images: [
            require('../assets/imagens/image-10.png'),
            require('../assets/imagens/image-11.png'),
            require('../assets/imagens/image-12.png'),
        ],
    },
    // Você pode adicionar mais seções conforme necessário
];

const Explorar: React.FC = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    const handleProfilePress = useCallback(() => {
        navigation.navigate('Perfil' as never);
    }, [navigation]);

    const handleImagePress = useCallback((sectionId: number, imageIndex: number) => {
        // TODO: Implementar funcionalidade ao pressionar a imagem
    }, [navigation]);

    const handleContinueReading = useCallback(() => {
        // TODO: Implementar funcionalidade de continuar lendo
    }, [navigation]);

    const filteredSections = useMemo(() => {
        if (!searchQuery.trim()) {
            return sections;
        }
        return sections.filter(section =>
            section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            section.genre.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/ficpad-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.headerTitle}>Explorar</Text>
                <TouchableOpacity style={styles.profileIcon} onPress={handleProfilePress}>
                    <Ionicons name="person-circle-outline" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar..."
                    placeholderTextColor="#666"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    returnKeyType="search"
                    onSubmitEditing={() => {
                        // Opcionalmente, lidar com a submissão da pesquisa
                    }}
                />
            </View>

            {filteredSections.length > 0 ? (
                filteredSections.map((section) => (
                    <View key={section.id} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {section.images.map((image, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.card}
                                    onPress={() => handleImagePress(section.id, index)}
                                >
                                    <Image
                                        source={image}
                                        style={styles.cardImage}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                ))
            ) : (
                <View style={styles.noResults}>
                    <Text style={styles.noResultsText}>Nenhum resultado encontrado.</Text>
                </View>
            )}

            <TouchableOpacity style={styles.continueReading} onPress={handleContinueReading}>
                <Text style={styles.continueReadingText}>Continue Lendo:</Text>
                <Text style={styles.subText}>Entre Versos e Batidas</Text>
            </TouchableOpacity>
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
        position: 'relative', // Adiciona posicionamento relativo
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
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    searchInput: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        width: '100%',
        fontSize: 16,
        color: '#333',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    card: {
        marginRight: 15,
    },
    cardImage: {
        width: 120,
        height: 180,
        borderRadius: 10,
    },
    continueReading: {
        backgroundColor: '#5B5574',
        padding: 15,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueReadingText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    subText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 5,
    },
    noResults: {
        padding: 20,
        alignItems: 'center',
    },
    noResultsText: {
        fontSize: 16,
        color: '#666',
    },
});

export default React.memo(Explorar);
