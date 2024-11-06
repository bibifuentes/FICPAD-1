import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import Explorar from './Explorar';
import Biblioteca from './Biblioteca';
import Escrever from './Escrever';
import Login from './Login';
import Cadastro from './Cadastro';
import Perfil from './Perfil';
import Atualizacoes from './Atualizações';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Cria um Stack Navigator para HomeTab para gerenciar a navegação para Perfil
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6B5B95',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      initialRouteName="HomeMain"
    >
      <Stack.Screen
        name="HomeMain"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ title: 'Perfil' }}
      />
      {/* Adicione outras telas que devem manter a barra de abas aqui */}
    </Stack.Navigator>
  );
}

// Cria o componente TabNavigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'HomeTab':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Explorar':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Biblioteca':
              iconName = focused ? 'library' : 'library-outline';
              break;
            case 'Escrever':
              iconName = focused ? 'create' : 'create-outline';
              break;
            case 'Atualizacoes':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6B5B95',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStackNavigator} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen name="Explorar" component={Explorar} />
      <Tab.Screen name="Biblioteca" component={Biblioteca} />
      <Tab.Screen name="Escrever" component={Escrever} />
      <Tab.Screen 
        name="Atualizacoes" 
        component={Atualizacoes}
        options={{ title: 'Atualizações' }}
      />
    </Tab.Navigator>
  );
}

export default function Layout() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6B5B95',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={TabNavigator}
      />
      <Stack.Screen
        name="Cadastro"
        options={{ headerShown: false }}
        component={Cadastro}
      />
      {/* O Tab Navigator agora faz parte do stack principal */}
      <Stack.Screen
        name="MainTabs"
        options={{ headerShown: false }}
        component={TabNavigator}
      />
    </Stack.Navigator>
  );
}
