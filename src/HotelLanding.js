import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Snowflake, Sun, Flower, Star, MapPin, Calendar, Dumbbell, Waves, Utensils, Martini, Flower2, ArrowRight, Facebook, Instagram, Linkedin, Phone, Mail, Plane, Car, Bus, Train, Menu, X } from 'lucide-react';
import './HotelLanding.css';

const HotelLanding = () => {
    // viewMode: 'hero' (Home) or 'details' (Timeline selected)
    const [viewMode, setViewMode] = useState('hero');
    const [showVideo, setShowVideo] = useState(true);
    const [videoSrc, setVideoSrc] = useState('/images/entrance.mp4');
    const [activeTab, setActiveTab] = useState(0);
    const [activeMenu, setActiveMenu] = useState(null); // 'hotel', 'rooms', 'eat'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentSuiteIndex, setCurrentSuiteIndex] = useState(0);
    const [howToArriveTab, setHowToArriveTab] = useState('plane');
    const [galleryTab, setGalleryTab] = useState('ALL');
    const [canBoDate, setCanBoDate] = useState(new Date(2025, 11)); // Dec 2025
    const [canBoPeopleOpen, setCanBoPeopleOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [canBoSelectedPeople, setCanBoSelectedPeople] = useState('2 people');
    const [canBoTimeOpen, setCanBoTimeOpen] = useState(false);
    const [canBoSelectedTime, setCanBoSelectedTime] = useState('Select');
    const [canBoGalleryIndex, setCanBoGalleryIndex] = useState(0);
    const [canBoArrivalTab, setCanBoArrivalTab] = useState('car');
    const canBoGalleryImages = [
        '/assets/canbo/canbo_1.png',
        '/assets/canbo/canbo_2.png',
        '/assets/canbo/canbo_3.png',
        '/assets/canbo/canbo_4.png',
        '/assets/canbo/canbo_5.png'
    ];

    const nextCanBoGallerySlide = () => {
        setCanBoGalleryIndex((prev) => (prev + 1) % canBoGalleryImages.length);
    };

    const prevCanBoGallerySlide = () => {
        setCanBoGalleryIndex((prev) => (prev - 1 + canBoGalleryImages.length) % canBoGalleryImages.length);
    };

    const handleCanBoPrevMonth = () => {
        setCanBoDate(new Date(canBoDate.getFullYear(), canBoDate.getMonth() - 1, 1));
    };

    const handleCanBoNextMonth = () => {
        setCanBoDate(new Date(canBoDate.getFullYear(), canBoDate.getMonth() + 1, 1));
    };

    const renderCanBoCalendar = () => {
        const year = canBoDate.getFullYear();
        const month = canBoDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
        const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Mon start
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const grid = [];

        for (let i = 0; i < startOffset; i++) {
            grid.push(<div key={`empty-${i}`} style={{ color: '#ccc' }}></div>);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            // Highlight logic (just consistent simplified logic for now)
            const isToday = d === 21 && month === 11 && year === 2025;
            grid.push(
                <div key={d} style={{
                    color: isToday ? 'white' : '#333',
                    backgroundColor: isToday ? '#999' : 'transparent',
                    borderRadius: isToday ? '50%' : '0',
                    width: '2rem',
                    height: '2rem',
                    lineHeight: '2rem',
                    margin: '0 auto',
                    cursor: 'pointer'
                }}>
                    {d}
                </div>
            );
        }
        return grid;
    };

    const timeoutRef = React.useRef(null); // Ref for debounce timeout

    // Classic Room Carousel State
    const [classicSlideIndex, setClassicSlideIndex] = useState(0);
    const classicCarouselImages = [
        { src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop", title: "Classic Bedroom 1" },
        { src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000&auto=format&fit=crop", title: "Classic Bedroom 2" },
        { src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop", title: "Classic Bedroom 3" },
        { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop", title: "Classic Bedroom 4" },
        { src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop", title: "Classic Bedroom 5" },
        { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000&auto=format&fit=crop", title: "Classic Bedroom 6" },
        { src: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1000&auto=format&fit=crop", title: "Classic Bedroom 7" }
    ];

    const nextClassicSlide = () => {
        setClassicSlideIndex((prev) => (prev + 1) % classicCarouselImages.length);
    };

    const prevClassicSlide = () => {
        setClassicSlideIndex((prev) => (prev - 1 + classicCarouselImages.length) % classicCarouselImages.length);
    };

    // Info Section Carousel State (Lifestyle/Happy People)
    const [infoSlideIndex, setInfoSlideIndex] = useState(0);
    const infoCarouselImages = [
        { src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1000&auto=format&fit=crop", title: "Happy Guests Pool" },
        { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop", title: "Spa Relaxation" },
        { src: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1000&auto=format&fit=crop", title: "Lobby Welcome" },
        { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop", title: "Fine Dining People" },
        { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop", title: "Coworking Guests" },
        { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop", title: "Team Service" },
        { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop", title: "Event Crowd" }
    ];

    const nextInfoSlide = () => {
        setInfoSlideIndex((prev) => (prev + 1) % infoCarouselImages.length);
    };

    const prevInfoSlide = () => {
        setInfoSlideIndex((prev) => (prev - 1 + infoCarouselImages.length) % infoCarouselImages.length);
    };

    // Other Rooms Section State & Data
    const [activeOtherRoom, setActiveOtherRoom] = useState('superior');
    const otherRooms = [
        { id: 'classic', name: 'CLASSIC', image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000' },
        { id: 'superior', name: 'SUPERIOR', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000' },
        { id: 'deluxe', name: 'DELUXE', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000' },
        { id: 'deluxe-corner', name: 'DELUXE CORNER', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000' },
        { id: 'junior-suite', name: 'JUNIOR SUITE', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000' },
        { id: 'master-suite', name: 'MASTER SUITE', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000' },
        { id: 'grand-suite', name: 'GRAND SUITE & TWO BEDROOM GRAND SUITE', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000' },
        { id: 'family-room', name: 'FAMILY ROOM', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1000' }
    ];

    // Superior Room Carousel State
    const [superiorSlideIndex, setSuperiorSlideIndex] = useState(0);

    const superiorCarouselImages = [
        { src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200", title: "Superior Bedroom" },
        { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200", title: "Superior Detail" },
        { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200", title: "Superior Bathroom" },
        { src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200", title: "Superior View" }
    ];

    const nextSuperiorSlide = () => {
        setSuperiorSlideIndex((prev) => (prev + 1) % superiorCarouselImages.length);
    };

    const prevSuperiorSlide = () => {
        setSuperiorSlideIndex((prev) => (prev - 1 + superiorCarouselImages.length) % superiorCarouselImages.length);
    };

    // Deluxe Room Carousel State
    const [deluxeSlideIndex, setDeluxeSlideIndex] = useState(0);

    const deluxeCarouselImages = [
        { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200", title: "Deluxe Bedroom" },
        { src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200", title: "Deluxe Interior" },
        { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200", title: "Deluxe Detail" }
    ];

    const nextDeluxeSlide = () => {
        setDeluxeSlideIndex((prev) => (prev + 1) % deluxeCarouselImages.length);
    };

    const prevDeluxeSlide = () => {
        setDeluxeSlideIndex((prev) => (prev - 1 + deluxeCarouselImages.length) % deluxeCarouselImages.length);
    };

    // Deluxe Corner Room Carousel State
    const [deluxeCornerSlideIndex, setDeluxeCornerSlideIndex] = useState(0);

    const deluxeCornerCarouselImages = [
        { src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200", title: "Deluxe Corner View" },
        { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200", title: "Deluxe Corner Detail" },
        { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200", title: "Deluxe Corner Bedroom" }
    ];

    const nextDeluxeCornerSlide = () => {
        setDeluxeCornerSlideIndex((prev) => (prev + 1) % deluxeCornerCarouselImages.length);
    };

    const prevDeluxeCornerSlide = () => {
        setDeluxeCornerSlideIndex((prev) => (prev - 1 + deluxeCornerCarouselImages.length) % deluxeCornerCarouselImages.length);
    };

    // Junior Suite Carousel State
    const [juniorSuiteSlideIndex, setJuniorSuiteSlideIndex] = useState(0);

    const juniorSuiteCarouselImages = [
        { src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200", title: "Junior Suite Bedroom" },
        { src: "https://images.unsplash.com/photo-1560448075-bb485b067938?q=80&w=1200", title: "Junior Suite Detail" },
        { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200", title: "Junior Suite Seating" }
    ];

    const nextJuniorSuiteSlide = () => {
        setJuniorSuiteSlideIndex((prev) => (prev + 1) % juniorSuiteCarouselImages.length);
    };

    const prevJuniorSuiteSlide = () => {
        setJuniorSuiteSlideIndex((prev) => (prev - 1 + juniorSuiteCarouselImages.length) % juniorSuiteCarouselImages.length);
    };

    // Rooftop Carousel State
    const [rooftopSliderIndex, setRooftopSliderIndex] = useState(0);
    const rooftopCarouselImages = [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000", // Pool
        "https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=1000", // Cocktail
        "https://images.unsplash.com/photo-1572953109213-3be62398eb95?q=80&w=1000", // View
        "https://images.unsplash.com/photo-1588665792965-01e4c34a1795?q=80&w=1000", // Lounge
        "https://images.unsplash.com/photo-1504198266287-1659872e6590?q=80&w=1000"  // Sunset
    ];

    const nextRooftopSlide = () => {
        setRooftopSliderIndex((prev) => (prev + 1) % rooftopCarouselImages.length);
    };

    const prevRooftopSlide = () => {
        setRooftopSliderIndex((prev) => (prev - 1 + rooftopCarouselImages.length) % rooftopCarouselImages.length);
    };

    const Footer = () => (
        <footer className="hotel-footer">
            {/* Top Bar: Brand & Socials */}
            <div className="footer-top-bar">
                <div className="footer-brand-section">
                    <Star className="footer-brand-icon" size={40} strokeWidth={1} fill="white" />
                    <h2 className="footer-brand-text">GRAND HOTEL CENTRAL</h2>
                </div>
                <div className="footer-social-icons">
                    <a href="#"><Facebook size={20} strokeWidth={1.5} /></a>
                    <a href="#"><Instagram size={20} strokeWidth={1.5} /></a>
                    <a href="#"><Linkedin size={20} strokeWidth={1.5} /></a>
                </div>
            </div>



            {/* Main Content Grid */}
            <div className="footer-content-grid">
                {/* Col 1: Contact */}
                <div className="footer-col contact-col">
                    <h3 className="footer-col-title">GRAND HOTEL CENTRAL</h3>
                    <div className="footer-contact-info">
                        <p>Via Laietana, 30 - 08003 Barcelona</p>
                        <p style={{ marginTop: '1.5rem' }}>+34 932 957 900</p>
                        <p style={{ marginTop: '1.5rem' }}><a href="mailto:info@grandhotelcentral.com">info@grandhotelcentral.com</a></p>
                    </div>
                </div>

                {/* Col 2: Links */}
                <div className="footer-col links-col">
                    <div className="footer-nav-links">
                        <a href="#">Contact</a>
                        <a href="#">Work with us</a>
                        <a href="#">Press</a>
                        <a href="#">Sustainability</a>
                        <a href="#">Faqs</a>
                        <a href="#">Ethics line</a>
                    </div>
                    <div className="footer-legal-links">
                        <a href="#" className="legal-link">Cookies policy</a>
                        <a href="#" className="legal-link">Privacy policy</a>
                        <a href="#" className="legal-link">Legal notice</a>
                    </div>
                </div>

                {/* Col 3: Newsletter */}
                <div className="footer-col newsletter-col">
                    <h3 className="footer-newsletter-title">GET ON THE LIST AND GET UP TO 15% OFF</h3>
                    <form className="footer-newsletter-form">
                        <div className="footer-input-group">
                            <label>Email*</label>
                            <input type="email" />
                        </div>
                        <div className="footer-input-group">
                            <label>Name*</label>
                            <input type="text" />
                        </div>
                        <div className="footer-checkbox-group">
                            <input type="checkbox" id="newsletter-check" />
                            <label htmlFor="newsletter-check">
                                I have read and accept the <a href="#">legal notice</a> and the <a href="#">privacy policy</a>
                            </label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '2rem' }}>
                            <button type="submit" className="footer-submit-btn-text">SEND</button>
                        </div>
                    </form>
                </div>
            </div>
        </footer>
    );

    // Data for the timeline sections
    const timelineData = [
        {
            label: "DESIGN",
            icon: Snowflake,
            title: "TIMELESS ELEGANCE & CONTEMPORARY COMFORT",
            desc: "Inviting rooms with natural light by cutting-edge London design studio, Sagrada.",
            img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2940&auto=format&fit=crop"
        },
        {
            label: "DELIGHTS",
            icon: Sun,
            title: "CULINARY MASTERY & ROOFTOP VIEWS",
            desc: "Experience Mediterranean gastronomy with panoramic views of the Gothic Quarter.",
            img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2940&auto=format&fit=crop"
        },
        {
            label: "DETAIL",
            icon: Flower,
            title: "EVERY DETAIL CONSIDERED",
            desc: "From the thread count of our linens to the acoustic perfection of our spaces.",
            img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2940&auto=format&fit=crop"
        },
        {
            label: "DREAMS",
            icon: Star,
            title: "SLEEP IN CLOUD-LIKE COMFORT",
            desc: "Our signature beds ensure your nights are as memorable as your days.",
            img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2940&auto=format&fit=crop"
        }
    ];

    // Mega Menu Data
    const menuData = {
        hotel: [

            { title: "FOUNDER & HISTORY", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=500&auto=format&fit=crop", action: 'history' },
            { title: "WELLNESS", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=500&auto=format&fit=crop", action: 'wellness' },
            { title: "POOL", img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=500&auto=format&fit=crop", action: 'rooftop' },
            { title: "GET TOGETHER", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=500&auto=format&fit=crop", action: 'gettogether' },
            { title: "LOCATION & NEIGHBOURHOOD", img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=500&auto=format&fit=crop", action: 'location' },
            { title: "GALLERY", img: "https://images.unsplash.com/photo-1506097425191-7ad538b29cef?q=80&w=500&auto=format&fit=crop", action: 'gallery' }
        ],
        rooms: [
            { title: "CLASSIC", img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=500&auto=format&fit=crop", action: 'classic' },
            { title: "SUPERIOR", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=500", action: 'superior' },
            { title: "DELUXE", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=500", action: 'deluxe' },
            { title: "DELUXE CORNER", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=500", action: 'deluxe-corner' },
            { title: "JUNIOR SUITE", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=500", action: 'junior-suite' },
            { title: "MASTER SUITE", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=500", action: 'master-suite' },
            { title: "GRAND SUITE & TWO BEDROOM GRAND SUITE", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=500", action: 'grand-suite' }
        ],
        eat: [
            { title: "RESTAURANT CAN BO", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500", action: 'can-bo' },
            { title: "LA TERRAZA DEL CENTRAL", img: "https://images.unsplash.com/photo-1570213489059-0aac6626cade?q=80&w=500", action: 'terraza' },
            { title: "PRIVATE DINING", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=500", action: 'gettogether' },
            { title: "CHRISTMAS 2025", img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=500", action: 'christmas' }
        ],
        savvy: [
            { title: "WHAT'S ON", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500&auto=format&fit=crop", action: 'whatson' },
            { title: "BARCELONA: SEE, EAT & DO", img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=500&auto=format&fit=crop", action: 'barcelona-guide' },
            { title: "EXPERIENCES", img: "https://images.unsplash.com/photo-1518640027989-a30d5d7e498e?q=80&w=500&auto=format&fit=crop", action: 'experiences' },
            { title: "PASSION FOR ART", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=500&auto=format&fit=crop" }
        ]
    };

    useEffect(() => {
        // Even though it's a single slide, Lenis can stay for any potential overlays enabled later
        const lenis = new Lenis({
            duration: 1.2,
            smooth: true,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }, []);

    // Auto-scroll for Main Suites Carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSuiteIndex((prev) => (prev + 1) % menuData.rooms.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [menuData.rooms.length]);

    // Auto-scroll for Classic Room
    useEffect(() => {
        if (viewMode !== 'classic') return;
        const interval = setInterval(() => {
            setClassicSlideIndex((prev) => (prev + 1) % classicCarouselImages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [viewMode, classicCarouselImages.length]);

    // Auto-scroll for Superior Room
    useEffect(() => {
        if (viewMode !== 'superior') return;
        const interval = setInterval(() => {
            setSuperiorSlideIndex((prev) => (prev + 1) % superiorCarouselImages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [viewMode, superiorCarouselImages.length]);

    // Auto-scroll for Deluxe Room
    useEffect(() => {
        if (viewMode !== 'deluxe') return;
        const interval = setInterval(() => {
            setDeluxeSlideIndex((prev) => (prev + 1) % deluxeCarouselImages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [viewMode, deluxeCarouselImages.length]);

    // Auto-scroll for Deluxe Corner Room
    useEffect(() => {
        if (viewMode !== 'deluxe-corner') return;
        const interval = setInterval(() => {
            setDeluxeCornerSlideIndex((prev) => (prev + 1) % deluxeCornerCarouselImages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [viewMode, deluxeCornerCarouselImages.length]);

    // Auto-scroll for Junior Suite
    useEffect(() => {
        if (viewMode !== 'junior-suite') return;
        const interval = setInterval(() => {
            setJuniorSuiteSlideIndex((prev) => (prev + 1) % juniorSuiteCarouselImages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [viewMode, juniorSuiteCarouselImages.length]);

    // Auto-scroll for Rooftop
    useEffect(() => {
        if (viewMode !== 'rooftop') return;
        const interval = setInterval(() => {
            setRooftopSliderIndex((prev) => (prev + 1) % rooftopCarouselImages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [viewMode, rooftopCarouselImages.length]);

    // Auto-scroll for Info Carousel (assuming visible on hero)
    useEffect(() => {
        if (viewMode !== 'hero') return;
        const interval = setInterval(() => {
            setInfoSlideIndex((prev) => (prev + 1) % infoCarouselImages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [viewMode, infoCarouselImages.length]);

    // Auto-scroll for Can Bo Gallery
    useEffect(() => {
        if (viewMode !== 'can-bo') return;
        const interval = setInterval(() => {
            setCanBoGalleryIndex((prev) => (prev + 1) % canBoGalleryImages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [viewMode, canBoGalleryImages.length]);

    const handleHomeClick = () => {
        setViewMode('hero');
        setShowVideo(true);
        setVideoSrc('/background.mp4'); // Switch to main background video
        setActiveMenu(null);
    };

    const handleTimelineClick = (index) => {
        setViewMode('details');
        setActiveTab(index);
        setActiveMenu(null);
    };

    const handleMenuCardClick = (item) => {
        if (item.action === 'grand-suite') {
            setViewMode('grand-suite');
            setActiveMenu(null);
        } else if (item.action === 'can-bo') {
            setViewMode('can-bo');
            setActiveMenu(null);
        } else if (item.action === 'history') {
            setViewMode('history');
            setActiveMenu(null);
        } else if (item.action === 'wellness') {
            setViewMode('wellness');
            setActiveMenu(null);
        } else if (item.action === 'rooftop') {
            setViewMode('rooftop');
            setShowVideo(false);
            setActiveMenu(null);
        } else if (item.action === 'gettogether') {
            setViewMode('gettogether');
            setShowVideo(false);
            setActiveMenu(null);
        } else if (item.action === 'terraza') {
            setViewMode('terraza');
            setShowVideo(false);
            setActiveMenu(null);
        } else if (item.action === 'christmas') {
            setViewMode('christmas');
            setShowVideo(false);
            setActiveMenu(null);
        } else if (item.action === 'classic') {
            setViewMode('classic');
            setActiveMenu(null);
        } else if (item.action === 'superior') {
            setViewMode('superior');
            setActiveMenu(null);
        } else if (item.action === 'deluxe') {
            setViewMode('deluxe');
            setActiveMenu(null);
        } else if (item.action === 'deluxe-corner') {
            setViewMode('deluxe-corner');
            setActiveMenu(null);
        } else if (item.action === 'junior-suite') {
            setViewMode('junior-suite');
            setActiveMenu(null);
        } else if (item.action === 'master-suite') {
            setViewMode('master-suite');
            setActiveMenu(null);
        } else if (item.action === 'location') {
            setViewMode('location');
            setActiveMenu(null);
        } else if (item.action === 'gallery') {
            setViewMode('gallery');
            setActiveMenu(null);
        } else if (item.action === 'whatson') {
            setViewMode('whatson');
            setActiveMenu(null);
        } else if (item.action === 'barcelona-guide') {
            setViewMode('barcelona-guide');
            setActiveMenu(null);
        } else if (item.action === 'experiences') {
            setViewMode('experiences');
            setActiveMenu(null);
        } else {
            setActiveMenu(null);
        }
    };

    const toggleMenu = (menuName) => {
        if (activeMenu === menuName) {
            setActiveMenu(null);
        } else {
            setActiveMenu(menuName);
        }
    };

    const handleRooftopClick = () => {
        setViewMode('rooftop');
        setShowVideo(false);
        setActiveMenu(null);
    };

    const handleMenuEnter = (menuName) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMenu(menuName);
    };

    const handleMenuLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 150);
    };

    const nextSuite = () => {
        setCurrentSuiteIndex((prev) => (prev + 1) % menuData.rooms.length);
    };

    const prevSuite = () => {
        setCurrentSuiteIndex((prev) => (prev - 1 + menuData.rooms.length) % menuData.rooms.length);
    };

    // Master Suite Carousel State
    const [masterSuiteSlideIndex, setMasterSuiteSlideIndex] = useState(0);
    const masterSuiteCarouselImages = [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2940", // Living Room (Current Hero)
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2940", // Bedroom
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2940", // Bathroom
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2940", // Detail
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2940"  // View
    ];

    const nextMasterSuiteSlide = () => {
        setMasterSuiteSlideIndex((prev) => (prev + 1) % masterSuiteCarouselImages.length);
    };

    const prevMasterSuiteSlide = () => {
        setMasterSuiteSlideIndex((prev) => (prev - 1 + masterSuiteCarouselImages.length) % masterSuiteCarouselImages.length);
    };

    // Grand Suite Carousel State
    const [grandSuiteSlideIndex, setGrandSuiteSlideIndex] = useState(0);
    const grandSuiteCarouselImages = [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2940", // Same as Hero
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2940",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2940",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2940",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2940"
    ];

    const nextGrandSuiteSlide = () => {
        setGrandSuiteSlideIndex((prev) => (prev + 1) % grandSuiteCarouselImages.length);
    };

    const prevGrandSuiteSlide = () => {
        setGrandSuiteSlideIndex((prev) => (prev - 1 + grandSuiteCarouselImages.length) % grandSuiteCarouselImages.length);
    };

    // Rooftop Gallery State
    const [galleryIndex, setGalleryIndex] = useState(0);
    const rooftopImages = [
        // Gallery empty as per user request
    ];

    // Calendar Component
    const CalendarOverlay = () => {
        const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
        // Calendar State
        const [overlayDate, setOverlayDate] = useState(new Date(2025, 11)); // Dec 2025
        const nextMonthDate = new Date(overlayDate.getFullYear(), overlayDate.getMonth() + 1, 1);

        const handleOverlayPrev = () => {
            setOverlayDate(new Date(overlayDate.getFullYear(), overlayDate.getMonth() - 1, 1));
        };

        const handleOverlayNext = () => {
            setOverlayDate(new Date(overlayDate.getFullYear(), overlayDate.getMonth() + 1, 1));
        };

        const renderMonthGrid = (year, month) => {
            const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
            const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Mon styling
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const grid = [];
            for (let i = 0; i < startOffset; i++) grid.push(<div key={`empty-${i}`} className="cal-date empty"></div>);
            for (let d = 1; d <= daysInMonth; d++) {
                // Highlight specific dates for demo (e.g., 18-19 Dec 2025)
                const isSelected = (d === 18 || d === 19) && month === 11 && year === 2025;
                const isRange = isSelected; // Simplified for demo
                grid.push(<div key={d} className={`cal-date ${isSelected ? 'selected' : ''}`}>{d}</div>);
            }
            return grid;
        };


        return (
            <motion.div
                className="calendar-overlay"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="cal-arrow-prev" onClick={handleOverlayPrev}><ChevronLeft size={20} /></button>
                <div className="cal-header-row">
                    <div className="cal-month">
                        <h3>{monthNames[overlayDate.getMonth()]} {overlayDate.getFullYear()}</h3>
                        <div className="cal-grid">
                            {days.map(d => <div key={d} className="cal-day-head">{d}</div>)}
                            {renderMonthGrid(overlayDate.getFullYear(), overlayDate.getMonth())}
                        </div>
                    </div>
                    <div className="cal-month">
                        <h3>{monthNames[nextMonthDate.getMonth()]} {nextMonthDate.getFullYear()}</h3>
                        <div className="cal-grid">
                            {days.map(d => <div key={d} className="cal-day-head">{d}</div>)}
                            {renderMonthGrid(nextMonthDate.getFullYear(), nextMonthDate.getMonth())}
                        </div>
                    </div>
                </div>
                <button className="cal-arrow-next" onClick={handleOverlayNext}><ChevronRight size={20} /></button>

                <div className="cal-footer">
                    <span>Th, 18 December - Fr, 19 December (1 night)</span>
                </div>
            </motion.div>
        );
    };

    // Language Component
    const LanguageOverlay = () => (
        <motion.div
            className="language-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="lang-item"><span className="lang-flag">🇪🇸</span> Español</div>
            <div className="lang-item"><span className="lang-flag">🇫🇷</span> Français</div>
            <div className="lang-item"><span className="lang-flag">🇩🇪</span> Deutsch</div>
        </motion.div>
    );

    // Occupancy Component
    const OccupancyOverlay = () => (
        <motion.div
            className="occupancy-overlay"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="occ-row-main">
                <div className="occ-col">
                    <label>ROOMS</label>
                    <div className="occ-val">ROOM 1</div>
                </div>
                <div className="occ-col">
                    <label>ADULTS</label>
                    <select defaultValue="2"><option>1</option><option>2</option><option>3</option></select>
                </div>
                <div className="occ-col">
                    <label>CHILDREN</label>
                    <select defaultValue="0"><option>0</option><option>1</option><option>2</option></select>
                </div>
            </div>

            <div className="occ-actions">
                <button className="add-room-btn">+ ADD ROOM</button>
                <button className="confirm-btn" onClick={() => setActiveMenu(null)}>CONFIRM</button>
            </div>
        </motion.div>
    );

    const [peopleDropdownOpen, setPeopleDropdownOpen] = useState(false);
    const [selectedPeople, setSelectedPeople] = useState('2 people');
    const peopleOptions = ["1 person", "2 people", "3 people", "4 people", "5 people", "6 people", "7 people", "8 people", "9 people"];

    const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState('Select');
    const timeOptions = ["Select", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30"];

    const handlePeopleSelect = (option) => {
        setSelectedPeople(option);
        setPeopleDropdownOpen(false);
    };

    const handleTimeSelect = (option) => {
        setSelectedTime(option);
        setTimeDropdownOpen(false);
    };

    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11)); // Dec 2025 default
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const renderCalendarGrid = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon...
        // Adjust for Monday start: 0(Sun) -> 6, 1(Mon) -> 0
        const startOffset = firstDay === 0 ? 6 : firstDay - 1;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const grid = [];
        // Empty slots
        for (let i = 0; i < startOffset; i++) {
            grid.push(<div key={`empty-${i}`} className="w-day empty"></div>);
        }
        // Days
        for (let d = 1; d <= daysInMonth; d++) {
            grid.push(
                <div key={d} className={`w-day ${d === 18 && month === 11 && year === 2025 ? 'selected' : ''}`}>
                    {d}
                </div>
            );
        }
        return grid;
    };

    const formattedMonth = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;




    if (viewMode === 'history') {
        return (
            <div className="hotel-container history-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div className="nav-item">ROOMS & SUITES <ChevronDown size={14} /></div>
                        <div className="nav-item">EAT & DRINK <ChevronDown size={14} /></div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">

                        <div className="nav-item relative-parent">
                            <span>EN <ChevronDown size={14} /></span>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div className="nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                </nav>

                {/* Mega Menu Overlay */}
                <AnimatePresence>
                    {(activeMenu === 'hotel') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="history-hero">
                    <div className="history-overlay"></div>
                    <div className="history-content-centered">

                        <h1 className="history-title">FOUNDER & HISTORY</h1>
                        <p className="history-subtitle">The story of a visionary and his historic home</p>

                    </div>
                </section>

                {/* Booking Bar (History View - MOVED ABOVE BREADCRUMBS) */}
                <div className="booking-bar history-booking-bar" onClick={(e) => e.stopPropagation()}>
                    <div className="booking-item" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                        <span className="booking-label">CHECK IN - CHECK OUT</span>
                        <div className="booking-value">SELECT DATES <ChevronDown size={14} /></div>
                    </div>
                    <div className="booking-item" style={{ flex: 1.2, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                        <span className="booking-label">OCCUPANCY</span>
                        <div className="booking-value">1 ROOM, 2 ADULTS <ChevronDown size={14} /></div>
                    </div>
                    <div className="booking-item" style={{ borderRight: 'none' }}>
                        <span className="booking-label">PROMO CODE</span>
                        <div className="booking-value">ENTER CODE</div>
                    </div>
                    <div className="book-btn-container" style={{ minWidth: '250px' }}>
                        <button className="book-btn" style={{ borderRadius: 0 }}>BOOK NOW</button>
                    </div>
                </div>

                <section className="history-info-section">

                    <div className="history-content-block">
                        <p className="history-pre-header">Where things happen first</p>
                        <h2 className="history-main-title">
                            OUR HISTORY
                        </h2>
                        <p className="history-desc-text">
                            Step into the captivating story of the Grand Hotel Central, a majestic building dating back to
                            1926. Two brilliant minds, a visionary politician and patron of the arts, Francesc Cambó and
                            an innovative Noucentista architect, Adolf Florensa. Their creativity and passion combined
                            to shape a revolutionary building. Today, the Grand Hotel Central pays homage to the
                            pioneering spirits of its creators and celebrates its rich history in every corner.
                        </p>
                        <a href="#" className="history-read-more">Read more</a>
                    </div>


                </section>

                <section className="history-founder-section">
                    <div className="founder-content">
                        <div className="founder-text">
                            <h2 className="history-main-title">
                                FRANCESC CAMBÓ
                            </h2>
                            <p className="history-desc-text">
                                Francesc Cambó i Batlle (1876 - 1947) not only a politician but also a cultural visionary. Founder of the Fundació Bernat Metge, the Fundació Bíblica Catalana, the Fundació Hebraico-Catalana and the Editorial Alpha, he dedicated his life to promoting Catalan culture and language. From 1927 to 1936, his passion for art led him to create a remarkable collection, which after his death was donated to museums in Barcelona and Madrid.
                            </p>
                            <a href="#" className="history-read-more">Read more</a>
                        </div>
                        <div className="founder-image-container">
                            <img src="/francesc-cambo.png" alt="Francesc Cambó Portrait" className="founder-image" />
                        </div>
                    </div>
                </section>





                <section className="secrets-redesigned-section">
                    <div className="secrets-left-icon">
                        <img src="/vintage-key.svg" alt="Key" className="secrets-key-icon" />
                    </div>
                    <div className="secrets-center-text">
                        <div className="secrets-gold-title">THE</div>
                        <div className="secrets-gold-title">SECRETS</div>
                        <div className="secrets-mixed-row">
                            <span className="secrets-gold-title">OF</span>
                            <span className="secrets-black-title">CASA</span>
                        </div>
                    </div>
                    <div className="secrets-right-icon">
                        <img src="/rosette-ornament.svg" alt="Rosette" className="secrets-rosette-icon" />
                    </div>
                </section>

                <section className="cambo-name-section">
                    <div className="cambo-name-container">
                        <span className="name-part-serif">FRANCESC</span>
                        <span className="name-part-display">CAMBÓ</span>
                        <span className="name-part-gold">I BATLLE</span>
                    </div>
                    <div className="cambo-image-container">
                        <img src="/lion-knocker.png" alt="Lion Knocker" className="knocker-img-large" />
                    </div>
                </section>














                {/* Booking Bar (Reused) */}
                {/* Booking Bar moved above */}

                <Footer />
            </div >
        );
    }

    if (viewMode === 'whatson') {
        return (
            <div className="hotel-container whatson-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div className="nav-item">ROOMS & SUITES <ChevronDown size={14} /></div>
                        <div className="nav-item">EAT & DRINK <ChevronDown size={14} /></div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="nav-item relative-parent">
                            <span>EN <ChevronDown size={14} /></span>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div className={`nav-item ${activeMenu === 'savvy' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('savvy')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('savvy')}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                </nav>

                {/* Mega Menu Overlay */}
                <AnimatePresence>
                    {(activeMenu === 'hotel' || activeMenu === 'savvy') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="whatson-hero">
                    <div className="whatson-overlay"></div>
                    <div className="whatson-content-centered">
                        <h1 className="whatson-title">WHAT'S ON</h1>
                    </div>
                </section>

                <div className="booking-bar history-booking-bar" onClick={(e) => e.stopPropagation()}>
                    <div className="booking-item" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                        <span className="booking-label">CHECK IN - CHECK OUT</span>
                        <div className="booking-value">SELECT DATES <ChevronDown size={14} /></div>
                    </div>
                    <div className="booking-item" style={{ flex: 1.2, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                        <span className="booking-label">OCCUPANCY</span>
                        <div className="booking-value">1 ROOM, 2 ADULTS <ChevronDown size={14} /></div>
                    </div>
                    <div className="booking-item" style={{ borderRight: 'none' }}>
                        <span className="booking-label">PROMO CODE</span>
                        <div className="booking-value">ENTER CODE</div>
                    </div>
                    <div className="book-btn-container" style={{ minWidth: '250px' }}>
                        <button className="book-btn" style={{ borderRadius: 0 }}>BOOK NOW</button>
                    </div>
                </div>

                <section className="whatson-intro-section">
                    <p className="whatson-preheader">What's on at GRAND HOTEL CENTRAL</p>
                    <h2 className="whatson-main-title">MAKING EVERY<br />MOMENT OF YOUR STAY<br />MEMORABLE</h2>
                    <p className="whatson-description">
                        Discover a world of entertainment at our hotel with our "What's On" offerings! We pride
                        ourselves on providing a range of exciting activities to ensure your stay is not just
                        comfortable but also filled with fun. From live music nights and themed dinners to wellness
                    </p>
                    <a href="#" className="whatson-read-more">Read more</a>
                </section>

                {/* What's On Grid Section */}
                <section className="whatson-grid-section">
                    <div className="whatson-grid">
                        <div className="whatson-card large-card">
                            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop" alt="Sunset Ritual" className="whatson-card-img" />
                            <div className="whatson-card-label">ACTIVITY</div>
                            <div className="whatson-card-title">SUNSET RITUAL</div>
                        </div>
                        <div className="whatson-card tall-card">
                            <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800" alt="New Year's Eve Diner" className="whatson-card-img" />
                            <div className="whatson-card-label">EVENT</div>
                            <div className="whatson-card-content-center">
                                <div className="whatson-card-title-center">NEW YEAR'S EVE<br />DINER</div>
                                <div className="whatson-card-date">31/DEC</div>
                            </div>
                        </div>
                        <div className="whatson-card large-card">
                            <img src="https://images.unsplash.com/photo-1572953109213-3be62398eb95?q=80&w=800" alt="Views and Drinks" className="whatson-card-img" />
                            <div className="whatson-card-label">DRINKS</div>
                            <div className="whatson-card-title">VIEWS AND DRINKS</div>
                            <div className="whatson-card-more">MORE INFO <ArrowRight size={16} /></div>
                        </div>
                        <div className="whatson-card">
                            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800" alt="Wine & Bite" className="whatson-card-img" />
                            <div className="whatson-card-label">TASTING</div>
                            <div className="whatson-card-title">WINE&BITE</div>
                            <div className="whatson-card-subtitle">12pm - 8pm</div>
                        </div>
                        <div className="whatson-card">
                            <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800" alt="Culture" className="whatson-card-img" />
                            <div className="whatson-card-label">CULTURE</div>
                        </div>
                        <div className="whatson-card">
                            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800" alt="Wine Sessions" className="whatson-card-img" />
                            <div className="whatson-card-label">ACTIVITY</div>
                            <div className="whatson-card-title">WINE SESSIONS</div>
                        </div>
                        <div className="whatson-card">
                            <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" alt="Music" className="whatson-card-img" />
                            <div className="whatson-card-label">MUSIC</div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

    if (viewMode === 'barcelona-guide') {
        return (
            <div className="hotel-container barcelona-guide-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'rooms' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('rooms')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('rooms')}
                        >
                            ROOMS & SUITES <ChevronDown size={14} className={activeMenu === 'rooms' ? 'rotate-180' : ''} />
                        </div>
                        <div className="nav-item">EAT & DRINK <ChevronDown size={14} /></div>
                    </div>

                    <div className="header-logo" onClick={() => setViewMode('landing')}>
                        <div className="logo-main">GRAND</div>
                        <div className="logo-sub">HOTEL</div>
                        <div className="logo-central">CENTRAL</div>
                    </div>

                    <div className="header-right">
                        <div className="nav-item">ROOFTOP</div>
                        <div className="nav-item">THE HOUSE</div>
                        <div
                            className={`nav-item ${activeMenu === 'savvy' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('savvy')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('savvy')}
                        >
                            LOCAL SAVVY <ChevronDown size={14} className={activeMenu === 'savvy' ? 'rotate-180' : ''} />
                        </div>
                        <div className="contact-number">+34 932 957 900</div>
                        <div className="lang-selector">EN <ChevronDown size={14} /></div>
                    </div>
                </nav>

                <AnimatePresence>
                    {activeMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="mega-menu"
                            onMouseEnter={() => handleMenuEnter(activeMenu)}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className="menu-content">
                                {menuData[activeMenu].map((item, index) => (
                                    <div className="menu-card" key={index} onClick={() => handleMenuCardClick(item)}>
                                        <div className="card-img-container">
                                            <img src={item.img} alt={item.title} />
                                            <div className="card-overlay"></div>
                                        </div>
                                        <div className="card-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="barcelona-hero">
                    <div className="barcelona-overlay"></div>
                    <div className="barcelona-content-centered">
                        <h1 className="barcelona-title">EXPERTLY CURATED<br />TRAVEL GUIDE</h1>
                    </div>
                </section>

                <section className="barcelona-intro-section">
                    <div className="barcelona-intro-container">
                        <div className="barcelona-text-col">
                            <h2 className="barcelona-intro-title">CONOCE BARCELONA<br />CON GRAND HOTEL<br />CENTRAL</h2>
                            <p className="barcelona-intro-text">
                                ¿Te gusta nuestro hotel? Entonces seguro que también te
                                encantará Barcelona.
                            </p>
                            <p className="barcelona-intro-text">
                                ¿Por qué no ampliar esta experiencia a toda la ciudad?
                                Recorre Barcelona de la mano de aquellos cuya
                                creatividad y sensibilidad han hecho de este hotel un lugar
                                tan especial. ¿Quién mejor para sugerirte dónde comer,
                                beber, sentir y disfrutar de Barcelona?
                            </p>
                            <p className="barcelona-intro-text">
                                ¡Bienvenido a Barcelona, bienvenido al Grand Hotel Central!
                            </p>
                            <button className="barcelona-download-btn">DESCARGAR GUÍA</button>
                        </div>
                        <div className="barcelona-image-col">
                            <img src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=800&auto=format&fit=crop" alt="Barcelona Guide" className="barcelona-book-img" />
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

    if (viewMode === 'experiences') {
        return (
            <div className="hotel-container experiences-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'rooms' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('rooms')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('rooms')}
                        >
                            ROOMS & SUITES <ChevronDown size={14} className={activeMenu === 'rooms' ? 'rotate-180' : ''} />
                        </div>
                        <div className="nav-item">EAT & DRINK <ChevronDown size={14} /></div>
                    </div>

                    <div className="header-logo" onClick={() => setViewMode('landing')}>
                        <div className="logo-main">GRAND</div>
                        <div className="logo-sub">HOTEL</div>
                        <div className="logo-central">CENTRAL</div>
                    </div>

                    <div className="header-right">
                        <div className="nav-item">ROOFTOP</div>
                        <div className="nav-item">THE HOUSE</div>
                        <div
                            className={`nav-item ${activeMenu === 'savvy' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('savvy')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('savvy')}
                        >
                            LOCAL SAVVY <ChevronDown size={14} className={activeMenu === 'savvy' ? 'rotate-180' : ''} />
                        </div>
                        <div className="contact-number">+34 932 957 900</div>
                        <div className="lang-selector">EN <ChevronDown size={14} /></div>
                    </div>
                </nav>

                <AnimatePresence>
                    {activeMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="mega-menu"
                            onMouseEnter={() => handleMenuEnter(activeMenu)}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className="menu-content">
                                {menuData[activeMenu].map((item, index) => (
                                    <div className="menu-card" key={index} onClick={() => handleMenuCardClick(item)}>
                                        <div className="card-img-container">
                                            <img src={item.img} alt={item.title} />
                                            <div className="card-overlay"></div>
                                        </div>
                                        <div className="card-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="experiences-hero">
                    <div className="experiences-overlay"></div>
                    <div className="experiences-content-centered">
                        <h1 className="experiences-title">EXPERIENCIAS<br />EXCLUSIVAS</h1>
                        <p className="experiences-subtitle">Aventuras diseñadas para viajeros sofisticados</p>
                    </div>
                </section>

                <div className="booking-bar history-booking-bar">
                    <div className="booking-item">
                        <span className="booking-label">CHECK-IN</span>
                        <div className="booking-value">
                            24 DEC <ChevronDown size={14} />
                        </div>
                    </div>
                    <div className="booking-item">
                        <span className="booking-label">CHECK-OUT</span>
                        <div className="booking-value">
                            28 DEC <ChevronDown size={14} />
                        </div>
                    </div>
                    <div className="booking-item" onClick={() => setPeopleDropdownOpen(!peopleDropdownOpen)}>
                        <span className="booking-label">PEOPLE</span>
                        <div className="booking-value">
                            2 ADULTS <ChevronDown size={14} />
                        </div>
                    </div>
                    <div className="booking-item">
                        <span className="booking-label">PROMO CODE</span>
                        <div className="booking-value">
                            ENTER CODE <ChevronDown size={14} />
                        </div>
                    </div>
                    <div className="book-btn">BOOK</div>
                </div>

                <div className="experiences-breadcrumbs">
                    <span>HOME</span> {'>'} <span>LOCAL SAVVY</span> {'>'} <span className="current">EXPERIENCIAS</span> {'>'}
                </div>

                <section className="experiences-intro">
                    <div className="experiences-intro-preheader">Qué hacer en Barcelona</div>
                    <h2 className="experiences-intro-title">UNA CIUDAD LLENA DE<br />CULTURA Y DIVERSIÓN</h2>
                    <p className="experiences-intro-desc">
                        Descubre nuestras experiencias personalizadas y descubre todo lo que la vibrante Ciudad
                        Condal ofrece.
                    </p>
                </section>

                <Footer />
            </div>
        );
    }




    if (viewMode === 'master-suite') {
        return (
            <div className="hotel-container master-suite-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'rooms' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('rooms')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('rooms')}
                        >
                            ROOMS & SUITES <ChevronDown size={14} className={activeMenu === 'rooms' ? 'rotate-180' : ''} />
                        </div>
                        <div className="nav-item">EAT & DRINK <ChevronDown size={14} /></div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="phone-box">+34 932 957 900</div>
                        <div className="nav-item relative-parent">
                            <span>EN <ChevronDown size={14} /></span>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div className="nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} /></div>
                        </div>
                    </div>
                    <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </div>
                </nav>

                {/* Mega Menu Overlay */}
                <AnimatePresence>
                    {(activeMenu === 'hotel' || activeMenu === 'rooms') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="master-suite-hero">
                    <div className="hero-overlay-responsive"></div>

                    <div className="hero-content" style={{ zIndex: 10, textAlign: 'center', color: 'white' }}>
                        <h1 className="master-suite-hero-title">MASTER SUITE</h1>
                    </div>

                    {/* Booking Bar (Reused) */}
                    <div className="booking-bar" onClick={(e) => e.stopPropagation()}>
                        <div className="booking-item">
                            <span className="booking-label">CHECK IN - CHECK OUT</span>
                            <div className="booking-value">SELECT DATES <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ flex: 1.2 }}>
                            <span className="booking-label">OCCUPANCY</span>
                            <div className="booking-value">1 ROOM, 2 ADULTS <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item">
                            <span className="booking-label">PROMO CODE</span>
                            <div className="booking-value">ENTER CODE</div>
                        </div>
                        <div className="book-btn-container">
                            <button className="book-btn">BOOK NOW</button>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <div style={{ backgroundColor: '#f9f9f9', paddingBottom: '4rem' }}>
                    <div className="breadcrumbs" style={{ padding: '2rem 3rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em', fontFamily: 'var(--hotel-font-sans)' }}>
                        <span style={{ cursor: 'pointer' }} onClick={handleHomeClick}>HOME</span> &nbsp; &gt; &nbsp;
                        <span style={{ cursor: 'pointer' }} onClick={() => toggleMenu('rooms')}>ROOMS & SUITES</span> &nbsp; &gt; &nbsp;
                        <span style={{ color: '#121212', fontWeight: '600' }}>MASTER SUITE</span> &nbsp; &gt;
                    </div>

                    <div className="room-info-grid">
                        <div className="room-info-item">
                            <span className="room-info-label-blue">MASTER<br />SUITE</span>
                        </div>
                        <div className="room-info-item">
                            <span className="room-info-val-large">2 - 4</span>
                            <span className="room-info-sub">GUESTS</span>
                        </div>
                        <div className="room-info-item">
                            <span className="room-info-val-med">SURFACE AREA 56 M2</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: '300' }}>(603 SQ.FT)</span>
                        </div>
                        <div className="room-info-item">
                            <span className="room-info-val-med">KING</span>
                            <span className="room-info-val-med">SIZE</span>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', padding: '6rem 0 4rem' }}>
                        <h2 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '5rem', fontWeight: '400', textTransform: 'uppercase', color: '#121212', margin: 0, lineHeight: '1' }}>LUXURIOUS AND</h2>
                        <h2 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '5rem', fontWeight: '400', textTransform: 'uppercase', color: '#121212', margin: 0, lineHeight: '1' }}>UNIQUE</h2>

                        <div style={{ maxWidth: '850px', margin: '4rem auto 0', fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
                            <p style={{ marginBottom: '3rem' }}>
                                Our Master Suite exudes calm and comfort. Panelled throughout, with separate areas for
                                relaxing and sleeping. A living room with sofa bed and armchair, coffee table and dining
                                table for 4. The luxury bathroom is equipped with shower and bathtub. Walk-in closet with
                                triptych mirror. A large space that can accommodate up to three adults in great comfort or
                                two adults and two children.
                            </p>

                            <p style={{ fontWeight: '600', color: '#333', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                Guests who book a suite category directly with the hotel will enjoy private round-trip
                                transportation from the Barcelona airport, Sants train station, or Barcelona's cruise
                                terminal, as well as exclusive access to the sauna and hammam, and a complimentary
                                60-minute massage for one person
                            </p>

                            <button style={{
                                backgroundColor: '#333',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 3rem',
                                fontSize: '0.9rem',
                                letterSpacing: '0.05em',
                                cursor: 'pointer',
                                textTransform: 'uppercase'
                            }}>
                                BOOK NOW
                            </button>
                        </div>
                    </div>

                    {/* Master Suite Carousel */}
                    <div style={{ position: 'relative', width: '100%', height: '80vh', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                            <img
                                src={masterSuiteCarouselImages[masterSuiteSlideIndex]}
                                alt={`Master Suite ${masterSuiteSlideIndex}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s ease-in-out' }}
                            />
                        </div>

                        {/* Navigation Arrows */}
                        <div
                            onClick={prevMasterSuiteSlide}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '2rem',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                zIndex: 10,
                                color: 'white',
                                filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))'
                            }}
                        >
                            <ChevronLeft size={60} strokeWidth={1} />
                        </div>
                        <div
                            onClick={nextMasterSuiteSlide}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '2rem',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                zIndex: 10,
                                color: 'white',
                                filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))'
                            }}
                        >
                            <ChevronRight size={60} strokeWidth={1} />
                        </div>

                        {/* TOUR 360 Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '2rem',
                            left: '2rem',
                            border: '1px solid rgba(255, 255, 255, 0.6)',
                            padding: '0.5rem 1rem',
                            color: 'white',
                            fontSize: '0.9rem',
                            letterSpacing: '0.1em',
                            zIndex: 10,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            cursor: 'pointer'
                        }}>
                            TOUR 360
                        </div>
                    </div>

                    {/* Home Away From Home & Facilities Section */}
                    <div style={{ display: 'flex', width: '100%', minHeight: '80vh' }}>
                        {/* Text Column */}
                        <div style={{ flex: 1, padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#fff' }}>
                            <h2 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '3.5rem', fontWeight: '400', color: '#121212', marginBottom: '2rem', lineHeight: '1.1', textTransform: 'uppercase' }}>
                                A HOME AWAY FROM<br />HOME
                            </h2>
                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', lineHeight: '1.6', color: '#333', marginBottom: '1.5rem', maxWidth: '500px' }}>
                                In 2024 the London based design studio Sagrada renovated
                                all our rooms. Our furniture is bespoke, being inspired by the
                                simple lines of the Catalan Noucentisme movement.
                            </p>
                            <div style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', fontWeight: '600', color: '#333', textDecoration: 'underline', cursor: 'pointer', marginBottom: '4rem' }}>
                                Read more
                            </div>

                            <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2.5rem', fontWeight: '400', color: '#5b7cf7', marginBottom: '2rem', textTransform: 'uppercase' }}>
                                FACILITIES
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontFamily: 'var(--hotel-font-sans)', fontSize: '0.9rem', color: '#333', maxWidth: '700px', marginBottom: '4rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <span>Welcome amenities</span>
                                    <span>Complimentary coffee & tea service</span>
                                    <span>Carner Barcelona vegan amenities</span>
                                    <span>300 thread count 100% Egyptian cotton sheets</span>
                                    <span>Bathrobe & slippers</span>
                                    <span>Premium minibar</span>
                                    <span>24 hour room service</span>
                                    <span>Individually controlled heating and air-conditioning</span>
                                    <span>Laundry service</span>
                                    <span>Daily turndown service</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <span>In-room hair dryer & straightener ghd ®</span>
                                    <span>Steamer, iron & ironing board</span>
                                    <span>Separate rainshower & bathtub</span>
                                    <span>High Speed Free Wi-Fi</span>
                                    <span>Two 55-inch Samsung 4K High definition TV. Chromecast media connectivity.</span>
                                    <span>International electrical outlets and USB charging</span>
                                    <span>Safe-deposit box</span>
                                    <span>Complimentary private access to the wellbeing area, Spa & Hammam</span>
                                    <span>Baby cot, on request</span>
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid #ccc', paddingTop: '2rem', width: '100%', maxWidth: '700px' }}>
                                <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', color: '#333', marginBottom: '1.5rem' }}>
                                    Booking directly with us, all our suites include:
                                </p>
                                <ul style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', color: '#333', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li>60-minute massage for 1 person</li>
                                    <li>Complimentary round-trip transfer (guaranteed for bookings of at least 48 hours in advance)</li>
                                </ul>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div style={{ flex: 1, position: 'relative' }}>
                            <img
                                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2940"
                                alt="Master Suite Detail"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Other Rooms & Suites Section */}
                    <div style={{ display: 'flex', width: '100%', height: '100vh', maxHeight: '900px' }}>
                        {/* Dynamic Image Left */}
                        <div style={{ flex: 1, position: 'relative' }}>
                            <img
                                src={otherRooms.find(r => r.id === activeOtherRoom)?.image || otherRooms[0].image}
                                alt="Room Preview"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
                            />
                        </div>

                        {/* Rooms List Right */}
                        <div style={{ flex: 1, backgroundColor: '#Eaece6', padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', fontWeight: '300', textTransform: 'uppercase', marginBottom: '3rem', color: '#121212' }}>
                                OTHER ROOMS & SUITES
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {otherRooms.filter(room => room.id !== 'master-suite').map((room) => (
                                    <div
                                        key={room.id}
                                        onMouseEnter={() => setActiveOtherRoom(room.id)}
                                        onClick={() => {
                                            // Optional: Navigate to that room view
                                            if (room.id === 'classic') setViewMode('classic');
                                            // Add other view transitions as needed or just keep it as a gallery for now
                                        }}
                                        style={{
                                            fontFamily: 'var(--hotel-font-serif)',
                                            fontSize: '2.5rem',
                                            cursor: 'pointer',
                                            color: activeOtherRoom === room.id ? '#00bfff' : '#121212', // Cyan-blue for active
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            transition: 'color 0.3s ease',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {activeOtherRoom === room.id && <ChevronLeft size={24} />}
                                        {room.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="mobile-menu-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
                                <X size={32} />
                            </button>
                            <div className="mobile-menu-item" onClick={() => { setActiveMenu('hotel'); setMobileMenuOpen(false); }}>HOTEL</div>
                            <div className="mobile-menu-item" onClick={() => { setActiveMenu('rooms'); setMobileMenuOpen(false); }}>ROOMS & SUITES</div>
                            <div className="mobile-menu-item" onClick={() => { setActiveMenu('eat'); setMobileMenuOpen(false); }}>EAT & DRINK</div>
                            <div className="mobile-menu-item" onClick={() => { setActiveMenu('savvy'); setMobileMenuOpen(false); }}>LOCAL SAVVY</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Footer />
            </div>
        );
    }

    if (viewMode === 'grand-suite') {
        return (
            <div className="hotel-container grand-suite-view" style={{ backgroundColor: '#fff', color: '#000' }} onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()} style={{ color: 'white' }}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'rooms' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('rooms')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('rooms')}
                        >
                            ROOMS & SUITES <ChevronDown size={14} className={activeMenu === 'rooms' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'eat' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('eat')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('eat')}
                        >
                            EAT & DRINK <ChevronDown size={14} className={activeMenu === 'eat' ? 'rotate-180' : ''} />
                        </div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">

                        <div className="nav-item relative-parent">
                            <span>EN <ChevronDown size={14} /></span>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div className="nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                </nav>

                <AnimatePresence>
                    {(activeMenu === 'hotel' || activeMenu === 'rooms' || activeMenu === 'eat' || activeMenu === 'savvy') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hero Section */}
                {/* Hero Section */}
                <div className="grand-suite-hero">
                    <img
                        src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2940"
                        alt="Grand Suite"
                        className="grand-suite-hero-img"
                    />
                    <div className="grand-suite-hero-overlay">
                        <h1 className="grand-suite-hero-title">
                            GRAND SUITE & TWO<br />BEDROOM GRAND<br />SUITE
                        </h1>
                    </div>

                    {/* Booking Bar */}
                    <div className="booking-bar" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', margin: 0, background: 'rgba(0,0,0,0.6)', borderTop: 'none', zIndex: 10, backdropFilter: 'blur(5px)', color: 'white' }} onClick={(e) => e.stopPropagation()}>
                        <div className="booking-item" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">CHECK IN - CHECK OUT</span>
                            <div className="booking-value">SELECT DATES <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ flex: 1.2, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">OCCUPANCY</span>
                            <div className="booking-value">1 ROOM, 2 ADULTS <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ borderRight: 'none' }}>
                            <span className="booking-label">PROMO CODE</span>
                            <div className="booking-value">ENTER CODE</div>
                        </div>
                        <div className="book-btn-container" style={{ minWidth: '250px' }}>
                            <button className="book-btn" style={{ borderRadius: 0, background: '#D65D3B' }}>BOOK NOW</button>
                        </div>
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div style={{ padding: '2rem 4rem', fontSize: '0.8rem', letterSpacing: '0.05em', color: '#666', fontFamily: 'var(--hotel-font-sans)', textTransform: 'uppercase' }}>
                    <span>HOME &gt;</span>
                    <span style={{ margin: '0 0.5rem' }}>ROOMS & SUITES &gt;</span>
                    <span style={{ fontWeight: 'bold', color: '#000' }}>GRAND SUITE & TWO BEDROOM GRAND SUITE &gt;</span>
                </div>

                {/* Info Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '1.5rem 4rem' }}>
                    <div style={{ borderRight: '1px solid #ddd', paddingRight: '2rem' }}>
                        <span style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '1.2rem', color: '#5b7cf7' }}>GRAND SUITE</span>
                    </div>
                    <div style={{ borderRight: '1px solid #ddd', paddingRight: '2rem', paddingLeft: '2rem' }}>
                        <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold' }}>4</span>
                        <span style={{ fontSize: '0.7rem' }}>GUESTS</span>
                    </div>
                    <div style={{ borderRight: '1px solid #ddd', paddingRight: '2rem', paddingLeft: '2rem' }}>
                        <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold' }}>SURFACE AREA</span>
                        <span style={{ fontSize: '0.7rem' }}>65 M2 (700 SQ.FT)</span>
                    </div>
                    <div style={{ paddingLeft: '2rem' }}>
                        <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold' }}>KING SIZE</span>
                    </div>
                </div>

                {/* Title Section */}
                <div style={{ textAlign: 'center', padding: '6rem 2rem 2rem' }}>
                    <h2 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '3rem', fontWeight: '300', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#121212' }}>
                        EXCLUSIVE ELEGANCE
                    </h2>
                </div>

                {/* Description Text */}
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', paddingBottom: '4rem', fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', lineHeight: '1.8', color: '#333' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Our Grand Suite is the epitome of luxury and comfort. Featuring a spacious living area, a separate bedroom with a King-size bed, and a large bathroom with a soaking tub and rain shower.
                    </p>
                    <p style={{ fontWeight: '600' }}>
                        Enjoy stunning views of the city from your private balcony. Perfect for families or travelers seeking extra space and privacy.
                    </p>
                    <button style={{
                        marginTop: '3rem',
                        backgroundColor: '#D65D3B',
                        color: 'white',
                        border: 'none',
                        padding: '1rem 3rem',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        letterSpacing: '0.1em',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#b54d31'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#D65D3B'}
                    >
                        BOOK NOW
                    </button>
                </div>

                {/* Carousel */}
                <section className="grand-suite-carousel-section" style={{ padding: '0 0 6rem 0', position: 'relative' }}>
                    <div className="carousel-container" style={{ position: 'relative', width: '100%', height: '80vh', overflow: 'hidden' }}>
                        <button className="carousel-btn prev" onClick={prevGrandSuiteSlide} style={{
                            position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'none', border: 'none', color: 'white', cursor: 'pointer'
                        }}><ChevronLeft size={40} /></button>

                        <div className="carousel-track" style={{ width: '100%', height: '100%' }}>
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={grandSuiteSlideIndex}
                                    src={grandSuiteCarouselImages[grandSuiteSlideIndex]}
                                    alt="Grand Suite Gallery"
                                    className="carousel-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </AnimatePresence>
                        </div>

                        <button className="carousel-btn next" onClick={nextGrandSuiteSlide} style={{
                            position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'none', border: 'none', color: 'white', cursor: 'pointer'
                        }}><ChevronRight size={40} /></button>

                        <div style={{
                            position: 'absolute',
                            bottom: '2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'white',
                            border: '1px solid white',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backdropFilter: 'blur(5px)',
                            cursor: 'pointer'
                        }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>TOUR 360</span>
                        </div>
                    </div>
                </section>

                {/* Facilities & Info Section */}
                <div style={{ display: 'flex', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 4rem 6rem' }}>
                    {/* Text Column */}
                    <div style={{ flex: 1, paddingRight: '4rem' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '3rem', fontWeight: '300', lineHeight: '1.2', color: '#121212', marginBottom: '1.5rem' }}>
                                A HOME AWAY FROM HOME
                            </h2>
                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', lineHeight: '1.6', color: '#666', marginBottom: '1.5rem' }}>
                                Designed for those who value space and exclusivity. The Grand Suite offers a unique blend of modern design and warm comfort.
                            </p>
                            <div style={{
                                display: 'inline-block',
                                borderBottom: '1px solid #000',
                                paddingBottom: '2px',
                                fontFamily: 'var(--hotel-font-sans)',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}>
                                Read more
                            </div>

                            <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2.5rem', fontWeight: '400', color: '#5b7cf7', marginBottom: '2rem', textTransform: 'uppercase', marginTop: '3rem' }}>
                                FACILITIES
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontFamily: 'var(--hotel-font-sans)', fontSize: '0.9rem', color: '#333', maxWidth: '700px', marginBottom: '4rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <span>Welcome amenities</span>
                                    <span>Complimentary coffee & tea service</span>
                                    <span>Carner Barcelona vegan amenities</span>
                                    <span>300 thread count 100% Egyptian cotton sheets</span>
                                    <span>Bathrobe & slippers</span>
                                    <span>Premium minibar</span>
                                    <span>24 hour room service</span>
                                    <span>Individually controlled heating and air-conditioning</span>
                                    <span>Laundry service</span>
                                    <span>Daily turndown service</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <span>In-room hair dryer & straightener ghd ®</span>
                                    <span>Steamer, iron & ironing board</span>
                                    <span>Separate rainshower & bathtub</span>
                                    <span>High Speed Free Wi-Fi</span>
                                    <span>Two 55-inch Samsung 4K High definition TV. Chromecast media connectivity.</span>
                                    <span>International electrical outlets and USB charging</span>
                                    <span>Safe-deposit box</span>
                                    <span>Complimentary private access to the wellbeing area, Spa & Hammam</span>
                                    <span>Baby cot, on request</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div style={{ flex: 1, position: 'relative' }}>
                        <img
                            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2940"
                            alt="Grand Suite Detail"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>

                {/* Other Rooms & Suites Section */}
                <div style={{ display: 'flex', width: '100%', height: '100vh', maxHeight: '900px' }}>
                    {/* Dynamic Image Left */}
                    <div style={{ flex: 1, position: 'relative' }}>
                        <img
                            src={otherRooms.find(r => r.id === activeOtherRoom)?.image || otherRooms[0].image}
                            alt="Room Preview"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
                        />
                    </div>

                    {/* Rooms List Right */}
                    <div style={{ flex: 1, backgroundColor: '#Eaece6', padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', fontWeight: '300', textTransform: 'uppercase', marginBottom: '3rem', color: '#121212' }}>
                            OTHER ROOMS & SUITES
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {otherRooms.filter(room => room.id !== 'grand-suite').map((room) => (
                                <div
                                    key={room.id}
                                    onMouseEnter={() => setActiveOtherRoom(room.id)}
                                    onClick={() => {
                                        if (room.id === 'classic') setViewMode('classic');
                                        if (room.id === 'master-suite') setViewMode('master-suite');
                                        if (room.id === 'grand-suite') setViewMode('grand-suite');
                                        // Handle others
                                    }}
                                    style={{
                                        fontFamily: 'var(--hotel-font-serif)',
                                        fontSize: '2.5rem',
                                        cursor: 'pointer',
                                        color: activeOtherRoom === room.id ? '#00bfff' : '#121212',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        transition: 'color 0.3s ease',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {activeOtherRoom === room.id && <ChevronLeft size={24} />}
                                    {room.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }

    if (viewMode === 'terraza') {
        return (
            <div className="hotel-container terraza-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()} style={{ color: 'white' }}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'rooms' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('rooms')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('rooms')}
                        >
                            ROOMS & SUITES <ChevronDown size={14} className={activeMenu === 'rooms' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'eat' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('eat')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('eat')}
                        >
                            EAT & DRINK <ChevronDown size={14} className={activeMenu === 'eat' ? 'rotate-180' : ''} />
                        </div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="phone-box">+34 932 957 900</div>
                        <div className="nav-item relative-parent">
                            <span>EN <ChevronDown size={14} /></span>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div className="nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} /></div>
                        </div>
                    </div>
                </nav>

                <AnimatePresence>
                    {(activeMenu === 'hotel' || activeMenu === 'rooms' || activeMenu === 'eat') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="terraza-hero">
                    <div className="hero-overlay-responsive"></div>

                    <div className="hero-content-responsive">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h1 className="terraza-hero-title">
                                LA TERRAZA DEL<br />CENTRAL
                            </h1>
                            <p className="terraza-hero-subtitle">
                                Bar, restaurant & infinity pool with panoramic views of Barcelona
                            </p>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

    if (viewMode === 'can-bo') {
        return (
            <div className="hotel-container can-bo-view" style={{ backgroundColor: '#fff', color: '#000' }} onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()} style={{ color: 'white' }}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'rooms' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('rooms')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('rooms')}
                        >
                            ROOMS & SUITES <ChevronDown size={14} className={activeMenu === 'rooms' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'eat' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('eat')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('eat')}
                        >
                            EAT & DRINK <ChevronDown size={14} className={activeMenu === 'eat' ? 'rotate-180' : ''} />
                        </div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">

                        <div className="nav-item relative-parent">
                            <span>EN <ChevronDown size={14} /></span>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div className="nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                </nav>

                <AnimatePresence>
                    {(activeMenu === 'hotel' || activeMenu === 'rooms' || activeMenu === 'eat' || activeMenu === 'savvy') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hero Section */}
                {/* Hero Section */}
                <div className="can-bo-hero">
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940"
                        alt="Restaurant Can Bo"
                        className="can-bo-hero-img"
                    />
                    <div className="can-bo-hero-overlay">
                        <h1 className="can-bo-hero-title">
                            CAN BO, TAPAS AND<br />WINE RESTAURANT<br />IN THE HEART OF<br />BARCELONA
                        </h1>
                        <p className="can-bo-hero-subtitle">
                            Tapas and sharing plates crafted by chef Oliver Peña. Extensive wine cellar.
                        </p>
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div style={{ padding: '2rem 4rem', fontSize: '0.8rem', letterSpacing: '0.05em', color: '#666', fontFamily: 'var(--hotel-font-sans)', textTransform: 'uppercase' }}>
                    <span style={{ cursor: 'pointer' }} onClick={handleHomeClick}>HOME &gt;</span>
                    <span style={{ margin: '0 0.5rem', cursor: 'pointer' }}>EAT & DRINK &gt;</span>
                    <span style={{ fontWeight: 'bold', color: '#000' }}>RESTAURANT CAN BO &gt;</span>
                </div>

                {/* Content Section */}
                <div className="can-bo-section-padded" style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                    <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.2rem', color: '#333', marginBottom: '1rem' }}>
                        Local food for discerning palates
                    </p>
                    <h2 className="title-large" style={{ color: '#121212', marginBottom: '3rem', lineHeight: '1.2' }}>
                        dining, wines,<br />cocktails & fun
                    </h2>
                    <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', lineHeight: '1.8', color: '#333', maxWidth: '800px', margin: '0 auto 4rem' }}>
                        Welcome to <strong>Can Bo vins & tapes</strong>, the streetside restaurant of our luxury hotel in Barcelona.<br />
                        A vibrant meeting spot in Ciutat Vella where you can savour the finest in Spanish cuisine.
                    </p>
                    <div className="ven-read-more">
                        Read more
                    </div>
                </div>

                {/* What's On Section */}
                <div style={{ backgroundColor: '#EAECE6', padding: '6rem 4rem', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '3rem', fontWeight: '300', textTransform: 'uppercase', color: '#121212', marginBottom: '4rem' }}>
                        WHAT'S ON
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '1rem' }}><ChevronLeft size={30} color="#121212" /></button>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', width: '100%' }}>
                            {/* Card 1 */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                                <div style={{ height: '400px', width: '100%' }}>
                                    <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=600" alt="Christmas Menus" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <span style={{ border: '1px solid #333', padding: '0.3rem 0.8rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CHRISTMAS</span>
                                </div>
                                <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', fontWeight: '300', textTransform: 'uppercase', lineHeight: '1.1', color: '#121212', margin: '0' }}>
                                    CHRISTMAS<br />MENUS
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer' }}>
                                    MORE INFO <ChevronRight size={16} />
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                                <div style={{ height: '400px', width: '100%' }}>
                                    <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600" alt="New Year's Eve" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <span style={{ border: '1px solid #333', padding: '0.3rem 0.8rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>EVENT</span>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>December 31</div>
                                    <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', fontWeight: '300', textTransform: 'uppercase', lineHeight: '1.1', color: '#121212', margin: '0' }}>
                                        NEW YEAR'S<br />EVE DINER
                                    </h3>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer' }}>
                                    MORE INFO <ChevronRight size={16} />
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                                <div style={{ height: '400px', width: '100%' }}>
                                    <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600" alt="Wine & Bite" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <span style={{ border: '1px solid #333', padding: '0.3rem 0.8rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TASTING</span>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Everyday</div>
                                    <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', fontWeight: '300', textTransform: 'uppercase', lineHeight: '1.1', color: '#121212', margin: '0' }}>
                                        WINE&BITE
                                    </h3>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer' }}>
                                    MORE INFO <ChevronRight size={16} />
                                </div>
                            </div>
                        </div>

                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '1rem' }}><ChevronRight size={30} color="#121212" /></button>
                    </div>
                </div>

                <div style={{ backgroundColor: '#F0F2EB', padding: '6rem 4rem' }}>
                    <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', gap: '4rem' }}>
                        {/* Left Column - Info */}
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <h2 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2.5rem', fontWeight: '300', textTransform: 'uppercase', color: '#121212', marginBottom: '2rem', lineHeight: '1.2' }}>
                                OPENING HOURS &<br />MENUS
                            </h2>
                            <div style={{ width: '100%', height: '1px', backgroundColor: '#ddd', marginBottom: '2rem' }}></div>

                            <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '1.8rem', fontWeight: '300', textTransform: 'uppercase', color: '#121212', marginBottom: '1.5rem' }}>
                                CAN BO RESTAURANT
                            </h3>
                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', lineHeight: '1.6', color: '#333', marginBottom: '1rem' }}>
                                From 12.30pm to 12am<br />
                                Kitchen open from 12.30pm to 10.30pm
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', marginBottom: '2rem' }}>
                                VIEW MENU <div style={{ transform: 'rotate(-45deg)', display: 'inline-block' }}>→</div>
                            </div>

                            <div style={{ width: '100%', height: '1px', backgroundColor: '#ddd', marginBottom: '2rem' }}></div>

                            <h2 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2.5rem', fontWeight: '300', textTransform: 'uppercase', color: '#121212', marginBottom: '1.5rem' }}>
                                INFO & BOOKINGS
                            </h2>
                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', lineHeight: '1.8', color: '#333' }}>
                                Via Laietana, 30 - 08003 Barcelona<br />
                                +34 932 957 905<br />
                                info@canbo.es
                            </p>

                            <div style={{ marginTop: '3rem', width: '100%', height: '300px', borderRadius: '8px', overflow: 'hidden' }}>
                                <img src="/assets/canbo/canbo_paella.jpg" alt="Paella at Can Bo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>

                        {/* Right Column - Booking Widget */}
                        <div style={{ flex: 1, position: 'relative' }}>
                            {/* Calendar Header */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', fontWeight: 'bold', fontFamily: 'var(--hotel-font-sans)' }}>
                                <div style={{ fontSize: '0.8rem', color: '#999', cursor: 'pointer' }} onClick={handleCanBoPrevMonth}>◄</div>
                                <div style={{ textTransform: 'uppercase' }}>{canBoDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                                <div style={{ fontSize: '0.8rem', color: '#000', cursor: 'pointer' }} onClick={handleCanBoNextMonth}>►</div>
                            </div>

                            {/* Calendar Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontFamily: 'var(--hotel-font-sans)', fontSize: '0.8rem', rowGap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ fontWeight: 'bold' }}>Mo</div><div style={{ fontWeight: 'bold' }}>Tu</div><div style={{ fontWeight: 'bold' }}>We</div><div style={{ fontWeight: 'bold' }}>Th</div><div style={{ fontWeight: 'bold' }}>Fr</div><div style={{ fontWeight: 'bold' }}>Sa</div><div style={{ fontWeight: 'bold' }}>S</div>
                                {renderCanBoCalendar()}
                            </div>

                            {/* Controls */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontFamily: 'var(--hotel-font-sans)' }}>Number of people</label>
                                    <div
                                        style={{ border: '1px solid #ddd', padding: '0.8rem', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                        onClick={() => setCanBoPeopleOpen(!canBoPeopleOpen)}
                                    >
                                        <span>{canBoSelectedPeople}</span>
                                        <ChevronDown size={14} className={canBoPeopleOpen ? 'rotate-180' : ''} />
                                    </div>
                                    {canBoPeopleOpen && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: 'white', border: '1px solid #ddd', zIndex: 20, maxHeight: '200px', overflowY: 'auto' }}>
                                            {[...Array(10)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    style={{ padding: '0.5rem', cursor: 'pointer', backgroundColor: canBoSelectedPeople === `${i + 1} ${i === 0 ? 'person' : 'people'}` ? '#0066cc' : 'white', color: canBoSelectedPeople === `${i + 1} ${i === 0 ? 'person' : 'people'}` ? 'white' : 'black' }}
                                                    onClick={() => { setCanBoSelectedPeople(`${i + 1} ${i === 0 ? 'person' : 'people'}`); setCanBoPeopleOpen(false); }}
                                                >
                                                    {i + 1} {i === 0 ? 'person' : 'people'}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontFamily: 'var(--hotel-font-sans)' }}>Time</label>
                                    <div
                                        style={{ border: '1px solid #ddd', padding: '0.8rem', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                        onClick={() => setCanBoTimeOpen(!canBoTimeOpen)}
                                    >
                                        <span>{canBoSelectedTime}</span>
                                        <ChevronDown size={14} className={canBoTimeOpen ? 'rotate-180' : ''} />
                                    </div>
                                    {canBoTimeOpen && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: 'white', border: '1px solid #ddd', zIndex: 20, maxHeight: '200px', overflowY: 'auto' }}>
                                            {['13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45'].map(time => (
                                                <div
                                                    key={time}
                                                    style={{ padding: '0.5rem', cursor: 'pointer', backgroundColor: canBoSelectedTime === time ? '#0066cc' : 'white', color: canBoSelectedTime === time ? 'white' : 'black' }}
                                                    onClick={() => { setCanBoSelectedTime(time); setCanBoTimeOpen(false); }}
                                                >
                                                    {time}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>


                            <button style={{ width: '100%', padding: '1rem', backgroundColor: '#D65D3B', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginBottom: '1rem', transition: 'background 0.3s' }}>BOOK</button>
                            <button style={{ width: '100%', padding: '1rem', backgroundColor: 'white', color: '#121212', border: '1px solid #121212', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>GROUP REQUEST</button>

                            {/* Gift Card */}
                            <div style={{ marginTop: '2rem', backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', fontWeight: 'bold', color: '#121212' }}>Looking for the perfect gift?</h4>
                                <p style={{ margin: '0 0 1rem 0', fontFamily: 'var(--hotel-font-sans)', fontSize: '0.9rem', color: '#666' }}>Surprise someone special with an experience at Can Bo.</p>
                                <button style={{ width: '100%', padding: '0.8rem', backgroundColor: '#2C3539', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>Gift Can Bo</button>
                            </div>

                            {/* CoverManager Branding */}
                            <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.8rem', color: '#666', fontFamily: 'var(--hotel-font-sans)' }}>
                                <span style={{ fontWeight: 'bold', color: '#0066cc' }}>CoverManager</span> means Hospitality<span style={{ color: '#FFD700', marginLeft: '2px' }}>♥</span>
                            </div>

                            {/* Gallery Carousel */}
                            <div style={{ marginTop: '2rem', position: 'relative', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                <div style={{ position: 'relative', width: '100%', height: '250px' }}>
                                    <img
                                        src={canBoGalleryImages[canBoGalleryIndex]}
                                        alt="Restaurant Interior"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                    <div
                                        onClick={prevCanBoGallerySlide}
                                        style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', cursor: 'pointer', color: 'white', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '50%', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'}
                                    >
                                        <ChevronLeft size={20} />
                                    </div>
                                    <div
                                        onClick={nextCanBoGallerySlide}
                                        style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', color: 'white', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '50%', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'}
                                    >
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How to Arrive Section */}
                    <div style={{ backgroundColor: '#F0F2EB', padding: '6rem 4rem' }}>
                        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem', width: 'fit-content' }}>
                                    <div
                                        onClick={() => setCanBoArrivalTab('car')}
                                        style={{
                                            cursor: 'pointer',
                                            paddingBottom: '0.5rem',
                                            borderBottom: canBoArrivalTab === 'car' ? '2px solid #00bfff' : 'none',
                                            color: canBoArrivalTab === 'car' ? '#00bfff' : '#ccc'
                                        }}
                                    >
                                        <Car size={32} />
                                    </div>
                                    <div
                                        onClick={() => setCanBoArrivalTab('bus')}
                                        style={{
                                            cursor: 'pointer',
                                            paddingBottom: '0.5rem',
                                            borderBottom: canBoArrivalTab === 'bus' ? '2px solid #00bfff' : 'none',
                                            color: canBoArrivalTab === 'bus' ? '#00bfff' : '#ccc'
                                        }}
                                    >
                                        <Bus size={32} />
                                    </div>
                                    <div
                                        onClick={() => setCanBoArrivalTab('train')}
                                        style={{
                                            cursor: 'pointer',
                                            paddingBottom: '0.5rem',
                                            borderBottom: canBoArrivalTab === 'train' ? '2px solid #00bfff' : 'none',
                                            color: canBoArrivalTab === 'train' ? '#00bfff' : '#ccc'
                                        }}
                                    >
                                        <Train size={32} />
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', fontWeight: '300', textTransform: 'uppercase', color: '#121212', marginBottom: '1.5rem' }}>
                                        BY {canBoArrivalTab === 'car' ? 'CAR' : canBoArrivalTab === 'bus' ? 'BUS' : 'METRO / TRAIN'}
                                    </h3>
                                    <div style={{ width: '50px', height: '1px', backgroundColor: '#333', marginBottom: '1.5rem' }}></div>
                                    <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', lineHeight: '1.6', color: '#333', maxWidth: '600px' }}>
                                        {canBoArrivalTab === 'car' && "The Saba Catedral Parking is just 70 meters from the restaurant. We offer you 1 hour of free parking. Ask our Can Bo team for validation after your meal."}
                                        {canBoArrivalTab === 'bus' && "Several bus lines stop near Via Laietana. Lines V15, V17, and 47 have stops within walking distance."}
                                        {canBoArrivalTab === 'train' && "The nearest Metro station is Jaume I (L4), located just a few minutes walk from the restaurant. Urquinaona (L1, L4) is also nearby."}
                                    </p>
                                </div>
                            </div>

                            <div style={{ flex: 1, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <h2 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '4rem', fontWeight: '300', textTransform: 'uppercase', color: '#121212', margin: '0 0 2rem 0' }}>
                                    HOW TO ARRIVE
                                </h2>
                                <div style={{ width: '100%', height: '300px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                    <img src="/assets/canbo/canbo_map.png" alt="Map to Restaurant Can Bo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        );
    }

    if (viewMode === 'classic') {
        return (
            <div className="hotel-container classic-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()} style={{ color: 'white' }}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'rooms' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('rooms')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('rooms')}
                        >
                            ROOMS & SUITES <ChevronDown size={14} className={activeMenu === 'rooms' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'eat' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('eat')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('eat')}
                        >
                            EAT & DRINK <ChevronDown size={14} className={activeMenu === 'eat' ? 'rotate-180' : ''} />
                        </div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">

                        <div className="nav-item relative-parent">
                            <span>EN <ChevronDown size={14} /></span>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div className="nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                </nav>

                <AnimatePresence>
                    {(activeMenu === 'hotel' || activeMenu === 'rooms' || activeMenu === 'eat' || activeMenu === 'savvy') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="hero-section" style={{ height: '100vh', width: '100%', position: 'relative' }}>
                    <img
                        src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2940&auto=format&fit=crop"
                        alt="Classic Room"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                    />
                    <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }}></div>

                    <div className="content-centered" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, color: '#fff', textAlign: 'center' }}>
                        <h1 style={{ color: '#fff', fontSize: '6rem', fontFamily: 'var(--hotel-font-serif)', fontWeight: 'normal', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CLASSIC</h1>

                        {/* Discover Button Overlay */}

                    </div>

                    <div className="booking-bar" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', margin: 0, background: 'rgba(0,0,0,0.6)', borderTop: 'none', zIndex: 10, backdropFilter: 'blur(5px)', color: 'white' }} onClick={(e) => e.stopPropagation()}>
                        <div className="booking-item" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">CHECK IN - CHECK OUT</span>
                            <div className="booking-value">SELECT DATES <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ flex: 1.2, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">OCCUPANCY</span>
                            <div className="booking-value">1 ROOM, 2 ADULTS <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ borderRight: 'none' }}>
                            <span className="booking-label">PROMO CODE</span>
                            <div className="booking-value">ENTER CODE</div>
                        </div>
                        <div className="book-btn-container" style={{ minWidth: '250px' }}>
                            <button className="book-btn" style={{ borderRadius: 0, background: '#D65D3B' }}>BOOK NOW</button>
                        </div>
                    </div>
                </section>

                <div className="breadcrumbs-container">
                    <div className="classic-breadcrumbs">
                        <span>HOME &gt;</span>
                        <span>ROOMS & SUITES &gt;</span>
                        <span className="current">CLASSIC &gt;</span>
                    </div>
                </div>

                <div className="classic-info-bar">
                    <div className="info-bar-item">
                        <div className="info-bar-title blue-text">CLASSIC</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">2<br />GUESTS</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">SURFACE AREA<br />20 M2 (215 SQ.FT)</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">QUEEN SIZE</div>
                    </div>
                </div>

                <section className="classic-description-section">
                    <h2 className="classic-desc-title">COSY AND QUIET</h2>
                    <p className="classic-desc-text">
                        These welcoming classic rooms are in our cosy category. They include a Queen-size bed, a
                        lounge area and a spacious bathroom with bathtub or shower. Designed to offer you the
                        best rest and maximum comfort in the heart of Barcelona.
                    </p>
                </section>

                <section className="classic-carousel-section">
                    <div className="carousel-container">
                        <button className="carousel-btn prev" onClick={prevClassicSlide}><ChevronLeft size={30} /></button>
                        <div className="carousel-track">
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={classicSlideIndex}
                                    src={classicCarouselImages[classicSlideIndex].src}
                                    alt={classicCarouselImages[classicSlideIndex].title}
                                    className="carousel-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </AnimatePresence>
                        </div>
                        <button className="carousel-btn next" onClick={nextClassicSlide}><ChevronRight size={30} /></button>
                    </div>
                </section>

                <section className="classic-info-bookings">
                    <h3 className="info-bookings-title" style={{ color: '#121212' }}>INFO & BOOKINGS</h3>
                    <p className="info-phone" style={{ color: '#121212' }}>+34 932 957 900</p>
                    <p className="info-email" style={{ color: '#121212' }}>laterraza@grandhotelcentral.com</p>
                </section>

                <section className="classic-facilities-section">
                    <div className="facilities-container">
                        <div className="facilities-left">
                            <h2 className="facilities-main-title">
                                A HOME AWAY FROM<br />HOME
                            </h2>
                            <p className="facilities-desc-text">
                                In 2024 the London based design studio Sagrada renovated
                                all our rooms. Our furniture is bespoke, being inspired by the
                                simple lines of the Catalan Noucentisme movement.
                            </p>

                            <a href="#" className="facilities-read-more">Read more</a>

                            <h3 className="facilities-subtitle">FACILITIES</h3>

                            <div className="facilities-list-grid">
                                <div className="facilities-col">
                                    <p>Welcome amenities</p>
                                    <p>Complimentary coffee & tea service</p>
                                    <p>Carner Barcelona vegan amenities</p>
                                    <p>300 thread count 100% Egyptian cotton sheets</p>
                                    <p>Rainshower or Bathtub</p>
                                    <p>Premium minibar</p>
                                    <p>Bathrobe & slippers</p>
                                    <p>24 hour room service</p>
                                    <p>Individually controlled heating and air-conditioning</p>
                                </div>
                                <div className="facilities-col">
                                    <p>Daily turndown service</p>
                                    <p>Laundry service</p>
                                    <p>Samsung 4K High definition TV. Chromecast media connectivity.</p>
                                    <p>In-room hair dryer</p>
                                    <p>High Speed Free Wi-Fi</p>
                                    <p>International electrical outlets and USB charging</p>
                                    <p>Safe-deposit box</p>
                                    <p>Baby cot, on request</p>
                                </div>
                            </div>

                            <div className="facilities-bottom-note">
                                <p>Complimentary access to the wellbeing area, Spa & Hammam from 12pm to 8pm</p>
                                <p>Accessible rooms available.</p>
                            </div>
                        </div>

                        <div className="facilities-right">
                            <img
                                src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop"
                                alt="Renovated Bedroom"
                                className="facilities-image"
                            />
                        </div>
                    </div>
                </section>

                <section className="classic-other-rooms-section">
                    <div className="other-rooms-container">
                        <div className="other-rooms-left">
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={activeOtherRoom}
                                    src={otherRooms.find(r => r.id === activeOtherRoom)?.image}
                                    alt={activeOtherRoom}
                                    className="other-rooms-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>
                        </div>
                        <div className="other-rooms-right">
                            <h2 className="other-rooms-main-title">OTHER ROOMS & SUITES</h2>
                            <div className="other-rooms-list">
                                {otherRooms.map((room) => (
                                    <div
                                        key={room.id}
                                        className={`room-list-item ${activeOtherRoom === room.id ? 'active' : ''}`}
                                        onMouseEnter={() => setActiveOtherRoom(room.id)}
                                    >
                                        {activeOtherRoom === room.id && <span className="active-arrow"><ChevronLeft size={20} /></span>}
                                        <span className="room-name">{room.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }



    if (viewMode === 'deluxe') {
        return (
            <div className="hotel-container deluxe-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'rooms' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('rooms')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('rooms')}
                        >
                            ROOMS & SUITES <ChevronDown size={14} className={activeMenu === 'rooms' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'eat' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('eat')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('eat')}
                        >
                            EAT & DRINK <ChevronDown size={14} className={activeMenu === 'eat' ? 'rotate-180' : ''} />
                        </div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">

                        <div className="nav-item relative-parent">
                            <span>EN <ChevronDown size={14} /></span>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div className="nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                </nav>

                <AnimatePresence>
                    {(activeMenu === 'hotel' || activeMenu === 'rooms' || activeMenu === 'eat' || activeMenu === 'savvy') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="hero-section" style={{ height: '100vh', width: '100%', position: 'relative' }}>
                    <img
                        src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2940&auto=format&fit=crop"
                        alt="Deluxe Room"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                    />
                    <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }}></div>

                    <div className="content-centered" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, color: '#fff', textAlign: 'center' }}>
                        <h1 style={{ color: '#fff', fontSize: '6rem', fontFamily: 'var(--hotel-font-serif)', fontWeight: 'normal', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DELUXE</h1>
                    </div>

                    <div className="booking-bar" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', margin: 0, background: 'rgba(0,0,0,0.6)', borderTop: 'none', zIndex: 10, backdropFilter: 'blur(5px)' }} onClick={(e) => e.stopPropagation()}>
                        <div className="booking-item" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">CHECK IN - CHECK OUT</span>
                            <div className="booking-value">SELECT DATES <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ flex: 1.2, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">OCCUPANCY</span>
                            <div className="booking-value">1 ROOM, 2 ADULTS <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ borderRight: 'none' }}>
                            <span className="booking-label">PROMO CODE</span>
                            <div className="booking-value">ENTER CODE</div>
                        </div>
                        <div className="book-btn-container" style={{ minWidth: '250px' }}>
                            <button className="book-btn" style={{ borderRadius: 0, background: '#D65D3B' }}>BOOK NOW</button>
                        </div>
                    </div>
                </section>

                <div className="breadcrumbs-container">
                    <div className="classic-breadcrumbs">
                        <span>HOME &gt;</span>
                        <span>ROOMS & SUITES &gt;</span>
                        <span className="current">DELUXE &gt;</span>
                    </div>
                </div>

                <div className="classic-info-bar">
                    <div className="info-bar-item">
                        <div className="info-bar-title blue-text">DELUXE</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">2<br />GUESTS</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">SURFACE AREA<br />30 M2 (320 SQ.FT)</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">KING SIZE</div>
                    </div>
                </div>

                <section className="classic-description-section">
                    <h2 className="classic-desc-title">STYLE AND SERENITY</h2>
                    <p className="classic-desc-text">
                        The Deluxe rooms are a haven of peace and style. Generously sized at 30 sqm, they feature
                        bespoke furniture, warm lighting, and a luxurious bathroom with rain shower. The perfect
                        choice for enjoying the vibrant city life while having a calm retreat.
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <button style={{
                            backgroundColor: '#D65D3B',
                            color: 'white',
                            border: 'none',
                            padding: '1rem 2rem',
                            fontFamily: 'var(--hotel-font-sans)',
                            fontSize: '0.9rem',
                            letterSpacing: '0.1em',
                            cursor: 'pointer',
                            textTransform: 'uppercase'
                        }}>BOOK NOW</button>
                    </div>
                </section>

                <section className="classic-carousel-section">
                    <div className="carousel-container">
                        <button className="carousel-btn prev" onClick={prevDeluxeSlide}><ChevronLeft size={30} /></button>
                        <div className="carousel-track">
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={deluxeSlideIndex}
                                    src={deluxeCarouselImages[deluxeSlideIndex].src}
                                    alt={deluxeCarouselImages[deluxeSlideIndex].title}
                                    className="carousel-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </AnimatePresence>
                        </div>
                        <button className="carousel-btn next" onClick={nextDeluxeSlide}><ChevronRight size={30} /></button>
                    </div>
                </section>



                <section className="deluxe-renovation-section">
                    <div className="deluxe-renovation-text-col">
                        <h2 className="deluxe-renovation-title">A HOME AWAY FROM<br />HOME</h2>
                        <p className="deluxe-renovation-desc">
                            In 2024 the London based design studio Sagrada renovated all our rooms. Our furniture is bespoke, being inspired by the simple lines of the Catalan Noucentisme movement.
                        </p>
                        <div className="deluxe-read-more">Read more</div>

                        <h3 className="deluxe-facilities-title">FACILITIES</h3>
                        <div className="deluxe-facilities-grid">
                            <div className="deluxe-facility-item">Bathrobe & slippers</div>
                            <div className="deluxe-facility-item">International electrical outlets and USB charging</div>
                            <div className="deluxe-facility-item">Premium minibar</div>
                            <div className="deluxe-facility-item">Safe-deposit box</div>
                            <div className="deluxe-facility-item">24 hour room service</div>
                            <div className="deluxe-facility-item">Baby cot, on request</div>
                            <div className="deluxe-facility-item">Individually controlled heating and air-conditioning</div>
                            <div className="deluxe-facility-item">Daily turndown service</div>
                        </div>
                        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #ddd', fontFamily: 'var(--hotel-font-sans)', fontSize: '0.9rem', color: '#333' }}>
                            Complimentary access to the wellbeing area, Spa & Hammam from 12pm to 8pm
                        </div>
                    </div>
                    <div className="deluxe-renovation-image-col">
                        <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200" alt="Renovated Room Detail" />
                    </div>
                </section>

                <section className="classic-other-rooms-section">
                    <div className="other-rooms-container">
                        <div className="other-rooms-left">
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={activeOtherRoom}
                                    src={otherRooms.find(r => r.id === activeOtherRoom)?.image}
                                    alt={activeOtherRoom}
                                    className="other-rooms-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>
                        </div>
                        <div className="other-rooms-right">
                            <h2 className="other-rooms-main-title">OTHER ROOMS & SUITES</h2>
                            <div className="other-rooms-list">
                                {otherRooms.filter(r => r.id !== 'deluxe').map((room) => (
                                    <div
                                        key={room.id}
                                        className={`room-list-item ${activeOtherRoom === room.id ? 'active' : ''}`}
                                        onMouseEnter={() => setActiveOtherRoom(room.id)}
                                        onClick={() => handleMenuCardClick({ action: room.id })}
                                    >
                                        {activeOtherRoom === room.id && <span className="active-arrow"><ChevronLeft size={20} /></span>}
                                        <span className="room-name">{room.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>





                <Footer />
            </div>
        );
    }

    if (viewMode === 'deluxe-corner') {
        return (
            <div className="hotel-container deluxe-corner-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                {/* ... Header and Hero sections ... */}
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'rooms' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('rooms')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('rooms')}
                        >
                            ROOMS & SUITES <ChevronDown size={14} className={activeMenu === 'rooms' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'eat' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('eat')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('eat')}
                        >
                            EAT & DRINK <ChevronDown size={14} className={activeMenu === 'eat' ? 'rotate-180' : ''} />
                        </div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">

                        <div className="nav-item relative-parent">
                            <span>EN <ChevronDown size={14} /></span>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div className="nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                </nav>

                <AnimatePresence>
                    {(activeMenu === 'hotel' || activeMenu === 'rooms' || activeMenu === 'eat' || activeMenu === 'savvy') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="hero-section-responsive">
                    <img
                        src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2940&auto=format&fit=crop"
                        alt="Deluxe Corner Room"
                        className="bg-image"
                    />
                    <div className="hero-overlay-responsive"></div>

                    <div className="hero-content-responsive">
                        <h1 className="hero-title-responsive">
                            DELUXE CORNER<br />VIEW
                        </h1>
                    </div>

                    <div className="booking-bar" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', margin: 0, background: 'rgba(0,0,0,0.6)', borderTop: 'none', zIndex: 10, backdropFilter: 'blur(5px)' }} onClick={(e) => e.stopPropagation()}>
                        <div className="booking-item" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">CHECK IN - CHECK OUT</span>
                            <div className="booking-value">SELECT DATES <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ flex: 1.2, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">OCCUPANCY</span>
                            <div className="booking-value">1 ROOM, 2 ADULTS <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ borderRight: 'none' }}>
                            <span className="booking-label">PROMO CODE</span>
                            <div className="booking-value">ENTER CODE</div>
                        </div>
                        <div className="book-btn-container" style={{ minWidth: '250px' }}>
                            <button className="book-btn" style={{ borderRadius: 0, background: '#D65D3B' }}>BOOK NOW</button>
                        </div>
                    </div>
                </section>

                <div className="breadcrumbs-container">
                    <div className="classic-breadcrumbs">
                        <span>HOME &gt;</span>
                        <span>ROOMS & SUITES &gt;</span>
                        <span className="current">DELUXE CORNER &gt;</span>
                    </div>
                </div>

                <div className="classic-info-bar">
                    <div className="info-bar-item">
                        <div className="info-bar-title blue-text">DELUXE CORNER</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">2 (EXTRA BED)<br />GUESTS</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">SURFACE AREA<br />35 M2 (375 SQ.FT)</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">KING SIZE</div>
                    </div>
                </div>

                <section className="classic-description-section">
                    <h2 className="classic-desc-title">CORNER VIEWS</h2>
                    <p className="classic-desc-text">
                        The Deluxe Corner View rooms offer a unique perspective with panoramic views of the city.
                        Flooded with natural light, these spacious rooms feature elegant Noucentisme-inspired furniture
                        and all the modern comforts for an unforgettable stay.
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <button style={{
                            backgroundColor: '#D65D3B',
                            color: 'white',
                            border: 'none',
                            padding: '1rem 2rem',
                            fontFamily: 'var(--hotel-font-sans)',
                            fontSize: '0.9rem',
                            letterSpacing: '0.1em',
                            cursor: 'pointer',
                            textTransform: 'uppercase'
                        }}>BOOK NOW</button>
                    </div>
                </section>

                <section className="classic-carousel-section">
                    <div className="carousel-container">
                        <button className="carousel-btn prev" onClick={prevDeluxeCornerSlide}><ChevronLeft size={30} /></button>
                        <div className="carousel-track">
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={deluxeCornerSlideIndex}
                                    src={deluxeCornerCarouselImages[deluxeCornerSlideIndex].src}
                                    alt={deluxeCornerCarouselImages[deluxeCornerSlideIndex].title}
                                    className="carousel-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </AnimatePresence>
                        </div>
                        <button className="carousel-btn next" onClick={nextDeluxeCornerSlide}><ChevronRight size={30} /></button>
                    </div>
                </section>

                <section className="deluxe-renovation-section">
                    <div className="deluxe-renovation-text-col">
                        <h2 className="deluxe-renovation-title">A HOME AWAY FROM<br />HOME</h2>
                        <p className="deluxe-renovation-desc">
                            In 2024 the London based design studio Sagrada renovated all our rooms. Our furniture is bespoke, being inspired by the simple lines of the Catalan Noucentisme movement.
                        </p>
                        <div className="deluxe-read-more">Read more</div>

                        <h3 className="deluxe-facilities-title">FACILITIES</h3>
                        <div className="deluxe-facilities-grid">
                            <div className="deluxe-facility-item">Bathrobe & slippers</div>
                            <div className="deluxe-facility-item">International electrical outlets and USB charging</div>
                            <div className="deluxe-facility-item">Premium minibar</div>
                            <div className="deluxe-facility-item">Safe-deposit box</div>
                            <div className="deluxe-facility-item">24 hour room service</div>
                            <div className="deluxe-facility-item">Baby cot, on request</div>
                            <div className="deluxe-facility-item">Individually controlled heating and air-conditioning</div>
                            <div className="deluxe-facility-item">Daily turndown service</div>
                        </div>
                        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #ddd', fontFamily: 'var(--hotel-font-sans)', fontSize: '0.9rem', color: '#333' }}>
                            Complimentary access to the wellbeing area, Spa & Hammam from 12pm to 8pm
                        </div>
                    </div>
                    <div className="deluxe-renovation-image-col">
                        <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200" alt="Renovated Room Detail" />
                    </div>
                </section>

                <section className="classic-other-rooms-section">
                    <div className="other-rooms-container">
                        <div className="other-rooms-left">
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={activeOtherRoom}
                                    src={otherRooms.find(r => r.id === activeOtherRoom)?.image}
                                    alt={activeOtherRoom}
                                    className="other-rooms-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>
                        </div>
                        <div className="other-rooms-right">
                            <h2 className="other-rooms-main-title">OTHER ROOMS & SUITES</h2>
                            <div className="other-rooms-list">
                                {otherRooms.filter(r => r.id !== 'deluxe-corner').map((room) => (
                                    <div
                                        key={room.id}
                                        className={`room-list-item ${activeOtherRoom === room.id ? 'active' : ''}`}
                                        onMouseEnter={() => setActiveOtherRoom(room.id)}
                                        onClick={() => handleMenuCardClick({ action: room.id })}
                                    >
                                        {activeOtherRoom === room.id && <span className="active-arrow"><ChevronLeft size={20} /></span>}
                                        <span className="room-name">{room.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

    if (viewMode === 'junior-suite') {
        return (
            <div className="hotel-container junior-suite-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                {/* ... Header and Hero sections ... */}
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'rooms' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('rooms')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('rooms')}
                        >
                            ROOMS & SUITES <ChevronDown size={14} className={activeMenu === 'rooms' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'eat' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('eat')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('eat')}
                        >
                            EAT & DRINK <ChevronDown size={14} className={activeMenu === 'eat' ? 'rotate-180' : ''} />
                        </div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">

                        <div className="nav-item relative-parent">
                            <span>EN <ChevronDown size={14} /></span>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div className="nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                </nav>

                <AnimatePresence>
                    {(activeMenu === 'hotel' || activeMenu === 'rooms' || activeMenu === 'eat' || activeMenu === 'savvy') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="hero-section-responsive">
                    <img
                        src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2940&auto=format&fit=crop"
                        alt="Junior Suite"
                        className="bg-image"
                    />
                    <div className="hero-overlay-responsive"></div>

                    <div className="hero-content-responsive">
                        <h1 className="hero-title-responsive">
                            JUNIOR SUITE
                        </h1>
                    </div>

                    <div className="booking-bar" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', margin: 0, background: 'rgba(0,0,0,0.6)', borderTop: 'none', zIndex: 10, backdropFilter: 'blur(5px)' }} onClick={(e) => e.stopPropagation()}>
                        <div className="booking-item" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">CHECK IN - CHECK OUT</span>
                            <div className="booking-value">SELECT DATES <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ flex: 1.2, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">OCCUPANCY</span>
                            <div className="booking-value">1 ROOM, 2 ADULTS <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ borderRight: 'none' }}>
                            <span className="booking-label">PROMO CODE</span>
                            <div className="booking-value">ENTER CODE</div>
                        </div>
                        <div className="book-btn-container" style={{ minWidth: '250px' }}>
                            <button className="book-btn" style={{ borderRadius: 0, background: '#D65D3B' }}>BOOK NOW</button>
                        </div>
                    </div>
                </section>

                <div className="breadcrumbs-container">
                    <div className="classic-breadcrumbs">
                        <span>HOME &gt;</span>
                        <span>ROOMS & SUITES &gt;</span>
                        <span className="current">JUNIOR SUITE &gt;</span>
                    </div>
                </div>

                <div className="classic-info-bar">
                    <div className="info-bar-item">
                        <div className="info-bar-title blue-text">JUNIOR SUITE</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">2 (EXTRA BED)<br />GUESTS</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">SURFACE AREA<br />38 M2 (409 SQ.FT)</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">KING SIZE</div>
                    </div>
                </div>

                <section className="classic-description-section">
                    <h2 className="classic-desc-title">GENEROUS SPACES</h2>
                    <p className="classic-desc-text">
                        The Junior Suites are characterized by their generous spaces and elegant design.
                        With a separate seating area, these suites offer the perfect balance of comfort and luxury,
                        making them ideal for longer stays or for those who simply appreciate more space.
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <button style={{
                            backgroundColor: '#D65D3B',
                            color: 'white',
                            border: 'none',
                            padding: '1rem 2rem',
                            fontFamily: 'var(--hotel-font-sans)',
                            fontSize: '0.9rem',
                            letterSpacing: '0.1em',
                            cursor: 'pointer',
                            textTransform: 'uppercase'
                        }}>BOOK NOW</button>
                    </div>
                </section>

                <section className="classic-carousel-section">
                    <div className="carousel-container">
                        <button className="carousel-btn prev" onClick={prevJuniorSuiteSlide}><ChevronLeft size={30} /></button>
                        <div className="carousel-track">
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={juniorSuiteSlideIndex}
                                    src={juniorSuiteCarouselImages[juniorSuiteSlideIndex].src}
                                    alt={juniorSuiteCarouselImages[juniorSuiteSlideIndex].title}
                                    className="carousel-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </AnimatePresence>
                        </div>
                        <button className="carousel-btn next" onClick={nextJuniorSuiteSlide}><ChevronRight size={30} /></button>
                    </div>
                </section>

                <section className="deluxe-renovation-section">
                    <div className="deluxe-renovation-text-col">
                        <h2 className="deluxe-renovation-title">A HOME AWAY FROM<br />HOME</h2>
                        <p className="deluxe-renovation-desc">
                            In 2024 the London based design studio Sagrada renovated all our rooms. Our furniture is bespoke, being inspired by the simple lines of the Catalan Noucentisme movement.
                        </p>
                        <div className="deluxe-read-more">Read more</div>

                        <h3 className="deluxe-facilities-title">FACILITIES</h3>
                        <div className="deluxe-facilities-grid">
                            <div className="deluxe-facility-item">Bathrobe & slippers</div>
                            <div className="deluxe-facility-item">International electrical outlets and USB charging</div>
                            <div className="deluxe-facility-item">Premium minibar</div>
                            <div className="deluxe-facility-item">Safe-deposit box</div>
                            <div className="deluxe-facility-item">24 hour room service</div>
                            <div className="deluxe-facility-item">Baby cot, on request</div>
                            <div className="deluxe-facility-item">Individually controlled heating and air-conditioning</div>
                            <div className="deluxe-facility-item">Daily turndown service</div>
                        </div>
                        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #ddd', fontFamily: 'var(--hotel-font-sans)', fontSize: '0.9rem', color: '#333' }}>
                            Complimentary access to the wellbeing area, Spa & Hammam from 12pm to 8pm
                        </div>
                    </div>
                    <div className="deluxe-renovation-image-col">
                        <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200" alt="Renovated Room Detail" />
                    </div>
                </section>

                <section className="classic-other-rooms-section">
                    <div className="other-rooms-container">
                        <div className="other-rooms-left">
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={activeOtherRoom}
                                    src={otherRooms.find(r => r.id === activeOtherRoom)?.image}
                                    alt={activeOtherRoom}
                                    className="other-rooms-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>
                        </div>
                        <div className="other-rooms-right">
                            <h2 className="other-rooms-main-title">OTHER ROOMS & SUITES</h2>
                            <div className="other-rooms-list">
                                {otherRooms.filter(r => r.id !== 'junior-suite').map((room) => (
                                    <div
                                        key={room.id}
                                        className={`room-list-item ${activeOtherRoom === room.id ? 'active' : ''}`}
                                        onMouseEnter={() => setActiveOtherRoom(room.id)}
                                        onClick={() => handleMenuCardClick({ action: room.id })}
                                    >
                                        {activeOtherRoom === room.id && <span className="active-arrow"><ChevronLeft size={20} /></span>}
                                        <span className="room-name">{room.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

    if (viewMode === 'superior') {
        return (
            <div className="hotel-container superior-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                {/* ... Header and Hero sections ... */}
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'rooms' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('rooms')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('rooms')}
                        >
                            ROOMS & SUITES <ChevronDown size={14} className={activeMenu === 'rooms' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'eat' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('eat')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('eat')}
                        >
                            EAT & DRINK <ChevronDown size={14} className={activeMenu === 'eat' ? 'rotate-180' : ''} />
                        </div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">

                        <div className="nav-item relative-parent">
                            <span>EN <ChevronDown size={14} /></span>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div className="nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                </nav>

                <AnimatePresence>
                    {(activeMenu === 'hotel' || activeMenu === 'rooms' || activeMenu === 'eat' || activeMenu === 'savvy') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="hero-section" style={{ height: '100vh', width: '100%', position: 'relative' }}>
                    <img
                        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2940&auto=format&fit=crop"
                        alt="Superior Room"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                    />
                    <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }}></div>

                    <div className="content-centered" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, color: '#fff', textAlign: 'center' }}>
                        <h1 style={{ color: '#fff', fontSize: '6rem', fontFamily: 'var(--hotel-font-serif)', fontWeight: 'normal', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SUPERIOR</h1>
                    </div>

                    <div className="booking-bar" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', margin: 0, background: 'rgba(0,0,0,0.6)', borderTop: 'none', zIndex: 10, backdropFilter: 'blur(5px)' }} onClick={(e) => e.stopPropagation()}>
                        <div className="booking-item" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">CHECK IN - CHECK OUT</span>
                            <div className="booking-value">SELECT DATES <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ flex: 1.2, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">OCCUPANCY</span>
                            <div className="booking-value">1 ROOM, 2 ADULTS <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ borderRight: 'none' }}>
                            <span className="booking-label">PROMO CODE</span>
                            <div className="booking-value">ENTER CODE</div>
                        </div>
                        <div className="book-btn-container" style={{ minWidth: '250px' }}>
                            <button className="book-btn" style={{ borderRadius: 0, background: '#D65D3B' }}>BOOK NOW</button>
                        </div>
                    </div>
                </section>

                <div className="breadcrumbs-container">
                    <div className="classic-breadcrumbs">
                        <span>HOME &gt;</span>
                        <span>ROOMS & SUITES &gt;</span>
                        <span className="current">SUPERIOR &gt;</span>
                    </div>
                </div>

                <div className="classic-info-bar">
                    <div className="info-bar-item">
                        <div className="info-bar-title blue-text">SUPERIOR</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">2<br />GUESTS</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">SURFACE AREA<br />25 M2 (270 SQ.FT)</div>
                    </div>
                    <div className="info-bar-item">
                        <div className="info-bar-subtitle">KING SIZE</div>
                    </div>
                </div>

                <section className="classic-description-section">
                    <h2 className="classic-desc-title">ELEGANCE AND COMFORT</h2>
                    <p className="classic-desc-text">
                        The Superior rooms offer an elevated experience with more space and premium amenities.
                        Featuring a King-size bed, elegant wood paneling details, and a luxurious bathroom.
                        Perfect for those seeking a touch of extra comfort during their stay in Barcelona.
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <button style={{
                            backgroundColor: '#D65D3B',
                            color: 'white',
                            border: 'none',
                            padding: '1rem 2rem',
                            fontFamily: 'var(--hotel-font-sans)',
                            fontSize: '0.9rem',
                            letterSpacing: '0.1em',
                            cursor: 'pointer',
                            textTransform: 'uppercase'
                        }}>BOOK NOW</button>
                    </div>
                </section>

                <section className="classic-carousel-section">
                    <div className="carousel-container">
                        <button className="carousel-btn prev" onClick={prevSuperiorSlide}><ChevronLeft size={30} /></button>
                        <div className="carousel-track">
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={superiorSlideIndex}
                                    src={superiorCarouselImages[superiorSlideIndex].src}
                                    alt={superiorCarouselImages[superiorSlideIndex].title}
                                    className="carousel-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </AnimatePresence>
                        </div>
                        <button className="carousel-btn next" onClick={nextSuperiorSlide}><ChevronRight size={30} /></button>
                    </div>
                </section>

                <section className="classic-info-bookings">
                    <h3 className="info-bookings-title">INFO & BOOKINGS</h3>
                    <p className="info-phone">+34 932 957 900</p>
                    <p className="info-email">laterraza@grandhotelcentral.com</p>
                </section>

                <section className="classic-facilities-section">
                    <div className="facilities-container">
                        <div className="facilities-left">
                            <h2 className="facilities-main-title">
                                A HOME AWAY FROM<br />HOME
                            </h2>
                            <p className="facilities-desc-text">
                                In 2024 the London based design studio Sagrada renovated
                                all our rooms. Our furniture is bespoke, being inspired by the
                                simple lines of the Catalan Noucentisme movement.
                            </p>

                            <a href="#" className="facilities-read-more">Read more</a>

                            <h3 className="facilities-subtitle">FACILITIES</h3>

                            <div className="facilities-list-grid">
                                <div className="facilities-col">
                                    <p>Welcome amenities</p>
                                    <p>Complimentary coffee & tea service</p>
                                    <p>Carner Barcelona vegan amenities</p>
                                    <p>300 thread count 100% Egyptian cotton sheets</p>
                                    <p>Rainshower or Bathtub</p>
                                    <p>Premium minibar</p>
                                    <p>Bathrobe & slippers</p>
                                    <p>24 hour room service</p>
                                    <p>Individually controlled heating and air-conditioning</p>
                                </div>
                                <div className="facilities-col">
                                    <p>Daily turndown service</p>
                                    <p>Laundry service</p>
                                    <p>Samsung 4K High definition TV. Chromecast media connectivity.</p>
                                    <p>In-room hair dryer</p>
                                    <p>High Speed Free Wi-Fi</p>
                                    <p>International electrical outlets and USB charging</p>
                                    <p>Safe-deposit box</p>
                                    <p>Baby cot, on request</p>
                                </div>
                            </div>

                            <div className="facilities-bottom-note">
                                <p>Complimentary access to the wellbeing area, Spa & Hammam from 12pm to 8pm</p>
                                <p>Accessible rooms available.</p>
                            </div>
                        </div>

                        <div className="facilities-right">
                            <img
                                src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop"
                                alt="Renovated Bedroom"
                                className="facilities-image"
                            />
                        </div>
                    </div>
                </section>

                <section className="classic-other-rooms-section">
                    <div className="other-rooms-container">
                        <div className="other-rooms-left">
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={activeOtherRoom}
                                    src={otherRooms.find(r => r.id === activeOtherRoom)?.image}
                                    alt={activeOtherRoom}
                                    className="other-rooms-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>
                        </div>
                        <div className="other-rooms-right">
                            <h2 className="other-rooms-main-title">OTHER ROOMS & SUITES</h2>
                            <div className="other-rooms-list">
                                {otherRooms.map((room) => (
                                    <div
                                        key={room.id}
                                        className={`room-list-item ${activeOtherRoom === room.id ? 'active' : ''}`}
                                        onMouseEnter={() => setActiveOtherRoom(room.id)}
                                    >
                                        {activeOtherRoom === room.id && <span className="active-arrow"><ChevronLeft size={20} /></span>}
                                        <span className="room-name">{room.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

    if (viewMode === 'wellness') {
        return (
            <div className="hotel-container wellness-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div className="nav-item">ROOMS & SUITES <ChevronDown size={14} /></div>
                        <div className="nav-item">EAT & DRINK <ChevronDown size={14} /></div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">

                        <div className="nav-item relative-parent">
                            <span>EN <ChevronDown size={14} /></span>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div className="nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                </nav>

                {/* Mega Menu Overlay */}
                <AnimatePresence>
                    {(activeMenu === 'hotel') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="wellness-hero">
                    <div className="wellness-overlay"></div>
                    <div className="wellness-content-centered">
                        <h1 className="wellness-title">SPA & WELLNESS</h1>
                        <p className="wellness-subtitle">Explore the path to wellbeing</p>
                    </div>
                </section>

                {/* Booking Bar (Wellness - Moved to Top of Content) */}
                <div className="booking-bar booking-bar-relative" onClick={(e) => e.stopPropagation()}>
                    <div className="booking-item" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                        <span className="booking-label">CHECK IN - CHECK OUT</span>
                        <div className="booking-value">SELECT DATES <ChevronDown size={14} /></div>
                    </div>
                    <div className="booking-item" style={{ flex: 1.2, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                        <span className="booking-label">OCCUPANCY</span>
                        <div className="booking-value">1 ROOM, 2 ADULTS <ChevronDown size={14} /></div>
                    </div>
                    <div className="booking-item" style={{ borderRight: 'none' }}>
                        <span className="booking-label">PROMO CODE</span>
                        <div className="booking-value">ENTER CODE</div>
                    </div>
                    <div className="book-btn-container" style={{ minWidth: '250px' }}>
                        <button className="book-btn" style={{ borderRadius: 0 }}>BOOK NOW</button>
                    </div>
                </div>

                <section className="info-section" style={{ backgroundColor: '#f5f5f5', padding: '6rem 2rem', textAlign: 'center' }}>
                    <div className="info-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 className="info-title" style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '3.5rem', fontWeight: '400', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '1.2' }}>
                            INDULGE YOURSELF IN<br />BARCELONA
                        </h2>
                        <p className="info-text" style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', lineHeight: '1.6', color: '#666', marginBottom: '2rem' }}>
                            Nestled on the 8th floor, Grand Hotel Central's spa, will take you on a journey of
                            rejuvenation. An oasis to unwind in after a busy day of work or sightseeing in the city.
                        </p>
                        <a href="#" className="info-read-more" style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', fontWeight: 'bold', color: '#121212', textDecoration: 'none', borderBottom: '2px solid #121212', paddingBottom: '2px' }}>Read more</a>
                    </div>
                </section>

            </div>
        );
    }

    if (viewMode === 'rooftop') {
        return (
            <div className="hotel-container rooftop-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                {/* Header (Same for specific continuity, or could be passed as prop but keeping simple) */}
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'rooms' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('rooms')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('rooms')}
                        >
                            ROOMS & SUITES <ChevronDown size={14} className={activeMenu === 'rooms' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'eat' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('eat')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('eat')}
                        >
                            EAT & DRINK <ChevronDown size={14} className={activeMenu === 'eat' ? 'rotate-180' : ''} />
                        </div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">

                        <div className="nav-item relative-parent">
                            <span onClick={() => toggleMenu('language')} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>EN <ChevronDown size={14} className={activeMenu === 'language' ? 'rotate-180' : ''} /></span>
                            <AnimatePresence>
                                {activeMenu === 'language' && <LanguageOverlay />}
                            </AnimatePresence>
                        </div>
                        <div className="nav-item active" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div
                            className={`nav-item ${activeMenu === 'savvy' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('savvy')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('savvy')}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} className={activeMenu === 'savvy' ? 'rotate-180' : ''} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                </nav>

                <section className="rooftop-hero">
                    <img
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop&v=2"
                        alt="Rooftop Pool"
                        className="rooftop-bg"
                    />
                    <div className="rooftop-content">
                        <h1 className="rooftop-title">LA TERRAZA DEL<br />CENTRAL</h1>
                        <p className="rooftop-desc">Bar, restaurant & infinity pool with panoramic views of Barcelona</p>
                    </div>
                </section>

                <section className="rooftop-info-section">
                    <div className="breadcrumbs">
                        HOME &gt; <span className="current-crumb">ROOFTOP</span> &gt;
                    </div>

                    <div className="rooftop-info-content">
                        <span className="rooftop-pre-header">Above Barcelona</span>
                        <h2 className="rooftop-info-title">AN EXPERIENCE FROM<br />SUNRISE UNTIL SUNSET</h2>
                        <p className="rooftop-info-text">
                            On the eighth floor, high above the bustling streets of the Gothic Quarter, La Terraza del Central offers Mediterranean-inspired cuisine, delicious cocktails and stunning views. A true urban oasis in the heart of the city complete with picturesque infinity pool and Balinese beds. With a relaxed atmosphere, La Terraza del Central is perfect for dining, drinking and enjoying spectacular views of downtown Barcelona.
                        </p>
                        <button className="read-more-btn">Read more</button>
                    </div>
                </section>

                {rooftopImages.length > 0 && (
                    <section className="rooftop-gallery-section">
                        <div className="gallery-container">
                            <button className="gallery-nav prev" onClick={() => setGalleryIndex(prev => (prev - 1 + rooftopImages.length) % rooftopImages.length)}>
                                <ChevronLeft size={40} strokeWidth={1} />
                            </button>

                            <div className="gallery-track-wrapper">
                                <div
                                    className="gallery-track"
                                    style={{ transform: `translateX(calc(-${galleryIndex * 60}vw + 20vw))` }}
                                >
                                    {rooftopImages.map((img, index) => (
                                        <div key={index} className={`gallery-slide ${index === galleryIndex ? 'active' : ''}`}>
                                            <img src={img} alt={`Rooftop view ${index + 1}`} />
                                            <div className="slide-overlay"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="gallery-nav next" onClick={() => setGalleryIndex(prev => (prev + 1) % rooftopImages.length)}>
                                <ChevronRight size={40} strokeWidth={1} />
                            </button>
                        </div>
                    </section>
                )}

                <section className="rooftop-hours-section">
                    <div className="hours-container">
                        <div className="hours-left">
                            <h2 className="hours-main-title">OPENING HOURS &<br />MENUS</h2>

                            <div className="hours-block">
                                <h3 className="hours-sub-title">POOL & ROOFTOP</h3>
                                <p className="hours-text">
                                    Pool hours From 7am to 6pm. - <strong>Exclusively for hotel guests.</strong>
                                </p>
                                <p className="hours-text">
                                    Sunbed reservations from 12pm to 6pm (2 hour slot per sunbed) - <strong>Exclusively for hotel guests.</strong>
                                </p>
                            </div>

                            <div className="hours-block">
                                <h3 className="hours-sub-title">LA TERRAZA DEL<br />CENTRAL</h3>
                                <p className="hours-text" style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>
                                    From 1pm to 8pm
                                </p>
                                <a href="#" className="view-menu-link">VIEW MENU <ArrowRight size={14} /></a>
                            </div>


                        </div>

                        <div className="hours-right">
                            {/* Static Widget to match image */}
                            <div className="rooftop-booking-widget" onClick={(e) => e.stopPropagation()}>
                                <div className="widget-calendar-header">
                                    <button className="cal-nav-btn" onClick={handlePrevMonth}><ChevronLeft size={16} /></button>
                                    <span className="cal-month-title">{formattedMonth}</span>
                                    <button className="cal-nav-btn" onClick={handleNextMonth}><ChevronRight size={16} /></button>
                                </div>
                                <div className="widget-calendar-grid">
                                    <div className="w-day-head">Mo</div><div className="w-day-head">Tu</div><div className="w-day-head">We</div><div className="w-day-head">Th</div><div className="w-day-head">Fr</div><div className="w-day-head">Sa</div><div className="w-day-head">S</div>
                                    {renderCalendarGrid()}
                                </div>

                                <div className="widget-form-row">
                                    <div className="widget-input-group" style={{ position: 'relative' }}>
                                        <label>Number of people</label>
                                        <div
                                            className="widget-select-display"
                                            onClick={() => setPeopleDropdownOpen(!peopleDropdownOpen)}
                                        >
                                            {selectedPeople}
                                        </div>
                                        {peopleDropdownOpen && (
                                            <div className="widget-dropdown-list">
                                                {peopleOptions.map((opt, i) => (
                                                    <div
                                                        key={i}
                                                        className={`widget-dropdown-item ${selectedPeople === opt ? 'selected' : ''}`}
                                                        onClick={() => handlePeopleSelect(opt)}
                                                    >
                                                        {opt}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="widget-input-group" style={{ position: 'relative' }}>
                                        <label>Time</label>
                                        <div
                                            className="widget-select-display"
                                            onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                                        >
                                            {selectedTime}
                                        </div>
                                        {timeDropdownOpen && (
                                            <div className="widget-dropdown-list">
                                                {timeOptions.map((opt, i) => (
                                                    <div
                                                        key={i}
                                                        className={`widget-dropdown-item ${selectedTime === opt ? 'selected' : ''}`}
                                                        onClick={() => handleTimeSelect(opt)}
                                                    >
                                                        {opt}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button className="widget-book-btn">BOOK</button>
                                <div className="widget-footer-section">
                                    <div className="widget-footer-label">Sign up for the waiting list</div>
                                    <button className="widget-footer-btn">WAITING LIST</button>
                                    <button className="widget-footer-btn">GROUP REQUEST</button>
                                </div>
                                <div className="cover-manager-logo" style={{ textAlign: 'right', marginTop: '1rem', fontSize: '0.7rem', color: '#1ca0d8', fontWeight: 'bold' }}>
                                    CoverManager <span style={{ color: '#999', fontWeight: 'normal' }}>means Hospitality</span><span style={{ color: '#fdb515' }}>♥</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

    if (viewMode === 'location') {
        return (
            <div className="hotel-container location-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div className="nav-item">ROOMS & SUITES <ChevronDown size={14} /></div>
                        <div className="nav-item">EAT & DRINK <ChevronDown size={14} /></div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="nav-item relative-parent">
                            <span onClick={() => toggleMenu('language')} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>EN <ChevronDown size={14} className={activeMenu === 'language' ? 'rotate-180' : ''} /></span>
                            <AnimatePresence>
                                {activeMenu === 'language' && <LanguageOverlay />}
                            </AnimatePresence>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div
                            className={`nav-item ${activeMenu === 'savvy' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('savvy')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('savvy')}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} className={activeMenu === 'savvy' ? 'rotate-180' : ''} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                </nav>

                <AnimatePresence>
                    {(activeMenu === 'hotel' || activeMenu === 'rooms' || activeMenu === 'eat' || activeMenu === 'savvy') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="location-hero" style={{ height: '100vh', width: '100%', position: 'relative' }}>
                    <img
                        src="https://images.unsplash.com/photo-1572953109213-3be62398eb95?q=80&w=2940&auto=format&fit=crop"
                        alt="Location Hero"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                    />
                    <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)' }}></div>

                    <div className="content-centered" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, color: '#fff', textAlign: 'center', width: '100%' }}>
                        <h1 style={{ color: '#fff', fontSize: '5rem', fontFamily: 'var(--hotel-font-serif)', fontWeight: 'normal', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.1, marginBottom: '1rem' }}>
                            A PRIVILEGED<br />LOCATION
                        </h1>
                        <p style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--hotel-font-sans)', letterSpacing: '0.02em' }}>
                            A luxury hotel in the heart of Barcelona
                        </p>
                    </div>

                    <div className="booking-bar" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', margin: 0, background: 'rgba(0,0,0,0.8)', borderTop: 'none', zIndex: 10, backdropFilter: 'blur(5px)' }} onClick={(e) => e.stopPropagation()}>
                        <div className="booking-item" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">CHECK IN - CHECK OUT</span>
                            <div className="booking-value">SELECT DATES <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ flex: 1.2, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">OCCUPANCY</span>
                            <div className="booking-value">1 ROOM, 2 ADULTS <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ borderRight: 'none' }}>
                            <span className="booking-label">PROMO CODE</span>
                            <div className="booking-value">ENTER CODE</div>
                        </div>
                        <div className="book-btn-container" style={{ minWidth: '250px' }}>
                            <button className="book-btn" style={{ borderRadius: 0, background: '#D65D3B' }}>BOOK NOW</button>
                        </div>
                    </div>
                </section>

                <section className="location-content-section" style={{ backgroundColor: '#f9f9f9', padding: '4rem 2rem', textAlign: 'center', color: '#121212' }}>
                    <div className="location-breadcrumbs" style={{ fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '4rem', letterSpacing: '0.1em', color: '#666', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        <span>HOME</span> <span>{'>'}</span> <span>HOTEL</span> <span>{'>'}</span> <span style={{ fontWeight: 'bold', color: '#121212' }}>LOCATION & NEIGHBOURHOOD</span> <span>{'>'}</span>
                    </div>

                    <div className="location-text-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 className="location-title" style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '3.5rem', fontWeight: '400', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '1.2' }}>
                            A GOTHIC QUARTER<br />HOTEL
                        </h2>
                        <p className="location-desc" style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
                            Our hotel's prime location envelops our guests in the rich tapestry of the city's history and culture.
                        </p>
                        <p className="location-desc" style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
                            The Grand Hotel Central stands proudly on one of Barcelona's most emblematic streets, Via Layetana. A central location to explore the city. Museums, historic buildings, lively bars, local restaurants and artisan shops are just a stone's throw away. Just outside our doors you can become a connoisseur of the true Barcelona.
                        </p>
                    </div>
                </section>

                <section className="location-map-section" style={{ backgroundColor: '#f5f5f5', padding: '4rem 2rem', textAlign: 'center' }}>
                    <h2 className="location-map-title" style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '5rem', fontWeight: '400', marginBottom: '3rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#000' }}>
                        LOCATION
                    </h2>
                    <div className="location-map-container" style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div className="location-info-left" style={{ flex: 1, padding: '4rem', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '3rem', lineHeight: '1.2', marginBottom: '2rem', textTransform: 'uppercase', fontWeight: 400, color: '#000' }}>
                                GRAND<br />HOTEL<br />CENTRAL
                            </h3>
                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', color: '#000', marginBottom: '1rem' }}>
                                Via Laietana, 30 - 08003 Barcelona
                            </p>
                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', color: '#000', marginBottom: '2rem' }}>
                                info@grandhotelcentral.com
                            </p>
                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.5rem', color: '#000', marginBottom: '2rem' }}>
                                +34 932 957 900
                            </p>
                            <button style={{ backgroundColor: '#2a2a2a', color: '#fff', border: 'none', padding: '1rem 2rem', fontFamily: 'var(--hotel-font-sans)', fontSize: '0.9rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start' }}>
                                SEE LOCATION
                            </button>
                        </div>
                        <div className="location-map-right" style={{ flex: 1.5 }}>
                            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" alt="Map Location" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px', display: 'block' }} />
                        </div>
                    </div>
                </section>

                <section className="how-to-arrive-section" style={{ backgroundColor: '#f2f2f2', padding: '6rem 4rem', textAlign: 'left' }}>
                    <div className="how-to-arrive-container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4rem' }}>

                        {/* Left Content */}
                        <div className="arrive-content-left" style={{ flex: 1 }}>
                            {/* Tabs */}
                            <div className="arrive-tabs" style={{ display: 'flex', gap: '3rem', marginBottom: '3rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
                                {['plane', 'car', 'bus', 'train'].map(tab => (
                                    <div
                                        key={tab}
                                        onClick={() => setHowToArriveTab(tab)}
                                        style={{
                                            cursor: 'pointer',
                                            paddingBottom: '0.5rem',
                                            borderBottom: howToArriveTab === tab ? '2px solid #00aeef' : '2px solid transparent',
                                            color: howToArriveTab === tab ? '#00aeef' : '#ccc',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {tab === 'plane' && <Plane strokeWidth={1} size={32} />}
                                        {tab === 'car' && <Car strokeWidth={1} size={32} />}
                                        {tab === 'bus' && <Bus strokeWidth={1} size={32} />}
                                        {tab === 'train' && <Train strokeWidth={1} size={32} />}
                                    </div>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="arrive-tab-content" style={{ minHeight: '150px' }}>
                                <AnimatePresence mode='wait'>
                                    {howToArriveTab === 'plane' && (
                                        <motion.div key="plane" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                            <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 400, color: '#000' }}>BY PLANE</h3>
                                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', lineHeight: '1.6', color: '#000' }}>
                                                All flights to Barcelona arrive at Josep Tarradellas Barcelona-El Prat airport. The airport is located 40 minutes from the hotel and is well-connected by metro and bus.
                                            </p>
                                        </motion.div>
                                    )}
                                    {howToArriveTab === 'car' && (
                                        <motion.div key="car" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                            <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 400, color: '#000' }}>BY CAR</h3>
                                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', lineHeight: '1.6', color: '#000' }}>
                                                Our hotel is easily accessible by car. We offer valet parking services for our guests. Please set your GPS to Via Laietana, 30.
                                            </p>
                                        </motion.div>
                                    )}
                                    {howToArriveTab === 'bus' && (
                                        <motion.div key="bus" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                            <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 400, color: '#000' }}>BY BUS</h3>
                                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', lineHeight: '1.6', color: '#000' }}>
                                                Several bus lines stop near the hotel (V15, V17, 47). The nearest bus stop is located just a few meters from the entrance on Via Laietana.
                                            </p>
                                        </motion.div>
                                    )}
                                    {howToArriveTab === 'train' && (
                                        <motion.div key="train" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                            <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 400, color: '#000' }}>BY METRO</h3>
                                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', lineHeight: '1.6', color: '#000' }}>
                                                The nearest metro station is Jaume I (Line 4), located just a 2-minute walk from the hotel. It provides easy access to the entire city.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Right Title */}
                        <div className="arrive-title-right" style={{ flex: 1, textAlign: 'right' }}>
                            <h2 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '5rem', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#000', margin: 0, lineHeight: 1 }}>
                                HOW TO<br />ARRIVE
                            </h2>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

    if (viewMode === 'gallery') {
        return (
            <div className="hotel-container gallery-view" onClick={() => { setActiveMenu(null); setPeopleDropdownOpen(false); setTimeDropdownOpen(false); }}>
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div className="nav-item">ROOMS & SUITES <ChevronDown size={14} /></div>
                        <div className="nav-item">EAT & DRINK <ChevronDown size={14} /></div>
                    </div>
                    <div className="header-center">
                        <div className="logo-container" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                            <div className="logo-text-line">GRAND</div>
                            <div className="logo-text-line indented">HOTEL</div>
                            <div className="logo-text-line">CENTRAL</div>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="nav-item relative-parent">
                            <span onClick={() => toggleMenu('language')} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>EN <ChevronDown size={14} className={activeMenu === 'language' ? 'rotate-180' : ''} /></span>
                            <AnimatePresence>
                                {activeMenu === 'language' && <LanguageOverlay />}
                            </AnimatePresence>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div
                            className={`nav-item ${activeMenu === 'savvy' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('savvy')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('savvy')}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} className={activeMenu === 'savvy' ? 'rotate-180' : ''} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                </nav>

                <AnimatePresence>
                    {(activeMenu === 'hotel' || activeMenu === 'rooms' || activeMenu === 'eat' || activeMenu === 'savvy') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame"><img src={item.img} alt={item.title} /></div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="gallery-hero" style={{ height: '100vh', width: '100%', position: 'relative' }}>
                    <img
                        src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2940&auto=format&fit=crop"
                        alt="Gallery Hero"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                    />
                    <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)' }}></div>

                    <div className="content-centered" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, color: '#fff', textAlign: 'center', width: '100%' }}>
                        <h1 style={{ color: '#fff', fontSize: '6rem', fontFamily: 'var(--hotel-font-serif)', fontWeight: 'normal', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.1, marginBottom: '1rem' }}>
                            GALLERY
                        </h1>
                        <p style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--hotel-font-sans)', letterSpacing: '0.02em', fontWeight: 300 }}>
                            Tour our rooms and facilities
                        </p>
                    </div>

                    <div className="booking-bar" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', margin: 0, background: 'rgba(0,0,0,0.8)', borderTop: 'none', zIndex: 10, backdropFilter: 'blur(5px)' }} onClick={(e) => e.stopPropagation()}>
                        <div className="booking-item" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">CHECK IN - CHECK OUT</span>
                            <div className="booking-value">SELECT DATES <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ flex: 1.2, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="booking-label">OCCUPANCY</span>
                            <div className="booking-value">1 ROOM, 2 ADULTS <ChevronDown size={14} /></div>
                        </div>
                        <div className="booking-item" style={{ borderRight: 'none' }}>
                            <span className="booking-label">PROMO CODE</span>
                            <div className="booking-value">ENTER CODE</div>
                        </div>
                        <div className="book-btn-container" style={{ minWidth: '250px' }}>
                            <button className="book-btn" style={{ borderRadius: 0, background: '#D65D3B' }}>BOOK NOW</button>
                        </div>
                    </div>
                </section>



                <section className="gallery-content-section" style={{ backgroundColor: '#f9f9f9', padding: '4rem 2rem', textAlign: 'center', color: '#121212' }}>
                    <div className="location-breadcrumbs" style={{ fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '4rem', letterSpacing: '0.1em', color: '#666', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        <span>HOME</span> <span>{'>'}</span> <span>HOTEL</span> <span>{'>'}</span> <span style={{ fontWeight: 'bold', color: '#121212' }}>GALLERY</span> <span>{'>'}</span>
                    </div>

                    <div className="gallery-text-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 className="gallery-title" style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '3.5rem', fontWeight: '400', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '1.2' }}>
                            EXPLORE OUR PHOTO<br />GALLERY
                        </h2>
                        <p className="gallery-desc" style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
                            Marvel at five-star rooms, chic suites, vibrant dining spaces and bars, a rooftop haven with an infinity pool and breathtaking panoramic views. Let our photo gallery ignite your imagination and set the stage for your unforgettable stay with us!
                        </p>
                        <a href="#" style={{ color: '#121212', fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', fontWeight: 'bold', textDecoration: 'none', borderBottom: '1px solid #121212', paddingBottom: '2px' }}>
                            Read more
                        </a>
                    </div>
                </section>



                <section className="gallery-grid-section" style={{ padding: '4rem 2rem 6rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#fff' }}>

                    {/* Filter Buttons */}
                    <div className="gallery-filters" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '4rem' }}>
                        {['ALL', 'HOTEL', 'ROOMS', 'ROOFTOP'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setGalleryTab(filter)}
                                style={{
                                    background: '#000',
                                    border: galleryTab === filter ? '1px solid #ff00ff' : '1px solid #000',
                                    color: '#ff00ff',
                                    fontWeight: galleryTab === filter ? 'bold' : 'normal',
                                    padding: '0.8rem 2rem',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--hotel-font-sans)',
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Image Grid */}
                    {/* Image Grid Container - unrestricted height to allow content flow */}
                    <div className="gallery-grid-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Define Images based on Tab */}
                        {(() => {
                            const images = {
                                ALL: [
                                    // Row 1 (Indices 0-2)
                                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=600&auto=format&fit=crop", // Stack Top
                                    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=600&auto=format&fit=crop", // Stack Bottom
                                    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop", // Right Tall
                                    // Row 2 (Indices 3-6)
                                    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600&auto=format&fit=crop", // Left Tall (Lobby/Arch)
                                    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop", // Center Top (Rooftop View)
                                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=600&auto=format&fit=crop", // Center Bottom (Hallway)
                                    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop"  // Right Tall (Pool)
                                ],
                                HOTEL: [
                                    // Row 1 (Indices 0-2)
                                    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop", // Stack Top
                                    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=600&auto=format&fit=crop", // Stack Bottom
                                    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop", // Right Tall
                                    // Row 2 (Indices 3-6)
                                    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600&auto=format&fit=crop", // Left Tall
                                    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop", // Center Top
                                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=600&auto=format&fit=crop", // Center Bottom
                                    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop"  // Right Tall
                                ],
                                ROOMS: [
                                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=600&auto=format&fit=crop",
                                    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=600&auto=format&fit=crop",
                                    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop"
                                ],
                                ROOFTOP: [
                                    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop", // Lounge
                                    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop", // Dining
                                    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop"  // View
                                ]
                            };

                            const activeImages = images[galleryTab] || images['ALL'];
                            const isExtendedLayout = (galleryTab === 'ALL' || galleryTab === 'HOTEL') && activeImages.length > 4;

                            const renderItem = (src, index) => (
                                <div key={index} style={{ height: '100%', position: 'relative', overflow: 'hidden' }} className="gallery-item-hover">
                                    <img src={src} alt={`Gallery ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div
                                        className="gallery-overlay"
                                        onClick={() => { setSelectedImage(src); setIsModalOpen(true); }}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'rgba(0,0,0,0.4)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                                    >
                                        <div style={{ color: '#fff', fontSize: '3rem', fontWeight: '300' }}>+</div>
                                    </div>
                                </div>
                            );

                            return (
                                <>
                                    {/* ROW 1: 2 Columns - Stacked (Left), Tall (Right) */}
                                    <div className="gallery-row-1" style={{ display: 'grid', gridTemplateColumns: '40% 60%', gap: '2rem', height: '600px' }}>
                                        {/* Left Column - Stacked */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
                                            <div style={{ flex: 1 }}>
                                                {renderItem(activeImages[0], 0)}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                {renderItem(activeImages[1], 1)}
                                            </div>
                                        </div>

                                        {/* Right Column - Tall */}
                                        <div style={{ height: '100%' }}>
                                            {renderItem(activeImages[2], 2)}
                                        </div>
                                    </div>

                                    {/* ROW 2: 3 Columns - Tall (Left), Stacked (Center), Tall (Right) */}
                                    {isExtendedLayout && (
                                        <div className="gallery-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', height: '600px' }}>
                                            {/* Left Column - Tall */}
                                            <div style={{ height: '100%' }}>
                                                {renderItem(activeImages[3], 3)}
                                            </div>

                                            {/* Center Column - Stacked */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
                                                <div style={{ flex: 1 }}>
                                                    {renderItem(activeImages[4], 4)}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    {renderItem(activeImages[5], 5)}
                                                </div>
                                            </div>

                                            {/* Right Column - Tall */}
                                            <div style={{ height: '100%' }}>
                                                {renderItem(activeImages[6], 6)}
                                            </div>
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </section>

                {/* SPA & MASSAGE Section */}
                <section className="spa-section" style={{ padding: '6rem 2rem', backgroundColor: '#fafafa', color: '#121212' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h2 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '4rem', textAlign: 'center', fontWeight: '400', marginBottom: '4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SPA & MASSAGE</h2>
                        <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '300px', textAlign: 'left' }}>
                                <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2.5rem', fontWeight: '400', marginBottom: '1.5rem', textTransform: 'uppercase' }}>WELLBEING</h3>
                                <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem', color: '#333' }}>
                                    Our hotel spa in Barcelona offers a thermal area, massages and a wide catalogue of wellness treatments by Natura Bissé. Choose between a dry sauna, with minimum humidity and comfortable heat, or the Hamman's high temperatures and 95% humidity.
                                </p>
                                <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '3rem 0' }} />
                                <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', fontWeight: '400', marginBottom: '1rem', textTransform: 'uppercase' }}>OPENING HOURS</h3>
                                <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
                                    From 12pm to 8pm<br />
                                    Outside these hours, reservation required for treatments and Wellbeing area access
                                </p>
                            </div>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop" alt="Spa Treatment" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px' }} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Rooftop Carousel Section */}
                <section className="rooftop-carousel-section" style={{ padding: '0 0 6rem 0', backgroundColor: '#fafafa', position: 'relative' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', marginBottom: '2rem' }}>
                            <img src="/logo-icon.png" alt="" style={{ height: '30px', opacity: 0.5 }} /> {/* Placeholder for logo if needed */}
                            <span style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', textTransform: 'uppercase', color: '#121212' }}>Rooftop Cocktail</span>
                            <span style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', color: '#121212' }}>laterraza@grandhotelcentral.com</span>
                        </div>
                    </div>

                    <div className="rooftop-carousel-container" style={{ position: 'relative', width: '100%', height: '80vh', overflow: 'hidden' }}>
                        <button
                            className="carousel-arrow left"
                            onClick={prevRooftopSlide}
                            style={{ position: 'absolute', top: '50%', left: '2rem', zIndex: 10, background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff' }}
                        >
                            <ChevronLeft size={60} strokeWidth={0.5} />
                        </button>

                        <motion.img
                            key={rooftopSliderIndex}
                            src={rooftopCarouselImages[rooftopSliderIndex]}
                            alt={`Rooftop ${rooftopSliderIndex + 1}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />

                        <button
                            className="carousel-arrow right"
                            onClick={nextRooftopSlide}
                            style={{ position: 'absolute', top: '50%', right: '2rem', zIndex: 10, background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff' }}
                        >
                            <ChevronRight size={60} strokeWidth={0.5} />
                        </button>
                    </div>
                </section>

                {/* Gallery Modal */}
                {isModalOpen && selectedImage && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,0,0,0.9)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <div style={{ maxHeight: '90%', maxWidth: '90%', position: 'relative' }} onClick={e => e.stopPropagation()}>
                            <img src={selectedImage} style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }} alt="Selected Gallery" />
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    right: '-40px',
                                    background: 'none',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: '3rem',
                                    cursor: 'pointer'
                                }}
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}

                <Footer />
            </div >
        );
    }

    return (
        <div className="hotel-container" onClick={() => setActiveMenu(null)}>

            <section className="hero-section">
                {/* Header */}
                <nav className="hotel-header" onClick={(e) => e.stopPropagation()}>
                    <div className="header-left">
                        <div
                            className={`nav-item ${activeMenu === 'hotel' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('hotel')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('hotel')}
                        >
                            HOTEL <ChevronDown size={14} className={activeMenu === 'hotel' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'rooms' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('rooms')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('rooms')}
                        >
                            ROOMS & SUITES <ChevronDown size={14} className={activeMenu === 'rooms' ? 'rotate-180' : ''} />
                        </div>
                        <div
                            className={`nav-item ${activeMenu === 'eat' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('eat')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('eat')}
                        >
                            EAT & DRINK <ChevronDown size={14} className={activeMenu === 'eat' ? 'rotate-180' : ''} />
                        </div>
                    </div>
                    <div className="header-right">

                        <div className="nav-item relative-parent">
                            <span onClick={() => toggleMenu('language')} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>EN <ChevronDown size={14} className={activeMenu === 'language' ? 'rotate-180' : ''} /></span>
                            <AnimatePresence>
                                {activeMenu === 'language' && <LanguageOverlay />}
                            </AnimatePresence>
                        </div>
                        <div className="nav-item" onClick={handleRooftopClick}>ROOFTOP</div>
                        <div className="nav-item" onClick={handleHomeClick}>THE HOUSE</div>
                        <div
                            className={`nav-item ${activeMenu === 'savvy' ? 'active' : ''}`}
                            onMouseEnter={() => handleMenuEnter('savvy')}
                            onMouseLeave={handleMenuLeave}
                            onClick={() => toggleMenu('savvy')}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>LOCAL SAVVY <ChevronDown size={14} className={activeMenu === 'savvy' ? 'rotate-180' : ''} /></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '300', marginTop: '2px' }}>+34 932 957 900</span>
                        </div>
                    </div>
                    <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </div>
                </nav>

                {/* Mega Menu Overlay - General */}
                <AnimatePresence>
                    {(activeMenu === 'hotel' || activeMenu === 'rooms' || activeMenu === 'eat' || activeMenu === 'savvy') && (
                        <motion.div
                            className="mega-menu-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => {
                                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                            }}
                            onMouseLeave={handleMenuLeave}
                        >
                            {/* Dynamic Grid based on item count */}
                            <div className={`mega-menu-grid count-${menuData[activeMenu].length}`}>
                                {menuData[activeMenu].map((item, index) => (
                                    <div key={index} className="mega-menu-card" onClick={() => handleMenuCardClick(item)}>
                                        <div className="mm-image-frame">
                                            <img src={item.img} alt={item.title} />
                                        </div>
                                        <div className="mm-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Wrapper - Single Slide */}
                <section className="main-content">

                    {/* Background Layer */}
                    <AnimatePresence mode='popLayout'>
                        {viewMode === 'hero' && showVideo ? (
                            <motion.video
                                key={videoSrc}
                                src={videoSrc}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="bg-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 }}
                            />
                        ) : viewMode === 'rooftop' ? (
                            <motion.img
                                key="bg-rooftop-pool-v2"
                                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop&v=2"
                                alt="Rooftop Pool V2"
                                className="bg-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 }}
                            />
                        ) : viewMode === 'terraza' ? (
                            <motion.img
                                key="bg-terraza"
                                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop&v=2"
                                alt="La Terraza Content"
                                className="bg-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 }}
                            />

                        ) : viewMode === 'christmas' ? (
                            <motion.img
                                key="bg-christmas"
                                src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2940&auto=format&fit=crop"
                                alt="Christmas 2025"
                                className="bg-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 }}
                            />
                        ) : viewMode === 'gettogether' ? (
                            <motion.img
                                key="bg-gettogether"
                                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2940&auto=format&fit=crop"
                                alt="Get Together Event"
                                className="bg-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 }}
                            />
                        ) : viewMode === 'hero' ? (
                            <motion.img
                                key="bg-hero-static"
                                src="https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=80&w=2875&auto=format&fit=crop"
                                alt="Barcelona Hero"
                                className="bg-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 }}
                            />
                        ) : (
                            <motion.img
                                key={`bg - detail - ${activeTab} `}
                                src={timelineData[activeTab].img}
                                alt={timelineData[activeTab].title}
                                className="bg-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Text Content Layer - Centered */}
                    <div style={{ zIndex: 20, position: 'relative' }}>
                        <AnimatePresence mode='wait'>
                            {/* Hide text when menu is open for cleaner look, or keep it. Keeping it for now. */}
                            {viewMode === 'hero' ? (
                                <motion.div
                                    key="hero-text"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.8 }}
                                    onClick={handleHomeClick} // Allow clicking text to trigger video too
                                    style={{ cursor: 'pointer' }}
                                >
                                    <h1 className="hero-main-title">Grand<br />Hotel<br />Central</h1>
                                    <h2 className="hero-sub-title">A LUXURY HOTEL STEEPED IN HISTORY IN THE HEART OF BARCELONA</h2>
                                    <p className="hero-geo">A 1920s building by Noucentist architect Adolf Florensa.</p>
                                </motion.div>
                            ) : (viewMode === 'rooftop' || viewMode === 'terraza') ? (
                                <motion.div
                                    key="rooftop-text"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h1 className="hero-main-title">LA TERRAZA DEL CENTRAL</h1>
                                    <p className="hero-sub-title">Bar, restaurant & infinity pool with panoramic views of Barcelona</p>
                                </motion.div>
                            ) : viewMode === 'christmas' ? (
                                <motion.div
                                    key="christmas-text"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h1 className="hero-main-title">MERRY CHRISTMAS</h1>
                                    <p className="hero-sub-title">It's Christmas time at Grand Hotel Central</p>
                                </motion.div>
                            ) : viewMode === 'gettogether' ? (
                                <motion.div
                                    key="gettogether-text"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h1 className="hero-main-title">GET TOGETHER</h1>
                                    <p className="hero-sub-title">Unique event spaces in the heart of the city</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={`detail - text - ${activeTab} `}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h2 className="room-title">{timelineData[activeTab].title}</h2>
                                    <p className="room-desc">{timelineData[activeTab].desc}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </section>

                {/* UI Overlays */}

                {viewMode !== 'gettogether' && (
                    <>
                        {/* Timeline */}
                        <div className="interaction-line-container">
                            <div className="line-track"></div>
                            {timelineData.map((item, i) => (
                                <div className="interaction-node" key={i} onClick={() => handleTimelineClick(i)}>
                                    <div className="node-content">
                                        <item.icon className="node-icon" style={{ opacity: (viewMode === 'details' && activeTab === i) ? 0.5 : 1 }} />
                                        <div className="node-pill" style={{
                                            opacity: (viewMode === 'details' && activeTab === i) ? 1 : undefined,
                                            transform: (viewMode === 'details' && activeTab === i) ? 'scale(1)' : undefined,
                                            pointerEvents: (viewMode === 'details' && activeTab === i) ? 'auto' : undefined
                                        }}>
                                            {item.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Booking Bar */}
                        <div className="booking-bar" onClick={(e) => e.stopPropagation()}>
                            {/* Calendar Overlay Positioned relative or absolute here */}
                            <AnimatePresence>
                                {activeMenu === 'calendar' && <CalendarOverlay />}
                            </AnimatePresence>
                            {/* Occupancy Overlay */}
                            <AnimatePresence>
                                {activeMenu === 'occupancy' && <OccupancyOverlay />}
                            </AnimatePresence>

                            <div className="booking-item" onClick={() => toggleMenu('calendar')}>
                                <span className="booking-label">Check in - Check out</span>
                                <div className="booking-value">SELECT DATES <ChevronDown size={14} className={activeMenu === 'calendar' ? 'rotate-180' : ''} /></div>
                            </div>
                            <div className="booking-item" style={{ flex: 1.2 }} onClick={() => toggleMenu('occupancy')}>
                                <span className="booking-label">Occupancy</span>
                                <div className="booking-value">1 ROOM, 2 ADULTS <ChevronDown size={14} className={activeMenu === 'occupancy' ? 'rotate-180' : ''} /></div>
                            </div>
                            <div className="booking-item">
                                <span className="booking-label">Promo Code</span>
                                <div className="booking-value">ENTER CODE</div>
                            </div>
                            <div className="book-btn-container">
                                <button className="book-btn">BOOK NOW</button>
                            </div>
                        </div>
                    </>
                )}
            </section>

            {
                viewMode === 'gettogether' && (
                    <>
                        <section className="venue-intro-section">
                            <div className="venue-breadcrumbs">
                                <span>HOME</span> <span className="separator">{'>'}</span> <span>HOTEL</span> <span className="separator">{'>'}</span> <span className="active">GET TOGETHER</span> <span className="separator">{'>'}</span>
                            </div>

                            <h2 className="venue-title">YOUR VENUE IN<br />BARCELONA</h2>

                            <p className="venue-description">
                                Celebration is part of our culture. Overlooking Via Laietana, our<br />
                                5-stars hotel in Barcelona<br />
                                offers a set of perfectly preserved unique rooms with the best views. The perfect setting<br />
                                that makes your special occasions become lifelong memories.
                            </p>

                            <a href="#" className="venue-read-more">Read more</a>

                            <button className="venue-brochure-btn">EVENTS BROCHURE</button>
                        </section>

                        <section className="events-spaces-section">
                            <h2 className="spaces-header">OUR SPACES</h2>

                            <div className="room-card">
                                <div className="room-image-wrapper">
                                    <img
                                        src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2940&auto=format&fit=crop"
                                        alt="Florensa Room"
                                        className="room-image"
                                    />
                                </div>
                                <div className="room-content">
                                    <h3 className="room-title-large">FLORENSA ROOM</h3>
                                    <div className="room-specs">
                                        <span className="spec-item"><span className="icon-user">👥</span> 22 - 25</span>
                                        <span className="spec-item"><span className="icon-ruler">📐</span> 38,5 m2</span>
                                    </div>
                                    <p className="room-description">
                                        The rustic wood panelling and sophisticated parquet flooring of this room bring a special charm to social and corporate events. This cosy space with abundant sunlight embraces its historic roots, showcasing intricate architectural details from the 1920s, such as the lofty ceilings and the expansive arched windows that overlook the vibrant Via Laietana.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="events-spaces-section" style={{ paddingTop: 0 }}>
                            <div className="room-card room-card-alternate">
                                <div className="room-content">
                                    <h3 className="room-title-large">THE LIBRARY</h3>
                                    <div className="room-specs">
                                        <span className="spec-item"><span className="icon-user">👥</span> 10 - 30</span>
                                        <span className="spec-item"><span className="icon-ruler">📐</span> 41 m2</span>
                                    </div>
                                    <p className="room-description">
                                        This remarkable architectural jewel has floor-to-ceiling bookshelves reaching gallery level. The double-height space lends an intimate yet exclusive air to press conferences, corporate events and product launches.
                                    </p>
                                    <a href="#" className="room-link-3d">3D VIEW <ArrowRight size={16} /></a>
                                </div>
                                <div className="room-image-wrapper">
                                    <img
                                        src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2938&auto=format&fit=crop"
                                        alt="The Library"
                                        className="room-image"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="events-spaces-section" style={{ paddingTop: 0 }}>
                            <div className="room-card">
                                <div className="room-image-wrapper">
                                    <img
                                        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2940&auto=format&fit=crop"
                                        alt="Laietana Room"
                                        className="room-image"
                                    />
                                </div>
                                <div className="room-content">
                                    <h3 className="room-title-large">LAIETANA ROOM</h3>
                                    <div className="room-specs">
                                        <span className="spec-item"><span className="icon-user">👥</span> 28 - 80</span>
                                        <span className="spec-item"><span className="icon-ruler">📐</span> 82 m2</span>
                                    </div>
                                    <p className="room-description">
                                        An elegant space that spans the entirety of the Via Laietana façade, basking in abundant natural light. The biggest of our event spaces in Barcelona, this room offers impeccable acoustics, refined décor, and impressive views of the city.
                                    </p>
                                    <a href="#" className="room-link-3d">3D VIEW <ArrowRight size={16} /></a>
                                </div>
                            </div>
                        </section>

                        <section className="events-spaces-section" style={{ paddingTop: 0 }}>
                            <div className="room-card room-card-alternate">
                                <div className="room-content">
                                    <h3 className="room-title-large">CONSEJO ROOM</h3>
                                    <div className="room-specs">
                                        <span className="spec-item"><span className="icon-user">👥</span> 8</span>
                                        <span className="spec-item"><span className="icon-ruler">📐</span> 25 m2</span>
                                    </div>
                                    <p className="room-description">
                                        A cosy room designed for private gatherings on the lower floor. This space is perfect for small work meetings and press events, fostering an atmosphere of closeness and teamwork. Conveniently close to the reception area, it ensures easy access for all attendees.
                                    </p>
                                    <a href="#" className="room-link-3d">3D VIEW <ArrowRight size={16} /></a>
                                </div>
                                <div className="room-image-wrapper">
                                    <img
                                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2940&auto=format&fit=crop"
                                        alt="Consejo Room"
                                        className="room-image"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="events-spaces-section" style={{ paddingTop: 0 }}>
                            <div className="room-card">
                                <div className="room-image-wrapper">
                                    <img
                                        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2940&auto=format&fit=crop"
                                        alt="Salón Central"
                                        className="room-image"
                                    />
                                </div>
                                <div className="room-content">
                                    <h3 className="room-title-large">SALÓN CENTRAL</h3>
                                    <div className="room-specs">
                                        <span className="spec-item"><span className="icon-user">👥</span> 18 - 120</span>
                                        <span className="spec-item"><span className="icon-ruler">📐</span> 187 m2</span>
                                    </div>
                                    <p className="room-description">
                                        Located in a quiet area of the hotel, this modern area offers the ideal setting for weddings, private events, product launches and business meetings. The room has large panoramic windows, high ceilings and a modern, sleek design that provide a sophisticated atmosphere for all occasions.
                                    </p>
                                    <a href="#" className="room-link-3d">3D VIEW <ArrowRight size={16} /></a>
                                </div>
                            </div>
                        </section>

                        <section className="events-spaces-section" style={{ paddingTop: '4rem', paddingBottom: '4rem', background: '#f5f5f5' }}>
                            <h2 className="title-large" style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', fontSize: '4rem' }}>CHRISTMAS MENUS</h2>
                            <div className="facilities-container" style={{ alignItems: 'flex-start' }}>
                                <div className="facilities-left" style={{ background: 'transparent', padding: '0 2rem 0 0' }}>
                                    <h3 className="facilities-main-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>CELEBRATE YOUR COMPANY'S CHRISTMAS GATHERING WITH US</h3>
                                    <p className="facilities-desc-text">
                                        You'll find an exquisite selection of Mediterranean dishes that blend authentic, traditional flavors, offering an honest interpretation of market cuisine and the use of seasonal ingredients.
                                    </p>
                                    <p className="facilities-desc-text">
                                        Grand Hotel Central offers exclusive spaces with the best views of the city's Roman wall — the ideal place to celebrate the holidays with your team in an elegant and memorable setting.
                                    </p>
                                </div>
                                <div className="facilities-right">
                                    <img
                                        src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1200"
                                        alt="Christmas Celebration"
                                        className="facilities-image"
                                        style={{ height: 'auto', maxHeight: '500px' }}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="events-spaces-section" style={{ padding: '6rem 2rem', background: '#f0f0eb', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h2 className="title-large" style={{ fontSize: '3.5rem', marginBottom: '2rem', width: '100%', maxWidth: '900px' }}>HOST AN EVENT IN BARCELONA</h2>

                            <p className="facilities-desc-text" style={{ maxWidth: '800px', margin: '0 0 1.5rem 0', textAlign: 'center' }}>
                                From grand rooms for celebrating life's milestones to smaller spaces for private gatherings, The Grand Hotel Central is the perfect venue for your event in Barcelona. Our selection of spacious, unique, sun-drenched spaces of all sizes and types offers endless possibilities to bring your vision to life.
                            </p>

                            <p className="facilities-desc-text" style={{ maxWidth: '800px', margin: '0 0 4rem 0', textAlign: 'center' }}>
                                We have a room to suit all occasions. Our team will be pleased to answer your enquiries.
                            </p>

                            <div style={{ display: 'flex', gap: '4rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <Phone size={30} strokeWidth={1} color="#333" />
                                    <span style={{ fontFamily: 'var(--hotel-font-sans)', color: '#333', fontSize: '1rem' }}>+34 932 957 900</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <Mail size={30} strokeWidth={1} color="#333" />
                                    <span style={{ fontFamily: 'var(--hotel-font-sans)', color: '#333', fontSize: '1rem' }}>events@grandhotelcentral.com</span>
                                </div>
                            </div>

                            {/* Event Inquiry Form */}
                            <div className="event-form-container" style={{ marginTop: '4rem', width: '100%', maxWidth: '800px' }}>
                                <form className="event-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name">Name*</label>
                                            <input type="text" id="name" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="surname">Surname*</label>
                                            <input type="text" id="surname" required />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="email">E-mail*</label>
                                            <input type="email" id="email" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Telephone*</label>
                                            <input type="tel" id="phone" required />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="people">Number of people*</label>
                                            <input type="number" id="people" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="date">Date*</label>
                                            <div className="date-input-wrapper">
                                                <input type="date" id="date" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group full-width">
                                        <label htmlFor="comments">Do you have any comments?</label>
                                        <textarea id="comments" rows="4"></textarea>
                                    </div>

                                    <div className="form-footer">
                                        <div className="legal-check">
                                            <input type="checkbox" id="legal" required />
                                            <label htmlFor="legal">I have read and accept the <a href="#">legal notice</a> and the <a href="#">privacy policy</a>.</label>
                                        </div>
                                        <button type="submit" className="form-submit-btn">SEND</button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </>
                )
            }

            {viewMode === 'christmas' && (
                <section className="info-section" style={{ backgroundColor: '#f9f9f9', padding: '4rem 2rem', minHeight: '60vh' }}>
                    <div className="location-breadcrumbs" style={{ fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '4rem', letterSpacing: '0.1em', color: '#666', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        <span>HOME</span> <span>{'>'}</span> <span style={{ fontWeight: 'bold', color: '#121212' }}>CHRISTMAS 2025</span> <span>{'>'}</span>
                    </div>

                    <div className="info-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <h2 className="info-title" style={{ fontSize: '4.5rem', maxWidth: '1000px', lineHeight: '1.1', marginBottom: '2rem' }}>CHRISTMAS IN<br />BARCELONA</h2>
                        <p className="info-text" style={{ fontSize: '1.2rem', maxWidth: '900px', lineHeight: '1.6', color: '#555', marginBottom: '1.5rem' }}>
                            Embrace the magic of Christmas at Grand Hotel Central. Celebrate the holidays in
                            Barcelona like never before with our exclusive culinary experiences in the heart of the city.
                        </p>
                        <p className="info-text" style={{ fontSize: '1.2rem', maxWidth: '900px', lineHeight: '1.6', color: '#555', marginBottom: '1.5rem' }}>
                            We invite you to enjoy a carefully crafted selection of traditional dishes, prepared
                            exclusively for this festive season, along with a special menu on Boxing Day, perfect for
                            sharing memorable moments with your loved ones.
                        </p>
                        <p className="info-text" style={{ fontSize: '1.2rem', maxWidth: '900px', lineHeight: '1.6', color: '#555', marginBottom: '1.5rem' }}>
                            To end 2025 in style, we've also prepared an exclusive New Year's Eve menu, featuring live
                            music, appetisers with city views, a DJ set, and the traditional lucky grapes at midnight.
                        </p>
                        <p className="info-text" style={{ fontSize: '1.2rem', maxWidth: '900px', lineHeight: '1.6', color: '#555', marginBottom: '2.5rem' }}>
                            Discover our festive offerings and book your table for an unforgettable Christmas dining
                            experience in Barcelona.
                        </p>
                    </div>

                    <div className="christmas-image-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1200px',
                        margin: '4rem auto 0',
                        width: '100%',
                        padding: '0 2rem'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                            <img src="https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=500&auto=format&fit=crop" alt="Christmas Menu 1" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                            <img src="https://images.unsplash.com/photo-1576506542790-51244b486a6b?q=80&w=500&auto=format&fit=crop" alt="Christmas Menu 2" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                            <img src="https://images.unsplash.com/photo-1532339142463-fd0a8979791a?q=80&w=500&auto=format&fit=crop" alt="Christmas Menu 3" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                        </div>
                    </div>

                    <div className="christmas-text-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '3rem',
                        maxWidth: '1200px',
                        margin: '5rem auto 0',
                        width: '100%',
                        padding: '0 2rem',
                        textAlign: 'left'
                    }}>
                        {/* Column 1 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
                            <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2.5rem', fontWeight: '400', margin: 0 }}>CHRISTMAS</h3>
                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', lineHeight: '1.6', color: '#555' }}>
                                We invite you to enjoy tradition at Can Bo with a special selection of Christmas dishes off the menu.
                            </p>
                            <a href="#" style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '0.8rem', color: '#121212', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginTop: 'auto' }}>
                                DISCOVER THEM <span style={{ fontSize: '1.2em' }}>→</span>
                            </a>
                        </div>

                        {/* Column 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
                            <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2.5rem', fontWeight: '400', margin: 0 }}>BOXING DAY</h3>
                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', lineHeight: '1.6', color: '#555' }}>
                                Celebrate December 26th with a special menu at Can Bo, crafted with typical dishes of the season and a carefully selected wine list.
                            </p>
                            <a href="#" style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '0.8rem', color: '#121212', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginTop: 'auto' }}>
                                VIEW MENU <span style={{ fontSize: '1.2em' }}>→</span>
                            </a>
                        </div>

                        {/* Column 3 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
                            <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '3rem', fontWeight: '400', margin: 0, lineHeight: 1 }}>NEW YEAR'S EVE</h3>
                            <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', lineHeight: '1.6', color: '#555' }}>
                                Enjoy a special evening and create memories that will kick of an extraordinary year. Appetizers with the best views of Barcelona from la Terraza del Central. A delicious dinner at Can Bo with a tasting menu designed by our chef. Live music and many more surprises.
                            </p>
                            <a href="#" style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '0.8rem', color: '#121212', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginTop: 'auto' }}>
                                VIEW MENU <span style={{ fontSize: '1.2em' }}>→</span>
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {
                viewMode === 'christmas' && (
                    <section className="booking-section" style={{ backgroundColor: '#f2f0eb', padding: '4rem 2rem', color: '#121212' }}>
                        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                            <h2 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '3rem', textAlign: 'center', marginBottom: '3rem', fontWeight: '400', letterSpacing: '0.05em' }}>BOOKING</h2>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                                {/* Left Col */}
                                <div style={{ textAlign: 'center' }}>
                                    <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '0 auto 2rem', width: '100%' }} />
                                    <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '400' }}>CAN BO RESTAURANT</h3>
                                    <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', marginBottom: '0.5rem', color: '#333' }}>From 12.30pm to 12am</p>
                                    <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', marginBottom: '2rem', color: '#333', maxWidth: '300px', margin: '0 auto 2rem' }}>Kitchen open from 12.30pm to 4pm and 19pm to 10.30pm</p>

                                    <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '2rem auto', width: '60%' }} />

                                    <h3 style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '400' }}>INFO & BOOKINGS</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#333' }}>
                                        <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem' }}>Via Laietana, 30 - 08003 Barcelona</p>
                                        <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem' }}>+34 932 957 905</p>
                                        <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem' }}>info@canbo.es</p>
                                    </div>
                                </div>

                                {/* Right Col */}
                                <div>
                                    {/* Calendar */}
                                    <div style={{ backgroundColor: '#f9f9f9', padding: '1.5rem', marginBottom: '2rem', borderRadius: '4px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                            <ChevronLeft size={20} style={{ cursor: 'pointer', color: '#999' }} onClick={handleCanBoPrevMonth} />
                                            <span style={{ fontFamily: 'var(--hotel-font-sans)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                {canBoDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                            </span>
                                            <ChevronRight size={20} style={{ cursor: 'pointer', color: '#999' }} onClick={handleCanBoNextMonth} />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center', fontFamily: 'var(--hotel-font-sans)', fontSize: '0.8rem', color: '#999' }}>
                                            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <div key={d} style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{d}</div>)}
                                            {renderCanBoCalendar()}
                                        </div>
                                    </div>

                                    {/* Form Elements */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontFamily: 'var(--hotel-font-sans)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#666' }}>Number of people</label>
                                            <div style={{ position: 'relative', border: 'none', padding: '0.8rem', backgroundColor: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }} onClick={() => setCanBoPeopleOpen(!canBoPeopleOpen)}>
                                                {canBoSelectedPeople}
                                                <ChevronDown size={14} style={{ color: '#333' }} />
                                                {canBoPeopleOpen && (
                                                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: '1px solid #eee', zIndex: 10 }}>
                                                        {['1 person', '2 people', '3 people', '4 people', '5 people', '6 people'].map(opt => (
                                                            <div key={opt} style={{ padding: '0.5rem', borderBottom: '1px solid #f5f5f5' }} onClick={() => setCanBoSelectedPeople(opt)}>{opt}</div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontFamily: 'var(--hotel-font-sans)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#666' }}>Time</label>
                                            <div style={{ position: 'relative', border: 'none', padding: '0.8rem', backgroundColor: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }} onClick={() => setCanBoTimeOpen(!canBoTimeOpen)}>
                                                {canBoSelectedTime}
                                                <ChevronDown size={14} style={{ color: '#333' }} />
                                                {canBoTimeOpen && (
                                                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: '1px solid #eee', zIndex: 10, maxHeight: '200px', overflowY: 'auto' }}>
                                                        {['12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(opt => (
                                                            <div key={opt} style={{ padding: '0.5rem', borderBottom: '1px solid #f5f5f5' }} onClick={() => setCanBoSelectedTime(opt)}>{opt}</div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <button style={{ backgroundColor: '#c75b39', color: 'white', border: 'none', padding: '1rem', fontFamily: 'var(--hotel-font-sans)', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem', letterSpacing: '0.05em' }}>BOOK</button>
                                        <button style={{ backgroundColor: 'transparent', color: 'black', border: '1px solid black', padding: '1rem', fontFamily: 'var(--hotel-font-sans)', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem', letterSpacing: '0.05em' }}>GROUP REQUEST</button>
                                    </div>

                                    <div style={{ marginTop: '2rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                        <h4 style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 'bold', color: '#121212' }}>Looking for the perfect gift?</h4>
                                        <p style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>Surprise someone special with an experience at Can Bo.</p>
                                        <button style={{ width: '100%', backgroundColor: '#262e33', color: 'white', border: 'none', padding: '1rem', fontFamily: 'var(--hotel-font-sans)', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px', fontSize: '0.9rem' }}>Gift Can Bo</button>
                                    </div>

                                    <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: '#666', fontFamily: 'var(--hotel-font-sans)' }}>
                                        <span style={{ color: '#3b8dd4', fontWeight: 'bold' }}>CoverManager</span> means Hospitality <span style={{ color: '#f5c518' }}>♥</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }

            {
                (viewMode === 'terraza' || viewMode === 'rooftop') && (
                    <section className="info-section" style={{ backgroundColor: '#f9f9f9', padding: '4rem 2rem', minHeight: '60vh' }}>
                        <div className="location-breadcrumbs" style={{ fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '4rem', letterSpacing: '0.1em', color: '#666', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                            <span>HOME</span> <span>{'>'}</span> <span style={{ fontWeight: 'bold', color: '#121212' }}>ROOFTOP</span> <span>{'>'}</span>
                        </div>

                        <div className="info-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <p className="info-pre-header" style={{ marginBottom: '1rem', fontFamily: 'var(--hotel-font-sans)', fontSize: '1.2rem', color: '#333' }}>Above Barcelona</p>
                            <h2 className="info-title" style={{ fontSize: '4.5rem', maxWidth: '1000px', lineHeight: '1.1', marginBottom: '2rem' }}>AN EXPERIENCE FROM<br />SUNRISE UNTIL SUNSET</h2>
                            <p className="info-text" style={{ fontSize: '1.2rem', maxWidth: '900px', lineHeight: '1.6', color: '#555', marginBottom: '2.5rem' }}>
                                On the eighth floor, high above the bustling streets of the Gothic Quarter, La Terraza del
                                Central offers Mediterranean-inspired cuisine, delicious cocktails and stunning views. A
                                true urban oasis in the heart of the city complete with picturesque infinity pool and
                                Balinese beds. With a relaxed atmosphere, La Terraza del Central is perfect for dining,
                                drinking and enjoying spectacular views of downtown Barcelona.
                            </p>
                            <a href="#" className="info-read-more" style={{ fontSize: '1.1rem', fontWeight: 'bold', borderBottom: '2px solid #121212' }}>Read more</a>
                        </div>
                    </section>
                )
            }

            {
                viewMode !== 'gettogether' && viewMode !== 'terraza' && viewMode !== 'rooftop' && viewMode !== 'christmas' && (
                    <>

                        {/* Info Section */}
                        <section className="info-section">
                            <div className="info-content">
                                <p className="info-pre-header">Connect with the city’s past and present</p>
                                <h2 className="info-title">GRAND HOTEL CENTRAL, AN OPEN HOME WHERE THE UNEXPECTED UNFOLDS</h2>
                                <p className="info-text">
                                    Welcome to The Grand Hotel Central, our five-star hotel in Barcelona’s old town, which connects guests to the culture and creativity of this iconic city. A meticulous top-to-toe refurbishment in 2023 saw all our rooms and suites, two restaurants and bars, rooftop pool and terrace completely reimagined in Catalan Noucentisme style.
                                </p>
                                <a href="#" className="info-read-more">Read more</a>
                            </div>


                            <div className="feature-grid">
                                <div className="feature-card">
                                    <MapPin size={32} strokeWidth={1} />
                                    <span>City center</span>
                                </div>
                                <div className="feature-card">
                                    <Calendar size={32} strokeWidth={1} />
                                    <span>Events</span>
                                </div>
                                <div className="feature-card">
                                    <Dumbbell size={32} strokeWidth={1} />
                                    <span>Gym</span>
                                </div>
                                <div className="feature-card">
                                    <Waves size={32} strokeWidth={1} />
                                    <span>Pool</span>
                                </div>
                                <div className="feature-card">
                                    <Utensils size={32} strokeWidth={1} />
                                    <span>Restaurant</span>
                                </div>
                                <div className="feature-card">
                                    <Martini size={32} strokeWidth={1} />
                                    <span>Rooftop</span>
                                </div>
                                <div className="feature-card">
                                    <Flower2 size={32} strokeWidth={1} />
                                    <span>Spa</span>
                                </div>
                            </div>
                        </section>

                        {/* Suites & Rooms Carousel Section */}
                        <section className="suites-carousel-section">
                            <h2 className="carousel-title">SUITES & ROOMS</h2>

                            <div className="carousel-container">
                                <button className="carousel-arrow left" onClick={prevSuite}>
                                    <ChevronDown size={30} className="rotate-90" />
                                </button>

                                <div className="carousel-content">
                                    <AnimatePresence mode='wait'>
                                        <motion.div
                                            key={currentSuiteIndex}
                                            className="carousel-slide"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <img
                                                src={menuData.rooms[currentSuiteIndex].img}
                                                alt={menuData.rooms[currentSuiteIndex].title}
                                                className="carousel-image"
                                            />
                                            <div className="carousel-overlay-text">
                                                {menuData.rooms[currentSuiteIndex].title}
                                                <button className="carousel-btn">DISCOVER</button>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <button className="carousel-arrow right" onClick={nextSuite}>
                                    <ChevronDown size={30} className="rotate-270" />
                                </button>
                            </div>
                        </section>

                        {/* Eat & Drink Section */}
                        <section className="eat-drink-section">
                            <h2 className="section-title-center">EAT & DRINK</h2>

                            <div className="eat-drink-grid">
                                {/* Card 1 */}
                                <div className="eat-card">
                                    <div className="eat-card-image-wrapper">
                                        <img
                                            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=500&auto=format&fit=crop"
                                            alt="Christmas 2025"
                                            className="eat-card-image"
                                        />
                                        <a href="#" className="eat-card-link">FIND OUT MORE <ArrowRight size={16} /></a>
                                    </div>
                                    <h3 className="eat-card-title">CHRISTMAS 2025</h3>
                                </div>

                                {/* Card 2 */}
                                <div className="eat-card">
                                    <div className="eat-card-image-wrapper">
                                        <img
                                            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format&fit=crop"
                                            alt="Restaurant Can Bo"
                                            className="eat-card-image"
                                        />
                                        <a href="#" className="eat-card-link">FIND OUT MORE <ArrowRight size={16} /></a>
                                    </div>
                                    <h3 className="eat-card-title">RESTAURANT CAN BO</h3>
                                </div>

                                {/* Card 3 */}
                                <div className="eat-card">
                                    <div className="eat-card-image-wrapper">
                                        <img
                                            src="https://images.unsplash.com/photo-1570213489059-0aac6626cade?q=80&w=500&auto=format&fit=crop"
                                            alt="La Terraza Del Central"
                                            className="eat-card-image"
                                        />
                                        <a href="#" className="eat-card-link">FIND OUT MORE <ArrowRight size={16} /></a>
                                    </div>
                                    <h3 className="eat-card-title">LA TERRAZA DEL CENTRAL</h3>
                                </div>
                            </div>
                        </section>

                        {/* What's On Section */}
                        <section className="whats-on-section">
                            <h2 className="whats-on-title">WHAT'S ON</h2>
                            <div className="whats-on-grid">
                                {/* Card 1 */}
                                <div className="wo-card">
                                    <div className="wo-image-container">
                                        <img src="https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=800&auto=format&fit=crop" alt="Christmas" />
                                    </div>
                                    <div className="wo-content">
                                        <div className="wo-tag">CHRISTMAS</div>
                                        <h3 className="wo-card-title">CHRISTMAS MENUS</h3>
                                        <a href="#" className="wo-link highlight">MORE INFO <ArrowRight size={16} /></a>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="wo-card">
                                    <div className="wo-image-container">
                                        <img src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=800&auto=format&fit=crop" alt="NYE" />
                                    </div>
                                    <div className="wo-content">
                                        <div className="wo-tag">EVENT</div>
                                        <div className="wo-date">December 31</div>
                                        <h3 className="wo-card-title">NEW YEAR'S EVE DINER</h3>
                                        <a href="#" className="wo-link">MORE INFO <ArrowRight size={16} /></a>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="wo-card">
                                    <div className="wo-image-container">
                                        <img src="https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800&auto=format&fit=crop" alt="Culture" />
                                    </div>
                                    <div className="wo-content">
                                        <div className="wo-tag">CULTURE</div>
                                        <h3 className="wo-card-title">CULTURA EN VIVO BY GRAND HOTEL CENTRAL</h3>
                                        <a href="#" className="wo-link">MORE INFO <ArrowRight size={16} /></a>
                                    </div>
                                </div>
                            </div>
                            {/* Navigation Arrows (Visual only for now as requested '3 cards in same image' usually means static grid, but arrows imply carousels. Adding static arrows for visual match) */}
                            <button className="wo-arrow left"><ChevronDown size={30} className="rotate-90" /></button>
                            <button className="wo-arrow right"><ChevronDown size={30} className="rotate-270" /></button>
                        </section>

                        {/* Explore the Area Section */}
                        <section className="info-section">

                            <div className="info-content">
                                <p className="info-pre-header">Explore the area</p>
                                <h2 className="info-title">THE PLACE TO BE, AN UNBEATABLE LOCATION</h2>
                                <p className="info-text">
                                    In the heart of Barcelona's old town, Grand Hotel Central is a one-of-a-kind destination. Close to all attractions while maintaining a peaceful atmosphere. Nestled between the lively Gothic Quarter with its spectacular cathedral and the historic city walls, and El Born, the city's trendy neighbourhood.
                                </p>
                            </div>

                            <div className="explore-gallery">
                                <div className="explore-col">
                                    <img src="/images/gallery/barcelona_arch_1766062364573.png" alt="Gothic Quarter Arch" className="explore-img" />
                                    <img src="/images/gallery/barcelona_street_1766062383984.png" alt="Barcelona Street" className="explore-img" />
                                </div>
                                <div className="explore-col">
                                    <img src="/images/gallery/barcelona_promenade_1766062419543.png" alt="Barceloneta Beach Promenade" className="explore-img" />
                                    <img src="/images/gallery/barcelona_city_1766062400884.png" alt="City View" className="explore-img" />
                                </div>
                                <div className="explore-col">
                                    <img src="/images/gallery/barcelona_facade_1766062443783.png" alt="Historic Facade" className="explore-img" />
                                    <img src="/images/gallery/barcelona_street_1766062383984.png" alt="Evening Street" className="explore-img" />
                                </div>
                            </div>

                            <div className="read-more-container" style={{ marginTop: '3rem' }}>
                                <a href="#" className="info-read-more">Read more</a>
                            </div>
                        </section>

                        <section className="spa-section" style={{ padding: '4rem 2rem', backgroundColor: '#f4f4f4' }}>
                            <div className="spa-container">
                                <div className="spa-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                                    <Star size={30} fill="#121212" strokeWidth={0} style={{ marginBottom: '1rem' }} />
                                    <h2 className="spa-title" style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '4rem', fontWeight: '300', textTransform: 'uppercase', color: '#121212' }}>SPA & MASSAGE</h2>
                                </div>

                                <div className="spa-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                                    <div className="spa-content-left" style={{ textAlign: 'left' }}>
                                        <div className="spa-text-block" style={{ marginBottom: '3rem' }}>
                                            <h3 className="spa-subtitle" style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', fontWeight: '300', marginBottom: '1rem', textTransform: 'uppercase' }}>WELLBEING</h3>
                                            <p className="spa-desc" style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', lineHeight: '1.6', color: '#666' }}>
                                                Our hotel spa in Barcelona offers a thermal area, massages and a wide catalogue of wellness treatments by Natura Bissé. Choose between a dry sauna, with minimum humidity and comfortable heat, or the Hamman's high temperatures and 95% humidity.
                                            </p>
                                        </div>

                                        <div className="spa-divider" style={{ width: '100%', height: '1px', backgroundColor: '#ccc', margin: '2rem 0' }}></div>

                                        <div className="spa-text-block">
                                            <h3 className="spa-subtitle" style={{ fontFamily: 'var(--hotel-font-serif)', fontSize: '2rem', fontWeight: '300', marginBottom: '1rem', textTransform: 'uppercase' }}>OPENING HOURS</h3>
                                            <p className="spa-desc" style={{ fontFamily: 'var(--hotel-font-sans)', fontSize: '1rem', lineHeight: '1.6', color: '#666' }}>
                                                From 12pm to 8pm<br />
                                                Outside these hours, reservation required for treatments and Wellbeing area access
                                            </p>
                                        </div>
                                    </div>

                                    <div className="spa-image-right">
                                        <img
                                            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2940&auto=format&fit=crop"
                                            alt="Spa Treatment"
                                            className="spa-image"
                                            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Gym & Fitness Section */}
                        <section className="gym-section">
                            <div className="gym-container">
                                <div className="gym-grid">
                                    <div className="gym-image-left">
                                        <img
                                            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
                                            alt="Gym and Fitness"
                                            className="gym-image"
                                        />
                                    </div>

                                    <div className="gym-content-right">
                                        <h2 className="gym-title">GYM & FITNESS</h2>
                                        <p className="gym-desc">
                                            The fitness room's machines and fitness equipment cater to your workout needs. Follow your fitness routine while enjoying spectacular Barcelona views. Whether you're aiming for a vigorous workout or a gentle stretch, the gym is the place to be active and achieve your wellness goals.
                                        </p>

                                        <h3 className="gym-subtitle">EQUIPMENT</h3>
                                        <div className="gym-equipment-list">
                                            <ul className="equipment-col">
                                                <li>Elliptical</li>
                                                <li>Wall bars</li>
                                                <li>Exercise bikes</li>
                                                <li>Smith Machine</li>
                                            </ul>
                                            <ul className="equipment-col">
                                                <li>Elastic and loop bands</li>
                                                <li>Kettlebell 8-20kg</li>
                                                <li>TRX</li>
                                                <li>AB wheel</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Hidden Treasures Section */}
                        <section className="info-section secrets-section" style={{ paddingTop: '0' }}>
                            <div className="info-content">
                                <p className="info-pre-header">Hidden treasures</p>
                                <h2 className="info-title">CASA FRANCESC CAMBÓ<br />I BATLLE</h2>
                                <p className="info-text" style={{ maxWidth: '800px', margin: '0 auto 3rem auto' }}>
                                    Explore the Grand Hotel Central, the former home of Francesc Cambó. This elegant building, built in the Roaring Twenties, was constructed along Barcelona's Via Laietana, giving life to the Old town neighbourhood. This historic building, designed by the brilliant Catalan Noucentista architect Adolf Florensa, was reimagined as a hotel in 2005 and completely refurbished in 2024.
                                </p>
                            </div>
                            <div className="secrets-container">
                                {/* Left Key Image */}
                                <div className="secrets-side-img left">
                                    <img src="/images/treasure_key.png" alt="Key" className="treasure-icon-img" />
                                </div>

                                {/* Center Content */}
                                <div className="info-content secrets-content">

                                    <div className="secrets-pre-header">
                                        <Star size={20} fill="currentColor" strokeWidth={0} className="secrets-star" />
                                        <p>completely refurbished in 2024.</p>
                                    </div>

                                    <div className="secrets-title-wrapper">
                                        <h2 className="info-title secrets-main-title">
                                            <span className="text-gold">THE</span><br />
                                            <span className="text-gold">SECRETS</span>
                                        </h2>
                                        <div className="secrets-row-top">
                                            <span className="text-gold">OF</span>
                                            <span className="text-dark">CASA</span>
                                        </div>
                                        <div className="secrets-row-bottom">
                                            <span className="text-dark title-small">FRANCESC</span>
                                            <span className="text-dark title-large">CAMBÓ</span>
                                            <span className="text-dark title-small">I BATLLE</span>
                                        </div>
                                        <div className="secrets-knocker-container">
                                            <img src="https://placehold.co/100x100/transparent/333333/png?text=Lion" alt="Lion Knocker" className="knocker-img" />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Flower Image */}
                                <div className="secrets-side-img right">
                                    <Flower2 size={120} strokeWidth={0.5} className="treasure-icon-svg" />
                                </div>
                            </div>
                        </section>

                        {/* Gym & Fitness Section */}
                        <section className="gym-section">
                            <div className="gym-container">
                                <div className="gym-grid">
                                    <div className="gym-image-left">
                                        <img
                                            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
                                            alt="Gym and Fitness"
                                            className="gym-image"
                                        />
                                    </div>

                                    <div className="gym-content-right">
                                        <h2 className="gym-title">GYM & FITNESS</h2>
                                        <p className="gym-desc">
                                            The fitness room's machines and fitness equipment cater to your workout needs. Follow your fitness routine while enjoying spectacular Barcelona views. Whether you're aiming for a vigorous workout or a gentle stretch, the gym is the place to be active and achieve your wellness goals.
                                        </p>

                                        <h3 className="gym-subtitle">EQUIPMENT</h3>
                                        <div className="gym-equipment-list">
                                            <ul className="equipment-col">
                                                <li>Elliptical</li>
                                                <li>Wall bars</li>
                                                <li>Exercise bikes</li>
                                                <li>Smith Machine</li>
                                            </ul>
                                            <ul className="equipment-col">
                                                <li>Elastic and loop bands</li>
                                                <li>Kettlebell 8-20kg</li>
                                                <li>TRX</li>
                                                <li>AB wheel</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>






                    </>
                )
            }

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
                            <X size={32} />
                        </button>
                        <div className="mobile-menu-item" onClick={() => { setActiveMenu('hotel'); setMobileMenuOpen(false); }}>HOTEL</div>
                        <div className="mobile-menu-item" onClick={() => { setActiveMenu('rooms'); setMobileMenuOpen(false); }}>ROOMS & SUITES</div>
                        <div className="mobile-menu-item" onClick={() => { setActiveMenu('eat'); setMobileMenuOpen(false); }}>EAT & DRINK</div>
                        <div className="mobile-menu-item" onClick={() => { setActiveMenu('savvy'); setMobileMenuOpen(false); }}>LOCAL SAVVY</div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer Section */}
            <Footer />
        </div >
    );
};

export default HotelLanding;



