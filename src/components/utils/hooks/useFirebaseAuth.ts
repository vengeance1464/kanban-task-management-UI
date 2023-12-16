import { useContext, useEffect } from "react"
import { FirebaseContext } from "../firebase/FirebaseProvider"
import { GoogleAuthProvider, getAuth,signInWithPopup,signOut as firebaseSignOut, getAdditionalUserInfo, setPersistence, browserLocalPersistence } from "firebase/auth";



export const useFirebaseAuth=()=>{


    const {user,setUser}=useContext(FirebaseContext)
  

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged( (user) => {
          if (user) {
            // User is signed in.
            
            setUser(user);
          } else {
            // No user is signed in.
            setUser(null);
          }
        });
    
        // Clean up the subscription
        return () => {
          unsubscribe();
        };
      }, []);
    const signIn=async ()=>{
        try
        {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

      const result=  await signInWithPopup(auth, provider)

      const additionalInfo=getAdditionalUserInfo(result)

      const credential = GoogleAuthProvider.credentialFromResult(result);

      await setPersistence(auth, browserLocalPersistence);

      }catch(error){

            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        }
    }

       const signOut=async()=>{
        try
        {
        const auth = getAuth();
        const result= await firebaseSignOut(auth);
         setUser(null)
        }catch(error)
        {
          console.log("error ",error)
        }
       }

       return {user,signIn,signOut}
}