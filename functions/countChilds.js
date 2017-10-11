/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const recountFn = (event, refColl) => {
  if (!event.data.exists()) {
    const counterRef = event.data.ref;
    const collectionRef = counterRef.parent.child(refColl);

    // Return the promise from counterRef.set() so our function
    // waits for this async event to complete before it exits.
    return collectionRef.once('value')
        .then(messagesData => counterRef.set(messagesData.numChildren()));
  }
};

exports.count = (event) => {
  const collectionRef = event.data.ref.parent;
  const countRef = collectionRef.parent.child('count');

  // Return the promise from countRef.transaction() so our function
  // waits for this async event to complete before it exits.
  return countRef.transaction(current => {
    if (event.data.exists() && !event.data.previous.exists()) {
      return (current || 0) + 1;
    }
    else if (!event.data.exists() && event.data.previous.exists()) {
      return (current || 0) - 1;
    }
  }).then(() => {
    console.log('Counter updated.');
  });
  // event.data.ref.parent.child('uppercase').set(uppercase);
};

exports.recount = (event) => {
  recountFn(event, 'photos');
};

exports.recountusers = (event) => {
  recountFn(event, 'users');
};

exports.cloneDataPhoto = (event) => {
  const collectionRef = event.data.ref.parent;
  const key = event.data.key;
  const data = event.data.val();
  const uid = data.data.uid;
  const ref = collectionRef.parent.child('user-photos');
  return ref.child(uid + '/photos').child(key).set(data);
};
