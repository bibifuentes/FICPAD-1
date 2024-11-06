// Início da Seleção
import React, { useCallback, memo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

interface Update {
    id: number;
    title: string;
    description: string;
    timeAgo: string;
    image: any; // Considere usar ImageSourcePropType para melhor segurança de tipo
}

const updates: Update[] = [
    {
        id: 1,
        title: 'O Príncipe das Sombras',
        description: 'Novo capítulo adicionado',
        timeAgo: 'há 2 horas',
        image: require('../assets/imagens/image-1.png'),
    },
    {
        id: 2,
        title: 'Além do Horizonte',
        description: 'História concluída',
        timeAgo: 'há 1 dia',
        image: require('../assets/imagens/image-2.png'),
    },
    {
        id: 3,
        title: 'Estrelas do Amanhã',
        description: '2 novos capítulos',
        timeAgo: 'há 3 dias',
        image: require('../assets/imagens/image-3.png'),
    },
];

const UpdateItem: React.FC<{ update: Update; onPress: (update: Update) => void }> = memo(({ update, onPress }) => (
    <TouchableOpacity style={styles.updateCard} onPress={() => onPress(update)}>
        <Image source={update.image} style={styles.bookCover} resizeMode="cover" />
        <View style={styles.updateInfo}>
            <Text style={styles.bookTitle}>{update.title}</Text>
            <Text style={styles.updateText}>{update.description}</Text>
            <Text style={styles.timeText}>{update.timeAgo}</Text>
        </View>
    </TouchableOpacity>
));

const Atualizacoes: React.FC = () => {
    const navigation = useNavigation();

    const handleProfilePress = useCallback(() => {
        navigation.navigate('Perfil' as never);
    }, [navigation]);

    const handlePress = useCallback((update: Update) => {
        Alert.alert(update.title, update.description);
    }, []);

    const renderItem = useCallback(({ item }: { item: Update }) => (
        <UpdateItem update={item} onPress={handlePress} />
    ), [handlePress]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/ficpad-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.headerTitle}>Atualizações Recentes</Text>
                <TouchableOpacity style={styles.profileIcon} onPress={handleProfilePress}>
                    <Ionicons name="person-circle-outline" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <FlatList
                contentContainerStyle={styles.listContent}
                data={updates}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
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
    listContent: {
        padding: 20,
    },
    separator: {
        height: 20,
    },
    updateCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
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
    updateInfo: {
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
    updateText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    timeText: {
        fontSize: 12,
        color: '#999',
    },
});

export default memo(Atualizacoes);
