import SQLite from 'react-native-sqlite-storage';

const okCallback = () => console.log(`DB connection established`);
const errorCallback = error => console.log(`DB connection ERROR: ${error}`);

const db = SQLite.openDatabase({
  name: 'SayItOut2.db', createFromLocation: 1
}, okCallback, errorCallback);

export const insertPhrase = (phrase_id, phrase, token) => {
  phrase.forEach((element, index) => {
    db.transaction( txn => {
      txn.executeSql(`
          INSERT INTO Phrases (
            phrase_id, card_id, card_position, user_token
          ) values (?, ?, ?, ?)`,
        [phrase_id, element.card_id, index, token],
        (tx,res)=>console.log(res),
        (tx, err)=>console.log(err)
      );
    });
  });
};

export const getAllPhrases = payload => {
  const { cb, token } = payload;
  db.transaction( txn => {
    txn.executeSql(`
        SELECT phrase_id, card_position, name
        FROM Phrases, Cards
        WHERE user_token = (?) AND Phrases.card_id = Cards.card_id `,
      [token],
      (tx, res) => cb(res.rows.raw()),
      (tx, err) => console.log(err));
  });
};

export const getPhrasesCount = payload => {
  const { cb } = payload;
  db.transaction(txn => {
    txn.executeSql(`
        SELECT DISTINCT MAX(phrase_id) as Last_Id
        FROM Phrases`, [],
      (tx, res) => cb(res.rows.raw()),
      (tx, err)=>console.log(err));
  });
};

export const getCards = payload => {
  const { cb, cat_name } = payload;
  db.transaction( txn => {
    txn.executeSql(`
        SELECT DISTINCT c.card_id as card_id, c.name as name
        FROM Cards as  c
        join Categories as cat
        where c.cat_id=cat.id	and parent=(?) and is_parent=(?)`,
      [cat_name,'0'],
      (tx, res)=> cb(res.rows.raw()),
      (tx, err)=> console.log(err));
  });
};

export const getCategories = payload => {
  const { cb } = payload;
  db.transaction( txn => {
    txn.executeSql(`
        SELECT DISTINCT c.card_id as card_id, c.name as name, cat.name as cat_name, is_parent
        FROM Cards as  c
        JOIN Categories as cat
        WHERE c.cat_id=cat.id AND is_parent=(?)`,
      ['1'],
      (tx, res)=> cb(res.rows.raw()),
      (tx, err)=> console.log(err));
  });
};

export const getPhraseCards = payload => {
  const { cb, nameCards } = payload;
  db.transaction( txn => {
    txn.executeSql(`
      SELECT name, url
      FROM Cards
      WHERE name IN (?)`,
    [nameCards],
    (tx, res)=> cb(res.rows.raw()),
    (tx, err)=>console.log(err));
  });
};

export const removePhrase = payload => {
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
