import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface FormData {
    emailOrPhone: string;
    password: string;
}

const Login: React.FC = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState<FormData>({
        emailOrPhone: '',
        password: '',
    });

    const handleLogin = useCallback(() => {
        const { emailOrPhone, password } = formData;
        if (!emailOrPhone || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        // TODO: Implementar lógica de autenticação
        Alert.alert('Login', 'Login bem-sucedido!');
        navigation.navigate('Home' as never);
    }, [formData, navigation]);

    const handleForgotPassword = useCallback(() => {
        // TODO: Navegar para a tela de recuperação de senha
        Alert.alert('Esqueci Minha Senha', 'Navegar para recuperação de senha.');
    }, []);

    const handleSignup = useCallback(() => {
        navigation.navigate('Cadastro' as never);
    }, [navigation]);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Image
                source={require('../assets/ficpad-logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Login</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email ou Número de Telefone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira seu email ou número de telefone"
                    placeholderTextColor="#999"
                    value={formData.emailOrPhone}
                    onChangeText={(text) => setFormData({ ...formData, emailOrPhone: text })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                />
            </View>

            <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
                <Text style={styles.buttonPrimaryText}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSecondary} onPress={handleForgotPassword}>
                <Text style={styles.buttonSecondaryText}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Não tem uma conta? </Text>
                <TouchableOpacity onPress={handleSignup}>
                    <Text style={[styles.signupText, styles.signupLink]}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 180,
        height: 180,
        marginBottom: 25,
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 25,
        textAlign: 'center',
        color: '#4B0082',
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
        marginTop: 20,
    },
    buttonSecondaryText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
    },
    signupText: {
        fontSize: 16,
        color: '#333',
    },
    signupLink: {
        color: '#4B0082',
        fontWeight: '600',
    },
});

export default React.memo(Login);
