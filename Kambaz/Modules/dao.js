import { v4 as uuidv4 } from "uuid";
export default function ModulesDao(db) {
  let { modules } = db;

  function findModulesForCourse(courseId) {
    const { modules } = db;
    return modules.filter((module) => module.course === courseId);
  }

  const createModule = (module) => {
    const newModule = { ...module, _id: uuidv4()};
    modules = [...db.modules, newModule];
    return newModule;
  };

  const updateModule = (moduleId, moduleUpdates) => {
    const { modules } = db;
    const module = modules.find((module) => module._id === moduleId);
    Object.assign(module, moduleUpdates);
    return module;
  };

  const deleteModule = (moduleId) => {
    const { modules } = db;
    db.modules = modules.filter((module) => module._id !== moduleId);
  };

  return {
    findModulesForCourse,
    createModule,
    updateModule,
    deleteModule,
  };
}
