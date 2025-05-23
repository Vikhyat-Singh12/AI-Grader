import {create} from 'zustand'
import axios from '../lib/axios'
import toast from 'react-hot-toast';


export const useStudentStore = create((set, get) => ({
  assignments: [],
  submittedAssignments: [],
  tests: [],
  submittedTests: [],
  isSubmitting: false,
  assignedTeacher: [],

  submitAssignment: async (data) => {
    set({ isSubmitting: true });
    try {
      await axios.post("/student-dashboard/submit-assignment", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(
        "Assignment submitted successfully and AI Graded Successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error in submitting Answer"
      );
      console.log("Error in submitAssignment", error);
    } finally {
      set({ isSubmitting: false });
    }
  },

  submitTest: async (data) => {
    set({ isSubmitting: true });
    try {
      await axios.post("/student-dashboard/submit-test", data); // Remove headers for multipart
      toast.success("Test submitted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error in submitting Answer"
      );
      console.log("Error in submitTest", error);
    } finally {
      set({ isSubmitting: false });
    }
  },

  getAllAssgnmentAndSubmittedAssignment: async ({ subject }) => {
    try {
      const response = await axios.get("/student-dashboard/assignments", {
        params: { subject },
      });
      set({
        assignments: response.data.assignments || [],
        submittedAssignments: response.data.submittedAssignments || [],
      });
    } catch (error) {
      console.log("Error in getAllassgnmentandSubmittedAssignment", error);
    }
  },

  getAllTestAndSubmittedTest: async ({ subject }) => {
    try {
      const response = await axios.get("/student-dashboard/tests", {
        params: { subject },
      });
      set({
        tests: response.data.tests || [],
        submittedTests: response.data.submittedTests || [],
      });
    } catch (error) {
      console.log("Error in getAllassgnmentandSubmittedAssignment", error);
    }
  },

  getAssignedTeacher: async ({ subject }) => {
    try {
      const response = await axios.get("/student-dashboard/assignedTeacher", {
        params: { subject },
      });
      set({ assignedTeacher: response.data.assignedTeacher || [] });
    } catch (error) {
      console.log("Error in getAssignedTeacher", error);
    }
  },
}));