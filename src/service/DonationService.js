import donationRepo from "../repo/DonationRepo.js";

class DonationService {
  async createDonations(donations, employee) {
    const entities = [];

    for (const donation of donations) {
      const entity = {
        employee_id: employee.id,
        date: donation.date,
        amount: donation.amount,
        sign: donation.sign,
      }

      entities.push(entity);
    }

    return await donationRepo.createDonations(entities);
  }
}

const donationService = new DonationService();
export default donationService;