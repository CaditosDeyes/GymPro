// en Post.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

const Post = ({ post }) => {
    return (
        <View style={styles.postContainer}>
            <Text style={styles.postContent}>{post.content}</Text>
            {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton}>
                    <Icon2 name="laugh-squint" size={20} style={styles.icon}/>
                    <Text style={styles.actionText}>Me divierte</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Icon name="like1" size={20} style={styles.icon}/>
                    <Text style={styles.actionText}>Me interesa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Icon2 name="comment-alt" size={20} style={styles.icon}/>
                    <Text style={styles.actionText}>Comentar</Text>
                </TouchableOpacity>
            </View>
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
    postContent: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 10,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1DA1F2',
        borderRadius: 5,
        padding: 10,
    },
    actionIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    icon: {
        color: "white",
        marginRight: 5,
        
    }
});

export default Post;
