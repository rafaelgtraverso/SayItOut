import SQLite from 'react-native-sqlite-2';
import { Alert } from 'react-native';
import { navigate } from '../../navigationRef';

const db = SQLite.openDatabase("SayItOut.db", "1.0", "", 1);

export const createDatabase = () => {
  const cb = ()=>null;
    db.transaction( txn => {
        txn.executeSql("DROP TABLE IF EXISTS Phrases", [],cb,cb);
        txn.executeSql("CREATE TABLE IF NOT EXISTS Phrases(phrase_id INTEGER, name VARCHAR(60), card_position INTEGER)",[],cb,cb);
        // txn.executeSql("DROP TABLE IF EXISTS Cards",[],cb,cb);
        // txn.executeSql("CREATE TABLE IF NOT EXISTS Cards(name VARCHAR(60) PRIMARY KEY, url INTEGER, phone_lang_name VARCHAR(60))",[],cb,cb);
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

export const insertPhrase = (phrase_id, phrase) => {
  phrase.forEach((element, index) => {
      db.transaction( txn => {
        txn.executeSql(
          "INSERT INTO Phrases (phrase_id, name, card_position) values (?,?,?)",
          [phrase_id, element, index],
          ()=> console.log('succeed'),
          ()=> console.log('error'))
        });
  })
  
  
};

export const getAllPhrases = (payload) => {
  const { cb } = payload;
  db.transaction( txn => {
    txn.executeSql(`SELECT phrase_id, card_position, P.name, url 
                    FROM Phrases as P, Cards
                    WHERE p.name=Cards.name`,
      [],
      (tx, res)=>{      
        cb(res.rows._array);
      // console.log(res.rows._array);
      })
    }
  );
};

export const getPhrasesCount = (payload) => {
  const { cb } = payload;
  db.transaction(txn => {
    txn.executeSql("SELECT DISTINCT MAX(phrase_id) as Last_Id FROM Phrases", 
      [],
      (tx, res) => {
        cb(res.rows._array);
      })
  });
};

export const getCards = (payload) => {
  const { cb } = payload;
  db.transaction( txn => {
    txn.executeSql("SELECT name, url FROM Cards",
      [],
      (tx, res)=>{      
      cb(res.rows._array);
      // console.log(res.rows);
    })
  });
};

export const getPhraseCards = (payload) => {
  const { cb, nameCards } = payload;
  db.transaction( txn => {
    txn.executeSql("SELECT name, url FROM Cards WHERE name IN (?)",
      [nameCards],
      (tx, res)=>{      
      cb(res.rows._array);
      // console.log(res.rows);
    })
  });
};
