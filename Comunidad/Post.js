import { db } from '../Firebase'; // Importa db desde Firebase.js
import { doc, updateDoc, increment, collection, getDocs, query, orderBy, serverTimestamp, addDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Post = ({ post, usuarioInfo }) => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [addingComment, setAddingComment] = useState(false);

    useEffect(() => {
        // Cargar comentarios al montar el componente
        loadComments();
    }, []);

    const handleReaction = async (type) => {
        try {
            const postRef = doc(db, 'posts', post.id);
            await updateDoc(postRef, {
                [`reacciones.${type}`]: increment(1),
            });
        } catch (error) {
            console.error('Error al reaccionar:', error);
        }
    };

    const loadComments = async () => {
        setLoadingComments(true);
        try {
            const commentsQuery = query(
                collection(db, 'posts', post.id, 'comments'),
                orderBy('fechaCreacion', 'desc')
            );
            const commentsSnapshot = await getDocs(commentsQuery);

            const commentsData = commentsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                fechaCreacion: doc.data().fechaCreacion?.toDate() || new Date(),
            }));
            setComments(commentsData);
        } catch (error) {
            console.error('Error al cargar comentarios:', error);
        } finally {
            setLoadingComments(false);
        }
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        setAddingComment(true);
        try {
            const commentData = {
                texto: newComment.trim(),
                usuario: `${usuarioInfo.nombre} ${usuarioInfo.apellido}`,
                userId: usuarioInfo.uid,
                fechaCreacion: serverTimestamp(),
            };

            const commentsRef = collection(db, 'posts', post.id, 'comments');
            const newDoc = await addDoc(commentsRef, commentData);

            const newCommentData = {
                ...commentData,
                id: newDoc.id,
                fechaCreacion: new Date(),
            };

            setComments((prev) => [newCommentData, ...prev]);
            setNewComment('');
        } catch (error) {
            console.error('Error al agregar comentario:', error);
        } finally {
            setAddingComment(false);
        }
    };

    const formatFecha = (fecha) => {
        if (!fecha) return 'Fecha no disponible';
        try {
            // Asegúrate de que fecha es un Timestamp o un objeto Date válido
            const dateObj = fecha instanceof Date ? fecha : fecha.toDate ? fecha.toDate() : new Date();
            return dateObj.toLocaleString();
        } catch {
            return 'Fecha inválida';
        }
    };
    

    return (
        <View style={styles.postContainer}>
            <View style={styles.header}>
                <Icon name="account" size={24} color="#fff" />
                <Text style={styles.author}>{post.autor}</Text>
            </View>
            <Text style={styles.content}>{post.contenido}</Text>
            <Text style={styles.date}>{formatFecha(post.fecha)}</Text>
    
            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleReaction('meDivierte')}
                >
                    <Icon name="emoticon-lol" size={20} color="#fff" />
                    <Text style={styles.actionText}>
                        ({post.reacciones?.meDivierte || 0})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleReaction('meInteresa')}
                >
                    <Icon name="thumb-up" size={20} color="#fff" />
                    <Text style={styles.actionText}>
                        ({post.reacciones?.meInteresa || 0})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={toggleComments}>
                    <Icon name="comment" size={20} color="#fff" />
                    <Text style={styles.actionText}>
                        ({comments.length || 0})
                    </Text>
                </TouchableOpacity>
            </View>
    
            {comments.length > 0 && !showComments && (
                <Text style={styles.commentsToggle} onPress={toggleComments}>
                    Ver comentarios
                </Text>
            )}
    
            {(showComments || comments.length > 0) && (
                <View style={styles.commentsSection}>
                    {showComments && (
                        <TouchableOpacity onPress={toggleComments}>
                            <Text style={styles.hideCommentsButton}>Esconder comentarios</Text>
                        </TouchableOpacity>
                    )}
                    {loadingComments ? (
                        <ActivityIndicator size="small" color="#000" />
                    ) : (
                        showComments &&
                        comments.map((comment) => (
                            <View key={comment.id} style={styles.comment}>
                                <View style={styles.commentHeader}>
                                    <Text style={styles.commentUser}>
                                        {comment.usuario || 'Usuario desconocido'}:
                                    </Text>
                                </View>
                                <Text style={styles.commentText}>{comment.texto}</Text>
                                <Text style={styles.commentDate}>
                                    {formatFecha(comment.fechaCreacion)}
                                </Text>
                            </View>
                        ))
                    )}
                    <TextInput
                        style={styles.input}
                        value={newComment}
                        onChangeText={setNewComment}
                        placeholder="Escribe un comentario..."
                        placeholderTextColor="#aaa"
                    />
                    <TouchableOpacity onPress={handleAddComment} disabled={addingComment}>
                        <Text style={styles.addCommentButton}>
                            {addingComment ? 'Publicando...' : 'Comentar'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
    
    
};

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: 'gray',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    author: {
        marginLeft: 10,
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    content: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 10,
    },
    date: {
        fontSize: 12,
        color: '#ccc',
        marginBottom: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    commentsToggle: {
        color: '#1DA1F2',
        fontWeight: 'bold',
        marginTop: 10,
    },
    commentsSection: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        color: '#fff',
        backgroundColor: '#444',
        marginBottom: 10,
    },
    addCommentButton: {
        backgroundColor: '#1DA1F2',
        borderRadius: 5,
        padding: 10,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    hideCommentsButton: {
        color: '#1DA1F2',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentUser: {
        fontWeight: 'bold',
        color: '#fff',  
    },
    comment: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#555',
        borderRadius: 5,
    },
    commentText: {
        color: '#fff',
    },
    commentDate: {
        fontSize: 10,
        color: '#ccc',
    },
});

export default Post;