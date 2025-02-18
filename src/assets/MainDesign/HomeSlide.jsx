import AboutMedicineShop from "../Component/Aboutmadechin";
import BannerSlider from "../Component/Banner";
import DiscountProducts from "../Component/discount";
import LocationSection from "../Component/location";
import Testimonials from "../Component/Tesiminial";
import CategorySlider from "./HomeDesign/Category";

const AllHome =()=>{
    return(
        <div>
            <BannerSlider></BannerSlider>
            <CategorySlider></CategorySlider>
            <DiscountProducts></DiscountProducts>
            <Testimonials></Testimonials>
            <AboutMedicineShop></AboutMedicineShop>
            <LocationSection></LocationSection>
        </div>
    )
};
export default AllHome;