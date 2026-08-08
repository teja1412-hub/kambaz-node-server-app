import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findCoursesForUser = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const enrollments = await dao.findCoursesForUser(currentUser._id);
    res.json(enrollments);
  };

  const enrollUserInCourse = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const { course } = req.body;
    if (!course) return res.sendStatus(400);

    const status = await dao.enrollUserInCourse(currentUser._id, course);
    res.json(status);
  };

  const unenrollUserFromCourse = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const { course } = req.body;
    if (!course) return res.sendStatus(400);

    const status = await dao.unenrollUserFromCourse(currentUser._id, course);
    res.json(status);
  };

  app.get("/api/enrollments", findCoursesForUser);
  app.post("/api/enrollments", enrollUserInCourse);
  app.delete("/api/enrollments", unenrollUserFromCourse);
}
