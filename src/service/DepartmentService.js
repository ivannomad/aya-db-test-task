import departmentRepo from "../repo/DepartmentRepo.js";

class DepartmentService {
  async findOrCreateDepartment(data) {
    const { name } = data;

    const department = await departmentRepo.getDepartmentByName(name);
    if (!department) {
      return await departmentRepo.createDepartment(name);
    }
    return department;
  }
}

const departmentService = new DepartmentService();
export default departmentService;