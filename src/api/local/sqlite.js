import SQLite from 'react-native-sqlite-2';
import { Data } from '../../assets/pecsCards/index';

const db = SQLite.openDatabase("SayItOut2.db", "1.0", "", 1);

export const createDatabase = () => {
    db.transaction( txn => {
        txn.executeSql("DROP TABLE IF EXISTS Phrases",
          [],
          (tx,res)=>console.log(res),
          (tx, err)=>console.log(err));
        txn.executeSql(`
                  CREATE TABLE IF NOT EXISTS Phrases(
                    phrase_id INTEGER,
                    card_id VARCHAR(60),
                    card_position INTEGER,
                    user_token VARCHAR(300))`,
          [],
          (tx,res)=>console.log(res),
          (tx, err)=>console.log(err));
        txn.executeSql("DROP TABLE IF EXISTS Cards",
          [],
          (tx,res)=>console.log(res),
          (tx, err)=>console.log(err));
        txn.executeSql(`
                  CREATE TABLE IF NOT EXISTS Cards(
                      card_id INTEGER PRIMARY KEY,
                      name VARCHAR(60) ,
                      url INTEGER,
                      name_it VARCHAR(60))`,
          [],
          (tx,res)=>console.log(res),
          (tx, err)=>console.log(err));
    } );
};
export const populateCardsTable = () => {
  db.transaction(txn => {
    Data.forEach(element => {
      txn.executeSql(`
        INSERT INTO Cards (card_id, name, url, name_it)
          values (?,?,?,?)`,
      [element.card_id, element.name, element.url, element.name_it],
      (tx,res)=>console.log(res),
      (tx, err)=>console.log(err)
      );
    });
  });
};

export const insertPhrase = (phrase_id, phrase, email) => {
  phrase.forEach((element, index) => {
    db.transaction( txn => {
      txn.executeSql(`
                INSERT INTO Phrases (phrase_id, card_id, card_position,user_token)
                values (?,?,?,?)`,
        [phrase_id, element.card_id, index, email],
        (tx,res)=>console.log(res),
        (tx, err)=>console.log(err)
      );
    });
  });
};

export const getAllPhrases = (payload) => {
  const { cb, email } = payload;
  db.transaction( txn => {
    txn.executeSql(`
              SELECT phrase_id, card_position, name, name_it, url
                FROM Phrases, Cards
                WHERE user_token = (?) AND Phrases.card_id = Cards.card_id `,
      [email],
      (tx, res)=>{ cb(res.rows._array)},
      (tx, err)=>console.log(err));
    }
  );
};

export const getPhrasesCount = (payload) => {
  const { cb } = payload;
  db.transaction(txn => {
    txn.executeSql(`
              SELECT DISTINCT MAX(phrase_id) as Last_Id
              FROM Phrases`,
      [],
      (tx, res) => {cb(res.rows._array)},
      (tx, err)=>console.log(err));
  });
};

export const getCards = (payload) => {
  const { cb } = payload;
  db.transaction( txn => {
    txn.executeSql(`
              SELECT *
              FROM Cards`,
      [],
      (tx, res)=>{ cb(res.rows._array) },
      (tx, err)=>console.log(err));
  });
};

export const getPhraseCards = (payload) => {
  const { cb, nameCards } = payload;
  db.transaction( txn => {
    txn.executeSql(`
              SELECT name,name_it, url
              FROM Cards
              WHERE name IN (?)`,
      [nameCards],
      (tx, res)=>{cb(res.rows._array)},
      (tx, err)=>console.log(err));
  });
};

export const removePhrase = (payload) => {
  const  phrase_id  = payload;
  db.transaction( txn => {
    txn.executeSql(`
              DELETE FROM Phrases
              WHERE phrase_id = (?)`,
      [phrase_id],
      (tx, res) => console.log(res),
      (tx, err) => console.log(err));
  });
};
