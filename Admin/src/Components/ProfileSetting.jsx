import React, { useEffect, useState } from 'react';
import { useGetAdmin, useUpdateAdmin } from '../hooks/useAdminStats';

function ProfileSetting() {
    const { data: admin, isLoading } = useGetAdmin();
    const { mutate: updateAdmin, isPending: isUpdating } = useUpdateAdmin();

    // 1. Create local state for the form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: ""
    });

    // 2. Sync local state when API data arrives
    useEffect(() => {
        if (admin) {
            setFormData({
                name: admin.name || "",
                email: admin.email || "",
                role: admin.role || ""
            });
        }
    }, [admin]);

    // 3. Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send only the data you want to update (usually just name)
        updateAdmin({ name: formData.name });
    };

    if (isLoading) return <div className="p-10 text-center">Loading Profile...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">Profile Settings</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    {/* Email Field (Disabled) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            disabled
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
                    </div>

                    {/* Role Field (Disabled) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            disabled
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end space-x-4 border-t pt-6">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...admin })}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProfileSetting;