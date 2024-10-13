import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../Firebase';

const useNombreUsuario = () => {
    const [nombreUsuario, setNombreUsuario] = useState('Usuario');
    // const [loading, setLoading] = useState(true); // Para controlar el estado de carga
  
    const obtenerNombreUsuarioPorUID = async (uid) => {
      try {
        const q = query(collection(db, 'usuarios'), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const nombre = doc.data().nombre;
            setNombreUsuario(nombre);
          });
        } else {
          console.log('No se encontró el usuario');
        }
      } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error);
      } finally {
        // setLoading(false); // Finaliza el estado de carga
      }
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          obtenerNombreUsuarioPorUID(uid);
        } else {
          console.log('No hay ningún usuario autenticado');
          // setLoading(false); // Finaliza el estado de carga si no hay usuario autenticado
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    return { nombreUsuario };
  };
  
  export default useNombreUsuario;