'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const countChildsModule = require('./countChilds');

// count photos in user-photos
// exports.countUserPhotos = functions.database.ref('v0/user-photos/{userid}/photos/{photoid}').onWrite(countChildsModule.count);
// exports.recountUserPhotos = functions.database.ref('v0/user-photos/{userid}/count').onWrite(countChildsModule.recount);
// count stars in user-photos
// exports.countStarsUserPhotos = functions.database.ref('v0/user-photos/{userid}/photos/{photoid}/stars/users/{likeuserid}').onWrite(countChildsModule.count);
// exports.recountStarsUserPhotos = functions.database.ref('v0/user-photos/{userid}/photos/{photoid}/stars/count').onWrite(countChildsModule.recountusers);

// count likes in users
// exports.countLikesUser = functions.database.ref('v0/users/{userid}/likes/photos/{photoid}').onWrite(countChildsModule.count);
exports.recountLikesUser = functions.database.ref('v0/users/{userid}/likes/count').onWrite(countChildsModule.recount);

// count stars in photos
// exports.countStarsPhoto = functions.database.ref('v0/photos/{photoid}/stars/users/{userid}').onWrite(countChildsModule.count);
// exports.recounStarsPhoto = functions.database.ref('v0/photos/{photoid}/stars/count').onWrite(countChildsModule.recountusers);

// exports.cloneDataInUserPhotos = functions.database.ref('v0/photos/{photoid}').onWrite(countChildsModule.cloneDataPhoto);
