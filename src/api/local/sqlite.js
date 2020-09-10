import SQLite from 'react-native-sqlite-2';
import { Alert } from 'react-native';
import { navigate } from '../../navigationRef';

const db = SQLite.openDatabase("SayItOut.db", "1.0", "", 1);

export const createDatabase = () => {
    db.transaction( txn => {
        txn.executeSql("DROP TABLE IF EXISTS Phrases", []);
        txn.executeSql("CREATE TABLE IF NOT EXISTS Phrases(phrase_id INTEGER PRIMARY KEY AUTOINCREMENT, phrase VARCHAR(300))",[]);
    } );
    console.log('db created');
};

export const insertPhrase = (phrase) => {
  db.transaction( txn => {
    txn.executeSql(
      "INSERT INTO Phrases (phrase) values (?)",
      [phrase], 
      (tx, result) => {
        if(result.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'You save the phrase succesfuly',
            [
              {
                text: 'OK',
                onPress: () => navigate('PhraseListScreen')
              }
            ],
            {cancelable: false}
          );
        } else {
          alert("We apologise. but we couldn't save the phrase");
        }
      });
  });
};

// export default { createDatabase, insertPhrase };
