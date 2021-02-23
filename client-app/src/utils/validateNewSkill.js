import _ from "lodash";

export const skillValidation = (data) => {
  const { name, description } = data;
  const errors = {};

  if (_.isEmpty(name)) {
    errors.name = "Name is mandatory field";
  }

  if (_.isEmpty(description)) {
    errors.description = "Description is mandatory field";
  }

  if (_.isEmpty(errors)) {
    return { res: true };
  } else {
    return { errors: errors };
  }
};

export default skillValidation;
