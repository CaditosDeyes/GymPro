import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CommentList = ({ comments, onDeleteComment, usuarioInfo }) => {
    return (
        <View style={styles.commentsContainer}>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <View key={comment.id} style={styles.commentContainer}>
                        <View style={styles.commentHeader}>
                            <View style={styles.userContainer}>
                                <Icon name="account-circle" size={20} color="#1DA1F2" />
                                <Text style={styles.commentUser}>
                                    {comment.usuario || 'Usuario desconocido'}
                                </Text>
                            </View>
                            {comment.userId === usuarioInfo.id && (
                                <TouchableOpacity
                                    onPress={() => onDeleteComment(comment.id)}
                                >
                                    <Icon name="delete" size={20} color="#fff" />
                                </TouchableOpacity>
                            )}
                        </View>
                        <Text style={styles.commentText}>{comment.texto}</Text>
                        <Text style={styles.commentTimestamp}>
                            {comment.fechaCreacion?.toDate().toLocaleString() ||
                                'Fecha desconocida'}
                        </Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noCommentsText}>No hay comentarios aún.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    commentsContainer: {
        marginTop: 10,
    },
    commentContainer: {
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentUser: {
        fontWeight: 'bold',
        color: '#1DA1F2',
        marginLeft: 5,
    },
    commentText: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 5,
    },
    commentTimestamp: {
        fontSize: 12,
        color: '#ccc',
        textAlign: 'right',
    },
    noCommentsText: {
        color: '#fff',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

export default CommentList;
