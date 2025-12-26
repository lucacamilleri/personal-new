import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactErrors {
  [key: string]: string;
}

interface ContactState {
  formData: ContactFormData;
  errors: ContactErrors;
  submitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
}

interface SubmitResponse {
  success: boolean;
  message: string;
}

// Async thunk for submitting contact form
export const submitContactForm = createAsyncThunk<SubmitResponse, ContactFormData>(
  'contact/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      // Simulate API call
      return new Promise<SubmitResponse>((resolve, reject) => {
        setTimeout(() => {
          // Basic validation
          if (!formData.name || !formData.email || !formData.message) {
            reject(new Error('All fields are required'));
          }
          
          // Simulate successful submission
          console.log('Form submitted:', formData);
          resolve({ success: true, message: 'Message sent successfully!' });
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: ContactState = {
  formData: {
    name: '',
    email: '',
    subject: '',
    message: '',
  },
  errors: {},
  submitting: false,
  submitSuccess: false,
  submitError: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field as keyof ContactFormData] = value;
      // Clear error for this field when user starts typing
      if (state.errors[field]) {
        delete state.errors[field];
      }
    },
    setFieldError: (state, action) => {
      const { field, error } = action.payload;
      state.errors[field] = error;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    resetForm: (state) => {
      state.formData = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };
      state.errors = {};
      state.submitSuccess = false;
      state.submitError = null;
    },
    clearSubmitStatus: (state) => {
      state.submitSuccess = false;
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.submitting = true;
        state.submitSuccess = false;
        state.submitError = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.submitting = false;
        state.submitSuccess = true;
        state.submitError = null;
        // Reset form on success
        state.formData = {
          name: '',
          email: '',
          subject: '',
          message: '',
        };
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.submitting = false;
        state.submitSuccess = false;
        state.submitError = action.error.message || 'Failed to send message. Please try again.';
      });
  },
});

export const {
  updateFormField,
  setFieldError,
  clearErrors,
  resetForm,
  clearSubmitStatus,
} = contactSlice.actions;

export default contactSlice.reducer;
