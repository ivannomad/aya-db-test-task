import { client } from "../db/initDb.js";

class DepartmentRepo {
  async getDepartmentByName(name) {
    return await client('department')
      .where('name', name)
      .first()
      .catch(err => {
        console.log(err)
      });
  }

  async createDepartment(name) {
    const [result] = await client('department')
      .insert({ name: name })
      .returning(['id', 'name'])
      .catch(err => {
        console.log(err)
      });

    return result;
  }
}

const departmentRepo= new DepartmentRepo();

export default departmentRepo;