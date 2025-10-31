import { redis_client } from '../db/redis.client.js';

async function strings() {
  try {
    const user_1_firstName_response = await redis_client.set('user:1:firstName', 'Arijit');
    const user_1_lastNameName_response = await redis_client.set('user:1:lastName', 'Das');
    const user_1_dob_response = await redis_client.set('user:1:dob', '1999-05-28');
    const user_1_weight_response = await redis_client.set('user:1:weight', 60);
    console.log('[strings]: ', { user_1_firstName_response, user_1_lastNameName_response, user_1_dob_response, user_1_weight_response });
    /* 
    [strings]:  {
      user_1_firstName_response: 'OK',
      user_1_lastNameName_response: 'OK',
      user_1_dob_response: 'OK',
      user_1_weight_response: 'OK'
    }
    */

    const user_1_firstName = await redis_client.get('user:1:firstName');
    const user_1_lastNameName = await redis_client.get('user:1:lastName');
    const user_1_dob = await redis_client.get('user:1:dob');
    const user_1_weight = await redis_client.get('user:1:weight');
    console.log('[strings]: ', { user_1_firstName, user_1_lastNameName, user_1_dob, user_1_weight });
    /* 
    [strings]:  {
      user_1_firstName: 'Arijit',
      user_1_lastNameName: 'Das',
      user_1_dob: '1999-05-28',
      user_1_weight: '60'
    }
    */

    const multiple_get = await redis_client.mGet(['user:1:firstName', 'user:1:lastName', 'user:1:role', 'user:1:dob', 'user:1:weight']);
    console.log('[strings]: ', { multiple_get });
    /* 
    [strings]:  { multiple_get: [ 'Arijit', 'Das', null, '1999-05-28', '60' ] } 
    */

    const weight_incr_1 = await redis_client.incr('user:1:weight');
    const weight_incr_2 = await redis_client.incr('user:1:weight');
    const weight_incr_3 = await redis_client.incr('user:1:weight');
    console.log('[strings]: ', { weight_incr_1, weight_incr_2, weight_incr_3, weight: await redis_client.get('user:1:weight') });
    /*
    [strings]:  {
      weight_incr_1: 61,
      weight_incr_2: 62,
      weight_incr_3: 63,
      weight: '63'
    }
    */
  } catch (error) {
    console.log('[strings]: error', error);
  } finally {
    redis_client.disconnect();
    console.log('[strings]: redis disconnected');
  }
}

strings();
