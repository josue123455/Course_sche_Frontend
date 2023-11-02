const axios = require('axios');

export const createClassTime = async (postData) => {
  try {
    const { status, data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/classTime`,
      postData
    );
    if (status === 200) {
      return data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getClassTime = async () => {
  try {
    const { status, data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/classTime`
    );
    if (status === 200) {
      return data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createClassSchedule = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/classSchedule`,
      data
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getClassSchedule = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/classSchedule`
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createSectionMode = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/sectionMode`,
      data
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getSectionMode = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/sectionMode`
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createSemester = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/semester`,
      data
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getSemester = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/semester`
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createRoom = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/room`,
      data
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getRoom = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/room`
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const migrate = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/section/migrate`,
      data
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createFaculty = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/faculty`,
      data
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getFaculty = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/faculty`
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createCourse = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/course`,
      data
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getCourse = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/course`
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
