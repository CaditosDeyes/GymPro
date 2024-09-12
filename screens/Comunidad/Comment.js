import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
import Reaction from './Reaction';

const Comment = ({ comment }) => {
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState('');

    const addReply = () => {
        if (newReply.trim()) {
            setReplies([...replies, { id: replies.length.toString(), content: newReply, reactions: {} }]);
            setNewReply('');
        }
    };

    return (
        <View style={styles.commentContainer}>
            <Text>{comment.content}</Text>
            <Reaction />
            <FlatList
                data={replies}
                renderItem={({ item }) => <Comment comment={item} />}
                keyExtractor={item => item.id}
            />
            <View style={styles.replyInputContainer}>
                <TextInput
                    style={styles.replyInput}
                    value={newReply}
                    onChangeText={setNewReply}
                    placeholder="Responder..."
                    placeholderTextColor="#ccc"
                />
                <TouchableOpacity onPress={addReply}>
                    <Text style={styles.addReplyButton}>Responder</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    commentContainer: {
        marginTop: 10,
        paddingLeft: 10,
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
    },
    replyInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    replyInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#333',
    },
    addReplyButton: {
        marginLeft: 10,
        color: '#1DA1F2',
        fontWeight: 'bold',
    },
});

export default Comment;
