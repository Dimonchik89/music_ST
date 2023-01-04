export const validate = values => {
   const errors = {};
   console.log("validate", values);
   if (!values.password) {
     errors.password = 'Required';
     console.log("errors", errors);
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