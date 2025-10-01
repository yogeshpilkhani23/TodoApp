import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../../firebase';
import { scaledValue } from '../../utils/designUtils';
import { useNavigation } from '@react-navigation/native';
import { appRoutes } from '../../utils/routerName';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created!');
      navigation.replace(appRoutes.todoApp);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace(appRoutes.todoApp); // Navigate after login
    } catch (error) {
      console.log('Login error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={{ color: 'white' }}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signIn} style={styles.button}>
        <Text style={{ color: 'white' }}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: scaledValue(20) },
  title: {
    fontSize: scaledValue(24),
    fontWeight: 'bold',
    marginBottom: scaledValue(20),
    textAlign: 'center',
    color: 'green',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: scaledValue(10),
    marginBottom: scaledValue(10),
    borderRadius: scaledValue(5),
  },
  button: {
    marginTop: scaledValue(10),
    backgroundColor: 'green',
    alignItems: 'center',
    padding: scaledValue(10),
    borderRadius: scaledValue(5),
  },
});
