import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {createContext, useEffect, useState} from "react";
import app from "../../firebase/firebase.Config";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const GoogleUser = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      /* for jwt */
      if (currentUser) {
        const userInfo = {email: currentUser.email};
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("token");
        setLoading(false);
      }
    });
    return () => {
      return unSubscribe();
    };
  }, [axiosPublic, user?.email]);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    updateUser,
    signIn,
    logOut,
    GoogleUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
