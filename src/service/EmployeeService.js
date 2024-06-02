import employeeRepo from "../repo/EmployeeRepo.js";
import departmentService from "./DepartmentService.js";
import salaryService from "./SalaryService.js";
import donationService from "./DonationService.js";

class EmployeeService {
  async getRewardForEmployees() {
    const employees = await employeeRepo.getRewardForEmployees();

    const result = [];

    for (const employee of employees) {
      const { id, name, surname, employee_total_donation, percentage, reward } = employee;

      result.push({
        id: id,
        name: name,
        surname: surname,
        employeeTotalDonation: employee_total_donation,
        percentage: percentage,
        reward: reward,
      });
    }

    return result;
  }

  async createEmployee(employeeDto) {
    const { name, surname, department, salaries, donations } = employeeDto;

    const newDepartment = await departmentService.findOrCreateDepartment(department);
    const newEmployee = await employeeRepo.createEmployee(name, surname, newDepartment.id);

    if (salaries.length) {
      await salaryService.createSalaries(salaries, newEmployee);
    }

    if (donations.length) {
      await donationService.createDonations(donations, newEmployee);
    }

    return newEmployee;
  }
}

const employeeService = new EmployeeService();
export default employeeService;