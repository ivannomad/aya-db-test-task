import salaryRepo from "../repo/SalaryRepo.js";

class SalaryService {
  async createSalaries(salaries, employee) {
    const entities = [];

    for (const salary of salaries) {
      const entity = {
        employee_id: employee.id,
        amount: salary.amount,
        date: salary.date,
      }

      entities.push(entity);
    }

    return await salaryRepo.createSalary(entities);
  }
}

const salaryService = new SalaryService();
export default salaryService;