import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { auth } from '../../firebaseConfig';
import {
  PhoneAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
} from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useRouter } from 'expo-router';

const PhoneSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const recaptchaVerifier = useRef(null);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.replace('/(tabs)/index'); // ✅ Redirect to Home after login
    }
  });

  const sendVerification = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const id = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(id);
      alert('Verification code sent.');
    } catch (error) {
      console.error(error);
      alert('Error sending verification code.');
    }
  };

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);
      alert('Phone authentication successful!');
      router.replace('/(tabs)/index'); // ✅ Redirect to Home
    } catch (error) {
      console.error(error);
      alert('Error confirming verification code.');
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
      />
      <Button title="Send Verification" onPress={sendVerification} />
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        onChangeText={setVerificationCode}
      />
      <Button title="Confirm Verification Code" onPress={confirmCode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default PhoneSignIn;
