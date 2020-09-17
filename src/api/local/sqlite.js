import SQLite from 'react-native-sqlite-2';
import { Alert } from 'react-native';
import { navigate } from '../../navigationRef';

const db = SQLite.openDatabase("SayItOut.db", "1.0", "", 1);

export const createDatabase = () => {
    db.transaction( txn => {
        txn.executeSql("DROP TABLE IF EXISTS Phrases", []);
        txn.executeSql("CREATE TABLE IF NOT EXISTS Phrases(phrase_id INTEGER PRIMARY KEY AUTOINCREMENT, phrase VARCHAR(300))",[]);
        //txn.executeSql("DROP TABLE IF EXISTS Cards",[]);
        txn.executeSql("CREATE TABLE IF NOT EXISTS Cards(name VARCHAR(60), url INTEGER, phone_lang_name VARCHAR(60))",[]);
    } );
    console.log('db created');
};
export const populateCardsTable = (name_eng, url, phone_lang_name) => {
  db.transaction(txn => {
    txn.executeSql( "INSERT INTO Cards (name, url, phone_lang_name) values (?,?,?)",
    [name_eng, url, phone_lang_name],
    (tx,result) => {
      if(result.rowsAffected > 0){
       console.log(result);
      } else {
        console.log("We apologise. but we couldn't save the cards");
      }
    });
  });
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
            'You save the phrase succesfuly:',
            [
              {
                text: 'OK',
                onPress: () => navigate('Phrases')
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

export const getAllPhrases = (params) => {
  const { cb } = params;
  db.transaction( txn => {
    txn.executeSql("SELECT phrase FROM Phrases",[],(tx, res)=>{      
      cb(res.rows._array);
      // console.log(res.rows._array);
    })
  });
};

export const getCards = (params) => {
  const { cb } = params;
  db.transaction( txn => {
    txn.executeSql("SELECT name, url FROM Cards",[],(tx, res)=>{      
      cb(res.rows._array);
      // console.log(res.rows);
    })
  });
};
