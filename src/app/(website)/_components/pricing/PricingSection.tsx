import React from "react";
import GradientText from "@/components/global/gradient-text";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {SubmitButton} from "@/components/global/SubmitButtons";
import { VideoIcon } from "@radix-ui/react-icons";
import { AlarmClock, Landmark, User, LaptopMinimal, Video } from "lucide-react";
import VideoRecorderIcon from "@/components/icons/video-recorder";

interface iAppProps {
    id: number,
    cardTitle: string,
    cardDescription: string,
    priceTitle: string,
    benefits: string[],
    benefitIcons: React.ReactNode[], // Added icons for benefits
}

export const PricingPlans: iAppProps[] =[
    {
        id: 0,
        cardTitle: "Free Trial",
        cardDescription: "The best pricing plan for people starting out.",
        benefits: [
            "25 videos per month (720p only)",
            "5 min per video",
            "1 Organization",
            "No team member",
            "1-time Al features test",
        ],
        priceTitle: "₹0/m",
        benefitIcons: [
            <Video className="text-primary" />,
            <AlarmClock className="text-primary" />,
            <Landmark className="text-primary" />,
            <User className="text-primary" />,
            <LaptopMinimal className="text-primary" />
        ]
    },
    {
        id: 1,
        cardTitle: "Professional Plan",
        cardDescription: "The Pricing plan for Professionals.",
        priceTitle: "₹8300",
        benefits: [
            "Unlimited videos",
            "Unlimited duration",
            "Unlimited organizations",
            "Unlimited team members",
            "All Al features",
        ],
        benefitIcons: [
            <Video className="text-primary" />,
            <AlarmClock className="text-primary" />,
            <Landmark className="text-primary" />,
            <User className="text-primary" />,
            <LaptopMinimal className="text-primary" />
        ]
    }
]

export function PricingCard() {
    return (
        <>
            <div className="bg-gradient-to-r from-gray-50 to-gray-800">
                <GradientText
                    className="text-[35px] md:text-[40px] lg:text-[55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold"
                    element="H1"
                >
                    Pricing
                </GradientText>
                <h1 className={"mt-2 text-lg font-bold tracking-tight"}>Choose the plan that best suits your needs and get started today! No hidden fees, cancel anytime.</h1>

                <div className={"grid grid-cols-1 gap-8 mt-10 lg:grid-cols-2"}>
                    {PricingPlans.map((item) => (
                        <Card key={item.id} className={item.id === 1 ? 'purple-bg' : "gray-bg"}>
                            <CardHeader>
                                <CardTitle>
                                    {item.id === 1 ? (
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-primary text-xl">Most Popular</h1>
                                            <p className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold leading-5 text-primary">Most Popular</p>
                                        </div>
                                    ): <div className={"text-xl"}>{item.cardTitle}</div>}
                                </CardTitle>
                                <CardDescription className={"text-4xl font-bold text-white"}>{item.priceTitle}</CardDescription>
                            </CardHeader>
                            {item.id === 1 ? (
                                <form className="flex w-full items-center justify-center">
                                    <SubmitButton text="Get Started" className="flex mt-5 w-[500px] items-center justify-center h-12" />
                                </form>
                            ): (
                                <div className="flex mt-5 w-full items-center justify-center">
                                    <Button variant="outline" className={"w-[500px] h-12 bg-[#181818]"}>
                                        <Link href="/">Get Started</Link> {/* Changed to /signup to reflect sign up process */}
                                    </Button>
                                </div>
                            )}
                            <CardContent>
                                <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                                    {item.benefits.map((benefit, index) => (
                                        <li key={index} className="flex gap-x-3">
                                            {item.benefitIcons[index]} {/* Display the icon corresponding to each benefit */}
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}