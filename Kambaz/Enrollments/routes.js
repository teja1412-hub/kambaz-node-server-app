import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const getEnrollmentsForUser = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const enrollments = dao.findEnrollmentsForUser(currentUser._id);
    res.json(enrollments);
  };

  const enrollUser = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const { course } = req.body;
    const enrollment = dao.enrollUserInCourse(currentUser._id, course);
    if (!enrollment) return;

    res.json(enrollment);
  };

  const unenrollUser = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const { course } = req.body;
    dao.unenrollUserFromCourse(currentUser._id, course);
    res.sendStatus(204);
  };

  app.get("/api/enrollments", getEnrollmentsForUser);
  app.post("/api/enrollments", enrollUser);
  app.delete("/api/enrollments", unenrollUser);
}
