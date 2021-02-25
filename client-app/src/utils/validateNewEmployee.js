import _ from "lodash";

export const employeeValidation = (data) => {
  const {
    name,
    surname,
    dateOfBirth,
    jobTitle,
    jobDescription,
    sex,
    skills,
  } = data;
  const errors = {};
  debugger;
  if (_.isEmpty(name)) {
    errors.name = "Name is mandatory field";
  }

  if (_.isEmpty(surname)) {
    errors.surname = "Surname is mandatory field";
  }

  if (_.isEmpty(dateOfBirth)) {
    errors.dateOfBirth = "Birthday is mandatory field";
  } else {
    var dt = new Date(dateOfBirth);
    var currentDt = new Date();
    if (dt >= currentDt) errors.dateOfBirth = "Invalid Birthday";
  }

  if (_.isEmpty(jobTitle)) {
    errors.jobTitle = "Job title is mandatory field";
  }

  if (_.isEmpty(jobDescription)) {
    errors.jobDescription = "Job description is mandatory field";
  }

  if (_.isEmpty(sex)) {
    errors.sex = "Sex is mandatory field";
  }

  if (!skills || skills.length == 0) {
    errors.skills = "Select at least 1 skill for the employee";
  }

  if (_.isEmpty(errors)) {
    return { res: true };
  } else {
    return { errors: errors };
  }
};

export default employeeValidation;
