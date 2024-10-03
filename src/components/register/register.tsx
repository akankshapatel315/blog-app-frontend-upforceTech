import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const initialValues: SignUpFormValues = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(50, 'Must be 50 characters or less')
      .required('First Name is required'),
    lastName: Yup.string()
      .max(50, 'Must be 50 characters or less')
      .required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ""], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = (values: SignUpFormValues) => {
    // Handle form submission
    console.log('Form data:', values);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for an account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="firstName" className="text-left block text-sm font-medium leading-6 text-gray-900">First Name</label>
                  <div className="mt-2">
                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="firstName" render={msg => <div className="text-left text-red-600 text-sm">{msg}</div>} />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="text-left block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                  <div className="mt-2">
                    <Field
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="lastName" render={msg => <div className="text-left text-red-600 text-sm">{msg}</div>} />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="text-left block text-sm font-medium leading-6 text-gray-900">Email address</label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="email" render={msg => <div className="text-left text-red-600 text-sm">{msg}</div>} />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="text-left block text-sm font-medium leading-6 text-gray-900">Password</label>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="password" render={msg => <div className="text-left text-red-600 text-sm">{msg}</div>} />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="text-left block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                  <div className="mt-2">
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="confirmPassword" render={msg => <div className="text-left text-red-600 text-sm">{msg}</div>} />
                  </div>
                </div>

                <div>
                  <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Sign Up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;
