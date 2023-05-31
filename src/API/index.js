import { createClient } from "@supabase/supabase-js";

// CLIENT RELATED FUNCTIONS
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

// AUTH RELATED FUCNTIONS
export const signup = async (email, password) => {
  const response = await supabase.auth.signUp({
    email,
    password,
  });
  return response;
};

export const login = async (email, password) => {
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
};

export const logout = async () => {
  const response = await supabase.auth.signOut();
  return response;
};

// TASK RELATED FUNCTIONS

export const getTasks = async (select = "*", order = "id", asc = false) => {
  const response = await supabase
    .from("Tasks")
    .select(select)
    .order(order, { ascending: asc });
    console.log(response.data)
  return response.data;
};

export const newTask = async (task) => {
  const response = await supabase.from("Tasks").insert(task);
  return response;
};

export const updateTask = async (task) => {
  const response = await supabase
    .from("Tasks")
    .update({
      title: task.title,
      content: task.content,
      ini: task.ini,
      end: task.end
    })
    .eq("id", task.id);

  return response;
};

export const deleteTask = async (taskId) => {
  const response = await supabase.from("Tasks").delete().eq("id", taskId);
  return response;
};
