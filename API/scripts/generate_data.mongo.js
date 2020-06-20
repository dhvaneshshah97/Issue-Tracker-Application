/* global db print */
/* eslint no-restricted-globals: "off" */
db.issues.remove({});
db.deleted_issues.remove({});
const owners = ['Ravan', 'Eddie', 'Pieta', 'Parvati', 'Victor'];
const statuses = ['New', 'Assigned', 'Fixed', 'Closed'];
const initialCount = db.issues.count();
for (let i = 0; i < 100; i += 1) {
    const randomCreatedDate = (new Date())
        - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
    const created = new Date(randomCreatedDate);
    const completionDate = new Date(created.getTime() + 1000 * 60 * 60 * 24 * 10)
    const randomDueDate = (new Date())
        - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
    const due = new Date(randomDueDate);
    const owner = owners[Math.floor(Math.random() * 5)];
    const status = statuses[Math.floor(Math.random() * 4)];
    const effort = Math.ceil(Math.random() * 20);
    const title = `Lorem ipsum dolor sit amet, ${i+1}`;
    const id = initialCount + i + 1;
    const issue = {
        id, title, created, due, owner, status, effort, completionDate
    };
    db.issues.insertOne(issue);
}
const count = db.issues.count();
db.counters.update({ _id: 'issues' }, { $set: { current: count } });
print('New issue count:', count);