import firebase from "../config/firebase";
import {successNotify, errorNotify } from "../lib/toast";

export function addEvent(eventDetails) {
    const id = firebase.firestore().collection('events').doc().id
    firebase.firestore().collection("events").doc(id).set({
        id,
        eventDetails
    })
        .then((docRef) => {
            window.location.reload();
            successNotify('Event added successfully');
        })
        .catch((error) => {
            errorNotify(error)
        });
}

export async function getEvents() {

    const events = (await firebase.firestore().collection("events").get()).docs

    const eventData = []
    for (let event of events) {
        eventData.push(event.data())
    }
    return eventData
}