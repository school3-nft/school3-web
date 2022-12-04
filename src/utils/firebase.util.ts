import { initializeApp } from "firebase/app";
import { Dispatch, SetStateAction } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  User as FireUser,
} from "firebase/auth";
import {
  setDoc,
  doc,
  getFirestore,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { User, UserDoc, UserSimple } from "./types.util";
import randUsername from "./rand-username.utils";
import { fetchNewWallet } from "./fetchers.util";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!);

const profile_default =
  "https://firebasestorage.googleapis.com/v0/b/school3-c6e3b.appspot.com/o/images%2Fstudent.png?alt=media&token=007e4d20-42ac-4c30-9b28-baf1e6eff5e0";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// Authorization

export const signUpWithEmail = (
  email: string,
  password: string,
  username: string
) => {
  let returnCode: string = "registered";
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user: FireUser = userCredential.user;
      await fireAddUserToDB(user, username, profile_default);
    })
    .catch((error) => {
      returnCode = error.code;
    });

  return returnCode;
};

export const loginUserEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  signOutFirebase(auth)
    .then(() => {
      console.log("Logged out");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onAuthChange = (
  setUser: Dispatch<SetStateAction<UserSimple>>,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
) =>
  onAuthStateChanged(auth, async (fireUser) => {
    if (fireUser) {
      let user = await getUserById(fireUser.uid);
      setUser({
        uid: fireUser.uid,
        username: user.username,
        avatar: user.avatar,
      });
      setIsLoggedIn(true);
    } else {
      setUser({
        uid: "",
        username: "",
        avatar: "",
      });
      setIsLoggedIn(false);
    }
  });

// DB

export const getUserById = async (uid: string) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) return { uid, ...(docSnap.data() as UserDoc) };
  throw Error("No User with That Id");
};

export const getWallet = async (uid: string) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  const { account_address, account_balance } = docSnap.data()!;
  if (docSnap.exists()) return { account_address, account_balance };
  throw Error("No User with That Id");
};

export const getUserByUsername = async (username: string) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  let user: User = {
    uid: "",
    username: "",
    email: "",
    avatar: "",
    account_address: "",
    account_balance: "",
  };

  querySnapshot.forEach((doc) => {
    const uid: string = doc.id;
    user = { uid, ...doc.data() } as User;
  });

  return user;
};

export const fireAddUserToDB = async (
  user: FireUser,
  username?: string,
  src?: string
) => {
  const docRef = await setDoc(doc(db, "users", user.uid), {
    username: username ? username : randUsername(),
    email: user.email,
    avatar: src ? src : user.photoURL,
    account_address: "",
    account_balance: "",
  } as UserDoc);
};

export const createAndAddWallet = async (uid: string) => {
  const {
    data: { account_address, account_balance },
    returnCode,
  } = await fetchNewWallet();
  const docRef = doc(db, "users", uid);

  if (returnCode === "200") {
    updateDoc(docRef, {
      account_address,
      account_balance,
    });
  } else {
    throw Error("Wallet could not been created");
  }

  return { account_address, account_balance };
};