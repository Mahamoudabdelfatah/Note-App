import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import * as Yup from "yup";



function Home() {

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false)

  async function addNote(formValues) {
    await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`, formValues, {
      headers: {
        token: `3b8ny__${localStorage.getItem("userToken")}`
      }
    })
      .then((response) => {
        console.log(response);

      })
      .catch((error) => {
        console.log(error);

      })
    console.log(formValues);
    // handleClose()

  }


  let validationSchema = Yup.object().shape({
    title: Yup.string().min(3, "Title Minlength is 3").max(20, "Title Maxlength is 20").required("Title is Required"),
    content: Yup.string().min(3, "Content Minlength is 3").max(100, "Content Maxlength is 100").required("Content is Required"),
  })

  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",

    },
    validationSchema: validationSchema,
    onSubmit: addNote,
  })



  return (
    <>
      <button
        data-modal-target="static-modal"
        data-modal-toggle="static-modal"
        className="text-white ml-auto bg-blue-600 hover:bg-blue-700 transition rounded-xl px-4 py-3 flex items-center gap-2 cursor-pointer"
      >
        <FaPlus />
        Add Note
      </button>

      {/* Main Modal */}
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40  "
      >
        <div className="relative w-full max-w-2xl">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New Note
              </h3>
              <button
                type="button"
                data-modal-hide="static-modal"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-4 md:p-5 space-y-4">

              <form >
                {/* Note Title */}
                <div>
                  <label htmlFor='title' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Note Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Note"
                    name='title'
                    id='title'
                    onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>

                {/* Note Content */}
                <div>
                  <label htmlFor='content' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Note Content
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Enter Note Content"
                    name='content'
                    id='content'
                    onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.content}
                    style={{ resize: "none" }}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  ></textarea>
                </div>
              </form>

            </div>

            {/* Footer */}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={formik.handleSubmit}
                // data-modal-hide="static-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Note
              </button>
              <button
                data-modal-hide="static-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      </div>



      <h2 className='text-3xl mb-4'>Notes</h2>
      <div className=''></div>

    </>
  )
}

export default Home
