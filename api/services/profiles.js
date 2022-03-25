const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM profile LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(profile){

  console.log(profile.Email + " " + profile.B_Date);
  const result = await db.query(
    `INSERT INTO profile 
    (Email, Username, Password, Name, B_Date, Profile_Pic) 
    VALUES 
    ("${profile.Email}", "${profile.Username}", "${profile.Password}",  "${profile.Name}", "${profile.B_Date}", "${profile.Profile_Pic}")`
  );

  let message = 'Error in creating profile ';

  if (result.affectedRows) {
    message = 'Profile created successfully';
  }

  return {message};
}

async function update(Email, profile){
  const result = await db.query(
    `UPDATE profile 
    SET Email=${profile.Email}, Username=${profile.Username}, ${profile.Password}, B_Date=${profile.B_Date}, Name=${profile.Name}, Profile_Pic=${profile.Profile_Pic}, User_Email=${profile.User_Email}
    WHERE Email=${Email}` 
  );

  let message = 'Error in updating programming language';

  if (result.affectedRows) {
    message = 'Programming language updated successfully';
  }

  return {message};
}

async function remove(Email){
  const result = await db.query(
    `DELETE FROM profile WHERE Email=${Email}`
  );

  let message = 'Error in deleting profile';

  if (result.affectedRows) {
    message = 'Profile deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
