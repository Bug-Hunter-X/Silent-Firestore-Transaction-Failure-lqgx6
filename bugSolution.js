// Correct implementation using get() to retrieve the document before updating within the transaction

firebase.firestore().runTransaction(async (transaction) => {
  const docRef = db.collection('myCollection').doc('myDoc');
  const doc = await transaction.get(docRef); // Correctly retrieve document

  if (!doc.exists) {
    throw new Error("Document does not exist!");
  }

  const newData = { ...doc.data(), count: doc.data().count + 1 };
  transaction.update(docRef, newData);
  return transaction;
}).then(() => {
  console.log('Transaction successfully committed!');
}).catch((error) => {
  console.error('Transaction failed:', error);
});