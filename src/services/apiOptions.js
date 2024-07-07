import supabase from "./supabase";

export async function getSubjects() {
  try {
    let { data, error } = await supabase.from("subjects").select("*");

    if (error) {
      console.error(error);
      throw new Error(`Subjects could not be loaded, 
                            Try again later.`);
    }
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function createSubject(subjectData) {
  try {
    const { error } = await supabase.from("subjects").insert([subjectData]);

    if (error) {
      console.error(error);
      throw new Error(`Subject could not be created. Please try again later.`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function deleteSubject(subject) {
  try {
    const { error } = await supabase
      .from("subjects")
      .delete()
      .eq("subjectName", subject);

    if (error) {
      console.error(error);
      throw new Error(`subject could not be deleted. Please try again later.`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function getHalls() {
  try {
    let { data, error } = await supabase.from("halls").select("*");

    if (error) {
      console.error(error);
      throw new Error(`Halls could not be loaded, 
                            Try again later.`);
    }
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function createHall(hallData) {
  try {
    const { error } = await supabase.from("halls").insert([hallData]);

    if (error) {
      console.error(error);
      throw new Error(`Hall could not be created. Please try again later.`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function deleteHall(hall) {
  try {
    const { error } = await supabase
      .from("halls")
      .delete()
      .eq("hallName", hall);

    if (error) {
      console.error(error);
      throw new Error(`Hall could not be deleted. Please try again later.`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function getGrades() {
  try {
    let { data, error } = await supabase.from("grades").select("*");

    if (error) {
      console.error(error);
      throw new Error(`Grades could not be loaded, 
                            Try again later.`);
    }
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function createGrade(gradeData) {
  try {
    const { error } = await supabase.from("grades").insert([gradeData]);

    if (error) {
      console.error(error);
      throw new Error(`Grade could not be created. Please try again later.`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function deleteGrade(grade) {
  try {
    const { error } = await supabase
      .from("grades")
      .delete()
      .eq("gradeName", grade);

    if (error) {
      console.error(error);
      throw new Error(`Grade could not be deleted. Please try again later.`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}
