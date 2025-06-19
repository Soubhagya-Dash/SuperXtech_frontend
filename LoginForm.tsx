import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Alert } from 'react-native';


export default function Demo() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
  try {
    const response = await fetch('http://10.0.2.2:5000/api/employees/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert('✅ Login successful');
      console.log('Logged in employee:', data.employee);
      // You can navigate or store token here if needed
    } else {
      Alert.alert('❌ ' + data.message);
    }
  } catch (error) {
    console.error('Login Error:', error);
    Alert.alert('❌ Failed to login. Make sure backend is running and reachable.');
  }
};

    
  return (
    // <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView >
        <StatusBar backgroundColor="#f58529" barStyle="light-content" />
        <View style={styles.logoContainer}>
            <Image
                      source={require('../../../assets/company_logo.webp')} 
                      style={styles.logo}
                      resizeMode="contain"
                    />
        </View>
      <View style={styles.bottomSection}>
         <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  placeholderTextColor="#888"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#888"
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
  <Text style={styles.loginText}>LogIn</Text>
</TouchableOpacity>


      </View>

      {/* <View>
           <TouchableOpacity >
                    <Text >LogIn</Text>
                  </TouchableOpacity>
      </View> */}


    </SafeAreaView>
  )
}




const styles = StyleSheet.create({
     logo: {
    
    width: 180,
    height: 190,
    marginBottom: 10,
    // in logo justifyContent and alignItems do not work directly on Image
    //  components because those props are layout-related and only apply to containers like View, not to leaf components like Image.
    // so we need a logo containe
    
  },
  logoContainer: {
    // flex: 1,
    // flex: 0.6,
    //If you don't use flex: 1, the container will only take as much space as its children need — and:
//     flex: 1 → takes full screen space.

// justifyContent: 'center' → centers content vertically.

// alignItems: 'center' → centers content horizontally.




    justifyContent: 'flex-start',   // vertical center
    alignItems: 'center',       // horizontal center
    //  alignItems:'flex-end',
  },
   

    bottomSection: {
    // flex: 1,
    // flex: 1.4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },





   loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})