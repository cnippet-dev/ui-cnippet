"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
    ChevronDown,
    CheckCircle,
    Shield,
    CreditCard,
    Zap,
    Clock,
    Sparkles,
    Gift,
    CreditCardIcon,
    Star,
    DollarSign,
    Globe,
    ChevronLeft,
    ChevronRight,
    Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreditCardLanding() {
    const [isMounted, setIsMounted] = useState(false);
    const [activeCard, setActiveCard] = useState(0);
    const [activeBenefit, setActiveBenefit] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const benefitsRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Transform values for the hero credit card
    const cardX = useTransform(
        scrollYProgress,
        [0, 0.2, 0.3],
        ["0%", "-20%", "-20%"],
    );
    const cardY = useTransform(
        scrollYProgress,
        [0, 0.2, 0.3],
        ["-40%", "300%", "300%"],
    );
    const cardRotateX = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 0, 0]);
    const cardRotateY = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 0, 0]);
    const cardRotateZ = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 0, 0]);
    const cardScale = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 0.9, 1]);
    const cardOpacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 1]);

    // Transform values for the features card
    const featuresCardX = useTransform(
        scrollYProgress,
        [0.25, 0.4],
        ["0%", "-180%"],
    );
    const featuresCardY = useTransform(
        scrollYProgress,
        [0.25, 0.4],
        ["1%", "280%"],
    );
    const featuresCardRotateX = useTransform(
        scrollYProgress,
        [0.25, 0.4, 0.5],
        [0, 0, -45],
    );
    const featuresCardRotateY = useTransform(
        scrollYProgress,
        [0.25, 0.4, 0.5],
        [1, 0, 60],
    );
    const featuresCardRotateZ = useTransform(
        scrollYProgress,
        [0.25, 0.4, 0.5],
        [0, 0, 15],
    );
    const featuresCardScale = useTransform(
        scrollYProgress,
        [0.25, 0.4, 0.5],
        [1, 1, 0.7],
    );
    const featuresCardOpacity = useTransform(
        scrollYProgress,
        [0.25, 0.35, 0.45, 0.5],
        [1, 1, 0, 0],
    );

    // Transform values for the benefits card
    const benefitsCardX = useTransform(
        scrollYProgress,
        [0.45, 0.6, 0.7],
        ["100%", "0%", "-100%"],
    );
    const benefitsCardY = useTransform(
        scrollYProgress,
        [0.45, 0.6, 0.7],
        ["100%", "0%", "-100%"],
    );
    const benefitsCardRotateX = useTransform(
        scrollYProgress,
        [0.45, 0.6, 0.7],
        [30, 0, -30],
    );
    const benefitsCardRotateY = useTransform(
        scrollYProgress,
        [0.45, 0.6, 0.7],
        [45, 0, -45],
    );
    const benefitsCardRotateZ = useTransform(
        scrollYProgress,
        [0.45, 0.6, 0.7],
        [10, 0, -10],
    );
    const benefitsCardScale = useTransform(
        scrollYProgress,
        [0.45, 0.6, 0.7],
        [0.7, 1, 0.7],
    );
    const benefitsCardOpacity = useTransform(
        scrollYProgress,
        [0.45, 0.55, 0.65, 0.7],
        [0, 1, 1, 0],
    );

    // Auto-rotate cards in benefits section
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Auto-rotate benefits
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveBenefit((prev) => (prev + 1) % 6);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Flip card effect
    const handleCardFlip = () => {
        setIsFlipped(!isFlipped);
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    // Card variants for different designs
    const cardVariants = [
        {
            name: "Standard",
            gradient: "from-primary to-purple-600",
            chip: "bg-yellow-400",
            benefits: ["No annual fee", "3% cashback", "Basic insurance"],
        },
        {
            name: "Premium",
            gradient: "from-rose-500 to-pink-600",
            chip: "bg-gold-400",
            benefits: ["$99 annual fee", "5% cashback", "Premium insurance"],
        },
        {
            name: "Platinum",
            gradient: "from-slate-700 to-slate-900",
            chip: "bg-slate-300",
            benefits: ["$199 annual fee", "7% cashback", "Elite insurance"],
        },
    ];

    // Benefits data
    const benefits = [
        {
            title: "5% Cash Back",
            description:
                "Earn 5% cash back on all purchases, with no caps or category restrictions.",
            icon: <DollarSign className="h-6 w-6" />,
            color: "bg-green-500",
        },
        {
            title: "Travel Insurance",
            description:
                "Comprehensive travel insurance for peace of mind on all your journeys.",
            icon: <Globe className="h-6 w-6" />,
            color: "bg-blue-500",
        },
        {
            title: "No Foreign Transaction Fees",
            description:
                "Use your card worldwide without paying extra fees on foreign transactions.",
            icon: <Zap className="h-6 w-6" />,
            color: "bg-yellow-500",
        },
        {
            title: "Price Protection",
            description:
                "If a price drops on an item you purchased, we'll refund the difference.",
            icon: <Shield className="h-6 w-6" />,
            color: "bg-purple-500",
        },
        {
            title: "Extended Warranty",
            description:
                "Double the manufacturer's warranty on eligible purchases, up to one additional year.",
            icon: <Clock className="h-6 w-6" />,
            color: "bg-red-500",
        },
        {
            title: "Concierge Service",
            description:
                "Access to a personal concierge for travel planning, dining reservations, and more.",
            icon: <Star className="h-6 w-6" />,
            color: "bg-indigo-500",
        },
    ];

    return (
        <div className="bg-gradient-to-b from-slate-50 to-white">
            {/* Header */}
            <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-2">
                        <CreditCard className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold">PrimeCard</span>
                    </div>
                    <nav className="hidden items-center gap-8 md:flex">
                        <Link
                            href="#features"
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                        >
                            Features
                        </Link>
                        <Link
                            href="#benefits"
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                        >
                            Benefits
                        </Link>
                        <Link
                            href="#testimonials"
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                        >
                            Testimonials
                        </Link>
                        <Link
                            href="#faq"
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                        >
                            FAQ
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden sm:inline-flex"
                        >
                            Log in
                        </Button>
                        <Button size="sm">Apply Now</Button>
                    </div>
                </div>
            </header>

            <div ref={containerRef} className="relative pt-20">
                {/* Hero Section */}
                <section className="relative flex min-h-[90vh] items-center">
                    <div className="container mx-auto px-4 py-20">
                        <div className="grid items-center gap-12 md:grid-cols-2">
                            <div className="space-y-6">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
                                >
                                    The smarter way to manage your finances
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="max-w-md text-lg text-slate-600 md:text-xl"
                                >
                                    Unlock premium benefits, earn rewards on
                                    every purchase, and take control of your
                                    financial future.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="flex flex-col gap-4 pt-4 sm:flex-row"
                                >
                                    <Button size="lg" className="font-medium">
                                        Apply Now
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="font-medium"
                                    >
                                        Learn More
                                    </Button>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="flex items-center gap-2 pt-4 text-sm text-slate-500"
                                >
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                    <span>No annual fee</span>
                                    <span className="mx-2">•</span>
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                    <span>5% cashback</span>
                                    <span className="mx-2">•</span>
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                    <span>Instant approval</span>
                                </motion.div>
                            </div>
                            <div className="relative flex justify-center">
                                <motion.div
                                    ref={cardRef}
                                    style={{
                                        x: cardX,
                                        y: cardY,
                                        rotateX: cardRotateX,
                                        rotateY: cardRotateY,
                                        rotateZ: cardRotateZ,
                                        scale: cardScale,
                                        opacity: cardOpacity,
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        rotateY: 15,
                                        transition: { duration: 0.3 },
                                    }}
                                    onClick={handleCardFlip}
                                    className="perspective-1000 absolute z-10 cursor-pointer"
                                >
                                    <FlippableCard
                                        isFlipped={isFlipped}
                                        frontContent={
                                            <CreditCardComponent
                                                gradient="from-primary to-purple-600"
                                                name="JOHN DOE"
                                                number="•••• •••• •••• 4242"
                                                expiry="12/28"
                                                showShine={true}
                                            />
                                        }
                                        backContent={
                                            <CreditCardBack
                                                gradient="from-primary to-purple-600"
                                                cvv="123"
                                            />
                                        }
                                    />
                                </motion.div>
                                <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-slate-100 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 transform animate-bounce flex-col items-center">
                        <span className="mb-2 text-sm text-slate-500">
                            Scroll to explore
                        </span>
                        <ChevronDown className="h-6 w-6 text-slate-400" />
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="bg-slate-50 py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                                Designed for your financial success
                            </h2>
                            <p className="text-lg text-slate-600">
                                Our credit card comes with features that help
                                you build credit, save money, and secure your
                                financial future.
                            </p>
                        </div>

                        <div className="grid items-center gap-16 md:grid-cols-2">
                            <div className="order-2 space-y-8 md:order-1">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="flex gap-4"
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold text-slate-900">
                                            Instant Approval
                                        </h3>
                                        <p className="text-slate-600">
                                            Get approved in minutes with our
                                            streamlined application process and
                                            start using your card right away.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex gap-4"
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold text-slate-900">
                                            Advanced Security
                                        </h3>
                                        <p className="text-slate-600">
                                            Rest easy with fraud protection,
                                            purchase protection, and real-time
                                            transaction alerts.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex gap-4"
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Clock className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold text-slate-900">
                                            24/7 Support
                                        </h3>
                                        <p className="text-slate-600">
                                            Our dedicated support team is
                                            available around the clock to assist
                                            you with any questions or concerns.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="flex gap-4"
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Smartphone className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold text-slate-900">
                                            Mobile App Control
                                        </h3>
                                        <p className="text-slate-600">
                                            Manage your card, track spending,
                                            and receive instant notifications
                                            through our intuitive mobile app.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="order-1 flex justify-center md:order-2">
                                <motion.div
                                    style={{
                                        x: featuresCardX,
                                        y: featuresCardY,
                                        rotateX: featuresCardRotateX,
                                        rotateY: featuresCardRotateY,
                                        rotateZ: featuresCardRotateZ,
                                        scale: featuresCardScale,
                                        opacity: featuresCardOpacity,
                                    }}
                                    whileHover={{
                                        // scale: 1.05,
                                        // rotateY: 15,
                                        transition: { duration: 0.3 },
                                    }}
                                    className="perspective-1000 relative z-10"
                                >
                                    <CreditCardComponent
                                        gradient="from-rose-500 to-pink-600"
                                        name="JANE SMITH"
                                        number="•••• •••• •••• 5678"
                                        expiry="09/27"
                                        showShine={true}
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section with Card Carousel */}
                <section id="benefits" className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                                Choose the card that fits your lifestyle
                            </h2>
                            <p className="text-lg text-slate-600">
                                We offer multiple card options with exclusive
                                benefits designed for your needs.
                            </p>
                        </div>

                        <div className="grid gap-12 md:grid-cols-2">
                            <div className="flex items-center justify-center">
                                <div className="relative h-[300px] w-[300px]">
                                    {cardVariants.map((card, index) => (
                                        <motion.div
                                            key={index}
                                            className="absolute left-0 top-0"
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8,
                                                rotateY: -20,
                                            }}
                                            animate={{
                                                opacity:
                                                    activeCard === index
                                                        ? 1
                                                        : 0,
                                                scale:
                                                    activeCard === index
                                                        ? 1
                                                        : 0.8,
                                                rotateY:
                                                    activeCard === index
                                                        ? 0
                                                        : -20,
                                                zIndex:
                                                    activeCard === index
                                                        ? 10
                                                        : 0,
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <CreditCardComponent
                                                gradient={card.gradient}
                                                name={`${card.name.toUpperCase()} USER`}
                                                number="•••• •••• •••• 9999"
                                                expiry="10/28"
                                                cardName={card.name}
                                                showShine={activeCard === index}
                                            />

                                            {/* Card benefits tooltip */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{
                                                    opacity:
                                                        activeCard === index
                                                            ? 1
                                                            : 0,
                                                    y:
                                                        activeCard === index
                                                            ? 0
                                                            : 20,
                                                }}
                                                transition={{
                                                    delay: 0.3,
                                                    duration: 0.3,
                                                }}
                                                className="absolute -bottom-24 left-1/2 w-full -translate-x-1/2 rounded-lg bg-white p-3 shadow-lg"
                                            >
                                                <div className="text-center text-sm font-medium text-slate-900">
                                                    {card.benefits.map(
                                                        (benefit, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex items-center gap-1 py-1"
                                                            >
                                                                <CheckCircle className="h-3 w-3 text-primary" />
                                                                <span>
                                                                    {benefit}
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Card selector dots */}
                                <div className="absolute bottom-[-60px] flex justify-center space-x-2">
                                    {cardVariants.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveCard(index)}
                                            className={`h-3 w-3 rounded-full transition-all ${
                                                activeCard === index
                                                    ? "scale-125 bg-primary"
                                                    : "bg-slate-300"
                                            }`}
                                            aria-label={`Select card ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="flex gap-4"
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <CreditCardIcon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold text-slate-900">
                                            Multiple Card Options
                                        </h3>
                                        <p className="text-slate-600">
                                            Choose from Standard, Premium, or
                                            Platinum cards, each with unique
                                            benefits tailored to your lifestyle.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex gap-4"
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Sparkles className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold text-slate-900">
                                            Tiered Rewards
                                        </h3>
                                        <p className="text-slate-600">
                                            Earn more rewards as you upgrade
                                            your card tier, with exclusive perks
                                            for premium members.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex gap-4"
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Gift className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold text-slate-900">
                                            Welcome Bonuses
                                        </h3>
                                        <p className="text-slate-600">
                                            Get special welcome bonuses when you
                                            sign up, with higher tiers offering
                                            more valuable rewards.
                                        </p>
                                    </div>
                                </motion.div>

                                <div className="pt-4">
                                    <Button>Compare Cards</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Benefits Section with 3D Card */}
                <section ref={benefitsRef} className="bg-slate-50 py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                                Exclusive benefits for cardholders
                            </h2>
                            <p className="text-lg text-slate-600">
                                Enjoy premium perks and rewards designed to
                                enhance your lifestyle and save you money.
                            </p>
                        </div>

                        <div className="grid gap-12 md:grid-cols-2">
                            <div className="order-2 md:order-1">
                                <div className="relative">
                                    {benefits.map((benefit, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{
                                                opacity:
                                                    activeBenefit === index
                                                        ? 1
                                                        : 0,
                                                x:
                                                    activeBenefit === index
                                                        ? 0
                                                        : -50,
                                                display:
                                                    activeBenefit === index
                                                        ? "block"
                                                        : "none",
                                            }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute left-0 top-0 w-full"
                                        >
                                            <div className="flex items-start gap-6 rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                                                <div
                                                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg ${benefit.color} text-white`}
                                                >
                                                    {benefit.icon}
                                                </div>
                                                <div>
                                                    <h3 className="mb-2 text-xl font-semibold text-slate-900">
                                                        {benefit.title}
                                                    </h3>
                                                    <p className="text-slate-600">
                                                        {benefit.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Empty container to maintain height */}
                                    <div className="invisible flex items-start gap-6 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                                            <Star className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-semibold text-slate-900">
                                                Placeholder
                                            </h3>
                                            <p className="text-slate-600">
                                                This is a placeholder to
                                                maintain the height of the
                                                container.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Benefit navigation */}
                                    <div className="mt-6 flex items-center justify-between">
                                        <button
                                            onClick={() =>
                                                setActiveBenefit(
                                                    (prev) =>
                                                        (prev -
                                                            1 +
                                                            benefits.length) %
                                                        benefits.length,
                                                )
                                            }
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-slate-50"
                                        >
                                            <ChevronLeft className="h-5 w-5 text-slate-600" />
                                        </button>

                                        <div className="flex space-x-2">
                                            {benefits.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        setActiveBenefit(index)
                                                    }
                                                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                                                        activeBenefit === index
                                                            ? "scale-125 bg-primary"
                                                            : "bg-slate-300"
                                                    }`}
                                                    aria-label={`View benefit ${index + 1}`}
                                                />
                                            ))}
                                        </div>

                                        <button
                                            onClick={() =>
                                                setActiveBenefit(
                                                    (prev) =>
                                                        (prev + 1) %
                                                        benefits.length,
                                                )
                                            }
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-slate-50"
                                        >
                                            <ChevronRight className="h-5 w-5 text-slate-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="order-1 flex items-center justify-center md:order-2">
                                <motion.div
                                    style={{
                                        x: benefitsCardX,
                                        y: benefitsCardY,
                                        rotateX: benefitsCardRotateX,
                                        rotateY: benefitsCardRotateY,
                                        rotateZ: benefitsCardRotateZ,
                                        scale: benefitsCardScale,
                                        opacity: benefitsCardOpacity,
                                    }}
                                    className="perspective-1000 relative z-10"
                                >
                                    <motion.div
                                        animate={{
                                            rotateY: [0, 15, 0, -15, 0],
                                            rotateX: [0, 10, 0, -10, 0],
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatType: "loop",
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <CreditCardComponent
                                            gradient="from-slate-700 to-slate-900"
                                            name="PLATINUM USER"
                                            number="•••• •••• •••• 7890"
                                            expiry="05/29"
                                            cardName="Platinum"
                                            showShine={true}
                                        />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Grid of benefit cards */}
                        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    whileHover={{
                                        y: -10,
                                        boxShadow:
                                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                    }}
                                    className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300"
                                >
                                    <div
                                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${benefit.color} text-white`}
                                    >
                                        {benefit.icon}
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-slate-900">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-slate-600">
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-primary py-20 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                            Ready to get started?
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-xl text-white/80">
                            Apply now and get a decision in minutes. No impact
                            on your credit score.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="font-medium"
                            >
                                Apply Now
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white font-medium text-white hover:bg-white/10"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 py-12 text-slate-400">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div>
                            <div className="mb-4 flex items-center gap-2 text-white">
                                <CreditCard className="h-6 w-6" />
                                <span className="text-xl font-bold">
                                    PrimeCard
                                </span>
                            </div>
                            <p className="text-sm">
                                The smarter way to manage your finances and
                                build your credit score.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-4 font-semibold text-white">
                                Company
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-white"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-white"
                                    >
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-white"
                                    >
                                        Press
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-white"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 font-semibold text-white">
                                Resources
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-white"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-white"
                                    >
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-white"
                                    >
                                        FAQs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-white"
                                    >
                                        Security
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 font-semibold text-white">
                                Legal
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-white"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-white"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-white"
                                    >
                                        Cookie Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-white"
                                    >
                                        Licenses
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm">
                        &copy; {new Date().getFullYear()} PrimeCard. All rights
                        reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Reusable Credit Card Component
function CreditCardComponent({
    gradient = "from-primary to-purple-600",
    name = "JOHN DOE",
    number = "•••• •••• •••• 4242",
    expiry = "12/28",
    cardName = "PrimeCard",
    showShine = false,
}) {
    return (
        <div
            className={`relative h-[230px] w-[370px] overflow-hidden rounded-xl bg-gradient-to-br ${gradient} shadow-xl transition-all duration-300`}
        >
            {/* Shine effect */}
            {showShine && (
                <motion.div
                    className="absolute inset-0 opacity-20"
                    initial={{ backgroundPosition: "200% 0%" }}
                    animate={{
                        backgroundPosition: "0% 200%",
                    }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "mirror",
                        duration: 2.5,
                    }}
                    style={{
                        background:
                            "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.4) 50%, transparent 75%)",
                        backgroundSize: "250% 250%",
                    }}
                />
            )}

            {/* Holographic effect */}
            <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                    background: [
                        "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 100%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    ],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                }}
            />

            <div className="absolute left-0 top-0 h-full w-full opacity-30">
                <div className="absolute right-6 top-6 h-12 w-12 rounded-full border-2 border-white/20"></div>
                <div className="absolute bottom-6 left-6 h-16 w-16 rounded-full border-2 border-white/20"></div>
                <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white/10"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                <div className="flex items-start justify-between">
                    <div className="text-lg font-bold">{cardName}</div>
                    <div className="flex h-8 w-12 items-center justify-center rounded bg-white/20">
                        <div className="mr-1 h-6 w-6 rounded-full bg-yellow-400"></div>
                        <div className="h-6 w-6 rounded-full bg-red-500 opacity-80"></div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="text-sm opacity-80">Card Number</div>
                    <div className="font-mono text-lg tracking-wider">
                        {number}
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="text-xs opacity-80">
                                Card Holder
                            </div>
                            <div className="font-medium">{name}</div>
                        </div>
                        <div>
                            <div className="text-xs opacity-80">Expires</div>
                            <div className="font-medium">{expiry}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Embossed effect for card numbers */}
            <div className="font-mono absolute bottom-[72px] left-6 text-lg tracking-wider text-transparent">
                <span className="select-none [text-shadow:0_1px_1px_rgba(255,255,255,0.2)]">
                    {number}
                </span>
            </div>

            {/* Chip with 3D effect */}
            <div className="absolute left-6 top-[60px] h-10 w-12 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-inner">
                <div className="absolute inset-0.5 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-50"></div>
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-px p-1">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-sm bg-yellow-600/20"
                        ></div>
                    ))}
                </div>
            </div>

            {/* NFC symbol */}
            <div className="absolute right-12 top-[60px]">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 8.6C6 7.16406 6.5743 5.79284 7.5962 4.77208C8.61811 3.75133 10.0016 3.18182 11.4545 3.18182C12.9074 3.18182 14.2909 3.75133 15.3128 4.77208C16.3347 5.79284 16.9091 7.16406 16.9091 8.6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9.27274 8.6C9.27274 7.88203 9.56001 7.19342 10.071 6.68539C10.5819 6.17736 11.2745 5.89091 11.9964 5.89091C12.7182 5.89091 13.4108 6.17736 13.9217 6.68539C14.4327 7.19342 14.72 7.88203 14.72 8.6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 8.59998V8.60898"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
}

