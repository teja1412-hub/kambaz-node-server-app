import courseModel from "../Courses/model.js";
import { v4 as uuidv4 } from "uuid";
export default function ModulesDao(db) {

  const findModulesForCourse = async (courseId) =>  {
    const course = await courseModel.findById(courseId);
    return course ? course.modules : [];
  }

  const createModule = async (courseId, module) => {
    const newModule = { ...module, _id: uuidv4(), lessons: [] };
    await courseModel.updateOne(
      { _id: courseId },
      { $push: { modules: newModule } }
    );
    return newModule;
  };

const createLesson = async (courseId, moduleId, lesson) => {
  const course = await courseModel.findById(courseId);
  if (!course) throw new Error("Course not found");

  const module = course.modules.id(moduleId);
  if (!module) throw new Error("Module not found");

  const newLesson = { ...lesson, _id: uuidv4() };
  module.lessons.push(newLesson);

  await course.save();
  return newLesson;
};

  const updateModule = async (courseId, moduleId, moduleUpdates) => {
    const course = await courseModel.findById(courseId);
    const module = course.modules.id(moduleId);
    Object.assign(module, moduleUpdates);
    await course.save();
    return module;
  };

  const deleteModule = async (courseId, moduleId) => {
    const status = await courseModel.updateOne(
      { _id: courseId },
      { $pull: { modules: { _id: moduleId } } }
    );
    return status;
  };

  return {
    findModulesForCourse,
    createModule,
    createLesson,
    updateModule,
    deleteModule,
  };
}
