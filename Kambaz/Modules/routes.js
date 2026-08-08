import ModulesDao from "./dao.js";

export default function ModuleRoutes(app, db) {
  const dao = ModulesDao(db);

  // Get all modules for a course
  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  // Create a new module
  const createModule = async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await dao.createModule(courseId, module);
    res.send(newModule);
  };

  const createLessons = async (req, res) => {
    const { courseId } = req.params;
    const { moduleId } = req.params;
    const lesson = {
      ...req.body,
      course: courseId,
      module: moduleId
    };
    const newLesson = await dao.createLesson(courseId, moduleId, lesson);
    res.send(newLesson);
  };

  const updateModule = async (req, res) => {
    const { courseId, moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await dao.updateModule(courseId, moduleId, moduleUpdates);
    res.send(status);
  };

  const deleteModule = async (req, res) => {
    const { courseId, moduleId } = req.params;
    const status = await dao.deleteModule(courseId, moduleId);
    res.send(status);
  };

  app.post("/api/courses/:courseId/modules", createModule);
  app.post("/api/courses/:courseId/modules/:moduleId/lessons", createLessons);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.put("/api/courses/:courseId/modules/:moduleId", updateModule);
  app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);
}
