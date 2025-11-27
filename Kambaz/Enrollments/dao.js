import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  const findCoursesForUser = async (userId) => {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }

  const findUsersForCourse = async (courseId) => {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  };

  const enrollUserInCourse = (userId, courseId) => {
    return model.create({
      _id: `${userId}-${courseId}`,
      user: userId,
      course: courseId,
    });
  };
  
  const unenrollUserFromCourse = (userId, courseId) => {
    return model.deleteOne({ user: userId, course: courseId });
  };

  const unenrollAllUsersFromCourse = (courseId) => {
    return model.deleteMany({ course: courseId });
  };

  const findAllEnrollments = () => {
    return model.find();
  };

  return { 
    findCoursesForUser, 
    enrollUserInCourse, 
    findUsersForCourse,
    unenrollUserFromCourse, 
    unenrollAllUsersFromCourse, 
    findAllEnrollments };
}
