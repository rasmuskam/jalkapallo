import { StyleSheet, View, Text, SafeAreaView, ActivityIndicator, Button, FlatList } from 'react-native';
import React, { useState } from 'react';

export default function FootballMatches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = 'api-avain';

    const fetchMatches = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://api.football-data.org/v4/competitions/PL/matches', {
                method: 'GET',
                headers: {
                    'X-Auth-Token': apiKey, 
                },
            });

            if (!response.ok) {
                throw new Error(`Virhe: ${response.statusText}`);
            }

            const data = await response.json();
            setMatches(data.matches);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Valioliigakauden 2024-2025 ottelut</Text>
                <Button title="Hae Ottelut" onPress={fetchMatches} />
                {loading && <ActivityIndicator size="large" color="#ff0" />}
                {error && <Text style={styles.error}>{error}</Text>}

                {}
                <FlatList
                    data={matches}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.matchItem}>
                            <Text>{item.homeTeam.name} vs {item.awayTeam.name}</Text>
                            <Text>Päivä: {new Date(item.utcDate).toLocaleDateString()}</Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    matchItem: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
});