import { client } from "../db/initDb.js";

class SalaryRepo {
  async createSalary(salaries) {
    return await client('salary')
      .insert(salaries)
      .returning(['id', 'employee_id', 'amount', 'date'])
      .catch(err => {
        console.log(err)
      });
  }
}

const salaryRepo= new SalaryRepo();

export default salaryRepo;