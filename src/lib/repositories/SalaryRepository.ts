import { type Salary } from "$lib/models/SalaryItems"

export default abstract class SalaryItems {
    abstract save(salary: Salary): void
    abstract retrieveSalary(): Salary | undefined

    get(): Salary {
        const saved = this.retrieveSalary()
        if (saved) {
            return saved
        }

        return this._defaultSalary()
    }

    _defaultSalary(): Salary {
        return {
            monthly: 1471.54,
            baseNational: 44,
            fireNational: 25,
            baseInternational: 66,
            fireInternational: 110

        }
    }

}