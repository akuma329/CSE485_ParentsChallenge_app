import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebaseConfig";

export default function Login() {
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupCode, setSignupCode] = useState("");

  const [statusMessage, setStatusMessage] = useState("");

  //make the function asynchronous to ensure login doesn't freeze the app
  const handleLogin = async () => {
    if (loginEmail.trim() && loginPassword.trim()) {
      try {
        //send a request to Firebase and receive a package with user info
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
        const uid = userCredential.user.uid;

        //search for the ID in the database
        const userDoc = await getDoc(doc(db, "users", uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();

          if (userData.role === "admin") {
            router.replace("/admin_dashboard");
          }
          else {
            router.replace("/uplanding");
          }
        }
        else {
          setStatusMessage("User profile not found.");
        }
      }
      catch (error: any) {
        //if invalid credential, notify user
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
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
    //check if the necessary fields are filled out and store the email
    if (firstName.trim() && lastName.trim() && signupEmail.trim() && signupPassword.trim()) {
      const emailLower = signupEmail.toLowerCase().trim();

      const fullName = `${firstName.trim()} ${lastName.trim()}`;

      try {
        //check if the email is in the approved emails list and get a snapshot
        const approvedRef = doc(db, "approvedEmails", emailLower);
        const approvedSnap = await getDoc(approvedRef);

        if (!approvedSnap.exists()) {
          setStatusMessage("This email is not on the approved list. Contact an admin.");
          return;
        }

        const approvedData = approvedSnap.data();

        //create the user's authentication
        const userCredential = await createUserWithEmailAndPassword(auth, emailLower, signupPassword);
        const uid = userCredential.user.uid;

        //add the user to the database
        await setDoc(doc(db, "users", uid), {
          uid: uid,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: emailLower,
          role: approvedData.role || "family",
          isActive: true,
        });

        //update the user's name
        await updateProfile(userCredential.user, { displayName: fullName });

        //clear fields
        setFirstName("");
        setLastName("");
        setSignupEmail("");
        setSignupPassword("");
        setStatusMessage("Account created! Please log in.");
        setIsCreateAccount(false);
      }

      catch (error : any) {
        if (error.code === 'auth/email-already-in-use') {
          setStatusMessage("That email is already in use");
        } else if (error.code === 'auth/weak-password') {
          setStatusMessage("Password should be at least 6 characters");
        } else {
          setStatusMessage("Signup failed. Check connection.");
        }
        console.error(error.code);
      }
    }
    else {
      setStatusMessage("Please fill out all fields.");
    }
  };

  const handleForgotPassword = async () => {
      if (!loginEmail.trim()) {
        setStatusMessage("Please enter your email first.");
        return;
      }
      
      try {
        await sendPasswordResetEmail(auth, loginEmail.trim());
        setStatusMessage("Reset link sent! Check your inbox.");
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          setStatusMessage("No account found with this email.");
        } else {
          setStatusMessage("Error sending reset email.");
        }
        console.error(error.code);
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
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
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
            placeholder="Email Adress"
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

          <TouchableOpacity
          onPress={handleForgotPassword}
          style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

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
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 15,
    marginTop: -4,
  },
  forgotPasswordText: {
    color: BUTTON_COLOR,
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});
