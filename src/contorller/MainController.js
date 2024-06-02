import importService from "../service/ImportService.js";
import employeeService from "../service/EmployeeService.js";

class MainController {
  async getRewardForEmployee(req, res) {
    try {
      const result = await employeeService.getRewardForEmployees();
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  async importCustomDumpFile(req, res) {
    try {
      await importService.importCustomFormatDump(req.text);
      res.status(201).json([]);
    } catch (err) {
      console.error(err);
    }
  }
}

const mainController = new MainController();

export default mainController;