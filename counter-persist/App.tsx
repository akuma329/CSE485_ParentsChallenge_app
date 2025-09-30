//
// Created by Anand Kumar on 9/25/25.
//

import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "counter:value";

export default function App(): JSX.Element {
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        (async () => {
            try {
                const saved = await AsyncStorage.getItem(STORAGE_KEY);
                if (saved !== null) setCount(Number(saved));
            } catch (e) {
                console.warn("Failed to load count:", e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // persist whenever the count changes up
    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEY, String(count)).catch((e) =>
            console.warn("Failed to save count:", e)
        );
    }, [count]);

    if (loading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" />
                <Text style={styles.muted}>Loading saved count…</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Persistent Counter</Text>

            <View style={styles.counterBubble}>
                <Text style={styles.counterText}>{count}</Text>
            </View>

            <View style={styles.row}>
                <Button label="+1" onPress={() => setCount((c) => c + 1)} />
                <Button label="-1" onPress={() => setCount((c) => Math.max(0, c - 1))} />
                <Button label="Reset" onPress={() => setCount(0)} variant="secondary" />
            </View>

            <Text style={styles.muted}>Close and reopen the app—count persists.</Text>
        </SafeAreaView>
    );
}

type ButtonProps = {
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary";
};

function Button({ label, onPress, variant = "primary" }: ButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.btn,
                variant === "secondary" && styles.btnSecondary,
                pressed && styles.btnPressed,
            ]}
            android_ripple={{ color: "#00000020" }}
            accessibilityRole="button"
            accessibilityLabel={label}
        >
            <Text style={styles.btnText}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, gap: 24, backgroundColor: "#0f172a" },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172a",
    },
    title: { color: "white", fontSize: 28, fontWeight: "700" },
    counterBubble: {
        alignSelf: "center",
        backgroundColor: "#1e293b",
        borderRadius: 999,
        width: 160,
        height: 160,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 16,
        elevation: 8,
    },
    counterText: { color: "white", fontSize: 56, fontWeight: "800" },
    row: { flexDirection: "row", gap: 12, justifyContent: "center" },
    btn: {
        backgroundColor: "#22c55e",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 12,
    },
    btnSecondary: { backgroundColor: "#64748b" },
    btnPressed: { transform: [{ scale: 0.98 }] },
    btnText: { color: "white", fontSize: 18, fontWeight: "700" },
    muted: { color: "#94a3b8", textAlign: "center" },
});
