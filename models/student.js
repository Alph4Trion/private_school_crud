class Student {
    constructor(id, first_name, last_name, date_of_birth, tuition_fees, created_at, updated_at) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.date_of_birth = date_of_birth;
        this.tuition_fees = tuition_fees;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
module.exports = Student;
