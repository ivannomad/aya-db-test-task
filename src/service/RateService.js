import rateRepo from "../repo/RateRepo.js";

class SalaryService {
  async createRates(rates) {
    return await rateRepo
      .createRates(rates)
      .catch(err => console.log(err));
  }
}

const salaryService = new SalaryService();
export default salaryService;