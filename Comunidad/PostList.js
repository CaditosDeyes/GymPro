import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../fireBaseConfig';
import Post from './Post';

const PostList = ({ usuarioInfo }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const postsRef = collection(db, 'posts');
        const postsQuery = query(postsRef, orderBy('fecha', 'desc'));

        const unsubscribe = onSnapshot(
            postsQuery,
            (snapshot) => {
                const fetchedPosts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(fetchedPosts);
                setLoading(false);
                setError(null);
            },
            (error) => {
                console.error('Error al cargar publicaciones:', error);
                setLoading(false);
                setError('Hubo un problema al cargar las publicaciones.');
            }
        );

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#1DA1F2" />
                <Text style={styles.loaderText}>Cargando publicaciones...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {posts.length > 0 ? (
                <FlatList
                    data={posts}
                    renderItem={({ item }) => <Post post={item} usuarioInfo={usuarioInfo} />}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false} // Ocultar barra de desplazamiento vertical
                    bounces={false} // Desactivar rebote al final de la lista
                />
            ) : (
                <View style={styles.noPostsContainer}>
                    <Text style={styles.noPostsText}>
                        No hay publicaciones aún. ¡Sé el primero en publicar algo!
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        marginTop: 10,
        color: '#fff',
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
    },
    noPostsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    noPostsText: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#fff',
        fontSize: 16,
    },
    listContent: {
        paddingBottom: 20,
    },
    separator: {
        height: 10,
    },
});

export default PostList;
