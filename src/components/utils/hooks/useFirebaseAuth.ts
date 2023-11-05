import { useContext, useEffect } from "react"
import { FirebaseContext } from "../firebase/FirebaseProvider"
import { GoogleAuthProvider, getAuth,signInWithPopup,signOut as firebaseSignOut, getAdditionalUserInfo, setPersistence, browserLocalPersistence } from "firebase/auth";



export const useFirebaseAuth=()=>{


    const {app,user,setUser}=useContext(FirebaseContext)
  

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged(user => {
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
      console.log("result ",result)

      const additionalInfo=getAdditionalUserInfo(result)
      console.log("additional ",additionalInfo)

      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log("credential ",credential);
      console.log("set user",setUser)
      await setPersistence(auth, browserLocalPersistence);

     // const token = credential.accessToken;
     // setUser( result.user)

      // The signed-in user info.
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
            console.log("signing out")
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