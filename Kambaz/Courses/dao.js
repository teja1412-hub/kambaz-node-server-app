import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db) {
  const findAllCourses = () => {
    return model.find({}, { name: 1, title: 1, description: 1, code: 1, semester: 1, image: 1 });
  };

  const createCourse = (course) => {
    const newCourse = { ...course, _id: uuidv4(), modules: [] };
    return model.create(newCourse);
  }
  const deleteCourse = (courseId) => {
    return model.deleteOne({ _id: courseId });
  }
  const updateCourse = (courseId, courseUpdates) => {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  }

  return {
    findAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
