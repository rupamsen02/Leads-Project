import { supabase } from "../supabaseConfiguration.js";

// controllers

//Post Method for inserting the data
export const insertLead = async (req, res) => {
  try {
    const { name, phone, source, status } = req.body;
    const { data, error } = await supabase
      .from("Leads")
      .insert([{ name, phone, source, status }])
      .select();
    res.status(201).json({ message: "Inserted successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

//Get Method for retrieving the data
export const getLead = async (req, res) => {
  try {
    const { data, error } = await supabase.from("Leads").select("*");
    res.status(201).json({ message: "Data from Leads", data });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

//Update method for updating the data
export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json("Id is required");
    }
    const { name, phone, source, status } = req.body;
    const { data, error } = await supabase
      .from("Leads")
      .update({ name, phone, source, status })
      .eq("id", id)
      .select();

    if (error) throw error;
    res.status(201).json({ message: "Updated successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

//Delete method for deleting the data
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json("Id is required");
    }
    const { data, error } = await supabase
      .from("Leads")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;
    res.status(201).json({ message: "Deleted successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};
