
import React, { useState } from 'react';
import { TbEdit } from "react-icons/tb";
import { LiaTrashSolid } from "react-icons/lia";
import { HiOutlineExclamation, HiOutlineTrash, HiOutlineX } from 'react-icons/hi';

import { useCatList, useDeleteCategory, useDeleteInfoCategory, useToggleCatStatus, useUpdateCategory } from '../hooks/useCategories';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { getPaginationRange } from '../utils/getPaginationRange';
import { useTranslation } from 'react-i18next';

function Categories({ setCurrentPage }) {

  const { t } = useTranslation();
  const [searchVal, setSearchVal] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: catData, isLoading, isError } = useCatList({ search: debouncedSearch, page });
  const { mutate: toggleCatStatus, isPending, variables } = useToggleCatStatus();
  const { mutate: updatCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const catList = catData?.data || [];
  const totalPages = catData?.totalPages || 1;

  // debounce + reset page
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchVal);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchVal]);

  // edit popup
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    catName: "",
    description: "",
    department: "",
    requiresCertificate: false,
    certificateLabel: ""
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  // delete info
  const [selectedCatId, setSelectedCatId] = useState(null);

  // delete popup
  const [isDeletedOpen, setIsDeletedOpen] = useState(false);

  const { data: deleteInfo, isLoading: isInfoLoading } = useDeleteInfoCategory(selectedCatId);

  // --------Toggle--------
  const handleToggleStatus = (category) => {
    toggleCatStatus(category);
  };

  // --------Edit---------
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleUpdateClick = (category) => {
    // 1. Inputs ko purane data se bharo
    setFormData({
      catName: category.catName,
      description: category.description,
      department: category.department,
      requiresCertificate: category.requiresCertificate || false,
      certificateLabel: category.certificateLabel || ""
    });

    // 2. Yaad rakho ki hum kis ID ko edit kar rahe hain (catid milegi)
    setSelectedCategory(category);

    // 3. Popup open kar do
    setIsEditOpen(true);
  };

  const handleUpdate = () => {

    const data = new FormData();
    data.append("catName", formData.catName);
    data.append("department", formData.department);
    data.append("description", formData.description);
    data.append("requiresCertificate", String(formData.requiresCertificate));
    data.append("certificateLabel", formData.certificateLabel);

    if (file) {
      data.append("catImage", file);
    }

    updatCategory({ catId: selectedCategory._id, formData: data }, {
      onSuccess: (res) => {
        toast.success(res.message || "Category updated");

        setFormData({
          catName: "",
          department: "",
          description: "",
          requiresCertificate: false,
          certificateLabel: ""
        });

        setFile(null);
        setIsEditOpen(false);
        setCurrentPage("categories");
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
  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setSelectedCatId(category._id);
    setIsDeletedOpen(true);
  };

  const handleDelete = () => {
    deleteCategory({ catId: selectedCategory._id }, {
      onSuccess: (res) => {
        toast.success(res.message || "Category Deleted Successfully");
        setIsDeletedOpen(false);
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to deleted");
      }
    });
  };

  if (isLoading) return <p className="p-10 text-center">{t('adminCategories.loading')}</p>;
  if (isError) return <p className="p-10 text-center text-red-500">{t('adminCategories.error')}</p>;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl md:rounded-3xl border border-pink-50 dark:border-slate-800 shadow-sm overflow-hidden">

      {/* Heading with Search & Add Button */}
      <div className="p-4 md:p-6 border-b border-pink-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        {/* Title & Badge */}
        <div>
          <div className='flex items-center gap-2.5'>
            <h2 className="text-md md:text-lg font-bold text-slate-800 dark:text-white shrink-0">
              {t('adminCategories.title')}
            </h2>
            <span className="bg-pink-100 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400 px-2.5 py-0.5 md:py-1 rounded-full text-[11px] md:text-xs font-bold">
              {t('adminCategories.totalBadge')} {catData?.count || 0}
            </span>
          </div>
          <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('adminCategories.description')}
          </p>
        </div>

        {/* Search & Button Group */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder={t('adminCategories.searchPlaceholder')}
            className="w-full sm:w-64 text-sm px-4 py-2 md:py-2.5 rounded-xl border border-pink-50 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-xs placeholder:text-xs md:placeholder:text-[13px] dark:text-white"
          />
          <button
            onClick={() => setCurrentPage('add-category')}
            className="w-full sm:w-auto bg-linear-to-br from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-pink-200 dark:hover:shadow-none transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            {t('adminCategories.addNew')}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">{t('adminCategories.colCategory')}</th>
              <th className="px-6 py-4 whitespace-nowrap">{t('adminCategories.colDepartment')}</th>
              <th className="px-6 py-4 whitespace-nowrap">{t('adminCategories.colLicense')}</th>
              <th className="px-6 py-4 whitespace-nowrap">{t('adminCategories.colItemsCount')}</th>
              <th className="px-6 py-4 whitespace-nowrap">{t('adminCategories.colStatus')}</th>
              <th className="px-6 py-4 whitespace-nowrap text-center">{t('adminCategories.colAction')}</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-pink-50 dark:divide-slate-800">

            {catList.length > 0 ? catList.map((category, index) => {
              const isThisRowLoading = isPending && variables === category._id;

              return (
                <tr
                  key={index}
                  className="hover:bg-pink-50/30 dark:hover:bg-slate-800/30 transition-colors group">

                  {/* Category Image & Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={category.catImage}
                        alt={category.catName}
                        className="w-10 h-10 rounded-lg object-cover border border-pink-100 shadow-sm" />

                      <span className="text-[13px] md:text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {category.catName}
                      </span>
                    </div>
                  </td>

                  {/* Parent Category */}
                  <td className="px-6 py-4 text-sm text-slate-500 italic">
                    {category.department || "---"}
                  </td>

                  {/* License Required? */}
                  <td className="px-6 py-4">
                    {category.requiresCertificate ? (
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center w-fit px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-600 border border-amber-200 uppercase">
                          {t('adminCategories.licenseRequired')}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {category.certificateLabel}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">{t('adminCategories.licenseNotRequired')}</span>
                    )}
                  </td>

                  {/* Product Count */}
                  <td className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                    {category.productCount || 0} <span className="text-[10px] font-normal text-slate-400 ml-1">{t('adminCategories.items')}</span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => !isPending && handleToggleStatus(category._id)}
                      disabled={isPending}
                      className={`w-16 inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-all
                        ${isThisRowLoading ? 'opacity-50' : 'cursor-pointer'}
                          ${category.isActive
                          ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100'
                          : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                        }`}
                    >
                      {/* Blink issue fix: Sirf usi row mein text gayab hoga jo click hui hai */}
                      {isThisRowLoading ? (
                        <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        category.isActive ? t('adminCategories.statusActive') : t('adminCategories.statusInactive')
                      )}
                    </button>
                  </td>

                  {/* Action Buttons */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">

                      <button
                        onClick={() => handleUpdateClick(category)}
                        className="p-2 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white transition-all active:scale-90">
                        <TbEdit className="text-lg md:text-xl" />
                      </button>

                      <button
                        onClick={() => handleDeleteClick(category)}
                        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90">
                        <LiaTrashSolid className="text-lg md:text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-slate-400 text-sm">
                  {t('adminCategories.emptySearch')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 px-6 py-4 border-t border-pink-50 dark:border-slate-800">
          <button
            onClick={() => setPage(p => p - 1)}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-all"
          >
            {t('adminCategories.prev')}
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
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-all"
          >
            {t('adminCategories.next')}
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
            <div className="text-center mb-6">
              <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">
                {t('adminCategories.editTitle')}
              </h3>
              <p className="text-[11px] md:text-xs text-slate-400 mt-1">
                {t('adminCategories.editDescription')}
              </p>
            </div>

            <div className='flex-1 space-y-4'>

              {/* Category Image */}
              <div className='flex flex-col gap-1.5'>
                <label className='text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                  {t('adminCategories.editImageLabel')}
                </label>
                <div className="relative p-2 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm">
                  <input type="file" id="catImage" accept=".jpg,.png" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="flex gap-2 items-center">
                    <span className="border border-pink-100 rounded-md px-2 py-1 text-[10px] md:text-xs text-pink-500 bg-pink-50/50">
                      {t('adminCategories.editChooseFile')}
                    </span>
                    <span className="text-slate-500 text-xs truncate">
                      {file ? file.name : t('adminCategories.editNoFile')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Total Products (Read Only) */}
              <div className='flex flex-col gap-1.5'>
                <label className='text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>
                  {t('adminCategories.editTotalProducts')}
                </label>
                <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 text-sm flex items-center justify-between">
                  <span>{t('adminCategories.editCurrentItems')}</span>
                  <span className="font-bold text-pink-500">{selectedCategory?.productCount || 0}</span>
                </div>
              </div>

              {/* Name & Department */}
              <div className='flex flex-col gap-1.5'>
                <label className='text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>{t('adminCategories.editCategoryName')}</label>
                <input type="text" name='catName' value={formData.catName} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-pink-400 text-sm" />
              </div>

              <div className='flex flex-col gap-1.5'>
                <label className='text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>{t('adminCategories.editDepartment')}</label>
                <input type="text" name='department' value={formData.department} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-pink-400 text-sm" />
              </div>

              {/* License Requirement */}
              <div className="flex flex-col gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-semibold text-slate-600 dark:text-slate-400">{t('adminCategories.editRequireLicense')}</label>
                  <input type="checkbox" name="requiresCertificate" checked={formData.requiresCertificate} onChange={(e) => setFormData({ ...formData, requiresCertificate: e.target.checked })} className="accent-pink-500 w-4 h-4" />
                </div>
                {formData.requiresCertificate && (
                  <input type="text" name="certificateLabel" value={formData.certificateLabel} onChange={handleInputChange} placeholder={t('adminCategories.editLicensePlaceholder')} className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-pink-400 outline-none" />
                )}
              </div>

              {/* Description */}
              <div className='flex flex-col gap-1.5'>
                <label className='text-[12px] md:text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1'>{t('adminCategories.editDescription2')}</label>
                <textarea name='description' value={formData.description} onChange={handleInputChange} rows={3} className="w-full p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-pink-400 text-sm resize-none" />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
              <button onClick={() => setIsEditOpen(false)} className="w-full sm:w-1/2 py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-all">
                {t('adminCategories.editDiscard')}
              </button>
              <button onClick={handleUpdate} className="w-full sm:w-1/2 py-3 rounded-xl bg-pink-600 text-white font-bold text-sm hover:bg-pink-700 transition-all shadow-lg shadow-pink-200">
                {isUpdating ? t('adminCategories.editSaving') : t('adminCategories.editSave')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Popup */}
      <div
        className={`fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-100 p-4 transition-all duration-500 
            ${isDeletedOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        {/* Backdrop */}
        <div
          onClick={() => {
            setIsDeletedOpen(false);
            setSelectedCatId(null);
          }}
          className="absolute inset-0"
        ></div>

        {/* Content Container */}
        <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto transform rounded-4xl md:rounded-[2.5rem] bg-white dark:bg-slate-900 p-6 md:p-8 text-left shadow-2xl transition-all border border-pink-50 dark:border-slate-800">

          {/* Cross Icon */}
          <button
            onClick={() => {
              setIsDeletedOpen(false);
              setSelectedCatId(null);
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-400 hover:text-pink-500 transition-colors"
          >
            <HiOutlineX size={20} />
          </button>

          {/* Warning Icon */}
          <div className="mx-auto flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-900/20 mb-6 mt-2">
            <HiOutlineExclamation className="h-7 w-7 md:h-8 md:w-8 text-red-500" />
          </div>

          {/* Text Content */}
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">
              {t('adminCategories.deleteTitle')}
            </h3>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-2">
              {isInfoLoading
                ? t('adminCategories.deleteChecking')
                : deleteInfo?.message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                setIsDeletedOpen(false);
                setSelectedCatId(null);
              }}
              className="w-full flex justify-center items-center rounded-2xl bg-slate-50 dark:bg-slate-800 px-4 py-3.5 text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:bg-slate-100 transition-all active:scale-95 cursor-pointer"
            >
              {t('adminCategories.deleteKeep')}
            </button>

            {deleteInfo?.canDelete && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full flex justify-center items-center gap-2 rounded-2xl bg-red-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-100 hover:bg-red-700 transition-all active:scale-95 cursor-pointer disabled:opacity-70"
              >
                <HiOutlineTrash size={18} />
                {isDeleting ? t('adminCategories.deleteDeleting') : t('adminCategories.deleteConfirm')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;