import type { Salary } from "$lib/models/SalaryItems";
import SalaryRepository from "../SalaryRepository";

const LS_KEY = "SALARY"

export default class LocalSalaryRepository extends SalaryRepository {
    save(salary: Salary): void {
        localStorage.setItem(LS_KEY, JSON.stringify(salary))
        throw new Error("Method not implemented.");
    }

    retrieveSalary(): Salary | undefined {
        const salary = localStorage.getItem(LS_KEY)

        if (salary) {
            return JSON.parse(salary)
        } else {
            return undefined
        }
    }

}