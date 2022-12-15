import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from "./components/menu"
import Topic from "./pages/Topics"
import Message from "./pages/messages"
import Profile from "./pages/ProfilePage"
import Login from "./pages/Login"



const Stack = createStackNavigator();


function App() {

  return (

    <>

      <NavigationContainer>

        <Stack.Navigator>

          <Stack.Screen options={{
            title: null,
            headerMode: 'none',
          }} name="Menu" component={Menu} />



          <Stack.Screen options={{
            title: null,
            headerStyle: {
              backgroundColor: 'rgba(128, 128, 128, 0.140)',

              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
            },
            headerTintColor: 'gray',
          }} name="Topic" component={Topic} />




          <Stack.Screen options={{
            title: null,
            headerStyle: {
              backgroundColor: 'rgba(128, 128, 128, 0.140)',
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
            },
            headerTintColor: 'gray',
          }} name="Message" component={Message} />


          <Stack.Screen options={{
            title: null,
            headerMode: 'none',
          }} name="Profile" component={Profile} />




          <Stack.Screen options={{
            title: null,
            headerStyle: {
              backgroundColor: 'rgba(128, 128, 128, 0.140)',
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
            },
            headerTintColor: 'gray',
          }} name="Login" component={Login} />



        </Stack.Navigator>

      </NavigationContainer>
    </>

  );
}

export default App;