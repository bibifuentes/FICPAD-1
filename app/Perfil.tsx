import React, { useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReadingList {
    id: number;
    cover: any;
    title: string;
}

const readingLists: ReadingList[] = [
    {
        id: 1,
        cover: require('../assets/imagens/image-13.png'),
        title: 'Lista de Leitura 1',
    },
    {
        id: 2,
        cover: require('../assets/imagens/image-14.png'),
        title: 'Lista de Leitura 2',
    },
];

const Perfil: React.FC = () => {
    const handleSectionPress = useCallback((section: string) => {
        // TODO: Navegar para as respectivas seções
        Alert.alert(section, `Navegar para ${section.toLowerCase()}.`);
    }, []);

    const handleEditProfile = useCallback(() => {
        Alert.alert('Editar Perfil', 'Navegar para edição de perfil');
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={handleEditProfile}>
                        <Ionicons name="settings-outline" size={24} color="#6B5B95" />
                    </TouchableOpacity>
                </View>
                <Image 
                    source={require('../assets/imagens/profile-logo.png')}
                    style={styles.profileImage}
                    resizeMode="cover"
                />
                <Text style={styles.username}>@usuario</Text>
                <Text style={styles.bio}>Adicione uma bio para que as pessoas possam te conhecer melhor!</Text>
                <View style={styles.statsContainer}>
                    <TouchableOpacity style={styles.statItem}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>obra(s)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statItem}>
                        <Text style={styles.statNumber}>2</Text>
                        <Text style={styles.statLabel}>lista de leitura(s)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statItem}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>seguidor(es)</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.sectionHeader} onPress={() => handleSectionPress('Obras de @usuario')}>
                    <View style={styles.sectionTitleContainer}>
                        <Ionicons name="book-outline" size={24} color="#6B5B95" />
                        <Text style={styles.sectionTitle}>Obras de @usuario</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#6B5B95" />
                </TouchableOpacity>
                <Text style={styles.emptyText}>nenhuma história publicada</Text>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.sectionHeader} onPress={() => handleSectionPress('Lista de leitura')}>
                    <View style={styles.sectionTitleContainer}>
                        <Ionicons name="bookmark-outline" size={24} color="#6B5B95" />
                        <Text style={styles.sectionTitle}>Lista de leitura</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#6B5B95" />
                </TouchableOpacity>
                <View style={styles.readingList}>
                    {readingLists.map((list) => (
                        <TouchableOpacity 
                            key={list.id} 
                            style={styles.bookContainer} 
                            onPress={() => Alert.alert(list.title, 'Navegar para a lista de leitura.')}
                            activeOpacity={0.7}
                        >
                            <Image 
                                source={list.cover}
                                style={styles.bookCover}
                                resizeMode="cover"
                            />
                            <Text style={styles.bookTitle}>{list.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTop: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
        borderWidth: 3,
        borderColor: '#6B5B95',
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    bio: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statItem: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6B5B95',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    section: {
        padding: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    emptyText: {
        color: '#666',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        fontStyle: 'italic',
    },
    readingList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    bookContainer: {
        alignItems: 'center',
        width: '48%',
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bookCover: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    bookTitle: {
        marginTop: 8,
        fontSize: 14,
        textAlign: 'center',
        color: '#333',
        fontWeight: '500',
    },
});

export default React.memo(Perfil);
