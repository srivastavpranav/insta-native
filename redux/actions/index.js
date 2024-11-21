import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { USER_STATE_CHANGE } from "../constants";

export function fetchUser() {
  return (dispatch) => {
    getDoc(doc(db, "users", auth.currentUser.uid))
      .then((docSnap) => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          dispatch({
            type: USER_STATE_CHANGE,
            currentUser: docSnap.data(),
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };
}
