class Trainer {
    constructor(trainer_id, first_name, last_name, subject, created_at, updated_at) {
        this.trainer_id = trainer_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.subject = subject;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
module.exports = Trainer;
