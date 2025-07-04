"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { LightboxGallery } from "@/components/lightbox-gallery"
import { ChevronLeft, ChevronRight } from "lucide-react"

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();
  
  const images = [
    '/images/main/rostlinna.jpg',
    '/images/main/zivocisna.jpg',
    '/images/main/food.jpg'
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
              <div className="relative z-10">
                <p className="text-xl md:text-2xl max-w-3xl mx-auto">{t("modernAgricultural")}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
          onClick={prevSlide}
          aria-label="Předchozí snímek"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
          onClick={nextSlide}
          aria-label="Další snímek"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
        
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => goToSlide(index)}
              aria-label={`Přejít na snímek ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const products = [
    { id: 1, name: t("crops"), description: t("cropsDesc"), link: "/produkty/rostlinna-vyroba" },
    { id: 2, name: t("livestock"), description: t("livestockDesc"), link: "/produkty/zivocisna-vyroba" },
    { id: 3, name: t("food"), description: t("foodDesc"), link: "/produkty/potravinarske-vyrobky" },
  ];

  const stats = [
    { id: 1, name: t("founded"), value: t("year") },
    { id: 2, name: t("members"), value: t("memberCount") },
    { id: 3, name: t("employees"), value: t("employeeCount") },
    { id: 4, name: t("landArea"), value: t("area") },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const galleryImages = [
    { id: 1, src: "/images/gallery/areál Borovany.png", alt: "ZOD Borovany - Areál Borovany" },
    { id: 2, src: "/images/gallery/Areál Mladošovice.png", alt: "ZOD Borovany - Areál Mladošovice" },
    { id: 3, src: "/images/gallery/Areál Radostice.png", alt: "ZOD Borovany - Areál Radostice" },
    { id: 4, src: "/images/gallery/Areál Třebeč.png", alt: "ZOD Borovany - Areál Třebeč" },
    { id: 5, src: "/images/gallery/Areál Šalmanovice.png", alt: "ZOD Borovany - Areál Šalmanovice" },
    { id: 6, src: "/images/gallery/Areál Hluboká u Borovan.png", alt: "ZOD Borovany - Areál Hluboká u Borovan" },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    // Dispatch event for any external listeners
    const event = new CustomEvent('lightbox-goto', { detail: index });
    window.dispatchEvent(event);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Listen for custom event from lightbox thumbnails
  useEffect(() => {
    const handleGoto = (e: CustomEvent) => {
      goToImage(e.detail);
    };
    window.addEventListener("lightbox-goto", handleGoto as EventListener);
    return () => window.removeEventListener("lightbox-goto", handleGoto as EventListener);
  }, []);

  // Auto-advance is handled by the HeroSlider component

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <HeroSlider />
      


      {/* Company Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            {/* Logo - Increased by 50% */}
            <div className="text-center mb-8">
              <Image src="/images/logo.png" alt="ZOD Borovany Logo" width={400} height={200} className="mx-auto" />
            </div>

            {/* Company Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-gray-800">{t("address")}:</span>
                  <span className="ml-2 text-gray-600">Vodárenská 97, 373 12 Borovany</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">{t("companyId")}</span>
                  <span className="ml-2 text-gray-600">00109207</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">{t("vatId")}</span>
                  <span className="ml-2 text-gray-600">CZ00109207</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-gray-800">Tel:</span>
                  <span className="ml-2 text-gray-600">387 023 511</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Email:</span>
                  <span className="ml-2 text-gray-600">info@zodborovany.cz</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">{t("dataBox")}:</span>
                  <span className="ml-2 text-gray-600">r5tcx53</span>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="text-center border-t border-gray-200 pt-6">
              <div>
                <span className="font-semibold text-gray-800">{t("openingHours")}:</span>
                <span className="ml-2 text-gray-600">
                  {t("weekdays")}: 7:00–15:30, {t("weekend")}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/jidelni-listek">
                <Button className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white px-8 py-3">
                  {t("menu")}
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3"
                >
                  {t("contact")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">{t("whatWeDo")}</h2>

          {/* Responsive grid: 1 column on mobile, 2 columns on medium, 3 columns on large+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Plant Production */}
            <div className="flex flex-col h-full bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 relative overflow-hidden flex-shrink-0">
                <Image 
                  src="/images/main/rostlinna.jpg" 
                  alt="Rostlinná výroba"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-bold text-center mb-4">{t("plantProduction")}</h3>
                <div className="text-gray-600 space-y-4 flex-grow">
                  <p className="text-justify hyphens-auto break-words" style={{textWrap: 'pretty', wordBreak: 'break-word'}}>{t("plantProductionText1")}</p>
                  <p className="text-justify hyphens-auto break-words" style={{textWrap: 'pretty', wordBreak: 'break-word'}}>{t("plantProductionText2")}</p>
                </div>
              </div>
            </div>

            {/* Animal Production */}
            <div className="flex flex-col h-full bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 relative overflow-hidden flex-shrink-0">
                <Image 
                  src="/images/main/zivocisna.jpg" 
                  alt="Živočišná výroba"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-bold text-center mb-4">{t("animalProduction")}</h3>
                <div className="text-gray-600 space-y-4 flex-grow">
                  <p className="text-justify hyphens-auto break-words" style={{textWrap: 'pretty', wordBreak: 'break-word'}}>{t("animalProductionText1")}</p>
                  <p className="text-justify hyphens-auto break-words" style={{textWrap: 'pretty', wordBreak: 'break-word'}}>{t("animalProductionText2")}</p>
                </div>
              </div>
            </div>

            {/* Company Canteen */}
            <div className="flex flex-col h-full bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 md:col-span-2 xl:col-span-1">
              <div className="h-48 relative overflow-hidden flex-shrink-0">
                <Image 
                  src="/images/main/food.jpg" 
                  alt="Podniková jídelna"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-bold text-center mb-4">{t("companyCanteen")}</h3>
                <div className="text-gray-600 space-y-4 flex-grow">
                  <p className="text-justify hyphens-auto break-words" style={{textWrap: 'pretty', wordBreak: 'break-word'}}>{t("companyCanteenText1")}</p>
                  <p className="text-justify hyphens-auto break-words" style={{textWrap: 'pretty', wordBreak: 'break-word'}}>{t("companyCanteenText2")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">{t("farmAreas")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="aspect-video overflow-hidden rounded-xl shadow-lg cursor-pointer group hover:shadow-xl transition-shadow duration-300"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Gallery */}
      <LightboxGallery
        images={galleryImages}
        isOpen={lightboxOpen}
        currentIndex={currentImageIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </div>
  )
}
