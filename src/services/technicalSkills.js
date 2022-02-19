import firebase from "../config/firebase";
import {successNotify, errorNotify } from "../lib/toast";
import * as Firebase from "firebase/firebase";

export async function getTechnicalSkills() {

    const technicalSkills = (await firebase.firestore().collection("technicalSkill").get()).docs

    const technicalSkillData = []

    for (let technicalSkill of technicalSkills) {
        technicalSkillData.push(technicalSkill.data())
    }
    return technicalSkillData
}

export function updateTechnicalSkills(id, technicalSkill) {

    firebase.firestore().collection("students").doc(id).update(
        {
            technicalSkill: technicalSkill,
            rewardPoints: Firebase.firestore.FieldValue.increment(10)
        }
    )
        .then((docRef) => {
            successNotify('Technical Skill updated successfully');
            window.location.reload();
        })
        .catch((error) => {
            errorNotify(error)
        });
}