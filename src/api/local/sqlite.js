import { useContext, useEffect } from 'react';
import SQLite from 'react-native-sqlite-2';
import { TabRouter } from 'react-navigation';
import { Data } from '../../assets/cardsPng/index';
import { Data as DataIt } from '../../assets/it';
const RNFS = require('react-native-fs');

const db = SQLite.openDatabase("SayItOut.db", "1.0", "", 1);

export const createDatabase = () => {
    db.transaction( txn => {
        txn.executeSql("DROP TABLE IF EXISTS Phrases", 
          [],
          (tx,result)=>console.log(result),
          (tx, err)=>console.log(err));
        txn.executeSql("CREATE TABLE IF NOT EXISTS Phrases(phrase_id INTEGER, card_id VARCHAR(60), card_position INTEGER)",
          [],
          (tx,result)=>console.log(result),
          (tx, err)=>console.log(err));
        txn.executeSql("DROP TABLE IF EXISTS Cards",
          [],
          (tx,result)=>console.log(result),
          (tx, err)=>console.log(err));
        txn.executeSql(`CREATE TABLE IF NOT EXISTS Cards(
                          card_id INTEGER PRIMARY KEY, 
                          name VARCHAR(60) , 
                          url INTEGER, 
                          name_it VARCHAR(60))`,
          [],
          (tx,result)=>console.log(result),
          (tx, err)=>console.log(err));
    } );
    console.log('db created');
};
export const populateCardsTable = () => {
  db.transaction(txn => {
    Data.forEach(element => {
      txn.executeSql(`
        INSERT INTO Cards (card_id, name, url, name_it) 
          values (?,?,?,?)`,
      [element.card_id, element.name, element.url, element.name_it],
      (tx,result)=>console.log(result),
      (tx, err)=>console.log(err)
      );
    }); 
    DataIt.forEach(element => {
      txn.executeSql(`
        UPDATE Cards 
        SET name_it=?
        WHERE card_id=?`,
        [element.name_it, element.card_id],
        (tx,result)=>console.log(result),
      (tx, err)=>console.log(err)
      );
    });
  });
};

export const insertPhrase = (phrase_id, phrase) => {
  phrase.forEach((element, index) => {
    db.transaction( txn => {
      txn.executeSql(
        "INSERT INTO Phrases (phrase_id, card_id, card_position) values (?,?,?)",
        [phrase_id, element.card_id, index],
        (tx,result)=>console.log(result),
        (tx, err)=>console.log(err)
      );
    });
  });  
};

export const getAllPhrases = (payload) => {
  const { cb } = payload;
  db.transaction( txn => {
    txn.executeSql(`SELECT phrase_id, card_position, name, name_it, url 
                    FROM Phrases, Cards
                    WHERE Phrases.card_id = Cards.card_id`,
      [],
      (tx, res)=>{ cb(res.rows._array)},
      (tx, err)=>console.log(err));
    }
  );
};

export const getPhrasesCount = (payload) => {
  const { cb } = payload;
  db.transaction(txn => {
    txn.executeSql("SELECT DISTINCT MAX(phrase_id) as Last_Id FROM Phrases", 
      [],
      (tx, res) => {cb(res.rows._array)},
      (tx, err)=>console.log(err));
  });
};

export const getCards = (payload) => {
  const { cb } = payload;
  db.transaction( txn => {
    txn.executeSql("SELECT * FROM Cards",
      [],
      (tx, res)=>{ cb(res.rows._array) },
      (tx, err)=>console.log(err));
  });
};

export const getPhraseCards = (payload) => {
  const { cb, nameCards } = payload;
  db.transaction( txn => {
    txn.executeSql("SELECT name,name_it, url FROM Cards WHERE name IN (?)",
      [nameCards],
      (tx, res)=>{cb(res.rows._array)},
      (tx, err)=>console.log(err));
  });
};


