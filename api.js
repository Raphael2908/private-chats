import { db } from "./firebase.js"
import { collection, addDoc } from "firebase/firestore"; 

export async function add() {
    try {
        const docRef = await addDoc(collection(db, "sessions"), {
          first: "max",
          last: "neo",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}