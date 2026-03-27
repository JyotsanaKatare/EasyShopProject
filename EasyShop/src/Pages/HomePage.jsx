
import HomeBanner from '../Components/HomeBanner';
import HomeBestSeller from '../Components/HomeBestSeller';
import HomeCategoryExplore from '../Components/HomeCategoryExplore';
import HomeNewProductBanner from '../Components/HomeNewProductBanner';
import HomeNewProducts from '../Components/HomeNewProducts';
import HomeProdGrid from '../Components/HomeProdGrid';
import HomeReviewSlider from '../Components/HomeReviewSlider';
import HomeTopCategory from '../Components/HomeTopCategory';

function HomePage() {
    return (
        <>
            <HomeBanner />
            <HomeTopCategory />
            <HomeNewProductBanner />
            <HomeNewProducts />
            <HomeBestSeller />
            <HomeProdGrid />
            <HomeCategoryExplore />
            <HomeReviewSlider />
        </>
    )
}

export default HomePage;