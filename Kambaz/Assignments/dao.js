export default function AssignmentsDao(db) {
  let { assignments } = db;

  const findAssignmentsForCourse = (courseId) => {
    return assignments.filter((assignment) => assignment.course === courseId);
  };

  const createAssignment = (assignment) => {
    const newAssignment = { ...assignment, _id: Date.now().toString() };
    assignments = [...assignments, newAssignment];
    return newAssignment;
  };

  const updateAssignment = (assignmentId, assignmentUpdates) => {
    const assignment = assignments.find((a) => a._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  };

  const deleteAssignment = (assignmentId) => {
    db.assignments = assignments.filter((a) => a._id !== assignmentId);
  };

  return {
    findAssignmentsForCourse,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}