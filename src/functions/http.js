import axios from 'axios';

// *************************
//
//  Section related functions.
//
// *************************

export const createSection = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/section`,
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

export const getSection = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/section`
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

export const updateSection = async (id, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/section/${id}`,
      data
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const deleteSection = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/section/${id}`
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const importSections = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/section/import`,
      data
    );

    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

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

export const importRooms = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/room/import`,
      data
    );

    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// *************************
//
//  Migration related functions.
//
// *************************

export const migrate = async (OLD_YEAR, OLD_SEMESTER, YEAR, SEMESTER, START_DATE, END_DATE) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/section/migrate`,
      {
        oldYear: OLD_YEAR,
        oldSemester: OLD_SEMESTER,
        year: YEAR,
        semester: SEMESTER,
        startDate: START_DATE,
        endDate: END_DATE,
      }
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

export const importFaculty = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/faculty/import`,
      data
    );

    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}


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

export const importCourses = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/course/import`,
      data
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
