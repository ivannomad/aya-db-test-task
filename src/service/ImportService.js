import { parser } from "../utils/parser.js";
import { composer } from "../utils/composer.js";
import employeeService from "./EmployeeService.js";
import rateService from "./RateService.js";

class ImportService {
  async importCustomFormatDump(file) {
    const tree = parser(file);
    const { employees, rates } = composer(tree);

    if (employees) {
      for (const employee of employees) {
        await employeeService.createEmployee(employee);
      }
    }

    if (rates?.length) {
      await rateService.createRates(rates);
    }
  }
}

const importService = new ImportService();
export default importService;