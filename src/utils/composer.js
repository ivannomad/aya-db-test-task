import { isProp } from "./isProp.js";

export function composer(tree) {
  const obj = {};

  for (const node of tree) {
    const { root, children } = node;
    if (root === 'E-List') {
      obj['employees'] = composeEmployeeList(children);
    } else if (root === 'Rates') {
      obj['rates'] = composeRateList(children);
    }
  }

  return obj;
}

function composeEmployeeList(tree) {
  const arr = [];

  for (const node of tree) {
    const { root, children } = node;

    if (root === 'Employee') {
      const result = composeEmployee(children);
      arr.push(result);
    }
  }

  return arr;
}

function composeRateList(children) {
  const arr = [];

  for (const node of children) {
    const { root, children } = node;

    if (root === 'Rate') {
      const result = composeRate(children);
      arr.push(result);
    }
  }

  return arr;
}

function composeEmployee(tree) {
  const obj = {};
  const donations = []

  for (const node of tree) {
    const { root, children } = node;

    if (isProp(root)) {
      const [k, v] = root.split(': ', 2);
      obj[k] = v;
    } else if (root === 'Department') {
      obj['department'] = composeDepartment(children);
    } else if (root === 'Salary') {
      obj['salaries'] = composeSalary(children);
    } else if (root === 'Donation') {
      const donation = composeDonation(children);
      donations.push(donation);
    }
  }

  obj['donations'] = donations;
  return obj;
}

function composeRate(tree) {
  return composeProps(tree);
}

function composeDepartment(tree) {
  return composeProps(tree);
}

function composeSalary(tree) {
  const arr = [];

  for (const node of tree) {
    const { root, children } = node;

    if (root === 'Statement') {
      const result = composeStatement(children);
      arr.push(result);
    }
  }

  return arr;
}

function composeStatement(tree) {
  return composeProps(tree);
}

function composeDonation(tree) {
  const obj = {};

  for (const node of tree) {
    const { root } = node;

    if (isProp(root)) {
      const [k, v] = root.split(': ', 2);

      if (k === 'amount') {
        const [amount, sign] = v.split(' ', 2);
        obj['amount'] = amount;
        obj['sign'] = sign;
      } else {
        obj[k] = v;
      }
    }
  }

  return obj;
}

function composeProps(tree) {
  const obj = {};

  for (const node of tree) {
    const { root } = node;

    if (isProp(root)) {
      const [k, v] = root.split(': ', 2);
      obj[k] = v;
    }
  }

  return obj;
}