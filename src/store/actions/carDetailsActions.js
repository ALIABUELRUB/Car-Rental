import * as actionTypes from './actionTypes';
import { storage } from '../../FirebaseStorage/FirebaseStorage';

export const carDetailsStart = () => {
    return {
        type: actionTypes.CAR_DETAILS_START
    };
};

export const carDetailsInit = () => {

    return dispatch => {
        dispatch(carDetailsStart());
    };
};


export const exteriorImages = (exteriorImages) => {

    let exteriorImagesURL = []

    for (let key in exteriorImages) {

        console.log(storage.ref('exteriorImages/').child(exteriorImages[key]).getDownloadURL())
        storage.ref('exteriorImages/').child(exteriorImages[key]).getDownloadURL().then(url => {
            exteriorImagesURL.push(url)
        })
    }

    return {
        type: actionTypes.EXTERIOR_IMAGES,
        exteriorImagesURL: exteriorImagesURL
    }
}

export const interiorImages = (interiorImages) => {

    let interiorImagesURL = []

    for (let key in interiorImages) {
        storage.ref('interiorImages/').child(interiorImages[key]).getDownloadURL().then(url => {
            interiorImagesURL.push(url)
        })
    }

    return {
        type: actionTypes.INTERIOR_IMAGES,
        interiorImagesURL: interiorImagesURL
    }
}