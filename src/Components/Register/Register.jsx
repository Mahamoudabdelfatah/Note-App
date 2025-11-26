import { useFormik } from 'formik'
import * as Yup from "yup";
import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import img1 from "../../assets/signup-image.jpg"
import 'font-awesome/css/font-awesome.min.css';
import { FaSpinner } from "react-icons/fa";


function Register() {

  let navigate = useNavigate()
  const [apiError, setapiError] = useState("")
  const [isLoading, setisLoading] = useState(false)

  function handleRegister(formValues) {
    setisLoading(true)
    axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, formValues)
      .then((response) => {
        console.log(response.msg);
        if (response.data.msg === "done") {
          navigate("/")
          setisLoading(false)
        }

      })
      .catch((error) => {
        setapiError(error?.response?.data?.msg)
        setisLoading(false)
      })
    console.log(formValues);

  }


  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name Minlength is 3").max(10, "Name Maxlength is 10").required("Name is Required"),
    email: Yup.string().email("Email is Invalid").required("Email is Required"),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password Is Invaild").required("Password Is Required"),
    age: Yup.number().typeError("Age Must Be a number").integer("Age Must be an integer").min(10, "at least 10").max(120, "at most 120").required("Age is Required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Phone Must be vaild Egption Number").required("Phone is Require"),
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  })


  return (
    <>
      <div className='py-5 flex flex-col items-center justify-center'>
        {/* <div className='w-1/2 py-5 '><img src={img1} className='w-100' /></div> */}
        {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
        </div> : null}


        <h2 className='text-3xl font-bold mb-6 text-blue-600'>Register Now</h2>

        <form className=" mx-auto" onSubmit={formik.handleSubmit} >
          {/* Name */}
          <div className="relative z-0 w-full mb-5 group">
            <input id="name" type="text" name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className="block py-2.5 px-0 w-100 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
          </div>
          {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.name}
          </div> : null}


          {/* Email */}
          <div className="relative z-0 w-full mb-5 group">
            <input id="email" type="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className="block py-2.5 px-0 w-100 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
          </div>
          {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div> : null}

          {/* Password */}
          <div className="relative z-0 w-full mb-5 group">
            <input id="password" type="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className="block py-2.5 px-0 w-100 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
          </div>
          {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
          </div> : null}


          {/* Age */}
          <div className="relative z-0 w-full mb-5 group">
            <input id="age" type="text" name="age" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.age} className="block py-2.5 px-0 w-100 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="age" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Age</label>
          </div>
          {formik.errors.age && formik.touched.age ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.age}
          </div> : null}

          {/* Phone */}
          <div className="relative z-0 w-full mb-5 group">
            <input id="phone" type="tel" name="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className="block py-2.5 px-0 w-100 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
          </div>
          {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.phone}
          </div> : null}

          <div className='flex items-center justify-start'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {isLoading ? <FaSpinner className="animate-spin mx-auto" /> : "Submit"}


            </button>
            <p className='pl-4'>have account yet ? <span className='font-semibold'><Link to={'/login'}>Login</Link></span></p>
          </div>




        </form>





      </div >
    </>
  )
}

export default Register
