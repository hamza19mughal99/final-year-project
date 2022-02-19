import firebase from "../config/firebase";

export function updateLocation(id, studentLocation) {

    firebase.firestore().collection("students").doc(id).update(
        {
            location: studentLocation,
        }
    )
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}