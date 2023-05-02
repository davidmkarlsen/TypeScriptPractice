class Department {
    // private readonly id: string;
    // private name: string;
    private employees: string[] = [];

    constructor(private readonly id: string, public name: string) {
        // this.id = id
        // this.name = name;
    }

    describe(this: Department) {
        console.log(`Department: (${this.id}): ${this.name}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

const accounting = new Department('d1', 'Accounting');

accounting.addEmployee('Max');
accounting.addEmployee('Manu');

accounting.describe();
accounting.printEmployeeInformation()

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: any) {
        this.data.push(item);
    }

    removeItem(item: any) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data]
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max')
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>();