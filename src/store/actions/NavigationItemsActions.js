import * as actionTypes from './actionTypes';

import { storage } from '../../FirebaseStorage/FirebaseStorage';
import { get } from '../../httpService/httpService';

export const navigationItems = (userName, imgURL) => { 
    return {
        type: actionTypes.NAVIGATIONITEMS,
        userName: userName,
        imgURL: imgURL
    };
}

export const navigationItemsInit = (userID) => {
    const queryParams = '&orderBy="userId"&equalTo="' + userID + '"';

    return dispatch => {
        get('/UserInfo.json', queryParams)
            .then(res => {
                Object.values(res.data).map((data, i) => {
                    console.log(data)
                    console.log(data.imgName)
                    console.log(data.name)

                    storage.ref('UsersImages/').child(data.imgName).getDownloadURL().then(url => {
                        dispatch(navigationItems(data.name, url))
                    })

                })

            })
    }
}