import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Form = () => {
  // fetch data
  const { data: leads } = useQuery({
    queryKey: ["Leads"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/getLead");
      return res.data.data;
    },
  });

  //insert data
  const queryClient = useQueryClient();
  const insertLead = useMutation({
    mutationFn: async (newLead) => {
      const res = await axios.post(
        "http://localhost:5000/api/insertLead",
        newLead,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Leads"] });
    },
  });

  // update data
  const [editState, setEditState] = useState({});
  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
  });
  const updateLead = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(
        `http://localhost:5000/api/updateLead/${id}`,
        data,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Leads"] });
    },
  });

  // delete data
  const deleteLead = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `http://localhost:5000/api/deleteLead/${id}`,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Leads"] });
    },
  });

  return (
    <div className="container mx-auto flex flex-col items-center space-y-6 justify-center gap-10 pt-20 px-10 xl:px-20 w-full">
      {/* Leads form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);

          insertLead.mutate({
            name: formData.get("name"),
            phone: formData.get("phone"),
            source: formData.get("source"),
            status: "Interested",
          });
          event.target.reset();
        }}
        className="flex flex-col border rounded-md border-black w-80 p-6 space-y-2"
      >
        <h1 className="text-center text-2xl font-bold">Form</h1>
        <label htmlFor="">Name</label>
        <input
          name="name"
          placeholder="Enter your name"
          className="rounded-3xl py-2 px-4 outline-0 border border-gray-500"
        />
        <label htmlFor="">Phone</label>
        <input
          name="phone"
          placeholder="Enter your phone"
          className="rounded-3xl py-2 px-4 outline-0 border border-gray-500"
        />
        <label htmlFor="">Source</label>
        <select
          name="source"
          className="rounded-3xl py-2 px-4 outline-0 border border-gray-500 cursor-pointer"
        >
          <option className="cursor-pointer">Select source</option>
          <option value="Call" className="cursor-pointer">
            Call
          </option>
          <option value="Whatsapp" className="cursor-pointer">
            Whatsapp
          </option>
          <option value="Field" className="cursor-pointer">
            Field
          </option>
        </select>
        <button
          type="submit"
          className="border rounded-sm mt-8 py-2 w-40 mx-auto bg-black/90 text-white/80 hover:text-white/90 cursor-pointer hover:bg-black/95"
        >
          Submit Lead
        </button>
      </form>
      {/* Details Table */}
      <h1 className="text-2xl font-bold text-center">Table</h1>
      <table className="border rounded-md w-full text-center justify-center mb-40 items-center">
        <thead className="">
          <tr className="grid grid-cols-5 justify-between items-center text-center w-full pl-20 pr-40">
            <th className="border-r border-black px-4 py-2">Name</th>
            <th className="border-r border-black px-4 py-2">Phone</th>
            <th className="border-r border-black px-4 py-2">Source</th>
            <th className="border-r border-black px-4 py-2">Status</th>
            <th className="px-6 py-2">Update/Delete</th>
          </tr>
          <tr className="border-b border-black mt-2" />
        </thead>
        <tbody>
          {leads?.map((lead) => {
            return (
              <>
                <tr
                  className="grid grid-cols-5 justify-between w-full items-center text-center pl-20 pr-40"
                  key={lead.id}
                >
                  <td className="mx-auto">
                    {editRow === lead.id ? (
                      <input
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="p-2 border"
                      />
                    ) : (
                      lead.name
                    )}
                  </td>
                  <td className="mx-auto">
                    {editRow === lead.id ? (
                      <input
                        value={editData.phone}
                        onChange={(e) =>
                          setEditData({ ...editData, phone: e.target.value })
                        }
                        className="p-2 border"
                      />
                    ) : (
                      lead.phone
                    )}
                  </td>
                  <td>
                    <select
                      value={lead.source}
                      onChange={(event) =>
                        updateLead.mutate({
                          id: lead.id,
                          data: { source: event.target.value },
                        })
                      }
                    >
                      <option value="Call">Call</option>
                      <option value="Whatsapp">Whatsapp</option>
                      <option value="Field">Field</option>
                    </select>
                  </td>
                  <td className="-mx-20">
                    <select
                      value={lead.status}
                      onChange={(event) =>
                        updateLead.mutate({
                          id: lead.id,
                          data: { status: event.target.value },
                        })
                      }
                    >
                      <option value="Interested">Interested</option>
                      <option value="Not interested">Not interested</option>
                      <option value="Converted">Converted</option>
                    </select>
                  </td>
                  <td className="p-2 flex mx-auto gap-2">
                    {editRow === lead.id ? (
                      <>
                        <button
                          onClick={() => {
                            updateLead.mutate({
                              id: lead.id,
                              data: editData,
                            });

                            setEditRow(null);
                          }}
                          className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditRow(null);
                          }}
                          className="bg-gray-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditRow(lead.id);
                            setEditData({
                              name: lead.name,
                              phone: lead.phone,
                            });
                          }}
                          className="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-yellow-600"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => deleteLead.mutate(lead.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr className="border-b border-black mt-2" />
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Form;
