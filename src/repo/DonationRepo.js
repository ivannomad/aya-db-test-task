import { client } from "../db/initDb.js";

class DonationRepo {
  async createDonations(donations) {
    return await client('donation')
      .insert(donations)
      .returning(['id', 'employee_id', 'date', 'amount', 'sign'])
      .catch(err => {
        console.log(err)
      });
  }
}

const donationRepo= new DonationRepo();

export default donationRepo;