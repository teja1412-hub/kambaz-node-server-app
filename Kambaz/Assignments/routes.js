import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  // Get all assignments for a course
  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await  dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  // Create a new assignment
  const createAssignment = async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await  dao.createAssignment(assignment);
    res.send(newAssignment);
  };

  // Update an assignment
  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = await  dao.updateAssignment(assignmentId, assignmentUpdates);
    res.send(status);
  };

  // Delete an assignment
  const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await  dao.deleteAssignment(assignmentId);
    res.send(status);
  };

  // Route mappings
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}