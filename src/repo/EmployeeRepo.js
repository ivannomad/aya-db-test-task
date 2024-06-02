import { client } from "../db/initDb.js";

class EmployeeRepo {
  async getRewardForEmployees() {
    return await client
      .raw('SELECT e.id,\n' +
      '       e.name,\n' +
      '       e.surname,\n' +
      '       p.employee_total_donation,\n' +
      '       (p.employee_total_donation / p.total_donations * 100)   AS percentage,\n' +
      '       (p.employee_total_donation / p.total_donations * 10000) AS reward\n' +
      'FROM (SELECT s.employee_id,\n' +
      '             s.employee_total_donation,\n' +
      '             (\n' +
      '                 -- get total donation sum\n' +
      '                 SELECT SUM(d.employee_total_donation)\n' +
      '                 FROM (\n' +
      '                          -- collect all usd donations\n' +
      '                          SELECT d.employee_id, (usd.usd + d.amount) AS employee_total_donation\n' +
      '                          FROM (\n' +
      '                                   -- convert all non-usd donations to usd\n' +
      '                                   SELECT d.employee_id, r.date, r.sign, (r.value * d.amount) AS usd\n' +
      '                                   FROM rate r,\n' +
      '                                        donation d\n' +
      '                                   WHERE r.date = d.date\n' +
      '                                     AND r.sign = d.sign) usd,\n' +
      '                               donation d\n' +
      '                          WHERE d.sign = \'USD\'\n' +
      '                            AND d.employee_id = usd.employee_id\n' +
      '                          GROUP BY d.employee_id) d) AS total_donations\n' +
      '      FROM (\n' +
      '               -- get employees who donated more than 100\n' +
      '               SELECT d.employee_id, d.employee_total_donation\n' +
      '               FROM (\n' +
      '                        -- collect all usd donations\n' +
      '                        SELECT d.employee_id, (usd.usd + d.amount) AS employee_total_donation\n' +
      '                        FROM (\n' +
      '                                 -- convert all non-usd donations to usd\n' +
      '                                 SELECT d.employee_id, r.date, r.sign, (r.value * d.amount) AS usd\n' +
      '                                 FROM rate r,\n' +
      '                                      donation d\n' +
      '                                 WHERE r.date = d.date\n' +
      '                                   AND r.sign = d.sign) usd,\n' +
      '                             donation d\n' +
      '                        WHERE d.sign = \'USD\'\n' +
      '                          AND d.employee_id = usd.employee_id\n' +
      '                        GROUP BY d.employee_id) d\n' +
      '               WHERE d.employee_total_donation >= 100\n' +
      '               GROUP BY d.employee_id) s) p,\n' +
      '     employee e\n' +
      'WHERE p.employee_id = e.id;')
      .catch(err => {
        console.log(err)
      });
  }

  async createEmployee(name, surname, departmentId) {
    const [result] = await client('employee')
      .insert({
        name: name,
        surname: surname,
        department_id: departmentId
      })
      .returning(['id', 'name', 'surname', 'department_id'])
      .catch(err => {
        console.log(err)
      });

    return result;
  }
}

const employeeRepo= new EmployeeRepo();

export default employeeRepo;