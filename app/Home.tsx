 import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Story {
    id: number;
    title: string;
    author: string;
    cover: any;
    description: string;
}

const popularStories: Story[] = [
    {
        id: 1,
        title: 'O Príncipe das Sombras',
        author: '@autor1',
        description: 'Uma história de mistério e romance...',
        cover: require('../assets/imagens/image-1.png'),
    },
    {
        id: 2,
        title: 'Além do Horizonte',
        author: '@autor2',
        description: 'Uma aventura épica...',
        cover: require('../assets/imagens/image-2.png'),
    },
    {
        id: 3,
        title: 'Estrelas do Amanhã',
        author: '@autor3',
        description: 'Um romance futurista...',
        cover: require('../assets/imagens/image-3.png'),
    },
    {
        id: 4,
        title: 'Título 4',
        author: '@autor4',
        description: 'Uma história emocionante...',
        cover: require('../assets/imagens/image-4.png'),
    },
    {
        id: 5,
        title: 'Título 5',
        author: '@autor5',
        description: 'Uma narrativa envolvente...',
        cover: require('../assets/imagens/image-5.png'),
    },
    {
        id: 6,
        title: 'Título 6',
        author: '@autor6',
        description: 'Uma história surpreendente...',
        cover: require('../assets/imagens/image-6.png'),
    },
];

const Home: React.FC = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    const handleStoryPress = useCallback((story: Story) => {
        // TODO: Navegar para a tela de detalhes da história

    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={require('../assets/imagens/image-large.png')}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
                <Text style={styles.headerTitle}>FANFIC'S POPULARES</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Histórias em Destaque</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.storiesContainer}
                >
                    {popularStories.map((story) => (
                        <TouchableOpacity 
                            key={story.id} 
                            style={styles.storyCard} 
                            onPress={() => handleStoryPress(story)}
                        >
                            <Image
                                source={story.cover}
                                style={styles.storyImage}
                                resizeMode="cover"
                            />
                            <Text style={styles.storyTitle}>{story.title}</Text>
                            <Text style={styles.storyAuthor}>{story.author}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recomendados para Você</Text>
                <View style={styles.gridContainer}>
                    {popularStories.map((story) => (
                        <TouchableOpacity 
                            key={`grid-${story.id}`} 
                            style={styles.gridCard} 
                            onPress={() => handleStoryPress(story)}
                        >
                            <Image
                                source={story.cover}
                                style={styles.gridImage}
                                resizeMode="cover"
                            />
                            <Text style={styles.gridTitle}>{story.title}</Text>
                            <Text style={styles.gridAuthor}>{story.author}</Text>
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
        backgroundColor: '#f5f5f5',
    },
    header: {
        width: '100%',
        height: 250,
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    searchContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 1,
    },
    searchInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
    },
    headerTitle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'rgba(107, 91, 149, 0.8)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    storiesContainer: {
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    storyCard: {
        marginRight: 15,
        width: 140,
    },
    storyImage: {
        width: 140,
        height: 200,
        borderRadius: 12,
    },
    storyTitle: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    storyAuthor: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridCard: {
        width: '48%',
        marginBottom: 20,
    },
    gridImage: {
        width: '100%',
        height: 220,
        borderRadius: 12,
    },
    gridTitle: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    gridAuthor: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
});

export default React.memo(Home);
