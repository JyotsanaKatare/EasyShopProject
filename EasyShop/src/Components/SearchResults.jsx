
import { useNavigate, useSearchParams } from "react-router-dom";
import EasyShopLoader from "./EasyShopLoader";
import { AiFillStar } from "react-icons/ai";
import { useSearchResults } from "../hook/uesProducts";
import { useTranslation } from 'react-i18next';

function SearchResults() {

    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || "";
    const navigate = useNavigate();

    const { data: results, isLoading } = useSearchResults(query);

    if (isLoading) return <EasyShopLoader />;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-5 lg-px-6 py-6 md:py-10 min-h-[80vh]">

            {/* Header section */}
            {results && results.length > 0 && (
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4 px-2">
                    {t('searchResults.resultsFor')} <span className="text-pink-500">"{query}"</span>
                    <span className="text-gray-400 text-xs md:text-sm font-normal ml-2">
                        ({results.length} {results.length === 1
                            ? t('searchResults.product')
                            : t('searchResults.products')} {t('searchResults.found')})
                    </span>
                </h2>
            )}

            {/* Main Logic: Found vs Not Found */}
            {!results || results.length === 0 ? (
                <div className="min-h-[50vh] flex flex-col items-center justify-center text-center py-10">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-pink-50 rounded-full flex items-center justify-center text-4xl md:text-5xl mb-6 text-pink-500">
                        🔍
                    </div>
                    <h3 className="text-lg md:text-2xl font-black text-gray-800 mb-2 px-4">
                        {t('searchResults.noResults')} "{query}"
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm max-w-sm mb-8 leading-relaxed px-4">
                        {t('searchResults.noResultsDesc')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs px-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                        >
                            {t('searchResults.goBack')}
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full px-6 py-3 bg-pink-500 text-white rounded-xl text-sm font-bold hover:bg-pink-600 active:scale-95 transition-all shadow-md shadow-pink-100 cursor-pointer"
                        >
                            {t('searchResults.browseAll')}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3 md:gap-6">
                    {results.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => navigate(`/product_detail/${product._id}/${product.prodName}`)}
                            className="bg-white border border-gray-100 rounded-xl md:rounded-2xl p-2 md:p-3 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col group"
                        >
                            <div className="relative overflow-hidden rounded-lg md:rounded-xl bg-gray-100 aspect-square mb-2 md:mb-3">
                                <img
                                    src={product.prodImage}
                                    alt={product.prodName}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="flex flex-col flex-1 px-1">
                                <h3 className="text-[11px] md:text-sm font-bold text-gray-800 line-clamp-2 group-hover:text-pink-500 transition-colors uppercase tracking-tight">
                                    {product.prodName}
                                </h3>
                                <p className="text-[10px] md:text-xs text-gray-400 mt-1 line-clamp-1">
                                    {product.description || t('searchResults.defaultDesc')}
                                </p>

                                <div className="mt-auto pt-2">
                                    <span className="text-sm md:text-base font-black text-pink-500">₹{product.price}</span>
                                    <div className="flex items-center gap-0.5 mt-0.5 text-[10px] md:text-xs text-gray-400">
                                        <div className="flex text-yellow-400 gap-0.5">
                                            <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />
                                            <span className="text-gray-200"><AiFillStar /></span>
                                        </div>
                                        <span>({product?.totalReviews || 0})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchResults;