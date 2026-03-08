import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebaseConfig";

export default function Login() {
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup fields
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupCode, setSignupCode] = useState("");

  const [statusMessage, setStatusMessage] = useState("");

  //make the function asynchronous to ensure login doesn't freeze the app
  const handleLogin = async () => {
    if (loginEmail.trim() && loginPassword.trim()) {
      try {
        //send a request to Firebase and receive a package with user info
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log("Logged in as: ", userCredential.user.email);
        
        // Clear login fields
        setLoginEmail("");
        setLoginPassword("");
        
        // Go back to home page
        router.replace("/");
      }
      catch (error: any) {
        //if invalid credential, notify user
        if (error.code === 'auth/invalid-credential') {
          setStatusMessage("Invalid email or password");
        } else {
          setStatusMessage("Login failed. Please try again.");
        }
        console.error(error.code);
      }
    } else {
      setStatusMessage("Please fill out all fields.");
    }
  };

  const handleCreateAccount = async () => {
    if (
      signupUsername.trim() &&
      signupEmail.trim() &&
      signupPassword.trim() &&
      signupCode.trim()
    ) {
      
      try {
        //create a user 
        const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);


        //add username to firebase profile
        await updateProfile(userCredential.user, {
          displayName: signupUsername
        });

        console.log("Account created for: ", signupUsername);
        
        // Clear signup fields
        setSignupUsername("");
        setSignupEmail("");
        setSignupPassword("");
        setSignupCode("");
              
        // Show success and switch back to login
        setStatusMessage("Account created! Please log in.");
        setIsCreateAccount(false);
      }
      catch (error : any) {
        if (error.code === 'auth/email-already-in-use') {
          setStatusMessage("That email is already in use");
        }
        else if (error.code === 'auth/weak-password') {
          setStatusMessage("Password should be at least 6 characters");
        }
        else {
          setStatusMessage("Signup failed. Please check connection and try again.");
        }
        console.error(error.code);
      }
    } else {
      setStatusMessage("Please fill out all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isCreateAccount ? "Create an Account" : "Login"}
      </Text>

      {statusMessage !== "" && (
        <Text style={styles.statusText}>{statusMessage}</Text>
      )}

      {isCreateAccount ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={signupUsername}
            onChangeText={setSignupUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={signupEmail}
            onChangeText={setSignupEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={signupPassword}
            onChangeText={setSignupPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Authentication Code"
            value={signupCode}
            onChangeText={setSignupCode}
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleCreateAccount}
          >
            <Text style={styles.primaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            value={loginEmail}
            onChangeText={setLoginEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => {
          setIsCreateAccount((prev) => !prev);
          setStatusMessage("");
        }}
      >
        <Text style={styles.secondaryButtonText}>
          {isCreateAccount
            ? "Already have an account? Login"
            : "Need an account? Create one"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const BUTTON_COLOR = "#4a90e2";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: BUTTON_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    marginTop: 16,
  },
  secondaryButtonText: {
    color: BUTTON_COLOR,
    fontSize: 14,
    fontWeight: "500",
  },
});
