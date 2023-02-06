export const validate = values => {
   const errors = {};
   if (!values.password) {
     errors.password = 'Required';
   } else if (values.password?.length < 6) {
     errors.password = 'must be longer than 6 characters';
   }
 
   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   } 
   return errors;
};

export const categoryValidate = values => {
  const errors = {};
  if(!values.name) {
    errors.name = 'Required';
  }  
  if(!values.img) {
    errors.img = 'Required';
  }  
  return errors
}

export const musicValidate = values => {
  const errors = {}
  if(!values.name) {
    errors.name = 'Required';
  }
  if(!values.description) {
    errors.description = 'Required';
  }
  if(!values.categoryId) {
    errors.categoryId = 'Required';
  }
  if(!values.keywords) {
    errors.keywords = 'Required';
  }
  if(!values.audio) {
    errors.audio = 'Required';
  }
  if(!values.img) {
    errors.img = 'Required';
  }
  return errors
}