'use client';

import { useAuth } from "@/context/usersContext";
import { ModifyFormInputs, modifySchema } from "@/validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function Settings() {  
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState({
        name: false,
        email: false,
        phone: false,
        address: false,
    });
    const { user } = useAuth()

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ModifyFormInputs>({
        resolver: zodResolver(modifySchema),
        defaultValues: {
            name: user?.name || "",
            address: user?.address || "",
            phone: user?.phone || "",
            email: user?.email || "",
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || "",
                address: user.address || "",
                phone: user.phone || "",
                email: user.email || "",
            });
        }
    }, [user, reset]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const onSubmit = (data: ModifyFormInputs) => {
        console.log("Form Data:", data);
        setSuccess("Settings updated successfully!");
        setIsEditing({
            name: false,
            address: false,
            phone: false,
            email: false,
        });
    };

    const toggleEdit = (field: keyof typeof isEditing) => {
        setIsEditing((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    }

    const cancelEdit = (field: keyof typeof isEditing) => {
        setIsEditing((prev) => ({
            ...prev,
            [field]: false,
        }));
        setValue(field, user ? (user[field] as string) : "");
    }

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row">
            <div className="flex-1 flex bg-gradient-to-br from-white to-cyan-50 flex-col items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md bg-transparent rounded-lg shadow-md p-8 relative">
                    <h1 className="text-2xl md:text-3xl font-light text-center text-gray-800 mb-6">
                        Profile Settings
                    </h1>

                    {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                            {success}
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="relative">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Full Name
                            </label>
                            <input
                                {...register('name')}
                                type="text"
                                id="name"
                                className={`w-full px-3 py-2 font-medium border ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                                    isEditing.name ? 'bg-white' : 'bg-gray-100'
                                }`}
                                placeholder="John Doe"
                                readOnly={!isEditing.name}
                            />
                            <button
                                type="button"
                                onClick={() => toggleEdit('name')}
                                className="absolute top-9 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label={isEditing.name ? "Save name" : "Edit name"}
                            >
                                {isEditing.name ? <FaSave /> : <FaEdit />}
                            </button>
                            {isEditing.name && (
                                <button
                                    type="button"
                                    onClick={() => cancelEdit('name')}
                                    className="absolute top-9 right-8 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    aria-label="Cancel edit name"
                                >
                                    <FaTimes />
                                </button>
                            )}
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Address
                            </label>
                            <input
                                {...register('address')}
                                type="text"
                                id="address"
                                className={`w-full px-3 py-2 font-medium border ${
                                    errors.address ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                                    isEditing.address ? 'bg-white' : 'bg-gray-100'
                                }`}
                                placeholder="1234 Main St"
                                readOnly={!isEditing.address}
                            />
                            <button
                                type="button"
                                onClick={() => toggleEdit('address')}
                                className="absolute top-9 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label={isEditing.address ? "Save address" : "Edit address"}
                            >
                                {isEditing.address ? <FaSave /> : <FaEdit />}
                            </button>
                            {isEditing.address && (
                                <button
                                    type="button"
                                    onClick={() => cancelEdit('address')}
                                    className="absolute top-9 right-8 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    aria-label="Cancel edit address"
                                >
                                    <FaTimes />
                                </button>
                            )}
                            {errors.address && (
                                <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                            )}
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Phone
                            </label>
                            <input
                                {...register('phone')}
                                type="tel"
                                id="phone"
                                className={`w-full px-3 py-2 border font-medium ${
                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                                    isEditing.phone ? 'bg-white' : 'bg-gray-100'
                                }`}
                                placeholder="(555) 123-4567"
                                readOnly={!isEditing.phone}
                            />
                            <button
                                type="button"
                                onClick={() => toggleEdit('phone')}
                                className="absolute top-9 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label={isEditing.phone ? "Save phone" : "Edit phone"}
                            >
                                {isEditing.phone ? <FaSave /> : <FaEdit />}
                            </button>
                            {isEditing.phone && (
                                <button
                                    type="button"
                                    onClick={() => cancelEdit('phone')}
                                    className="absolute top-9 right-8 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    aria-label="Cancel edit phone"
                                >
                                    <FaTimes />
                                </button>
                            )}
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                            )}
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email Address
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                id="email"
                                className={`w-full px-3 py-2 border font-medium ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                                    isEditing.email ? 'bg-white' : 'bg-gray-100'
                                }`}
                                placeholder="you@example.com"
                                readOnly={!isEditing.email}
                            />
                            <button
                                type="button"
                                onClick={() => toggleEdit('email')}
                                className="absolute top-9 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label={isEditing.email ? "Save email" : "Edit email"}
                            >
                                {isEditing.email ? <FaSave /> : <FaEdit />}
                            </button>
                            {isEditing.email && (
                                <button
                                    type="button"
                                    onClick={() => cancelEdit('email')}
                                    className="absolute top-9 right-8 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    aria-label="Cancel edit email"
                                >
                                    <FaTimes />
                                </button>
                            )}
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="p-4">
                            <button
                                type="submit"
                                className="w-full bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors duration-200"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
