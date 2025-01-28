import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

const MisPublicaciones = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null); // Para mostrar comentarios de una publicación
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchPosts = () => {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        setLoading(false);
        return;
      }

      const postsRef = collection(db, 'posts');
      const q = query(postsRef, where('uid', '==', userId), orderBy('fecha', 'desc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsArray);
        setLoading(false);
      });

      return () => unsubscribe(); // Limpiar suscripción al desmontar
    };

    fetchPosts();
  }, []);

  const fetchComments = (postId) => {
    const commentsRef = collection(db, 'posts', postId, 'comments');
    const q = query(commentsRef, orderBy('fechaCreacion', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSelectedPost((prevSelectedPost) => ({
        ...prevSelectedPost,
        id: postId,
        comments: commentsArray,
      }));
    });

    return () => unsubscribe(); // Limpiar suscripción al desmontar
  };

  const renderComments = (comments) => {
    return (
      <View style={styles.commentsContainer}>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentCard}>
              <Text style={styles.commentUser}>{item.usuario}:</Text>
              <Text style={styles.commentContent}>{item.texto}</Text>
              <Text style={styles.commentDate}>
                {new Date(item.fechaCreacion.toDate()).toLocaleString()}
              </Text>
            </View>
          )}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('../img/background_image.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Mis Publicaciones</Text>

        <View style={styles.container}>
            {/* Agrega el botón al inicio de la vista */}
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Perfil')} // Regresa al perfil
            >
                <Icon name="keyboard-backspace" size={24} color="#fff" />
                <Text style={styles.buttonText}>Regresar a Perfil</Text>
            </TouchableOpacity>
        </View>
        
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.postContent}>{item.contenido}</Text>
              <Text style={styles.postDate}>
                {new Date(item.fecha.toDate()).toLocaleString()}
              </Text>
              <View style={styles.reactions}>
                <View style={styles.reaction}>
                  <Icon name="emoticon-lol" size={18} color="#fff" />
                  <Text style={styles.reactionText}>{item.reacciones?.meDivierte || 0}</Text>
                </View>
                <View style={styles.reaction}>
                  <Icon name="thumb-up" size={18} color="#fff" />
                  <Text style={styles.reactionText}>{item.reacciones?.meInteresa || 0}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.commentsButton}
                onPress={() => fetchComments(item.id)}
              >
                <Icon name="comment-text-outline" size={18} color="#fff" />
                <Text style={styles.commentsButtonText}>Ver comentarios</Text>
              </TouchableOpacity>

              {/* Mostrar los comentarios si ya se han cargado */}
              {selectedPost && selectedPost.id === item.id && renderComments(selectedPost.comments)}
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No tienes publicaciones.</Text>}
        />
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postCard: {
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  postContent: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  postDate: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 10,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  reaction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  commentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentsButtonText: {
    marginLeft: 5,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentsContainer: {
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  commentCard: {
    backgroundColor: '#555',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  commentContent: {
    fontSize: 14,
    color: '#fff',
  },
  commentDate: {
    fontSize: 12,
    color: '#ccc',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    color: "#fff"
  },
  emptyText: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 16,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
});

export default MisPublicaciones;