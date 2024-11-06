import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

interface FormData {
    email: string;
    telefone: string;
    senha: string;
}

interface Genres {
    romance: boolean;
    acaoAventura: boolean;
    drama: boolean;
    horrorTerror: boolean;
    escolares: boolean;
    amizade: boolean;
}

const Cadastro: React.FC = () => {
    const navigation = useNavigation();
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        telefone: '',
        senha: '',
    });

    const [genres, setGenres] = useState<Genres>({
        romance: false,
        acaoAventura: false,
        drama: false,
        horrorTerror: false,
        escolares: false,
        amizade: false,
    });

    const handleBackStep = useCallback(() => {
        setStep(1);
    }, []);

    const handleNextStep = useCallback(() => {
        // Valida os campos do Passo 1
        if (!formData.email || !formData.telefone || formData.senha.length < 5) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
            return;
        }
        setStep(2);
    }, [formData]);

    const handleRegister = useCallback(() => {
        // TODO: Implementar lógica de registro
        Alert.alert('Cadastro', 'Registro bem-sucedido! Bem-vindo(a).');
        navigation.navigate('Home' as never);
    }, [navigation]);

    const toggleGenre = useCallback((genre: keyof Genres) => {
        setGenres((prevGenres) => ({
            ...prevGenres,
            [genre]: !prevGenres[genre],
        }));
    }, []);

    const renderStep1 = () => (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Text style={styles.title}>Cadastro</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira seu email"
                    placeholderTextColor="#999"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Telefone (DDD)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira seu número de telefone"
                    placeholderTextColor="#999"
                    value={formData.telefone}
                    onChangeText={(text) => setFormData({ ...formData, telefone: text })}
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Crie uma senha de no mínimo 5 dígitos"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={formData.senha}
                    onChangeText={(text) => setFormData({ ...formData, senha: text })}
                />
            </View>

            <TouchableOpacity style={styles.buttonPrimary} onPress={handleNextStep}>
                <Text style={styles.buttonPrimaryText}>PROSSEGUIR</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );

    const renderStep2 = () => (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('../assets/ficpad-logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Selecione seus gêneros favoritos</Text>

            <View style={styles.genresContainer}>
                {Object.keys(genres).map((genre) => (
                    <View key={genre} style={styles.genreItem}>
                        <Checkbox
                            value={genres[genre as keyof Genres]}
                            onValueChange={() => toggleGenre(genre as keyof Genres)}
                            color={genres[genre as keyof Genres] ? '#6B5B95' : '#ccc'}
                            style={styles.checkbox}
                        />
                        <Text style={styles.genreLabel}>{formatGenreLabel(genre)}</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.buttonPrimary} onPress={handleRegister}>
                <Text style={styles.buttonPrimaryText}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSecondary} onPress={handleBackStep}>
                <Text style={styles.buttonSecondaryText}>VOLTAR</Text>
            </TouchableOpacity>
        </ScrollView>
    );

    const formatGenreLabel = (genre: string) => {
        // Capitaliza cada palavra e adiciona espaços antes de letras maiúsculas
        return genre
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase());
    };

    return step === 1 ? renderStep1() : renderStep2();
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 25,
        textAlign: 'center',
        color: '#4B0082',
    },
    logo: {
        width: 180,
        height: 180,
        marginBottom: 25,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonPrimary: {
        width: '100%',
        height: 50,
        backgroundColor: '#4B0082',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: '#4B0082',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonPrimaryText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonSecondary: {
        width: '100%',
        height: 50,
        backgroundColor: '#ddd',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginTop: 20, // Aumentado de 10 para adicionar um espaçamento entre os botões
    },
    buttonSecondaryText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
    genresContainer: {
        width: '100%',
        marginBottom: 25,
    },
    genreItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    genreLabel: {
        marginLeft: 12,
        fontSize: 17,
        color: '#333',
        textTransform: 'capitalize',
    },
    checkbox: {
        borderRadius: 4,
    },

});

export default React.memo(Cadastro);
