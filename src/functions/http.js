const axios = require('axios');

// *************************
//
//  Class Time related functions.
//
// *************************

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

export const updateClassTime = async (id, postData) => {
  try {
    const { status, data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/classTime/${id}`,
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

export const deleteClassTime = async (id) => {
  try {
    const { status, data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/classTime/${id}`
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


// *************************
//
//  Class Schedule related functions.
//
// *************************

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

export const updateClassSchedule = async (id, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/classSchedule/${id}`,
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

export const deleteClassSchedule = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/classSchedule/${id}`
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


// *************************
//
//  Section related functions.
//
// *************************

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

// *************************
//
//  semester related functions.
//
// *************************

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

export const updateSemester = async (id, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/semester/${id}`,
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

export const deleteSemester = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/semester/${id}`
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

// *************************
//
//  Room related functions.
//
// *************************

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

export const updateRoom = async (id, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/room/${id}`,
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

export const deleteRoom = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/room/${id}`
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

// *************************
//
//  Migration related functions.
//
// *************************

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

// *************************
//
//  Faculty related functions.
//
// *************************

export const createFaculty = async (data) => {
  try {
    console.log(process.env)
    console.log('url'+   `${process.env.REACT_APP_BACKEND_URL}/faculty`);
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/faculty`,
      data
    );
    console.log("status: "+ response.status)
    console.log("data: "+ response.data)

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

export const updateFaculty = async (id, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/faculty/${id}`,
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

export const deleteFaculty = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/faculty/${id}`
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


// *************************
// 
//  Course related functions.
// 
// *************************

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

export const updateCourse = async (id, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/course/${id}`,
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

export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/course/${id}`
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
