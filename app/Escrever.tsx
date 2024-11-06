import React, { useCallback, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
    TextInput,
    Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const Escrever: React.FC = () => {
    const navigation = useNavigation();
    const [isWriting, setIsWriting] = useState(false);
    const [storyTitle, setStoryTitle] = useState('');
    const [storyContent, setStoryContent] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [isAutoSaving, setIsAutoSaving] = useState(false);

    const handleProfilePress = useCallback(() => {
        navigation.navigate('Perfil' as never);
    }, [navigation]);

    // Atualiza a contagem de palavras e caracteres
    useEffect(() => {
        const words = storyContent.trim().split(/\s+/).filter(word => word.length > 0);
        setWordCount(words.length);
        setCharCount(storyContent.length);
    }, [storyContent]);

    // Simula auto-save a cada 30 segundos
    useEffect(() => {
        if (isWriting) {
            const interval = setInterval(() => {
                handleAutoSave();
            }, 30000); // 30 segundos
            return () => clearInterval(interval);
        }
    }, [isWriting, storyTitle, storyContent]);

    const handleAutoSave = useCallback(() => {
        if (storyTitle.trim() || storyContent.trim()) {
            setIsAutoSaving(true);
            // Simula uma operação de salvamento
            setTimeout(() => {
                Alert.alert('Auto-Save', 'Sua história foi salva automaticamente.');
                setIsAutoSaving(false);
            }, 1000);
        }
    }, [storyTitle, storyContent]);

    const handleContinueWriting = useCallback(() => {
        // TODO: Navegar para a tela de continuar escrevendo ou mostrar mensagem
        Alert.alert('Continuar Escrevendo', 'Sem histórias atuais para continuar.');
    }, []);

    const handleCreateNewStory = useCallback(() => {
        setIsWriting(true);
    }, []);

    const handleCancelWriting = useCallback(() => {
        setIsWriting(false);
        setStoryTitle('');
        setStoryContent('');
    }, []);

    const handleSaveStory = useCallback(() => {
        // TODO: Implementar lógica de salvamento da história
        Alert.alert('História Salva', `Título: ${storyTitle}\nConteúdo: ${storyContent}`);
        setIsWriting(false);
        setStoryTitle('');
        setStoryContent('');
    }, [storyTitle, storyContent]);

    const insertEmoji = (emoji: string) => {
        setStoryContent(prev => prev + ' ' + emoji + ' ');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/ficpad-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.headerTitle}>Escrever</Text>
                <TouchableOpacity style={styles.profileIcon} onPress={handleProfilePress}>
                    <Ionicons name="person-circle-outline" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                {isWriting ? (
                    <View style={styles.editorContainer}>
                        <Text style={styles.editorTitle}>Criar Nova História</Text>

                        {/* Barra de ferramentas com ferramentas de formatação */}
                        <View style={styles.toolbar}>
                            <TouchableOpacity onPress={() => Alert.alert('Formatação', 'Funcionalidade em desenvolvimento')}>
                                <Ionicons name="text" size={24} color="#6B5B95" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Alert.alert('Formatação', 'Funcionalidade em desenvolvimento')}>
                                <Ionicons name="text-outline" size={24} color="#6B5B95" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Alert.alert('Formatação', 'Funcionalidade em desenvolvimento')}>
                                <Ionicons name="cut-outline" size={24} color="#6B5B95" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => insertEmoji('😀')}>
                                <Ionicons name="happy-outline" size={24} color="#6B5B95" />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.inputTitle}
                            placeholder="Título da História"
                            value={storyTitle}
                            onChangeText={setStoryTitle}
                        />
                        <TextInput
                            style={styles.inputContent}
                            placeholder="Escreva sua história aqui..."
                            value={storyContent}
                            onChangeText={setStoryContent}
                            multiline
                            textAlignVertical="top"
                        />

                        {/* Contagem de Palavras e Caracteres */}
                        <View style={styles.countContainer}>
                            <Text style={styles.countText}>Palavras: {wordCount}</Text>
                            <Text style={styles.countText}>Caracteres: {charCount}</Text>
                        </View>

                        {/* Indicador de Auto-salvamento */}
                        {isAutoSaving && (
                            <View style={styles.autoSaveContainer}>
                                <Ionicons name="save" size={20} color="#6B5B95" />
                                <Text style={styles.autoSaveText}>Salvando...</Text>
                            </View>
                        )}

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelWriting}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSaveStory}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <>
                        <TouchableOpacity style={styles.continueWritingCard} onPress={handleContinueWriting}>
                            <Text style={styles.cardTitle}>Continuar escrevendo</Text>
                            <Text style={styles.cardSubtitle}>nenhuma história atual</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.newStoryCard} onPress={handleCreateNewStory}>
                            <Text style={styles.cardTitle}>Criar nova história</Text>
                        </TouchableOpacity>
                    </>
                )}
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
    section: {
        padding: 20,
    },
    continueWritingCard: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    newStoryCard: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardTitle: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    editorContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    editorTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#6B5B95',
        marginBottom: 15,
        textAlign: 'center',
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    inputTitle: {
        height: 50,
        borderColor: '#6B5B95',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
    inputContent: {
        height: 200,
        borderColor: '#6B5B95',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingTop: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 15,
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    countText: {
        fontSize: 14,
        color: '#666',
    },
    autoSaveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    autoSaveText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#6B5B95',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#6B5B95',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default React.memo(Escrever);
