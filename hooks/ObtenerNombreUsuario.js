import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'; // Añadimos `updateDoc` y `doc`
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../Firebase'; // Asegúrate de que 'db' esté bien exportado desde tu configuración de Firebase

const useUsuarioInfo = () => {
    const [usuarioInfo, setUsuarioInfo] = useState({
        uid: '',
        nombre: '',
        apellido: '',
        correoElectronico: '',
        estatura: '',
        nivelExperiencia: '',
        peso: '',
    });

    // Obtener la información del usuario por su UID
    const obtenerInfoUsuarioPorUID = async (uid) => {
        try {
            // Consulta en la colección 'usuarios' para obtener el documento del usuario
            const q = query(collection(db, 'usuarios'), where('uid', '==', uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Si se encuentra el usuario, actualiza el estado
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    setUsuarioInfo({
                        uid: data.uid || '',
                        nombre: data.nombre || '',
                        apellido: data.apellido || '',
                        correoElectronico: data.correoElectronico || '',
                        estatura: data.estatura || '',
                        nivelExperiencia: data.nivelExperiencia || '',
                        peso: data.peso || '',
                    });
                });
            } else {
                console.log('No se encontró el usuario con el UID proporcionado');
            }
        } catch (error) {
            console.error('Error al obtener la información del usuario:', error);
        }
    };

    // Función para actualizar la información del usuario en Firestore
    const actualizarUsuarioInfo = async (nuevaInfo) => {
        try {
            const user = auth.currentUser;

            if (!user) {
                console.error('No hay usuario autenticado para actualizar');
                return;
            }

            const q = query(collection(db, 'usuarios'), where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0]; // Asume que el UID es único
                const docRef = doc(db, 'usuarios', userDoc.id);

                // Actualiza el documento con la nueva información
                await updateDoc(docRef, nuevaInfo);

                // Actualiza el estado local con la nueva información
                setUsuarioInfo((prev) => ({
                    ...prev,
                    ...nuevaInfo,
                }));
            } else {
                console.error('No se encontró el documento del usuario para actualizar');
            }
        } catch (error) {
            console.error('Error al actualizar la información del usuario:', error);
        }
    };

    // useEffect para escuchar cambios en el estado de autenticación del usuario
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Si el usuario está autenticado, obtiene la información del usuario
                obtenerInfoUsuarioPorUID(user.uid);
            } else {
                console.log('No hay ningún usuario autenticado');
            }
        });

        // Limpieza de la suscripción cuando el componente se desmonta
        return () => unsubscribe();
    }, []);

    return { usuarioInfo, actualizarUsuarioInfo }; // Devuelve el estado del usuario y la función para actualizar
};

export default useUsuarioInfo;
