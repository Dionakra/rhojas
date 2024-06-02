import type { Salary } from "$lib/models/SalaryItems"
import SalaryRepository from "$lib/repositories/SalaryRepository"
import LocalSalaryRepository from "$lib/repositories/local/LocalSalaryRepository"

export default class SalaryService {

    private repository: SalaryRepository

    constructor() {
        this.repository = new LocalSalaryRepository()
    }

    getSalary(): Salary {
        return this.repository.get()
    }

    storeSalary(salary: Salary) {
        this.repository.save(salary)
    }
}