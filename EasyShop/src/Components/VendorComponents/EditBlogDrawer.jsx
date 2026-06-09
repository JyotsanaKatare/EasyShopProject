
import React, { useEffect, useState } from 'react';
import { HiOutlineX, HiOutlineCloudUpload } from "react-icons/hi";
import toast from 'react-hot-toast';

import { useUpdateBlog } from '../../hook/useBlog';
import { useTranslation } from 'react-i18next';

function EditBlogDrawer({ blog, isOpen, onClose }) {

  const { t } = useTranslation();
  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [readTime, setReadTime] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [blockquote, setBlockquote] = useState('');
  const [tags, setTags] = useState('');
  const [trendsList, setTrendsList] = useState(['']);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (blog && isOpen) {
      setTitle(blog.title || '');
      setCategory(blog.category || '');
      setReadTime(blog.readTime || '');
      setDescription(blog.description || '');
      setContent(blog.content || '');
      setBlockquote(blog.blockquote || '');
      setImagePreview(blog.bannerImage || '');
      setImageFile(null);

      // Handle Tags Array to String
      if (blog.tags && Array.isArray(blog.tags)) {
        setTags(blog.tags.join(', '));
      } else {
        setTags('');
      }

      // handle trendsList
      if (blog.trendsList && Array.isArray(blog.trendsList) && blog.trendsList.length > 0) {
        const extractedTrends = blog.trendsList.map(item => typeof item === 'object' ? item.title || item.name : item);
        setTrendsList(extractedTrends);
      } else {
        setTrendsList(['']);
      }
    }
  }, [blog, isOpen]);

  if (!isOpen) return null;

  // Handle Local Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // handle trend list
  const handleTrendChange = (index, value) => {
    const updatedTrends = [...trendsList];
    updatedTrends[index] = value;
    setTrendsList(updatedTrends);
  };

  const addTrendField = () => {
    setTrendsList([...trendsList, '']);
  };

  const removeTrendField = (index) => {
    if (trendsList.length > 1) {
      const updatedTrends = trendsList.filter((_, i) => i !== index);
      setTrendsList(updatedTrends);
    } else {
      setTrendsList(['']);
    }
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !category || !content.trim()) {
      return toast.error("Title, Category, and Content are required fields!");
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('category', category);
    formData.append('readTime', readTime.trim());
    formData.append('description', description.trim());
    formData.append('content', content.trim());
    formData.append('blockquote', blockquote.trim());

    const processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    formData.append('tags', JSON.stringify(processedTags));

    // backend expect obj data so convert it in obj
    const processedTrends = trendsList
      .map(item => item.trim())
      .filter(item => item !== '')
      .map(item => ({ title: item }));

    formData.append('trendsList', JSON.stringify(processedTrends));

    if (imageFile) {
      formData.append('bannerImage', imageFile);
    }

    updateBlog({ blog_id: blog._id, formData }, {
      onSuccess: (res) => {
        toast.success(res.message || "Blog Update Successfull");
        onClose();
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to update");
      }
    });
  };

  return (
    <>
      {/* Backdrop Blur overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-60 bg-slate-900/40 backdrop-blur-md transition-opacity duration-500 opacity-100"
      />

      {/* drawer container */}
      <div className="fixed inset-y-0 right-0 z-70 w-full max-w-xl bg-white dark:bg-slate-950 shadow-2xl transform transition-transform duration-500 ease-in-out translate-x-0">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">

          {/* Drawer Header */}
          <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg md:text-xl font-black text-slate-800 dark:text-white flex flex-wrap items-center gap-2">
                {t('editBlog.title')}
                <span className="text-[9px] md:text-[10px] font-bold px-2 py-0.5 bg-pink-50 dark:bg-pink-950/50 text-pink-500 rounded-full uppercase tracking-wider whitespace-nowrap">
                  {t('editBlog.mode')}
                </span>
              </h2>
              <p className="text-[10px] md:text-[11px] text-slate-400 font-mono mt-1 truncate">
                {t('editBlog.idLabel')} {blog?._id}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-full transition-all active:scale-95"
            >
              <HiOutlineX size={20} className="md:w-6 md:h-6" />
            </button>
          </div>

          {/* content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">

            {/* Title Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                {t('editBlog.blogTitleLabel')}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('editBlog.blogTitlePlaceholder')}
                className="mt-2 w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
              />
            </div>

            {/* cat and tym */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  {t('editBlog.categoryLabel')}
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder={t('editBlog.categoryPlaceholder')}
                  className="mt-2 w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  {t('editBlog.readTimeLabel')}
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder={t('editBlog.readTimePlaceholder')}
                  className="mt-2 w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                />
              </div>
            </div>

            {/* image upload */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                {t('editBlog.bannerImageLabel')}
              </label>
              <div className="mt-2 flex flex-col sm:flex-row gap-4 items-center border border-dashed border-slate-200 dark:border-slate-800 p-4 rounded-xl">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Banner Preview"
                    className="w-24 h-24 object-cover rounded-xl border border-pink-50"
                  />
                )}
                <label className="flex-1 flex flex-col items-center justify-center py-4 bg-slate-50 dark:bg-slate-900 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all w-full">
                  <HiOutlineCloudUpload size={24} className="text-pink-500" />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
                    {t('editBlog.uploadImageBtn')}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {t('editBlog.uploadImageHint')}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* short desc */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                {t('editBlog.shortDescLabel')}
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('editBlog.shortDescPlaceholder')}
                className="mt-2 w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all resize-none"
              />
            </div>

            {/* content area */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                {t('editBlog.blogContentLabel')}
              </label>
              <textarea
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t('editBlog.blogContentPlaceholder')}
                className="mt-2 w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
              />
            </div>

            {/* blockquote */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                {t('editBlog.blockquoteLabel')}
              </label>
              <input
                type="text"
                value={blockquote}
                onChange={(e) => setBlockquote(e.target.value)}
                placeholder={t('editBlog.blockquotePlaceholder')}
                className="mt-2 w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
              />
            </div>

            {/* tags and trend list */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  {t('editBlog.tagsLabel')}
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder={t('editBlog.tagsPlaceholder')}
                  className="mt-2 w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                />
              </div>

              {/* Dynamic Trends List Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    {t('editBlog.trendsListLabel')}
                  </label>
                  <button
                    type="button"
                    onClick={addTrendField}
                    className="text-xs font-bold text-pink-500 hover:text-pink-600 flex items-center gap-1 transition-all cursor-pointer"
                  >
                    {t('editBlog.addTrendBtn')}
                  </button>
                </div>

                <div className="space-y-2">
                  {trendsList.map((trend, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 font-mono w-5 shrink-0">
                        {index + 1}.
                      </span>
                      <input
                        type="text"
                        value={trend}
                        onChange={(e) => handleTrendChange(index, e.target.value)}
                        placeholder={t('editBlog.trendPlaceholder', { index: index + 1 })}
                        className="flex-1 min-w-0 text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => removeTrendField(index)}
                        className="shrink-0 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all cursor-pointer text-xs font-bold"
                      >
                        {t('editBlog.removeBtn')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Action Section */}
          <div className="p-4 md:px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              {t('editBlog.cancelBtn')}
            </button>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl text-sm font-bold bg-pink-600 text-white hover:bg-pink-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isUpdating ? t('editBlog.savingBtn') : t('editBlog.saveBtn')}
            </button>
          </div>

        </form>
      </div>
    </>
  );
}

export default EditBlogDrawer;