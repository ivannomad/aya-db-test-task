import { client } from "../db/initDb.js";

class RateRepo {
  async createRates(rates) {
    return await client('rate')
      .insert(rates)
      .returning(['date', 'sign', 'value'])
      .catch(err => {
        console.log(err)
      });
  }
}

const rateRepo= new RateRepo();

export default rateRepo;