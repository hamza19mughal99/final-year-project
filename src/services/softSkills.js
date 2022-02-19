import firebase from "../config/firebase";
import {successNotify, errorNotify } from "../lib/toast";
import * as Firebase from "firebase/firebase";

export function updateSoftSkills(id, softSkill) {

    firebase.firestore().collection("students").doc(id).update(
        {
            softSkill: softSkill,
            rewardPoints: Firebase.firestore.FieldValue.increment(5)
        }
    )
        .then((docRef) => {
            successNotify('soft skills updated successfully');
            window.location.reload();
        })
        .catch((error) => {
            errorNotify(error)
        });
}



