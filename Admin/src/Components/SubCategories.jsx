
import React, { useState } from 'react';
import { TbEdit } from "react-icons/tb";
import { LiaTrashSolid } from "react-icons/lia";
import { HiOutlineExclamation, HiOutlineTrash, HiOutlineX } from 'react-icons/hi';

import { useDeleteInfoSubCategory, useDeleteSubCategory, useSubCatList, useToggleShowOnHome, useToggleSubCatStatus, useUpdateSubCategory } from '../hooks/useSubCategories';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { getPaginationRange } from '../utils/getPaginationRange';
import { useTranslation } from 'react-i18next';

function SubCategories({ setCurrentPage }) {

    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useSubCatList({ search: debouncedSearch, page });

    const subCatList = data?.data;
    const totalPages = data?.totalPages;
    const totalCount = data?.count;

    const { mutate: togglSubCatStatus, isPending, variables } = useToggleSubCatStatus();
    const { mutate: updatSubCategory, isPending: isUpdating } = useUpdateSubCategory();
    const { mutate: deleteSubCategory, isPending: isDeleting } = useDeleteSubCategory();
    const { mutate: toggleShowOnHome } = useToggleShowOnHome();

    // Debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    // edit popup
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        subCatName: "",
        description: "",
        allowedAttributes: []
    });

    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    // delete info
    const [selectedSubCatId, setSelectedSubCatId] = useState(null);

    // delete popup
    const [isDeletedOpen, setIsDeletedOpen] = useState(false);

    const { data: deleteInfo, isLoading: isInfoLoading } = useDeleteInfoSubCategory(selectedSubCatId);

    const handleToggleStatus = (id) => {
        togglSubCatStatus(id);
    };

    // --------Edit---------
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateClick = (subCategory) => {

        const attributesArray = subCategory.allowedAttributes
            ? subCategory.allowedAttributes.map(attr => attr.name).join(" , ")
            : "";

        setFormData({
            subCatName: subCategory.subCatName,
            description: subCategory.description,
            allowedAttributes: subCategory.allowedAttributes || []
        });

        setSelectedSubCategory(subCategory);

        setIsEditOpen(true);
    };

    const handleUpdate = () => {

        const data = new FormData();
        data.append("subCatName", formData.subCatName);
        data.append("description", formData.description);

        data.append("allowedAttributes", JSON.stringify(formData.allowedAttributes));

        if (file) {
            data.append("subCatImage", file);
        }

        updatSubCategory({ subCatId: selectedSubCategory._id, formData: data }, {
            onSuccess: (res) => {
                toast.success(res.message || "Sub Category updated");

                setFormData({
                    subCatName: "",
                    description: "",
                    allowedAttributes: ""
                });

                setFile(null);
                setIsEditOpen(false);
                setCurrentPage("sub-categories");
            },
            onError: (err) => {
                toast.error(err.response?.data?.message || "Failed to update");
            }
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // --------Delete---------
    const handleDeleteClick = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setSelectedSubCatId(subCategory._id)
        setIsDeletedOpen(true);
    };

    const handleDelete = () => {
        deleteSubCategory({ subCatId: selectedSubCategory._id }, {
            onSuccess: (res) => {
                toast.success(res.message || "Sub Category Deleted Successfully");
                setIsDeletedOpen(false);
            },
            onError: (err) => {
                toast.error(err.response?.data?.message || "Failed to deleted");
            }
        });
    };

    if (isLoading) return <p className="p-10 text-center">{t('subCategories.loading')}</p>;
    if (isError) return <p className="p-10 text-center text-red-500">{t('subCategories.error')}</p>;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl md:rounded-3xl border border-pink-50 dark:border-slate-800 shadow-sm overflow-hidden">

            {/* Heading with Search & Add Button */}
            <div className="p-4 md:p-6 border-b border-pink-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                {/* Title & Badge */}
                <div>
                    <div className='flex items-center gap-2.5'>
                        <h2 className="text-md md:text-lg font-bold text-slate-800 dark:text-white shrink-0">
                            {t('subCategories.title')}
                        </h2>
                        <span className="bg-pink-100 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400 px-2.5 py-0.5 md:py-1 rounded-full text-[11px] md:text-xs font-bold">
                            {t('subCategories.total')} : {totalCount || 0}
                        </span>
                    </div>
                    <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {t('subCategories.description')}
                    </p>
                </div>

                {/* Search & Button Group */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t('subCategories.placeholder')}
                        className="w-full sm:w-64 text-sm px-4 py-2 md:py-2.5 rounded-xl border border-pink-50 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-xs placeholder:text-xs md:placeholder:text-[13px] dark:text-white"
                    />
                    <button
                        onClick={() => setCurrentPage('add-sub-category')}
                        className="w-full sm:w-auto bg-linear-to-br from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-pink-200 dark:hover:shadow-none transition-all active:scale-95 shrink-0 cursor-pointer"
                    >
                        {t('subCategories.btnAdd')}
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 whitespace-nowrap min-w-50">{t('subCategories.colSubCat')}</th>
                            <th className="px-6 py-4 whitespace-nowrap min-w-50">{t('subCategories.colCat')}</th>
                            <th className="px-6 py-4 whitespace-nowrap">{t('subCategories.colDept')}</th>
                            <th className="px-6 py-4 whitespace-nowrap">{t('subCategories.colItemsCount')}</th>
                            <th className="px-6 py-4 whitespace-nowrap">{t('subCategories.colShowHome')}</th>
                            <th className="px-6 py-4 whitespace-nowrap">{t('subCategories.colStatus')}</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">{t('subCategories.colAction')}</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-pink-50 dark:divide-slate-800">
                        {subCatList.length > 0 ? subCatList?.map((subCategory, index) => {

                            const isThisRowLoading = isPending && variables === subCategory._id;
                            const showOnHomeCount = subCatList.filter(s => s.showOnHome).length;

                            return (
                                <tr
                                    key={index}
                                    className="hover:bg-pink-50/30 dark:hover:bg-slate-800/30 transition-colors group">

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={subCategory.subCatImage}
                                                alt={subCategory.subCatName}
                                                className="w-10 h-10 rounded-lg object-cover border border-pink-100 shadow-sm" />
                                            <span className="text-[13px] md:text-sm font-semibold text-slate-700 dark:text-slate-200">
                                                {subCategory.subCatName}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-500 italic">
                                        {subCategory.catName || "---"}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {subCategory.department || "---"}
                                    </td>

                                    <td className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                                        {subCategory.productCount || 0} <span className="text-[10px] font-normal text-slate-400 ml-1">{t('subCategories.itemsLabel')}</span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleShowOnHome(subCategory._id)}
                                            disabled={isPending || (!subCategory.showOnHome && showOnHomeCount >= 7)}
                                            title={!subCategory.showOnHome && showOnHomeCount >= 7 ? "Remove one first" : ""}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all
                                    ${subCategory.showOnHome
                                                    ? 'bg-pink-100 text-pink-600'
                                                    : showOnHomeCount >= 7
                                                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                        : 'bg-gray-100 text-gray-500 hover:bg-pink-50 hover:text-pink-500'
                                                }`}>
                                            {subCategory.showOnHome ? t('subCategories.onHome') : t('subCategories.addToHome')}
                                        </button>
                                    </td>

                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => !isPending && handleToggleStatus(subCategory._id)}
                                            disabled={isPending}
                                            className={`w-16 inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-all
                                    ${isThisRowLoading ? 'opacity-50' : 'cursor-pointer'}
                                    ${subCategory.isActive
                                                    ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100'
                                                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                                                }`}>
                                            {isThisRowLoading ? (
                                                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                subCategory.isActive ? t('subCategories.active') : t('subCategories.inactive')
                                            )}
                                        </button>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center items-center gap-2">
                                            <button
                                                onClick={() => handleUpdateClick(subCategory)}
                                                className="p-2 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white transition-all active:scale-90">
                                                <TbEdit className="text-lg md:text-xl" />
                                            </button>

                                            <button
                                                onClick={() => handleDeleteClick(subCategory)}
                                                className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90">
                                                <LiaTrashSolid className="text-lg md:text-xl" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        }) : (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-slate-400 text-sm">
                                    {t('subCategories.noResults')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination — only renders when totalPages > 1 */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 py-4 px-6 border-t border-pink-50 dark:border-slate-800">
                    <button
                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-pink-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                        {t('subCategories.paginationPrev')}
                    </button>

                    {getPaginationRange(page, totalPages).map((num, idx) =>
                        num === '...'
                            ? <span key={`dot-${idx}`} className="px-2 py-1.5 text-xs text-slate-400">...</span>
                            : <button
                                key={num}
                                onClick={() => setPage(num)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                                                            ${page === num
                                        ? 'bg-pink-500 text-white border-pink-500'
                                        : 'border-pink-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {num}
                            </button>
                    )}

                    <button
                        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-pink-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                        {t('subCategories.paginationNext')}
                    </button>
                </div>
            )}

            {/* edit popup */}
            <div
                className={`fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 p-4 transition-all duration-300 ${isEditOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
                <div
                    onClick={() => setIsEditOpen(false)}
                    className="absolute inset-0"
                ></div>

                {/* Content */}
                <div className="relative w-full max-w-lg max-h-[95vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 text-left shadow-2xl transition-all border border-pink-50 dark:border-slate-800 overflow-hidden">

                    <button
                        onClick={() => setIsEditOpen(false)}
                        className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-400 hover:text-pink-500 transition-colors"
                    >
                        <HiOutlineX size={20} />
                    </button>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8">
                        {/* heading */}
                        <div className="text-center mb-6 mt-2 sm:mt-0">
                            <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">
                                {t('subCategories.editTitle')}
                            </h3>

                            <p className="text-[11px] md:text-xs text-slate-400 mt-1">
                                {t('subCategories.editSubtitle')}
                            </p>
                        </div>

                        <div className='flex-1 space-y-5'>

                            {/* sub-category Image */}
                            <div className='flex flex-col gap-1.5 md:gap-2'>
                                <label
                                    htmlFor='catImage'
                                    className='text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                    {t('subCategories.editLabelImage')}
                                </label>

                                <div className="relative p-2.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white text-sm transition-all overflow-hidden">
                                    <input
                                        type="file"
                                        id="catImage"
                                        name="catImage"
                                        accept=".jpg,.png"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />

                                    <div className="flex gap-2 items-center min-w-0">
                                        <div className="shrink-0 border border-pink-100 rounded-sm px-2 text-pink-500 bg-pink-50/30 text-[12px] md:text-sm">
                                            {t('subCategories.editBtnChooseFile')}
                                        </div>
                                        <span className="text-gray-600 dark:text-gray-400 text-xs truncate block flex-1">
                                            {file ? file.name : t('subCategories.editNoFileChosen')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* items in category  (read-only) */}
                            <div className='flex flex-col gap-1.5 md:gap-2'>
                                <label className='text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                    {t('subCategories.editLabelTotalProducts')}
                                </label>

                                <div className="p-2.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[12px] md:text-sm flex items-center justify-between">
                                    <span>{t('subCategories.editCurrentItems')}</span>
                                    <span className="font-bold text-pink-500">{selectedSubCategory?.productCount || 0}</span>
                                </div>
                            </div>

                            {/* sub category name */}
                            <div className='flex flex-col gap-1.5 md:gap-2'>
                                <label
                                    htmlFor='subCatName'
                                    className='text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                    {t('subCategories.editLabelName')}
                                </label>

                                <input
                                    type="text"
                                    name='subCatName'
                                    value={formData.subCatName}
                                    onChange={handleInputChange}
                                    placeholder={t('subCategories.editLabelName')}
                                    className="p-2.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-[12px] md:text-sm transition-all"
                                />
                            </div>

                            {/* attr */}
                            <div className='flex flex-col gap-1.5 md:gap-2'>
                                <label className='text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                    {t('subCategories.editLabelAttr')}
                                </label>

                                <div className="space-y-2">
                                    {(formData.allowedAttributes || []).map((attr, index) => (
                                        <div key={index} className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-100 bg-slate-50 dark:bg-slate-800 dark:border-slate-700">

                                            {/* Attribute Name */}
                                            <span className="text-[12px] md:text-sm font-semibold text-slate-700 dark:text-white flex-1">
                                                {attr.name}
                                            </span>

                                            {/* Has Variants Toggle */}
                                            <label className="flex items-center gap-1 text-[11px] text-slate-500 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={attr.hasVariants || false}
                                                    onChange={(e) => {
                                                        const updated = [...formData.allowedAttributes];
                                                        updated[index] = {
                                                            ...updated[index],
                                                            hasVariants: e.target.checked,
                                                            type: e.target.checked ? (attr.type || 'text') : 'text'
                                                        };
                                                        setFormData({ ...formData, allowedAttributes: updated });
                                                    }}
                                                    className="accent-pink-500"
                                                />
                                                {t('subCategories.editBtnVariant')}
                                            </label>

                                            {/* Type Selector — only if hasVariants */}
                                            {attr.hasVariants && (
                                                <select
                                                    value={attr.type || 'text'}
                                                    onChange={(e) => {
                                                        const updated = [...formData.allowedAttributes];
                                                        updated[index] = { ...updated[index], type: e.target.value };
                                                        setFormData({ ...formData, allowedAttributes: updated });
                                                    }}
                                                    className="text-[11px] border border-slate-200 rounded-lg px-2 py-1 bg-white dark:bg-slate-700 dark:text-white outline-none focus:ring-1 focus:ring-pink-400"
                                                >
                                                    <option value="text">{t('subCategories.editTypeText')}</option>
                                                    <option value="color">{t('subCategories.editTypeColor')}</option>
                                                    <option value="size">{t('subCategories.editTypeSize')}</option>
                                                </select>
                                            )}

                                            {/* Remove button */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updated = formData.allowedAttributes.filter((_, i) => i !== index);
                                                    setFormData({ ...formData, allowedAttributes: updated });
                                                }}
                                                className="shrink-0 text-slate-300 hover:text-red-400 transition-colors"
                                            >
                                                <HiOutlineX size={15} />
                                            </button>

                                        </div>
                                    ))}

                                    {/* Add new attribute */}
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder={t('subCategories.editPlaceholderAttr')}
                                            className="flex-1 min-w-0 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-sm"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && e.target.value.trim()) {
                                                    setFormData({
                                                        ...formData,
                                                        allowedAttributes: [
                                                            ...formData.allowedAttributes,
                                                            { name: e.target.value.trim(), hasVariants: false, type: 'text', isFilterable: true }
                                                        ]
                                                    });
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                const input = e.target.previousSibling;
                                                if (input.value.trim()) {
                                                    setFormData({
                                                        ...formData,
                                                        allowedAttributes: [
                                                            ...formData.allowedAttributes,
                                                            { name: input.value.trim(), hasVariants: false, type: 'text', isFilterable: true }
                                                        ]
                                                    });
                                                    input.value = '';
                                                }
                                            }}
                                            className="shrink-0 px-3 md:px-4 py-1.5 md:py-2 bg-pink-500 text-white text-xs font-bold rounded-lg hover:bg-pink-600 transition-colors"
                                        >
                                            {t('subCategories.editBtnAdd')}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* description */}
                            <div className='flex flex-col gap-1.5 md:gap-2'>
                                <label
                                    htmlFor='description'
                                    className='text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                                    {t('subCategories.editLabelDesc')}
                                </label>

                                <textarea
                                    type="text"
                                    name='description'
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder={t('subCategories.editPlaceholderDesc')}
                                    className="p-2.5 rounded-lg md:rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white text-[12px] md:text-sm transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={() => setIsEditOpen(false)}
                                className="w-full sm:w-1/2 justify-center rounded-2xl bg-white dark:bg-slate-800 px-3 py-3.5 text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer flex items-center"
                            >
                                {t('subCategories.editBtnDiscard')}
                            </button>

                            <button
                                type="button"
                                onClick={handleUpdate}
                                disabled={isUpdating}
                                className="w-full sm:w-1/2 justify-center rounded-2xl bg-linear-to-br from-pink-500 to-pink-600 px-3 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-100 dark:shadow-none hover:from-pink-600 hover:to-pink-700 transition-all items-center gap-2 active:scale-95 cursor-pointer flex disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isUpdating ? t('subCategories.editSaving') : t('subCategories.editBtnSave')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Popup */}
            <div
                className={`fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-100 p-4 transition-all duration-500 ${isDeletedOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            >
                {/* Backdrop */}
                <div
                    onClick={() => { setIsDeletedOpen(false); setSelectedSubCatId(null); }}
                    className="absolute inset-0"
                ></div>

                {/* Content Container */}
                <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto transform rounded-[2.5rem] bg-white dark:bg-slate-900 p-6 md:p-8 text-left shadow-2xl transition-all border border-pink-50 dark:border-slate-800">

                    {/* Cross Icon */}
                    <button
                        onClick={() => { setIsDeletedOpen(false); setSelectedSubCatId(null); }}
                        className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-400 hover:text-pink-500 transition-colors"
                    >
                        <HiOutlineX size={20} />
                    </button>

                    {/* Warning Icon */}
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-900/20 mb-6 mt-2">
                        <HiOutlineExclamation className="h-8 w-8 text-red-500" />
                    </div>

                    {/* Text Content */}
                    <div className="text-center">
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white px-2">
                            {t('subCategories.deleteTitle')}
                        </h3>

                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-2">
                            {isInfoLoading ? t('subCategories.deleteLoading') : deleteInfo?.message}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={() => { setIsDeletedOpen(false); setSelectedSubCatId(null); }}
                            className="flex w-full justify-center items-center rounded-2xl bg-slate-50 dark:bg-slate-800 px-3 py-3.5 text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer"
                        >
                            {t('subCategories.deleteBtnNo')}
                        </button>

                        {deleteInfo?.canDelete && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex w-full justify-center items-center rounded-2xl bg-red-600 px-3 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-100 dark:shadow-none hover:bg-red-700 transition-all gap-2 active:scale-95 cursor-pointer disabled:opacity-70"
                            >
                                <HiOutlineTrash size={18} />
                                {isDeleting ? t('subCategories.deleteDeleting') : t('subCategories.deleteBtnYes')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubCategories;