import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "sonner";
import {
  Users,
  BarChart3,
  LogOut,
  Plus,
  Trash2,
  LayoutDashboard,
  User,
  Mail,
  Link2,
  Phone,
  CheckCircle2,
} from "lucide-react";

function Dashboard() {
  const { user, logout } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("leads");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    source: "website",
    status: "new",
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await api.get("/leads/getAllLead");
      setLeads(response.data);
    } catch (error) {
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      await api.post("/leads/createLead", newLead);
      toast.success("Lead added successfully");
      setShowAddModal(false);
      setNewLead({ name: "", email: "", source: "website", status: "new" });
      fetchLeads();
    } catch (error) {
      toast.error("Failed to add lead");
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/leads/updateLead/${id}`, { status: newStatus });
      toast.success("Status updated");
      fetchLeads();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await api.delete(`/leads/deleteLead/${id}`);
        toast.success("Lead deleted");
        fetchLeads();
      } catch (error) {
        toast.error("Failed to delete lead");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "contacted":
        return "bg-yellow-100 text-yellow-700";
      case "converted":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  return (
    <div className="min-h-screen flex bg-brand-bg">
      <div className="w-64 fixed h-full bg-brand-primary">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="text-white size-6" />
            </div>
            <h1 className="text-white font-bold text-lg">CRM Manager</h1>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                activeTab === "leads"
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Users className="size-5" />
              <span>All Leads</span>
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                activeTab === "stats"
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <BarChart3 className="size-5" />
              <span>Statistics</span>
            </button>
          </nav>

          <div className="absolute bottom-6 left-0 right-0 px-6">
            <div className="border-t border-white/20 pt-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{user?.name}</p>
                  <p className="text-white/60 text-xs">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition"
              >
                <LogOut className="size-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-64 flex-1">
        <header className="bg-white shadow-sm px-8 py-4">
          <h1 className="text-2xl font-bold text-brand-primary">
            {activeTab === "leads" ? "Lead Management" : "Statistics Overview"}
          </h1>
          <p className="text-gray-500 text-sm">Welcome back, {user?.name}</p>
        </header>

        <main className="p-8">
          {activeTab === "leads" && (
            <div>
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-5 py-2.5 text-white rounded-lg font-medium flex items-center gap-2 bg-brand-accent hover:opacity-90"
                >
                  <Plus className="size-5" />
                  Add New Lead
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-brand-primary">
                    <tr>
                      <th className="text-left p-4 text-white font-semibold">
                        Name
                      </th>
                      <th className="text-left p-4 text-white font-semibold">
                        Email
                      </th>
                      <th className="text-left p-4 text-white font-semibold">
                        Source
                      </th>
                      <th className="text-left p-4 text-white font-semibold">
                        Status
                      </th>
                      <th className="text-left p-4 text-white font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center p-8 text-gray-500"
                        >
                          Loading leads...
                        </td>
                      </tr>
                    ) : leads.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center p-8 text-gray-500"
                        >
                          No leads yet. Create your first lead!
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead) => (
                        <tr
                          key={lead._id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-4 font-medium">{lead.name}</td>
                          <td className="p-4 text-gray-600">{lead.email}</td>
                          <td className="p-4">
                            <span className="px-2 py-1 bg-gray-100 rounded text-sm capitalize">
                              {lead.source}
                            </span>
                          </td>
                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleUpdateStatus(lead._id, e.target.value)
                              }
                              className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${getStatusColor(
                                lead.status
                              )}`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="converted">Converted</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => handleDeleteLead(lead._id)}
                              className="text-red-500 hover:text-red-700 transition"
                            >
                              <Trash2 className="size-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Leads</p>
                    <p className="text-3xl font-bold text-brand-primary">
                      {stats.total}
                    </p>
                  </div>
                  <Users className="size-8 text-brand-primary opacity-20" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">New</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {stats.new}
                    </p>
                  </div>
                  <Plus className="size-8 text-blue-600 opacity-20" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Contacted</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {stats.contacted}
                    </p>
                  </div>
                  <Phone className="size-8 text-yellow-600 opacity-20" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Converted</p>
                    <p className="text-3xl font-bold text-green-600">
                      {stats.converted}
                    </p>
                  </div>
                  <CheckCircle2 className="size-8 text-green-600 opacity-20" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-brand-primary">
                Add New Lead
              </h2>
            </div>
            <form onSubmit={handleAddLead}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 size-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      className="w-full border rounded-lg p-2 pl-10 focus:ring-2 focus:ring-brand-accent outline-none transition"
                      value={newLead.name}
                      onChange={(e) =>
                        setNewLead({ ...newLead, name: e.target.value })
                      }
                      placeholder="Enter name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 size-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      className="w-full border rounded-lg p-2 pl-10 focus:ring-2 focus:ring-brand-accent outline-none transition"
                      value={newLead.email}
                      onChange={(e) =>
                        setNewLead({ ...newLead, email: e.target.value })
                      }
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Source
                  </label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-2.5 size-4 text-gray-400" />
                    <select
                      className="w-full border rounded-lg p-2 pl-10 focus:ring-2 focus:ring-brand-accent outline-none transition appearance-none"
                      value={newLead.source}
                      onChange={(e) =>
                        setNewLead({ ...newLead, source: e.target.value })
                      }
                    >
                      <option value="website">Website</option>
                      <option value="referral">Referral</option>
                      <option value="social">Social Media</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded-lg bg-brand-accent hover:opacity-90 transition"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