// Credit Card Back Component
function CreditCardBack({
    gradient = "from-primary to-purple-600",
    cvv = "123",
}) {
    return (
        <div
            className={`relative h-[230px] w-[370px] overflow-hidden rounded-xl bg-gradient-to-br ${gradient} shadow-xl`}
        >
            <div className="absolute top-10 h-12 w-full bg-slate-800"></div>
            <div className="absolute right-6 top-28 flex h-10 w-16 items-center justify-center rounded bg-white/90">
                <span className="font-mono text-sm text-slate-800">{cvv}</span>
            </div>
            <div className="absolute bottom-10 left-6 right-6">
                <div className="h-10 rounded bg-white/20"></div>
            </div>
            <div className="absolute bottom-6 left-6 text-xs text-white/70">
                For customer service, call the number on the front of your card.
            </div>
        </div>
    );
}

// Flippable Card Component
function FlippableCard({
    isFlipped,
    frontContent,
    backContent,
}: {
    isFlipped: boolean;
    frontContent: React.ReactNode;
    backContent: React.ReactNode;
}) {
    return (
        <div className="relative h-[230px] w-[370px] [perspective:1000px]">
            <motion.div
                className="relative h-full w-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                <div className="absolute h-full w-full [backface-visibility:hidden]">
                    {frontContent}
                </div>
                <div
                    className="absolute h-full w-full [backface-visibility:hidden]"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    {backContent}
                </div>
            </motion.div>
        </div>
    );
}
